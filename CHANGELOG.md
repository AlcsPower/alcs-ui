# @alcspower/ui

## 0.4.0

### Minor Changes

- 5714bfe: ### Nuevas características (Data Foundation)

  - **Table**: Primitives presentacionales composables (`Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`) con soporte para wrapper responsive (`responsive={true}`), estilos de hover, estados de selección (`data-[state=selected]`) y diseño adaptable.
  - **Pagination**: Primitives composables de paginación para SPAs (`Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`) basados en botones accesibles (`role="navigation"`, `aria-label="pagination"`, `aria-current="page"`).
  - **Progress**: Barra de progreso accesible con `@radix-ui/react-progress`, variantes semánticas (`default`, `success`, `warning`, `destructive`, `info`), tamaños (`sm`, `md`, `lg`), etiqueta de porcentaje formateable y estado indeterminado.
  - **StatusBadge**: Indicador semántico de estado (`success`, `warning`, `error`, `info`, `neutral`) con dot circular y animación opcional `pulse` (no activa por defecto).

  ### Calidad y Accesibilidad

  - Cobertura de pruebas unitarias ampliada de 69 a 121 tests en 24 suites con Vitest y `@testing-library/react`.
  - Cero violaciones de accesibilidad WCAG 2.1 AA verificadas con `vitest-axe` en todos los componentes nuevos.
  - Soporte completo para temas claro y oscuro mediante tokens institucionales `--alcspower-*`.
  - Historias documentadas en Storybook para todos los nuevos componentes bajo categorías 'Data', 'Navegación', 'Feedback' y 'Controles'.

## 0.3.0

### Minor Changes

- 853f1e7: ### Correcciones

  - **Button**: Corrección del conflicto entre `asChild` y `isLoading`, inyectando el spinner dentro del elemento hijo sin provocar errores de renderizado.
  - **Tipos de Refs**: Corrección de firmas TypeScript de `forwardRef` para alinear con el DOM renderizado:
    - `AlertTitle`: ref tipado como `HTMLHeadingElement` (`<h5>`).
    - `CardTitle`: ref tipado como `HTMLHeadingElement` (`<h3>`).
    - `AlertDescription`: ref tipado como `HTMLDivElement` (`<div>`).
  - **Checkbox**: Corrección de la reactividad del estado `indeterminate` mediante `data-state` de Radix UI, funcionando tanto en modo controlado como no controlado.
  - **Alert**: Fallback defensivo hacia la variante `'info'` cuando se proporcionan variantes inválidas o desconocidas en runtime.

  ### Extensiones de API

  - **Input**: Nueva prop opcional `containerClassName` para personalizar los estilos y dimensiones del contenedor exterior.
  - **Button**: Nueva variante `destructive` agregada como alias compatible de `danger`.
  - **Badge**: Nueva variante `primary` agregada como alias compatible de `default`.
  - **DialogHeader / DialogFooter**: Incorporación de `React.forwardRef` para permitir el reenvío de refs en composiciones complejas.

  ### Calidad y Pruebas

  - Cobertura completa de pruebas unitarias y de integración para todos los componentes de la librería (69 pruebas en 20 suites).
  - Validación automatizada de accesibilidad (axe-core) con cero violaciones WCAG 2.1 AA.

## 0.2.0

### Minor Changes

- Migración completa de tokens CSS institucionales, capas y utilidades al namespace `@alcspower/ui`:
  - Variables CSS `:root` y `.dark` migradas de `--mific-*` a `--alcspower-*`.
  - Encapsulamiento de estilos en `@layer alcspower-tokens, alcspower-ui`.
  - Clases utilitarias de Tailwind y CVA actualizadas a prefijo `alcspower-*`.
  - Compatibilidad completa verificada con React 18/19 y Tailwind CSS v4.
