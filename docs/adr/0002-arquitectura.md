# ADR 0002: Arquitectura modular frontend

- Fecha: 2026-11-19
- Estado: aceptada

## Contexto
Mantener fronteras claras y acíclicas entre conceptos de negocio aunque sea un sitio estático.

## Decisión
Monolito modular en TypeScript. Módulos por concepto: `kernel` (base), `projects`, `news` (features). Cada módulo expone `public.ts`. Capas: interface (componentes Astro) → application (loaders) → domain (esquemas/tipos); infrastructure (lectura TOML) implementa puertos. Grafo acíclico declarado en `ARCHITECTURE.md`.

## Alternativas descartadas
- Estructura por tipo (components/pages/utils): dificulta escalado y pruebas.

## Consecuencias
- Añadir un módulo nuevo requiere `nuevo-modulo` y registro en `ARCHITECTURE.md`.
- `kernel` no importa features.

## Cuándo reconsiderarla
- Si el número de módulos supera 8 sin necesidad de aislamiento real.