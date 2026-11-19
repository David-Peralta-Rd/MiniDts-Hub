import { z } from "zod";

export const NewsSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  body: z.string().optional().default(""),
  version: z.string().min(1), // "YYYY.MM.DD" o "YYYY-MM-DD"
  category: z.string().optional().default("general"),
  tags: z.array(z.string()).default([]),
  published_at: z.string(),
});

export type NewsItem = z.infer<typeof NewsSchema>;