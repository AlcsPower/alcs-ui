# Estructura recomendada de carpetas para `src/`

Esta estructura está diseñada para sostener el crecimiento de `@alcspower/ui` sin caer en una fragmentación excesiva ni en ambigüedad conceptual. Están organizados los componentes por propósito funcional real, no por intuición superficial.

## Visión general

```text
src/
├── components/
│   ├── forms/
│   ├── data-display/
│   ├── time/
│   ├── overlays/
│   ├── feedback/
│   ├── navigation/
│   ├── accessibility/
│   ├── index.ts
│   └── README.md (opcional)
│
├── lib/
│   ├── security/
│   ├── hooks/
│   ├── constants/
│   ├── types/
│   ├── utils.ts
│   ├── tw-merge-config.ts
│   └── index.ts (opcional)
│
├── styles/
│   ├── index.css
│   ├── tokens.css
│   ├── animations.css
│   └── README.md (opcional)
│
├── test-utils/
│   ├── setup.ts
│   ├── render.tsx
│   ├── mocks.ts
│   ├── fixtures.ts
│   └── index.ts
│
├── index.ts
└── README.md (opcional)
```

---

## 1) `components/forms/`

Agrupa todo lo que captura, valida y gestiona entrada de datos por parte del usuario.

```text
components/forms/
├── button/
│   ├── button.tsx
│   ├── button.test.tsx
│   ├── button.stories.tsx
│   └── index.ts
├── input/
├── textarea/
├── label/
├── field/
├── radio-group/
├── slider/
├── toggle/
├── toggle-group/
├── checkbox/
├── switch/
├── select/
├── combobox/
├── form-provider/
│   ├── form-provider.tsx
│   ├── form-context.ts
│   ├── use-form.ts
│   ├── form-provider.test.tsx
│   └── index.ts
├── form-field/
│   ├── form-field.tsx
│   ├── form-field.test.tsx
│   └── index.ts
├── search-input/
├── password-input/
├── otp-input/
├── multi-select/
├── index.ts
```

### ¿Por qué aquí?
- Todo lo relacionado con inputs, capturas y validación del usuario vive en el mismo lugar.
- Evita la dispersión de `button`, `input`, `textarea`, `select`, etc. por el árbol raíz de `components`.
- Encaja con la evolución del ROADMAP hacia formularios avanzados.

---

## 2) `components/data-display/`

Agrupa todos los elementos de presentación visual y visualización de datos, sin que sean controles interactivos.

```text
components/data-display/
├── badge/
├── status-badge/
├── card/
├── avatar/
├── table/
├── data-table/
├── pagination/
├── separator/
├── chart/
├── metrics/
├── sparkline/
├── gauge/
├── heatmap/
├── index.ts
```

### ¿Por qué aquí?
- `Badge`, `Card`, `Avatar` no son controles; son elementos de presentación.
- `Chart`, `MetricCard`, `Table`, `DataTable` pertenecen a la misma idea semántica: visualización estructurada de información.
- Elimina la ambigüedad de `controls/`, `charts/` y `metrics/` como categorías separadas.

---

## 3) `components/time/`

Agrupa selectores temporales y calendarios. Es la categoría natural para todos los componentes que trabajan con fechas y horas.

```text
components/time/
├── calendar/
├── date-picker/
├── date-range-picker/
├── time-picker/
├── time-range-picker/
├── index.ts
```

### ¿Por qué aquí?
- `Calendar` y `DatePicker` están fuertemente acoplados funcionalmente.
- Es más claro que todos los selectores temporales queden juntos.
- Permite crecer en el futuro sin dispersión por el árbol.

---

## 4) `components/overlays/`

Solo deben ir aquí los componentes que flotan sobre la UI mediante portales, z-index y superposición visual.

```text
components/overlays/
├── dialog/
├── sheet/
├── drawer/
├── popover/
├── tooltip/
├── dropdown-menu/
├── context-menu/
├── command/
├── confirm-dialog/
├── alert-dialog/
├── index.ts
```

### ¿Por qué aquí?
- `Dialog`, `Sheet`, `Drawer`, `Popover`, `DropdownMenu`, `Tooltip`, `ContextMenu` son overlays de verdad.
- `Alert` no pertenece aquí porque no flota, no tiene portal ni z-index modal.
- Mantiene una definición clara del concepto de overlay.

---

## 5) `components/feedback/`

Agrupa elementos de retroalimentación, estado visual y notificaciones.

```text
components/feedback/
├── alert/
├── toast/
├── skeleton/
├── spinner/
├── loading-overlay/
├── empty-state/
├── error-state/
├── progress/
├── notification-center/
├── status-indicator/
├── index.ts
```

### ¿Por qué aquí?
- `Alert`, `Toast`, `Progress`, `Skeleton`, `Spinner`, `LoadingOverlay` son feedback visual.
- No son overlays y no se montan sobre la couche de la vista como modales.
- Encaja con el patrón de estados `loading`, `error`, `empty`, `success`, `warning`.

---

## 6) `components/navigation/`

Agrupa componentes de estructura, navegación y revelación progresiva.

