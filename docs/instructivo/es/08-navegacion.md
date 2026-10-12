# Capítulo 8: Navegación - Guiando al usuario dentro de tu aplicación

¿Alguna vez has entrado a una tienda departamental gigante o a un aeropuerto sin señalizaciones claras? En pocos minutos te sientes desorientado, sin saber en qué piso estás ni cómo regresar a la salida.

En las aplicaciones web ocurre exactamente lo mismo. Cuando un usuario interactúa con tu sistema, siempre necesita responder tres preguntas mentales inconscientes:
1. **"¿Dónde estoy ahora mismo?"**
2. **"¿Cómo regreso al lugar de donde vine?"**
3. **"¿Qué pasos debo seguir para completar mi tarea?"**

Para responder estas preguntas con elegancia visual, `@alcspower/ui` nos ofrece tres componentes especializados en orientación y flujos guiados:
- **`Breadcrumb` (Migas de pan)**: Indica la jerarquía de ubicación exacta y permite retroceder niveles con un solo clic.
- **`Stepper` (Pasos secuenciales)**: Guía al usuario en tareas largas paso por paso, como si siguiera una receta de cocina.
- **`Accordion` (Acordeón expandible)**: Permite ocultar y desplegar detalles densos para no saturar la vista.

En este capítulo aprenderás a usar estos tres componentes para crear experiencias de navegación fluidas, intuitivas y profesionales.

---

## 📚 Lo que aprenderás en este capítulo

1. **La psicología de la orientación espacial en la web**: Cómo evitar que tus usuarios se pierdan.
2. **El componente `Accordion` en detalle**:
   - La analogía del instrumento musical que se pliega y despliega.
   - Modos de comportamiento: `type="single"` vs `type="multiple"`.
   - La propiedad `collapsible`.
   - Despliegue de información complementaria en tarjetas de contacto.
3. **El componente `Breadcrumb` (Migas de pan)**:
   - La analogía del cuento clásico de Hansel y Gretel.
   - Anatomía completa: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator` y `BreadcrumbPage`.
   - Buenas prácticas de accesibilidad y enlaces activos.
4. **El componente `Stepper` (Asistente paso a paso)**:
   - La analogía de los pasos de una receta de cocina o un trámite.
   - Anatomía: `Stepper`, `StepperItem`, `StepperTrigger`, `StepperTitle` y `StepperSeparator`.
   - Control de paso activo con `useState` y validaciones lógicas.
5. **Mini-proyecto práctico**: Un flujo completo de alta de un colaborador en 3 pasos con validación secuencial y resumen final.
6. **¿Qué puede salir mal?**: Errores comunes de estado y renderizado.
7. **Ejercicio interactivo**: Agregar un cuarto paso para selección de rol y preferencias.

---

## 1. Guiando al usuario: La analogía del aeropuerto y las recetas

Piensa en cómo viajas en un aeropuerto moderno:
1. **Letreros en el techo**: Dicen *"Terminal 2 > Sala B > Puerta B14"*. Te dicen exactamente en qué nivel de profundidad estás y qué camino seguiste para llegar ahí. Ese es el rol del **`Breadcrumb`**.
2. **El proceso de embarque**: No te piden que muestres el pasaporte, peses la maleta, pases por seguridad y elijas tu asiento todo al mismo segundo en una sola ventanilla. El proceso está dividido en etapas secuenciales: *Paso 1: Check-in → Paso 2: Maletas → Paso 3: Seguridad → Paso 4: Sala de abordaje*. Ese es el rol del **`Stepper`**.
3. **Folleto de información turística plegable**: Puedes llevarlo cerrado en el bolsillo para que no ocupe espacio, y solo abres el pliegue del museo o del restaurante cuando realmente te interesa leer los detalles. Ese es el rol del **`Accordion`**.

Cuando diseñas tu interfaz pensando en estas tres herramientas, la experiencia de usuario pasa de ser confusa y abrumadora a ser ligera, predecible y placentera.

---

## 2. El componente `Accordion`: Información expandible bajo demanda

### ¿Qué es un Accordion?

Un acordeón es un conjunto de paneles apilados verticalmente donde cada panel tiene un título que, al hacer clic sobre él, despliega u oculta su contenido asociado. Es la solución perfecta para preguntas frecuentes (FAQ), detalles técnicos o historial de actividad que no necesitan estar visibles todo el tiempo.

### Anatomía del Accordion

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@alcspower/ui';
```

