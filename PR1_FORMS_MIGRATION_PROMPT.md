# Prompt para Migración de Estructura de Carpetas — PR 1: Forms

## Contexto

Estoy migrando la estructura de `@alcspower/ui` de una organización plana a una organización semántica por categorías funcionales.

Este es el **PR 1 de 7 bloques de migración**.

Objetivo de este PR: reorganizar todos los componentes de formularios a `src/components/forms/` sin romper la API pública.

## Documentación de referencia

Antes de hacer cualquier cambio, lee estos archivos en el repo:
- `FOLDER_STRUCTURE.md` — estructura final deseada
- `MIGRATION_GUIDE.md` — orden y fases de migración
- `API_PRESERVATION_GUIDE.md` — cómo no romper la API pública durante la migración
- `src/README.md` — descripción de cada categoría

## Componentes a migrar en este PR

Estos 13 componentes deben moverse de `src/components/{nombre}/` a `src/components/forms/{nombre}/`:

1. `button`
2. `input`
3. `textarea`
4. `label`
5. `field`
6. `radio-group`
7. `slider`
8. `toggle`
9. `toggle-group`
10. `checkbox`
11. `switch`
12. `select`
13. `combobox`

## Estructura final objetivo

```text
src/components/
├── forms/
│   ├── button/
│   │   ├── button.tsx
│   │   ├── button.test.tsx
│   │   ├── button.stories.tsx
│   │   └── index.ts
│   ├── input/
│   ├── textarea/
│   ├── label/
│   ├── field/
│   ├── radio-group/
│   ├── slider/
│   ├── toggle/
│   ├── toggle-group/
│   ├── checkbox/
│   ├── switch/
│   ├── select/
│   ├── combobox/
│   └── index.ts
```

## Patrón técnico exacto a seguir

### Para cada componente (ej: button):

**Paso 1: Mover el archivo real**
- Mover la carpeta completa: `src/components/button/` → `src/components/forms/button/`
- Incluir: `.tsx`, `.test.tsx`, `.stories.tsx`, `index.ts`

**Paso 2: Crear redirección en lugar antiguo**
- Crear `src/components/button/index.ts` con:
```ts
// src/components/button/index.ts
export * from '../forms/button';
export type * from '../forms/button';
```

**Paso 3: No tocar la implementación**
- El contenido de `button.tsx`, `button.test.tsx`, etc. **no debe cambiar**
- Solo se reorganiza la ubicación del archivo

### Crear archivo de categoría

Crear `src/components/forms/index.ts`:
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

### Actualizar `src/components/index.ts`

Mantener compatibilidad temporal (agregando acceso directo a la categoría):
```ts
// Mantener los re-exports antiguos para compatibilidad
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

// Agregar acceso directo a la categoría nueva
export * from './forms';
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
- `src/components/forms/` (carpeta)
- `src/components/forms/index.ts`
- `src/components/button/index.ts` (redirección)
- `src/components/input/index.ts` (redirección)
- ... (13 redirecciones en total, una por componente)

**Modificar:**
- `src/components/index.ts` (agregar acceso directo a forms)

**Mover (sin cambios internos):**
- Los 13 componentes del árbol actual → `src/components/forms/`

## Regla de éxito

Este PR habrá terminado correctamente cuando:

- ✅ Los 13 componentes estén en `src/components/forms/{nombre}/`
- ✅ Las redirecciones existan en los lugares antiguos
- ✅ `pnpm typecheck` pase sin errores
- ✅ `pnpm test` pase 100%
- ✅ `pnpm build` funcione sin warnings
- ✅ Un consumer siga importando igual: `import { Button, Input, Select } from '@alcspower/ui'`
- ✅ No hay cambios en la API pública visible

## Orden recomendado de migración

Para evitar bloqueos de dependencias, migrar en este orden:

1. `button` (independiente, sin dependencias internas)
2. `label` (independiente)
3. `input` (puede depender de label)
4. `textarea` (puede depender de label)
5. `field` (puede depender de input, label, etc.)
6. `checkbox` (independiente)
7. `switch` (independiente)
8. `radio-group` (independiente)
9. `slider` (independiente)
10. `toggle` (independiente)
11. `toggle-group` (independiente)
12. `select` (puede depender de otros)
13. `combobox` (puede depender de otros)

## Checklist antes de abrir PR

- [ ] Crear rama `refactor/reorganize-forms`
- [ ] Crear carpeta `src/components/forms/`
- [ ] Mover los 13 componentes a `src/components/forms/{nombre}/`
- [ ] Crear `src/components/forms/index.ts` con todos los exports
- [ ] Crear redirecciones en cada `src/components/{nombre}/index.ts`
- [ ] Actualizar `src/components/index.ts`
- [ ] Ejecutar `pnpm typecheck` → debe pasar
- [ ] Ejecutar `pnpm test` → debe pasar 100%
- [ ] Ejecutar `pnpm build` → debe pasar sin warnings
- [ ] Verificar que Storybook aún funciona (opcional pero recomendado)
- [ ] Abrir PR con título: `refactor: reorganize forms to src/components/forms/`

## Notas finales

- Este PR es **solo reorganización interna**, no una refactorización funcional
- Si algo no funciona, revisa que los paths relativos sean correctos
- Si hay un componente que importa de otro dentro de `forms/`, ajusta el path relativo
- Después de mergear, NO eliminar redirecciones (eso es para un PR futuro)

---

**Siguiente paso:** después de completar este PR 1, vendrá PR 2 con `data-display/` siguiendo el mismo patrón.
