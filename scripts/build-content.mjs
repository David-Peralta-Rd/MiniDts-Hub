import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse } from "smol-toml";
import { z } from "zod";

const root = process.cwd();
const outDir = join(root, "src", "generated");
mkdirSync(outDir, { recursive: true });

const Project = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().optional().default(""),
  tags: z.array(z.string()).default([]),
  repo_url: z.string().url().optional(),
  demo_url: z.string().url().optional(),
  featured: z.boolean().default(false),
  created_at: z.string(),
});

const News = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  body: z.string().optional().default(""),
  version: z.string().min(1),
  category: z.string().optional().default("general"),
  tags: z.array(z.string()).default([]),
  published_at: z.string(),
});

function readTomlDir(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".toml"))
    .map((f) => {
      const raw = readFileSync(join(dir, f), "utf-8");
      return parse(raw);
    });
}

const projects = z.array(Project).parse(readTomlDir(join(root, "src", "content", "projects")));
const news = z.array(News).parse(readTomlDir(join(root, "src", "content", "news")));

writeFileSync(join(outDir, "projects.json"), JSON.stringify(projects, null, 2));
writeFileSync(join(outDir, "news.json"), JSON.stringify(news, null, 2));
console.log(`generated ${projects.length} projects, ${news.length} news`);