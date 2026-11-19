# ADR 0004: Sin Docker

- Fecha: 2026-11-19
- Estado: aceptada

## Contexto
Arquetipo sitio estático desplegado en GitHub Pages.

## Decisión
No usar Docker ni docker-compose. El build y deploy se realizan con GitHub Actions.

## Alternativas descartadas
- Contenedores para preview: innecesario; `pnpm preview` cubre el caso.

## Consecuencias
- Verificación Docker de AGENTS.md no aplica; se sustituye por `pnpm build` + `pnpm preview`.

## Cuándo reconsiderarla
- Si se añade backend o base de datos.