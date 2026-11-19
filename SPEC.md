# SPEC — MiniDts-Hub

## Problema
No existe un lugar único y claro que muestre el software desarrollado entorno a configuraciones minimalistas para Linux. Los proyectos y novedades se dispersan y no se presentan de forma autoexplicativa.

## Usuarios
- Visitantes técnicos interesados en configuraciones minimalistas para Linux.
- El propio autor, que quiere publicar proyectos y novedades sin fricción.

## Alcance (MVP)
- Sitio estático en GitHub Pages.
- Apartado de Proyectos que lee archivos TOML individuales desde `src/content/projects/` y los lista/filtra.
- Apartado de Novedades que lee archivos TOML individuales desde `src/content/news/`, categorizados y ordenados por fecha de versionado (`YYYY.MM.DD` / `YYYY-MM-DD`).
- Diseño moderno, full-width, responsive, con glassmorphism en bordes.
- Web autoexplicativa, sin procesos complejos para el visitante.

## Fuera de alcance
- Backend, base de datos, autenticación, comentarios, búsqueda avanzada.
- Panel de administración; la publicación se hace añadiendo archivos TOML y haciendo commit.
- E2E automatizado (Playwright) en v1.

## Criterios de aceptación (medibles)
- [ ] `pnpm build` genera el sitio estático sin errores.
- [ ] `pnpm astro check` y `tsc --noEmit` pasan sin errores.
- [ ] Añadir un archivo TOML válido en `src/content/projects/` aparece en la página de Proyectos tras rebuild.
- [ ] Añadir un archivo TOML válido en `src/content/news/` aparece ordenado por fecha de versionado descendente.
- [ ] El sitio es responsive (mobile/tablet/desktop) y usa glassmorphism en contenedores.
- [ ] Lighthouse Performance/Accessibility/Best Practices/SEO >= 90 en producción.

## Riesgos y supuestos
- Riesgo: TOML mal formado rompe el build. Mitigación: validación con Zod en build y fallo explícito.
- Riesgo: GitHub Pages base path (`/<repo>/`) rompe assets. Mitigación: `base` configurado en `astro.config.mjs` desde `kernel/settings`.
- Supuestos: ver `REQUIREMENTS.md`.

## Decisiones abiertas
- Playwright E2E — decide: autor, antes de v1.1.