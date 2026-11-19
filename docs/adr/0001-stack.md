# ADR 0001: Stack del proyecto

- Fecha: 2026-11-19
- Estado: aceptada

## Contexto
Sitio estático en GitHub Pages que muestra proyectos y novedades a partir de archivos TOML. Sin backend ni base de datos.

## Opciones
1. Astro + TypeScript + Tailwind (SSG) — encaje alto para contenido estático, componentes islas, build rápido.
2. Vite + React SPA — más control, pero peor SEO y requiere SSG manual.
3. SvelteKit static — bueno, pero menos familiar y ecosistema menor para contenido.

## Decisión
Astro + TypeScript (strict) + Tailwind CSS + pnpm. Contenido TOML procesado en build con `smol-toml` + Zod.

## Alternativas descartadas
- Backend (FastAPI/Django): fuera de alcance; GitHub Pages no ejecuta servidor.
- Docker: no aplica a sitio estático.
- Parseo TOML en navegador: añade peso y complejidad; build-time es más simple y seguro.

## Consecuencias
- Deploy simple vía GitHub Actions.
- Sin runtime de servidor; toda la lógica es build-time o cliente estático.
- Verificar versiones de Astro/Tailwind al instalar.

## Cuándo reconsiderarla
- Si se necesita búsqueda dinámica o autenticación: migrar a backend (ADR nuevo).