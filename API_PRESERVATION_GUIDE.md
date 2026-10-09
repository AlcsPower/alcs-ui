# Cómo mantener la API pública durante la migración

Este documento explica en detalle cómo migrar la estructura sin romper los imports de los consumidores de la librería.

---

## El Principio Fundamental

La API pública de `@alcspower/ui` es lo que se exporta desde `src/index.ts`.

Los consumidores escriben:
```ts
import { Button, Input, Dialog, Card } from '@alcspower/ui';
```

**El path interno no debe importar.** Pueden estar donde sea dentro de `src/components/`, siempre y cuando `src/index.ts` los re-exporte.

---

## Antes de la migración

### Estado actual (Ejemplo simplificado)

```
src/
├── components/
│   ├── button/
│   │   ├── button.tsx
│   │   ├── button.test.tsx
│   │   ├── button.stories.tsx
│   │   └── index.ts
│   ├── input/
│   ├── dialog/
│   ├── card/
│   ├── chart/
│   └── index.ts (re-exporta todo)
└── index.ts (re-exporta desde components/)
```

### `src/index.ts` actual

```ts
// Antes
export * from './components/button';
export * from './components/input';
export * from './components/dialog';
export * from './components/card';
export * from './components/chart';
```

### `src/components/index.ts` actual

```ts
export * from './button';
export * from './components/input';
export * from './components/dialog';
export * from './components/card';
export * from './components/chart';
```

---

## Durante la migración: Estrategia sin rupturas

### Paso 1: Crear estructura nueva (sin borrar la antigua aún)

```
src/components/
├── button/           ← existente
├── input/            ← existente
├── dialog/           ← existente
├── card/             ← existente
├── chart/            ← existente
│
├── forms/            ← NUEVA (vacía)
├── overlays/         ← NUEVA (vacía)
├── data-display/     ← NUEVA (vacía)
└── index.ts          ← NO CAMBIAR AÚN
```

### Paso 2: Mover componentes gradualmente

**En esta fase, se mueve físicamente un componente, pero se re-exporta del lugar antiguo.**

Ejemplo: mover `button/` a `forms/button/`

```
src/components/
├── button/           ← AHORA ES UN REDIRECT
│   └── index.ts      ← Re-exporta desde forms
├── forms/            ← NUEVA UBICACIÓN
│   ├── button/
│   │   ├── button.tsx
│   │   ├── button.test.tsx
│   │   ├── button.stories.tsx
│   │   └── index.ts
│   └── index.ts
└── index.ts          ← No cambia
```

### Paso 3: Crear redirecciones en el lugar antiguo

**`src/components/button/index.ts`** (ahora es un redirect):

```ts
// src/components/button/index.ts
// Este archivo es un "redirect" transitorio
// Para mantener la compatibilidad de imports internos

export * from '../forms/button';
export type * from '../forms/button';
```

### Paso 4: Mantener `src/components/index.ts` igual

```ts
// src/components/index.ts - NO CAMBIA
export * from './button';
export * from './input';
export * from './dialog';
export * from './card';
export * from './chart';
```

### Paso 5: Mantener `src/index.ts` igual

```ts
// src/index.ts - NO CAMBIA
export * from './components';
```

---

## Resultado: Cero rupturas para consumidores

El consumidor sigue escribiendo lo mismo:

```ts
import { Button, Input, Dialog, Card } from '@alcspower/ui';
```

Y funciona igual, aunque internamente los archivos se movieron.

---

## Migración completa: Paso a paso

### Fase 1: Migrar `forms/`

**1. Mover archivos:**
```bash
mkdir -p src/components/forms
mv src/components/button src/components/forms/button
mv src/components/input src/components/forms/input
mv src/components/textarea src/components/forms/textarea
# ... etc
```

**2. Crear `src/components/forms/index.ts`:**
```ts
export * from './button';
export * from './input';
export * from './textarea';
export * from './label';
export * from './field';
export * from './radio-group';
export * from './slider';
export * from './toggle';
export * from './toggle-group';
export * from './checkbox';
export * from './switch';
export * from './select';
export * from './combobox';
```

**3. Crear redirecciones en lugar antiguo:**
```ts
// src/components/button/index.ts
export * from '../forms/button';
export type * from '../forms/button';
```

(Repetir para `input/`, `textarea/`, `label/`, `field/`, etc.)

**4. Dejar `src/components/index.ts` sin cambios:**
```ts
export * from './button';      // ← Sigue siendo ./button
export * from './input';       // ← Sigue siendo ./input
export * from './forms';       // ← Agregar esto para acceso directo
```

**5. Dejar `src/index.ts` sin cambios:**
```ts
export * from './components';
```

**6. Validar:**
```bash
pnpm typecheck
pnpm test
pnpm build
```

---

### Fase 2: Migrar `data-display/`

