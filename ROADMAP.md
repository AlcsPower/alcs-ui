# Roadmap — @alcspower/ui

Roadmap integral para la evolución de `@alcspower/ui` como una librería UI genérica, reutilizable y orientada a aplicaciones modernas.

> **Objetivo principal:** ampliar el catálogo de componentes, especialmente componentes de datos, dashboards y visualización, sin introducir lógica de negocio ni acoplar la librería a MIFIC, Helpdesk u otra aplicación consumidora.

---

## 1. Estado actual

### v0.4.0 — Completado

- Table composable primitives (`Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`).
- Pagination composable primitives (`Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`).
- Progress con `@radix-ui/react-progress`, variantes semánticas y tamaños.
- StatusBadge con variantes de estado, indicador `dot` y `pulse` opcional.
- 24 suites / 121 tests (todos pasando).
- 0 violaciones detectadas por axe-core.
- TypeScript sin errores (`tsc --noEmit`).
- Build ESM/CJS/DTS/CSS verificado.
- Storybook compilado y verificado.
- Helpdesk permanece aislado y sin modificaciones.

### v0.3.0 — Completado

- Auditoría de API pública.
- Corrección de hallazgos H-01..H-10.
- Correcciones de tipos y comportamiento.
- Soporte adicional de variantes.
- 20 suites / 69 tests.
- 0 violaciones detectadas por axe.
- TypeScript sin errores.
- Build ESM/CJS/DTS/CSS verificado.
- Storybook verificado.
- Package publicado en GitHub Packages.
- Release `v0.3.0` creado.
- Tag `v0.3.0` creado.
- Consumer installation verificado.
- Helpdesk permanece aislado y sin modificaciones.

---

# 2. Visión del proyecto

`@alcspower/ui` debe evolucionar desde una colección de primitives hacia un **design system de aplicación** capaz de cubrir los patrones habituales de:

- sistemas administrativos
- dashboards
- ERP
- CRM
- Helpdesk
- inventarios
- monitoreo
- analítica
- RRHH
- finanzas
- portales internos
- herramientas SaaS
- aplicaciones B2B
- aplicaciones móviles/web responsive

La librería debe proporcionar las piezas visuales y de interacción; la aplicación consumidora debe proporcionar los datos y la lógica de negocio.

---

# 3. Principios arquitectónicos

## 3.1 Componentes genéricos

No crear componentes específicos de una aplicación:

```tsx
<HelpdeskTicketTable />
<MificDashboard />
<TicketStatusChart />
```

Crear primitives reutilizables:

```tsx
<DataTable />
<DashboardGrid />
<ChartCard />
<BarChart />
<StatusBadge />
```

## 3.2 Evitar componentes monolíticos

No crear un componente gigante como:

```tsx
<Dashboard />
```

Preferir composición:

```tsx
<DashboardGrid>
  <MetricCard />
  <ChartCard>
    <LineChart />
  </ChartCard>
  <DataTable />
</DashboardGrid>
```

## 3.3 API pública estable

Cada componente nuevo debe considerar desde el inicio:

- TypeScript.
- React 18.
- React 19.
- ESM.
- CJS.
- accesibilidad.
- dark mode.
- responsive cuando aplique.
- estados loading/error/empty cuando aplique.
- Storybook.
- tests.
- documentación.

---

# 4. Inventario objetivo de componentes

## 4.1 Primitives y layout

- [x] Button
- [x] Input
- [x] Textarea
- [x] Label
- [x] Card
- [x] Badge
- [x] Avatar
- [x] Checkbox
- [x] Switch
- [x] Select
- [x] Separator
- [ ] AspectRatio
- [ ] ScrollArea
- [ ] Resizable
- [ ] Collapsible
- [ ] Accordion
- [ ] Toggle
- [ ] ToggleGroup
- [ ] Spacer
- [ ] Container
- [ ] Stack
- [ ] Grid
- [ ] VisuallyHidden

## 4.2 Navigation

- [ ] Sidebar
- [ ] SidebarItem
- [ ] Navbar
- [ ] Breadcrumb
- [ ] NavigationMenu
- [ ] Menubar
- [ ] Command
- [ ] CommandPalette
- [ ] ContextMenu
- [ ] Stepper
- [ ] Wizard
- [x] Pagination
- [ ] Tabs — evolución

