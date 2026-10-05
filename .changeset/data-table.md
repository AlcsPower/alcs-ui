---
"@alcspower/ui": minor
---

### Nuevas características (DataTable & Support Feedback)

- **DataTable**: Componente interactivo headless para datos estructurados construido sobre TanStack Table v8.21.3. Soporta modo controlado y no controlado, definiciones de columnas tipadas (`ColumnDef`), celdas personalizables, ordenamiento individual y multi-columna, búsqueda global en tiempo real, integración con paginación SPA, selección de filas individuales y página completa, alternancia de visibilidad de columnas, diseño adaptable y estados visuales (Loading con filas Skeleton, Empty con EmptyState, Error con ErrorState).
- **DataTableColumnHeader**: Encabezado de columna con botón de ordenamiento interactivo (ascendente, descendente y neutral) e iconos Lucide.
- **DataTablePagination**: Barra de pie de página integrada con contador accesible de filas seleccionadas y controles de navegación de páginas.
- **DataTableToolbar**: Barra superior con campo de búsqueda accesible y menú desplegable para visibilidad de columnas.
- **ErrorState**: Componente de feedback para errores y fallos de carga con soporte de acciones de reintento principal y secundaria.
- **LoadingOverlay**: Overlay con fondo difuminado y Spinner centrado para contenedores y secciones en proceso de actualización o recarga.

### Calidad y Accesibilidad

- Cobertura de pruebas unitarias ampliada de 121 a 157 tests en 27 suites con Vitest y `@testing-library/react`.
- Cero violaciones de accesibilidad WCAG 2.1 AA verificadas con `vitest-axe` en todos los componentes y estados nuevos.
- Soporte completo para temas claro y oscuro mediante tokens institucionales `--alcspower-*`.
- Historias interactivas y documentación de props en Storybook para todos los nuevos componentes.