Repetir exactamente lo mismo, pero con:
- `badge`, `status-badge`, `card`, `avatar`, `table`, `data-table`, `pagination`, `separator`, `chart`, `metrics`

**1. Mover archivos:**
```bash
mkdir -p src/components/data-display
mv src/components/badge src/components/data-display/badge
# ... etc
```

**2. Crear redirecciones:**
```ts
// src/components/badge/index.ts
export * from '../data-display/badge';
export type * from '../data-display/badge';
```

**3. Agregar al index:**
```ts
// src/components/index.ts
export * from './badge';           // ← Sigue siendo ./badge
export * from './data-display';    // ← Acceso directo nuevo
```

---

### Fases 3-7: Repetir para cada grupo

- Fase 3: `time/` (calendar, date-picker, date-range-picker)
- Fase 4: `overlays/` (dialog, sheet, popover, tooltip, etc.)
- Fase 5: `feedback/` (alert, toast, skeleton, spinner, etc.)
- Fase 6: `navigation/` (breadcrumb, tabs, accordion, etc.)
- Fase 7: `accessibility/` (visually-hidden)

---

## Eliminar redirecciones después (Fase final)

Una vez que toda la migración está completa y funciona, puedes **opcionalmente** eliminar las carpetas antiguas.

Pero aquí hay dos opciones:

### Opción A: Mantener redirecciones (Recomendado)

```
src/components/
├── button/ (redirect)
├── input/ (redirect)
├── ... (todos los redirects)
├── forms/
├── overlays/
├── data-display/
├── ... (categorías nuevas)
└── index.ts
```

**Ventajas:**
- Cualquier import interno antiguo sigue funcionando
- Migración más segura
- Transición gradual para consumidores

**Desventajas:**
- El árbol tiene un poco de "clutter"

### Opción B: Eliminar redirecciones (Más limpio)

Una vez que todo esté migrado y funcionando:

```bash
rm -rf src/components/button
rm -rf src/components/input
# ... eliminar todos los redirects
```

Y luego actualizar `src/components/index.ts`:

```ts
// src/components/index.ts (versión final)
export * from './forms';
export * from './overlays';
export * from './data-display';
export * from './time';
export * from './feedback';
export * from './navigation';
export * from './accessibility';
```

Pero esto **requiere que verifiques que no hay imports internos que dependan de los paths antiguos**.

---

## ⚠️ Puntos críticos

### 1. No actualizar `src/index.ts` hasta el final

Durante la migración, mantén `src/index.ts` tal cual. Solo actualiza cuando toda la migración esté lista.

### 2. Verificar imports internos

Busca cualquier import que haga un componente de otro componente:

```bash
grep -r "from '\.\./button" src/components/
grep -r "from '\.\./input" src/components/
```

Si un componente en `forms/` importa de otro componente en `forms/`, asegúrate que el path sea relativo correcto.

Ejemplo:

```ts
// src/components/forms/form-field/form-field.tsx
import { Input } from '../input';  // ✅ Correcto
import { Input } from '../../input';  // ❌ Incorrecto (si input se movió a forms/)
```

### 3. Validar después de cada fase

```bash
pnpm typecheck  # Detecta imports rotos
pnpm test       # Detecta dependencias rotas
pnpm build      # Detecta exports rotos
```

### 4. No confundir imports de consumidor con imports internos

**Consumidor (estos no cambian):**
```ts
import { Button } from '@alcspower/ui';
```

**Interno (estos sí pueden cambiar):**
```ts
import { Button } from '../button';
```

La API pública permanece igual. Solo cambian los paths internos.

---

## Checklist completo de migración

### Antes de iniciar
- [ ] Branch de feature/refactor creado
- [ ] Commit de punto de control hecho

### Durante cada fase
- [ ] Archivos movidos a carpeta nueva
- [ ] `index.ts` de categoría creado
- [ ] Redirecciones creadas en lugar antiguo
- [ ] `src/components/index.ts` actualizado
- [ ] `pnpm typecheck` pasa ✓
- [ ] `pnpm test` pasa ✓
- [ ] `pnpm build` pasa ✓
- [ ] Storybook funciona ✓

### Al finalizar toda la migración
- [ ] Todas las fases completadas
- [ ] Tests pasan 100%
- [ ] Build pasa sin warnings
- [ ] Todos los imports resueltos
- [ ] PR creado y revisado
- [ ] Decidir: ¿mantener o eliminar redirecciones?
- [ ] Mergear a main
- [ ] Nueva versión publicada (minor bump)

---

## Resumen

**La clave es simple:**
1. Mover archivos físicamente
2. Re-exportar desde lugar nuevo
3. Redirigir desde lugar antiguo
4. Mantener `src/index.ts` igual
5. Consumidores no ven cambio alguno

Eso es una migración sin rupturas.
