---
"@alcspower/ui": minor
---

### Nuevas características (Data Foundation)

- **Table**: Primitives presentacionales composables (`Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`) con soporte para wrapper responsive (`responsive={true}`), estilos de hover, estados de selección (`data-[state=selected]`) y diseño adaptable.
- **Pagination**: Primitives composables de paginación para SPAs (`Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`) basados en botones accesibles (`role="navigation"`, `aria-label="pagination"`, `aria-current="page"`).
- **Progress**: Barra de progreso accesible con `@radix-ui/react-progress`, variantes semánticas (`default`, `success`, `warning`, `destructive`, `info`), tamaños (`sm`, `md`, `lg`), etiqueta de porcentaje formateable y estado indeterminado.
- **StatusBadge**: Indicador semántico de estado (`success`, `warning`, `error`, `info`, `neutral`) con dot circular y animación opcional `pulse` (no activa por defecto).

### Calidad y Accesibilidad

- Cobertura de pruebas unitarias ampliada de 69 a 121 tests en 24 suites con Vitest y `@testing-library/react`.
- Cero violaciones de accesibilidad WCAG 2.1 AA verificadas con `vitest-axe` en todos los componentes nuevos.
- Soporte completo para temas claro y oscuro mediante tokens institucionales `--alcspower-*`.
- Historias documentadas en Storybook para todos los nuevos componentes bajo categorías 'Data', 'Navegación', 'Feedback' y 'Controles'.
