# `@alcspower/ui` - Sistema de Diseño y Biblioteca Reutilizable de Componentes React

Biblioteca modular, accesible y reutilizable de componentes de interfaz de usuario para aplicaciones web basadas en React.

Diseñada con soporte para **React 18** y **React 19**, tipado estricto en **TypeScript**, primitivas accesibles de **Radix UI**, iconografía con **Lucide React** y un sistema de tokens de diseño semánticos distribuido en CSS precompilado. Es completamente compatible con aplicaciones consumidoras que utilicen **Tailwind CSS v3**, **Tailwind CSS v4** o **ningún framework CSS**.

---

## 📌 Contexto e Identidad

* **Nombre del Paquete:** `@alcspower/ui`
* **Versión Publicada:** `0.1.0`
* **Registro de Distribución:** GitHub Packages (`https://npm.pkg.github.com`)
* **Repositorio GitHub:** [https://github.com/AlcsPower/alcs-ui](https://github.com/AlcsPower/alcs-ui)
* **Licencia del Paquete:** UNLICENSED (código institucional propietario; dependencias externas de código abierto bajo licencias permisivas MIT / Apache-2.0 / ISC)
* **Independencia Arquitectónica:** La biblioteca no contiene lógica de negocio ni dependencias acopladas a proyectos específicos. Diseñada como un sistema de componentes puro, modular y reutilizable en cualquier aplicación web.

---

## 🏛️ Arquitectura de la Biblioteca

El sistema sigue una arquitectura por capas desacoplada inspirada en la filosofía de **shadcn/ui** y componentes atómicos basados en composición:

```text
React Components (Radix UI Primitives + Lucide + CVA)
                         ↓
           Design Tokens Semánticos
                         ↓
   CSS Custom Properties de Implementación (--mific-*)
                         ↓
  CSS Precompilado Encapsulado (@layer mific-tokens, mific-ui)
                         ↓
   Artefacto Distribuido en GitHub Packages (ESM / CJS / DTS / CSS)
```

### Principios Fundamentales
1. **Composición sobre Configuración:** Se favorece el uso de subcomponentes declarativos (e.g. `CardHeader`, `CardTitle`, `CardContent`) y el patrón `asChild` para composición polimórfica accesible.
2. **Cero Resets Globales Destructivos:** Los estilos se empaquetan dentro de `@layer mific-tokens` y `@layer mific-ui`, evitando alterar selectores globales como `body`, `html` o tablas de fuentes.
3. **Distribución Autónoma:** Todo el CSS necesario está empaquetado en `@alcspower/ui/styles.css`. El consumidor no requiere duplicar archivos ni configuraciones internas de Tailwind.

---

## 🚀 Instalación

### 1. Configuración de Acceso a GitHub Packages

Dado que `@alcspower/ui` se distribuye en GitHub Packages (`https://npm.pkg.github.com`), configura el registro en tu proyecto consumidor agregando o actualizando tu archivo `.npmrc`:

```ini
@alcspower:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

> [!IMPORTANT]
> **Buenas Prácticas de Seguridad:**
> * **Nunca incluyas tokens reales ni contraseñas** directamente en el archivo `.npmrc`.
> * Utiliza la referencia a variable de entorno `${NODE_AUTH_TOKEN}` o `${GITHUB_TOKEN}`.
> * Asegúrate de que el token cuente con el permiso mínimo `read:packages`.
> * Nunca subas archivos con credenciales en texto plano al control de versiones (Git) ni los expongas en registros o logs.

### 2. Instalación de la Dependencia

```bash
# Con pnpm (recomendado):
pnpm add @alcspower/ui@0.1.0

# O con npm:
npm install @alcspower/ui@0.1.0
```

---

## 💻 Uso Básico

Importa los estilos globales precompilados de la biblioteca en el punto de entrada de la aplicación (`main.tsx` o `App.tsx`) y consume los componentes necesarios:

```tsx
import React from 'react';
import '@alcspower/ui/styles.css';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input
} from '@alcspower/ui';

export function LoginForm() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Iniciar Sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder a la plataforma institucional.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Input placeholder="usuario@institucion.gob.ni" type="email" />
        </div>
        <div className="space-y-1">
          <Input placeholder="Contraseña" type="password" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancelar</Button>
        <Button variant="primary">Ingresar</Button>
      </CardFooter>
    </Card>
  );
}
```

---

## 🧩 Catálogo de Componentes Disponibles (19 Componentes MVP)

Todos los componentes han sido verificados mediante pruebas unitarias, comprobación de tipado estricto y auditorías de accesibilidad con Axe Core.

### 1. Formularios (Forms)

#### `Button`
Botón de acción interactivo con soporte de variantes semánticas, escala métrica de tamaños y delegación polimórfica mediante `asChild` para integrarse con enlaces `<a>` o `<Link>`.
```tsx
import { Button } from '@alcspower/ui';

