# Prompt para Migración de Estructura de Carpetas — PR 5: Navigation + Accessibility

## Contexto

Estoy migrando la estructura de `@alcspower/ui` de una organización plana a una organización semántica por categorías funcionales.

Este es el **PR 5 de 7 bloques de migración**.

Objetivo de este PR: reorganizar los componentes de navegación y accesibilidad a `src/components/navigation/` y `src/components/accessibility/` sin romper la API pública.

## Documentación de referencia

Antes de hacer cualquier cambio, lee estos archivos en el repo:
- `FOLDER_STRUCTURE.md` — estructura final deseada
- `MIGRATION_GUIDE.md` — orden y fases de migración
- `API_PRESERVATION_GUIDE.md` — cómo no romper la API pública durante la migración
- `src/README.md` — descripción de cada categoría

## Componentes a migrar en este PR

### Bloque `navigation` (6 componentes)
1. `breadcrumb`
2. `tabs`
3. `accordion`
4. `collapsible`
5. `separator`
6. `pagination`

### Bloque `accessibility` (1 componente)
1. `visually-hidden`

## Estructura final objetivo

```text
src/components/
├── navigation/
│   ├── breadcrumb/
│   ├── tabs/
│   ├── accordion/
│   ├── collapsible/
│   ├── separator/
│   ├── pagination/
│   └── index.ts
│
├── accessibility/
│   ├── visually-hidden/
│   └── index.ts
```

## Patrón técnico exacto a seguir

### Para cada componente (ej: breadcrumb):

**Paso 1: Mover el archivo real**
- Mover la carpeta completa: `src/components/breadcrumb/` → `src/components/navigation/breadcrumb/`
- Incluir: `.tsx`, `.test.tsx`, `.stories.tsx`, `index.ts`

**Paso 2: Crear redirección en lugar antiguo**
- Crear `src/components/breadcrumb/index.ts` con:
```ts
// src/components/breadcrumb/index.ts
export * from '../navigation/breadcrumb';
export type * from '../navigation/breadcrumb';
```

**Paso 3: No tocar la implementación**
- El contenido de `breadcrumb.tsx`, `breadcrumb.test.tsx`, etc. **no debe cambiar**
- Solo se reorganiza la ubicación del archivo

### Crear archivo de categoría

Crear `src/components/navigation/index.ts`:
```ts
export * from './breadcrumb';
export * from './tabs';
export * from './accordion';
export * from './collapsible';
export * from './separator';
export * from './pagination';
```

Crear `src/components/accessibility/index.ts`:
```ts
export * from './visually-hidden';
```

### Actualizar `src/components/index.ts`

Mantener compatibilidad temporal y acceso directo a las categorías nuevas:
```ts
// Mantener re-exports antiguos para compatibilidad
export * from './breadcrumb';
export * from './tabs';
export * from './accordion';
export * from './collapsible';
export * from './separator';
export * from './pagination';
export * from './visually-hidden';

// Agregar acceso directo a las categorías nuevas
export * from './navigation';
export * from './accessibility';
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
- `src/components/navigation/` (carpeta)
- `src/components/navigation/index.ts`
- `src/components/accessibility/` (carpeta)
- `src/components/accessibility/index.ts`
- `src/components/breadcrumb/index.ts` (redirección)
- `src/components/tabs/index.ts` (redirección)
- `src/components/accordion/index.ts` (redirección)
- `src/components/collapsible/index.ts` (redirección)
- `src/components/separator/index.ts` (redirección)
- `src/components/pagination/index.ts` (redirección)
- `src/components/visually-hidden/index.ts` (redirección)

**Modificar:**
- `src/components/index.ts` (agregar acceso directo a navigation y accessibility)

**Mover (sin cambios internos):**
- Los 6 componentes de navigation y 1 de accessibility del árbol actual → sus nuevas ubicaciones

## Regla de éxito

Este PR habrá terminado correctamente cuando:

- ✅ Los 6 componentes de navigation estén en `src/components/navigation/{nombre}/`
- ✅ El 1 componente de accessibility esté en `src/components/accessibility/{nombre}/`
- ✅ Las redirecciones existan en los lugares antiguos
- ✅ `pnpm typecheck` pase sin errores
- ✅ `pnpm test` pase 100%
- ✅ `pnpm build` funcione sin warnings
- ✅ Un consumer siga importando igual: `import { Breadcrumb, Tabs, Pagination, VisuallyHidden } from '@alcspower/ui'`
- ✅ No hay cambios en la API pública visible

## Orden recomendado de migración

Para evitar bloqueos de dependencias, migrar en este orden:

### `navigation`
1. `separator`
2. `breadcrumb`
3. `tabs`
4. `accordion`
5. `collapsible`
6. `pagination`

### `accessibility`
7. `visually-hidden`

## Checklist antes de abrir PR

- [ ] Crear rama `refactor/reorganize-navigation-accessibility`
- [ ] Crear carpetas `src/components/navigation/` y `src/components/accessibility/`
- [ ] Mover los 7 componentes a sus ubicaciones nuevas
- [ ] Crear `src/components/navigation/index.ts` y `src/components/accessibility/index.ts`
- [ ] Crear redirecciones en cada ruta antigua
- [ ] Actualizar `src/components/index.ts`
- [ ] Ejecutar `pnpm typecheck` → debe pasar
- [ ] Ejecutar `pnpm test` → debe pasar 100%
- [ ] Ejecutar `pnpm build` → debe pasar sin warnings
- [ ] Verificar que Storybook aún funciona (opcional pero recomendado)
- [ ] Abrir PR con título: `refactor: reorganize navigation and accessibility to grouped folders`

## Notas finales

- Este PR es **solo reorganización interna**, no una refactorización funcional
- Si algo no funciona, revisa que los paths relativos sean correctos
- Si hay un componente que importa de otro dentro de `navigation/`, ajusta el path relativo
- Después de mergear, NO eliminar redirecciones (eso es para un PR futuro)

---

**Siguiente paso:** después de completar este PR 5, vendrá PR 6 para finalizar la exportación pública.
