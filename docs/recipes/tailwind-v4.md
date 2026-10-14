# 🎨 Receta: Tailwind CSS v4 & Personalización de Tokens

`@alcspower/ui` está diseñado desde la raíz para **Tailwind CSS v4**, aprovechando las directivas nativas `@theme`, `@layer` y variables CSS semánticas (`CSS Custom Properties`).

Esta guía explica cómo funciona el sistema de tokens y cómo puedes personalizar colores de marca, bordes y fuentes sin romper la coherencia del diseño *Craft Minimalist*.

---

## 1. Importación Básica en Tailwind v4

En tu archivo principal de estilos (ej. `src/styles/index.css` o `src/index.css`):

```css
@import "tailwindcss";
@import "@alcspower/ui/styles.css";
```

Todo el sistema de tokens semánticos queda automáticamente registrado en la capa `@layer alcspower-tokens` y los componentes en `@layer alcspower-ui`.

---

## 2. Los Tokens Semánticos Principales

`@alcspower/ui` utiliza variables CSS con el prefijo `--alcspower-*`. A continuación se listan las más comunes:

| Token Semántico | Valor por Defecto (Light) | Uso en Componentes |
| :--- | :--- | :--- |
| `--alcspower-primary` | `#4f46e5` (Indigo 600) | Color de acción principal en botones, links y checkboxes activos. |
| `--alcspower-primary-hover` | `#4338ca` (Indigo 700) | Estado hover de controles primarios. |
| `--alcspower-primary-foreground`| `#ffffff` | Texto y contraste sobre fondos primarios. |
| `--alcspower-border` | `#e2e8f0` (Slate 200) | Bordes hairline de tarjetas, inputs, tablas y separadores. |
| `--alcspower-bg-app` | `#f8fafc` (Slate 50) | Fondo general de la aplicación. |
| `--alcspower-surface` | `#ffffff` (Blanco) | Fondo de tarjetas, modales, popovers y dropdowns. |
| `--alcspower-text-primary` | `#0f172a` (Slate 900) | Títulos, encabezados y textos principales de alto contraste. |
| `--alcspower-text-secondary` | `#64748b` (Slate 500) | Textos descriptivos, subtítulos e indicadores secundarios. |
| `--alcspower-radius-md` | `0.75rem` (12px) | Radio de controles (botones, inputs, selectores). |
| `--alcspower-radius-xl` | `1rem` (16px) | Radio de tarjetas y contenedores de tamaño medio. |
| `--alcspower-radius-2xl` | `1.5rem` (24px) | Radio de modales, hojas laterales (sheets) y tarjetas destacadas. |

---

## 3. Sobrescribir Colores para una Marca Corporativa

Si tu empresa o producto requiere una paleta de color diferente (por ejemplo, azul corporativo o verde esmeralda), puedes sobrescribir las variables en tu CSS global:

```css
@import "tailwindcss";
@import "@alcspower/ui/styles.css";

/* Personalización de Tokens de Marca */
:root {
  /* Cambiar color primario a Azul Corporativo */
  --alcspower-primary: #1d4ed8;          /* Blue 700 */
  --alcspower-primary-hover: #1e40af;    /* Blue 800 */
  --alcspower-primary-muted: #dbeafe;    /* Blue 100 */

  /* Ajustar radios para un aspecto más sobrio */
  --alcspower-radius-md: 0.5rem;         /* 8px */
  --alcspower-radius-xl: 0.75rem;        /* 12px */
}

/* Modo oscuro personalizado */
.dark {
  --alcspower-primary: #3b82f6;          /* Blue 500 */
  --alcspower-primary-hover: #60a5fa;    /* Blue 400 */
  --alcspower-bg-app: #0b1120;
  --alcspower-surface: #0f172a;
}
```

---

## 4. Extender Tailwind v4 con `@theme`

Si deseas usar los tokens de `@alcspower/ui` dentro de tus propias clases de Tailwind (ej. `bg-brand-primary` o `rounded-brand`):

```css
@import "tailwindcss";
@import "@alcspower/ui/styles.css";

@theme {
  --color-brand-primary: var(--alcspower-primary);
  --color-brand-surface: var(--alcspower-surface);
  --radius-brand: var(--alcspower-radius-md);
}
```

Ahora en cualquier archivo JSX/TSX puedes escribir:
```tsx
<div className="bg-brand-surface rounded-brand border border-slate-200 p-4">
  <p className="text-brand-primary font-bold">Elemento personalizado</p>
</div>
```

---

## 5. Implementación del Modo Oscuro

`@alcspower/ui` soporta cambio de tema mediante la clase `.dark` en el elemento `<html>`:

```tsx
// Ejemplo de toggle de modo oscuro en React
import React, { useEffect, useState } from 'react';
import { Button } from '@alcspower/ui';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Cambiar tema">
      {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
    </Button>
  );
}
```
