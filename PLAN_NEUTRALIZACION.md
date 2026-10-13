# Plan de Neutralización — `@alcspower/ui`

> **Estado:** PLANIFICADO. No ejecutado. Este documento define las decisiones y pasos para convertir la librería en agnóstica a gobierno y a empresa privada.
> **Marca protegida:** `@alcspower`, `AlcsPower`, `Alcides Altamirano` y los tokens `--alcspower-*` **se mantienen intactos**.

| Campo | Valor |
|---|---|
| Proyecto | `@alcspower/ui` (mific-ui) v1.4.0 |
| Fecha | 2026-10-13 |
| Objetivo | Eliminar referencias a MIFIC / ministerial / gubernamental / Nicaragua / léxico administrativo público |
| Resultado esperado | Ejemplos, docs y código con terminología neutra, genérica y en inglés (identificadores) |

---

## 1. Decisiones confirmadas

1. **Renombrar identificadores de código** usando **términos en inglés comunes en otras librerías** (para facilitar adopción y familiarización).
2. **`institucional` → `corporativo`.**
3. **Dominio neutro: `empresa.com`** (emails, URLs de ejemplo).
4. **Incluir** también los documentos de auditoría (`SECURITY_AUDIT_RESPONSE.md`) y las recetas/instructivos.
5. **Mantener el idioma original** de cada documento (ES o EN) y usar **términos neutros**.

---

## 2. Principios de reemplazo

- **Identificadores / API / tipos → inglés genérico** (p. ej. `Request`, `Record`, `Corporate`).
- **Copy visible y documentación → se conserva el idioma original** con términos neutros.
- **Neutro y genérico:** `Empresa de Ejemplo S.A.`, `Sede Central`, `Organización`, `empresa.com`.
- **No tocar:** `@alcspower`, `AlcsPower`, tokens `--alcspower-*`, y las carpetas `node_modules`, `dist`, `dist-storybook`, `coverage`, `.git`.
- **Sincronizar tests** (aserciones) en el mismo cambio.

---

## 3. Nomenclatura canónica

### 3.1 Léxico

| Categoría | Identificador EN (código/API) | Copy ES neutro | Copy EN neutro | Actual |
|---|---|---|---|---|
| Proceso/solicitud | `Request` / `Requests` | solicitud | request | trámite |
| Caso/registro | `Record` / `Records` | registro | record | expediente |
| Punto de atención | `Counter` / `ServiceDesk` | mostrador de atención | service desk | ventanilla |
| Referencia | `Reference` | referencia | reference | folio |
| Boletín | `Bulletin` | boletín | bulletin | gaceta |
| ID fiscal | `TaxId` | ID fiscal | tax ID | RUC |
| Adjetivo org. | `Corporate` / `Enterprise` | corporativo | corporate | institucional / ministerial |
| Organización | `Company` / `Organization` | empresa / organización | company | ministerio |
| Dominio | — | — | — | `mific.gob.ni` → `empresa.com` |

### 3.2 Identificadores de código a renombrar

| Actual | Nuevo (EN) | Archivos |
|---|---|---|
| `Tramite` (tipo) | `Request` | `templates/.../types/index.ts`, `ExpedientesView.tsx`, `NuevoTramiteModal.tsx`, `docs/recipes/astro.md` |
| `NuevoTramiteModal` | `NewRequestModal` | `templates/.../views/*` |
| `ExpedientesView` | `RecordsView` | `templates/.../views/*`, `App.tsx` |
| `TRAMITES_INICIALES` | `INITIAL_REQUESTS` | `ExpedientesView.tsx` |
| `TRAMITES_MOCK` | `REQUESTS_MOCK` | `docs/recipes/astro.md` |
| `tramites` / `setTramites` | `requests` / `setRequests` | `ExpedientesView.tsx`, `DashboardView.tsx` |
| `onTramiteCreado` | `onRequestCreated` | `NuevoTramiteModal.tsx`, `ExpedientesView.tsx` |
| `handleNuevoTramite` | `handleNewRequest` | `ExpedientesView.tsx` |
| `renderTramitesTable` / `JsonTramites` / `ObtenerTramitesDeBaseDatos` / `ProcesarTramiteInstitucional` | `renderRequestsTable` / `JsonRequests` / `GetRequestsFromDatabase` / `ProcessCorporateRequest` | `docs/recipes/dotnet-aspnet.md` |
| `ministerialPermissions` | `corporatePermissions` | `MultiSelect.stories.tsx` |
| `delegacion-esteli` / `delegacion-leon` | `branch-north` / `branch-south` | `Combobox.test.tsx` |
| `mific-central` | `hq-central` | `Combobox.test.tsx`, `TreeView.stories.tsx`, `TreeView.test.tsx` |

