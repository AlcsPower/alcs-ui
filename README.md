# `@alcspower/ui` - Sistema de Diseño y Biblioteca Reutilizable de Componentes React

Biblioteca modular y accesible de componentes de interfaz de usuario para aplicaciones web modernas basadas en React.

Diseñada con **React 18 / React 19**, **TypeScript** en modo estricto, primitivas accesibles de **Radix UI**, tokens semánticos de diseño y compatibilidad total con proyectos que utilicen **Tailwind CSS v3**, **Tailwind CSS v4** o **ningún framework CSS**.

---

## 🎨 Sistema de Diseño (Design System)

### 1. Filosofía y Arquitectura
`@alcspower/ui` separa la semántica del diseño de los valores concretos. El flujo arquitectónico garantiza que un cambio de marca o tema se propague sin necesidad de modificar individualmente cada componente:

```text
Design Token Semántico
        ↓
CSS Custom Property (--mific-*)
        ↓
Utilidad / Componente CVA
        ↓
Interfaz Renderizada
```

### 2. Tokens Semánticos de Color

El sistema cuenta con una escala simétrica entre modo claro y modo oscuro, garantizando cumplimiento de contraste **WCAG 2.1 AA** (ratio >= 4.5:1 para texto normal, >= 3:1 para componentes de interfaz):

| Token Semántico | Modo Claro (`:root`) | Modo Oscuro (`.dark`) | Uso Principal |
| :--- | :--- | :--- | :--- |
| `--mific-primary` | `#004b87` (Azul MIFIC) | `#38bdf8` (Sky 400) | Botón principal, enlaces, checks activos, focus |
| `--mific-primary-foreground` | `#ffffff` | `#082f49` (Sky 950) | Texto sobre fondo primario |
| `--mific-primary-hover` | `#003866` | `#0ea5e9` | Hover de acciones principales |
| `--mific-background` | `#f8fafc` (Slate 50) | `#090d16` (Slate 950+) | Fondo base o canvas de la aplicación |
| `--mific-foreground` | `#0f172a` (Slate 900) | `#f8fafc` (Slate 50) | Color de texto principal |
| `--mific-surface` | `#ffffff` | `#0f172a` (Slate 900) | Superficie de controles, inputs, selects |
| `--mific-surface-card` | `#ffffff` | `#131d31` (Azul pizarra) | Superficie elevada para tarjetas y modales |
| `--mific-surface-muted` | `#f1f5f9` (Slate 100) | `#1e293b` (Slate 800) | Contenedores sutiles, tabs y listas |
| `--mific-muted-foreground` | `#64748b` (Slate 500) | `#94a3b8` (Slate 400) | Texto secundario, descripciones y placeholders |
| `--mific-secondary` | `#f1f5f9` | `#1e293b` | Botones secundarios y badges neutrales |
| `--mific-secondary-foreground`| `#0f172a` | `#f8fafc` | Texto sobre botón secundario |
| `--mific-destructive` | `#dc2626` (Red 600) | `#ef4444` (Red 500) | Acciones de peligro, errores y alertas |
| `--mific-destructive-foreground`| `#ffffff` | `#450a0a` (Red 950) | Texto sobre fondo destructivo |
| `--mific-success` | `#15803d` (Green 700) | `#4ade80` (Green 400) | Confirmación, éxito y completado |
| `--mific-warning` | `#b45309` (Amber 700) | `#fbbf24` (Amber 400) | Advertencias, revisiones pendientes |
| `--mific-info` | `#0369a1` (Sky 700) | `#38bdf8` (Sky 400) | Avisos informativos |
| `--mific-border` | `#e2e8f0` (Slate 200) | `#334155` (Slate 700) | Bordes estructurales y separadores |
| `--mific-input` | `#e2e8f0` (Slate 200) | `#334155` (Slate 700) | Bordes de inputs, textareas y selects |
| `--mific-ring` | `#004b87` | `#38bdf8` | Anillo visible de foco accesible |

### 3. Tipografía
`@alcspower/ui` **no impone tipografías globales** a la aplicación consumidora. No modifica `body` ni `html`.
- **Estrategia:** La biblioteca utiliza fuentes relativas (`inherit` o el stack del sistema de la aplicación).
- **Escala:**
  - `text-2xl font-bold tracking-tight`: Títulos de pantalla o encabezados de sección.
  - `text-lg font-semibold leading-none`: Títulos de `Card` y `Dialog`.
  - `text-sm font-semibold`: Títulos de `Alert` y subtítulos.
  - `text-sm font-medium`: Etiquetas (`Label`), botones (`Button`) y pestañas (`Tabs`).
  - `text-sm font-normal`: Texto en `Input`, `Textarea` y párrafos de contenido.
  - `text-sm text-mific-muted-foreground`: Texto descriptivo y de ayuda.
  - `text-xs font-medium`: Insignias (`Badge`), pistas de teclado y notas al pie.

