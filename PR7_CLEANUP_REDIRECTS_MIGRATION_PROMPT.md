# Prompt para Migración de Estructura de Carpetas — PR 7: Eliminar Redirecciones Transicionales

## Contexto

Estoy migrando la estructura de `@alcspower/ui` de una organización plana a una organización semántica por categorías funcionales.

Este es el **PR 7 de 7 bloques de migración (FINAL)**.

Objetivo de este PR: eliminar las carpetas antiguas y redirecciones transicionales ahora que toda la estructura nueva está estable y validada.

## Documentación de referencia

Antes de hacer cualquier cambio, lee estos archivos en el repo:
- `FOLDER_STRUCTURE.md` — estructura final deseada
- `MIGRATION_GUIDE.md` — orden y fases de migración
- `API_PRESERVATION_GUIDE.md` — cómo no romper la API pública durante la migración
- `src/README.md` — descripción de cada categoría

## Estado actual tras PR 1-6

La estructura completa está reorganizada:
- ✅ Todas las categorías en su lugar: `forms/`, `data-display/`, `time/`, `overlays/`, `feedback/`, `navigation/`, `accessibility/`
- ✅ Todas las redirecciones transicionales activas en rutas antiguas
- ✅ Exportaciones públicas finalizadas y claras
- ✅ API pública 100% estable
- ✅ Todas las validaciones (typecheck, test, build) pasando

## Objetivo de este PR

Eliminar las carpetas antiguas que ahora solo sirven como redirecciones, limpiando el árbol del repositorio.

Esto es **seguro** porque:
- La API pública exporta directamente desde las nuevas ubicaciones
- No hay consumidores importando desde rutas antiguas (eso ya se redirigía)
- La validación completa de PR 1-6 garantiza que nada se rompió

## Componentes a eliminar (50 rutas antiguas)

### Eliminaciones de `src/components/`

Eliminar estas carpetas que ahora son solo redirecciones:

**Forms (13):**
- `src/components/button/`
- `src/components/input/`
- `src/components/textarea/`
- `src/components/label/`
- `src/components/field/`
- `src/components/radio-group/`
- `src/components/slider/`
- `src/components/toggle/`
- `src/components/toggle-group/`
- `src/components/checkbox/`
- `src/components/switch/`
- `src/components/select/`
- `src/components/combobox/`

**Data Display (10):**
- `src/components/badge/`
- `src/components/status-badge/`
- `src/components/card/`
- `src/components/avatar/`
- `src/components/table/`
- `src/components/data-table/`
- `src/components/pagination/`
- `src/components/separator/`
- `src/components/chart/`
- `src/components/metrics/`

**Time (3):**
- `src/components/calendar/`
- `src/components/date-picker/`
- `src/components/date-range-picker/`

**Overlays (8):**
- `src/components/dialog/`
- `src/components/sheet/`
- `src/components/drawer/`
- `src/components/popover/`
- `src/components/tooltip/`
- `src/components/dropdown-menu/`
- `src/components/context-menu/`
- `src/components/command/`

**Feedback (8):**
- `src/components/alert/`
- `src/components/toast/`
- `src/components/skeleton/`
- `src/components/spinner/`
- `src/components/loading-overlay/`
- `src/components/empty-state/`
- `src/components/error-state/`
- `src/components/progress/`

**Navigation (6):**
- `src/components/breadcrumb/`
- `src/components/tabs/`
- `src/components/accordion/`
- `src/components/collapsible/`
- `src/components/separator/` (nota: hay 2 separadores, ambos redundantes ahora)
- `src/components/pagination/` (nota: hay 2 paginaciones, ambas redundantes ahora)

**Accessibility (1):**
- `src/components/visually-hidden/`

## Estado final de `src/components/`

Después de la eliminación, solo quedarán:

```text
src/components/
├── forms/
├── data-display/
├── time/
├── overlays/
├── feedback/
├── navigation/
├── accessibility/
└── index.ts
```

Y `src/components/index.ts` quedará limpio:

```ts
// Acceso directo a categorías
export * from './accessibility';
export * from './forms';
export * from './data-display';
export * from './time';
export * from './overlays';
export * from './feedback';
export * from './navigation';
```

## Validación CRÍTICA antes de eliminar

Este PR es **la única fase donde cosas PUEDEN romperse** si no se valida correctamente.

**Antes de eliminar cualquier carpeta antigua:**

1. Buscar cualquier import directo de rutas antiguas en todo el repo:
```bash
grep -r "from '.*components/button" src/ --include="*.ts" --include="*.tsx"
grep -r "from \".*components/button" src/ --include="*.ts" --include="*.tsx"
```

2. Buscar en carpetas antiguas referencias internas que apunten a otras carpetas antiguas
3. Verificar que TODOS los imports internos usen rutas relativas dentro de las nuevas categorías

Si finds algún import que apunta a ruta antigua, **DETENER y no continuar**.

## Validación obligatoria

Después de eliminar las carpetas antiguas, ejecutar:

```bash
pnpm typecheck
pnpm test
pnpm build
```

Si falla CUALQUIER comando:
- NO mergear
- Restaurar las carpetas eliminadas
- Investigar qué se rompió
- Arreglarlo antes de intentar de nuevo

## Regla de revisión

El PR debe verse como **limpieza de código interno**:
- Eliminación de redirecciones transicionales
- Limpieza del árbol de carpetas
- Cero cambios en la API visible
- Cero cambios en el comportamiento funcional
- Cero cambios en los archivos que permanecen

## Archivos que se eliminan

**Eliminar (50 carpetas totales):**
- Todas las carpetas antiguas listadas arriba con sus contenidos completos

**Modificar:**
- `src/components/index.ts` (si lo dejaste con re-exports antiguos, limpiar a acceso directo por categoría)

## Regla de éxito

Este PR habrá terminado correctamente cuando:

- ✅ Todas las 50 carpetas antiguas eliminadas
- ✅ No existen referencias a rutas antiguas en el código
- ✅ `pnpm typecheck` pase sin errores
- ✅ `pnpm test` pase 100%
- ✅ `pnpm build` funcione sin warnings
- ✅ Un consumer sigue importando igual: `import { Button, Dialog, Card } from '@alcspower/ui'`
- ✅ No hay cambios en la API pública visible
- ✅ El árbol de `src/components/` está limpio y organizado

## Checklist antes de abrir PR

- [ ] Crear rama `refactor/cleanup-transitional-redirects`
- [ ] Ejecutar búsquedas de imports a rutas antiguas → 0 resultados
- [ ] Eliminar las 50 carpetas antiguas
- [ ] Actualizar `src/components/index.ts` si es necesario
- [ ] Ejecutar `pnpm typecheck` → debe pasar
- [ ] Ejecutar `pnpm test` → debe pasar 100%
- [ ] Ejecutar `pnpm build` → debe pasar sin warnings
- [ ] Verificar que Storybook aún funciona
- [ ] Abrir PR con título: `refactor: cleanup transitional redirects and legacy folder structure`

## Notas finales

- Este es el **único PR donde se elimina código**
- No es PR donde se cambia funcionalidad
- Es **limpieza final** después de 6 PRs de migración segura
- Si algo falla, restaurar y revisar antes de intentar de nuevo

---

**Siguiente paso:** finalización completa de la migración.

Ahora el repo tendrá:
- ✅ Estructura nueva y clara
- ✅ Componentes organizados semánticamente
- ✅ API pública estable
- ✅ Cero redirecciones internas
- ✅ Árbol limpio sin carpetas legacy

La migración estará **100% completa**.
