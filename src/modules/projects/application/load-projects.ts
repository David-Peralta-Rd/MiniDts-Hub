import { z } from "zod";
import { loadGenerated } from "@kernel/content-loader";
import { ProjectSchema, type Project } from "../domain/project";

export async function loadProjects(): Promise<Project[]> {
  const raw = await loadGenerated<unknown>("projects");
  return z.array(ProjectSchema).parse(raw);
}