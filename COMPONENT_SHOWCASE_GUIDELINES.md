# Guía de Estándar Canónico para Secciones de Componentes en Showcase

> **Propósito:** Esta guía define la estructura obligatoria, jerarquía informativa y vistas de ejemplo que **cada componente** de `@alcspower/ui` debe presentar en el Showcase (`alcspower-showcase`) y en su documentación técnica.  
> Cualquier nuevo componente o refactorización de componentes existentes debe homologarse siguiendo estrictamente esta especificación.

---

## 🏛️ Anatomía General de la Sección de un Componente

Toda vista o demostración de componente en el catálogo visual debe componerse de **4 bloques obligatorios** en orden secuencial estricto:

```text
┌──────────────────────────────────────────────────────────────────────────┐
│  BLOQUE 1: HEADER & METADATOS TÉCNICOS                                   │
│  • Título oficial y alias funcional (ej: Stepper / Wizard)               │
│  • Badges de versión y arquitectura (ej: ✨ v1.6.2, WAI-ARIA + Compound) │
│  • Descripción funcional concisa orientada a casos de uso reales         │
│  • Ruta del código fuente en monospace                                  │
├──────────────────────────────────────────────────────────────────────────┤
│  BLOQUE 2: MUESTRAS ESTÁTICAS DE VARIANTES Y ESCALAS                    │
│  • 01. Variantes de Forma y Estilo (Circle vs Squircle / Outline / etc.)│
│  • 02. Escalas de Tamaño (size="sm" | "md" | "lg")                      │
│  • 03. Estados y Casos de Uso del Mundo Real (Flujos B2B / Errores / etc)│
├──────────────────────────────────────────────────────────────────────────┤
│  BLOQUE 3: PLAYGROUND INTERACTIVO EN TIEMPO REAL (SIEMPRE AL FINAL)     │
│  • Barra de controles interactivos (Paso/Valor, Orientación, Size, etc.) │
│  • Lienzo de previsualización en vivo                                    │
│  • Panel de contenido dinámico reactivo con feedback y acciones          │
├──────────────────────────────────────────────────────────────────────────┤
│  BLOQUE 4: FICHA TÉCNICA Y ANATOMÍA (Generado por ComponentSection)      │
│  • Tabla de Exports (piezas compuestas, hooks y utilidades CVA)          │
│  • Tabla de Variantes CVA con opciones y defaults                        │
│  • Tabla de Props tipadas, valores por defecto y notas de a11y           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Especificación Detallada de Cada Bloque

### 1. Header y Metadatos Técnicos
El encabezado debe incluir:
1. **Título Principal:** Nombre comercial y alias funcional separado por barra si aplica (`Stepper / Wizard`, `Timeline / ActivityLog`, `Tabs Component`).
2. **Badges:**
   - Badge de versión o rediseño: `✨ Nuevo v1.6.2`, `✨ v2.0 Rediseño`, etc.
   - Badge de tecnología: `Radix UI + CVA`, `WAI-ARIA + Compound`, `Tailwind CSS v4`.
3. **Descripción Funcional:** 1 o 2 líneas concisas explicando qué problema resuelve y sus capacidades clave.
4. **Ruta del Componente:** Etiqueta en monospace con la ruta exacta dentro del repositorio:
   ```text
   src/components/{categoría}/{componente}/{NombreComponente}.tsx
   ```

---

### 2. Muestras Estáticas de Variantes y Escalas (Numeradas: 01, 02, 03)

Antes de llegar al playground, el usuario debe ver los especímenes visuales estáticos agrupados por los ejes fundamentales del diseño:

#### `01. VARIANTES DE FORMA Y ESTILO`
* Expone las siluetas base del design system para consistencia visual entre componentes:
  - **`shape="circle"`** *(Redonda — Predeterminada)*: Silueta circular pura con halo simétrico.
  - **`shape="squircle"`** *(Bordes Suaves — `rounded-2xl` / `rounded-xl`)*: Variante contemporánea suavizada.
  - O variantes de estilo primario: `variant="solid" | "subtle" | "outline"` (o `underline`, `pill`, `segmented`).
* Cada muestra debe ir en su tarjeta con título explicativo de la variante y descripción sutil.

#### `02. ESCALAS DE TAMAÑO (SM, MD, LG) Y DENSIDAD`
* Debe presentar una comparativa simultánea de los 3 tamaños oficiales de `@alcspower/ui`:
  - **`size="lg"`**: Escala grande para encabezados principales, vistas de héroe o solicitudes prioritarias.
  - **`size="md"`**: Escala estándar recomendada para el 80% de los formularios e interfaces.
  - **`size="sm"`**: Escala compacta para diálogos, barras laterales o tablas de alta densidad de datos.

#### `03. ESTADOS Y CASOS DE USO DEL MUNDO REAL`
* Debe aterrizar el componente a escenarios corporativos y B2B reales:
  - **Estados Semánticos:** `completed` / `success` (esmeralda), `active` / `primary` (índigo), `warning` (ámbar), `error` / `destructive` (rojo) y `pending` / `neutral`.
  - **Disposición / Orientación:** Modo horizontal vs vertical, alternado o compacto.
  - **Composición con otros elementos:** Integración con `<Avatar>`, `<StatusBadge>`, badges contextuales, o áreas colapsables con metadatos.

---

### 3. Playground Interactivo en Tiempo Real (Siempre al Final de la Demostración)

El **Playground Interactivo es obligatorio** y **siempre se posiciona como la última sección visual** de la demostración antes de la ficha técnica.

#### Estructura del Playground:
1. **Encabezado del Bloque:**
   - Título: `04. PLAYGROUND INTERACTIVO EN TIEMPO REAL`
   - Subtítulo explicando que permite testear combinaciones de props en vivo.
2. **Barra de Controles (`Toolbar`):**
   - Dispuesta en grid responsivo (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`).
   - Botones estilo segmented/pill con estados activo/inactivo para:
     - **Paso / Estado Activo:** Selección directa del valor activo.
     - **Orientación / Disposición:** Horizontal / Vertical (o Default / Alternate).
     - **Tamaño:** Compact (`sm`), Default (`md`), Large (`lg`).
     - **Forma Visual:** Círculo (Redonda) / Squircle.
