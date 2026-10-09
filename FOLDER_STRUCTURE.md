# Estructura final de carpetas para `src/`

Este documento define la estructura recomendada para escalar `@alcspower/ui` sin fragmentar el repo ni crear categorías vacías para el futuro. Está pensada para ser implementada de manera gradual y segura.

## Visión general

```text
src/
├── components/
│   ├── forms/
│   │   ├── button/
│   │   ├── input/
│   │   ├── textarea/
│   │   ├── label/
│   │   ├── field/
│   │   ├── radio-group/
│   │   ├── slider/
│   │   ├── toggle/
│   │   ├── toggle-group/
│   │   ├── checkbox/
│   │   ├── switch/
│   │   ├── select/
│   │   ├── combobox/
│   │   ├── form-provider/
│   │   ├── form-field/
│   │   ├── search-input/
│   │   ├── password-input/
│   │   ├── otp-input/
│   │   ├── multi-select/
│   │   └── index.ts
│   │
│   ├── data-display/
│   │   ├── badge/
│   │   ├── status-badge/
│   │   ├── card/
│   │   ├── avatar/
│   │   ├── table/
│   │   ├── data-table/
│   │   ├── pagination/
│   │   ├── separator/
│   │   ├── chart/
│   │   ├── metrics/
│   │   ├── sparkline/
│   │   ├── gauge/
│   │   ├── heatmap/
│   │   └── index.ts
│   │
│   ├── time/
│   │   ├── calendar/
│   │   ├── date-picker/
│   │   ├── date-range-picker/
│   │   ├── time-picker/
│   │   ├── time-range-picker/
│   │   └── index.ts
│   │
│   ├── overlays/
│   │   ├── dialog/
│   │   ├── sheet/
│   │   ├── drawer/
│   │   ├── popover/
│   │   ├── tooltip/
│   │   ├── dropdown-menu/
│   │   ├── context-menu/
│   │   ├── command/
│   │   ├── confirm-dialog/
│   │   ├── alert-dialog/
│   │   └── index.ts
│   │
│   ├── feedback/
│   │   ├── alert/
│   │   ├── toast/
│   │   ├── skeleton/
│   │   ├── spinner/
│   │   ├── loading-overlay/
│   │   ├── empty-state/
│   │   ├── error-state/
│   │   ├── progress/
│   │   ├── notification-center/
│   │   ├── status-indicator/
│   │   └── index.ts
│   │
│   ├── navigation/
│   │   ├── breadcrumb/
│   │   ├── tabs/
│   │   ├── accordion/
│   │   ├── collapsible/
│   │   ├── stepper/
│   │   ├── sidebar/
│   │   ├── navbar/
│   │   └── index.ts
│   │
│   ├── accessibility/
│   │   ├── visually-hidden/
│   │   ├── kbd/
│   │   └── index.ts
│   │
│   ├── index.ts
│   └── README.md (opcional)
│
├── lib/
│   ├── security/
│   │   ├── sanitizers.ts
│   │   ├── validators.ts
│   │   ├── file-validators.ts
│   │   ├── password-strength.ts
│   │   ├── escape-html.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── use-clipboard.ts
│   │   ├── use-async-state.ts
│   │   ├── use-debounce.ts
│   │   ├── use-previous.ts
│   │   └── index.ts
│   ├── constants/
│   │   ├── allowed-tags.ts
│   │   ├── file-types.ts
│   │   ├── sizes.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── forms.ts
│   │   ├── data-table.ts
│   │   ├── media.ts
│   │   └── index.ts
│   ├── utils.ts
│   ├── tw-merge-config.ts
│   └── index.ts
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

## Mapeo de componentes actuales a la nueva estructura

### `components/forms/`
- `button`
- `input`
- `textarea`
- `label`
- `field`
- `radio-group`
- `slider`
- `toggle`
- `toggle-group`
- `checkbox`
- `switch`
- `select`
- `combobox`
- `form-provider` (nueva)
- `form-field` (nueva)
- `search-input` (nueva)
- `password-input` (nueva)
- `otp-input` (nueva)
- `multi-select` (nueva)

### `components/data-display/`
- `badge`
- `status-badge`
- `card`
- `avatar`
- `table`
- `data-table`
- `pagination`
- `separator`
- `chart`
- `metrics`
- `sparkline` (nueva)
- `gauge` (nueva)
- `heatmap` (nueva)

### `components/time/`
- `calendar`
- `date-picker`
- `date-range-picker`
- `time-picker` (nueva)
- `time-range-picker` (nueva)

### `components/overlays/`
- `dialog`
- `sheet`
- `drawer`
- `popover`
- `tooltip`
- `dropdown-menu`
- `context-menu`
- `command`
- `confirm-dialog` (nueva)
- `alert-dialog` (nueva)

### `components/feedback/`
- `alert`
- `toast`
- `skeleton`
- `spinner`
- `loading-overlay`
- `empty-state`
- `error-state`
- `progress`
- `notification-center` (nueva)
- `status-indicator` (nueva)

### `components/navigation/`
- `breadcrumb`
- `tabs`
- `accordion`
- `collapsible`
- `stepper` (nueva)
- `sidebar` (nueva)
- `navbar` (nueva)

### `components/accessibility/`
- `visually-hidden`
- `kbd` (nueva)

---

## Reglas de migración

1. No mover archivos “al azar”. Se mueve por categoría funcional.
2. Mantener el nombre del componente y sus exports tal cual.
3. Cada carpeta interna queda con `index.ts` para exportar el componente.
4. Los imports globales deben mantenerse a través del entrypoint `src/index.ts`.
5. Se recomienda hacer la migración por bloques de categorías, no por archivo individual.

---

## `src/index.ts` final recomendado

```ts
// Utilidades base
export * from './lib/utils';
export * from './lib/tw-merge-config';
export * from './lib/security';
export * from './lib/hooks';
export * from './lib/constants';
export * from './lib/types';

// Accesibilidad
export * from './components/accessibility';

// Formularios
export * from './components/forms';

// Visualización y datos
export * from './components/data-display';

// Fechas y tiempo
export * from './components/time';

// Overlays
export * from './components/overlays';

// Feedback
export * from './components/feedback';

// Navegación
export * from './components/navigation';
```

---

## Principios de diseño que esta estructura respeta

- Mínima ambigüedad semántica
- No crea carpetas vacías por hipotéticas versiones futuras
- Agrupa por propósito real del componente
- Reduce fricción cognitiva para contributors
- Es compatible con el roadmap del proyecto
- Escala bien con 50, 80 o 100 componentes

---

## Recomendación final

Esta estructura debe implementarse de forma incremental, no a la vez con un gran rewrite. La idea es migrar categorías completas en PRs pequeñas, preservando la API pública del paquete y evitando rupturas de import.
