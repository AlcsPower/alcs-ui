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

### ✅ Versión 1.3.0 (Actual)
* **Starter Kit Oficial Enterprise (`templates/vite-react-starter`):** Plantilla base con React 19, Vite 6, Tailwind CSS v4, Sidebar colapsable, Header, selector Claro/Oscuro y vistas de ejemplo.
* **Recetario Multistack Oficial (`docs/recipes/`):** Guías para React 19, Astro, .NET, y personalización de tokens.
* **Refinamiento de Primitivas de Feedback:** Exportación de `ToastCard`, `Skeleton` dinámico, mejoras en `EmptyState` y `ErrorState`.
* **Garantía de Calidad:** 50 suites de pruebas, **353/353 pruebas pasando al 100%**, 0 violaciones de accesibilidad axe-core.

### ✅ Versión 1.2.0
* **Política de Seguridad Enterprise:** Formalización de [`SECURITY.md`](SECURITY.md) con protocolos responsables de reporte, matriz CVSS y SLAs de remediación.
* **Expansión de Primitivas:** `Accordion`, `Collapsible`, `Pagination`, `Separator` y `Tabs` mejorados.

### ✅ Versión 1.1.0
* **Consolidación Craft Minimalist:** Definición y aplicación integral de los 6 pilares de diseño contemporáneo sobre los 51 componentes del catálogo.

---

## 🚀 Próximas Versiones Planificadas (Ciclo v1.x)

```text
v1.3.0 (Actual)
  └─► v1.4.0: Flujos B2B y Trámites Institucionales
        ├─ Stepper / Wizard
        ├─ Timeline / ActivityLog
        ├─ FileUpload / Dropzone
        └─ Kbd

        └─► v1.5.0: Formularios Avanzados + Búsqueda
             ├─ FormProvider, FormField, useForm
             ├─ SearchInput, PasswordInput, OTPInput
             ├─ MultiSelect, Combobox mejorado
             ├─ ConfirmDialog, AlertDialog mejorado
             └─ Seguridad y validación reutilizable

             └─► v1.6.0: Navegación + Layout + Datos Avanzados
                  ├─ Sidebar mejorado, Navbar, Container, Grid
                  ├─ TreeView, VirtualList, RowActions
                  ├─ Sparkline, Gauge, Heatmap
                  ├─ NotificationCenter, HealthBadge
                  └─ Dashboard patterns reutilizables

                  └─► v1.7.0: Contenido Rich + DX
                       ├─ RichTextEditor (módulo independiente)
                       ├─ CodeBlock, Markdown
                       ├─ ImageGallery, Carousel mejorado
                       ├─ CopyButton, GlobalSearch
                       └─ Plantillas y scripts de productividad

                       └─► v1.8.0+: Especialización
                            ├─ OrganizationChart
                            ├─ Kanban
                            ├─ Calendar avanzado
                            └─ Módulos opcionales / experimentales
```

---

## 📦 Versión 1.4.0 — Flujos B2B y Trámites Institucionales

*Enfocada en resolver los patrones de interacción más demandados en plataformas de expedientes, formularios largos y auditoría.*

* [x] **`Stepper` / `Wizard` (Asistente por Pasos):**
  * Control secuencial accesible para trámites y formularios multi-etapa.
  * Modos horizontal y vertical, iconos por etapa, estados (completado, activo, error, pendiente) y soporte para validación por paso.
* [x] **`Timeline` / `ActivityLog` (Línea de Tiempo):**
  * Visualización cronológica de eventos, trazabilidad de expedientes y registros de auditoría técnica.
  * Soporte para avatares, estados de color con `StatusBadge`, marcas de tiempo y contenido colapsable.
* [ ] **`FileUpload` / `Dropzone` (Carga de Documentos):**
  * Zona accesible para arrastrar y soltar archivos (PDFs, imágenes, etc.).
  * Barra de progreso de subida individual y global, validación de extensiones y peso máximo, y previsualización de lista de archivos.
* [ ] **`Kbd` (Indicador de Atajos de Teclado):**
  * Primitiva visual para representar teclas y combinaciones de atajos (`⌘K`, `Ctrl + S`, `Esc`), diseñada para integrarse con la paleta de comandos (`CommandMenu`).

---

## 🧩 Versión 1.5.0 — Formularios Avanzados + Búsqueda

*Enfocada en lograr formularios complejos, seguros y productivos en operaciones institucionales y SaaS.*

* [ ] **`FormProvider` / `useForm`:**
  * Contexto de formulario con validación centralizada.
  * Integración con `zod` o `valibot`.
  * Soporte para submit, dirty state, touched, errors y submitState.
* [ ] **`FormField`:**
  * Wrapper composable para `Input`, `Select`, `Textarea`, `DatePicker` y demás campos.
  * Manejo estándar de etiqueta, description, hint y error message.
* [ ] **`SearchInput`:**
  * Input con debounce, botón limpiar, iconos, estados loading y resultados rápidos.
* [ ] **`PasswordInput`:**
  * Toggle de visibilidad, indicador de fortaleza, validación de criterios.
* [ ] **`OTPInput`:**
  * Input de código de verificación con foco secuencial y validación.
* [ ] **`MultiSelect` / `TagsInput`:**
  * Selección múltiple con tags removibles, búsqueda y estados de vacío.