### 3.3 Reemplazos de copy (ES/EN) — ejemplos

| Actual | Reemplazo |
|---|---|
| `@mific.gob.ni` / `mific.gob.ni` | `@empresa.com` / `empresa.com` |
| `MIFIC Central` | `Sede Central` / `Headquarters` |
| `MIFIC-2026-EXP-001` | `2026-REQ-001` |
| `EXP-2026-MIFIC-9941` | `REQ-2026-9941` |
| `Ministerio de Fomento, Industria y Comercio (MIFIC)` | `Empresa de Ejemplo S.A.` |
| `Archivo Central MIFIC` | `Archivo Central` |
| `Manual de Identidad Visual MIFIC.pdf` | `Manual de Identidad Visual.pdf` |
| `Mific2026$Seguro` | `Empresa2026$Seguro` |
| `Plataforma Ministerial` | `Plataforma Corporativa` |
| `Sistema Ministerial` | `Sistema` |
| `Tablero de Control Ministerial` | `Tablero de Control` |
| `Resolución Ministerial 01-2026.pdf` | `Resolución Interna 01-2026.pdf` |
| `Ventanilla Única` | `Canal Único` / `Single Service Desk` |
| `Managua, Nicaragua` / `Nicaraguan` | `Ciudad` / eliminar |
| `Exportaciones de Nicaragua S.A.` | `Exportaciones del Norte S.A.` |
| `diseño/acuerdos institucionales` | `diseño/acuerdos corporativos` |
| `Marca Principal Institucional AlcsPower` | `Marca Principal AlcsPower` |

---

## 4. Mapa de afectación por término

| Término | Archivos | Ocurrencias |
|---|---|---|
| `MIFIC` / `mific` | 14 | 54 |
| `minist*` (ministerial/ministerio) | 33 | 66 |
| `institucional` | 42 | 88 |
| `Nicaragua` | 4 | 4 |
| `.gob.ni` | 8 | 28 |
| `gubernamental` | 2 | 2 |
| léxico de trámite (trámite/expediente/ventanilla/folio/gaceta/RUC) | 70 | — |

---

## 5. Paquetes de trabajo (WP)

### WP1 — MIFIC directo (14 archivos)
- `src/components/forms/field/Field.test.tsx` (54,56,60,61)
- `src/components/forms/input/Input.stories.tsx` (281)
- `src/components/data-display/table/Table.test.tsx` (231,236) y `Table.stories.tsx` (27-30)
- `src/components/data-display/data-table/DataTable.stories.tsx` (23–111)
- `src/components/overlays/sheet/Sheet.stories.tsx` (51)
- `src/components/navigation/accordion/Accordion.stories.tsx` (105)
- `src/components/forms/combobox/Combobox.test.tsx` (8,63,68,71,85,136,140,148)
- `src/components/forms/button/CopyButton.test.tsx` (13) y `CopyButton.stories.tsx` (38,42,52,58)
- `src/components/navigation/tree-view/TreeView.test.tsx` (22,24,48,59,102) y `TreeView.stories.tsx` (9,10,130,142,159,170,181,192)
- `src/components/forms/password-input/PasswordInput.stories.tsx` (137)
- `CHANGELOG.md` (414)

### WP2 — "ministerial / ministerio" (33 archivos)
`README.md`, `ROADMAP.md`, `SECURITY.md`, `CHANGELOG.md`, `docs/instructivo/{es,en}/*`, `docs/recipes/react-vite.md`, y stories/tests: `DataTable.stories`, `Gauge.stories`, `Timeline.stories/.test`, `LoadingOverlay.stories`, `Field.tsx`, `MultiSelect.stories`, `Container.stories`, `Stack.stories`, `Accordion.stories`, `Stepper.stories`, `TreeView.stories/.test`, `Command.stories`, `Drawer.stories`, `Sheet.stories`, y todo `templates/vite-react-starter/**` (`index.html`, `README.md`, `Header.tsx`, `DashboardView.tsx`, `NuevoTramiteModal.tsx`).

### WP3 — "institucional" → "corporativo" (42 archivos / 88 ocurrencias)
Foco: `CHANGELOG.md` (11), `README.md` (6), `src/tokens/DesignTokens.stories.tsx` (4), `src/styles/tokens.css` (4), `docs/instructivo/es/09-proyecto-final.md` (4), `templates/.../README.md` (3), `PasswordInput.tsx` (3), `Input.stories.tsx` (3), `docs/recipes/{tailwind-v4,astro}.md` (3 c/u), `ROADMAP.md` (3) + ~30 archivos con 1-2. Revisar concordancia de género.

