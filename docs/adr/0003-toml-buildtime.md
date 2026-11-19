# ADR 0003: Procesamiento TOML en build

- Fecha: 2026-11-19
- Estado: aceptada

## Contexto
Los proyectos y novedades se almacenan como archivos TOML individuales.

## Decisión
Procesar los TOML en build con `smol-toml` + validación Zod, generando JSON tipado en `src/generated/`. La UI consume el JSON generado.

## Alternativas descartadas
- Parseo en navegador: mayor peso y superficie de error.
- Generación manual de JSON: rompe la única fuente de verdad.

## Consecuencias
- Un TOML inválido falla el build con mensaje claro.
- `src/generated/` es artefacto (ignorado en git).

## Cuándo reconsiderarla
- Si se requiere edición en vivo sin rebuild.