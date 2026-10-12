# `@alcspower/ui` — React Design System & Reusable Component Library

<div align="center">

**🇪🇸 Español** &nbsp;|&nbsp; [🇺🇸 English](#english-summary)

</div>

---

Biblioteca modular, accesible y reutilizable de componentes de interfaz de usuario para aplicaciones web basadas en React.

Diseñada con soporte para **React 18** y **React 19**, tipado estricto en **TypeScript**, primitivas accesibles de **Radix UI**, iconografía con **Lucide React**, notificaciones fluidas con **Sonner**, paleta de comandos con **cmdk**, tablas con **TanStack Table**, gráficos con **Recharts** y un sistema de tokens de diseño semánticos distribuido en CSS precompilado. Es completamente compatible con aplicaciones consumidoras que utilicen **Tailwind CSS v3**, **Tailwind CSS v4** o **ningún framework CSS**.

---

## 📌 Contexto e Identidad

* **Nombre del Paquete:** `@alcspower/ui`
* **Versión Actual:** `1.4.0`
* **Autor / Creador:** Alcides Altamirano (`AlcsPower`)
* **Naturaleza del Proyecto:** Proyecto de iniciativa personal independiente para el desarrollo de un sistema de diseño modular, accesible y moderno para el ecosistema React.
* **Registros de Distribución:**
  * **npm:** [`https://www.npmjs.com/package/@alcspower/ui`](https://www.npmjs.com/package/@alcspower/ui) (verificar versión: `npm view @alcspower/ui version`)
  * **GitHub Packages:** `https://npm.pkg.github.com`
* **Repositorio GitHub:** [https://github.com/AlcsPower/alcs-ui](https://github.com/AlcsPower/alcs-ui)
* **Licencia del Paquete:** MIT License (Código abierto permisivo; autoría y titularidad de Alcides Altamirano / AlcsPower).
* **Contacto y Soporte:** Exclusivamente vía [GitHub Issues](https://github.com/AlcsPower/alcs-ui/issues) y [GitHub Discussions](https://github.com/AlcsPower/alcs-ui/discussions).
* **Independencia Arquitectónica:** La biblioteca no contiene lógica de negocio acoplada a proyectos específicos. Diseñada como un sistema de componentes puro, modular y reutilizable en cualquier aplicación web.

---

## 🎨 Filosofía y Estilo de Diseño

El estilo y lenguaje visual de `@alcspower/ui` se clasifica en los estándares contemporáneos de la industria como:

### 1. Nombre Principal: **Modern SaaS / Craft Minimalist**
*(También conocido en diseño de producto como **Elevated Flat** o **Modern Enterprise UI**)*.

Es el estándar de diseño de alta gama que popularizaron referentes líderes como **Linear**, **Untitled UI**, **Raycast**, **Vercel (Geist)** y **Stripe**.

No es el diseño plano rígido y monocromático de 2015, ni tampoco el "neumorfismo" pesado; es una evolución refinada orientada a la **productividad, ergonomía y elegancia funcional**.

> [!NOTE]
> **Definición de Síntesis del Sistema:**  
> *"Un sistema de diseño Craft Minimalist / Elevated Flat, con estética SaaS moderna y alta densidad ergonómica para aplicaciones empresariales."*

### 2. Los Pilares que Definen Este Estilo

| Pilar | Cómo se Refleja en `@alcspower/ui` |
| :--- | :--- |
| **Bordes finos y capas suaves** *(Hairline & Layering)* | Bordes de 1.5px nítidos con opacidades sutiles (`border-alcspower-border/70`), fondos con tintes suaves (`bg-primary/5`, `bg-surface-muted/30`) que separan secciones limpiamente sin saturar la vista. |
| **Micro-elevaciones** *(Soft Depth)* | Sombras muy delicadas (`shadow-2xs`, `shadow-xs`) para controles en reposo, y elevaciones flotantes limpias (`shadow-xl`, `shadow-2xl`) para popovers, menús contextuales y modales. |
| **Radios de curvatura ergonómicos** *(Generous Radii)* | Esquinas redondeadas contemporáneas (`rounded-xl`, `rounded-2xl` y `rounded-3xl` en tarjetas; `rounded-full` en chips y badges), lo que suaviza la interfaz y reduce la fatiga visual. |
| **Paleta "Cool Indigo & Slate"** | Un acento primario sofisticado (índigo/azul moderno) combinado con escalas de grises neutros/fríos (Slate/Zinc) y toques semánticos de alta legibilidad (esmeralda, rojo suave, ámbar). |
| **Micro-interacciones táctiles** *(Micro-Feedback)* | Efectos de pulsación sutiles (`active:scale-[0.98]`), chips animados, indicadores `<kbd>` de atajos de teclado y anillos de foco nítidos (`ring-2` / `ring-3`). |
| **Densidad y Ergonomía B2B** | Modos compactos para tablas y formularios densos (`size="sm"` de 32-36px), vistas bimestrales fijas para evitar saltos de layout, y atajos rápidos (*presets*). |

---

## 🏛️ Arquitectura de la Biblioteca

El sistema sigue una arquitectura por capas desacoplada inspirada en la filosofía de **shadcn/ui** y componentes atómicos basados en composición:

```text
React Components (Radix UI Primitives + Lucide + CVA + Sonner + Recharts)
                         ↓
           Design Tokens Semánticos
                         ↓
   CSS Custom Properties de Implementación (--alcspower-*)
                         ↓
  CSS Precompilado Encapsulado (@layer alcspower-tokens, alcspower-ui)
                         ↓
   Artefacto Distribuido en GitHub Packages (ESM / CJS / DTS / CSS)
```

### Principios Fundamentales
1. **Composición sobre Configuración:** Se favorece el uso de subcomponentes declarativos (e.g. `SheetContent`, `AccordionTrigger`, `CardHeader`) y el patrón `asChild` para composición polimórfica accesible.
2. **Cero Resets Globales Destructivos:** Los estilos se empaquetan dentro de `@layer alcspower-tokens` y `@layer alcspower-ui`, evitando alterar selectores globales como `body`, `html` o tablas de fuentes del consumidor.
3. **Distribución Autónoma:** Todo el CSS necesario está empaquetado en `@alcspower/ui/styles.css`. El consumidor no requiere duplicar archivos ni configuraciones internas de Tailwind.

---

## 🚀 Instalación

Puedes instalar `@alcspower/ui` directamente desde el registro oficial público de **npm** o mediante **GitHub Packages**.

### 1. Instalación Directa desde npm (Recomendado)

El paquete está publicado en el registro público de npm. Puedes verificar la versión disponible ejecutando:

```bash
npm view @alcspower/ui version
# Salida esperada: 1.4.0
```

Instálalo en tu proyecto usando tu gestor de paquetes favorito:

```bash
# Con pnpm (recomendado):
pnpm add @alcspower/ui@1.4.0

# Con npm:
npm install @alcspower/ui@1.4.0

# Con yarn:
yarn add @alcspower/ui@1.4.0
```

### 2. Instalación Alternativa desde GitHub Packages

Si tu organización utiliza GitHub Packages (`https://npm.pkg.github.com`), configura el registro en el archivo `.npmrc` de tu proyecto:

```ini
@alcspower:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

> [!IMPORTANT]
> **Buenas Prácticas de Seguridad:**
> * Utiliza la referencia a variable de entorno `${NODE_AUTH_TOKEN}` o `${GITHUB_TOKEN}`.
> * Asegúrate de que el token cuente con el permiso mínimo `read:packages`.
> * Nunca subas archivos con credenciales en texto plano al control de versiones (Git).

### 3. Instalación en Entornos Offline / Air-Gapped (Sin Acceso a Internet)

Para despliegues institucionales o gubernamentales en redes aisladas (*air-gapped*), `@alcspower/ui` se distribuye como un paquete totalmente autónomo (*Self-Contained Bundle*). Sus dependencias secundarias vienen inyectadas en el bundle compilado y sus licencias legales MIT/ISC/Apache-2.0 están compiladas en [`THIRD_PARTY_LICENSES.md`](THIRD_PARTY_LICENSES.md).

```bash
# Copia el paquete .tgz en tu entorno e instala localmente:
pnpm add ./alcspower-ui-1.4.0.tgz

# O con npm:
npm install ./alcspower-ui-1.4.0.tgz
```

> [!NOTE]
> La instalación local no consulta ningún registro de red. Solo requiere que el proyecto consumidor provea `react` y `react-dom` (v18 o v19).

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
  Toaster,
  toast,
  Sheet,
  SheetTrigger,
  SheetContent
} from '@alcspower/ui';

export function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Card className="max-w-md mx-auto my-8">
        <CardHeader>
          <CardTitle>Plataforma Ministerial</CardTitle>
          <CardDescription>Gestión centralizada de expedientes y trámites.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="primary" onClick={() => toast.success('Expediente creado correctamente')}>
            Crear Expediente
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
```

---

## 📖 Recetas de Integración Rápida (Cookbook)

Guías paso a paso para adoptar `@alcspower/ui` en diferentes entornos modernos y legados:

* ⚡ **[React 19 + Vite + Tailwind CSS v4](docs/recipes/react-vite.md):** Guía estándar para nuevas SPAs modernas y dashboards B2B de alto rendimiento.
* 🚀 **[Astro + React Islands](docs/recipes/astro.md):** Portales informativos e institucionales ultrarrápidos con 0 KB de JS inicial e hidratación interactiva bajo demanda.
* 🏢 **[Modernización en .NET (Web Forms, VB.NET, C# y Razor)](docs/recipes/dotnet-aspnet.md):** Integración sin reescribir lógica de backend; modernización visual con tokens CSS o islas interactivas para sistemas legados.
* 🎨 **[Tailwind CSS v4 & Personalización de Tokens](docs/recipes/tailwind-v4.md):** Configuración de temas institucionales con `@theme`, variables semánticas `--alcspower-*` y modo oscuro.

### 🌟 Starter Kit Oficial (Listo para Producción)

Si deseas iniciar un nuevo proyecto ministerial o empresarial en menos de un minuto con todo preconfigurado (Layout con Sidebar colapsable, Header, Selector Claro/Oscuro, Dashboard de KPIs y Tabla de Expedientes), consulta el template oficial:

👉 **[`templates/vite-react-starter`](templates/vite-react-starter/README.md)**

---

## 🎓 Instructivo para Principiantes

¿Estás comenzando a programar? ¿Quieres aprender React construyendo algo real desde cero?

El directorio **[`docs/instructivo/`](docs/instructivo/README.md)** contiene un curso paso a paso, nivel principiante absoluto, diseñado para aprender `@alcspower/ui` **haciendo un proyecto real**: una **Agenda de Contactos** completa.

| Idioma | Enlace |
| :--- | :--- |
| 🇪🇸 **Español** | [`docs/instructivo/es/README.md`](docs/instructivo/es/README.md) |
| 🇺🇸 **English** | [`docs/instructivo/en/README.md`](docs/instructivo/en/README.md) |

### ¿Qué cubre el instructivo?

10 módulos progresivos que van de lo más simple a lo más avanzado:

| # | Módulo | Componentes | Nivel |
| :-- | :--- | :--- | :---: |
| 00 | Introducción — ¿Qué es todo esto? | — | — |
| 01 | Instalación y configuración | Node.js, pnpm, Vite | — |
| 02 | Tu primer componente | `Button`, `Badge`, `Avatar` | 🟢 |
| 03 | Formularios | `Input`, `Select`, `Checkbox`, `Switch` | 🟢 |
| 04 | Layout y Cards | `Card`, `Tabs`, `Separator` | 🟢 |
| 05 | Feedback | `Alert`, `Toast`, `Spinner`, `Skeleton`, `Progress` | 🟡 |
| 06 | Overlays | `Dialog`, `Tooltip`, `DropdownMenu` | 🟡 |
| 07 | Datos | `Table`, `StatusBadge`, `Pagination` | 🟡 |
| 08 | Navegación | `Accordion`, `Breadcrumb`, `Stepper` | 🟡 |
| 09 | Proyecto Final | Todo integrado — Agenda completa | 🔴 |

> [!NOTE]
> El instructivo está diseñado para personas que nunca han programado. Cada módulo incluye analogías del mundo real, código comentado línea por línea, sección de errores comunes y ejercicios prácticos.

---

## 📚 Catálogo Completo de Componentes (59+ Componentes)

Todos los componentes han sido verificados mediante pruebas unitarias exhaustivas, comprobación estricta de tipado con TypeScript y auditorías de accesibilidad automatizada con **axe-core** (100% pruebas aprobadas, **0 violaciones de accesibilidad detectadas**).

### 1. Formularios (Forms)
* **`Button`:** Botón interactivo con 6 variantes semánticas (`primary`, `secondary`, `outline`, `ghost`, `destructive`, `link`), 4 tamaños (`sm`, `md`, `lg`, `icon`), estado de carga reactivo (`isLoading`) y delegación polimórfica `asChild`.
* **`Field` (Primitivo Compuesto):** Contenedor accesible (`Field`, `FieldLabel`, `FieldControl`, `FieldHint`, `FieldError`) que coordina identificadores deterministas y asociaciones ARIA (`aria-describedby`, `aria-invalid`).
* **`Input`:** Campo de texto accesible con escala métrica simétrica (`sm: h-8`, `md: h-10`, `lg: h-12`), slots para `leftElement`/`rightElement` y variantes de validación.
* **`NumberInput`:** Control numérico accesible conforme a WAI-ARIA (`role="spinbutton"`), aceleración continua por pulsación sostenida (*long-press*), 4 disposiciones de steppers (`stacked`, `split`, `inline-right`, `none`), soporte de `prefix`/`suffix`, precisión decimal segura contra punto flotante IEEE 754 y atajos de teclado (`Shift+Arrows`, `Home`, `End`, `PageUp/Down`).
* **`TagsInput`:** Entrada interactiva de etiquetas tipo chip con delimitadores de teclado (`Enter`, `,`), prevención de duplicados, límite máximo (`maxTags`), formas (`squircle`, `rounded`) y botón de limpieza rápida con icono semántico `Broom` (escoba).
* **`OTPInput`:** Entrada moderna de códigos de verificación/PIN con esquinas proporcionales a la escala (`sm: 10px`, `md: 12px`, `lg: 14px`), elevación táctil al foco, halos cromáticos reactivos (índigo en foco, sacudida carmesí en error, esmeralda en éxito), texto de estado descriptivo con iconografía automática y separadores configurables (`dash`, `dot`, `space`).
* **`FileUpload`:** Zona de carga de archivos por arrastrar y soltar (*dropzone*) o explorador nativo, previsualizaciones, estados de progreso y lista interactiva de adjuntos.
* **`PasswordInput`:** Campo de contraseña con botón accesible para conmutar visibilidad (mostrar/ocultar), soporte de atajos y escala de tamaños.
* **`SearchInput`:** Campo de búsqueda ergonómico con icono de lupa, atajo visual `<kbd>`, botón de borrado inmediato y estado de carga.
* **`Textarea`:** Área de texto multilínea con escala de altura y foco accesible.
* **`Label`:** Etiqueta accesible basada en Radix UI con soporte de indicador `required`.
* **`RadioGroup`:** Grupo de opciones de selección única accesible basado en `@radix-ui/react-radio-group`, con navegación bidireccional por teclado (`Arrow keys`), indicador circular animado y soporte de validación/error.
* **`Slider`:** Control deslizante de rango numérico accesible basado en `@radix-ui/react-slider`, con soporte para etiquetas ARIA delegadas al thumb, paso incremental y orientación horizontal.
* **`Toggle`:** Botón de dos estados presionado/no presionado accesible basado en `@radix-ui/react-toggle` con variantes (`default`, `outline`) y escala de tamaños (`sm`, `md`, `lg`).
* **`ToggleGroup`:** Grupo de conmutadores con selección simple o múltiple basado en `@radix-ui/react-toggle-group`, propagación de variantes y soporte de navegación por teclado.

### 2. Controles y Datos Básicos (Controls)
* **`Badge`:** Insignia compacta para categorización y estados con 7 variantes semánticas.
* **`StatusBadge`:** Insignia especializada para estados operativos con indicador visual tipo punto y variantes semánticas.
* **`Card`:** Contenedor modular con elevación tenue y piezas semánticas (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
* **`Avatar`:** Representación de perfil con escala de tamaños (`sm`, `md`, `lg`, `xl`), carga de imagen y fallback automático de iniciales.
* **`Checkbox`:** Control binario accesible con escala métrica de tamaño (`sm`, `md`, `lg`) basado en `@radix-ui/react-checkbox`.
* **`Switch`:** Interruptor booleano accesible con animaciones fluidas basado en `@radix-ui/react-switch`.
* **`Select`:** Menú desplegable con navegación por teclado y portales basado en `@radix-ui/react-select`.
* **`Timeline`:** Línea de tiempo interactiva para auditoría de eventos y seguimiento procesal con conectores continuos e iconografía semántica.
* **`Kbd`:** Insignia visual accesible de atajos de teclado con micro-relieve táctil y variantes de plataforma.

### 3. Capas Superpuestas y Paneles (Overlays)
* **`AlertDialog` & `ConfirmDialog`:** Diálogos modales accesibles para confirmaciones críticas o advertencias irreversibles con foco predeterminado en el botón Cancelar, variantes semánticas (`destructive`, `warning`, `info`) y envoltura de alto nivel `ConfirmDialog` con manejo asíncrono de promesas y spinner integrado.
* **`Dialog`:** Ventana modal accesible con trampa de foco (`focus trap`), bloqueo de scroll y atajo de escape.
* **`Sheet`:** Panel deslizante modal o no modal con variantes direccionales (`side="right" | "left" | "top" | "bottom"`), backdrop con desenfoque suave y animaciones fluidas de entrada y salida.
* **`Drawer`:** Panel deslizante inferior responsivo optimizado para interfaces móviles y acciones rápidas, equipado con tirador táctil visual (`DrawerHandle`) y estructura semántica completa.
* **`Popover`:** Primitiva flotante accesible para menús y paneles emergentes basada en `@radix-ui/react-popover`.
* **`DropdownMenu`:** Menú contextual desplegable con atajos de teclado, submenús y opciones de selección.
* **`ContextMenu`:** Menú flotante desplegado con clic derecho basado en `@radix-ui/react-context-menu`, con soporte para atajos de teclado (`ContextMenuShortcut`), submenús, ítems de verificación (`ContextMenuCheckboxItem`), grupos de radio (`ContextMenuRadioGroup`) y acciones destructivas.
* **`Tooltip`:** Mensaje contextual flotante accesible activado por hover o foco por teclado.
* **`Alert`:** Banner de notificación con iconografía institucional y variantes de estado (`info`, `success`, `warning`, `destructive`).

### 4. Navegación y Estructura (Navigation & Layout)
* **`Breadcrumb`:** Jerarquía de navegación accesible orientada a WAI-ARIA (`Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`) con soporte polimórfico `asChild` para enrutadores SPA (React Router, Next.js).
* **`Tabs`:** Pestañas accesibles con soporte ARIA para selección activa y cambio de vistas (`TabsList`, `TabsTrigger`, `TabsContent`).
* **`Accordion`:** Contenedor de paneles expandibles basado en `@radix-ui/react-accordion`. Soporta modo simple (`type="single"`) o múltiple (`type="multiple"`), chevron rotativo animado y navegación íntegra por teclado.
* **`Collapsible`:** Primitiva interactiva ligera basada en `@radix-ui/react-collapsible` para expandir y colapsar secciones, filtros avanzados y detalles.
* **`Stepper`:** Guía interactiva de pasos para formularios secuenciales (*wizards*) con gestión de estados activo, completado y pendiente.
* **`Pagination`:** Sistema de paginación accesible con soporte de páginas previas/siguientes y elipsis interactiva.
* **`Separator`:** Divisor horizontal o vertical semántico basado en `@radix-ui/react-separator`.

### 5. Retroalimentación (Feedback)
* **`Toaster` & `toast`:** Sistema completo de notificaciones apilables tipo Toast basado en `sonner`. Ofrece soporte de tema claro/oscuro, barra de progreso, métodos semánticos (`toast.success()`, `toast.error()`, `toast.warning()`, `toast.info()`, `toast.promise()`), y botones de acción y cancelación estilizados con tokens semánticos.
* **`LoadingOverlay`:** Capa de bloqueo y carga con backdrop translúcido y anunciador accesible para lectores de pantalla.
* **`EmptyState`:** Pantalla de estado vacío orientada a la acción con icono, título, descripción y botones personalizables.
* **`ErrorState`:** Pantalla de error accesible con atributo `role="alert"` y opciones de reintento.
* **`Progress`:** Barra de progreso con estados semánticos, tamaño configurable y animación indeterminada integrada.
* **`Skeleton`:** Marcador de posición con efecto pulsante suave para carga asíncrona de esqueletos de interfaz.
* **`Spinner`:** Indicador circular animado con escala métrica de tamaños.

### 6. Datos (Data)
* **`Table`:** Primitivos de tabla HTML estilizados y accesibles (`TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`).
* **`DataTable`:** Tabla empresarial de alto rendimiento con `@tanstack/react-table`, soporte para ordenamiento, paginación, búsqueda, selección masiva de filas y visibilidad dinámica de columnas.

### 7. Fechas y Tiempo (Dates & Time)
* **`Calendar`:** Calendario interactivo basado en `react-day-picker` v10 y `date-fns`, con localización en español por defecto, selección simple, múltiple o por rango, y lista integrada de eventos y citas (`CalendarEventList`).
* **`DatePicker`:** Selector de fecha individual con botón disparador de calendario interactivo, soporte para formato configurable (`dd/MM/yyyy`), integración directa con `Field` y escala de tamaños (`sm`, `md`, `lg`).
* **`DateRangePicker`:** Selector bimestral de rango de fechas con panel de atajos rápidos (Hoy, Ayer, Últimos 7 días, Últimos 30 días, Este mes, Mes anterior).

### 8. Comandos y Selección Avanzada (Commands & Advanced Select)
* **`Command` & `CommandDialog`:** Paleta modal interactiva de comandos tipo `⌘K` / `Ctrl+K` basada en `cmdk`, con búsqueda en tiempo real, grupos, atajos de teclado y navegación fluida.
* **`Combobox`:** Selector con campo de búsqueda integrado en popover, filtrado en tiempo real y soporte para selección múltiple con chips interactivos (`Badge`) removibles.

### 9. Visualización y Gráficos (Data Visualization)
* **`Chart`:** Módulo de gráficos institucionales basado en Recharts (`BarChart`, `LineChart`, `AreaChart`, `PieChart`), con contenedor responsivo (`ChartContainer`), paleta cromática semántica (`--color-alcspower-chart-1` a `5`) y soporte automático para modo oscuro.

### 10. Métricas y Dashboards (Metrics)
* **`MetricCard`:** Tarjeta de KPI empresarial con valor principal, título, descripción, indicador delta y slot para gráficos de tendencia.
* **`StatCard`:** Tarjeta compacta para indicadores cuantitativos con iconos semánticos.
* **`DeltaIndicator`:** Indicador numérico de variación porcentual con flechas y estilos semánticos (positivo, negativo, neutro).

### 11. Accesibilidad y Utilidades
* **`VisuallyHidden`:** Oculta visualmente un elemento manteniéndolo completamente audible para tecnologías de asistencia (lectores de pantalla) según directrices WCAG.
* **`cn`:** Utilidad optimizada que fusiona `clsx` y `tailwind-merge` respetando la configuración semántica del sistema.

---

## 🎨 Sistema de Tokens de Diseño

La biblioteca define su sistema visual a partir de **conceptos semánticos** que desacoplan los componentes de valores de color fijos:

### 1. Tokens Semánticos de Color

| Concepto Semántico | Variable CSS | Modo Claro (`:root`) | Modo Oscuro (`.dark`) | Uso Principal |
| :--- | :--- | :--- | :--- | :--- |
| `background` | `--alcspower-background` | `#f8fafc` | `#090d16` | Lienzo de fondo general |
| `foreground` | `--alcspower-foreground` | `#0f172a` | `#f8fafc` | Color de texto principal |
| `surface` | `--alcspower-surface` | `#ffffff` | `#0f172a` | Superficie de controles, modales, toasts |
| `surface-card` | `--alcspower-surface-card` | `#ffffff` | `#131d31` | Superficie de tarjetas y paneles |
| `surface-muted`| `--alcspower-surface-muted`| `#f1f5f9` | `#1e293b` | Fondos secundarios y contenedores sutiles |
| `primary` | `--alcspower-primary` | `#2563eb` | `#38bdf8` | Color primario oficial por defecto (personalizable por el consumidor) |
| `primary-foreground` | `--alcspower-primary-foreground` | `#ffffff` | `#082f49` | Texto legible sobre fondos primarios |
| `primary-hover`| `--alcspower-primary-hover` | `#1d4ed8` | `#0ea5e9` | Hover de acciones principales |
| `secondary` | `--alcspower-secondary` | `#f1f5f9` | `#1e293b` | Acciones secundarias y badges neutrales |
| `destructive` | `--alcspower-destructive` | `#dc2626` | `#ef4444` | Errores, alertas críticas y acciones destructivas |
| `success` | `--alcspower-success` | `#15803d` | `#4ade80` | Estados completados y confirmación |
| `warning` | `--alcspower-warning` | `#b45309` | `#fbbf24` | Advertencias y atención requerida |
| `info` | `--alcspower-info` | `#0369a1` | `#38bdf8` | Mensajes y badges informativos |
| `border` | `--alcspower-border` | `#e2e8f0` | `#334155` | Bordes estructurales y divisores |
| `border-strong` | `--alcspower-border-strong` | `#cbd5e1` | `#475569` | Bordes reforzados en hover e interacción |
| `overlay` | `--alcspower-overlay` | `rgba(0, 0, 0, 0.5)` | `rgba(0, 0, 0, 0.7)` | Fondo de oscurecimiento en modales y paneles |
| `ring` | `--alcspower-ring` | `#2563eb` | `#38bdf8` | Anillo visible de foco accesible |

### 2. Escala Geométrica de Radios (Border Radius)
* **Pequeño (`sm`):** `4px` — Indicadores, insignias compactas (`Badge`).
* **Mediano (`md`):** `6px` — Botones (`Button`), inputs (`Input`), selectores (`Select`) y pestañas (`Tabs`).
* **Grande (`lg`):** `8px` — Tarjetas (`Card`), diálogos (`Dialog`), paneles (`Sheet`), toasts (`Toast`).
* **Completo (`full`):** `9999px` — Avatares (`Avatar`), conmutadores (`Switch`) y tiradores (`DrawerHandle`).

### 3. Escala Semántica de Elevación y Sombras (Box Shadow)
* **`shadow-sm`:** Elevación sutil para controles interactivos en reposo.
* **`shadow-md`:** Elevación intermedia para menús flotantes, popovers y selectores.
* **`shadow-lg`:** Elevación pronunciada para ventanas modales, paneles laterales (`Sheet`) y toasts flotantes.

---

## ♿ Accesibilidad y Calidad

* **Cumplimiento Normativo:** Estándar **WCAG 2.1 / 2.2 Nivel AA / AAA**.
* **Gestión de Foco:** Atrapamiento de foco en modales y paneles deslizantes (`Sheet`, `Dialog`, `CommandDialog`), retorno automático de foco al elemento disparador tras el cierre.
* **Movimiento Reducido:** Respeto global automático para `prefers-reduced-motion: reduce` en todas las animaciones y transiciones de la biblioteca.
* **Teclado:** Navegación por teclado completa (Tab, Flechas arriba/abajo/izquierda/derecha en listas, acordeones y pestañas, Escape, Enter, Espacio).
* **Verificación Automatizada:** Suite de pruebas con Vitest y `@testing-library/react` combinada con auditorías completas de **axe-core** (50 suites de pruebas, **353/353 pruebas pasando con 0 violaciones**).

---

## 📦 Especificación Técnica del Paquete

* **Entry point ESM:** `./dist/index.js` (ECMAScript 2022)
* **Entry point CJS:** `./dist/index.cjs` (CommonJS para compatibilidad retroactiva)
* **Definiciones TypeScript:** `./dist/index.d.ts` y `./dist/index.d.cts`
* **Estilos Distribuidos:** `./dist/styles.css` (Tailwind CSS v4 precompilado y minificado)
* **Side Effects:** Delimitados a archivos CSS (`**/*.css`, `./dist/styles.css`).

---

## 🛠️ Comandos de Desarrollo del Repositorio

| Comando | Propósito |
| :--- | :--- |
| `pnpm dev` | Inicia la compilación continua de la biblioteca con `tsup --watch` |
| `pnpm build` | Compila bundles JS/DTS con limpieza previa (`build:js`) y genera el CSS minificado (`build:css`) |
| `pnpm build:js` | Ejecuta `tsup` para generar bundles ESM, CJS y definiciones de tipos `.d.ts` |
| `pnpm build:css` | Compila y minifica `src/styles/index.css` hacia `dist/styles.css` con Tailwind CSS v4 |
| `pnpm test` | Ejecuta la suite de pruebas unitarias y de accesibilidad con Vitest |
| `pnpm test:watch` | Ejecuta Vitest en modo interactivo/vigilante |
| `pnpm test:coverage` | Genera reporte de cobertura de código con Vitest y `@vitest/coverage-v8` |
| `pnpm typecheck` | Ejecuta la comprobación estricta de tipos de TypeScript con `tsc --noEmit` |
| `pnpm storybook` | Inicia el servidor de desarrollo local de Storybook |
| `pnpm build-storybook` | Genera la versión estática de Storybook en `dist-storybook/` |
| `pnpm changeset` | Herramienta interactiva para documentar cambios de versiones con Changesets |

---

## 📜 Licencia, Seguridad y Enlaces

* **Licencia:** MIT License (Código abierto, Copyright © 2026 Alcides Altamirano / AlcsPower). Consulta el archivo [LICENSE](LICENSE) para más detalles.
* **Política de Seguridad:** Consulta [SECURITY.md](SECURITY.md) para el reporte responsable de vulnerabilidades y buenas prácticas de consumo seguro.
* **Hoja de Ruta (Roadmap):** Consulta [ROADMAP.md](ROADMAP.md) para conocer las características y componentes planificados para el ciclo v1.x.
* **Autor / Creador:** Alcides Altamirano ([@AlcsPower](https://github.com/AlcsPower))
* **Repositorio GitHub:** [https://github.com/AlcsPower/alcs-ui](https://github.com/AlcsPower/alcs-ui)
* **Registro Público npm:** [https://www.npmjs.com/package/@alcspower/ui](https://www.npmjs.com/package/@alcspower/ui) (`npm view @alcspower/ui version`)
* **Registro GitHub Packages:** [https://npm.pkg.github.com/@alcspower/ui](https://npm.pkg.github.com/@alcspower/ui)
* **Canal Oficial de Contacto y Dudas:** [GitHub Discussions](https://github.com/AlcsPower/alcs-ui/discussions)
* **Reporte de Incidencias y Bugs:** [GitHub Issues](https://github.com/AlcsPower/alcs-ui/issues)

---

<div id="english-summary"></div>

## 🇺🇸 English Summary

### About `@alcspower/ui`

`@alcspower/ui` is an accessible, modern, enterprise-ready React component library and design system built with:
* **React 18 & React 19** support
* **TypeScript** strict typing
* **Radix UI** accessible primitives
* **Tailwind CSS v4** & semantic design tokens
* **Lucide React**, **Sonner**, **cmdk**, **TanStack Table**, and **Recharts**

### Quick Install

```bash
# Check published version on npm:
npm view @alcspower/ui version

# Install via pnpm:
pnpm add @alcspower/ui@1.4.0

# Or via npm:
npm install @alcspower/ui@1.4.0
```

### Basic Usage

```tsx
import React from 'react';
import '@alcspower/ui/styles.css';
import { Button, Card, CardHeader, CardTitle, CardContent, Toaster, toast } from '@alcspower/ui';

export function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Card className="max-w-md mx-auto my-8">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="primary" onClick={() => toast.success('Action successful!')}>
            Click Me
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
```

### 🎓 Beginner Tutorial & Guide

A complete, 10-module step-by-step tutorial for total beginners is available:
* 🇺🇸 **English Tutorial:** [`docs/instructivo/en/README.md`](docs/instructivo/en/README.md)
* 🇪🇸 **Guía en Español:** [`docs/instructivo/es/README.md`](docs/instructivo/es/README.md)

### Contact & Community

All communication, questions, and feedback are handled exclusively via GitHub:
* 💬 **Discussions & Questions:** [GitHub Discussions](https://github.com/AlcsPower/alcs-ui/discussions)
* 🐛 **Bug Reports:** [GitHub Issues](https://github.com/AlcsPower/alcs-ui/issues)
* 🔒 **Security Reports:** [GitHub Security Advisories](https://github.com/AlcsPower/alcs-ui/security/advisories/new)