* [ ] **`Combobox` mejorado / `Autocomplete`:**
  * Búsqueda remota, agrupación por categorías, disabled states y keyboard navigation fortalecido.
* [ ] **`ConfirmDialog` / `AlertDialog`:**
  * Modales semánticos para confirmación y mensajes de riesgo.
* [ ] **`Security Helpers` (reutilizables):**
  * Sanitización de texto, validadores comunes, validación de archivo, escape HTML.

---

## 📊 Versión 1.6.0 — Navegación + Layout + Datos Avanzados

*Enfocada en dashboards operativos, tablas densas y paneles complejos.*

* [ ] **`Sidebar` mejorado:**
  * Secciones, grupos, items anidados, estado colapsado, badges, shortcuts.
* [ ] **`Navbar` / `Header`:**
  * Brand, actions, dropdowns, búsqueda global, selector de tema.
* [ ] **`Container`, `Stack`, `Grid`, `AspectRatio`:**
  * Layout reutilizable para dashboards y contenido editorial.
* [ ] **`TreeView`:**
  * Árbol jerárquico para estructuras organizacionales, directorios y clasificación documental.
* [ ] **`VirtualList`:**
  * Rendimiento con listas grandes de forma accesible y scroll controlado.
* [ ] **`Sparkline`, `Gauge`, `Heatmap`, `Funnel`:**
  * Visualización complementaria para KPIs y métricas operativas.
* [ ] **`NotificationCenter`:**
  * Historial de notificaciones, estados leídos/no leídos y acciones rápidas.
* [ ] **`HealthBadge` / `StatusIndicator`:**
  * Indicadores de estado sistémico, disponibilidad y resultados operativos.

---

## 🧠 Versión 1.7.0 — Contenido Rich + DX

*Enfocada en acelerar la adopción y la productividad del consumidor.*

* [ ] **`RichTextEditor` (como módulo independiente):**
  * Evaluar `Lexical` o `TipTap` según costo de mantenimiento.
  * Sanitización estricta y soporte de contenido seguro.
* [ ] **`CodeBlock`, `Markdown`, `CopyButton`:**
  * Render y edición de contenido técnico con manejo controlado de HTML.
* [ ] **`ImageGallery`, `Carousel` mejorado:**
  * Galerías con ligthbox, zoom e indicadores accesibles.
* [ ] **`GlobalSearch` / `Spotlight`:**
  * Búsqueda global del producto con grupos, shortcuts y comando de navegación.
* [ ] **CLI de inicialización (`create-alcspower-app`):**
  * Plantillas para Vite, Astro y Next.js.
* [ ] **Automatización de regresión visual:**
  * Capturas visuales en CI para asegurar estabilidad de diseño.

---

## 🌱 Versión 1.8.0+ — Especialización y Módulos Experimentales

*Los siguientes componentes son valiosos, pero pueden agregar peso o complejidad significativa; se evaluarán como módulos opcionales o experimentales.*

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

- [ ] TypeScript estricto
- [ ] Tests unitarios
- [ ] Tests de accesibilidad (`axe-core`)
- [ ] Storybook con al menos 3 estados
- [ ] Dark mode
- [ ] Responsive cuando aplique
- [ ] Soporte de teclado y foco
- [ ] Documentación pública
- [ ] Cobertura de estados (`loading`, `error`, `empty`, `success`)
- [ ] Compatibilidad con React 18 y 19

---

## 🧭 Priorización Global

| Prioridad | Área | Componentes clave |
|---|---|---|
| P0 | Formularios y validación | `FormProvider`, `FormField`, `SearchInput`, `PasswordInput`, `OTPInput`, `MultiSelect` |
| P0 | Overlays | `ConfirmDialog`, `AlertDialog` |
| P1 | Data & dashboards | `TreeView`, `VirtualList`, `Sparkline`, `Gauge`, `Heatmap` |
| P1 | Navegación | `Sidebar`, `Navbar`, `Breadcrumb` mejorado |
| P1 | Feedback | `NotificationCenter`, `StatusIndicator`, `Result` |
| P2 | Contenido | `RichTextEditor`, `Markdown`, `CodeBlock` |
| P2 | DX | `CLI`, `Spotlight`, `CopyButton` |
| P3 | Experimentales | `Kanban`, `OrganizationChart`, `Flow Diagram` |

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

### v1.5.0 — Formularios Avanzados + Búsqueda

La siguiente fase más valiosa es esta, porque convierte la librería en una base útil para aplicaciones ministeriales y SaaS empresariales.

```text
v1.5.0
├── FormProvider / useForm
├── FormField
├── SearchInput
├── PasswordInput
├── OTPInput
├── MultiSelect / TagsInput
├── Combobox mejorado
├── ConfirmDialog
└── Seguridad / validación reutilizable
```

Después:

```text
v1.5.0 → v1.6.0 → v1.7.0
```

Esto permite escalar sin romper la API pública y sin introducir lógica empresarial.

---

## 🔒 Regla de oro del roadmap

> **Los componentes complejos no deben esperar a que exista todo el catálogo.** Deben construirse sobre primitivas estables y demostrar que la arquitectura de la librería escala.

> **Primero construir primitives reutilizables; después patrones de aplicación; finalmente componentes especializados.**

La librería debe crecer en amplitud sin convertirse en un framework de negocio.