## 4.3 Overlays

- [x] Dialog
- [x] DropdownMenu
- [x] Tooltip
- [ ] AlertDialog
- [ ] Drawer
- [ ] Sheet
- [ ] Popover
- [ ] HoverCard
- [ ] ContextMenu
- [ ] ConfirmDialog
- [ ] FullscreenDialog

## 4.4 Feedback

- [x] Alert
- [x] Skeleton
- [x] Spinner
- [x] EmptyState
- [ ] Toast
- [ ] Toaster
- [x] Progress
- [ ] CircularProgress
- [ ] LoadingOverlay
- [ ] Result
- [ ] Status
- [ ] Callout
- [ ] ErrorState
- [ ] SuccessState

---

# 5. v0.4.0 — Data Foundation

## Objetivo

Construir las primitives de presentación y feedback fundamentales para la capa de datos.

## Componentes

- [x] Table
- [x] Pagination
- [x] Progress
- [x] StatusBadge

## Table

`Table` es una colección de componentes de presentación composables (`Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`).

Permite:

- header
- body
- rows
- cells
- footer
- caption
- responsive wrapper (`responsive={true}`)
- alineación
- estados visuales (`data-[state=selected]`, hover)

## Pagination

Componente composable para navegación de páginas en aplicaciones SPA (`Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`).

## Progress

Barra de progreso accesible basada en `@radix-ui/react-progress`, con variantes institucionales, tamaños (`sm`, `md`, `lg`), etiqueta de porcentaje y estado indeterminado.

## StatusBadge

Indicador semántico de estado (`success`, `warning`, `error`, `info`, `neutral`), con indicador circular (`dot`) y pulso animado opcional (`pulse`).

---

# 6. v0.5.0 — DataTable

## Objetivo

Construir `DataTable` sobre TanStack Table v8 como versión dedicada para validar tempranamente la arquitectura de componentes complejos, modelos de estado controlado/no controlado y rendimiento antes de escalar el resto del catálogo.

## Componentes

- [ ] DataTable
- [ ] ErrorState
- [ ] LoadingOverlay

### Funcionalidades iniciales

- [ ] Column definitions
- [ ] Type-safe rows
- [ ] Custom cell rendering
- [ ] Sorting
- [ ] Multi-column sorting
- [ ] Filtering
- [ ] Global search
- [ ] Pagination
- [ ] Page size
- [ ] Row selection
- [ ] Select all
- [ ] Column visibility
- [ ] Empty state
- [ ] Loading state
- [ ] Error state
- [ ] Responsive mode
- [ ] Keyboard navigation
- [ ] Accessible labels

### Segunda etapa

- [ ] Column ordering
- [ ] Column resizing
- [ ] Sticky header
- [ ] Expandable rows
- [ ] Bulk actions
- [ ] Row actions
- [ ] Server-side sorting
- [ ] Server-side filtering
- [ ] Server-side pagination
- [ ] Export hooks
- [ ] Virtualization

### Regla

La DataTable no debe encargarse de realizar requests HTTP ni conocer APIs concretas. La aplicación controla fetching, caching y persistencia.

---

# 7. v0.6.0 — Chart System

## Objetivo

Crear un sistema de gráficos consistente, reutilizable y preparado para dashboards.

## Charts principales

- [ ] LineChart
- [ ] AreaChart
- [ ] BarChart
- [ ] PieChart
- [ ] DonutChart
- [ ] ComposedChart
- [ ] ScatterChart
- [ ] RadarChart
- [ ] RadialChart

## Charts secundarios

- [ ] Sparkline
- [ ] Gauge
- [ ] FunnelChart
- [ ] Treemap
- [ ] Heatmap

## Infraestructura

- [ ] ChartContainer
- [ ] ChartTooltip
- [ ] ChartLegend
- [ ] ChartAxis
- [ ] ChartGrid
- [ ] ChartSkeleton
- [ ] ChartEmptyState
- [ ] ChartErrorState

## Capacidades

