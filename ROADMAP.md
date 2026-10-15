# 🗺️ Hoja de Ruta (Roadmap) — `@alcspower/ui`

Este documento describe la visión de evolución técnica, las prioridades de desarrollo y los hitos planificados para el ciclo **v1.x** de `@alcspower/ui`.

---

## 📌 Principios de Evolución del Ciclo v1.x

1. **Estabilidad SemVer y Retrocompatibilidad:** Ninguna versión menor (`1.x.0`) ni parche (`1.x.y`) introducirá cambios que rompan compatibilidad con aplicaciones consumidoras existentes.
2. **Accesibilidad sin Concesiones:** Todo nuevo componente mantendrá el estándar de 0 violaciones detectadas por `axe-core` y soporte completo de navegación por teclado (**WCAG 2.1 AA/AAA**).
3. **Estética Craft Minimalist / Elevated Flat:** Consistencia estricta con los pilares del sistema (bordes hairline de 1.5px, paleta *Cool Indigo & Slate*, micro-elevaciones y radios contemporáneos).
4. **Desacoplamiento Absoluto:** Cero lógica de negocio incrustada; los componentes son primitivas puras reutilizables en cualquier entorno.
5. **Core pequeño, extensible y documentado:** Se prioriza un núcleo sólido y estable sobre un catálogo inflado sin criterio.

---

## 🏁 Hitos Consolidados

### ✅ Versión 1.6.3 (Actual)
* **Saneamiento Técnico & Compatibilidad Next.js App Router (RSC):** Inyección forzada de la directiva `'use client'` en la cabecera de los bundles compilados ESM y CJS (`dist/index.js`, `dist/index.cjs`), garantizando que aplicaciones con React Server Components consuman la librería sin errores de ejecución.
* **Sincronización Total de Manifiestos de IA:** Actualización completa de `registry.json` y `llms-small.txt` incorporando `CopyButton`, `Sparkline` y `Gauge`, consolidando el catálogo en **67 componentes** y **66 historias Storybook**.
* **Helpers de Seguridad Nativos:** Primitivas de sanitización y validación segura zero-dependency (`isSafeUrl`, `escapeHtml`, `stripHtml`) integradas en `src/lib/security.ts` y exportadas en el core con cobertura de pruebas unitarias al 100%.
* **Garantía de Calidad:** 69 suites de pruebas, **505/505 pruebas pasando al 100%**, 0 violaciones de accesibilidad `axe-core`, 0 errores TypeScript.

### ✅ Versión 1.6.2
* **Neutralización Corporativa Total:** Erradicación completa de léxico administrativo territorial en favor de terminología empresarial neutra estándar (`@empresa.com`, `REQ-`, tokens `--alcspower-*`).
* **CLI Oficial y Soporte Nativo de Agentes de IA (`alcspower-ui`):** Comandos `init-agent`, `info`, `list`, `tokens`, `snippets`, más manifiestos `llms.txt`, `llms-small.txt` y `registry.json`.
* **Primitivas de Layout y Visualización:** Nuevos componentes `Container`, `Stack`, `Grid` (`GridItem`), `TreeView`, `Gauge`, `Sparkline`, `CopyButton`, `NumberInput`, `Field`.
* **Garantía de Calidad:** 68 suites de pruebas, **497/497 pruebas pasando al 100%**, 0 violaciones de accesibilidad `axe-core`, 0 errores TypeScript.

### ✅ Versión 1.3.0
* **Starter Kit Oficial Enterprise (`templates/vite-react-starter`):** Plantilla base con React 19, Vite 6, Tailwind CSS v4, Sidebar colapsable, Header, selector Claro/Oscuro y vistas de ejemplo.
* **Recetario Multistack Oficial (`docs/recipes/`):** Guías para React 19, Astro, .NET, y personalización de tokens.
* **Refinamiento de Primitivas de Feedback:** Exportación de `ToastCard`, `Skeleton` dinámico, mejoras en `EmptyState` y `ErrorState`.

### ✅ Versión 1.2.0
* **Política de Seguridad Enterprise:** Formalización de [`SECURITY.md`](SECURITY.md) con protocolos responsables de reporte, matriz CVSS y SLAs de remediación.
* **Expansión de Primitivas:** `Accordion`, `Collapsible`, `Pagination`, `Separator` y `Tabs` mejorados.

