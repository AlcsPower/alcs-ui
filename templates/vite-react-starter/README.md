# 🚀 Starter Kit Oficial: `@alcspower/vite-react-starter`

Plantilla base oficial y lista para producción para inicializar aplicaciones web empresariales y plataformas corporativas con **React 19**, **Vite**, **Tailwind CSS v4** y el sistema de diseño **`@alcspower/ui`**.

---

## 📦 Características Incluidas

* ⚡ **React 19 & Vite 6:** Entorno de desarrollo ultrarrápido con Hot Module Replacement (HMR).
* 🎨 **Tailwind CSS v4:** Motor moderno sin archivo `tailwind.config.js`, basado en `@theme` y variables CSS semánticas.
* 🛡️ **Tipado Estricto con TypeScript 5:** Configuración estricta de compilador para aplicaciones B2B fiables.
* 🏛️ **Layout Empresarial B2B:**
  * Barra lateral colapsable (*Sidebar*) con navegación accesible y badges de conteo.
  * Cabecera flotante (*Header*) con migas de pan (*Breadcrumbs*), notificaciones y menú de usuario.
  * Selector de tema (Claro / Oscuro) con persistencia en `localStorage`.
* 📊 **Vistas de Ejemplo Funcionales:**
  * **Tablero de Control (Dashboard):** Tarjetas de métricas (KPIs), barras de avance (`Progress`), y lista de eventos con `StatusBadge`.
  * **Bandeja de Registros:** Tabla de datos con filtros en tiempo real, estados de color y acciones.
  * **Modal de Creación:** Formulario accesible con validación, selector (`Select`) y notificaciones flotantes con `toast`.

---

## 🛠️ Cómo Utilizar este Starter Kit

### 1. Copiar o Inicializar la Plantilla

Para iniciar un nuevo proyecto basado en este starter, copia el directorio `templates/vite-react-starter`:

```bash
# Ejemplo: Copiar la plantilla a un nuevo directorio de trabajo
cp -r templates/vite-react-starter ../mi-nuevo-sistema
cd ../mi-nuevo-sistema
```

### 2. Configurar Acceso a GitHub Packages

Asegúrate de que tu archivo `.npmrc` tenga configurado el token de acceso a `@alcspower`:

```ini
@alcspower:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 3. Instalar Dependencias

```bash
pnpm install
```

### 4. Iniciar Servidor de Desarrollo

```bash
pnpm dev
```

La aplicación estará disponible de inmediato en `http://localhost:3000/`.

---

## 📁 Estructura del Proyecto

```text
├── index.html                    # Documento HTML base
├── vite.config.ts                # Configuración de Vite con @tailwindcss/vite
├── tsconfig.json                 # Configuración de TypeScript con alias @/
└── src/
    ├── main.tsx                  # Punto de entrada de la aplicación
    ├── App.tsx                   # Layout y enrutamiento de vistas de ejemplo
    ├── types/                    # Modelos y contratos de TypeScript
    ├── styles/
    │   └── globals.css           # Directivas de Tailwind v4 y estilos de @alcspower/ui
    ├── components/
    │   ├── ThemeToggle.tsx       # Alternador de modo Claro / Oscuro
    │   └── layout/
    │       ├── AppLayout.tsx     # Contenedor maestro de la aplicación
    │       ├── Header.tsx        # Cabecera con perfil y migas de pan
    │       └── Sidebar.tsx       # Menú lateral colapsable
    └── views/
        ├── DashboardView.tsx     # Vista ejecutiva con KPIs y actividades
        ├── ExpedientesView.tsx   # Vista de tabla interactiva con filtros
        └── NuevoTramiteModal.tsx # Modal de captura de datos con toast
```

---

## 🎨 Personalización de Marca Corporativa

Para adaptar los colores primarios a la identidad de tu empresa u organización, simplemente edita `src/styles/globals.css`:

```css
@import "tailwindcss";
@import "@alcspower/ui/styles.css";

:root {
  /* Modificar el color de acento principal */
  --alcspower-primary: #1d4ed8;       /* Azul Corporativo */
  --alcspower-primary-hover: #1e40af;
}
```

---

## 📄 Licencia

MIT License © Alcides Altamirano (`AlcsPower`).