<Button variant="primary" size="md">Guardar Cambios</Button>
<Button variant="outline" size="sm" asChild>
  <a href="/login">Ir a inicio</a>
</Button>
```
* **Variantes:** `primary`, `secondary`, `destructive`, `outline`, `ghost`, `link`.
* **Tamaños:** `sm`, `md`, `lg`, `icon`.

#### `Input`
Control de campo de texto para captura de datos, con soporte visual para estados deshabilitado, foco visible unificado y placeholder institucional.
```tsx
import { Input } from '@alcspower/ui';

<Input type="text" placeholder="Número de expediente..." />
```

#### `Textarea`
Área de texto multilínea con bordes estilizados y foco accesible para descripciones extensas.
```tsx
import { Textarea } from '@alcspower/ui';

<Textarea placeholder="Observaciones detalladas del trámite..." rows={4} />
```

#### `Label`
Etiqueta de formulario accesible basada en `@radix-ui/react-label`, asociada a campos de entrada mediante `htmlFor`.
```tsx
import { Label, Input } from '@alcspower/ui';

<div className="space-y-1">
  <Label htmlFor="cedula">Cédula de Identidad</Label>
  <Input id="cedula" placeholder="001-000000-0000A" />
</div>
```

---

### 2. Controles (Controls)

#### `Badge`
Insignia compacta para categorización, estados de flujo o indicadores cuantitativos.
```tsx
import { Badge } from '@alcspower/ui';

<Badge variant="success">Completado</Badge>
<Badge variant="warning">En Revisión</Badge>
```
* **Variantes:** `default`, `secondary`, `destructive`, `outline`, `success`, `warning`, `info`.

#### `Card`
Contenedor modular con elevación tenue y superficie semántica (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@alcspower/ui';

<Card>
  <CardHeader>
    <CardTitle>Resumen Operativo</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Detalle de transacciones procesadas.</p>
  </CardContent>
</Card>
```

#### `Avatar`
Elemento para representación de usuarios con soporte de carga de imagen y fallback automático de iniciales basado en `@radix-ui/react-avatar`.
```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@alcspower/ui';

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="Foto de perfil" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

#### `Checkbox`
Control interactivo de selección binaria accesible basado en `@radix-ui/react-checkbox`.
```tsx
import { Checkbox, Label } from '@alcspower/ui';

<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Acepto los términos del servicio</Label>
</div>
```

#### `Switch`
Interruptor conmutador de estado booleano accesible con transiciones suaves basado en `@radix-ui/react-switch`.
```tsx
import { Switch, Label } from '@alcspower/ui';

<div className="flex items-center gap-2">
  <Switch id="notificaciones" />
  <Label htmlFor="notificaciones">Habilitar notificaciones</Label>
</div>
```

#### `Select`
Menú de selección desplegable accesible con soporte de navegación por teclado, portales y animaciones basado en `@radix-ui/react-select`.
```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup
} from '@alcspower/ui';

<Select defaultValue="estandar">
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Selecciona un tipo" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Modalidad</SelectLabel>
      <SelectItem value="estandar">Trámite Estándar</SelectItem>
      <SelectItem value="urgente">Trámite Urgente</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

---

### 3. Capas Superpuestas (Overlays)

#### `Dialog`
Ventana modal accesible basada en `@radix-ui/react-dialog` con bloqueo de scroll, atrapamiento de foco (`focus trap`) y soporte para cierre con tecla `Escape`.
```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Button
} from '@alcspower/ui';

<Dialog>
  <DialogTrigger asChild>
    <Button variant="primary">Confirmar Registro</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirmar Creación de Expediente</DialogTitle>
      <DialogDescription>
        ¿Está seguro de que desea emitir el documento? Esta acción no se puede revertir.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="secondary">Cancelar</Button>
      </DialogClose>
      <Button variant="primary">Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### `Alert`
Contenedor informativo para mensajes de advertencia, éxito o peligro, con iconografía y variantes estilizadas.
```tsx
import { Alert, AlertTitle, AlertDescription } from '@alcspower/ui';

<Alert variant="warning">
  <AlertTitle>Atención requerida</AlertTitle>
  <AlertDescription>El certificado digital expirará en 3 días.</AlertDescription>
