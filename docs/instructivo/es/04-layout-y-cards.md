# Capítulo 4: Layout y Cards - Organizando tu aplicación

¡Te damos la bienvenida al capítulo 4! Si has llegado hasta aquí, ya sabes cómo crear botones interactivos, campos de texto y elementos básicos de diseño. Sin embargo, en una aplicación real no puedes simplemente colocar botones y textos flotando libremente en la pantalla: tu interfaz se vería caótica y desordenada.

Aquí es donde entra en juego la **organización espacial** y la **jerarquía visual**. En este capítulo aprenderás a usar componentes diseñados específicamente para estructurar tu información en bloques limpios, modernos y fáciles de digerir.

---

## 📚 Lo que aprenderás en este capítulo

1. **La analogía del diseño físico**: Cómo pensar en tu interfaz como una habitación ordenada o un escritorio de trabajo.
2. **El componente `Card` en profundidad**:
   - Qué es y por qué toda aplicación moderna lo usa.
   - Anatomía completa: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` y `CardFooter`.
   - Buenas prácticas de composición y variantes de diseño.
3. **El componente `Tabs` (Pestañas)**:
   - Analogía con carpetas de un archivador físico.
   - Manejo de pestañas no controladas (`defaultValue`) y controladas (`value` con `useState`).
   - Cómo cambiar de vista sin recargar la página ni complicarte con rutas.
4. **El componente `Separator` (Separador)**:
   - Crear pausas visuales sutiles tanto horizontales como verticales.
5. **Mini-proyecto práctico**: La pantalla principal de una Agenda de Contactos con pestañas, tarjetas y separadores.
6. **¿Qué puede salir mal?**: Errores típicos de principiantes y cómo resolverlos rápidamente.
7. **Ejercicio interactivo**: Desafío práctico para consolidar tus conocimientos.

---

## 1. Organizando tu aplicación como una habitación

Imagina que entras a una oficina donde todos los papeles, bolígrafos, engrapadoras y tazas de café están tirados sobre una sola mesa sin ningún orden. Sería imposible trabajar ahí, ¿verdad? 

En la vida real resolvemos el desorden agrupando objetos relacionados:
- Los documentos de un cliente van dentro de una **carpeta o fólder**.
- En el escritorio usamos **bandejas** para separar lo urgente de lo secundario.
- En un archivador usamos **etiquetas o pestañas** para saltar de una categoría a otra sin mezclar los papeles.

En el diseño web ocurre exactamente lo mismo:
- Una **`Card` (tarjeta)** es esa carpeta o caja donde agrupas la información de un elemento particular (un producto, un perfil de usuario o un formulario de contacto).
- Los **`Tabs` (pestañas)** son las divisiones del archivador que permiten ver un grupo de información a la vez sin saturar la pantalla.
- El **`Separator`** es una línea divisoria limpia que actúa como un respiro visual entre dos secciones que conviven en el mismo espacio.

Con estos tres componentes de `@alcspower/ui`, transformarás una pantalla saturada en una interfaz limpia, comprensible y profesional.

---

## 2. El componente `Card`: La unidad básica de organización

### ¿Qué es una Card?

Una tarjeta (**Card**) es una superficie rectangular elevada o con borde que delimita visualmente un conjunto de contenidos relacionados. Piensa en una tarjeta de presentación física o en una tarjeta coleccionable: contiene una foto, un título, datos clave y tal vez un botón de acción en la parte inferior.

En `@alcspower/ui`, la tarjeta no es un bloque monolítico y rígido. En su lugar, está compuesta por **subcomponentes modulares** que puedes combinar libremente.

### Anatomía de una Card

Una tarjeta completa cuenta con los siguientes componentes:

| Subcomponente | Función en la interfaz | Analogía en el mundo real |
| :--- | :--- | :--- |
| `Card` | Contenedor principal exterior con bordes y fondo. | La caja o cartulina física. |
| `CardHeader` | Contenedor superior para el encabezado. | La cabecera o membrete del documento. |
| `CardTitle` | Título principal en tipografía destacada. | El titular en negrita de la portada. |
| `CardDescription` | Texto secundario o bajada explicativa. | El subtítulo o resumen breve. |
| `CardContent` | El cuerpo principal donde va el contenido rico. | Las hojas o contenido dentro de la carpeta. |
| `CardFooter` | Sección inferior, ideal para botones de acción. | El pie de página o firma del documento. |

### Importación básica

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@alcspower/ui';
```

