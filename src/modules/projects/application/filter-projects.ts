import type { Project } from "../domain/project";

export function filterProjects(projects: Project[], tag?: string | null): Project[] {
  const normalized = tag?.trim().toLowerCase();
  if (!normalized) return projects;
  return projects.filter((p) => p.tags.some((t) => t.toLowerCase() === normalized));
}

export function collectTags(projects: Project[]): string[] {
  const set = new Set<string>();
  for (const p of projects) for (const t of p.tags) set.add(t);
  return [...set].sort((a, b) => a.localeCompare(b));
}