</Alert>
```
* **Variantes:** `default`, `info`, `success`, `warning`, `destructive`.

#### `Tooltip`
Información complementaria contextual accesible activada por hover y foco de teclado basada en `@radix-ui/react-tooltip`.
```tsx
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button } from '@alcspower/ui';

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline" size="sm">Ayuda</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Consultar documentación oficial</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

#### `DropdownMenu`
Menú contextual de opciones desplegables con soporte de atajos, checkboxes y separadores basado en `@radix-ui/react-dropdown-menu`.
```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Button
} from '@alcspower/ui';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Acciones</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Opciones</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onSelect={() => console.log('Descargar')}>Descargar PDF</DropdownMenuItem>
    <DropdownMenuItem onSelect={() => console.log('Imprimir')}>Imprimir Ficha</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### 4. Navegación y Estructura (Navigation & Layout)

#### `Tabs`
Sistema de navegación por pestañas con soporte ARIA para selección activa y cambio de vistas basado en `@radix-ui/react-tabs`.
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@alcspower/ui';

<Tabs defaultValue="datos">
  <TabsList>
    <TabsTrigger value="datos">Datos Generales</TabsTrigger>
    <TabsTrigger value="documentos">Documentos</TabsTrigger>
  </TabsList>
  <TabsContent value="datos">Panel de datos generales.</TabsContent>
  <TabsContent value="documentos">Panel de documentos adjuntos.</TabsContent>
</Tabs>
```

#### `Separator`
Separador estructural semántico con orientación horizontal o vertical basado en `@radix-ui/react-separator`.
```tsx
import { Separator } from '@alcspower/ui';

<Separator orientation="horizontal" className="my-4" />
```

---

### 5. Retroalimentación (Feedback)

#### `Skeleton`
Marcador de posición con efecto pulsante suave para simular la carga asíncrona de contenido.
```tsx
import { Skeleton } from '@alcspower/ui';

<div className="space-y-2">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>
```

#### `Spinner`
Indicador circular de carga animado con escala métrica de tamaños.
```tsx
import { Spinner } from '@alcspower/ui';

<Spinner size="md" />
```

#### `EmptyState`
Componente para pantallas o secciones sin registros, compuesto por título, descripción y llamada a la acción opcional.
```tsx
import { EmptyState, Button } from '@alcspower/ui';

<EmptyState
  title="No hay trámites pendientes"
  description="Todas las solicitudes en la bandeja han sido atendidas satisfactoriamente."
  action={<Button variant="outline" size="sm">Actualizar</Button>}
/>
```

---

## 🎨 Sistema de Tokens de Diseño

La biblioteca define su sistema visual a partir de **conceptos semánticos** que desacoplan los componentes de valores de color fijos.

### 1. Tokens Semánticos de Color

En la versión actual de distribución (`0.1.0`), la hoja de estilos (`src/styles/tokens.css`) implementa 57 variables CSS en `:root` (41 propiedades de color y estados interactivos, 9 alias de compatibilidad, 4 de radio y 3 de sombra). A nivel de consumo público, se estructuran en torno a los 20 conceptos semánticos principales de color:

| Concepto Semántico | Variable CSS de Implementación | Modo Claro (`:root`) | Modo Oscuro (`.dark`) | Uso Principal |
| :--- | :--- | :--- | :--- | :--- |
| `background` | `--mific-background` | `#f8fafc` (Slate 50) | `#090d16` (Slate 950+) | Lienzo de fondo de la aplicación |
| `foreground` | `--mific-foreground` | `#0f172a` (Slate 900) | `#f8fafc` (Slate 50) | Color de texto principal |
| `surface` | `--mific-surface` | `#ffffff` | `#0f172a` (Slate 900) | Superficie de controles, inputs, selects |
| `surface-card` | `--mific-surface-card` | `#ffffff` | `#131d31` (Azul pizarra) | Superficie para tarjetas y modales |
| `surface-muted`| `--mific-surface-muted`| `#f1f5f9` (Slate 100) | `#1e293b` (Slate 800) | Fondos de listas, pestañas y contenedores sutiles |
| `primary` | `--mific-primary` | `#004b87` (Azul Institucional) | `#38bdf8` (Sky 400) | Botones primarios, enlaces activos, foco |
| `primary-foreground` | `--mific-primary-foreground` | `#ffffff` | `#082f49` (Sky 950) | Texto sobre fondos primarios |
| `primary-hover`| `--mific-primary-hover` | `#003866` | `#0ea5e9` | Hover de acciones principales |
| `secondary` | `--mific-secondary` | `#f1f5f9` | `#1e293b` | Acciones secundarias y badges neutrales |
| `secondary-foreground` | `--mific-secondary-foreground` | `#0f172a` | `#f8fafc` | Texto sobre botón secundario |
| `muted` | `--mific-muted` | `#f1f5f9` | `#1e293b` | Elementos atenuados |
| `muted-foreground` | `--mific-muted-foreground` | `#64748b` (Slate 500) | `#94a3b8` (Slate 400) | Texto secundario y placeholders |
| `destructive` | `--mific-destructive` | `#dc2626` (Red 600) | `#ef4444` (Red 500) | Errores, alertas críticas y peligro |
| `destructive-foreground` | `--mific-destructive-foreground` | `#ffffff` | `#450a0a` (Red 950) | Texto sobre botón destructivo |
| `success` | `--mific-success` | `#15803d` (Green 700) | `#4ade80` (Green 400) | Estados completados y confirmación |
| `warning` | `--mific-warning` | `#b45309` (Amber 700) | `#fbbf24` (Amber 400) | Advertencias y revisiones |
| `info` | `--mific-info` | `#0369a1` (Sky 700) | `#38bdf8` (Sky 400) | Mensajes y badges informativos |
| `border` | `--mific-border` | `#e2e8f0` (Slate 200) | `#334155` (Slate 700) | Bordes estructurales y divisores |
| `input` | `--mific-input` | `#e2e8f0` (Slate 200) | `#334155` (Slate 700) | Bordes de inputs, textareas y selects |
| `ring` | `--mific-ring` | `#004b87` | `#38bdf8` | Anillo visible de foco accesible |

