# @alcspower/ui

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
