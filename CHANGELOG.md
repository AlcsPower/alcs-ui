# @alcspower/ui

## 1.6.5

### Patch Changes

- ### Blindaje Crítico para Navegadores Reales (Vite / Chrome) y Suite de Smoke Testing Automatizada
  - **Resolución Definitiva de `__require` en Navegadores Reales (Chrome/Vite):**
    - Se eliminó el `throw Error('Dynamic require of "react" is not supported')` del bundle ESM `dist/index.js`.
    - `__require` resuelve dinámicamente y de forma segura `react` (combinando namespace y default export), `react-dom`, `react/jsx-runtime` y `react/jsx-dev-runtime`.
    - Para cualquier otro target no resuelto, emite un aviso de consola sin abortar la ejecución, evitando que el navegador quede en pantalla blanca.
    - Se eliminó la inyección de `path` y `url` para entornos puros de navegador web.
  - **Suite de Smoke Testing Automatizada (`pnpm test:smoke`):**
    - Se incorporó `scripts/smoke-test-consumer.mjs`, que empaqueta una aplicación React con Vite en modo producción y valida su ejecución y renderizado dentro del DOM sin arrojar excepciones.

## 1.6.4

### Patch Changes

- ### Robustez de Tipos en TypeScript, Soporte ESM / SSR en Node y Ergonomía de `DataTable`
  - **Resolución Definitiva de Tipos (`.d.ts` sin subdependencias manuales):**
    - Se declararon las dependencias de tipos de los primitives y utilidades (`class-variance-authority`, `@radix-ui/*`, `@tanstack/react-table`, `recharts`, `sonner`, `cmdk`, etc.) en `dependencies` de `package.json`.
    - Elimina de raíz el error `TS2322: Property 'variant' does not exist` en proyectos consumidores limpios. TypeScript resuelve `VariantProps<T>` y todas las props de variantes de forma nativa e inmediata al instalar `@alcspower/ui` sin requerir instalar 28 paquetes auxiliares manualmente.
  - **Soporte Nativo ESM y SSR para Node.js / Next.js / Remix:**
    - Se solucionó la excepción `Dynamic require of "react" is not supported` en entornos Node/SSR mediante intercepción y resolución del import de React en tiempo de evaluación de módulos.
    - Se inyectaron salvaguardas y stubs defensivos de constructores de DOM (`HTMLFormElement`, `HTMLElement`, `HTMLInputElement`) para prevenir fallos `ReferenceError` durante pruebas sin DOM completo o ejecuciones headless en Node.
  - **Ergonomía y Desacoplamiento de `DataTable`:**
    - Exportación directa de `createColumnHelper` desde `@alcspower/ui` sin necesidad de que el consumidor instale `@tanstack/react-table`.
    - Exportación de alias de tipos semánticos (`AlcsColumnDef`, `AlcsSortingState`, `AlcsRowSelectionState`, `AlcsTable`, `AlcsRow`, etc.).
    - Documentación y ejemplos JSDoc clarificando la distinción entre `accessorFn: (item) => ...` (recibe el objeto de datos crudo) y `cell: ({ row }) => row.original...` (recibe el contexto de celda).
  - **Sincronización Total de Manifests y Reglas de Agentes:**
    - Catálogo unificado y actualizado a 68 componentes en `AGENTS.md`, `CLAUDE.md`, `.agent/skills/alcspower-ui/SKILL.md` y `llms.txt`.

## 1.6.3

### Patch Changes

- ### Saneamiento Técnico de Distribución y Utilidades de Seguridad
  - **Directiva `'use client';` garantizada:** Se implementó `scripts/ensure-use-client.js` para asegurar la directiva `'use client';` en los artefactos `dist/index.js` y `dist/index.cjs`.
  - **Utilidades de Seguridad Zero-Dependency (`src/lib/security.ts`):** Exportación de helpers `isSafeUrl()`, `escapeHtml()`, y `stripHtml()`.
  - **Componente `ScrollArea`:** Nuevo componente de scroll accesible basado en `@radix-ui/react-scroll-area` con 4 historias interactivas y 7 pruebas unitarias.

## 1.6.2

### Minor Changes

