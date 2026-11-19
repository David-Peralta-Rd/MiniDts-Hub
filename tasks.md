# tasks — MiniDts-Hub

Lanzar: `opencode run --agent builder "Haz la tarea Txx de tasks.md"`

Etiquetas: **[YO]** = aprendo o decido yo (diseño, seguridad, base de datos). **[DELEGAR]** = mecánica; la hace el agente y yo reviso el diff.
Cada tarea: menos de 2 horas, toca un solo módulo y como máximo 3 archivos fuente más sus pruebas y documentos.

| ID | Hito | Tipo | Nivel | Depende | Módulo | Título | Estado |
|----|------|------|-------|---------|--------|--------|--------|
| T01 | 0 | [YO] | 3 | — | — | Activar el esqueleto andante (Astro dev/build, Home con proyectos y novedades) | pendiente |
| T02 | 0 | [YO] | 3 | T01 | — | Revisar entrypoints, configs, dependencias y amenazas | pendiente |
| T03 | 1 | [DELEGAR] | 2 | T02 | projects | Añadir filtros por tags en Proyectos | pendiente |
| T04 | 1 | [DELEGAR] | 2 | T02 | news | Paginación de novedades por año | pendiente |

Convenciones:
- Nivel 1 (mecánica): esquemas, CRUD sobre un patrón existente, ajustes de Docker, refactors acotados, documentos de unidad. Modelo económico.
- Nivel 2 (estándar): casos de uso con reglas de negocio, endpoints, vistas. Modelo medio.
- Nivel 3 (crítica): autenticación, pagos, secretos, migraciones destructivas, permisos, unsafe, concurrencia en Rust, primera función nativa. Siempre [YO] en el núcleo.
- Las tarjetas completas viven en `docs/tasks/Txx.md`. Las tareas del hito 1 son las primeras que se detallan; el resto va en el índice con una línea de contrato.
- Ninguna tarea asume trabajo [YO] no hecho.
- La verificación del agente es un solo comando no interactivo (código de salida 0 = ok), sin navegador ni red.
- Verificación del agente para T01: `pnpm build` (exit 0).
- Verificación del agente para T02: `pnpm astro check && pnpm typecheck`.

## Detalla Txx
Para generar una tarjeta completa, pide `Detalla Txx` al agente. Campos mínimos:
- Objetivo en una frase y por qué existe.
- Depende: Txx (o nada).
- Módulo dueño y archivos que toca (rutas con prefijo `src/`), incluidos los `.md`.
- Contrato: firma exacta o endpoint, entradas, salidas, errores, invariantes.
- Leer antes: rutas y secciones exactas.
- Pruebas de aceptación: ruta del archivo de pruebas y casos.
- Verificación (agente): un comando no interactivo.
- Documentación a actualizar: archivos exactos.
- Revisión [YO]: lo que solo el humano puede comprobar (vacío si no hay).