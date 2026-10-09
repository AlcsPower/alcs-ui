# 🗺️ Hoja de Ruta (Roadmap) — `@alcspower/ui`

Este documento describe la visión de evolución técnica, las prioridades de desarrollo y los hitos planificados para el ciclo **v1.x** de `@alcspower/ui`.

---

## 📌 Principios de Evolución del Ciclo v1.x

1. **Estabilidad SemVer y Retrocompatibilidad:** Ninguna versión menor (`1.x.0`) ni parche (`1.x.y`) introducirá cambios que rompan compatibilidad con aplicaciones consumidoras existentes.
2. **Accesibilidad sin Concesiones:** Todo nuevo componente mantendrá el estándar de 0 violaciones detectadas por `axe-core` y soporte completo de navegación por teclado (**WCAG 2.1 AA/AAA**).
3. **Estética Craft Minimalist / Elevated Flat:** Consistencia estricta con los pilares del sistema (bordes hairline de 1.5px, paleta *Cool Indigo & Slate*, micro-elevaciones y radios contemporáneos).
4. **Desacoplamiento Absoluto:** Cero lógica de negocio incrustada; los componentes son primitivas puras reutilizables en cualquier entorno.

---

## 🏁 Hitos Consolidados

### ✅ Versión 1.3.0 (Actual)
* **Starter Kit Oficial Enterprise (`templates/vite-react-starter`):** Plantilla base con React 19, Vite 6, Tailwind CSS v4, Layout con Sidebar colapsable, Header, selector Claro/Oscuro y vistas completas de Dashboard, Expedientes y Modales.
* **Recetario Multistack Oficial (`docs/recipes/`):** Guías completas para React 19, Astro (React Islands), .NET (ASP.NET Web Forms con VB.NET/C# y ASP.NET Core) y personalización de tokens con Tailwind v4.
* **Refinamiento de Primitivas de Feedback:** Exportación de `ToastCard` con barra de progreso, `Skeleton` dinámico con animación shimmer (*shine*), y mejoras estructurales en `EmptyState`, `ErrorState`, `Spinner` y `LoadingOverlay`.
* **Garantía de Calidad:** 50 suites de pruebas, **353/353 pruebas pasando al 100%**, 0 violaciones de accesibilidad axe-core.

### ✅ Versión 1.2.0
* **Política de Seguridad Enterprise:** Formalización de [`SECURITY.md`](SECURITY.md) con protocolos responsables de reporte, matriz CVSS y SLAs de remediación.
* **Expansión de Primitivas:** `Accordion` (4 variantes y escala métrica), `Collapsible`, `Pagination` semántica, `Separator` con etiquetas de texto y `Tabs` mejorados.

### ✅ Versión 1.1.0
* **Consolidación Craft Minimalist:** Definición y aplicación integral de los 6 pilares de diseño contemporáneo sobre los 51 componentes del catálogo.

---

## 🚀 Próximas Versiones Planificadas (Ciclo v1.x)

```text
  v1.3.0 (Actual)
    └─► v1.4.0: Flujos B2B y Trámites Institucionales (Stepper, Timeline, FileUpload, Kbd)
          └─► v1.5.0: Estructuras Jerárquicas y Datos Complejos (TreeView, Filtros Facetados)
                └─► v1.6.0: Herramientas de DX, Plantillas y Productividad
```

---

### 📦 Versión 1.4.0 — Flujos B2B y Trámites Institucionales
*Enfocada en resolver los patrones de interacción más demandados en plataformas de expedientes, formularios largos y auditoría.*

* [ ] **`Stepper` / `Wizard` (Asistente por Pasos):**
  * Control secuencial accesible para trámites y formularios multi-etapa.
  * Modos horizontal y vertical, iconos por etapa, estados (completado, activo, error, pendiente) y soporte para validación por paso.
* [ ] **`Timeline` / `ActivityLog` (Línea de Tiempo):**
  * Visualización cronológica de eventos, trazabilidad de expedientes y registros de auditoría técnica.
  * Soporte para avatares, estados de color con `StatusBadge`, marcas de tiempo y contenido colapsable.
* [ ] **`FileUpload` / `Dropzone` (Carga de Documentos):**
  * Zona accesible para arrastrar y soltar archivos (PDFs, imágenes, etc.).
  * Barra de progreso de subida individual y global, validación de extensiones y peso máximo, y previsualización de lista de archivos.
* [ ] **`Kbd` (Indicador de Atajos de Teclado):**
  * Primitiva visual para representar teclas y combinaciones de atajos (`⌘K`, `Ctrl + S`, `Esc`), diseñada para integrarse con la paleta de comandos (`CommandMenu`).

---

### 📊 Versión 1.5.0 — Estructuras Jerárquicas y Datos Complejos
*Enfocada en la visualización estructurada de información ministerial y corporativa.*

* [ ] **`TreeView` (Árbol Jerárquico):**
  * Primitiva para navegación de directorios, estructuras organizacionales y árboles de clasificación arancelaria/normativa.
  * Soporte de selección simple y múltiple, estados expandido/colapsado e iconos por nodo.
* [ ] **Filtros Facetados Avanzados en `DataTable`:**
  * Componentes de filtrado multi-criterio reutilizables (rangos numéricos, listas de selección con búsqueda, conmutadores booleanos).
* [ ] **Modo Compacto Ultraintenso para Tablas Operativas:**
  * Modo de densidad reducida (32px por fila) para operadores de alta velocidad en terminales de captura.

---

### 🛠️ Versión 1.6.0 — Herramientas de DX, Plantillas y Productividad
*Enfocada en acelerar el desarrollo para los equipos consumidores.*

* [ ] **CLI Inicializador (`create-alcspower-app`):**
  * Herramienta rápida para inicializar proyectos con la plantilla oficial desde terminal (`pnpm create @alcspower/app`).
* [ ] **Nuevas Plantillas de Starter:**
  * Plantilla para **Astro** (React Islands preconfigurado con `@alcspower/ui`).
  * Plantilla para **Next.js (App Router)** con soporte de servidor y cliente.
* [ ] **Automatización de Pruebas de Regresión Visual:**
  * Integración de capturas de regresión visual en el pipeline de CI para asegurar cero saltos de estilo entre releases.

---

## 💬 Sugerencias y Nuevas Solicitudes

El roadmap de `@alcspower/ui` es dinámico y se adapta a las necesidades reales de los sistemas en producción. Si identificas una necesidad o deseas proponer un nuevo componente:

* Abre una propuesta en [GitHub Issues](https://github.com/AlcsPower/alcs-ui/issues).
* Consulta las guías de integración en [`docs/recipes/`](docs/recipes/README.md).