- [ ] Responsive
- [ ] Dark mode
- [ ] Loading
- [ ] Empty
- [ ] Error
- [ ] Tooltips
- [ ] Legends
- [ ] Value formatting
- [ ] Date formatting
- [ ] Number formatting
- [ ] Custom labels
- [ ] Custom domains
- [ ] Multiple series
- [ ] Stacked charts
- [ ] Accessibility labels

## Arquitectura

No hacer simplemente wrappers de Recharts.

Crear una abstracción propia de `@alcspower/ui` que controle:

- tokens
- tipografía
- spacing
- grid
- tooltip
- legend
- responsive behavior
- dark mode
- estados
- formatting
- accesibilidad

El motor de gráficos debe ser reemplazable en el futuro sin romper la API pública.

---

# 8. v0.7.0 — Dashboard System

## Objetivo

Crear primitives específicas para construir dashboards modernos mediante composición.

## Layout

- [ ] DashboardGrid
- [ ] DashboardSection
- [ ] DashboardHeader
- [ ] DashboardToolbar
- [ ] DashboardWidget
- [ ] ResizablePanelGroup
- [ ] SplitView
- [ ] BentoGrid

## Métricas

- [ ] MetricCard
- [ ] StatCard
- [ ] KPICard
- [ ] Trend
- [ ] Comparison
- [ ] TargetProgress
- [ ] DeltaIndicator

## Cards

- [ ] ChartCard
- [ ] ActivityCard
- [ ] InsightCard
- [ ] SummaryCard
- [ ] DataCard

## Estados

- [ ] Dashboard loading
- [ ] Dashboard empty
- [ ] Dashboard error
- [ ] Widget loading
- [ ] Widget empty
- [ ] Widget error
- [ ] Widget refresh
- [ ] Widget fullscreen
- [ ] Widget actions

## Dashboard responsive

- [ ] Desktop grid
- [ ] Tablet grid
- [ ] Mobile stacking
- [ ] Breakpoint-aware columns
- [ ] Compact cards
- [ ] Mobile toolbar

---

# 9. v0.8.0 — Advanced Forms

## Form infrastructure

- [ ] Form
- [ ] FormField
- [ ] FormItem
- [ ] FormLabel
- [ ] FormDescription
- [ ] FormMessage
- [ ] FormControl

## Inputs

- [ ] SearchInput
- [ ] PasswordInput
- [ ] NumberInput
- [ ] InputOTP
- [ ] TagsInput
- [ ] MultiSelect
- [ ] MaskedInput
- [ ] CurrencyInput

## Selection

- [ ] RadioGroup
- [ ] Combobox
- [ ] Autocomplete
- [ ] Toggle
- [ ] ToggleGroup
- [ ] Slider
- [ ] RangeSlider

## Dates

- [ ] Calendar
- [ ] DatePicker
- [ ] DateRangePicker
- [ ] TimePicker
- [ ] DateTimePicker

## Files

- [ ] FileUpload
- [ ] Dropzone
- [ ] AvatarUpload

## Advanced

- [ ] ColorPicker
- [ ] RichTextEditor — evaluar como módulo independiente

---

# 10. v0.9.0 — Navigation & Commands

## Navigation

- [ ] Sidebar
- [ ] SidebarItem
- [ ] Navbar
- [ ] Breadcrumb
- [ ] NavigationMenu
- [ ] Menubar

## Command system

- [ ] Command
- [ ] CommandInput
- [ ] CommandList
- [ ] CommandGroup
- [ ] CommandItem
- [ ] CommandPalette

## Command Palette

Debe contemplar:

- [ ] búsqueda
- [ ] grupos
- [ ] shortcuts
- [ ] keyboard navigation
- [ ] icons
- [ ] disabled commands
- [ ] recent commands
- [ ] async results
- [ ] nested commands

## Process navigation

- [ ] Stepper
- [ ] Wizard
- [ ] WizardStep

---

# 11. v0.10.0 — Overlays & Feedback

## Overlays

- [ ] AlertDialog
- [ ] ConfirmDialog
- [ ] Drawer
- [ ] Sheet
- [ ] Popover
- [ ] HoverCard
- [ ] ContextMenu