- **`Accordion`**: El contenedor raíz que maneja el estado de apertura.
- **`AccordionItem`**: Cada bloque individual (requiere un identificador único `value="clave"`).
- **`AccordionTrigger`**: El botón de encabezado que contiene el texto y la flecha giratoria automática.
- **`AccordionContent`**: El contenido desplegable que se anima suavemente al abrir o cerrar.

### Configuración clave: `type="single"` vs `type="multiple"`

El componente `Accordion` admite dos modos de operación mediante la propiedad `type`:

#### 1. Modo único (`type="single"`)
Al hacer clic en un panel, cualquier otro panel abierto se cierra automáticamente. Es ideal cuando quieres que el usuario se enfoque en un solo bloque a la vez. Se recomienda acompañarlo con la propiedad `collapsible` para permitir que el panel activo pueda cerrarse si se le vuelve a hacer clic.

```tsx
<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>¿Cómo cambio mi contraseña?</AccordionTrigger>
    <AccordionContent>
      Ve a tu perfil de usuario y selecciona la pestaña de seguridad.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

#### 2. Modo múltiple (`type="multiple"`)
Permite que varios paneles permanezcan abiertos simultáneamente.

```tsx
<Accordion type="multiple" className="w-full">
  {/* El usuario puede abrir el panel 1 y el panel 2 al mismo tiempo */}
  <AccordionItem value="item-1">
    <AccordionTrigger>Datos Personales</AccordionTrigger>
    <AccordionContent>Nombre, apellido y cédula.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Datos Laborales</AccordionTrigger>
    <AccordionContent>Cargo, salario y fecha de ingreso.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Ejemplo aplicado: Ficha de contacto con secciones expandibles

```tsx
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@alcspower/ui';

export function DetallesContactoAcordeon() {
  return (
    <div className="max-w-lg mx-auto p-4 border rounded-xl bg-card">
      <h3 className="font-bold text-lg mb-2">Expediente de Ana García</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Haz clic en cada sección para consultar información clasificada.
      </p>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="info-personal">
          <AccordionTrigger>📋 Información Personal</AccordionTrigger>
          <AccordionContent className="space-y-1 text-sm text-muted-foreground">
            <p><strong>Cédula:</strong> 001-120590-0044K</p>
            <p><strong>Fecha de Nacimiento:</strong> 12 de Mayo de 1990</p>
            <p><strong>Dirección:</strong> Reparto San Juan, Managua</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="contacto-emergencia">
          <AccordionTrigger>🚨 Contacto de Emergencia</AccordionTrigger>
          <AccordionContent className="space-y-1 text-sm text-muted-foreground">
            <p><strong>Nombre:</strong> Roberto García (Hermano)</p>
            <p><strong>Teléfono:</strong> +505 8777-9988</p>
            <p><strong>Relación:</strong> Familiar directo</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notas-internas">
          <AccordionTrigger>📝 Notas y Comentarios</AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">
            Colaboradora destacada en evaluación del primer trimestre 2026. Líder de proyectos especiales en logística.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
```

---

## 3. El componente `Breadcrumb`: El rastro de migas de pan

### ¿Para qué sirve un Breadcrumb?

El nombre proviene del cuento de *Hansel y Gretel*, quienes dejaban migajas de pan en el bosque para recordar el camino de regreso a casa. 

En la web, un **Breadcrumb** es una barra horizontal que muestra la jerarquía de páginas desde la raíz hasta la vista actual:
`Inicio > Contactos > Departamentos > Tecnología > Ana García`

Le permite al usuario:
- Entender inmediatamente en qué sección del sistema se encuentra.
- Saltar a cualquier nivel superior con un solo clic sin tener que presionar el botón "Atrás" del navegador múltiples veces.