### ✅ Versión 1.1.0
* **Consolidación Craft Minimalist:** Definición y aplicación integral de los 6 pilares de diseño contemporáneo sobre los 51 componentes del catálogo.

---

## 🚀 Próximas Versiones y Evolución del Ciclo v1.x

```text
v1.6.3 (Actual Consolidado ✓)
  ├─ Stepper, Timeline, FileUpload, Kbd (v1.4.0 ✓)
  ├─ Field, SearchInput, PasswordInput, OTPInput, MultiSelect, TagsInput, NumberInput, Combobox, ConfirmDialog (v1.5.0 ✓)
  ├─ Container, Stack, Grid, TreeView, Sparkline, Gauge, StatusBadge, CopyButton (v1.6.0 ✓)
  ├─ CLI Oficial (init-agent, info, list), llms.txt, registry.json, Neutralización, Docs Bilingües (v1.6.2 ✓)
  ├─ Saneamiento Técnico: 'use client' en bundles RSC, 67 componentes sincronizados, Security Helpers (v1.6.3 ✓)
  │
  └─► v1.7.0: Showcase Interactivo + ScrollArea + Contenido Rich
        ├─ ScrollArea / Scrollbar (Radix UI accesible) (Completado ✓)
        ├─ Storybook Showcase en GitHub Pages (Demo interactiva con máximo pulido)
        ├─ Portal Web de Documentación Bilingüe (Astro Starlight)
        ├─ RichTextEditor (módulo independiente)
        └─ CodeBlock, Markdown

        └─► v1.8.0+: Especialización y Módulos Avanzados
             ├─ GanttChart / Gantt (gestión temporal y de proyectos)
             ├─ VirtualList (listas masivas virtualizadas)
             ├─ OrganizationChart & Kanban
             └─ NotificationCenter
```

---

## 📦 Versión 1.4.0 — Flujos B2B y Solicitudes Corporativas (Consolidada ✓)

*Enfocada en resolver los patrones de interacción más demandados en plataformas de expedientes, formularios largos y auditoría.*

* [x] **`Stepper` / `Wizard` (Asistente por Pasos):**
  * Control secuencial accesible para trámites y formularios multi-etapa.
  * Modos horizontal y vertical, iconos por etapa, estados (completado, activo, error, pendiente) y soporte para validación por paso.
* [x] **`Timeline` / `ActivityLog` (Línea de Tiempo):**
  * Visualización cronológica de eventos, trazabilidad de expedientes y registros de auditoría técnica.
  * Soporte para avatares, estados de color con `StatusBadge`, marcas de tiempo y contenido colapsable.
* [x] **`FileUpload` / `Dropzone` (Carga de Documentos):**
  * Zona accesible para arrastrar y soltar archivos (PDFs, imágenes, etc.).
  * Barra de progreso de subida individual y global, validación de extensiones y peso máximo, y previsualización de lista de archivos.
* [x] **`Kbd` (Indicador de Atajos de Teclado):**
  * Primitiva visual para representar teclas y combinaciones de atajos (`⌘K`, `Ctrl + S`, `Esc`), diseñada para integrarse con la paleta de comandos (`CommandMenu`).

---

## 🧩 Versión 1.5.0 — Formularios Avanzados + Búsqueda (Consolidada ✓)

*Enfocada en lograr formularios complejos, seguros y productivos en operaciones corporativas y SaaS.*

* [x] **`Field` (Primitivo Compuesto de Formulario):**
  * Wrapper modular y accesible (`Field`, `FieldLabel`, `FieldControl`, `FieldHint`, `FieldError`).
  * Gestión coordinada de identificadores deterministas y asociaciones ARIA (`aria-describedby`, `aria-invalid`).
* [x] **`SearchInput`:**
  * Input ergonómico con botón limpiar instantáneo, icono de búsqueda, atajo visual `<kbd>` y estado de carga (`isLoading`).
* [x] **`PasswordInput`:**
  * Toggle accesible de visibilidad (mostrar/ocultar contraseña), soporte de teclado y escala proporcional de tamaños.
* [x] **`OTPInput`:**
  * Entrada moderna de PIN / verificación con elevación táctil, anillos de brillo reactivos (índigo/esmeralda/carmesí) y separadores configurables.
* [x] **`MultiSelect` & `TagsInput`:**
  * `MultiSelect`: 3 modos visuales (`hybrid`, `chips`, `summary`), acciones del trigger pegadas a la derecha/abajo y selector masivo "Seleccionar todos".
  * `TagsInput`: Entrada interactiva de chips delimitada por teclado con botón de limpieza rápida (`Broom`).
