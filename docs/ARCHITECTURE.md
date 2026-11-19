# Arquitectura — MiniDts-Hub

## Contexto y contenedores
```mermaid
graph TD
  A[Visitante] --> B[GitHub Pages (estático)]
  B --> C[Assets generados en build]
```

## Mapa de módulos
- `kernel` — base — sin dependencias de features.
- `projects` — feature — depende de `kernel`.
- `news` — feature — depende de `kernel`.

<!-- modules -->



## Reglas de capas y datos
- interface → application → domain; infrastructure implementa puertos.
- Cada módulo es dueño de sus datos (archivos TOML); referencia por id.
- Grafo de dependencias acíclico y declarado arriba.

## Esqueleto andante
Una página Home que lista proyectos y novedades a partir de TOML, con build estático, `astro check` verde y deploy a GitHub Pages.

## Evolución prevista
| Señal medible | Umbral | Siguiente paso | Qué lo habilita ya |
|---|---|---|---|
| Proyectos > 50 | build > 30s | paginación en build | loader por lotes |
| Novedades > 100 | listado lento | archivo por año | loader por año |

## Para investigar
- Astro content collections custom loader (Astro 5).
- Tailwind v4 con Vite.