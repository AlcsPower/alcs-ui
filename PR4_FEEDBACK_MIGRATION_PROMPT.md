# Prompt para Migración de Estructura de Carpetas — PR 4: Feedback

## Contexto

Estoy migrando la estructura de `@alcspower/ui` de una organización plana a una organización semántica por categorías funcionales.

Este es el **PR 4 de 7 bloques de migración**.

Objetivo de este PR: reorganizar todos los componentes de retroalimentación y estados a `src/components/feedback/` sin romper la API pública.

## Documentación de referencia

Antes de hacer cualquier cambio, lee estos archivos en el repo:
- `FOLDER_STRUCTURE.md` — estructura final deseada
- `MIGRATION_GUIDE.md` — orden y fases de migración
- `API_PRESERVATION_GUIDE.md` — cómo no romper la API pública durante la migración
- `src/README.md` — descripción de cada categoría

## Componentes a migrar en este PR

Estos 8 componentes deben moverse de `src/components/{nombre}/` a `src/components/feedback/{nombre}/`:

1. `alert`
2. `toast`
3. `skeleton`
4. `spinner`
5. `loading-overlay`
6. `empty-state`
7. `error-state`
8. `progress`

## Estructura final objetivo

```text
src/components/
├── feedback/
│   ├── alert/
│   ├── toast/
│   ├── skeleton/
│   ├── spinner/
│   ├── loading-overlay/
│   ├── empty-state/
│   ├── error-state/
│   ├── progress/
│   └── index.ts
```

## Patrón técnico exacto a seguir

### Para cada componente (ej: alert):

**Paso 1: Mover el archivo real**
- Mover la carpeta completa: `src/components/alert/` → `src/components/feedback/alert/`
- Incluir: `.tsx`, `.test.tsx`, `.stories.tsx`, `index.ts`

**Paso 2: Crear redirección en lugar antiguo**
- Crear `src/components/alert/index.ts` con:
```ts
// src/components/alert/index.ts
export * from '../feedback/alert';
export type * from '../feedback/alert';
```

**Paso 3: No tocar la implementación**
- El contenido de `alert.tsx`, `alert.test.tsx`, etc. **no debe cambiar**
- Solo se reorganiza la ubicación del archivo

### Crear archivo de categoría

Crear `src/components/feedback/index.ts`:
```ts
export * from './alert';
export * from './toast';
export * from './skeleton';
export * from './spinner';
export * from './loading-overlay';
export * from './empty-state';
export * from './error-state';
export * from './progress';
```

### Actualizar `src/components/index.ts`

Mantener compatibilidad temporal y acceso directo a la categoría nueva:
```ts
// Mantener re-exports antiguos para compatibilidad
export * from './alert';
export * from './toast';
export * from './skeleton';
export * from './spinner';
export * from './loading-overlay';
export * from './empty-state';
export * from './error-state';
export * from './progress';

// Agregar acceso directo a la categoría nueva
export * from './feedback';
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
- `src/components/feedback/` (carpeta)
- `src/components/feedback/index.ts`
- `src/components/alert/index.ts` (redirección)
- `src/components/toast/index.ts` (redirección)
- `src/components/skeleton/index.ts` (redirección)
- `src/components/spinner/index.ts` (redirección)
- `src/components/loading-overlay/index.ts` (redirección)
- `src/components/empty-state/index.ts` (redirección)
- `src/components/error-state/index.ts` (redirección)
- `src/components/progress/index.ts` (redirección)

**Modificar:**
- `src/components/index.ts` (agregar acceso directo a feedback)

**Mover (sin cambios internos):**
- Los 8 componentes del árbol actual → `src/components/feedback/{nombre}/`

## Regla de éxito

Este PR habrá terminado correctamente cuando:

- ✅ Los 8 componentes estén en `src/components/feedback/{nombre}/`
- ✅ Las redirecciones existan en los lugares antiguos
- ✅ `pnpm typecheck` pase sin errores
- ✅ `pnpm test` pase 100%
- ✅ `pnpm build` funcione sin warnings
- ✅ Un consumer siga importando igual: `import { Alert, Toast, Spinner, Progress } from '@alcspower/ui'`
- ✅ No hay cambios en la API pública visible

## Orden recomendado de migración

Para evitar bloqueos de dependencias, migrar en este orden:

1. `alert`
2. `progress`
3. `spinner`
4. `skeleton`
5. `loading-overlay`
6. `empty-state`
7. `error-state`
8. `toast`

## Checklist antes de abrir PR

- [ ] Crear rama `refactor/reorganize-feedback`
- [ ] Crear carpeta `src/components/feedback/`
- [ ] Mover los 8 componentes a `src/components/feedback/{nombre}/`
- [ ] Crear `src/components/feedback/index.ts` con todos los exports
- [ ] Crear redirecciones en cada `src/components/{nombre}/index.ts`
- [ ] Actualizar `src/components/index.ts`
- [ ] Ejecutar `pnpm typecheck` → debe pasar
- [ ] Ejecutar `pnpm test` → debe pasar 100%
- [ ] Ejecutar `pnpm build` → debe pasar sin warnings
- [ ] Verificar que Storybook aún funciona (opcional pero recomendado)
- [ ] Abrir PR con título: `refactor: reorganize feedback to src/components/feedback/`

## Notas finales

- Este PR es **solo reorganización interna**, no una refactorización funcional
- Si algo no funciona, revisa que los paths relativos sean correctos
- Si hay un componente que importa de otro dentro de `feedback/`, ajusta el path relativo
- Después de mergear, NO eliminar redirecciones (eso es para un PR futuro)

---

**Siguiente paso:** después de completar este PR 4, vendrá PR 5 con `navigation/` + `accessibility/` siguiendo el mismo patrón.
