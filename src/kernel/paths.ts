// kernel/paths.ts — rutas canónicas del proyecto (inmutables)
export const ProjectPaths = {
  root: new URL("../../", import.meta.url),
  content: "src/content",
  projects: "src/content/projects",
  news: "src/content/news",
  generated: "src/generated",
} as const;

export type ProjectPathsType = typeof ProjectPaths;