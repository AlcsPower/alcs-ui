# Briefing para el Especialista — `@alcspower/ui`

> **Propósito:** Documento de trabajo para pasar al especialista. Contiene (1) los hallazgos técnicos confirmados, (2) los "no-goals" arquitectónicos decididos por el responsable del proyecto y (3) la evaluación objetiva y las respuestas del asistente.
> **Versión canónica verificada:** `1.6.2`.
> **Fecha:** 2026-10-14.
> **Estado:** documentación de decisiones. No implica cambios de código ejecutados.

---

## 1. Contexto

`@alcspower/ui` es una librería React de **64 componentes de nivel superior** (67 tras el saneamiento propuesto), **66 stories**, **68 suites / 497 tests**, 0 violaciones `axe-core`, 0 errores TS. Stack: **Radix UI + CVA + Tailwind v4 + Recharts + TanStack Table + cmdk + sonner + react-day-picker + date-fns**. Distribución: bundle npm público + GitHub Packages + `.tgz` offline, con CLI propio (`init-agent`, `info`, `list`, `tokens`, `snippets`).

Se realizó una auditoría del roadmap y del código. El responsable del proyecto emitió una evaluación crítica en partes, con hallazgos confirmados y decisiones de arquitectura (rechazos). A continuación se consolidan para revisión del especialista.

---

## 2. Hallazgos técnicos confirmados (sí corregir)

### A. Directiva `'use client'` ausente en los bundles compilados (`dist/`)
- **Evidencia:** `tsup.config.ts` define el banner `'use client'`, pero durante el build tsup/esbuild lo descarta con el aviso: `Module level directives cause errors when bundled, "use client" in "dist/index.js" was ignored`. Verificado: `dist/index.js` y `dist/index.cjs` no contienen la directiva (0 coincidencias).
- **Impacto:** fallo al consumir en **Next.js App Router (RSC)**: el servidor encuentra hooks como `useState` o primitivas Radix sin `'use client'`.
- **Fix requerido:** garantizar `'use client';` en la **primera línea** de `dist/index.js` y `dist/index.cjs` vía plugin o script post-build.

### B. `registry.json` incompleto (contrato para agentes IA)
- **Evidencia:** `CopyButton`, `Sparkline` y `Gauge` **no aparecen** en `registry.json`, aunque existen, se exportan y están testeados.
- **Impacto:** los agentes (Cursor, Claude, Copilot, Antigravity) y `alcspower-ui info` no "ven" esos 3 componentes.
- **Fix requerido:** incorporar sus definiciones, variantes y ejemplos. Catálogo formal **64 → 67**.

### C. Inexactitudes en `ROADMAP.md`
- **`HealthBadge` vs `StatusBadge`:** sólo existe `StatusBadge`.
- **`Security Helpers`:** hay directrices/checklists en `SECURITY.md`, pero **ninguna función JS/TS exportada**.
- **Conteo de stories:** el repositorio tiene **66** archivos `*.stories.tsx`, no 64 (64 componentes + `Chart.stories.tsx` + `DesignTokens.stories.tsx`).

---

## 3. Decisiones arquitectónicas — "No-Goals" del responsable (NO cambiar)

> Registradas para no re-litigarlas. El asistente coincide en lo esencial, con matices marcados.

### 3.1 NO migrar a Base UI ni crear capa agnóstica sobre Radix
**Razón del responsable:** Radix es estándar maduro y probado (497 tests/0 axe); una capa sobre 3 motores triplicaría bugs, peso e hidratación en React 19.

**Evaluación del asistente:** de acuerdo. Refuerzo: **Base UI sigue pre-1.0** — migrar 67 componentes sobre base no estable es el riesgo real. La debilidad de Radix en Combobox/multi-select **no aplica** (no se usa esa primitiva). Matiz: el argumento "triplica bugs/hidratación" es algo exagerado, pero la conclusión es correcta.
**Acción recomendada:** mantener Radix; **no filtrar props específicas de Radix** en la API pública (estabilidad ante cambios internos); revisar sólo cuando Base UI llegue a 1.0.

### 3.2 NO convertir la librería en registro copy-paste de shadcn (`npx shadcn add`)
**Razón del responsable:** preservar el **Self-Contained Bundle** npm/.tgz (valor corporativo/air-gapped, sin dependency hell); la ergonomía ya la cubre `init-agent`.

**Evaluación del asistente (discrepancia parcial):** correcto **rechazar el reemplazo**, pero ambos modelos **conviven**. Publicar un `registry.json` en **esquema shadcn-compatible** es un **canal de descubrimiento/agentes** (soporte de registros desde GitHub, jun-2026), no un cambio de empaquetado: coste casi nulo, alcance alto.
**Acción recomendada:** npm/.tgz **primario** + manifiesto shadcn-compatible **opcional**, sin eliminar el CLI propio ni cambiar el modelo de consumo. *(Pendiente de confirmación del responsable.)*

