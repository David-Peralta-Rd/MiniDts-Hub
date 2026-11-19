#!/usr/bin/env python3
"""Checks documentation and module structure."""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FORBIDDEN = {"utils", "helpers", "common"}


SKIP_DIRS = {"node_modules", ".venv", "dist", ".git", ".astro"}

def check_forbidden_dirs() -> list[str]:
    errs = []
    for p in ROOT.rglob("*"):
        if any(part in SKIP_DIRS for part in p.parts):
            continue
        if p.is_dir() and p.name in FORBIDDEN:
            errs.append(f"carpeta prohibida: {p.relative_to(ROOT)}")
    return errs


def check_modules_public() -> list[str]:
    errs = []
    modules_root = ROOT / "src" / "modules"
    if modules_root.exists():
        for m in modules_root.iterdir():
            if m.is_dir() and not (m / "public.ts").exists():
                errs.append(f"modulo sin public.ts: {m.name}")
    # python modules (tools not modules) skip
    return errs


def check_architecture_marker() -> list[str]:
    arch = ROOT / "docs" / "ARCHITECTURE.md"
    if not arch.exists():
        return ["falta docs/ARCHITECTURE.md"]
    text = arch.read_text(encoding="utf-8")
    if "<!-- modules -->" not in text:
        return ["falta marcador <!-- modules --> en ARCHITECTURE.md"]
    return []


def write_indexes() -> None:
    readme = ROOT / "README.md"
    if not readme.exists():
        return
    text = readme.read_text(encoding="utf-8")
    start = "<!-- docs:index:start -->"
    end = "<!-- docs:index:end -->"
    if start in text and end in text:
        # no-op placeholder; real index could be generated here
        pass


def main() -> int:
    ap = argparse.ArgumentParser(description="docs-check")
    ap.add_argument("--write", action="store_true")
    args = ap.parse_args()

    errors = []
    errors += check_forbidden_dirs()
    errors += check_modules_public()
    errors += check_architecture_marker()

    if args.write:
        write_indexes()

    if errors:
        for e in errors:
            print(e, file=sys.stderr)
        return 1
    print("docs-check: ok")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())