### Ejemplo fundamental comentado

Veamos cómo estructurar una tarjeta de contacto paso a paso:

```tsx
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from '@alcspower/ui';

export function TarjetaContactoBasica() {
  return (
    // Contenedor principal de la tarjeta: define bordes, esquinas redondeadas y sombra
    <Card className="w-full max-w-md shadow-sm">
      {/* Encabezado: agrupa el título y la descripción */}
      <CardHeader>
        <CardTitle>Ana García Martínez</CardTitle>
        <CardDescription>Directora de Operaciones • Sede Central</CardDescription>
      </CardHeader>

      {/* Contenido principal: aquí colocamos los datos relevantes */}
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">Correo:</strong> ana.garcia@empresa.com
        </p>
        <p>
          <strong className="text-foreground">Teléfono:</strong> +1 (555) 888-0123
        </p>
        <p>
          <strong className="text-foreground">Área:</strong> Logística y Distribución
        </p>
      </CardContent>

      {/* Pie de la tarjeta: ideal para colocar botones o llamadas a la acción */}
      <CardFooter className="flex justify-end gap-2 border-t pt-4">
        <Button variant="outline" size="sm">
          Llamar
        </Button>
        <Button size="sm">
          Enviar Mensaje
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Variaciones comunes de uso

No todas las tarjetas necesitan todas las piezas. La magia de la arquitectura modular es que puedes prescindir de las partes que no necesites:

#### 1. Tarjeta simple de contenido (sin footer ni descripción)
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@alcspower/ui';

export function TarjetaEstadistica() {
  return (
    <Card className="p-4">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Contactos Totales
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="text-3xl font-bold">1,248</div>
        <p className="text-xs text-green-600 font-medium mt-1">
          +12% respecto al mes anterior
        </p>
      </CardContent>
    </Card>
  );
}
```

#### 2. Tarjeta de acción rápida (con foco interactivo)
```tsx
import { Card, CardContent } from '@alcspower/ui';

export function TarjetaAccionRapida({ titulo, icono }: { titulo: string; icono: string }) {
  return (
    <Card className="hover:border-primary cursor-pointer transition-all hover:shadow-md">
      <CardContent className="flex items-center gap-4 p-6">
        <span className="text-3xl">{icono}</span>
        <div>
          <h4 className="font-semibold text-foreground">{titulo}</h4>
          <p className="text-xs text-muted-foreground">Haz clic para comenzar</p>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## 3. El componente `Tabs`: Pestañas para segmentar información

### ¿Qué son los Tabs?

Imagina un archivador físico con separadores etiquetados con colores: *A-F*, *G-M*, *N-Z*. Cuando quieres buscar un contacto, no sacas todos los expedientes al mismo tiempo; abres únicamente la sección que te interesa.

Los **Tabs** cumplen exactamente esa función en pantalla:
- Evitan que el usuario tenga que hacer un scroll kilométrico para encontrar lo que busca.
- Agrupan modos de trabajo (por ejemplo: "Ver lista existente" vs "Crear un nuevo registro").
- Mantienen al usuario en el mismo contexto mental sin obligarte a navegar a otra URL.

### Anatomía de los Tabs

En `@alcspower/ui`, el sistema de pestañas utiliza cuatro piezas clave:

1. **`Tabs`**: El componente padre que gestiona cuál pestaña está activa en cada momento.
2. **`TabsList`**: La barra horizontal que aloja los botones de las pestañas.
3. **`TabsTrigger`**: Cada uno de los botones individuales en los que el usuario hace clic.
4. **`TabsContent`**: El contenedor del contenido que se muestra **únicamente** cuando la pestaña correspondiente está activa.

### Importación básica

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@alcspower/ui';
```

### La regla de oro: `value` debe coincidir exactamente

Cada `TabsTrigger` tiene una propiedad `value` (por ejemplo, `value="contactos"`). El `TabsContent` correspondiente **debe tener el mismo valor exacto** (por ejemplo, `value="contactos"`). Si difieren por una letra o mayúscula, el contenido no aparecerá al hacer clic.

