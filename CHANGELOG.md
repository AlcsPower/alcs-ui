# @alcspower/ui

## 1.0.0

### Major Changes

- ### Lanzamiento Oficial / General Availability (Fase 7)
  - **Primitivas Enterprise Incorporadas (51 componentes en total):**
    - **`RadioGroup` (`src/components/radio-group`):** Control accesible de selección única basado en `@radix-ui/react-radio-group`, navegación bidireccional por teclado (`Arrow keys`), indicador circular animado y soporte de validación/error.
    - **`Breadcrumb` (`src/components/breadcrumb`):** Jerarquía de navegación semántica WAI-ARIA (`Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`) con soporte polimórfico `asChild` para enrutadores SPA (React Router, Next.js).
    - **`Slider` (`src/components/slider`):** Control deslizante de rango numérico accesible basado en `@radix-ui/react-slider`, con propagación de accesibilidad ARIA al thumb, incrementos por pasos y orientación horizontal.
    - **`Toggle` & `ToggleGroup` (`src/components/toggle`, `src/components/toggle-group`):** Botones conmutadores de dos estados (`Toggle`) y grupos con selección simple/múltiple (`ToggleGroup`) basados en `@radix-ui/react-toggle` y `@radix-ui/react-toggle-group`.
    - **`ContextMenu` (`src/components/context-menu`):** Menú contextual flotante desplegado con clic derecho basado en `@radix-ui/react-context-menu`, con soporte para atajos visuales (`ContextMenuShortcut`), checkboxes, radio items, submenús y variantes destructivas.
  - **Métricas de Calidad y Cobertura:**
    - 50 suites de pruebas unitarias automatizadas con Vitest y `@testing-library/react`.
    - 314/314 pruebas aprobadas con **0 violaciones de accesibilidad** verificadas mediante `axe-core`.
    - 100% de tipos validados estrictamente con `tsc --noEmit`.

## 0.9.0

### Minor Changes

- ### Remediación Técnica de Arquitectura, Accesibilidad y Tokens (Fase 6)
  - **Primitivo Compuesto `Field` (`src/components/field`):** Arquitectura accesible unificada con `Field`, `FieldLabel`, `FieldControl`, `FieldHint`, `FieldError` y asociación determinista de `aria-describedby` y `aria-invalid`.
  - **Sincronización de Animaciones Tailwind v4:** Incorporación de `@keyframes` para overlays, modales, menús y barras de progreso indeterminadas en CSS precompilado.
  - **Escala Métrica Simétrica:** Estandarización de alturas (`sm: h-8`, `md: h-10`, `lg: h-12`) en `Input`, `Textarea` y `SelectTrigger`.
  - **Remediación de Accesibilidad y Robustez:**
    - Corrección de `colSpan` dinámico en `DataTable` al ocultar columnas.
    - Eliminación de encabezados semánticos fijos en celdas de tabla.
    - Intercepción segura de clics en `Button` con enlaces (`asChild`) durante estado de carga.
    - Incorporación de `VisuallyHidden` para anuncios accesibles limpios.
    - Soporte integral de `prefers-reduced-motion` en animaciones.

## 0.8.0

### Minor Changes

- ### Sistema de Fechas, Paleta de Comandos y Selección Avanzada (Fase 5)

  - **Primitivo `Popover` (`src/components/popover`):**
    - Primitiva accesible basada en `@radix-ui/react-popover` con soporte para portales, posicionamiento automático, colisiones de viewport y gestión de foco WAI-ARIA.
    - Exporta `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor`, `PopoverClose`.

  - **Componente `Calendar` (`src/components/calendar`):**
    - Integración nativa con `react-day-picker` v10 y `date-fns/locale/es`.
    - Localización en español por defecto con posibilidad de configurar cualquier locale.
    - Soporte completo para selección simple (`mode="single"`), múltiple (`mode="multiple"`) y por rango (`mode="range"`).
    - Navegación por teclado accesible con íconos Chevrons de Lucide y estilizado semántico con tokens del sistema de diseño.

  - **Componente `DatePicker` (`src/components/date-picker`):**
    - Selector de fecha individual con popover interactivo, formateo configurable (`dd/MM/yyyy` por defecto).
    - Integración nativa con el primitivo `Field` (soporte de `hasError`, `disabled`, `required`).
    - Botón de limpieza rápida (`clearable`), escala de tamaños (`sm`, `md`, `lg`) y arquitectura de controles no anidados para cumplimiento estricto de WCAG.

  - **Componente `DateRangePicker` (`src/components/date-range-picker`):**
    - Selector de rangos de fechas (`from` y `to`) con soporte para vista dual mensual (`numberOfMonths={2}`).
    - Panel lateral de atajos rápidos (Hoy, Ayer, Últimos 7 días, Últimos 30 días, Este mes, Mes anterior).
    - Limpieza rápida y escala de tamaños (`sm`, `md`, `lg`).

  - **Paleta de Comandos `Command` & `CommandDialog` (`src/components/command`):**
    - Motor de búsqueda en tiempo real basado en `cmdk` v1 con navegación por teclado fluida.
    - Diálogo modal con atajo de teclado (`CommandDialog`), grupos de comandos, badges de atajo (`CommandShortcut`), separadores e indicador de búsqueda vacía (`CommandEmpty`).

  - **Selector Avanzado `Combobox` (`src/components/combobox`):**
    - Selector desplegable con búsqueda interactiva en tiempo real.
    - Soporte para agrupación de opciones y filtrado instantáneo.
    - Modo selección simple y modo selección múltiple con chips interactivos (`Badge`) removibles.
    - Escala de tamaños (`sm`, `md`, `lg`), estado de error e integración con `Field`.