* [x] **`NumberInput`:**
  * Control spinbutton conforme a WAI-ARIA, aceleración continua por pulsación sostenida (*long-press*), precisión decimal IEEE 754 y 4 disposiciones de steppers.
* [x] **`Combobox` mejorado / `Autocomplete`:**
  * Búsqueda en popover, filtrado en tiempo real y soporte para selección múltiple con chips interactivos removibles.
* [x] **`ConfirmDialog` / `AlertDialog`:**
  * Diálogos semánticos de advertencia y confirmación con wrapper `ConfirmDialog` asíncrono y spinner integrado.
* [x] **`Security Helpers` y Guías de Validación:**
  * Primitivas seguras nativas en código (`isSafeUrl`, `escapeHtml`, `stripHtml`) integradas en `src/lib/security.ts` con 100% de cobertura de pruebas, complementadas por las políticas de sanitización contra XSS/CSRF en [`SECURITY.md`](SECURITY.md) y [`SECURITY.es.md`](SECURITY.es.md).
* [ ] **`FormProvider` / `useForm` (Abstracción de Contexto):**
  * Abstracción agnóstica de contexto para validación centralizada (actualmente soportado vía estado controlado o React Hook Form).

---

## 📊 Versión 1.6.0 — Navegación + Layout + Datos Avanzados (Consolidada ✓)

*Enfocada en dashboards operativos, tablas densas y paneles complejos.*

* [x] **`Container`, `Stack`, `Grid` (`GridItem`):**
  * Primitivos unificados de layout responsivo con control de breakpoints oficiales de Tailwind v4, apilados con divisores automáticos y rejillas CSS multidimensionales.
* [x] **`TreeView`:**
  * Árbol jerárquico accesible conforme al estándar WAI-ARIA (`role="tree"`), navegación completa por teclado, barra de herramientas integrada de colapso/expansión y checkboxes tri-estado.
* [x] **`Sparkline` & `Gauge`:**
  * `Sparkline`: Micro-gráficos vectoriales en SVG puro (area, line, bar) para tablas y tarjetas KPI sin dependencias extra.
  * `Gauge`: Medidor radial accesible (`role="meter"`) con umbrales semánticos y 3 geometrías (semicircle, arc, circle).
* [x] **`StatusBadge` (Monitoreo de Salud Operativa):**
  * Indicador visual de estado operativo con micro-indicador puntual de color, estados de salud del sistema (online, offline, warning, maintenance) y semántica accesible.
* [x] **Componentes de Layout en Starter Kit (`Header` & `Sidebar` colapsable):**
  * Estructura ergonómica de dashboard empresarial con selector Claro/Oscuro y navegación accesible integrada en `templates/vite-react-starter`.
* [ ] **`ScrollArea` / `Scrollbar`:**
  * Componente de desplazamiento personalizado accesible basado en `@radix-ui/react-scroll-area` (programado para v1.7.0).
* [ ] **`VirtualList`:**
  * Rendimiento con listas grandes de forma accesible y scroll controlado (programado para v1.8.0).
* [ ] **`NotificationCenter`:**
  * Historial de notificaciones, estados leídos/no leídos y acciones rápidas.

---

## 🧠 Versión 1.7.0 — Showcase Interactivo + Contenido Rich + DX

*Enfocada en acelerar la adopción y la productividad del consumidor.*

* [x] **`CopyButton` (Completado ✓):**
  * Botón interactivo accesible con micro-animaciones fluidas de dos capas (`Copy` a `Check` / `AlertCircle`), halo radial luminoso, 3 variantes (`outlined`, `filled`, `inline`) y tooltip integrado.
* [x] **CLI Oficial (`@alcspower/ui` / `alcspower-ui`) (Completado ✓):**
  * Binario ejecutable con `npx @alcspower/ui` con comandos `init-agent`, `info`, `list`, `tokens` y `snippets`.
* [x] **Manifiestos Nativos para Agentes de IA (Completado ✓):**
  * Diccionario estructurado `registry.json` y estándares abiertos `llms.txt` y `llms-small.txt` empaquetados en npm.