### 4. Escala de Dimensiones y Alturas de Control
Para mantener coherencia vertical en formularios, los controles interactivos comparten una escala métrica en incrementos múltiplos de 8px:
- **Small (`sm`):** `h-8` (32px), `text-xs`, padding `px-3`.
- **Medium (`md` - Estándar):** `h-10` (40px), `text-sm`, padding `px-4`. (Aplicado a `Button`, `Input`, `SelectTrigger`).
- **Large (`lg`):** `h-12` (48px), `text-base`, padding `px-6`.

### 5. Radios y Sombras
- **Radios:**
  - `rounded-mific-sm` (4px): Badges pequeños, tags, indicadores.
  - `rounded-mific-md` (6px): Botones, inputs, textareas, selects, tabs.
  - `rounded-mific-lg` (8px): Tarjetas (`Card`), diálogos (`Dialog`), alertas (`Alert`).
  - `rounded-mific-full` (9999px): Avatares, switches y pills.
- **Sombras:**
  - `--mific-shadow-sm`: Elevación tenue para controles interactivos.
  - `--mific-shadow-md`: Menús desplegables (`DropdownMenu`, `SelectContent`).
  - `--mific-shadow-lg`: Ventanas modales (`DialogContent`).

### 6. Sistema de Foco Visible (Focus Ring)
Todo elemento interactivo implementa un anillo de foco unificado:
```css
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mific-ring focus-visible:ring-offset-2 ring-offset-mific-surface
```
El desplazamiento (`ring-offset`) se adapta automáticamente al color de superficie base tanto en modo claro como en modo oscuro.

---

## 🚀 Instalación y Consumo

### 1. Instalación desde GitHub Packages

Configura tu `.npmrc`:
```ini
@alcspower:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Instala el paquete:
```bash
pnpm add @alcspower/ui
# o con npm:
npm install @alcspower/ui
```

### 2. Importación de Estilos y Componentes

En el punto de entrada de la aplicación (`main.tsx` o `App.tsx`):
```tsx
import '@alcspower/ui/styles.css';
import { Button, Card, Dialog } from '@alcspower/ui';
```

> [!NOTE]
> Los estilos están encapsulados bajo `@layer mific-tokens` y `@layer mific-ui` sin CSS reset global (Preflight). Puedes consumir `@alcspower/ui` en proyectos con **Tailwind v3**, **Tailwind v4** o **sin Tailwind**.

### 3. Personalización de Tokens
Cualquier aplicación consumidora puede sobrescribir tokens institucionales en su CSS local:
```css
:root {
  --mific-primary: #006699; /* Ajustar tono institucional si fuera necesario */
  --mific-radius-md: 0.5rem; /* Aumentar radio de esquinas */
}
```

### 4. Activación de Modo Oscuro
Para activar el modo oscuro institucional, agrega la clase `dark` o el atributo `data-theme="dark"` al elemento raíz:
```tsx
// Conmutar tema
document.documentElement.classList.toggle('dark');
```

---

## 🧩 Catálogo de Componentes MVP (19 Componentes)

| Categoría | Componentes | Soporte `asChild` |
| :--- | :--- | :---: |
| **Formularios** | `Button`, `Input`, `Textarea`, `Label` | `Button` (para enlaces `<a>` o `<Link>`) |
| **Controles** | `Badge`, `Card`, `Avatar`, `Checkbox`, `Switch`, `Select` | No requerido |
| **Overlays** | `Dialog`, `Alert`, `Tooltip`, `DropdownMenu` | `DialogTrigger`, `TooltipTrigger`, `DropdownMenuTrigger` |
| **Navegación / Layout** | `Tabs`, `Separator` | No requerido |
| **Feedback** | `Skeleton`, `Spinner`, `EmptyState` | No requerido |

---

## ♿ Declaración de Accesibilidad

> **Objetivo de accesibilidad:** WCAG 2.1 AA, con validación mediante pruebas automatizadas y revisión de interacción y estados.
>
> *Aclaración técnica:* El paso exitoso de pruebas automatizadas con `@axe-core/react` y `@testing-library/react` valida la semántica ARIA, gestión de foco y atributos requeridos, pero no reemplaza una auditoría integral manual con lectores de pantalla ni pruebas de usuario final.

---

## 🧪 Comandos de Desarrollo y Validación

```bash
# Comprobación de tipos TypeScript en modo estricto
pnpm typecheck

# Suite de pruebas unitarias y accesibilidad (Vitest)
pnpm test

# Compilación de la biblioteca (JS ESM/CJS + DTS + CSS)
pnpm build

# Compilar Storybook estático (documentación y catálogo visual)
pnpm build-storybook

# Iniciar Storybook interactivo local
pnpm storybook

# Empaquetar tarball para verificación
pnpm pack
```

---

## 📜 Licencias y Dependencias

Todas las dependencias utilizadas en `@alcspower/ui` cuentan con licencias abiertas y permisivas:
- **Radix UI Primitives:** Licencia MIT
- **class-variance-authority:** Licencia Apache-2.0
- **clsx / tailwind-merge:** Licencia MIT
- **lucide-react:** Licencia ISC
- **Storybook / Vitest / TypeScript:** Licencia MIT / Apache-2.0

*No se incluye código propietario de bibliotecas comerciales.*
