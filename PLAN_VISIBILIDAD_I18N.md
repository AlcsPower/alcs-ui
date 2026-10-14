# Plan de Visibilidad + Documentación Bilingüe — `@alcspower/ui`

> **Estado:** EJECUTADO Y VERIFICADO (Fases 0, 1, 4 y 5 completadas. Fases 2 y 3 integradas formalmente en `ROADMAP.md` para desarrollo dedicado y pulido de máxima calidad).
> **Versión canónica confirmada:** `1.6.2` (repositorio + GitHub).
> **Marca protegida:** `@alcspower`, `AlcsPower`, `Alcides Altamirano` y tokens `--alcspower-*` se mantienen intactos.

| Campo | Valor |
|---|---|
| Proyecto | `@alcspower/ui` (mific-ui) |
| Objetivo | (a) Aumentar visibilidad/adopción. (b) Documentación con **inglés canónico** y **español espejo**. |
| Sitio de docs | Astro **Starlight** (i18n en/es), publicado en **GitHub Pages** |
| Fuente de verdad idioma | **Inglés** (canónico). Español = espejo sincronizado (sólo categoría A). |

---

## 1. Principios

- **Inglés = fuente de verdad**; **español = espejo completo** sólo para documentación de producto (categoría A).
- **Sólo se traduce lo que forma parte del producto final.** Planes de desarrollo, auditorías y docs internos **no se traducen**.
- Neutralidad de marca y términos según `PLAN_NEUTRALIZACION.md`.
- **Secuenciación:** terminar `PLAN_NEUTRALIZACION` antes de traducir (evita retraducir copy en cambio).

---

## 2. Clasificación de documentación

### A. Producto → bilingüe (EN canónico + ES espejo)
| Documento | Estructura objetivo |
|---|---|
| `README.md` | `README.md` (EN) + `README.es.md` |
| `SECURITY.md` | `SECURITY.md` (EN) + `SECURITY.es.md` |
| `API_PRESERVATION_GUIDE.md` | `API_PRESERVATION_GUIDE.md` (EN) + `API_PRESERVATION_GUIDE.es.md` |
| `docs/recipes/*` | `docs/recipes/en/*` + `docs/recipes/es/*` |
| `docs/instructivo/*` | `docs/instructivo/en/*` + `docs/instructivo/es/*` (ya existe; corregir) |

### B. Sólo inglés (canónico, sin ES)
- `templates/vite-react-starter/README.md`
- `package.json` → `description`
- Manifiestos legibles por máquina: `llms.txt`, `llms-small.txt`, `registry.json`
- `CHANGELOG.md`
- Archivos para agentes/IA: `CLAUDE.md`, `skill/*`, `.cursor/rules/*`, `.agent/skills/*`, `.github/copilot-instructions.md`

### C. Interno → no se traduce (queda en español)
- `ROADMAP.md`, `MIGRATION_GUIDE.md`, `FOLDER_STRUCTURE.md`, `COMPONENT_SHOWCASE_GUIDELINES.md`
- `SECURITY_AUDIT*.md`, `PLAN_*.md` → **temporales; se eliminan tras verificar la implementación**

---

## 3. Convención bilingüe

- Archivos sueltos: sufijo `.es.md` (inglés en el path canónico). Ej.: `SECURITY.md` + `SECURITY.es.md`.
- Secciones multi-documento: subcarpetas por idioma `{en,es}` (como ya hace `docs/instructivo/`).
- Selector de idioma (🇺🇸/🇪🇸) al inicio de cada documento de categoría A.
- El **sitio de docs Starlight** publica únicamente la categoría A, con locales `en` (default) y `es`.

---

## 4. Diagnóstico actual (hallazgos)

**Bilingüismo inconsistente**
- `README.md`: ES principal + sólo *English Summary* al final (no versión EN completa).
- `docs/instructivo/`: en/es existe, pero el índice `docs/instructivo/README.md` lista 6 módulos (00–05) cuando hay 10 (00–09) y enlaza archivos inexistentes (`es/04-layouts.md`, `es/05-proyecto-final.md`, `en/04-layouts.md`, `en/05-final-project.md`); los reales son `04-layout-and-cards.md` y `09-final-project.md`.
- `docs/recipes/`: sólo español.
- `SECURITY.md`, `API_PRESERVATION_GUIDE.md`, root docs: sólo español.
- `llms.txt` / `registry.json`: mezcla EN/ES en ejemplos.
- `docs/components/` referenciado en el instructivo **no existe**.

**Versiones desalineadas (canónico = 1.6.2)**
- `README.md:105` ("Salida esperada: 1.4.0"), `:509`, `:512`, `:518` (ejemplos install/tarball `1.4.0`)
- `registry.json:4` (`1.5.0`) — verificar regen desde `package.json`
- `ROADMAP.md:19`, `:37` ("v1.3.0 (Actual)")
- `COMPONENT_SHOWCASE_GUIDELINES.md:16`, `:45` (`1.4.0`)
- `CLAUDE.md:7`, `skill/AGENT.md:4`, `skill/CLAUDE.md:7`, `skill/copilot-instructions.md:4`, `.github/copilot-instructions.md:4`, `.agent/skills/alcspower-ui/SKILL.md:4` (`1.4.0`)
- `PLAN_NEUTRALIZACION.md:8` (`1.4.0`)