### 3.3 NO fragmentar en subpath exports obligatorios
**Razón del responsable:** preservar la importación canónica `from '@alcspower/ui'`; los bundlers modernos hacen tree-shaking automático si `sideEffects` está bien.

**Evaluación del asistente:** de acuerdo en no forzar. Matiz: es un **falso dilema** — `from '@alcspower/ui'` y (opcional) `'@alcspower/ui/button'` pueden coexistir sin romper nada. El único motivo sería rendimiento. La afirmación de tree-shaking automático **es verificable** en un bundle monolítico con `noExternal` (medir tamaño real).
**Acción recomendada:** no forzar subpaths; **verificar** el tree-shaking con una medición de bundle antes de descartar la optimización.

### 3.4 NO crear framework de formularios propio (`FormProvider`/`useForm` acoplado)
**Razón del responsable:** `Field` (compuesto, agnóstico) ya se integra con RHF, TanStack Form, Formik, Zod o `useState`; un gestor propietario acoplaría a una dependencia de validación.

**Evaluación del asistente:** de acuerdo. Añadido: publicar **una receta en docs** (RHF + Zod + `Field`) que demuestre la integración **sin** dependencia en el core. Máximo valor, cero acoplamiento.

### 3.5 NO inflar el core con megacomponentes (Gantt, Kanban, RichTextEditor, Flow)
**Razón del responsable:** multiplicarían `dist/styles.css` y `dist/index.js`; deben ser **paquetes satélite**, nunca en el core (Regla de Oro del roadmap).

**Evaluación del asistente:** de acuerdo. Añadido: formalizar la **estrategia de satélites** (p. ej. `@alcspower/ui-scheduling`, `-charts-extra`, `-editor`) y que el roadmap diga explícitamente "satélite" para no crear expectativas en el core.

---

## 4. Respuestas del asistente a las decisiones abiertas

| # | Decisión | Respuesta del asistente |
|---|---|---|
| 1 | Primitivas (Radix vs Base UI vs agnóstica) | Mantener **Radix**; no migrar; no capa agnóstica; blindar API pública; revisar en Base UI 1.0. *(Coincide.)* |
| 2 | Registro shadcn | Bundle npm/.tgz primario **+** manifiesto shadcn-compatible **opcional**. *(Discrepancia parcial: no descartar el canal.)* |
| 3 | `HealthBadge` | **No** crear componente nuevo. Renombrar el ítem del roadmap a `StatusBadge` **o** (si "salud operativa" es semántica distinta) añadir variante `health` a `StatusBadge`. |
| 4 | `Security Helpers` | Implementar **sólo** funciones puras sin dependencias (`escapeHtml`, `isEmail/isUrl/isPhone`, validadores de archivo). Si requiere dependencias (p. ej. DOMPurify) → **docs-only**. |
| 5 | Integrar en `ROADMAP.md` | Sí. **Además**, crear sección **"Non-Goals / Decisiones arquitectónicas (ADR)"** que registre los 5 rechazos con justificación. |

---

## 5. Horizontes propuestos (a confirmar por el responsable)

Los "dos horizontes" del responsable quedaron incompletos en el mensaje. Propuesta del asistente para contrastar:

### Horizonte 1 — Estabilización (v1.6.x)
- Fix RSC `'use client'` en `dist/`.
- Sincronizar `registry.json` (+`CopyButton`, `Sparkline`, `Gauge` → 67).
- Corregir `ROADMAP.md` (HealthBadge→StatusBadge, Security Helpers, conteo 66).
- Verificar tree-shaking con medición de bundle.
- Añadir sección **Non-Goals / ADR**.

### Horizonte 2 — Expansión (v1.7+)
- Showcase Storybook + portal Astro Starlight bilingüe (EN/ES) en GitHub Pages.
- RTL + i18n (locales de fechas).
- `ThemeProvider` (tema/densidad/presets).
- Data grid pro (virtualización, pinning, edición, CSV).
- Charts (`Funnel`, `Heatmap`, `Radial`, `Scatter`) + a11y de gráficos.
- Motion (`AnimatedNumber`, View Transitions).
- Satélites para los pesados (Gantt/Kanban/RTE/Flow).

---

## 6. Preguntas abiertas para el especialista

1. ¿Se confirma el rechazo **total** al manifiesto shadcn-compatible, o se acepta como **canal opcional** (punto 3.2)?
2. ¿`HealthBadge`: renombrar el ítem a `StatusBadge` o añadir variante `health`?
3. ¿`Security Helpers`: implementar funciones puras sin dependencias, o dejar sólo documentación?
4. ¿Se adopta la sección **Non-Goals / ADR** en `ROADMAP.md`?
5. ¿Los dos horizontes propuestos coinciden con los del responsable, o se ajustan?

---

*Documento de decisión. No se modificó código ni configuración del proyecto.*
