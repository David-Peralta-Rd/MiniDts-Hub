# Modelo de amenazas — MiniDts-Hub

Ligero (STRIDE). Objetivo: OWASP ASVS nivel 1 (sin datos sensibles ni pagos).

- Activos: contenido publicado, reputación del sitio, pipeline de build.
- Amenazas: XSS por contenido TOML no saneado, dependencias vulnerables, inyección en build, DoS por assets pesados.
- Mitigaciones: escape por defecto de Astro, validación Zod en build, CSP en headers de Pages (meta), auditoría pnpm, lockfile commiteado.
- Riesgos aceptados: sin autenticación ni datos de usuario; contenido es público.