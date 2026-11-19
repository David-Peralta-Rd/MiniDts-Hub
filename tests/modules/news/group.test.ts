import { describe, it, expect } from "vitest";
import { filterNewsByYear, groupNewsByYear, newsYear } from "../../../src/modules/news/application/group-news";
import type { NewsItem } from "../../../src/modules/news/domain/news";

const mk = (version: string): NewsItem => ({
  id: version,
  title: "t",
  summary: "s",
  body: "",
  version,
  category: "general",
  tags: [],
  published_at: "2026-01-01",
});

describe("news/group", () => {
  const items = [mk("26.11.19"), mk("26.01.02"), mk("25.05.01")];
  it("newsYear normaliza 2 digitos", () => {
    expect(newsYear(mk("26.11.19"))).toBe("2026");
    expect(newsYear(mk("2025-05-01"))).toBe("2025");
  });
  it("filtra por año", () => {
    expect(filterNewsByYear(items, "2026")).toHaveLength(2);
    expect(filterNewsByYear(items, 2025)).toHaveLength(1);
  });
  it("sin año devuelve todos", () => {
    expect(filterNewsByYear(items)).toHaveLength(3);
    expect(filterNewsByYear(items, null)).toHaveLength(3);
  });
  it("año inexistente vacio", () => {
    expect(filterNewsByYear(items, "2024")).toHaveLength(0);
  });
  it("agrupa descendente", () => {
    const groups = groupNewsByYear(items);
    expect(groups.map((g) => g.year)).toEqual(["2026", "2025"]);
    expect(groups[0].items).toHaveLength(2);
  });
});