* [x] **`ScrollArea` / `ScrollBar` (Radix UI accesible) (Completado ✓):**
  * Contenedor de scroll accesible con barras estilizadas Craft Minimalist, soporte bidireccional (`vertical`, `horizontal`, `both`), 3 escalas de grosor (`sm`, `md`, `lg`), esquinas automáticas y componentes compuestos (`ScrollBar`, `ScrollAreaViewport`, `ScrollAreaThumb`, `ScrollAreaCorner`).
* [ ] **Demostración Interactiva en Vivo (Storybook Showcase en GitHub Pages):**
  * Hito dedicado planificado para desplegar las 67 historias interactivas con controles dinámicos, alternancia de temas y accesibilidad auditada.
* [ ] **Portal Web de Documentación Bilingüe (Astro Starlight):**
  * Sitio estático con búsqueda *Pagefind*, instructivo completo y recetas multistack.
* [ ] **`RichTextEditor` (como módulo independiente):**
  * Editor WYSIWYG evaluando `Lexical` o `TipTap` con sanitización estricta.
* [ ] **`CodeBlock`, `Markdown`:**
  * Render y edición de contenido técnico con resaltado de sintaxis accesible.
* [ ] **`ImageGallery`, `Carousel` mejorado:**
  * Galerías accesibles con soporte táctil y lightbox.

---

## 🌱 Versión 1.8.0+ — Especialización y Módulos Experimentales

*Los siguientes componentes son valiosos, pero pueden agregar peso o complejidad significativa; se evaluarán como módulos opcionales o experimentales.*

* [ ] **`GanttChart` / `Gantt` (Diagrama de Gantt):**
  * Cronograma interactivo para gestión de proyectos, expedientes y planificación temporal.
  * Línea de tiempo con escalas configurables (días, semanas, meses), barras de progreso con dependencias visuales entre tareas, hitos (*milestones*), arrastre (*drag-and-drop*) accesible o atajos de teclado, e integración con el sistema de tokens semánticos de `@alcspower/ui`.
* [ ] **`OrganizationChart`**
* [ ] **`Kanban`**
* [ ] **`Calendar` avanzado**
* [ ] **`Flow Diagram` / `Diagram Editor`**
* [ ] **`Form Builder`**
* [ ] **`Page Builder`**

> Regla: si un componente exige dependencias pesadas o APIs complejas, debe ser introducido como módulo separado para no inflar el core.

---

## ✅ Reglas para la Calidad del Core

Cada nuevo componente debe cumplir antes de entrar al paquete principal:

- [x] TypeScript estricto (0 errores con `tsc --noEmit`)
- [x] Tests unitarios (70 suites / 512 tests pasando al 100%)
- [x] Tests de accesibilidad (`axe-core` con 0 violaciones WCAG 2.1 AA)
- [x] Storybook con al menos 3 estados por componente
- [x] Dark mode (Tokens semánticos bidireccionales `--alcspower-*`)
- [x] Responsive en vistas y controles adaptativos
- [x] Soporte completo de teclado, atajos y anillo de foco
- [x] Documentación pública bilingüe (`README.md`, `README.es.md`, instructivo de 10 módulos)
- [x] Cobertura de estados (`loading`, `error`, `empty`, `success`)
- [x] Compatibilidad verificada con React 18 y React 19

---

## 🧭 Priorización Global

| Prioridad | Área | Componentes clave |
|---|---|---|
| P0 | Formularios y validación | `Field` (✓), `SearchInput` (✓), `PasswordInput` (✓), `OTPInput` (✓), `MultiSelect` (✓), `TagsInput` (✓), `NumberInput` (✓), `FormProvider` (Planificado) |
| P0 | Overlays | `ConfirmDialog` (✓), `AlertDialog` (✓), `Sheet` (✓), `Drawer` (✓) |
| P1 | Data & dashboards | `TreeView` (✓), `Sparkline` (✓), `Gauge` (✓), `DataTable` (✓), `ScrollArea` / `Scrollbar` (✓), `VirtualList` |
| P1 | Navegación | `Tabs` (✓), `Accordion` (✓), `Breadcrumb` (✓), `Stepper` (✓), `Sidebar` & `Header` en Starter (✓) |
| P1 | Feedback | `StatusBadge` (✓), `Toaster` / `toast` (✓), `LoadingOverlay` (✓), `NotificationCenter` (Planificado) |
| P2 | Contenido | `CopyButton` (✓), `RichTextEditor` (Planificado), `Markdown` / `CodeBlock` (Planificado) |
| P2 | DX & Agentes | `CLI Oficial` (`npx @alcspower/ui`) (✓), `Snippets VS Code` (✓), `registry.json` / `llms.txt` (✓) |
| P3 | Especialización / Proyectos | `GanttChart` (Diagrama de Gantt), `Kanban`, `OrganizationChart`, `Flow Diagram` |

