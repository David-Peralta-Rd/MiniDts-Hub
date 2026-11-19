import { describe, it, expect } from "vitest";
import { filterProjects, collectTags } from "../../../src/modules/projects/application/filter-projects";
import type { Project } from "../../../src/modules/projects/domain/project";

const mk = (tags: string[]): Project => ({
  id: "x",
  title: "t",
  summary: "s",
  description: "",
  tags,
  featured: false,
  created_at: "2026-11-19",
});

describe("projects/filter", () => {
  const projects = [mk(["linux"]), mk(["linux", "rust"]), mk(["web"])];
  it("sin tag devuelve todos", () => {
    expect(filterProjects(projects)).toHaveLength(3);
    expect(filterProjects(projects, null)).toHaveLength(3);
    expect(filterProjects(projects, "")).toHaveLength(3);
  });
  it("filtra por tag existente", () => {
    expect(filterProjects(projects, "linux")).toHaveLength(2);
  });
  it("tag inexistente devuelve vacio", () => {
    expect(filterProjects(projects, "nope")).toHaveLength(0);
  });
  it("case-insensitive", () => {
    expect(filterProjects(projects, "LINUX")).toHaveLength(2);
  });
  it("collectTags ordena y deduplica", () => {
    expect(collectTags(projects)).toEqual(["linux", "rust", "web"]);
  });
});