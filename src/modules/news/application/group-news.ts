import type { NewsItem } from "../domain/news";

export function newsYear(item: NewsItem): string {
  const first = item.version.split(/[.\-]/)[0] ?? "";
  const y = first.length === 2 ? `20${first}` : first;
  return y;
}

export function filterNewsByYear(items: NewsItem[], year?: string | number | null): NewsItem[] {
  if (year === undefined || year === null || String(year).trim() === "") return items;
  const target = String(year);
  return items.filter((n) => newsYear(n) === target);
}

export interface YearGroup {
  year: string;
  items: NewsItem[];
}

export function groupNewsByYear(items: NewsItem[]): YearGroup[] {
  const map = new Map<string, NewsItem[]>();
  for (const n of items) {
    const y = newsYear(n);
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(n);
  }
  return [...map.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([year, its]) => ({ year, items: its }));
}