import { z } from "zod";
import { loadGenerated } from "@kernel/content-loader";
import { parseVersionDate } from "@kernel/time";
import { NewsSchema, type NewsItem } from "../domain/news";

export async function loadNews(): Promise<NewsItem[]> {
  const raw = await loadGenerated<unknown>("news");
  const items = z.array(NewsSchema).parse(raw);
  return items.sort((a, b) => parseVersionDate(b.version).getTime() - parseVersionDate(a.version).getTime());
}