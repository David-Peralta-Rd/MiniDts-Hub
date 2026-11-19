# Convenciones de datos — MiniDts-Hub

No hay base de datos. Los datos viven en archivos TOML bajo `src/content/`.

Columnas/campos base (definidos una vez, heredados):
- id, title, summary, created_at, updated_at.

Tipos: strings, arrays de strings, fechas ISO (`YYYY-MM-DD`) y fechas de versionado (`YYYY.MM.DD` o `YYYY-MM-DD`).
Valores que cambian con el tiempo se copian en el registro (no se referencian).

Archivos TOML individuales por entidad; un archivo por proyecto/novedad.