---

## 🧱 Principios de diseño para nuevos componentes

### 1. Primitivas antes que megacomponentes
Se priorizan piezas pequeñas y reutilizables, no bloques específicos de negocio.

### 2. Sin lógica de negocio
La librería no conoce reglas de negocio ni APIs concretas. La app consumidora maneja los datos y la integración.

### 3. Core estable, extras opcionales
Si un componente implica un paquete pesado o una API muy compleja, se evaluará como módulo extra.

### 4. A11y no opcional
Todo componente debe manejar focus, roles, teclado y buenas prácticas de accesibilidad desde el inicio.

---

## 📌 Próximo milestone recomendado

### v1.7.0 — Showcase Interactivo + Contenido Rich + ScrollArea

Con los formularios avanzados (`v1.5.0`) y el layout responsivo (`v1.6.0`) ya consolidados, el hito actual se enfoca en la experiencia interactiva, visibilidad y componentes de enriquecimiento:

```text
v1.7.0
├── Storybook Showcase en GitHub Pages (Demo interactiva en vivo)
├── ScrollArea / Scrollbar accesible
├── Portal Web de Documentación Bilingüe (Astro Starlight)
├── RichTextEditor (WYSIWYG)
└── CodeBlock / Markdown
```

Después:

```text
v1.7.0 → v1.8.0 (GanttChart, VirtualList, OrganizationChart, Kanban)
```

Esto permite escalar sin romper la API pública y sin introducir lógica empresarial.

---

## 🔒 Regla de oro del roadmap

> **Los componentes complejos no deben esperar a que exista todo el catálogo.** Deben construirse sobre primitivas estables y demostrar que la arquitectura de la librería escala.

> **Primero construir primitives reutilizables; después patrones de aplicación; finalmente componentes especializados.**

La librería debe crecer en amplitud sin convertirse en un framework de negocio.

---

## 🤖 Ecosistema de Agentes de IA & Ergonomía para Desarrolladores

### Decisiones de Arquitectura
* ❌ **Servidor MCP descartado:** Se descarta oficialmente el desarrollo de un servidor MCP propio. No justifica los costos recurrentes de infraestructura, latencia ni la carga de mantenimiento continuo frente a las soluciones estáticas y sin conexión.
* ✅ **Estándares Estáticos y Autónomos ($0 Costo / Offline-First):** Se prioriza la distribución de manifiestos livianos (`registry.json`), estándares abiertos (`llms.txt`, `llms-small.txt`), snippets de VS Code y reglas de agentes locales mediante el CLI `npx @alcspower/ui init-agent`.

### ✅ Hitos Alcanzados de Ergonomía para IA y Desarrolladores
* [x] **CLI Oficial Integrado (`alcspower-ui` / `npx @alcspower/ui`):**
  * Herramienta nativa sin dependencias pesadas (<50ms de arranque) registrada en `package.json` (`"bin"`).
  * Comandos disponibles: `init-agent` (scaffolding automático de reglas), `snippets` (instalación de snippets), `list` (catálogo de 68 componentes por categoría), `info <component>` (API, variantes, props y ejemplo JSX desde `registry.json`) y `tokens` (chuleta CSS de `--alcspower-*`).
