# Prompt para Migración de Estructura de Carpetas — PR 6: Finalizar Exportaciones Públicas

## Contexto

Estoy migrando la estructura de `@alcspower/ui` de una organización plana a una organización semántica por categorías funcionales.

Este es el **PR 6 de 7 bloques de migración**.

Objetivo de este PR: reorganizar la exportación pública en `src/index.ts` para reflejar la nueva estructura categórica, manteniendo 100% de compatibilidad con consumidores.

## Documentación de referencia

Antes de hacer cualquier cambio, lee estos archivos en el repo:
- `FOLDER_STRUCTURE.md` — estructura final deseada
- `MIGRATION_GUIDE.md` — orden y fases de migración
- `API_PRESERVATION_GUIDE.md` — cómo no romper la API pública durante la migración
- `src/README.md` — descripción de cada categoría

## Estado actual tras PR 1-5

En este punto, la estructura interna ya está reorganizada:
- ✅ `src/components/forms/` — 13 componentes
- ✅ `src/components/data-display/` — 10 componentes
- ✅ `src/components/time/` — 3 componentes
- ✅ `src/components/overlays/` — 8 componentes
- ✅ `src/components/feedback/` — 8 componentes
- ✅ `src/components/navigation/` — 6 componentes
- ✅ `src/components/accessibility/` — 1 componente

Las redirecciones temporales en las rutas antiguas aún existen para compatibilidad.

## Objetivo de este PR

Dejar la exportación pública **clara, ordenada y reflejando la nueva estructura**, sin romper ningún import de consumidor.

## Estado actual de `src/index.ts`

Esperado tras PR 1-5 (con refs a algunas categorías):
```ts
export * from './components';
```

O si se reorganizó parcialmente:
```ts
export * from './lib/utils';
export * from './lib/tw-merge-config';

export * from './components/accessibility';
export * from './components/forms';
export * from './components/data-display';
export * from './components/time';
export * from './components/overlays';
export * from './components/feedback';
export * from './components/navigation';
```

## Estructura final objetivo de `src/index.ts`

```ts
// ============================================
// Utilidades base
// ============================================
export * from './lib/utils';
export * from './lib/tw-merge-config';
export * from './lib/security';
export * from './lib/hooks';
export * from './lib/constants';
export * from './lib/types';

// ============================================
// Componentes organizados por categoría
// ============================================

// Accesibilidad
export * from './components/accessibility';

// Formularios e inputs
export * from './components/forms';

// Visualización de datos
export * from './components/data-display';

// Fechas y tiempo
export * from './components/time';

// Overlays y capas flotantes
export * from './components/overlays';

// Retroalimentación y estados
export * from './components/feedback';

// Navegación y estructura
export * from './components/navigation';
```

## Estado final de `src/components/index.ts`

Debe reflejar todas las categorías con acceso tanto a re-exports antiguos (compatibilidad) como directos:

```ts
// ============================================
// Re-exports antiguos (compatibilidad transitoria)
// ============================================

// Forms (13 componentes)
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

// Data Display (10 componentes)
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

// Time (3 componentes)
export * from './calendar';
export * from './date-picker';
export * from './date-range-picker';

// Overlays (8 componentes)
export * from './dialog';
export * from './sheet';
export * from './drawer';
export * from './popover';
export * from './tooltip';
export * from './dropdown-menu';
export * from './context-menu';
export * from './command';

// Feedback (8 componentes)
export * from './alert';
export * from './toast';
export * from './skeleton';
export * from './spinner';
export * from './loading-overlay';
export * from './empty-state';
export * from './error-state';
export * from './progress';

// Navigation (6 componentes)
export * from './breadcrumb';
export * from './tabs';
export * from './accordion';
export * from './collapsible';
export * from './separator';
export * from './pagination';

// Accessibility (1 componente)
export * from './visually-hidden';

// ============================================
// Acceso directo a categorías
// ============================================
export * from './accessibility';
export * from './forms';
export * from './data-display';
export * from './time';
export * from './overlays';
export * from './feedback';
export * from './navigation';
```

## NO cambiar

- ❌ NO eliminar re-exports antiguos en este PR (eso va en PR 7)
- ❌ NO romper la API pública
- ❌ NO alterar implementaciones de componentes

## Validación obligatoria

Después de completar la reorganización de exports, ejecutar:

```bash
pnpm typecheck
pnpm test
pnpm build
```

Si falla cualquier comando, investigar y corregir antes de abrir el PR.

## Regla de revisión

El PR debe verse como **organización de exports públicos**:
- Reorganización clara de `src/index.ts`
- Comentarios explicativos añadidos
- Acceso directo a categorías
- Cero cambios en API visible
- Cero cambios en comportamiento funcional

## Archivos que se modifican

**Modificar:**
- `src/index.ts` (reorganizar y comentar exports)
- `src/components/index.ts` (puede mantener como está o reorganizar si es más claro)

## Regla de éxito

Este PR habrá terminado correctamente cuando:

- ✅ `src/index.ts` exporta todas las categorías de forma clara
- ✅ Los comentarios explican cada sección
- ✅ `pnpm typecheck` pase sin errores
- ✅ `pnpm test` pase 100%
- ✅ `pnpm build` funcione sin warnings
- ✅ Un consumer siga importando como siempre: `import { Button, Dialog, Card } from '@alcspower/ui'`
- ✅ También funciona importar por categoría: `import { Button, Input } from '@alcspower/ui'` (sigue igual)
- ✅ No hay cambios en la API pública visible

## Checklist antes de abrir PR

- [ ] Crear rama `refactor/finalize-public-exports`
- [ ] Reorganizar `src/index.ts` con estructura clara y comentarios
- [ ] Verificar que todas las categorías estén exportadas
- [ ] Ejecutar `pnpm typecheck` → debe pasar
- [ ] Ejecutar `pnpm test` → debe pasar 100%
- [ ] Ejecutar `pnpm build` → debe pasar sin warnings
- [ ] Verificar que Storybook aún funciona (opcional pero recomendado)
- [ ] Abrir PR con título: `refactor: finalize public exports with category organization`

## Notas finales

- Este PR es **puramente de claridad en exports**, no funcional
- Los re-exports antiguos siguen presentes para máxima compatibilidad
- Las redirecciones internas (en las rutas antiguas) siguen activas
- La siguiente fase (PR 7) será eliminar redirecciones cuando todo esté estable

---

**Siguiente paso:** después de completar este PR 6, vendrá PR 7 para limpiar redirecciones transicionales.
