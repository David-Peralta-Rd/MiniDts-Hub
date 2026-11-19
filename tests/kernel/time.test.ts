import { describe, it, expect } from "vitest";
import { parseVersionDate, formatDate } from "../../src/kernel/time";

describe("kernel/time", () => {
  it("parsea fecha de versionado con puntos", () => {
    const d = parseVersionDate("26.11.19");
    expect(d.getFullYear()).toBe(2026);
  });
  it("parsea fecha de versionado con guiones", () => {
    const d = parseVersionDate("26-11-19");
    expect(d.getMonth()).toBe(10);
  });
  it("formatea fecha ISO", () => {
    expect(formatDate(new Date("2026-11-19"))).toBe("2026-11-19");
  });
  it("rechaza fecha invalida", () => {
    expect(() => parseVersionDate("no-fecha")).toThrow();
  });
});