### WP4 — Nicaragua / gubernamental / `.gob.ni` (14 archivos)
`README.md`, `docs/instructivo/{en/04,en/08,es/04}`, `docs/recipes/astro.md`, `Dialog.stories.tsx` (41-42).

### WP5 — Léxico de trámite + identificadores (70 archivos)
`src/**/*.stories.tsx` y `*.test.tsx`, `src/stories/*`, `templates/**`, `docs/recipes/*`, `docs/instructivo/*`, `README.md`, `ROADMAP.md`, `SECURITY.md`, `COMPONENT_SHOWCASE_GUIDELINES.md`. Incluye el renombrado de identificadores (§3.2).

### WP6 — Sincronización de tests
Actualizar aserciones en: `Field.test`, `Table.test`, `Combobox.test`, `CopyButton.test`, `TreeView.test`, `Timeline.test`, `Spinner.test`, `Container.test`, `LoadingOverlay.test`, `Badge.test`, `Accordion.test`, y los tests con léxico (`Button.test`, `Card.test`, `Chart.test`, `Metrics.test`, `Sparkline.test`, `Alert.test`, `EmptyState.test`, `Command.test`, `DatePicker.test`, `Breadcrumb.test`).

### WP7 — Fugas de entorno y docs de auditoría
- `COMPONENT_SHOWCASE_GUIDELINES.md:115` → ruta absoluta `/home/alcides/alcspower-showcase/...` → ruta relativa genérica.
- `SECURITY_AUDIT_RESPONSE.md` → neutralizar la mención a "sistemas MIFIC".

---

## 6. Estrategia de ejecución

1. **Baseline:** `pnpm typecheck` (0 errores) y `pnpm test` (68 archivos / 497 tests) — ya verificado.
2. **Reemplazos inequívocos** (dominios, emails, IDs, acrónimo `MIFIC`, identificadores) mediante listas explícitas de archivos y patrones con plurales/género.
3. **Revisión contextual manual** de adjetivos (`ministerial*`, `institucional*`, `gubernamental*`) y prosa en README/docs/templates.
4. **Renombrado de identificadores** (§3.2) en el template y recetas, verificando imports y tipos.
5. **Sincronización de tests** (WP6).
6. **Verificación final** (sección 7).

> Herramienta: edición archivo por archivo revisando diffs; si se usa reemplazo masivo, restringirlo a la lista explícita de archivos (nunca global sobre `node_modules`/`dist`).

---

## 7. Verificación / criterios de aceptación

```bash
# 1. Cero referencias institucionales
grep -rIil -e mific -e minist -e gubernamental -e nicaragua -e "gob.ni" \
  src docs templates *.md | wc -l        # => 0

# 2. "institucional" reemplazado
grep -rIil -e institucional src docs templates *.md | wc -l   # => 0

# 3. Léxico administrativo (según alcance)
grep -rIil -e "tr[aá]mite" -e expediente -e ventanilla -e folio -e gaceta -e "\bRUC\b" \
  src docs templates *.md | wc -l        # => 0

# 4. Marca intacta
grep -rIil alcspower src templates package.json | wc -l   # > 0 (se mantiene)

# 5. Build y pruebas
pnpm typecheck   # exit 0
pnpm test        # 68 archivos / 497 tests OK
pnpm build       # exit 0 (opcional; escribe dist/)
```

---

## 8. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Concordancia de género al sustituir adjetivos | Revisión contextual manual |
| Aserciones de tests desincronizadas | WP6 + correr suite tras cada WP |
| Renombrar identificadores rompe imports/tipos | Renombrar de forma atómica por archivo + `pnpm typecheck` |
| Modificar artefactos/`dist` | Excluir `node_modules`, `dist*`, `coverage`, `.git` |
| Pérdida de historial | Los cambios quedan en git (opción: commit previo) |

---

## 9. Archivos que NO se modifican

- `node_modules/`, `dist/`, `dist-storybook/`, `coverage/`, `.git/`
- Marca: `@alcspower`, `AlcsPower`, `Alcides Altamirano`, tokens `--alcspower-*`, `LICENSE`, `THIRD_PARTY_LICENSES.md`
- Nombres de API pública de `src/index.ts` que no sean del léxico institucional

---

*Documento de planificación. No se ejecutaron cambios de código ni configuración del proyecto.*