```tsx
<Tabs defaultValue="lista">
  <TabsList>
    {/* El valor del disparador */}
    <TabsTrigger value="lista">Lista</TabsTrigger>
    <TabsTrigger value="nuevo">Nuevo</TabsTrigger>
  </TabsList>

  {/* Debe coincidir con el valor del contenido */}
  <TabsContent value="lista">
    <p>Aquí se muestra la lista</p>
  </TabsContent>

  <TabsContent value="nuevo">
    <p>Aquí se muestra el formulario</p>
  </TabsContent>
</Tabs>
```

### Modo no controlado (`defaultValue`) vs Modo controlado (`value`)

Hay dos formas de manejar el estado de las pestañas en React:

#### Opción A: Modo no controlado con `defaultValue` (el más sencillo)
Ideal cuando solo quieres que las pestañas funcionen por su cuenta sin que otros componentes necesiten saber qué pestaña está abierta.

```tsx
<Tabs defaultValue="perfil">
  <TabsList>
    <TabsTrigger value="perfil">Perfil</TabsTrigger>
    <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
  </TabsList>
  <TabsContent value="perfil">Información de perfil</TabsContent>
  <TabsContent value="seguridad">Ajustes de contraseña</TabsContent>
</Tabs>
```

#### Opción B: Modo controlado con `value` y `onValueChange`
Útil cuando necesitas que otra parte de tu pantalla (como un botón externo o una condición lógica) cambie de pestaña programáticamente.

```tsx
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent, Button } from '@alcspower/ui';

export function PestanasControladas() {
  const [pestanaActiva, setPestanaActiva] = useState('resumen');

  return (
    <div className="space-y-4">
      {/* Botón externo que cambia de pestaña automáticamente */}
      <div className="flex gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => setPestanaActiva('ajustes')}
        >
          Ir directo a Ajustes
        </Button>
      </div>

      <Tabs value={pestanaActiva} onValueChange={setPestanaActiva}>
        <TabsList>
          <TabsTrigger value="resumen">Resumen General</TabsTrigger>
          <TabsTrigger value="ajustes">Ajustes del Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen">
          <p className="p-4 bg-muted/30 rounded-lg">Estás viendo el resumen general.</p>
        </TabsContent>

        <TabsContent value="ajustes">
          <p className="p-4 bg-muted/30 rounded-lg">Configuración y preferencias avanzadas.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## 4. El componente `Separator`: Silencio y claridad visual

### ¿Qué es un Separator?

El componente `Separator` dibuja una línea delgada y neutra que crea una división estética entre dos bloques de contenido. En HTML nativo solíamos usar la etiqueta `<hr>`, pero `Separator` de `@alcspower/ui` ofrece ventajas fundamentales:
- Respeta los colores semánticos del tema claro y oscuro automáticamente.
- Es accesible para lectores de pantalla.
- Admite orientación **horizontal** o **vertical** sin necesidad de trucos raros con bordes CSS.

### Importación básica

```tsx
import { Separator } from '@alcspower/ui';
```

### Separador horizontal (por defecto)

Se extiende al 100% del ancho de su contenedor.

```tsx
<div>
  <h4 className="font-medium text-sm">Información Personal</h4>
  <p className="text-xs text-muted-foreground">Datos básicos del contacto</p>
  
  {/* Separador horizontal estándar */}
  <Separator className="my-4" />

  <h4 className="font-medium text-sm">Dirección de Envío</h4>
  <p className="text-xs text-muted-foreground">Lugar de entrega predeterminado</p>
</div>
```

### Separador vertical

Se usa comúnmente en barras de navegación, botones agrupados o barras de herramientas.

```tsx
<div className="flex items-center space-x-3 text-sm">
  <span>Inicio</span>
  {/* Separador vertical: importante definirle una altura (h-4 o h-6) */}
  <Separator orientation="vertical" className="h-4" />
  <span>Contactos</span>
  <Separator orientation="vertical" className="h-4" />
  <span>Configuración</span>
</div>
```

> 💡 **Consejo de diseño**: No abuses de los separadores. Si el espacio en blanco (el padding o margin) ya es suficiente para diferenciar dos secciones, no necesitas una línea. Usa separadores solo cuando los elementos compitan visualmente entre sí.

---

## 5. Mini-proyecto: Pantalla Principal de la Agenda

Vamos a poner en práctica todo lo aprendido construyendo una pantalla real: la interfaz principal de una **Agenda de Contactos Corporativa**.

Esta pantalla contará con:
1. Un encabezado principal con estadísticas rápidas separadas por `Separator` vertical.
2. Un componente `Tabs` para alternar entre "Mis Contactos" y "Agregar Nuevo".
3. Tarjetas (`Card`) estructuradas con títulos, subtítulos, contenidos y botones de acción.

```tsx
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  Button,
} from '@alcspower/ui';

