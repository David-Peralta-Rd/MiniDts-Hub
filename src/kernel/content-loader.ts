// kernel/content-loader.ts — carga de contenido generado (cliente)
export interface ContentItem {
  id: string;
  title: string;
  summary: string;
}

export async function loadGenerated<T>(name: string): Promise<T[]> {
  const res = await fetch(`${import.meta.env.BASE_URL}data/${name}.json`);
  if (!res.ok) throw new Error(`no se pudo cargar ${name}`);
  return (await res.json()) as T[];
}