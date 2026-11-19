import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  summary_en: z.string().optional(),
  description: z.string().optional().default(""),
  description_en: z.string().optional(),
  tags: z.array(z.string()).default([]),
  repo_url: z.string().url().optional(),
  demo_url: z.string().url().optional(),
  featured: z.boolean().default(false),
  created_at: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;