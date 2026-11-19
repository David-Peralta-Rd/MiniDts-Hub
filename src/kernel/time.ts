// kernel/time.ts — utilidades de tiempo
export function parseVersionDate(input: string): Date {
  const parts = input.split(/[.\-]/);
  if (parts.length !== 3) throw new Error(`fecha de versionado invalida: ${input}`);
  let [y, m, d] = parts;
  if (y.length === 2) y = `20${y}`;
  const iso = `${y.padStart(4, "0")}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) throw new Error(`fecha de versionado invalida: ${input}`);
  return date;
}

export function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}