## Feedback

- [ ] Toast
- [ ] Toaster
- [ ] Progress
- [ ] CircularProgress
- [ ] LoadingOverlay
- [ ] Result
- [ ] Status
- [ ] Callout
- [ ] ErrorState
- [ ] SuccessState

## Estados estándar

Los componentes que correspondan deben poder representar:

- loading
- disabled
- error
- success
- warning
- empty
- pending

---

# 12. v0.11.0 — Advanced Data Visualization

## Timeline

- [ ] Timeline
- [ ] TimelineItem
- [ ] TimelineConnector
- [ ] TimelineContent

Casos de uso:

- historial
- auditoría
- procesos
- tickets
- actividad
- cambios

## Activity Feed

- [ ] ActivityFeed
- [ ] ActivityItem
- [ ] actor
- [ ] avatar
- [ ] timestamp
- [ ] action
- [ ] metadata
- [ ] status
- [ ] grouping

## Calendar

- [ ] Calendar
- [ ] MonthView
- [ ] WeekView
- [ ] DayView
- [ ] Event
- [ ] EventCard

## Kanban

- [ ] Kanban
- [ ] KanbanColumn
- [ ] KanbanCard
- [ ] Drag & drop
- [ ] WIP indicator
- [ ] Keyboard accessibility

## Tree

- [ ] Tree
- [ ] TreeItem
- [ ] TreeView
- [ ] expand/collapse
- [ ] selection
- [ ] keyboard navigation
- [ ] async loading

## Organización

- [ ] OrganizationChart
- [ ] OrgNode

---

# 13. v0.12.0 — Files & Documents

## Upload

- [ ] FileUpload
- [ ] Dropzone
- [ ] AvatarUpload

## File management

- [ ] FileList
- [ ] FileItem
- [ ] FilePreview
- [ ] Attachment
- [ ] AttachmentList
- [ ] DocumentCard

## Media

- [ ] Image
- [ ] ImagePreview
- [ ] ImageGallery
- [ ] Carousel

## Upload states

- [ ] queued
- [ ] uploading
- [ ] progress
- [ ] completed
- [ ] failed
- [ ] retry
- [ ] cancelled
- [ ] validation error

---

# 14. v0.13.0 — Advanced Application Components

## Kanban

- [ ] Drag & drop
- [ ] Keyboard support
- [ ] Column limits
- [ ] Card actions
- [ ] Card metadata
- [ ] Loading states

## Calendar

- [ ] Month
- [ ] Week
- [ ] Day
- [ ] Agenda
- [ ] Events
- [ ] Event indicators
- [ ] Responsive views

## TreeView

- [ ] nested data
- [ ] selection
- [ ] multiple selection
- [ ] expand/collapse
- [ ] async nodes
- [ ] drag & drop — evaluar

## Rich content

- [ ] Accordion
- [ ] Collapsible
- [ ] ScrollArea
- [ ] AspectRatio
- [ ] Carousel
- [ ] Markdown
- [ ] CodeBlock
- [ ] CopyButton
- [ ] Truncate
- [ ] ReadMore

---

# 15. v0.14.0 — Responsive & Mobile Refinement

## Objetivo

Garantizar una experiencia coherente en desktop, tablet y mobile.

## Prioridad alta

- [ ] Sidebar
- [ ] DataTable
- [ ] Dialog
- [ ] Drawer
- [ ] Sheet
- [ ] Charts
- [ ] DashboardGrid
- [ ] Navbar
- [ ] Forms

## Patrones

- [ ] Mobile sidebar
- [ ] Responsive table
- [ ] Horizontal scrolling controlado
- [ ] Mobile chart sizing
- [ ] Touch-friendly controls
- [ ] Bottom sheet
- [ ] Mobile dialog
- [ ] Responsive form layouts
- [ ] Responsive dashboard widgets

---

# 16. v0.15.0 — Accessibility & UX Hardening

## Objetivo

Consolidar accesibilidad, interacción y consistencia visual antes de estabilizar la API para `1.0.0`.

> Objetivo de diseño: **WCAG 2.1 AA**. No presentar la librería como certificada sin una auditoría formal correspondiente.