## 0.7.0

### Minor Changes

- ### Sistema Completo de Gráficos y Métricas (Fase 4)

  - **Infraestructura y Primitivos de Visualización (`src/components/chart`):**
    - Integración nativa con **Recharts 3.x** compatible al 100% con React 19.
    - Componente `<ChartContainer>` con inyección dinámica de variables CSS `--color-*`, cálculo responsivo y accesibilidad nativa (`role="img"`, `aria-label`).
    - Contexto tipado `<ChartContext>` y hook `useChart()` para orquestación de paletas semánticas y etiquetas legibles.
    - Tooltip interactivo accesible `<ChartTooltip>` y `<ChartTooltipContent>` con soporte para variantes de indicadores visuales (`dot`, `line`, `dashed`), formateadores personalizados de valores y nombres.
    - Leyenda semántica configurable `<ChartLegend>` y `<ChartLegendContent>`.
    - Componentes de gráficos de alto nivel listos para producción:
      - `<BarChart>`: Gráficos de barras verticales y horizontales, con soporte para apilamiento (`stacked`) y agrupamiento.
      - `<LineChart>`: Gráficos de líneas con curvas suaves (`monotone`, `natural`, `step`), puntos de datos interactivos y grosores de trazo configurables.
      - `<AreaChart>`: Gráficos de área con gradientes semánticos de opacidad vertical y soporte para áreas apiladas.
      - `<PieChart>`: Gráficos circulares y de dona (`donut={true}`), con soporte para colores de celdas personalizados.
    - Re-exportación completa de primitivos Recharts desde `@alcspower/ui` para composición avanzada sin dependencias directas adicionales.

  - **Tarjetas de Métricas y KPIs (`src/components/metrics`):**
    - `<DeltaIndicator>`: Indicador de variación con soporte para variantes `positive`, `negative` y `neutral`, flechas direccionales (`TrendingUp`, `TrendingDown`, `Minus`), textos accesibles automáticos e inversión semántica (`isPositiveGood={false}`) para métricas como latencia, errores o costos.
    - `<MetricCard>`: Tarjeta métrica ejecutiva con soporte para títulos, valores destacados, indicadores delta, slots de acciones personalizadas, descripciones secundarias, niveles semánticos de encabezado configurables (`headingLevel`), estado de carga con `<Skeleton>` y estado de error accesible.
    - `<StatCard>`: Tarjeta estadística compacta con barras de progreso integradas y etiquetas badge para monitoreo de capacidad o hitos.

  - **Tokens Semánticos de Visualización (`src/styles/tokens.css`):**
    - Se incorporó la escala de color de gráficos `--alcspower-chart-1` a `--alcspower-chart-5` calibrada para modo claro y modo oscuro.
    - Cumplimiento verificado matemáticamente contra WCAG 2.1 §1.4.11 (contraste no textual >= 3.0:1) en `src/styles/contrast.test.ts`.

## 0.6.0

### Minor Changes

