# Prompt para Migración de Estructura de Carpetas — PR 2: Data Display

## Contexto

Estoy migrando la estructura de `@alcspower/ui` de una organización plana a una organización semántica por categorías funcionales.

Este es el **PR 2 de 7 bloques de migración**.

Objetivo de este PR: reorganizar todos los componentes de visualización de datos y presentación a `src/components/data-display/` sin romper la API pública.

## Documentación de referencia

Antes de hacer cualquier cambio, lee estos archivos en el repo:
- `FOLDER_STRUCTURE.md` — estructura final deseada
- `MIGRATION_GUIDE.md` — orden y fases de migración
- `API_PRESERVATION_GUIDE.md` — cómo no romper la API pública durante la migración
- `src/README.md` — descripción de cada categoría

## Componentes a migrar en este PR

Estos 10 componentes deben moverse de `src/components/{nombre}/` a `src/components/data-display/{nombre}/`:

1. `badge`
2. `status-badge`
3. `card`
4. `avatar`
5. `table`
6. `data-table`
7. `pagination`
8. `separator`
9. `chart`
10. `metrics`

## Estructura final objetivo

```text
src/components/
├── data-display/
│   ├── badge/
│   ├── status-badge/
│   ├── card/
│   ├── avatar/
│   ├── table/
│   ├── data-table/
│   ├── pagination/
│   ├── separator/
│   ├── chart/
│   ├── metrics/
│   └── index.ts
```

## Patrón técnico exacto a seguir

### Para cada componente (ej: badge):

**Paso 1: Mover el archivo real**
- Mover la carpeta completa: `src/components/badge/` → `src/components/data-display/badge/`
- Incluir: `.tsx`, `.test.tsx`, `.stories.tsx`, `index.ts`

**Paso 2: Crear redirección en lugar antiguo**
- Crear `src/components/badge/index.ts` con:
```ts
// src/components/badge/index.ts
export * from '../data-display/badge';
export type * from '../data-display/badge';
```

**Paso 3: No tocar la implementación**
- El contenido de `badge.tsx`, `badge.test.tsx`, etc. **no debe cambiar**
- Solo se reorganiza la ubicación del archivo

### Crear archivo de categoría

Crear `src/components/data-display/index.ts`:
```ts
export * from './badge';
export * from './status-badge';
export * from './card';
export * from './avatar';
export * from './table';
export * from './data-table';
export * from './pagination';
export * from './separator';
export * from './chart';
export * from './metrics';
```

### Actualizar `src/components/index.ts`

Mantener compatibilidad temporal y acceso directo a la categoría nueva:
```ts
// Mantener re-exports antiguos para compatibilidad
export * from './badge';
export * from './status-badge';
export * from './card';
export * from './avatar';
export * from './table';
export * from './data-table';
export * from './pagination';
export * from './separator';
export * from './chart';
export * from './metrics';

// Agregar acceso directo a la categoría nueva
export * from './data-display';
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
- `src/components/data-display/` (carpeta)
- `src/components/data-display/index.ts`
- `src/components/badge/index.ts` (redirección)
- `src/components/status-badge/index.ts` (redirección)
- `src/components/card/index.ts` (redirección)
- `src/components/avatar/index.ts` (redirección)
- `src/components/table/index.ts` (redirección)
- `src/components/data-table/index.ts` (redirección)
- `src/components/pagination/index.ts` (redirección)
- `src/components/separator/index.ts` (redirección)
- `src/components/chart/index.ts` (redirección)
- `src/components/metrics/index.ts` (redirección)

**Modificar:**
- `src/components/index.ts` (agregar acceso directo a data-display)

**Mover (sin cambios internos):**
- Los 10 componentes del árbol actual → `src/components/data-display/{nombre}/`

## Regla de éxito

Este PR habrá terminado correctamente cuando:

- ✅ Los 10 componentes estén en `src/components/data-display/{nombre}/`
- ✅ Las redirecciones existan en los lugares antiguos
- ✅ `pnpm typecheck` pase sin errores
- ✅ `pnpm test` pase 100%
- ✅ `pnpm build` funcione sin warnings
- ✅ Un consumer siga importando igual: `import { Badge, Card, Table, Chart } from '@alcspower/ui'`
- ✅ No hay cambios en la API pública visible

## Orden recomendado de migración

Para evitar bloqueos de dependencias, migrar en este orden:

1. `badge`
2. `status-badge`
3. `card`
4. `avatar`
5. `separator`
6. `table`
7. `data-table`
8. `pagination`
9. `chart`
10. `metrics`

## Checklist antes de abrir PR

- [ ] Crear rama `refactor/reorganize-data-display`
- [ ] Crear carpeta `src/components/data-display/`
- [ ] Mover los 10 componentes a `src/components/data-display/{nombre}/`
- [ ] Crear `src/components/data-display/index.ts` con todos los exports
- [ ] Crear redirecciones en cada `src/components/{nombre}/index.ts`
- [ ] Actualizar `src/components/index.ts`
- [ ] Ejecutar `pnpm typecheck` → debe pasar
- [ ] Ejecutar `pnpm test` → debe pasar 100%
- [ ] Ejecutar `pnpm build` → debe pasar sin warnings
- [ ] Verificar que Storybook aún funciona (opcional pero recomendado)
- [ ] Abrir PR con título: `refactor: reorganize data-display to src/components/data-display/`

## Notas finales

- Este PR es **solo reorganización interna**, no una refactorización funcional
- Si algo no funciona, revisa que los paths relativos sean correctos
- Si hay un componente que importa de otro dentro de `data-display/`, ajusta el path relativo
- Después de mergear, NO eliminar redirecciones (eso es para un PR futuro)

---

**Siguiente paso:** después de completar este PR 2, vendrá PR 3 con `time/` + `overlays/` siguiendo el mismo patrón.