## Accessibility

- [ ] Keyboard navigation
- [ ] Focus management
- [ ] Focus visible
- [ ] Focus trap donde corresponda
- [ ] Screen reader labels
- [ ] ARIA correcta
- [ ] Contrast
- [ ] No color-only semantics
- [ ] Reduced motion
- [ ] Dark mode
- [ ] High contrast considerations
- [ ] Disabled states
- [ ] Loading states
- [ ] Error states

## Testing

- [ ] Vitest
- [ ] Testing Library
- [ ] axe
- [ ] Keyboard tests
- [ ] Interaction tests
- [ ] Focus tests
- [ ] Screen-reader manual validation

---

# 17. Componentes modernos / en tendencia

Esta categoría debe revisarse continuamente, porque los patrones de UI evolucionan más rápido que el resto de la librería.

## Prioridad muy alta

- [ ] DataTable
- [ ] Chart System
- [ ] DashboardGrid
- [ ] MetricCard
- [ ] ChartCard
- [ ] CommandPalette
- [ ] Combobox
- [ ] DateRangePicker
- [ ] Sidebar
- [ ] FileUpload
- [ ] ResizablePanelGroup

## Prioridad alta

- [ ] BentoGrid
- [ ] ActivityFeed
- [ ] Timeline
- [ ] Kanban
- [ ] Calendar
- [ ] TreeView
- [ ] Sparkline
- [ ] Gauge
- [ ] NotificationCenter
- [ ] UserMenu
- [ ] Spotlight
- [ ] FloatingActionButton

## Prioridad media

- [ ] Heatmap
- [ ] FunnelChart
- [ ] Treemap
- [ ] OrganizationChart
- [ ] ImageGallery
- [ ] Advanced Carousel
- [ ] RichTextEditor

---

# 18. Dashboard patterns que debemos soportar

La librería debe poder cubrir dashboards de diferentes tipos sin crear componentes específicos para cada aplicación.

## Operacional

- KPIs
- estado actual
- actividad reciente
- alertas
- tablas
- tendencias

## Analítico

- series temporales
- comparaciones
- distribución
- correlaciones
- segmentación
- filtros por periodo

## Administrativo

- métricas
- tablas
- estados
- acciones rápidas
- seguimiento
- actividad

## Monitoring

- status indicators
- uptime
- gauges
- sparkline
- series temporales
- alertas
- eventos

---

# 19. Patrones de estados

Todos los componentes de datos deberían considerar cuatro estados fundamentales:

```text
Loading
   ↓
Data ──────────────→ Empty
   ↓
Success
   ↓
Error
```

Ejemplo:

```tsx
<ChartCard>
  {loading && <ChartSkeleton />}
  {error && <ChartErrorState />}
  {empty && <ChartEmptyState />}
  {data.length > 0 && <LineChart data={data} />}
</ChartCard>
```

Esto evita que cada aplicación implemente sus propios patrones de loading/error/empty.

---

# 20. Sistema de diseño visual

Cada nuevo componente debe utilizar los tokens existentes de `@alcspower/ui` y evitar valores visuales hardcodeados cuando exista un token semántico equivalente.

## Debe cubrir

- background
- foreground
- surface
- surface-muted
- primary
- destructive
- success
- warning
- info
- borders
- focus ring
- radius
- shadows
- typography
- spacing

## Dark mode

Debe diseñarse desde el inicio, no agregarse al final.

Especial atención a:

- contraste de texto secundario
- bordes
- estados disabled
- placeholders
- charts
- tooltips
- tablas
- badges
- focus rings
- estados success/warning/error

---

# 21. Responsive strategy

Los componentes deben tener tres niveles de validación:

### Desktop

- mouse
- teclado
- tablas amplias
- múltiples columnas
- dashboards multicolumna

### Tablet

- reducción de columnas
- navegación compacta
- charts adaptables
- cards reorganizables

### Mobile

- touch
- navegación compacta
- tablas scrollables o transformadas
- cards apiladas
- dialogs adaptados
- bottom sheets cuando corresponda

---

# 22. Testing strategy

Cada nuevo componente debe incluir tests desde su primera implementación.

## Unit tests