### Anatomía del Breadcrumb

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@alcspower/ui';
```

- **`Breadcrumb`**: El contenedor exterior con rol semántico `<nav aria-label="breadcrumb">`.
- **`BreadcrumbList`**: La lista ordenada interna (`<ol>`).
- **`BreadcrumbItem`**: Cada elemento de la lista (`<li>`).
- **`BreadcrumbLink`**: Un enlace interactivo a un nivel superior (`<a href="...">`).
- **`BreadcrumbSeparator`**: El separador visual entre niveles (usualmente una barra diagonal `/` o un chevron `>`).
- **`BreadcrumbPage`**: El nivel actual en el que está el usuario. **No es un enlace**, sino un texto destacado con `aria-current="page"`.

### Ejemplo práctico comentado

```tsx
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@alcspower/ui';

export function NavegacionMigaDePan() {
  return (
    <div className="py-2">
      <Breadcrumb>
        <BreadcrumbList>
          {/* Nivel 1: Inicio */}
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          {/* Nivel 2: Directorio de Contactos */}
          <BreadcrumbItem>
            <BreadcrumbLink href="/contactos">Contactos</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          {/* Nivel 3: Página actual (sin link, texto activo) */}
          <BreadcrumbItem>
            <BreadcrumbPage>Ana García</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
```

---

## 4. El componente `Stepper`: Asistente de pasos secuenciales

### ¿Qué es un Stepper?

¿Alguna vez has tenido que llenar un formulario de 25 campos en una sola página larga y te dieron ganas de cerrar la pestaña? Los formularios gigantes producen fatiga visual y abandono.

Un **Stepper** divide una tarea compleja en pequeños pasos secuenciales lógicos. Cada paso se enfoca en una sola temática (por ejemplo: primero datos personales, luego datos de contacto, y finalmente confirmación).

### Anatomía del Stepper en `@alcspower/ui`

```tsx
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperSeparator,
  StepperTitle,
} from '@alcspower/ui';
```

- **`Stepper`**: El componente padre que recibe la propiedad `value={pasoActual}` para saber qué paso está activo.
- **`StepperItem`**: El contenedor de un paso individual (`step={1}`).
- **`StepperTrigger`**: El botón interactivo o indicador numérico del paso.
- **`StepperTitle`**: El nombre o título descriptivo del paso.
- **`StepperSeparator`**: La línea conectora horizontal que une un paso con el siguiente.

### Patrón de uso básico controlado

```tsx
import React, { useState } from 'react';
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperSeparator,
  StepperTitle,
  Button,
} from '@alcspower/ui';

const PASOS = [
  { id: 1, titulo: 'Datos Básicos' },
  { id: 2, titulo: 'Contacto' },
  { id: 3, titulo: 'Confirmación' },
];