- ### Nuevas características de Formularios, Escala de Tamaños y Accesibilidad (Fase 3)

  - **Field (Primitivo Compuesto):**

    - Se implementó la familia de componentes `<Field>`, `<FieldLabel>`, `<FieldControl>`, `<FieldHint>` y `<FieldError>`.
    - Gestión determinista de identificadores únicos mediante `React.useId()` con soporte para IDs personalizados.
    - Sincronización automática de `htmlFor`, `hasError`, `disabled`, `required` y atributos ARIA (`aria-describedby`, `aria-invalid`).
    - Soporte de composición polimórfica accesible mediante `asChild` en `FieldControl` para integración transparente con `Input`, `Textarea`, `SelectTrigger` y controles nativos.
    - Historias interactivas y suite exhaustiva de tests con Axe Core.

  - **Escala de Tamaños (`size: 'sm' | 'md' | 'lg'`):**

    - **Input**: Se incorporó escala métrica de tamaños (`sm: h-8`, `md: h-10` por defecto, `lg: h-12`) con ajuste responsivo de posicionamiento interno para `leftElement` y `rightElement`. Se exportó `inputVariants` vía `cva`.
    - **Textarea**: Se añadió escala de tamaños (`sm: min-h-[64px]`, `md: min-h-[80px]` por defecto, `lg: min-h-[110px]`). Se exportó `textareaVariants` vía `cva`.
    - **SelectTrigger**: Se añadió soporte para `size: 'sm' | 'md' | 'lg'` con escalado proporcional del icono indicador `ChevronDown`. Se exportó `selectTriggerVariants` vía `cva`.

  - **Avatar (`size: 'sm' | 'md' | 'lg' | 'xl'`):**

    - Se incorporó escala de tamaños con variantes `sm` (h-8 w-8), `md` (h-10 w-10 por defecto), `lg` (h-12 w-12) y `xl` (h-16 w-16).
    - Sincronización automática del tamaño de fuente en `AvatarFallback`. Se exportó `avatarVariants` vía `cva`.

  - **VisuallyHidden (Primitivo Accesible):**

    - Se creó y exportó públicamente el componente `VisuallyHidden` para contenido exclusivo de lectores de pantalla.
    - Soporte para delegación `asChild` mediante Radix Slot para evitar nodos innecesarios en el DOM.

  - **Suite Automatizada de Contraste WCAG 2.1:**
    - Se incorporó la suite matemática de validación de contraste en `src/styles/contrast.test.ts`.
    - Se calibró `--alcspower-destructive-foreground` a `#1a0202` en modo oscuro para garantizar cumplimiento estricto de WCAG AA (>= 4.5:1).

## 0.5.1

### Patch Changes

- ### Correcciones de Pipeline, Accesibilidad y Consistencia de API (Fases 1 y 2)

  - **Pipeline y Build:**

    - Se configuró `@tailwindcss/vite` en Storybook (`.storybook/main.ts`), habilitando la compilación completa de utilidades de Tailwind CSS v4.
    - Se agregaron keyframes nativos `@keyframes enter`, `@keyframes exit`, `@keyframes progress-indeterminate` y clases utilitarias (`animate-in`, `animate-out`, `fade-in-*`, `fade-out-*`, `zoom-in-*`, `slide-in-*`, `rounded-inherit`) en `src/styles/animations.css`.
    - Se agregó la directiva `@custom-variant dark` en `src/styles/index.css` para sincronizar las utilidades `dark:` con las clases institucionales `.dark` y atributos `[data-theme="dark"]`.
    - Se mapearon los tokens de sombras `--shadow-alcspower-*` y `--shadow-*` en el bloque `@theme` de `src/styles/index.css`, garantizando elevación reforzada para modo oscuro.

  - **Accesibilidad y Lógica de Componentes:**

    - **DataTable**: Se corrigió el cálculo de `visibleColumnsCount` para respetar estrictamente las columnas visibles al ocultar columnas, evitando discrepancias en el esqueleto de carga y `colSpan` de filas vacías/error.
    - **Select**: Se agregó el atributo `aria-invalid` a `SelectTrigger` cuando `hasError={true}`.
    - **Progress**: Se añadió accesible name (`aria-label="Progreso"`) por defecto, conexión dinámica con `aria-labelledby` cuando `showLabel={true}`, exportación pública de variantes CVA y documentación JSDoc para el estado indeterminado (`value?: number | null`).
    - **LoadingOverlay**: Se desacoplaron las regiones vivas anidadas evitando anuncios duplicados en lectores de pantalla.
    - **Pagination**: Se retiró `aria-hidden="true"` del contenedor de `PaginationEllipsis` para exponer la etiqueta accesible de página truncada, se exportó `paginationLinkVariants` y se actualizó el `aria-label` por defecto a español ("Paginación").
    - **Spinner**: Se incorporó soporte para `motion-reduce:animate-none` y prop decorativa `aria-hidden`.

  - **Consistencia de Tokens y API:**
    - **Switch**: Se migró el thumb al token semántico `bg-alcspower-surface`.
    - **Overlays**: Se migraron los radios de borde en `Dialog`, `DropdownMenu`, `Select`, `Tooltip` y `Card` a los tokens institucionales `rounded-alcspower-*`.
    - **DropdownMenu**: Se agregó la variante `variant="destructive"` a `DropdownMenuItem`.
    - **Alert, EmptyState y ErrorState**: Se agregaron props configurables `as` y `titleHeadingLevel` para jerarquías semánticas de encabezados válidas, además de la variante `compact` para `EmptyState` y `ErrorState`.
    - **Deprecaciones**: Se documentó formalmente `@deprecated` en variantes redundantes (`danger` en favor de `destructive`, y `default` en Badge en favor de `primary`).
    - **Documentación**: Se agregó la sección formal de componentes de Datos (`Table`, `DataTable`) en el `README.md`.

## 0.5.0

### Minor Changes

- ad787b0: ### Nuevas características (DataTable & Support Feedback)

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