- [ ] rendering
- [ ] props
- [ ] variants
- [ ] events
- [ ] keyboard
- [ ] states

## Accessibility

- [ ] axe
- [ ] semantic HTML
- [ ] labels
- [ ] roles
- [ ] focus

## Integration

Cuando corresponda:

- [ ] DataTable + pagination
- [ ] Combobox + forms
- [ ] DateRangePicker + forms
- [ ] Chart + ChartCard
- [ ] DashboardGrid + widgets

## Consumer compatibility

Mantener pruebas para:

- React 18 + Tailwind 3
- React 19 + Tailwind 4
- React 19 sin Tailwind

---

# 23. Storybook strategy

Cada componente nuevo debe tener:

- [ ] Default story
- [ ] Variants
- [ ] Disabled
- [ ] Loading
- [ ] Empty
- [ ] Error cuando aplique
- [ ] Dark mode
- [ ] Responsive examples
- [ ] Accessibility examples

Para componentes complejos:

- [ ] DataTable playground
- [ ] Chart playground
- [ ] Dashboard composition examples
- [ ] Form examples

---

# 24. Documentación

Cada componente público debe documentar:

- propósito
- instalación/import
- API
- props
- ejemplos
- variantes
- accesibilidad
- estados
- responsive behavior
- restricciones conocidas

Los componentes complejos deben incluir recomendaciones de uso.

---

# 25. Dependencias y arquitectura

## Mantener

- React
- TypeScript
- Radix UI / Base UI cuando corresponda
- Lucide
- CVA
- clsx
- tailwind-merge
- Recharts para la primera generación del sistema de charts

## Evaluar antes de agregar

- date libraries
- drag & drop libraries
- rich text editors
- virtualization
- advanced data-grid engines

No agregar una dependencia pesada solamente para resolver un componente pequeño.

---

# 26. Componentes de alta complejidad

Estos componentes no deben entrar automáticamente al core solamente porque sean populares.

## Evaluar como módulos independientes

- [ ] RichTextEditor
- [ ] Full DataGrid empresarial
- [ ] Virtualized DataTable
- [ ] Advanced Calendar
- [ ] Diagram / Flow Editor
- [ ] Form Builder
- [ ] Page Builder
- [ ] Spreadsheet-like Grid

### Motivo

Pueden introducir:

- dependencias grandes
- APIs complejas
- problemas de accesibilidad
- mantenimiento elevado
- breaking changes frecuentes

La prioridad debe ser mantener un core pequeño y estable.

---

# 27. Priorización global

| Prioridad | Área | Componentes clave |
|---|---|---|
| P0 | Data | Table, DataTable, Pagination |
| P0 | Charts | Line, Area, Bar, Pie, Donut, Composed |
| P0 | Dashboard | MetricCard, ChartCard, DashboardGrid |
| P1 | Forms | Combobox, DatePicker, DateRangePicker, MultiSelect |
| P1 | Navigation | Sidebar, Command, CommandPalette, Breadcrumb |
| P1 | Feedback | Toast, Progress, LoadingOverlay, Result |
| P1 | Files | FileUpload, Dropzone, Attachment |
| P2 | Data advanced | Timeline, ActivityFeed, Calendar, Kanban, TreeView |
| P2 | Visualization | Sparkline, Gauge, Heatmap, Funnel, Treemap |
| P2 | Layout | BentoGrid, ResizablePanelGroup, SplitView |
| P3 | Advanced | RichTextEditor, Flow Editor, Form Builder |

---

# 28. Secuencia de implementación

```text
v0.3.0
API / Quality ✅
    │
    ▼
v0.4.0
Data Foundation (Table + Pagination + Progress + StatusBadge) ✅
    │
    ▼
v0.5.0
DataTable + ErrorState + LoadingOverlay
    │
    ▼
v0.6.0
Chart System
    │
    ▼
v0.7.0
Dashboard System
    │
    ▼
v0.8.0
Advanced Forms
    │
    ▼
v0.9.0
Navigation + Command
    │
    ▼
v0.10.0
Overlays + Feedback
    │
    ▼
v0.11.0
Advanced Visualization
    │
    ▼
v0.12.0
Files + Documents
    │
    ▼
v0.13.0
Calendar + Kanban + Tree
    │
    ▼
v0.14.0
Responsive / Mobile
    │
    ▼
v0.15.0
Accessibility / UX Hardening
    │
    ▼
v1.0.0
API Stable
```