- ### Ecosistema Nativo para Agentes de IA y Ergonomía de Desarrollo
  - **CLI Oficial de la Biblioteca (`bin/cli.js`):**
    - Registrado como comando ejecutable en `package.json` (`alcspower-ui`) para ejecución directa vía `npx @alcspower/ui <comando>`.
    - **`init-agent`:** Inyecta en segundos las reglas de contexto para Cursor (`.cursor/rules/alcspower-ui.mdc`), Claude Code (`CLAUDE.md`), GitHub Copilot (`.github/copilot-instructions.md`), Google Antigravity (`.agent/AGENT.md`) y snippets de VS Code en cualquier proyecto consumidor.
    - **`info <componente>`:** Muestra instantáneamente import, variantes, subcomponentes, tamaños y ejemplo de uso JSX de cualquier componente del sistema.
    - **`list`:** Despliega los 67+ componentes categorizados.
    - **`snippets`:** Copia únicamente la colección de snippets en `.vscode/alcspower.code-snippets`.
    - **`tokens`:** Imprime la chuleta rápida de tokens semánticos CSS (`--alcspower-*`).
  - **Manifiestos Estáticos para LLMs y Economía de Tokens (`registry.json`, `llms.txt`, `llms-small.txt`):**
    - Especificación abierta según el estándar [llmstxt.org](https://llmstxt.org/) (`llms.txt` y versión condensada `llms-small.txt`).
    - `registry.json` (~15 KB): Diccionario estructurado en JSON con los 67+ componentes que permite a los asistentes consultar props y sintaxis con mínima huella de tokens sin parsear el bundle completo de TypeScript.
    - Subpaths exportados en `package.json`: `./registry.json`, `./llms.txt`, `./llms-small.txt` y `./snippets`.
  - **Snippets de VS Code Empaquetados (`snippets/alcspower.code-snippets`):**
    - Prefijos `alcs-*` para autocompletado rápido de botones, tarjetas, tablas, formularios, modales y overlays.
    - Empaquetados en la distribución para instalación offline y *air-gapped*.

## 1.5.0

### Minor Changes

- ### Soporte para Entornos Offline (Air-Gapped), Nuevos Componentes de Formularios y Overlays Semánticos
  - **Nuevo Componente `MultiSelect` (`src/components/forms/multi-select`):**
    - Selector múltiple empresarial accesible conforme a los patrones WAI-ARIA (`role="listbox"`, `role="option"` con `aria-multiselectable="true"`).
    - 3 modos de visualización ergonómicos en el disparador:
      - `hybrid` (predeterminado): colapso inteligente con primeros $N$ chips visibles y badge `+N más` interactivo con tooltip informativo.
      - `chips`: renderizado individual de chips con botón de eliminación rápida (`x`).
      - `summary`: resumen compacto de alta densidad con badge de conteo para tablas y formularios estrechos.
    - Acciones del disparador adaptativas: botón de limpiar (`x`) y flecha chevron (`⌄`) pegados al margen derecho (`pr-2` a `pr-3`), con alineación vertical inteligente centrada para una sola fila y anclaje fluido en la esquina inferior derecha (`self-end`) cuando el contenido se expande a dos o más filas.
    - Soporte nativo para agrupación de opciones (`group`), iconografía personalizada (`icon`) y distintivos contextuales (`badge` usando primitivas de la biblioteca).
    - Barra de herramientas con buscador en tiempo real, atajos de teclado (`↑↓`, `Espacio`, `Enter`, `Esc` con etiquetas `Kbd`), y opción de "Seleccionar todos" con checkbox indeterminado reactivo.
    - Escalas métricas normalizadas: `sm` (32px), `md` (40px) y `lg` (48px) y 3 variantes estilísticas de chips: `primary`, `secondary` y `outline`.
    - Cumplimiento estricto de accesibilidad: 0 violaciones `axe-core`, cero elementos interactivos anidados (`nested-interactive`), y suite completa con 12 pruebas unitarias.
  - **Nuevo Componente `TreeView` (`src/components/navigation/tree-view`):**
    - Árbol jerárquico accesible conforme al estándar WAI-ARIA (`role="tree"`, `role="treeitem"`, `role="group"`).
    - **Barra de herramientas integrada para expansión/colapso global:**
      - Prop `showToolbar` con disposición configurable `toolbarLayout="toggle"` (botón único inteligente que conmuta dinámicamente entre "Expandir todo" con `FolderPlus` y "Contraer todo" con `FolderMinus`) o `toolbarLayout="pair"` (dos botones independientes con desactivación contextual automática cuando todos los nodos están expandidos o colapsados).
      - Título visual personalizable (`toolbarTitle`) y render prop avanzado (`renderToolbar`) exponiendo métodos programáticos `expandAll()`, `collapseAll()`, `toggleExpandAll()` y banderas `isAllExpanded`, `isAllCollapsed`.
      - Botones construidos con primitivas oficiales de la biblioteca (`Button` de `@alcspower/ui`) garantizando diseño semántico y consistencia cromática.
      - Cumplimiento de jerarquía semántica ARIA: la barra de herramientas se renderiza fuera de `<ul role="tree">` asegurando 0 violaciones de relación padre/hijo en analizadores WAI-ARIA / `axe-core`.
    - Navegación completa por teclado con atajos estándar: `ArrowDown` / `ArrowUp` (navegación vertical), `ArrowRight` (expandir rama o entrar en primer hijo), `ArrowLeft` (colapsar rama o saltar al nodo padre), `Home` / `End` (primer/último nodo visible), `Enter` / `Space` (seleccionar/alternar), `*` (expandir todos los nodos hermanos) y atajos globales avanzados `Alt + ArrowRight` (expandir todo el árbol) y `Alt + ArrowLeft` (contraer todo el árbol).
    - Modos de selección flexible: selección simple (`selectedId`), multi-selección con casillas de verificación (`showCheckboxes`), y lógica de propagación en cascada con estado indeterminado tri-estado automático.
    - Líneas guía visuales jerárquicas sutiles conectando niveles de profundidad con estética *Craft Minimalist*.
    - Iconografía adaptativa inteligente con carpetas (`Folder`, `FolderOpen`) y documentos (`FileText`), o render props personalizados según estado (`isOpen`, `isSelected`).
    - Soporte para distintivos contextuales (`badge`), ranura de acciones secundarias en hover (`actions`), y estado de carga asíncrona con `Spinner`.
    - Cumplimiento estricto de accesibilidad: 0 violaciones `axe-core`, 11/11 pruebas unitarias pasando.
  - **Nuevos Primitivos Analíticos Ligeros para Dashboards: `Sparkline` y `Gauge` (`src/components/data-display`):**
    - **`Sparkline` (`src/components/data-display/sparkline`):**
      - Micro-gráfico de tendencia vectorial en SVG puro sin dependencias externas adicionales, ideal para filas de `DataTable`, tablas y tarjetas KPI.
      - 3 tipos visuales de renderizado: `area` (con gradiente vertical semántico), `line` (trazo continuo) y `bar` (rectángulos con esquinas redondeadas).
      - Suavizado de curvas mediante splines cúbicos o trazos lineales (`curve="monotone" | "linear"`).
      - Variante cromática dinámica `variant="auto"` que detecta automáticamente si la tendencia es positiva (éxito/esmeralda) o negativa (destructivo/carmesí) comparando el último valor con el primero.
      - Interacción táctil y ratón con retícula en cruz, punto activo resaltado y tooltip flotante interactivo con formateo personalizable.
      - 8/8 pruebas unitarias pasando y 0 violaciones `axe-core`.
    - **`Gauge` (`src/components/data-display/gauge`):**
      - Medidor radial / tacómetro accesible (`role="meter"`) para cumplimiento de metas, SLAs corporativos y porcentajes de avance.
      - 3 geometrías de arco: `semicircle` (180° plano), `arc` (240° velocímetro) y `circle` (360° anillo completo).
      - Zonas y umbrales semánticos configurables (`thresholds`) con coloración automática (`color="auto"`) en tres bandas: advertencia, óptimo y crítico.
      - Aguja mecánica indicadora con perno central metálico (`showNeedle`) o display numérico central de alta visibilidad (`showValue`).
      - Escalas de tamaño estandarizadas (`sm: 96px`, `md: 144px`, `lg: 192px`, `xl: 240px`) y soporte para etiquetas `label`, `sublabel` y extremos `min`/`max`.
      - 7/7 pruebas unitarias pasando y 0 violaciones `axe-core`.
  - **Nuevos Primitivos de Layout y Distribución: `Container`, `Stack`, `Grid` y `GridItem` (`src/components/layout`):**
    - **`Container` (`src/components/layout/container`):**
      - Primitivo de delimitación horizontal responsiva que acota y centra el contenido conforme a los puntos de quiebre oficiales de Tailwind v4 y el diseño corporativo.
      - Variantes de ancho máximo: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `prose` (65ch para lectura de acuerdos y normativas) y `full`.
      - Padding horizontal configurable (`none`, `sm`, `md`, `lg`, `xl`) y centrado automático con `centered={true}` (`mx-auto`).
      - Polimorfismo semántico con la prop `as` (`div`, `main`, `section`, `article`).
      - 5/5 pruebas unitarias pasando y 0 violaciones `axe-core`.
    - **`Stack` (`src/components/layout/stack`):**
      - Primitivo flexbox unidimensional para apilado vertical u horizontal con espaciados semánticos uniformes (`gap`: `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`).
      - Soporte para intercalar divisores decorativos automáticamente entre hijos directos (`divider={<Separator />}`) sin markup redundante.
      - Control de alineación (`items-*`), justificación (`justify-*`) y salto de línea (`wrap`).
      - 6/6 pruebas unitarias pasando y 0 violaciones `axe-core`.
    - **`Grid` y `GridItem` (`src/components/layout/grid`):**
      - Primitivo bidimensional de rejilla CSS con control intuitivo de columnas base (`cols: 1..12`) y quiebres responsivos fluidos (`colsSm`, `colsMd`, `colsLg`, `colsXl`).
      - Componente complementario `GridItem` para expansiones horizontales y verticales (`colSpan: 1..12 | 'full'`, `rowSpan: 1..6 | 'full'`).
      - Espaciados estandarizados `gap` y modos de flujo (`row`, `col`, `dense`).
      - 5/5 pruebas unitarias pasando y 0 violaciones `axe-core`.
  - **Rediseño Completo y Mejoras del Componente `CopyButton` (`src/components/forms/button`):**
    - Botón interactivo de un solo clic altamente accesible (`aria-live="polite"`, `role="button"`) para copiar al portapapeles con micro-animaciones fluidas de 2 capas.
    - **3 variantes de diseño especializadas (`variant`):**
      - `outlined` (predeterminado): superficie limpia con borde sutil de $1.5\text{px}$, elevación y brillo radial índigo en hover.
      - `filled`: botón primario corporativo con sombra elevada que conmuta suavemente a esmeralda vibrante al copiar para llamadas a la acción prominentes.
      - `inline`: botón transparente con posición absoluta (`absolute right-1.5 top-1/2 -translate-y-1/2`) diseñado para incrustarse naturalmente dentro de campos `Input`.
      - Compatibilidad hacia atrás total con alias anteriores (`ghost`, `primary`, `secondary`, `outline`).
    - **3 escalas métricas proporcionales (`size`):**
      - `sm`: $28\text{px}\times 28\text{px}$ (icono $14\text{px}$) para tablas densas y micro-campos.
      - `md` (predeterminado): $36\text{px}\times 36\text{px}$ (icono $18\text{px}$) con radio óptimo de $10\text{px}$.
      - `lg`: $44\text{px}\times 44\text{px}$ (icono $22\text{px}$) para objetivos táctiles de alta accesibilidad (WCAG AAA $44\text{px}$).
      - Aliases `icon-sm`, `icon` e `icon-lg` preservados sin roturas de API.
    - **Micro-animación y efectos cinéticos:**
      - Transición de doble capa: rotación elástica y salto de escala de `Copy` a `Check` esmeralda (`text-emerald-600 dark:text-emerald-400`).
      - Halo radial luminoso (*radial glow effect*) difuminado en estados reposo, hover y copiado.
      - Estado de error visual con icono `AlertCircle` ante denegación o fallo de la Clipboard API.
    - **Soporte para etiquetas adyacentes:**
      - Props `label` y `labelPlacement="left" | "right"` para botones de copia con texto visible contiguo.
    - **Tooltip corporativo adaptativo:**
      - Tooltip interactivo con flecha indicadora y textos reactivos según estado (`tooltipText="Copiar"`, `copiedTooltipText="¡Copiado!"`, `errorTooltipText="Error al copiar"`).
    - Suite de 8 pruebas unitarias pasando al 100% y 0 violaciones de accesibilidad `axe-core`.
  - **Soporte Completo para Entornos Offline y Aislados (Self-Contained Bundle):**
    - Empaquetamiento autónomo con `tsup` inyectando (`noExternal`) las 31 dependencias secundarias en el artefacto de distribución (`dist/index.js` y `dist/index.cjs`), excluyendo estrictamente el ecosistema React (`react`, `react-dom` y `react/jsx-runtime`) como dependencias externas de tiempo de ejecución (*peer dependencies*).
    - Eliminación de dependencias en tiempo de ejecución de la sección `dependencies` de `package.json`, trasladándolas a `devDependencies` para prevenir que `npm` o `pnpm` intenten consultar registros remotos al instalar la librería en entornos cerrados o sin conexión a internet.
    - Soporte nativo para instalación local directa vía `.tgz` (`pnpm add ./alcspower-ui-1.4.0.tgz` o `npm install ./alcspower-ui-1.4.0.tgz`).
    - Cumplimiento estricto de licencias de software libre con la creación y distribución de [`THIRD_PARTY_LICENSES.md`](THIRD_PARTY_LICENSES.md), preservando avisos de derechos de autor y licencias MIT, ISC y Apache-2.0 de todas las dependencias empaquetadas.
  - **Nuevo Componente `NumberInput` (`src/components/forms/number-input`):**
    - Control numérico accesible conforme al estándar WAI-ARIA (`role="spinbutton"`).
    - Aceleración continua configurable por pulsación sostenida en botones steppers (*long-press acceleration*).
    - Navegación completa por teclado con atajos estándar: flechas Arriba/Abajo (`step`), `Shift + flechas` ($\times 10$), `PageUp` / `PageDown` ($\times 10$), `Home` (`min`) y `End` (`max`).
    - 4 disposiciones ergonómicas de steppers: `stacked` (apilados verticalmente a la derecha), `split` (decremento a la izquierda, incremento a la derecha), `inline-right` (horizontales adyacentes a la derecha) y `none` (ocultos).
    - Corrección de precisión decimal contra inconsistencias de punto flotante de IEEE 754.
    - Soporte ergonómico para `prefix` y `suffix` con márgenes adaptativos anti-colisión.
    - Micro-interacción con resplandor sutil (*stepper glow*) y respeto a `prefers-reduced-motion`.
  - **Nuevos Primitivos `AlertDialog` y `ConfirmDialog` (`src/components/overlays/alert-dialog`):**
    - Diálogos modales de interrupción accesibles basados en `@radix-ui/react-alert-dialog` con trampa de foco y bloqueo de scroll.
    - Foco inicial colocado deliberadamente en el botón de cancelar para mitigar confirmaciones destructivas accidentales.
    - Componente de alto nivel `ConfirmDialog` con soporte asíncrono para promesas en `onConfirm`, indicador `Spinner` reactivo y bloqueo de acciones durante ejecución.
    - Variantes semánticas con halos luminosos suaves: `destructive`, `warning` e `info`.
  - **Nuevo Componente `TagsInput` (`src/components/forms/tags-input`):**
    - Control dinámico para captura y gestión de etiquetas tipo chip con validación y prevención de duplicados.
    - Adición fluida mediante delimitadores de teclado configurables (`Enter`, `,`).
    - Botón de limpieza total (*Clear all*) con icono semántico `Broom` (escoba) e interactividad táctil.
    - Soporte para límite máximo de etiquetas (`maxTags`), eliminación individual con `Backspace` o botón `x`, y formas visuales (`squircle` y `rounded`).
  - **Rediseño Moderno de `OTPInput` (`src/components/forms/otp-input`):**
    - Rediseño visual con radios proporcionales según escala de tamaño (`sm: rounded-[10px]`, `md: rounded-[12px]`, `lg: rounded-[14px]`).
    - Micro-elevación táctil al recibir foco (`-translate-y-0.5`).
    - Celda completada con tinte suave y halo índigo de enfoque.
    - Animación de sacudida ergonómica (*shake animation*) y halo carmesí ante estados de error, y halo esmeralda suave ante estados de éxito.
    - Texto descriptivo de estado (`statusText`) con iconografía automática integrada (`CheckCircle2`, `AlertCircle`, `Info`).
    - Separadores visuales configurables (`dash`, `dot`, `space`) y modo PIN enmascarado (`mask`).
  - **Métricas de Calidad y Accesibilidad:**
    - **455/455** pruebas unitarias pasando al 100% en **62 suites de pruebas** (`vitest`).
    - **0 violaciones de accesibilidad** detectadas por `axe-core`.
    - Tipado estricto verificado con `tsc --noEmit`.

## 1.3.0

### Minor Changes

- ### Starter Kit Oficial B2B, Recetario Multistack y Refinamiento de Primitivas de Feedback
  - **Starter Kit Oficial Enterprise (`templates/vite-react-starter`):**
    - Plantilla lista para producción con **React 19**, **Vite 6**, **Tailwind CSS v4** y `@alcspower/ui` preconfigurado.
    - Layout empresarial completo: barra lateral (*Sidebar*) colapsable y accesible con badges de conteo, cabecera flotante (*Header*) con migas de pan (*Breadcrumbs*), perfil de usuario y selector de tema Claro / Oscuro (`ThemeToggle`) persistido en `localStorage`.
    - Vistas de ejemplo funcionales: Tablero de Control de KPIs (`DashboardView`) con métricas y avance operativo, Bandeja de Registros con filtros en tiempo real (`ExpedientesView`), y modal de registro con validación y notificaciones toast (`NuevoTramiteModal`).
  - **Recetario de Integración Multistack (Cookbook en `docs/recipes/`):**
    - Guías paso a paso de adopción para:
      - ⚡ **React 19 + Vite + Tailwind CSS v4** (`docs/recipes/react-vite.md`).
      - 🚀 **Astro con React Islands** (`docs/recipes/astro.md`) para portales corporativos de alto rendimiento y 0 KB de JS inicial.
      - 🏢 **Modernización en .NET** (`docs/recipes/dotnet-aspnet.md`) para sistemas existentes en **ASP.NET Web Forms (VB.NET / C#)** y **ASP.NET Core (MVC / Razor Pages)** mediante tokens directos CSS o islas interactivas sin reescribir lógica de servidor.
      - 🎨 **Tailwind CSS v4 & Tokens de Diseño** (`docs/recipes/tailwind-v4.md`) con directivas `@theme` y variables semánticas `--alcspower-*`.
  - **Refinamiento de Componentes de Feedback y Gráficos:**
    - **`Toast` / `Toaster`:** Incorporación y exportación de `ToastCard` con barra de progreso reactiva, variantes cromáticas semánticas y soporte de acciones primarias/cancelación.
    - **`Skeleton`:** Soporte dinámico de animación shimmer con efecto `shine` en gradiente fluido, modo `pulse` y control accesible `motion-reduce:animate-none`.
    - **`EmptyState` & `ErrorState`:** Alturas dinámicas adaptables, bordes discretos y mejores anuncios para lectores de pantalla.
    - **`Spinner` & `LoadingOverlay`:** Contenedores flex optimizados, micro-interacciones suaves y etiquetas accesibles únicas.
    - **`Chart`:** Contenedores reactivos con estilos semánticos y tokens de color unificados.
  - **Métricas de Calidad y Accesibilidad:**
    - **353/353** pruebas unitarias pasando al 100% (50 suites de pruebas) con **0 violaciones de accesibilidad axe-core**.
    - Tipado estricto con `tsc --noEmit` completado sin advertencias.

## 1.2.0

### Minor Changes

- ### Expansión Enterprise de Componentes y Política de Seguridad (`SECURITY.md`)
  - **Política de Seguridad Enterprise Formalizada:**
    - Incorporación de [`SECURITY.md`](SECURITY.md) con protocolo responsable de reporte de vulnerabilidades, matriz de severidad CVSS, SLA de remediación, directrices de consumo seguro y sanitización en aplicaciones cliente.
  - **Expansión de Primitivas y Variantes Avanzadas:**
    - **`Accordion` (`src/components/accordion`):** Soporte para 4 variantes de diseño (`default`, `elevated`, `bordered`, `ghost`), escala métrica de tamaños (`sm`, `md`, `lg`), y slots avanzados en `AccordionTrigger` (`icon`, `subtitle`, `badge`, `hideChevron`).
    - **`Collapsible` (`src/components/collapsible`):** Primitivo enriquecido con variantes estructurales (`default`, `card`, `ghost`), disparadores integrados y animaciones fluidas de despliegue.
    - **`Pagination` (`src/components/pagination`):** Sistema de paginación robusto con navegación semántica accesible, variantes visuales, elipsis interactiva y modo compacto.
    - **`Separator` (`src/components/separator`):** Divisor semántico enriquecido con soporte para etiquetas de texto centradas o laterales (`label`), variantes cromáticas y orientación vertical/horizontal.
    - **`Tabs` (`src/components/tabs`):** Soporte ampliado para variantes de navegación (pills, segmentos, subrayado), orientaciones horizontal y vertical, y soporte ergonómico para badges y atajos.
  - **Métricas de Calidad y Accesibilidad:**
    - 50 suites de pruebas unitarias automatizadas con Vitest y `@testing-library/react`.
    - **333/333** pruebas pasando al 100% (19 pruebas nuevas) con **0 violaciones de accesibilidad** (`axe-core`).
    - 0 errores en tipado estricto con `tsc --noEmit`.

## 1.1.0

### Minor Changes

- ### Evolución Visual: Modern SaaS / Craft Minimalist Design System
  - **Filosofía y Lenguaje de Diseño Formalizado:**
    - Documentación completa en `README.md` del estándar *Craft Minimalist / Elevated Flat* (inspirado en Linear, Untitled UI, Raycast, Vercel y Stripe).
    - Adopción integral de los 6 pilares: *Hairline & Layering* (bordes finos de 1.5px y opacidades sutiles), *Soft Depth* (micro-elevaciones `shadow-2xs` y elevaciones flotantes limpias), *Generous Radii* (esquinas contemporáneas `rounded-xl`, `rounded-2xl`, `rounded-3xl` y cápsulas `rounded-full`), *Paleta Cool Indigo & Slate*, *Micro-Feedback* táctil (`active:scale-[0.98]`, foco con `ring-3`) y *Densidad B2B*.
  - **Refinamiento de Componentes:**
    - **`Button`:** Sombra micro-elevada `shadow-2xs`, transición activa táctil `active:scale-[0.98]`, anillo de foco suave `ring-3 focus-visible:ring-alcspower-primary/20`, esquinas `rounded-xl`.
    - **`Input` & `Textarea`:** Geometría de borde nítido `border-[1.5px]`, elevación en reposo `shadow-2xs`, anillo de foco ergonómico `ring-3 focus:ring-alcspower-primary/15`, esquinas `rounded-xl`.
    - **`Badge`:** Cápsulas fluidas `rounded-full`, sombra `shadow-2xs`, micro-interacción de hover en variantes secundarias y contorno.
    - **`Card` & `MetricCard`:** Bordes suaves `border-alcspower-border/80`, esquinas contemporáneas `rounded-2xl`, micro-elevación `shadow-2xs`.
    - **`Dialog`:** Contenedor modal con `rounded-3xl` y elevación `shadow-2xl`, backdrop difuminado `backdrop-blur-sm`, botón de cierre circular `rounded-full` con micro-animación `active:scale-95`.
    - **`DropdownMenu`:** Menú flotante con `rounded-2xl`, elevación `shadow-xl`, ítems con `rounded-lg`.
    - **`Tabs`:** Contenedor segmentado `rounded-xl bg-alcspower-surface-muted/70 border border-alcspower-border/50`, pestaña activa flotante con `shadow-xs`.
    - **`Accordion`:** Indicador chevron alojado en cápsula circular con rotación suave y retroalimentación en grupo.
    - **`Table`:** Encabezados con fondo suave `bg-alcspower-surface-muted/35` y tipografía B2B compacta `text-[11px] font-bold uppercase tracking-wider`.
    - **`EmptyState`:** Contenedor ergonómico con `rounded-2xl`, borde discontinuo tenue y fondo translúcido.
  - **Garantía de Calidad:**
    - 50/50 suites de pruebas unitarias y 314/314 pruebas aprobadas con **0 violaciones de accesibilidad** (`axe-core`).
    - 0 errores en tipado estricto con `tsc --noEmit`.

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
    - Se agregó la directiva `@custom-variant dark` en `src/styles/index.css` para sincronizar las utilidades `dark:` con las clases corporativas `.dark` y atributos `[data-theme="dark"]`.
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
    - **Overlays**: Se migraron los radios de borde en `Dialog`, `DropdownMenu`, `Select`, `Tooltip` y `Card` a los tokens corporativos `rounded-alcspower-*`.
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
  - Soporte completo para temas claro y oscuro mediante tokens corporativos `--alcspower-*`.
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
  - Soporte completo para temas claro y oscuro mediante tokens corporativos `--alcspower-*`.
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

- Migración completa de tokens CSS corporativos, capas y utilidades al namespace `@alcspower/ui`:
  - Variables CSS `:root` y `.dark` consolidadas bajo el prefijo canónico `--alcspower-*`.
  - Encapsulamiento de estilos en `@layer alcspower-tokens, alcspower-ui`.
  - Clases utilitarias de Tailwind y CVA actualizadas a prefijo `alcspower-*`.
  - Compatibilidad completa verificada con React 18/19 y Tailwind CSS v4.