export function EjemploStepperBasico() {
  const [pasoActual, setPasoActual] = useState(1);

  return (
    <div className="space-y-6 max-w-xl mx-auto p-4 border rounded-xl">
      {/* Barra de progreso de pasos */}
      <Stepper value={pasoActual}>
        {PASOS.map((paso) => (
          <StepperItem key={paso.id} step={paso.id}>
            <StepperTrigger onClick={() => setPasoActual(paso.id)}>
              <StepperTitle>{paso.titulo}</StepperTitle>
            </StepperTrigger>
            {paso.id < PASOS.length && <StepperSeparator />}
          </StepperItem>
        ))}
      </Stepper>

      {/* Contenido dinámico del paso */}
      <div className="p-6 bg-muted/20 border rounded-lg text-center">
        <h4 className="font-semibold text-base mb-1">
          Estás en el Paso {pasoActual}: {PASOS[pasoActual - 1].titulo}
        </h4>
        <p className="text-xs text-muted-foreground">
          Aquí iría el formulario correspondiente a esta etapa.
        </p>
      </div>

      {/* Botones de navegación Anterior / Siguiente */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={pasoActual === 1}
          onClick={() => setPasoActual((p) => p - 1)}
        >
          Anterior
        </Button>
        <Button
          disabled={pasoActual === PASOS.length}
          onClick={() => setPasoActual((p) => p + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
```

---

## 5. Mini-proyecto: Flujo de Alta de Colaborador en 3 Pasos

Vamos a crear un asistente de registro completo guiado que combina:
- Un **Breadcrumb** superior de contexto.
- Un **Stepper** interactivo con indicador numérico.
- Tres etapas bien diferenciadas con validación antes de avanzar:
  - **Paso 1**: Nombre y Apellido.
  - **Paso 2**: Teléfono y Correo electrónico.
  - **Paso 3**: Resumen de confirmación antes de guardar.
- Notificación final con `toast`.

```tsx
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperSeparator,
  StepperTitle,
  Button,
  Toaster,
  toast,
} from '@alcspower/ui';

interface DatosFormulario {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
}

const PASOS_ONBOARDING = [
  { id: 1, titulo: 'Datos Básicos' },
  { id: 2, titulo: 'Contacto' },
  { id: 3, titulo: 'Confirmación' },
];

export function FlujoAltaColaborador() {
  const [pasoActual, setPasoActual] = useState(1);
  const [datos, setDatos] = useState<DatosFormulario>({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
  });

  // Manejador genérico para inputs
  const actualizarCampo = (campo: keyof DatosFormulario, valor: string) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  };

  // Validaciones antes de avanzar al siguiente paso
  const validarYAvanzar = () => {
    if (pasoActual === 1) {
      if (!datos.nombre.trim() || !datos.apellido.trim()) {
        toast.warning('Por favor ingresa tanto el nombre como el apellido.');
        return;
      }
    } else if (pasoActual === 2) {
      if (!datos.telefono.trim() || !datos.email.trim()) {
        toast.warning('El teléfono y el correo electrónico son obligatorios.');
        return;
      }
      if (!datos.email.includes('@')) {
        toast.error('El formato del correo electrónico no es válido.');
        return;
      }
    }

    setPasoActual((p) => Math.min(p + 1, PASOS_ONBOARDING.length));
  };

  const retrocederPaso = () => {
    setPasoActual((p) => Math.max(p - 1, 1));
  };

  const finalizarRegistro = () => {
    toast.success(`¡Colaborador ${datos.nombre} ${datos.apellido} registrado exitosamente!`);
    // Reiniciamos el formulario
    setDatos({ nombre: '', apellido: '', telefono: '', email: '' });
    setPasoActual(1);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Toaster position="bottom-right" richColors />

      {/* 1. Miga de pan de ubicación */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/contactos">Contactos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Nuevo Registro</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* 2. Tarjeta contenedora principal */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Alta de Nuevo Colaborador</CardTitle>
          <CardDescription>
            Sigue los pasos secuenciales para registrar un nuevo integrante en el sistema.
          </CardDescription>

          {/* Stepper en la cabecera */}
          <div className="pt-4">
            <Stepper value={pasoActual}>
              {PASOS_ONBOARDING.map((paso) => (
                <StepperItem key={paso.id} step={paso.id}>
                  <StepperTrigger>
                    <StepperTitle>{paso.titulo}</StepperTitle>
                  </StepperTrigger>
                  {paso.id < PASOS_ONBOARDING.length && <StepperSeparator />}
                </StepperItem>
              ))}
            </Stepper>
          </div>
        </CardHeader>

        <CardContent className="pt-2">
          {/* PASO 1: Identificación básica */}
          {pasoActual === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h3 className="font-semibold text-sm text-foreground">Paso 1: Identificación Básica</h3>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Nombre(s) *</label>
                <input
                  type="text"
                  placeholder="Ej. Roberto"
                  value={datos.nombre}
                  onChange={(e) => actualizarCampo('nombre', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Apellido(s) *</label>
                <input
                  type="text"
                  placeholder="Ej. Sánchez Morales"
                  value={datos.apellido}
                  onChange={(e) => actualizarCampo('apellido', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                />
              </div>
            </div>
          )}

          {/* PASO 2: Información de contacto */}
          {pasoActual === 2 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h3 className="font-semibold text-sm text-foreground">Paso 2: Canales de Contacto</h3>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Teléfono Móvil *</label>
                <input
                  type="tel"
                  placeholder="+505 8888-0000"
                  value={datos.telefono}
                  onChange={(e) => actualizarCampo('telefono', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Correo Corporativo *</label>
                <input
                  type="email"
                  placeholder="roberto.sanchez@empresa.com.ni"
                  value={datos.email}
                  onChange={(e) => actualizarCampo('email', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                />
              </div>
            </div>
          )}

          {/* PASO 3: Resumen y confirmación */}
          {pasoActual === 3 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h3 className="font-semibold text-sm text-foreground">Paso 3: Confirmación de Información</h3>
              <p className="text-xs text-muted-foreground">
                Por favor verifica que todos los datos sean correctos antes de confirmar el registro.
              </p>

              <div className="p-4 border rounded-lg bg-muted/20 space-y-2 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Nombre Completo:</span>
                  <span className="font-medium">{datos.nombre} {datos.apellido}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Teléfono:</span>
                  <span className="font-medium">{datos.telefono}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Correo Electrónico:</span>
                  <span className="font-medium">{datos.email}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {/* Botones de pie */}
        <CardFooter className="flex justify-between border-t pt-4">
          <Button
            variant="outline"
            disabled={pasoActual === 1}
            onClick={retrocederPaso}
          >
            ← Anterior
          </Button>

          {pasoActual < 3 ? (
            <Button onClick={validarYAvanzar}>
              Siguiente →
            </Button>
          ) : (
            <Button onClick={finalizarRegistro} className="bg-primary text-primary-foreground">
              Confirmar y Guardar Registro
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
```

---

## 6. ¿Qué puede salir mal? Problemas comunes y soluciones

### 1. "El StepperSeparator no se conecta o desaparece"
* **Causa**: Olvidaste la condición `{paso.id < pasos.length && <StepperSeparator />}` o el contenedor de los ítems no cuenta con un layout `flex` adecuado.
* **Solución**: Asegúrate de incluir el separador entre pasos y no después del último elemento de la lista.

### 2. "El usuario salta al paso 3 haciendo clic en el StepperTrigger sin llenar el paso 1"
* **Causa**: Le diste interactividad directa a los botones del disparador (`onClick={() => setPasoActual(paso.id)}`) sin validar los campos previos.
* **Solución**: En flujos estrictos, no permitas hacer clic libremente hacia adelante; haz que el usuario avance únicamente presionando el botón "Siguiente" tras validar los datos.

### 3. "El Accordion abre todos los paneles y no se cierran"
* **Causa**: Usaste `type="multiple"` en lugar de `type="single"`, o en `type="single"` no especificaste `collapsible={true}`.
* **Solución**: Si quieres comportamiento de acordeón tradicional donde solo uno puede estar abierto a la vez, usa `<Accordion type="single" collapsible>`.

### 4. "El Breadcrumb tiene el último elemento como un enlace cliqueable que recarga la página"
* **Causa**: Usaste `<BreadcrumbLink>` en el último nivel en lugar de `<BreadcrumbPage>`.
* **Solución**: El último nivel siempre debe ser `<BreadcrumbPage>` porque representa la página donde ya estás parado.

---

## 7. Ejercicio práctico: Agregar un 4to paso para "Rol y Preferencias"

Pon a prueba tu aprendizaje ampliando el asistente de registro:

1. **Agrega un nuevo paso al arreglo de pasos**:
   ```tsx
   { id: 3, titulo: 'Rol y Área' },
   { id: 4, titulo: 'Confirmación' },
   ```
2. **Crea el contenido del nuevo Paso 3**:
   - Un selector desplegable para el "Departamento" (Sistemas, Finanzas, Ventas, Dirección).
   - Un checkbox para "Habilitar acceso remoto".
3. **Mueve el resumen de confirmación al Paso 4**:
   - Muestra el departamento seleccionado y el estado de acceso remoto en el bloque de confirmación.
4. **Verifica que no se pueda avanzar del Paso 3 al Paso 4** sin haber elegido un departamento válido.

---

## ✅ Resumen del capítulo

- **Navegación Intuitiva**: El usuario siempre debe saber dónde está, cómo regresar y qué pasos le faltan por completar.
- **`Accordion`**: Permite ocultar bloques de contenido extenso y revelarlos solo cuando el usuario lo solicite. Ideal con `type="single" collapsible`.
- **`Breadcrumb`**: Proporciona el rastro de migas de pan jerárquico (`BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator`, `BreadcrumbPage`).
- **`Stepper`**: Descompone procesos largos en etapas amigables y digeribles (`StepperItem`, `StepperTrigger`, `StepperSeparator`, `StepperTitle`).

---

## Navegación

[← Capítulo 7: Visualización y Manejo de Datos](file:///docs/instructivo/es/07-datos.md) | [Capítulo 9: Proyecto Final Integrador →](file:///docs/instructivo/es/09-proyecto-final.md)