### 2. Escala Geométrica de Radios (Border Radius)

La biblioteca aplica una escala métrica proporcional para mantener consistencia visual en esquinas redondeadas:
* **Pequeño (`sm`):** `4px` — Indicadores, insignias compactas (`Badge`).
* **Mediano (`md`):** `6px` — Botones (`Button`), campos de entrada (`Input`, `Textarea`), selectores (`Select`) y pestañas (`Tabs`).
* **Grande (`lg`):** `8px` — Tarjetas (`Card`), ventanas modales (`Dialog`), alertas (`Alert`).
* **Completo (`full`):** `9999px` — Avatares (`Avatar`), conmutadores (`Switch`) e indicadores de píldora.

*(Nota de implementación: Los valores de radio están enlazados internamente a `--mific-radius-*`).*

### 3. Escala Semántica de Elevación y Sombras (Box Shadow)

* **`shadow-sm`:** Elevación sutil para controles interactivos en reposo.
* **`shadow-md`:** Elevación intermedia para menús flotantes (`DropdownMenu`, `SelectContent`).
* **`shadow-lg`:** Elevación pronunciada para ventanas modales y diálogos superpuestos (`DialogContent`).

*(Nota de implementación: Los valores de elevación están enlazados internamente a `--mific-shadow-*`).*

### 4. Sobrescritura de Tokens en el Consumidor
Cualquier aplicación consumidora puede ajustar o redefinir los valores semánticos en su archivo CSS local:
```css
:root {
  --mific-primary: #005a9c;
  --mific-radius-md: 0.5rem;
}
```

---

## 🌓 Modo Claro y Modo Oscuro (Dark Mode)

La biblioteca ofrece conmutación fluida entre temas claro y oscuro mediante clases o atributos en el elemento contenedor (`<html>` o `<div data-theme="...">`).

```tsx
// Conmutación mediante clase estándar
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
}
```

### Anillo de Foco Accesible (Focus Ring)
Todos los controles interactivos implementan un anillo de foco visible que adapta automáticamente su contraste y su color de desplazamiento (`ring-offset`):
```css
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mific-ring focus-visible:ring-offset-2 ring-offset-mific-surface
```

---

## ♿ Accesibilidad

* **Objetivo de Diseño:** Cumplimiento de las pautas de accesibilidad para el contenido web **WCAG 2.1 nivel AA** (ratio de contraste mínimo >= 4.5:1 para texto normal y >= 3:1 para controles e interfaces).
* **Gestión de Foco y ARIA:** Garantizada por las primitivas de Radix UI (soporte para teclado, atajos, trampas de foco en modales y lectores de pantalla).
* **Pruebas Automatizadas Verificadas:** La suite automatizada ejecuta pruebas unitarias y de accesibilidad con `@axe-core/react` y `@testing-library/react` (38/38 pruebas aprobadas, **0 violaciones de accesibilidad detectadas**).
* *Aclaración técnica:* Las pruebas automatizadas verifican estructura semántica y atributos requeridos, pero no sustituyen una auditoría manual exhaustiva con lectores de pantalla ni pruebas con usuarios con discapacidad.

