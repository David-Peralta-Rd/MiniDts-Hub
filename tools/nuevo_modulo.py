#!/usr/bin/env python3
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///
"""Scaffold a new module adapted to this project's architecture.

Usage:
    uv run nuevo-modulo <nombre> [--stack python|rust|ts|auto] [--dest PATH]
"""
from __future__ import annotations

import argparse
import datetime as dt
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEMPLATES = ROOT / "docs" / "templates" / "module"
ARCH = ROOT / "docs" / "ARCHITECTURE.md"
TASKS = ROOT / "docs" / "tasks"


def slugify(name: str) -> str:
    name = name.strip().lower().replace(" ", "-").replace("-", "_")
    if not re.fullmatch(r"[a-z][a-z0-9_]*", name):
        raise ValueError(f"nombre invalido: {name!r}")
    return name


def detect_stack() -> str:
    if (ROOT / "Cargo.toml").exists() and (ROOT / "pyproject.toml").exists():
        return "hybrid"
    if (ROOT / "Cargo.toml").exists():
        return "rust"
    if (ROOT / "package.json").exists():
        return "ts"
    return "python"


def render(text: str, ctx: dict[str, str]) -> str:
    for k, v in ctx.items():
        text = text.replace(f"__{k}__", v)
    return text


def copy_template(src: Path, dst: Path, ctx: dict[str, str]) -> None:
    if dst.exists():
        raise SystemExit(f"ya existe: {dst}")
    dst.mkdir(parents=True, exist_ok=True)
    for item in src.rglob("*"):
        rel = item.relative_to(src)
        parts = [render(p, ctx) for p in rel.parts]
        target = dst / Path(*parts)
        if item.is_dir():
            target.mkdir(parents=True, exist_ok=True)
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        if item.suffix in {".py", ".rs", ".toml", ".md", ".txt", ".yml", ".yaml", ".ts", ".astro", ".css", ".json"}:
            target.write_text(render(item.read_text(), ctx), encoding="utf-8")
        else:
            shutil.copy2(item, target)


def update_architecture(name: str) -> None:
    if not ARCH.exists():
        return
    marker = "<!-- modules -->"
    entry = f"- `{name}`: modulo generado por nuevo-modulo ({dt.date.today().isoformat()}).\n"
    text = ARCH.read_text(encoding="utf-8")
    if marker in text:
        text = text.replace(marker, marker + "\n" + entry, 1)
    else:
        text += "\n## Modulos\n" + entry
    ARCH.write_text(text, encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser(description="Crea un nuevo modulo")
    ap.add_argument("name")
    ap.add_argument("--stack", default="auto", choices=["auto", "python", "rust", "hybrid", "ts"])
    ap.add_argument("--dest", default=None)
    args = ap.parse_args()

    try:
        name = slugify(args.name)
    except ValueError as e:
        print(e, file=sys.stderr)
        return 2

    stack = detect_stack() if args.stack == "auto" else args.stack
    if stack == "hybrid":
        stack = "python"

    tpl = TEMPLATES / stack
    if not tpl.exists():
        print(f"plantilla no encontrada: {tpl}", file=sys.stderr)
        return 1

    ctx = {
        "MODULE_NAME": name,
        "MODULE_SLUG": name.replace("-", "_"),
        "DATE": dt.date.today().isoformat(),
        "STACK": stack,
    }

    if args.dest:
        dst = Path(args.dest).resolve()
    else:
        if stack == "ts":
            base = ROOT / "src" / "modules"
        elif stack == "python":
            base = ROOT / "src"
        else:
            base = ROOT / "crates"
        dst = base / name

    tmp = dst.with_name(dst.name + ".tmp")
    if tmp.exists():
        shutil.rmtree(tmp)
    try:
        copy_template(tpl, tmp, ctx)
        tmp.replace(dst)
    except Exception as e:
        shutil.rmtree(tmp, ignore_errors=True)
        print(f"error: {e}", file=sys.stderr)
        return 1

    if stack == "python":
        tests_dir = ROOT / "tests"
        tests_dir.mkdir(exist_ok=True)
        test_file = tests_dir / f"test_{name}.py"
        if not test_file.exists():
            test_file.write_text(
                f"from {name}.public import hello\n\n\ndef test_hello() -> None:\n    assert hello() == \"hello from {name}\"\n",
                encoding="utf-8",
            )
    elif stack == "ts":
        test_file = dst / "public.test.ts"
        if not test_file.exists():
            test_file.write_text(
                'import { hello } from "./public";\n\ntest("hello", () => {\n  expect(hello()).toBe("hello from ' + name + '");\n});\n',
                encoding="utf-8",
            )

    update_architecture(name)

    print(f"modulo creado: {dst}")
    print("siguiente: ejecutar docs-check y humo de importacion")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())