3. **Lienzo de Previsualización (`Preview Canvas`):**
   - Contenedor con borde (`border border-alcspower-border`) y fondo sutil (`bg-alcspower-surface-muted/20`) donde el componente se renderiza en vivo según los controles activos.
4. **Panel de Contenido Dinámico / Feedback:**
   - Tarjeta reactiva que responde a la interacción del usuario (muestra el contenido del ítem activo, botones de acción como *«Anterior»* y *«Siguiente»*, o confirmaciones).

---

### 4. Ficha Técnica y Anatomía
Renderizado automáticamente mediante el wrapper `ComponentSection` en `src/ui/ComponentSection.tsx` a partir de `src/data/registry.ts`:
* **Exports:** Listado de todos los símbolos públicos exportados (componentes compuestos, hooks, utilidades CVA).
* **Variantes CVA:** Grupos de variantes con sus opciones y valores por defecto.
* **Tabla de Props:** Nombre de la propiedad, tipo TypeScript exacto, valor predeterminado y notas de accesibilidad (WAI-ARIA).

---

## 🛠️ Guía de Homologación para Agentes (Checklist de Ejecución)

Al asignar la homologación de un componente existente o la creación de uno nuevo a un agente de IA:

- [ ] **1. Identificar el archivo demo en el Showcase:**  
  Ubicado en `src/demos/{Categoria}.tsx`.
- [ ] **2. Asegurar el orden secuencial estricto:**  
  Header → 01. Variantes de Forma/Estilo → 02. Escalas de Tamaño → 03. Estados y Casos de Uso → 04. Playground Interactivo al final.
- [ ] **3. Implementar el Playground Interactivo al final:**  
  Con botones de control segmented para estado activo, tamaño, orientación y forma, además del lienzo de previsualización reactivo.
- [ ] **4. Comprobar que no existan warnings de React:**  
  Asegurar que todas las listas o hijos clonados en `.map()` o `cloneElement` contengan `key` único.
- [ ] **5. Actualizar el registro del catálogo:**  
  Verificar que `src/data/registry.ts` contenga las props, variantes, resumen y exportaciones actualizadas.
- [ ] **6. Validar compilación y accesibilidad:**  
  Ejecutar `npm run build` en el showcase (0 errores de TypeScript) y `npm test` en `@alcspower/ui` (0 violaciones de `axe-core`).