**No tocar (histórico legítimo):**
- `CHANGELOG.md` (entradas 1.3.0–1.6.2), hitos planificados del `ROADMAP.md` (1.4→1.8), badges `since 1.5.0` en `PasswordInput.stories.tsx:45` / `SearchInput.stories.tsx:71`, versión propia `1.0.0` del starter (`templates/vite-react-starter/package.json`).

**Conteo de tests desactualizado (real: 68 archivos / 497 tests)**
- `README.md:441` ("50 suites, 353/353") y `ROADMAP.md:23` → actualizar. `CHANGELOG.md` histórico → dejar.

**Visibilidad / distribución (carencias)**
- Sin badges en el README.
- Storybook se compila en CI pero **no se publica**: sin demo en vivo, sin GitHub Pages.
- Sin sitio de documentación.
- Sin archivos de comunidad (CONTRIBUTING, CoC, SUPPORT, issue/PR templates).
- `homepage` de `package.json` apunta al README de GitHub (no a sitio/demo).

---

## 5. Fases de ejecución

### Fase 0 — Credibilidad y correcciones
- Alinear todas las referencias "actuales" a **1.6.2** (ver §4).
- Corregir conteo de tests a **68 archivos / 497 tests** (`README.md`, `ROADMAP.md`).
- Reparar índice y enlaces del `docs/instructivo/` (10 módulos, nombres reales de archivo).
- Añadir **badges** al README: npm version, npm downloads, license, CI, bundle size (bundlephobia), PRs welcome, demo/Storybook.
- Repo meta: `description` en inglés, **topics** (react, design-system, tailwindcss, radix-ui, typescript, components, ui-library), social preview image.

### Fase 1 — README y metadatos
- `README.md` en inglés canónico + `README.es.md` espejo completo, con selector de idioma.
- `package.json`: `description` en inglés; `homepage` → URL del sitio de docs/demo.

### Fase 2 — Demo en vivo
- Publicar **Storybook en GitHub Pages** (workflow `actions/deploy-pages` sobre `dist-storybook`).
- Hosting público de `llms.txt` / `llms-small.txt` en GitHub Pages (o `raw.githubusercontent.com`).
- Enlazar la demo en README, About y `homepage`.

### Fase 3 — Sitio de documentación (Starlight)
- Proyecto Astro **Starlight** con i18n `en`/`es` y búsqueda integrada.
- Migrar contenido de categoría A: `docs/recipes`, `docs/instructivo`, guías de inicio.
- Publicar en **GitHub Pages** (workflow `docs.yml`).

### Fase 4 — Paridad bilingüe
- Traducir categoría A restante: `recipes`, `instructivo`, `SECURITY`, `API_PRESERVATION_GUIDE`, `README.es.md`.
- Añadir job CI **`i18n-parity`**: falla si falta el `.es` o si el conjunto de archivos EN↔ES diverge.

### Fase 5 — Comunidad y difusión
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SUPPORT.md`, issue templates, PR template.
- Envío a *awesome lists* (awesome-react-components, awesome-tailwindcss).
- Artículo de lanzamiento (dev.to/Hashnode), Reddit r/reactjs, Product Hunt.
- Habilitar GitHub Discussions; enlaces sociales.

---

## 6. Automatización (CI)

| Workflow | Función |
|---|---|
| `docs.yml` (nuevo) | Build delsitio Starlight → `actions/deploy-pages` |
| `storybook.yml` (nuevo) | Build Storybook → GitHub Pages (demo) |
| `i18n-parity` (job) | Verifica existencia/estructura espejo EN↔ES (categoría A) |
| `ci.yml` (existente) | Typecheck, audit, test, build, pack |

---

## 7. Estimación de esfuerzo

| Fase | Esfuerzo |
|---|---|
| 0 — Credibilidad | 0.5–1 día |
| 1 — README + metadatos | 1 día |
| 2 — Storybook Pages | 1–2 días |
| 3 — Sitio Starlight | 2–4 días |
| 4 — Paridad bilingüe (sólo categoría A) | 2–4 días |
| 5 — Comunidad + difusión | continuo |

---

## 8. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Doble mantenimiento EN/ES | CI `i18n-parity` + nota "EN canónico, PRs a ambos" |
| Reescritura masiva de docs | Ejecución por fases, priorizando lo visible |
| Solapamiento con neutralización | Secuenciar: neutralización → bilingüe |
| Hosting en Pages requiere repo público y permisos de Actions | Verificar antes de Fase 2/3 |
| Traducir contenido aún en cambio | Congelar copy de categoría A tras neutralización |

---

## 9. Decisiones confirmadas

1. Sitio de docs: **Astro Starlight** (i18n nativo). ✓
2. Hosting: **GitHub Pages**. ✓
3. Convención: `.es.md` para archivos sueltos + `{en,es}` para secciones. ✓
4. `SECURITY.md` y `API_PRESERVATION_GUIDE.md`: **categoría A** (bilingüe). ✓
5. `MIGRATION_GUIDE.md`: **categoría C** (no se traduce). ✓
6. Categoría B: sólo inglés (incluye `templates/vite-react-starter/README.md` y `package.json`). ✓
7. Guardar plan como `PLAN_VISIBILIDAD_I18N.md`. ✓
8. Planes/auditorías no se traducen; documentos de plan son temporales y se eliminan tras verificación. ✓

---

*Documento de planificación. No se ejecutaron cambios de código ni configuración del proyecto.*
