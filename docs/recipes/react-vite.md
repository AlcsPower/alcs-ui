# ⚡ Receta: React 19 + Vite + Tailwind CSS v4

Esta es la configuración estándar de alto rendimiento recomendada para crear aplicaciones web empresariales modernas (SPAs) utilizando **React 19**, **Vite** y **Tailwind CSS v4** junto con `@alcspower/ui`.

---

## 1. Crear el Proyecto con Vite

```bash
# Crear proyecto con Vite y plantilla React + TypeScript
pnpm create vite mi-app-empresa --template react-ts

cd mi-app-empresa
```

---

## 2. Instalar Dependencias

### Configurar `.npmrc` para GitHub Packages
Crea o edita `.npmrc` en la raíz de tu proyecto:
```ini
@alcspower:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### Instalar `@alcspower/ui` y herramientas
```bash
# Instalar Tailwind CSS v4 y su plugin para Vite
pnpm add -D tailwindcss @tailwindcss/vite

# Instalar @alcspower/ui y dependencias de iconos
pnpm add @alcspower/ui lucide-react
```

---

## 3. Configurar Vite (`vite.config.ts`)

Agrega el plugin `@tailwindcss/vite` a la configuración de Vite:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
```

---

## 4. Configurar Estilos Globales (`src/index.css`)

En Tailwind CSS v4 ya no se utiliza `tailwind.config.js`. Todo se declara de forma nativa en tu archivo CSS:

```css
@import "tailwindcss";
@import "@alcspower/ui/styles.css";

/* Configuración de tema base opcional */
:root {
  color-scheme: light dark;
}

body {
  margin: 0;
  min-height: 100vh;
  background-color: var(--alcspower-bg-app, #f8fafc);
  color: var(--alcspower-text-primary, #0f172a);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.dark body {
  background-color: var(--alcspower-bg-app, #090d16);
  color: var(--alcspower-text-primary, #f8fafc);
}
```

---

## 5. Implementación de Componentes (`src/App.tsx`)

Un ejemplo completo con Layout moderno (*Craft Minimalist*), Toaster, Card, Button y un Dialog accesible:

```tsx
import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Toaster,
  toast,
  Badge,
} from '@alcspower/ui';
import { Plus, CheckCircle, Bell } from 'lucide-react';

export function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCrear = () => {
    setIsOpen(false);
    toast.success('Expediente generado exitosamente', {
      description: 'El nuevo trámite ha sido asignado al equipo técnico.',
    });
  };

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto space-y-8">
      {/* Sistema de notificaciones toast */}
      <Toaster position="bottom-right" richColors />

      {/* Cabecera de la aplicación */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Panel de Control Ministerial
            </h1>
            <Badge variant="success">En línea</Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Plataforma centralizada construida con @alcspower/ui y React 19.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="primary" className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Expediente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Expediente</DialogTitle>
              <DialogDescription>
                Complete los datos para registrar un trámite institucional en el sistema.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Se inicializará el flujo de revisión documental y firma electrónica.
              </p>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleCrear}>
                Confirmar Registro
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      {/* Contenido Principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Métricas de Atención</CardTitle>
            <CardDescription>Resumen del volumen de solicitudes tramitadas.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
              1,420 <span className="text-sm font-normal text-slate-500">trámites resueltos</span>
            </p>
          </CardContent>
          <CardFooter className="flex justify-between items-center text-xs text-slate-500">
            <span>Última actualización: Hoy</span>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas Operativas</CardTitle>
            <CardDescription>Eventos pendientes de supervisión técnica.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Revisión de firmas digitales
              </span>
              <Badge variant="warning">3 pendientes</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              onClick={() => toast.info('Notificaciones sincronizadas')}
            >
              <Bell className="h-3.5 w-3.5" />
              Sincronizar Alertas
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
```

---

## 6. Ejecutar en Desarrollo

```bash
pnpm dev
```

La aplicación iniciará en `http://localhost:5173/` con recarga rápida (*Hot Module Replacement*) y renderizado completo de React 19.
