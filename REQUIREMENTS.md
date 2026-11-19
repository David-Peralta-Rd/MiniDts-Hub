# Requisitos — MiniDts-Hub

Proyecto: MiniDts-Hub
Idea: Pagina web subida en github pages que muestra todo el software desarrollado entorno a configuraciones
minimalistas para Linux.
Plazo: <referencia> El necesario, es un hobby.
Carga: <opcional: procesos que creo pesados o con mucho crecimiento> Apartados de proyectos, apartado de novedades y nuevos desarrollos.
Notas: <opcional: restricciones, escala esperada, tecnologías que quiero o no quiero>
1. Tiene que agarrar en github pages.
2. El apartado de proyectos debe leer archivos toml con una estructura clara, cada archivo toml de proyecto esta separado por su propio toml
por lo cual el sistema debe ser capas de leer todos los proyectos que se encuentren dentro de la carpeta de proyectos.
3. El apartado de novedades debe ser similar al de proyectos, sera una estructura de archivo toml, con cada novedad separada en un toml diferente,
esta debe funcionar categorizada por fecha de versionado, se usara la siguiente: "year.month.day", ejemplo: "26.11.19" o también asi: "26-11-19".
4. Se debe usar la skill de google de modern web design para crear el apartado frontend moderno y escalable.
5. La pagina debe ser punta a punta con espaciado, básicamente la information se mostrara de derecha a izquierda casi completamente usando toda la ventana,
con responsive adaptativo, lo que se diferenciara sera que antes de llegar a las esquinas se usara un formato de bordeado y estilo visual "Glassmorphism"
Referencia: <opcional: URL, archivo adjunto o descripción de algo que quiero imitar> Con estilo directo de entender, que la propia web se explique a si misma sin procesos complejos para el visitante.

Supuestos:
- Arquetipo: sitio estático en GitHub Pages (sin backend, sin base de datos, sin Docker).
- Stack frontend: Astro + TypeScript (strict) + Tailwind CSS, gestor pnpm.
- Contenido TOML de proyectos/novedades se valida en build (script Node) y se genera JSON tipado; no se parsea en el navegador.
- Tooling de documentación y scaffold se mantiene en Python (`tools/`) con `uv`/`pyproject.toml`.
- Tests: Vitest (unit, kernel/loaders) + `astro check` (tipos). E2E con Playwright fuera del MVP.
- Node LTS v26 disponible en el entorno; pnpm se instala si falta.
- Sin autenticación, sin secretos de runtime; seguridad se reduce a CSP, saneado de contenido y auditoría de dependencias.
- Fecha de versionado de novedades: "year.month.day" o "year-month-day" (ej. "26.11.19" / "26-11-19").