```text
components/navigation/
├── breadcrumb/
├── tabs/
├── accordion/
├── collapsible/
├── separator/
├── pagination/
├── stepper/
├── sidebar/
├── navbar/
├── index.ts
```

### ¿Por qué aquí?
- Los componentes que estructuran navegación, jerarquía visual e interacción progresiva deben agruparse.
- Mantiene una zona de consumo clara para dashboards, apps CRUD y portales corporativos.

---

## 7) `components/accessibility/`

Primitivas de soporte accesibilidad y UX complementaria.

```text
components/accessibility/
├── visually-hidden/
├── kbd/
├── index.ts
```

### ¿Por qué aquí?
- `VisuallyHidden` no es un control ni un feedback ni un overlay.
- `kbd` es una utilidad de accesibilidad y shortcuts, no un componente de navegación ni de formulario.

---

## 8) `lib/`

La organización de `lib/` es excelente y no necesita grandes cambios; de hecho debería mantenerse casi exactamente así.

```text
lib/
├── security/
│   ├── sanitizers.ts
│   ├── validators.ts
│   ├── file-validators.ts
│   ├── password-strength.ts
│   ├── escape-html.ts
│   └── index.ts
├── hooks/
│   ├── use-clipboard.ts
│   ├── use-async-state.ts
│   ├── use-debounce.ts
│   ├── use-previous.ts
│   └── index.ts
├── constants/
│   ├── allowed-tags.ts
│   ├── file-types.ts
│   ├── sizes.ts
│   └── index.ts
├── types/
│   ├── forms.ts
│   ├── data-table.ts
│   ├── media.ts
│   └── index.ts
├── utils.ts
├── tw-merge-config.ts
├── index.ts (opcional)
```

### ¿Por qué es clave?
- `security/` resuelve la base del `SECURITY.md` en código real.
- `hooks/` centraliza lógica reutilizable y evita custom hooks dispersos.
- `types/` evita tipos repetidos y mejora mantenibilidad.
- `constants/` almacena límites y valores reutilizables.

---

## 9) `test-utils/`

El crecimiento aquí también es excelente porque vuelve predecible la capa de pruebas.

```text
test-utils/
├── setup.ts
├── render.tsx
├── mocks.ts
├── fixtures.ts
├── index.ts
```

### ¿Por qué?
- `render.tsx` centraliza wrappers del provider global y theme.
- `mocks.ts` facilita mocks de API y data.
- `fixtures.ts` elimina data hardcodeada dispersa.
- `setup.ts` ya existe; se mantiene como base.

---

## 10) `src/index.ts`

Debe servir como entry point global, pero re-exportando categorías de forma ordenada.

```ts
// Utilidades base
export * from './lib/utils';
export * from './lib/tw-merge-config';
export * from './lib/security';
export * from './lib/hooks';
export * from './lib/constants';
export * from './lib/types';

// Accessibilidad
export * from './components/accessibility';

// Formularios
export * from './components/forms';

// Display / Data
export * from './components/data-display';

// Tiempo
export * from './components/time';

// Overlays
export * from './components/overlays';

// Feedback
export * from './components/feedback';

// Navegación
export * from './components/navigation';
```

Esto mantiene la API pública agradable y estable, aunque la organización interna se vuelva más madura.

---

## ✅ Por qué deberíamos cambiar la estructura actual

### 1. Mejor separación semántica
No se trata solo de ordenar carpetas; se trata de aclarar la intención del componente.

### 2. Menor fricción de mantenimiento
Cuando una librería llega a 50+, la estructura determina la velocidad de desarrollo.

### 3. Mejor UX para nuevos contributors
A un dev le debe resultar natural encontrar: inputs, overlays, feedback y data visuals.

### 4. Alineación con el roadmap
Tus hitos y futuras versiones están orientados a formularios avanzados, dashboards, data-heavy UI y navegación. Esta estructura lo respalda.

### 5. Reducir sobre-fragmentación sin perder claridad
No quieres 13 categorías casi vacías. 7 categorías base son más maduras y operan mejor.

---

## 🔧 Recomendación práctica

### Opción recomendada para tu repo actual
1. Mantener `components/` con estas 7 categorías base.
2. Mover gradualmente los componentes actuales.
3. Mantener `src/index.ts` estable como API pública.
4. No crear las carpetas de futuro `media/`, `search/`, `content/` hasta que realmente lleguen esos componentes.
5. Dejar `lib/` y `test-utils/` exactamente como están en la propuesta.

Esto da un balance perfecto entre madurez arquitectónica y control de complejidad.

---

## Conclusión

La gran diferencia entre una estructura joven y una estructura madura no es la cantidad de carpetas, sino la claridad del significado de cada una.

La propuesta de 7 categorías + `lib/` y `test-utils/` tiene ese equilibrio ideal:
- semántica clara
- baja fricción
- escalabilidad real
- preparación para el ROADMAP
- soporte para `SECURITY.md`
- orden y previsibilidad para el crecimiento del código

Si quieres, el próximo paso es dejarte una versión final de esta estructura ya lista para aplicar en el repo, con una migración realista de las carpetas actuales a la nueva organización. 