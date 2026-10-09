# Prompt para Migración de Estructura de Carpetas — PR 3: Time + Overlays

## Contexto

Estoy migrando la estructura de `@alcspower/ui` de una organización plana a una organización semántica por categorías funcionales.

Este es el **PR 3 de 7 bloques de migración**.

Objetivo de este PR: reorganizar los componentes temporales y overlays a `src/components/time/` y `src/components/overlays/` sin romper la API pública.

## Documentación de referencia

Antes de hacer cualquier cambio, lee estos archivos en el repo:
- `FOLDER_STRUCTURE.md` — estructura final deseada
- `MIGRATION_GUIDE.md` — orden y fases de migración
- `API_PRESERVATION_GUIDE.md` — cómo no romper la API pública durante la migración
- `src/README.md` — descripción de cada categoría

## Componentes a migrar en este PR

### Bloque `time` (3 componentes)
1. `calendar`
2. `date-picker`
3. `date-range-picker`

### Bloque `overlays` (8 componentes)
1. `dialog`
2. `sheet`
3. `drawer`
4. `popover`
5. `tooltip`
6. `dropdown-menu`
7. `context-menu`
8. `command`

## Estructura final objetivo

```text
src/components/
├── time/
│   ├── calendar/
│   ├── date-picker/
│   ├── date-range-picker/
│   └── index.ts
│
├── overlays/
│   ├── dialog/
│   ├── sheet/
│   ├── drawer/
│   ├── popover/
│   ├── tooltip/
│   ├── dropdown-menu/
│   ├── context-menu/
│   ├── command/
│   └── index.ts
```

## Patrón técnico exacto a seguir

### Para cada componente (ej: dialog):

**Paso 1: Mover el archivo real**
- Mover la carpeta completa: `src/components/dialog/` → `src/components/overlays/dialog/`
- Incluir: `.tsx`, `.test.tsx`, `.stories.tsx`, `index.ts`

**Paso 2: Crear redirección en lugar antiguo**
- Crear `src/components/dialog/index.ts` con:
```ts
// src/components/dialog/index.ts
export * from '../overlays/dialog';
export type * from '../overlays/dialog';
```

**Paso 3: No tocar la implementación**
- El contenido de `dialog.tsx`, `dialog.test.tsx`, etc. **no debe cambiar**
- Solo se reorganiza la ubicación del archivo

### Crear archivo de categoría

Crear `src/components/time/index.ts`:
```ts
export * from './calendar';
export * from './date-picker';
export * from './date-range-picker';
```

Crear `src/components/overlays/index.ts`:
```ts
export * from './dialog';
export * from './sheet';
export * from './drawer';
export * from './popover';
export * from './tooltip';
export * from './dropdown-menu';
export * from './context-menu';
export * from './command';
```

### Actualizar `src/components/index.ts`

Mantener compatibilidad temporal y acceso directo a las categorías nuevas:
```ts
// Mantener re-exports antiguos para compatibilidad
export * from './calendar';
export * from './date-picker';
export * from './date-range-picker';
export * from './dialog';
export * from './sheet';
export * from './drawer';
export * from './popover';
export * from './tooltip';
export * from './dropdown-menu';
export * from './context-menu';
export * from './command';

// Agregar acceso directo a las categorías nuevas
export * from './time';
export * from './overlays';
```

## NO cambiar

- ❌ NO modificar `src/index.ts` global
- ❌ NO cambiar la API pública (los consumidores siguen importando igual)
- ❌ NO alterar el contenido funcional de los componentes
- ❌ NO eliminar redirecciones temporales en este PR

## Validación obligatoria

Después de completar la migración, ejecutar:

```bash
pnpm typecheck
pnpm test
pnpm build
```

Si falla cualquier comando, investigar y corregir antes de abrir el PR.

## Regla de revisión

El PR debe verse como **reorganización interna pura**:
- Cambios de estructura de carpetas
- Creación de redirecciones
- Actualización de exports
- Cero cambios en comportamiento funcional
- Cero cambios en API pública visible

## Archivos que se crean/modifican

**Crear:**
- `src/components/time/` (carpeta)
- `src/components/time/index.ts`
- `src/components/overlays/` (carpeta)
- `src/components/overlays/index.ts`
- `src/components/calendar/index.ts` (redirección)
- `src/components/date-picker/index.ts` (redirección)
- `src/components/date-range-picker/index.ts` (redirección)
- `src/components/dialog/index.ts` (redirección)
- `src/components/sheet/index.ts` (redirección)
- `src/components/drawer/index.ts` (redirección)
- `src/components/popover/index.ts` (redirección)
- `src/components/tooltip/index.ts` (redirección)
- `src/components/dropdown-menu/index.ts` (redirección)
- `src/components/context-menu/index.ts` (redirección)
- `src/components/command/index.ts` (redirección)

**Modificar:**
- `src/components/index.ts` (agregar acceso directo a time y overlays)

**Mover (sin cambios internos):**
- Los 3 componentes de time y 8 overlays del árbol actual → sus nuevas ubicaciones

## Regla de éxito

Este PR habrá terminado correctamente cuando:

- ✅ Los 3 componentes de time estén en `src/components/time/{nombre}/`
- ✅ Los 8 overlays estén en `src/components/overlays/{nombre}/`
- ✅ Las redirecciones existan en los lugares antiguos
- ✅ `pnpm typecheck` pase sin errores
- ✅ `pnpm test` pase 100%
- ✅ `pnpm build` funcione sin warnings
- ✅ Un consumer siga importando igual: `import { Calendar, DatePicker, Dialog, Popover } from '@alcspower/ui'`
- ✅ No hay cambios en la API pública visible

## Orden recomendado de migración

Para evitar bloqueos de dependencias, migrar en este orden:

### `time`
1. `calendar`
2. `date-picker`
3. `date-range-picker`

### `overlays`
1. `dialog`
2. `popover`
3. `tooltip`
4. `dropdown-menu`
5. `context-menu`
6. `sheet`
7. `drawer`
8. `command`

## Checklist antes de abrir PR

- [ ] Crear rama `refactor/reorganize-time-overlays`
- [ ] Crear carpetas `src/components/time/` y `src/components/overlays/`
- [ ] Mover los 11 componentes a sus ubicaciones nuevas
- [ ] Crear `src/components/time/index.ts` y `src/components/overlays/index.ts`
- [ ] Crear redirecciones en cada ruta antigua
- [ ] Actualizar `src/components/index.ts`
- [ ] Ejecutar `pnpm typecheck` → debe pasar
- [ ] Ejecutar `pnpm test` → debe pasar 100%
- [ ] Ejecutar `pnpm build` → debe pasar sin warnings
- [ ] Verificar que Storybook aún funciona (opcional pero recomendado)
- [ ] Abrir PR con título: `refactor: reorganize time and overlays to grouped folders`

## Notas finales

- Este PR es **solo reorganización interna**, no una refactorización funcional
- Si algo no funciona, revisa que los paths relativos sean correctos
- Si hay un componente que importa de otro dentro de `time/` o `overlays/`, ajusta el path relativo
- Después de mergear, NO eliminar redirecciones (eso es para un PR futuro)

---

**Siguiente paso:** después de completar este PR 3, vendrá PR 4 con `feedback/` siguiendo el mismo patrón.