---

## 🔍 Compatibilidad y Validación en Consumidores

La biblioteca distingue rigurosamente entre entornos formalmente probados y objetivos de diseño:

### Entornos Verificados (Pruebas Reales de Integración)
* **React 18:** Verificado en consumidor con `react@^18.2.0` y `react-dom@^18.2.0`.
* **React 19:** Verificado en consumidor con `react@^19.0.0` y `react-dom@^19.0.0`.
* **TypeScript:** Verificado con TypeScript 5.x y 7.x en modo estricto (`tsc --noEmit`).
* **Consumidor React 19 + Tailwind CSS v4:** Verificado mediante compilación de producción con Vite.
* **Consumidor React 18 + Tailwind CSS v3.4:** Verificado mediante compilación de producción con Vite.
* **Consumidor React 19 sin Tailwind:** Verificado consumiendo únicamente el archivo `@alcspower/ui/styles.css`.
* **Módulos:** 71 exportaciones idénticas verificadas tanto en **ESM** (`import`) como en **CommonJS** (`require`).

### Objetivos de Diseño
* Compatibilidad con futuros entornos compatibles con el estándar React Server Components y frameworks modernos basados en bundlers ESM.

---

## 📦 Especificación Técnica del Paquete

Estructura de distribución generada y publicada en el registro:

* **Entry point ESM:** `./dist/index.js` (ECMAScript 2022)
* **Entry point CJS:** `./dist/index.cjs` (CommonJS para compatibilidad con Jest o herramientas legadas)
* **Definiciones TypeScript:** `./dist/index.d.ts` y `./dist/index.d.cts`
* **Estilos Distribuidos:** `./dist/styles.css` (40.8 KB minificado)
* **Side Effects:** Delimitados a archivos CSS (`**/*.css`, `./dist/styles.css`).

---

## 📖 Storybook

Storybook se encuentra configurado como el entorno de catálogo interactivo, pruebas visuales y documentación viva de componentes.

```bash
# Iniciar Storybook interactivo localmente (puerto 6006):
pnpm storybook

# Compilar Storybook para documentación estática (genera dist-storybook/):
pnpm build-storybook
```

---

## 🛠️ Comandos de Desarrollo del Repositorio

Los siguientes scripts corresponden a los comandos reales definidos en `package.json`:

| Comando | Propósito |
| :--- | :--- |
| `pnpm dev` | Inicia la compilación continua de la biblioteca con `tsup --watch` |
| `pnpm build` | Compila tanto el CSS (`build:css`) como los bundles JS/DTS (`build:js`) |
| `pnpm build:js` | Ejecuta `tsup` para generar bundles ESM, CJS y definiciones de tipos `.d.ts` |
| `pnpm build:css` | Compila y minifica `src/styles/index.css` hacia `dist/styles.css` con Tailwind CSS |
| `pnpm test` | Ejecuta la suite de pruebas unitarias y de accesibilidad con Vitest |
| `pnpm test:watch` | Ejecuta Vitest en modo interactivo/vigilante |
| `pnpm test:coverage` | Genera reporte de cobertura de código con Vitest |
| `pnpm typecheck` | Ejecuta la comprobación estricta de tipos de TypeScript con `tsc --noEmit` |
| `pnpm storybook` | Inicia el servidor de desarrollo local de Storybook |
| `pnpm build-storybook` | Genera la versión estática de Storybook en `dist-storybook/` |
| `pnpm changeset` | Herramienta interactiva para documentar cambios de versiones con Changesets |

---

## 🔄 Gestión de Versiones y Publicación

* **Control de Versiones:** La biblioteca utiliza **Changesets** (`@changesets/cli`) para la gestión de versiones semánticas y el registro de cambios.
* **Flujo de Publicación:** Las versiones se publican exclusivamente mediante el workflow automatizado de GitHub Actions (`.github/workflows/release.yml`) con mínimo privilegio (`contents: read`, `packages: write`) y autenticación de `GITHUB_TOKEN`.
* **Versión Actual:** `0.1.0`.

---

## 📜 Licencia y Enlaces

* **Licencia:** UNLICENSED (Propiedad institucional).
* **Repositorio GitHub:** [https://github.com/AlcsPower/alcs-ui](https://github.com/AlcsPower/alcs-ui)
* **Registro GitHub Packages:** [https://npm.pkg.github.com/@alcspower/ui](https://npm.pkg.github.com/@alcspower/ui)
* **Reporte de Incidencias:** [https://github.com/AlcsPower/alcs-ui/issues](https://github.com/AlcsPower/alcs-ui/issues)