// Datos de ejemplo para poblar la vista
const CONTACTOS_INICIALES = [
  {
    id: 1,
    nombre: 'Ana García',
    cargo: 'Gerente General',
    telefono: '+505 8888-0001',
    email: 'ana.garcia@empresa.com.ni',
    departamento: 'Dirección',
  },
  {
    id: 2,
    nombre: 'Carlos Mendoza',
    cargo: 'Especialista de Sistemas',
    telefono: '+505 8888-0002',
    email: 'carlos.mendoza@empresa.com.ni',
    departamento: 'Tecnología',
  },
  {
    id: 3,
    nombre: 'Valeria Solís',
    cargo: 'Coordinadora de Recursos Humanos',
    telefono: '+505 8888-0003',
    email: 'valeria.solis@empresa.com.ni',
    departamento: 'Gestión Humana',
  },
];

export function PantallaPrincipalAgenda() {
  const [contactos, setContactos] = useState(CONTACTOS_INICIALES);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoCargo, setNuevoCargo] = useState('');
  const [nuevoTelefono, setNuevoTelefono] = useState('');
  const [nuevoEmail, setNuevoEmail] = useState('');
  const [tabActivo, setTabActivo] = useState('lista');

  // Función para agregar un contacto y volver automáticamente a la lista
  const manejarGuardar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombre.trim() || !nuevoTelefono.trim()) {
      alert('Por favor completa al menos el nombre y teléfono.');
      return;
    }

    const nuevo = {
      id: Date.now(),
      nombre: nuevoNombre,
      cargo: nuevoCargo || 'Sin cargo asignado',
      telefono: nuevoTelefono,
      email: nuevoEmail || 'No especificado',
      departamento: 'General',
    };

    setContactos([nuevo, ...contactos]);
    setNuevoNombre('');
    setNuevoCargo('');
    setNuevoTelefono('');
    setNuevoEmail('');

    // Cambiamos de pestaña para que el usuario vea su nuevo contacto de inmediato
    setTabActivo('lista');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* 1. Encabezado principal de la aplicación */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Directorio de Contactos</h1>
          <p className="text-sm text-muted-foreground">
            Gestión interna de colaboradores y personal administrativo
          </p>
        </div>

        {/* Estadísticas rápidas separadas verticalmente */}
        <div className="flex items-center gap-4 text-sm bg-muted/40 px-4 py-2 rounded-lg border">
          <div>
            <span className="text-xs text-muted-foreground block">Total Registrados</span>
            <span className="font-bold text-base">{contactos.length}</span>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div>
            <span className="text-xs text-muted-foreground block">Departamentos</span>
            <span className="font-bold text-base">3</span>
          </div>
        </div>
      </div>

      {/* 2. Sistema de pestañas para organizar vistas */}
      <Tabs value={tabActivo} onValueChange={setTabActivo} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-xs mb-6">
          <TabsTrigger value="lista">Mis Contactos ({contactos.length})</TabsTrigger>
          <TabsTrigger value="nuevo">+ Agregar Nuevo</TabsTrigger>
        </TabsList>

        {/* VISTA 1: Lista de contactos organizados en Cards */}
        <TabsContent value="lista" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactos.map((contacto) => (
              <Card key={contacto.id} className="flex flex-col justify-between hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{contacto.nombre}</CardTitle>
                  <CardDescription>{contacto.cargo}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-1 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <span className="font-medium text-foreground w-20">Teléfono:</span>
                    <span>{contacto.telefono}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <span className="font-medium text-foreground w-20">Correo:</span>
                    <span className="truncate">{contacto.email}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <span className="font-medium text-foreground w-20">Área:</span>
                    <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded">
                      {contacto.departamento}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="border-t pt-3 flex justify-between gap-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    Ver Detalle
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Editar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* VISTA 2: Formulario de nuevo contacto encapsulado en una Card */}
        <TabsContent value="nuevo">
          <div className="max-w-xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Registrar Nuevo Colaborador</CardTitle>
                <CardDescription>
                  Ingresa los datos para incorporar el contacto al directorio general.
                </CardDescription>
              </CardHeader>

              <form onSubmit={manejarGuardar}>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Nombre Completo *</label>
                    <input
                      type="text"
                      placeholder="Ej. Roberto Sánchez"
                      value={nuevoNombre}
                      onChange={(e) => setNuevoNombre(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Puesto o Cargo</label>
                    <input
                      type="text"
                      placeholder="Ej. Analista Financiero"
                      value={nuevoCargo}
                      onChange={(e) => setNuevoCargo(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <Separator className="my-2" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Teléfono *</label>
                      <input
                        type="tel"
                        placeholder="+505 8888-0000"
                        value={nuevoTelefono}
                        onChange={(e) => setNuevoTelefono(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Correo Electrónico</label>
                      <input
                        type="email"
                        placeholder="usuario@empresa.com.ni"
                        value={nuevoEmail}
                        onChange={(e) => setNuevoEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-2 border-t pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setTabActivo('lista')}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Guardar Contacto
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## 6. ¿Qué puede salir mal? Problemas comunes y soluciones

A continuación verás los errores más habituales que cometen los desarrolladores al empezar con estos componentes:

### 1. "Hago clic en una pestaña pero el contenido no cambia"
* **Causa**: Casi siempre se debe a una discrepancia entre el `value` de `TabsTrigger` y el `value` de `TabsContent`. Por ejemplo, pusiste `value="Favoritos"` en el botón pero `value="favoritos"` (minúscula) en el contenido.
* **Solución**: Asegúrate de que ambas cadenas sean exactamente idénticas, respetando mayúsculas y acentos.

### 2. "El `Separator` vertical no se ve o desapareció"
* **Causa**: Un separador horizontal (`orientation="horizontal"`) toma automáticamente el 100% del ancho del padre. Pero un separador vertical (`orientation="vertical"`) se coloca dentro de un contenedor `flex` y por defecto no tiene altura definida (`height: 0px`).
* **Solución**: Dale siempre una clase de altura con Tailwind, como `className="h-6"` o `className="h-full"`.

### 3. "Los textos de mi Card se desbordan o rompen la pantalla en móviles"
* **Causa**: Colocaste un enlace o correo muy largo sin permitir que corte texto.
* **Solución**: Agrega la clase `truncate` al elemento de texto o `break-words` al contenedor.

### 4. "Puse un `<CardFooter>` pero los botones se pegan a la izquierda"
* **Causa**: Por defecto, los elementos HTML se alinean al inicio.
* **Solución**: Utiliza clases flexbox como `className="flex justify-end gap-2"` en el `CardFooter` para enviarlos a la derecha con un espacio armónico entre sí.

---

## 7. Ejercicio práctico: Agrega la pestaña "Favoritos"

Para afianzar lo aprendido, pon a prueba tus habilidades realizando la siguiente modificación en el código del mini-proyecto:

1. **Añade una propiedad booleana `favorito: boolean`** a los contactos iniciales (por ejemplo, Ana García con `favorito: true`).
2. **Crea un tercer tab trigger**:
   ```tsx
   <TabsTrigger value="favoritos">Favoritos ⭐</TabsTrigger>
   ```
3. **Crea el correspondiente `TabsContent`**:
   ```tsx
   <TabsContent value="favoritos">
     {/* Filtra los contactos que tengan favorito === true y muéstralos en Cards */}
   </TabsContent>
   ```
4. **Agrega un botón "Marcar como Favorito"** dentro de cada tarjeta para alternar el valor con un `onClick`.

---

## ✅ Resumen del capítulo

- **`Card`**: Es el contenedor por excelencia para agrupar información coherente. Sus partes (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) te permiten armar interfaces modulares y ordenadas.
- **`Tabs`**: Permiten alternar entre diferentes vistas o modos de trabajo en la misma pantalla sin recargar ni navegar. Recuerda siempre emparejar los `value` de `TabsTrigger` y `TabsContent`.
- **`Separator`**: Ofrece pausas visuales sutiles. Recuerda siempre darle altura explícita (`h-4`, `h-6`) cuando uses `orientation="vertical"`.

---

## Navegación

[← Capítulo 3: Formularios e Inputs](file:///docs/instructivo/es/03-formularios.md) | [Capítulo 5: Estados de Feedback y Carga →](file:///docs/instructivo/es/05-feedback.md)
