# Guía de migración de estructura de carpetas `src/`

Este documento explica cómo pasar la estructura actual de `src/` a la nueva organización recomendada sin romper imports ni la API pública del paquete.

## Objetivo

Migrar de una estructura plana y dispersa:

```text
src/components/
├── button/
├── input/
├── textarea/
├── card/
├── table/
├── dialog/
├── chart/
├── ...
```

A una estructura funcional:

```text
src/components/
├── forms/
├── data-display/
├── time/
├── overlays/
├── feedback/
├── navigation/
├── accessibility/
```

Sin romper:
- la API pública de `@alcspower/ui`
- los imports de consumidores
- el build
- los tests

---

## Principio de migración

La migración se debe hacer por bloques semánticos, no por archivo suelto.

Ejemplo:
- mover primero `forms/`
- luego `data-display/`
- luego `time/`
- luego `overlays/`
- luego `feedback/`
- luego `navigation/`
- luego `accessibility/`

Esto reduce el riesgo y mantiene un flujo de cambios controlado.

---

## Fase 0: Preparación

### 1. Crear la estructura base
Crear estas carpetas nuevas en `src/components/`:

```text
src/components/
├── forms/
├── data-display/
├── time/
├── overlays/
├── feedback/
├── navigation/
├── accessibility/
├── index.ts
```

### 2. Mantener `src/index.ts` intacto durante la transición
Durante la migración, el `src/index.ts` global debe seguir re-exportando todo.

Solo al final se reorganiza la exportación global sin cambiar la API pública.

---

## Fase 1: Migración de `forms/`

### Componentes a mover
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

### Estructura objetivo

```text
src/components/forms/
├── button/
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
├── index.ts
```

### Qué no cambiar
- El nombre del componente: `Button`, `Input`, `Select`, etc.
- Su contenido funcional.
- Sus tests y stories.

### Qué sí cambiar
- Ruta física del archivo.
- `index.ts` de cada componente sigue exportando el mismo símbolo.

### Ajuste de import global
En `src/index.ts` queda igual desde la API pública: se exporta por categoría, no por path interno.

---

## Fase 2: Migración de `data-display/`

### Componentes a mover
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

### Estructura objetivo

```text
src/components/data-display/
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
├── index.ts
```

### Regla importante
No mover `Chart` a otra categoría. Su semántica es “visualización de información”, no input ni control.

---

## Fase 3: Migración de `time/`

### Componentes a mover
- `calendar`
- `date-picker`
- `date-range-picker`

### Estructura objetivo

```text
src/components/time/
├── calendar/
├── date-picker/
├── date-range-picker/
├── index.ts
```

### Importante
`DatePicker` y `Calendar` deben quedar juntos porque suelen tener una relación fuerte en implementación y tests.

---

## Fase 4: Migración de `overlays/`

### Componentes a mover
- `dialog`
- `sheet`
- `drawer`
- `popover`
- `tooltip`
- `dropdown-menu`
- `context-menu`
- `command`

### Estructura objetivo

```text
src/components/overlays/
├── dialog/
├── sheet/
├── drawer/
├── popover/
├── tooltip/
├── dropdown-menu/
├── context-menu/
├── command/
├── index.ts
```

### Regla importante
No mover `Alert` aquí. `Alert` debe ir a `feedback/`.

---

## Fase 5: Migración de `feedback/`

### Componentes a mover
- `alert`
- `toast`
- `skeleton`
- `spinner`
- `loading-overlay`
- `empty-state`
- `error-state`
- `progress`

### Estructura objetivo

```text
src/components/feedback/
├── alert/
├── toast/
├── skeleton/
├── spinner/
├── loading-overlay/
├── empty-state/
├── error-state/
├── progress/
├── index.ts
```

### Regla importante
Este bloque representa estados y mensajes, no overlays ni formularios.

---

## Fase 6: Migración de `navigation/`

### Componentes a mover
- `breadcrumb`
- `tabs`
- `accordion`
- `collapsible`
- `separator`
- `pagination` (si se decide mover a lo largo del proyecto)

### Estructura objetivo

```text
src/components/navigation/
├── breadcrumb/
├── tabs/
├── accordion/
├── collapsible/
├── separator/
├── pagination/
├── index.ts
```

### Nota
`pagination` puede mantenerse aquí por semántica de navegación, aunque también es razonable en `data-display/` según el estilo de cada equipo. Lo importante es la decisión y la consistencia.

---

## Fase 7: Migración de `accessibility/`

### Componentes a mover
- `visually-hidden`

### Estructura objetivo

```text
src/components/accessibility/
├── visually-hidden/
├── index.ts
```

### Futuro
- `kbd` entrará aquí cuando se implemente.

---

## Cómo no romper la API pública

### Patrón recomendado
Mantener la exportación global a través de `src/index.ts` sin depender del path filesystem.

Ejemplo de estrategia:

```ts
// Antes
export * from './components/button';
export * from './components/input';
export * from './components/dialog';

// Después
export * from './components/forms';
export * from './components/overlays';
export * from './components/data-display';
```

Esto hace que el consumidor no cambie nada, aunque la estructura interna sí cambie.

---

## Qué hacer con los `index.ts` internos

Cada carpeta de componente debe seguir exportando claramente su símbolo principal.

Ejemplo:

```ts
// src/components/forms/button/index.ts
export { Button } from './button';
export type { ButtonProps } from './button';
```

Esto mantiene compatibilidad con imports internos y con consumo futuro por subpaths.

---

## Validación de migración

Después de cada bloque migrado:

1. correr `pnpm typecheck`
2. correr `pnpm test`
3. correr `pnpm build`
4. revisar Storybook si aplica

### Checklist mínimo
- [ ] archivos movidos a la carpeta correcta
- [ ] imports internos corregidos
- [ ] `index.ts` actualizado
- [ ] `src/index.ts` re-export ajustado
- [ ] tests siguen pasando
- [ ] build sigue pasando

---

## Estrategia de PR recomendada

### PR 1 — `refactor: re-organize forms`
Mover y re-exportar `forms/`

### PR 2 — `refactor: re-organize data-display`
Mover y re-exportar `data-display/`

### PR 3 — `refactor: re-organize time + overlays`
Mover y re-exportar `time/` y `overlays/`

### PR 4 — `refactor: re-organize feedback + navigation + accessibility`
Mover y re-exportar los últimos grupos

Esto reduce el riesgo y facilita revisión por parte del equipo.

---

## Recomendación final

La migración debe hacerse por grupos funcionales, no por archivos sueltos, y manteniendo el entrypoint público estable.

Lo importante no es mover el árbol por el bien del árbol: lo importante es que el desarrollador pueda navegar el repositorio sin hacer inferencia mental.

---

## Resumen ejecutivo

- `forms/` para inputs y valores del usuario
- `data-display/` para presentación de datos
- `time/` para fechas y horas
- `overlays/` para portales flotantes
- `feedback/` para estado, mensajes y notificaciones
- `navigation/` para jerarquías y flujo
- `accessibility/` para utilidades de soporte

Esa es la organización que mejor escala con tu librería.