* [x] **Economía de Contexto y Manifiestos Estructurados:**
  * `registry.json` (~16 KB): Diccionario estructurado en JSON de los 68 componentes, variantes y subcomponentes para evitar consumo de tokens sobre archivos `.d.ts` de gran tamaño.
  * `llms-small.txt` (~1.5k tokens): Resumen ultra-condensado de tokens, directivas y componentes clave para inyección en system prompts.
  * `llms.txt`: Especificación estándar abierta según lineamientos de [llmstxt.org](https://llmstxt.org/).
* [x] **Snippets Oficiales para VS Code (`snippets/alcspower.code-snippets`):**
  * Prefijos estandarizados `alcs-*` (`alcs-button`, `alcs-card`, `alcs-dialog`, `alcs-field-input`, `alcs-datatable`, `alcs-toast`, etc.) instalados en `.vscode/` y en el starter kit.
* [x] **Reglas Preconfiguradas para Asistentes de IA:**
  * Soporte nativo verificado para **Cursor** (`.cursor/rules/alcspower-ui.mdc`), **Claude Code** (`CLAUDE.md`), **GitHub Copilot** (`.github/copilot-instructions.md`) y **Google Antigravity** (`.agent/skills/alcspower-ui/SKILL.md`).
* [x] **Arquitectura Unificada (Single Source of Truth):**
  * Eliminación de duplicidades en el repositorio: erradicación de la carpeta residual `skill/` para que el CLI y los desarrolladores consuman directamente las rutas estándar de la raíz del proyecto.

### Hito Futuro: Hosting Público de `llms.txt` ($0 Infraestructura)
* **Objetivo:** Exponer `llms.txt` y `llms-small.txt` como endpoints estáticos públicos para que agentes web o navegadores de IA consuman la documentación en una sola petición HTTP.
* **Infraestructura Requerida:** $0 costo. Se servirá de manera estática a través de **GitHub Pages** (junto al build de Storybook) o mediante la URL pública del repositorio en GitHub (`raw.githubusercontent.com`).

---

## 🌐 Visibilidad, Documentación Pública & Demo en Vivo (Hito Planificado con Máxima Calidad)

*Basado en las directrices de visibilidad e internacionalización (`PLAN_VISIBILIDAD_I18N.md`).*

> [!IMPORTANT]
> **Filosofía del Hito de Demostración:**  
> La demo en vivo es la carta de presentación visual de `@alcspower/ui` ante el mundo. No debe ser un volcado apresurado ni automático: requiere dedicarle el tiempo, diseño y esmero necesarios para que cada una de las 67 historias de componentes refleje a la perfección la estética *Craft Minimalist / Modern SaaS*, soporte bidireccional de tema (Claro / Oscuro), controles interactivos y contraste WCAG impecable. Por esta razón, se programa como un hito dedicado de desarrollo antes de su apertura pública.

### 1. Demostración Interactiva en Vivo (Storybook Showcase en GitHub Pages)
* **Objetivo:** Permitir a desarrolladores, diseñadores y evaluadores explorar, probar y copiar código interactivo de los 68 componentes (67 historias) sin necesidad de clonar ni compilar el repositorio.
* **Criterios de Excelencia Visual y Técnica:**
  * ✅ **Curaduría de Casos de Uso:** Cada componente dispondrá de historias con datos y estados reales (reposo, hover, activo, carga, error, deshabilitado, denso y responsivo).
  * ✅ **Toggle Dinámico de Temas:** Conmutador fluido entre modo claro y modo oscuro verificado con tokens semánticos `--alcspower-*`.
  * ✅ **Playground de Controles (Args):** Controles intuitivos para variar props, tamaños (`sm`, `md`, `lg`), variantes de color y estados de validación en tiempo real.
  * ✅ **Panel de Accesibilidad Integrado:** Visualización del reporte `axe-core` en vivo para cada historia demostrando cumplimiento WCAG 2.1 AA.
  * ✅ **Pipeline de Despliegue Automatizado:** GitHub Actions (`actions/deploy-pages`) desplegando `dist-storybook/` a GitHub Pages con $0 costo de infraestructura.

### 2. Portal Web de Documentación Bilingüe (Astro Starlight)
* **Objetivo:** Sitio web oficial de documentación de producto, ligero, de alta velocidad y optimizado para SEO y lectores de pantalla.
* **Características Principales:**
  * Búsqueda estática ultrarrápida integrada con *Pagefind*.
  * Soporte bilingüe completo: Inglés canónico (fuente de verdad internacional) y Español espejo.
  * Documentación unificada: Guía de inicio rápido, instructivo paso a paso (`docs/instructivo/`), recetas multistack (`docs/recipes/`), guías de tokens y compatibilidad.
  * Hosting público de manifiestos para agentes (`/llms.txt`, `/llms-small.txt`, `/registry.json`).

### 3. Ecosistema de Comunidad y Adopción Abierta
* **Archivos Estándar:** `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SUPPORT.md`, plantillas estandarizadas de Issues (Bug Report, Feature Request) y Pull Requests.
* **Insignias Oficiales de Proyecto:** Indicadores en vivo de versión de npm, licencias, suite de pruebas automatizadas (497/497 pasando) y compatibilidad React 18/19.