---

# 29. v1.0.0 — Production Baseline

`1.0.0` debe representar estabilidad de API, no necesariamente que la librería contenga absolutamente todos los componentes posibles.

## Core

- [ ] primitives completas
- [ ] overlays
- [ ] feedback
- [ ] navigation
- [ ] forms

## Data

- [ ] Table
- [ ] DataTable
- [ ] Sorting
- [ ] Filtering
- [ ] Pagination
- [ ] Selection
- [ ] Responsive

## Charts

- [ ] Line
- [ ] Area
- [ ] Bar
- [ ] Pie
- [ ] Donut
- [ ] Composed
- [ ] Scatter
- [ ] Radar
- [ ] Radial

## Dashboard

- [ ] DashboardGrid
- [ ] MetricCard
- [ ] ChartCard
- [ ] KPI
- [ ] Trend
- [ ] ActivityCard

## Forms

- [ ] Form infrastructure
- [ ] Combobox
- [ ] DatePicker
- [ ] DateRangePicker
- [ ] MultiSelect
- [ ] FileUpload
- [ ] InputOTP

## Navigation

- [ ] Sidebar
- [ ] Breadcrumb
- [ ] Command
- [ ] CommandPalette
- [ ] NavigationMenu

## Advanced

- [ ] Timeline
- [ ] ActivityFeed
- [ ] Calendar
- [ ] Kanban
- [ ] TreeView

## Calidad

- [ ] API estable
- [ ] TypeScript estable
- [ ] ESM/CJS estable
- [ ] React 18/19
- [ ] Tailwind 3/4 compatibility
- [ ] No Tailwind consumer
- [ ] Accessibility testing
- [ ] Responsive testing
- [ ] Storybook
- [ ] Documentation
- [ ] Release automation

---

# 30. Definition of Done

Un componente no se considera terminado solamente porque renderice correctamente.

Debe cumplir:

```text
Implementation
    ↓
TypeScript
    ↓
Tests
    ↓
Accessibility
    ↓
Dark mode
    ↓
Responsive (si aplica)
    ↓
Storybook
    ↓
Documentation
    ↓
Build
    ↓
Consumer compatibility
    ↓
Changeset
```

Checklist:

- [ ] Implementado
- [ ] API revisada
- [ ] TypeScript
- [ ] Tests
- [ ] Accessibility
- [ ] Dark mode
- [ ] Responsive
- [ ] Storybook
- [ ] Docs
- [ ] Build
- [ ] ESM
- [ ] CJS
- [ ] DTS
- [ ] Consumer test
- [ ] Changeset

---

# 31. Próximo milestone recomendado

## v0.5.0 — DataTable

El siguiente trabajo debe concentrarse exclusivamente en la construcción y validación del componente `DataTable`:

```text
DataTable (TanStack Table v8)
  ├── Sorting (single / multi)
  ├── Filtering (global / column)
  ├── Pagination integration (con componente Pagination de v0.4.0)
  ├── Row Selection (single / multi / all)
  ├── Column Visibility
  ├── Controlled & Uncontrolled states
  ├── LoadingState (con skeletons)
  ├── ErrorState
  └── EmptyState
```

Después:

```text
v0.5.0 DataTable
     ↓
v0.6.0 Chart System
     ↓
v0.7.0 Dashboard System
```

Esto crea una base coherente para que prácticamente cualquier aplicación administrativa pueda construir sus dashboards sin que `@alcspower/ui` tenga que conocer la lógica de negocio.

---

# 32. Regla de oro del roadmap

> **Los componentes complejos no deben esperar a que exista todo el catálogo. Deben construirse sobre primitives estables y demostrar que la arquitectura de la librería escala.**

> **Primero construir primitives reutilizables; después patrones de aplicación; finalmente componentes especializados.**

La librería debe crecer en amplitud sin convertirse en un framework de negocio.
