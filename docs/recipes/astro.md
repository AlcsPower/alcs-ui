# 🚀 Receta: Astro + React Islands + Tailwind CSS v4

[Astro](https://astro.build/) es el framework ideal para portales gubernamentales, sitios web corporativos y documentación institucional que demandan **máxima velocidad de carga**, SEO óptimo y 0 KB de JavaScript en el cliente por defecto, pero que requieren componentes interactivos de alta gama (*React Islands*).

---

## 1. Crear el Proyecto con Astro

```bash
# Crear proyecto Astro con TypeScript
pnpm create astro@latest portal-institucional --template minimal --typescript strict

cd portal-institucional
```

---

## 2. Agregar Integraciones y `@alcspower/ui`

Astro cuenta con integración oficial para React y Tailwind CSS:

```bash
# Agregar integración de React
pnpm astro add react

# Instalar Tailwind CSS v4 y su plugin de Vite
pnpm add -D tailwindcss @tailwindcss/vite

# Instalar @alcspower/ui y lucide-react
pnpm add @alcspower/ui lucide-react
```

---

## 3. Configurar Astro (`astro.config.mjs`)

Integra el plugin de Tailwind CSS v4 en la sección `vite` de Astro:

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

---

## 4. Configurar Estilos Globales (`src/styles/global.css`)

```css
@import "tailwindcss";
@import "@alcspower/ui/styles.css";

/* Configuración de fuente y suavizado */
html, body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: var(--alcspower-bg-app, #f8fafc);
  color: var(--alcspower-text-primary, #0f172a);
}

.dark html, .dark body {
  background-color: var(--alcspower-bg-app, #090d16);
  color: var(--alcspower-text-primary, #f8fafc);
}
```

---

## 5. Crear una Isla Interactiva en React (`src/components/InteractiveSearch.tsx`)

Creamos un componente de búsqueda interactiva utilizando `@alcspower/ui`:

```tsx
import React, { useState } from 'react';
import { Button, Input, Badge, Card, CardContent } from '@alcspower/ui';
import { Search, FileText } from 'lucide-react';

interface Tramite {
  id: string;
  titulo: string;
  categoria: string;
}

const TRAMITES_MOCK: Tramite[] = [
  { id: 'TR-01', titulo: 'Registro de Marcas y Patentes', categoria: 'Propiedad Intelectual' },
  { id: 'TR-02', titulo: 'Licencia de Importación Comercial', categoria: 'Comercio Exterior' },
  { id: 'TR-03', titulo: 'Certificado de Origen Digital', categoria: 'Exportaciones' },
  { id: 'TR-04', titulo: 'Permiso Sanitario de Distribución', categoria: 'Regulación' },
];

export function InteractiveSearch() {
  const [query, setQuery] = useState('');

  const filtrados = TRAMITES_MOCK.filter(t =>
    t.titulo.toLowerCase().includes(query.toLowerCase()) ||
    t.categoria.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Card className="w-full shadow-xs">
      <CardContent className="p-6 space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Buscar trámite, licencia o certificación..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button variant="primary" className="gap-2">
            <Search className="h-4 w-4" />
            Buscar
          </Button>
        </div>

        <div className="space-y-2 pt-2">
          {filtrados.length === 0 ? (
            <p className="text-sm text-slate-500 py-4 text-center">
              No se encontraron trámites que coincidan con la búsqueda.
            </p>
          ) : (
            filtrados.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/5 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.titulo}</p>
                    <p className="text-xs text-slate-500">Código: {item.id}</p>
                  </div>
                </div>
                <Badge variant="secondary">{item.categoria}</Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## 6. Consumir la Isla en una Página Astro (`src/pages/index.astro`)

En Astro, la mayor parte de la página es HTML puro estático súper rápido (0 JS). La isla interactiva se hidrata bajo demanda usando directivas como `client:load` o `client:visible`:

```astro
---
import '../styles/global.css';
import { InteractiveSearch } from '../components/InteractiveSearch';
---

<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Portal de Trámites y Servicios</title>
  </head>
  <body class="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
    <main class="max-w-4xl mx-auto space-y-8">
      {/* Contenido estático renderizado en el servidor (0 JS) */}
      <section class="text-center space-y-3">
        <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
          Servicios Digitales Oficiales
        </span>
        <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Directorio Nacional de Trámites
        </h1>
        <p class="text-base text-slate-600 max-w-2xl mx-auto">
          Consulte requisitos, inicie solicitudes y verifique el estado de sus trámites en línea.
        </p>
      </section>

      {/* Isla de React hidratada en el cliente con client:load */}
      <section>
        <InteractiveSearch client:load />
      </section>
    </main>
  </body>
</html>
```

---

## Directivas de Hidratación en Astro

| Directiva | Cuándo usarla con `@alcspower/ui` |
| :--- | :--- |
| `client:load` | Para componentes inmediatamente visibles que el usuario interactúa al entrar (ej. Barra de búsqueda o Hero form). |
| `client:visible` | Para componentes que están más abajo en la página (ej. `DataTable` o gráficos con `Recharts`), se hidratan solo al hacer scroll hacia ellos. |
| `client:idle` | Para modales de feedback o elementos secundarios que pueden esperar a que la red esté ociosa. |
