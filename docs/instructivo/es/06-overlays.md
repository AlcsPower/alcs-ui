# Capítulo 6: Overlays - Ventanas y capas que flotan encima de todo

¿Alguna vez has hecho clic en "Eliminar" en una aplicación y de repente toda la pantalla se oscureció un poco, apareciendo una pequeña ventanita en el centro que te preguntó: *"¿Estás seguro de que deseas eliminar este archivo?"*?

Esa ventanita que flota por encima de todo el contenido se conoce técnicamente como un **Overlay** (capa superpuesta).

En las interfaces modernas no podemos meter todos los botones, formularios y detalles secundarios en la misma página plana, porque abrumaríamos al usuario. Los overlays nos permiten ocultar información o acciones secundarias y mostrarlas únicamente en el instante exacto en que se necesitan.

En este capítulo aprenderás a dominar los tres componentes flotantes más importantes de `@alcspower/ui`:
1. **`Dialog`**: Ventanas modales completas para confirmaciones críticas o formularios emergentes.
2. **`Tooltip`**: Pequeñas etiquetas flotantes que explican qué hace un icono cuando pasas el mouse por encima.
3. **`DropdownMenu`**: Menús desplegables para agrupar múltiples acciones detrás de un solo botón.

---

## 📚 Lo que aprenderás en este capítulo

1. **La metáfora de las capas físicas**: Cómo se apilan las ventanas flotantes en el navegador (el concepto de *z-index* y *backdrop*).
2. **El componente `Dialog` en detalle**:
   - Anatomía completa: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter` y `DialogClose`.
   - Modos de apertura: automático con `DialogTrigger` vs controlado con `open` y `onOpenChange`.
   - Buenas prácticas de accesibilidad y diseño (foco, tecla Escape, botón cancelar).
3. **El componente `Tooltip`**:
   - Por qué los iconos mudos son un peligro para la usabilidad.
   - El rol fundamental del `TooltipProvider`.
   - Cómo envolver botones de acción sin romper su interactividad.
4. **El componente `DropdownMenu`**:
   - Anatomía: `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem` y `DropdownMenuSeparator`.
   - Alineación inteligente (`align="start" | "center" | "end"`).
5. **Mini-proyecto práctico**: Panel de gestión de contactos con menú de tres puntos, diálogo de edición y modal destructivo de confirmación.
6. **¿Qué puede salir mal?**: Soluciones a los errores más frecuentes.
7. **Ejercicio interactivo**: Modal de "Ver Ficha Completa del Contacto".

---

## 1. La metáfora de las capas: La hoja transparente sobre el escritorio

Imagina que estás trabajando en tu escritorio con una libreta abierta. 

- Si alguien te entrega una hoja de papel amarilla con una pregunta urgente, no guardas tu libreta en la gaveta: simplemente pones la hoja amarilla **directamente encima de tu libreta**, respondes la pregunta y luego retiras la hoja para seguir trabajando donde te habías quedado.
- Para evitar que te distraigas con lo que había debajo, colocas un filtro semitransparente oscuro sobre tu libreta. Tu atención ahora está 100% enfocada en la hoja amarilla.

Eso es exactamente un **Dialog modal**:
- El fondo oscuro que cubre la página web se llama **Backdrop** o telón de fondo.
- La ventana flotante central es el **Content**.
- Mientras el diálogo está abierto, el resto de la página queda temporalmente inactiva para que no cometas errores sin querer.

Los **Tooltips** y los **DropdownMenus** funcionan con una lógica similar, pero en lugar de cubrir toda la pantalla, aparecen anclados justo al lado del botón que los originó.

---

## 2. El componente `Dialog`: Ventanas modales seguras y accesibles

### Anatomía de un Dialog

En `@alcspower/ui`, un diálogo no es un simple `<div>` con posición absoluta. Está construido con tecnología accesible que atrapa el foco del teclado, permite cerrar la ventana presionando la tecla **Escape**, y comunica a lectores de pantalla qué está ocurriendo.

Se compone de las siguientes piezas:

| Componente | Función en la interfaz |
| :--- | :--- |
| `Dialog` | Contenedor principal que maneja el estado abierto/cerrado. |
| `DialogTrigger` | El botón que el usuario presiona para abrir el diálogo. |
| `DialogContent` | La caja flotante que contiene el formulario o mensaje. |
| `DialogHeader` | Sección superior para títulos y subtítulos. |
| `DialogTitle` | Título accesible del modal (obligatorio para accesibilidad). |
| `DialogDescription` | Descripción breve de la acción que se va a realizar. |
| `DialogFooter` | Pie del modal donde van los botones ("Cancelar", "Confirmar"). |
| `DialogClose` | Envoltorio para botones que cierran el diálogo al hacer clic. |

### Importación básica

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
} from '@alcspower/ui';
```

### Ejemplo fundamental: Diálogo no controlado (El más simple)

En este modo, el componente maneja su propia apertura y cierre internamente sin necesidad de estados `useState`.

```tsx
import React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Button,
} from '@alcspower/ui';

export function DialogoBasico() {
  return (
    <Dialog>
      {/* asChild le dice a DialogTrigger que aplique el comportamiento al Button */}
      <DialogTrigger asChild>
        <Button variant="outline">Ver Política de Privacidad</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Términos y Privacidad</DialogTitle>
          <DialogDescription>
            Última actualización: Noviembre de 2026.
          </DialogDescription>
        </DialogHeader>

        <div className="text-sm text-muted-foreground space-y-2 py-4">
          <p>
            Toda la información personal almacenada en esta aplicación está protegida
            y no se comparte con terceros sin tu consentimiento explícito.
          </p>
          <p>
            Puedes solicitar la eliminación permanente de tus registros en cualquier momento.
          </p>
        </div>

        <DialogFooter>
          {/* DialogClose cierra el modal sin necesidad de código extra */}
          <DialogClose asChild>
            <Button type="button">Entendido</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Modo controlado: `open` y `onOpenChange`

El modo controlado es indispensable cuando necesitas:
1. Abrir o cerrar el diálogo mediante código (por ejemplo, cerrarlo solo cuando el servidor confirme que los datos se guardaron sin error).
2. Saber desde fuera si el diálogo está abierto o cerrado.

```tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Button,
} from '@alcspower/ui';

export function DialogoControlado() {
  const [estaAbierto, setEstaAbierto] = useState(false);
  const [nombre, setNombre] = useState('Ana García');

  const guardarCambios = () => {
    // Aquí guardaríamos en una base de datos...
    // Cerramos el modal programáticamente
    setEstaAbierto(false);
  };

  return (
    <div>
      <Button onClick={() => setEstaAbierto(true)}>
        Editar Contacto
      </Button>

      <Dialog open={estaAbierto} onOpenChange={setEstaAbierto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Nombre del Contacto</DialogTitle>
            <DialogDescription>
              Modifica el nombre y presiona guardar para aplicar los cambios.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm bg-background"
            />
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={guardarCambios}>
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

> ⚠️ **Regla de oro de los Dialogs**: Todo diálogo debe tener siempre una forma clara y evidente de salir sin hacer nada (un botón "Cancelar" con `variant="outline"` o la cruz de cierre). Nunca acorrales al usuario.

---

## 3. El componente `Tooltip`: Etiquetas explicativas al posar el cursor

### ¿Por qué son indispensables los Tooltips?

A los desarrolladores nos encanta usar botones con iconos bonitos: una papelera 🗑️, un lápiz ✏️, una estrella ⭐ o un engranaje ⚙️. Sin embargo, lo que para ti es un icono obvio, para otra persona puede ser un misterio.

Un **Tooltip** es una pequeña burbuja con texto explicativo que aparece cuando el usuario pasa el mouse sobre un elemento o se posiciona sobre él con el teclado.

### El rol de `TooltipProvider`

Para que los tooltips funcionen de manera coordinada (por ejemplo, para que si pasas rápido el mouse de un icono a otro no haya retrasos molestos), React necesita un proveedor de contexto global llamado `TooltipProvider`.

Puedes envolver toda tu aplicación o la sección específica donde uses tooltips:

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Button,
} from '@alcspower/ui';

export function BotonConTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        {/* asChild asegura que el disparador sea el propio botón */}
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            🗑️
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Eliminar contacto permanentemente</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

---

## 4. El componente `DropdownMenu`: Menús desplegables compactos

### ¿Qué es un DropdownMenu?

Imagina la carta de un restaurante: no tienen todos los platos pegados en la pared de la entrada; te dan un menú que abres cuando te sientas.

En una tabla o tarjeta de contacto, si colocáramos botones para "Editar", "Duplicar", "Archivar", "Compartir", "Exportar" y "Eliminar", la fila se vería atiborrada.

El **`DropdownMenu`** soluciona esto agrupando todas esas acciones detrás de un solo botón compacto (típicamente un botón de tres puntos verticales `⋮`).

### Anatomía del DropdownMenu

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@alcspower/ui';
```

- **`DropdownMenuTrigger`**: El botón que abre el menú.
- **`DropdownMenuContent`**: La lista flotante que contiene las opciones. Admite la propiedad `align="start" | "center" | "end"`.
- **`DropdownMenuItem`**: Cada opción individual en la que se puede hacer clic (`onClick`).
- **`DropdownMenuSeparator`**: Una línea divisoria sutil para separar acciones comunes de acciones destructivas (como borrar).

### Ejemplo con alineación y opciones destructivas

```tsx
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Button,
} from '@alcspower/ui';

export function MenuAccionesContacto() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          ⋮
        </Button>
      </DropdownMenuTrigger>

      {/* align="end" alinea el menú con el borde derecho del botón, evitando que se salga de la pantalla */}
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => alert('Viendo detalles...')}>
          👁️ Ver ficha completa
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => alert('Editando...')}>
          ✏️ Editar contacto
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => alert('Duplicando...')}>
          📋 Duplicar registro
        </DropdownMenuItem>

        {/* Separador visual antes de la acción peligrosa */}
        <DropdownMenuSeparator />

        {/* text-destructive pinta el texto de color rojo semántico */}
        <DropdownMenuItem
          onClick={() => alert('Eliminar')}
          className="text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          🗑️ Eliminar contacto
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

## 5. Mini-proyecto: Acciones avanzadas sobre un Contacto

En este mini-proyecto uniremos los 3 componentes en un flujo real de la Agenda:
1. Una tarjeta de contacto con un botón de tres puntos (`DropdownMenu`).
2. Una opción "Editar" que abre un modal con formulario (`Dialog`).
3. Una opción "Eliminar" que abre un diálogo de confirmación destructivo.
4. Botones rápidos con iconos y `Tooltip` explicativos.

```tsx
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Toaster,
  toast,
} from '@alcspower/ui';

interface Contacto {
  id: number;
  nombre: string;
  cargo: string;
  telefono: string;
  email: string;
}

export function ModuloOverlaysContacto() {
  const [contacto, setContacto] = useState<Contacto>({
    id: 1,
    nombre: 'Ana García Martínez',
    cargo: 'Directora de Operaciones',
    telefono: '+505 8888-0001',
    email: 'ana.garcia@empresa.com.ni',
  });

  // Estados para controlar los dos diálogos
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);

  // Estados temporales para el formulario de edición
  const [nombreEdicion, setNombreEdicion] = useState(contacto.nombre);
  const [cargoEdicion, setCargoEdicion] = useState(contacto.cargo);
  const [telefonoEdicion, setTelefonoEdicion] = useState(contacto.telefono);

  // Guardar edición
  const handleGuardarEdicion = (e: React.FormEvent) => {
    e.preventDefault();
    setContacto({
      ...contacto,
      nombre: nombreEdicion,
      cargo: cargoEdicion,
      telefono: telefonoEdicion,
    });
    setModalEditarAbierto(false);
    toast.success('Información del contacto actualizada');
  };

  // Confirmar eliminación
  const handleConfirmarEliminar = () => {
    setModalEliminarAbierto(false);
    toast.error(`El contacto "${contacto.nombre}" ha sido eliminado`);
  };

  return (
    <TooltipProvider>
      <div className="max-w-xl mx-auto p-6 space-y-6">
        <Toaster position="bottom-right" richColors />

        <div>
          <h2 className="text-2xl font-bold tracking-tight">Acciones y Capas Flotantes</h2>
          <p className="text-sm text-muted-foreground">
            Demostración de Dialogs, Tooltips y DropdownMenus interactuando en conjunto.
          </p>
        </div>

        {/* Tarjeta del Contacto */}
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-xl">{contacto.nombre}</CardTitle>
              <CardDescription>{contacto.cargo}</CardDescription>
            </div>

            {/* Menú de acciones en la esquina superior derecha */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <span className="text-lg">⋮</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setModalEditarAbierto(true)}>
                  ✏️ Editar datos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast('Enlace copiado')}>
                  🔗 Compartir perfil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setModalEliminarAbierto(true)}
                  className="text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  🗑️ Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>

          <CardContent className="space-y-2 text-sm pt-2">
            <p>
              <strong className="text-muted-foreground">Teléfono:</strong> {contacto.telefono}
            </p>
            <p>
              <strong className="text-muted-foreground">Correo:</strong> {contacto.email}
            </p>
          </CardContent>

          <CardFooter className="border-t pt-4 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">ID del registro: #{contacto.id}</span>

            {/* Botones rápidos con Tooltips */}
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toast.success('Llamando al ' + contacto.telefono)}
                  >
                    📞
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Llamar al teléfono directo</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toast('Bandeja de correo abierta')}
                  >
                    ✉️
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Redactar correo electrónico</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setModalEditarAbierto(true)}
                  >
                    ✏️
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Abrir formulario de edición</TooltipContent>
              </Tooltip>
            </div>
          </CardFooter>
        </Card>

        {/* DIÁLOGO 1: Modal de Edición de Contacto */}
        <Dialog open={modalEditarAbierto} onOpenChange={setModalEditarAbierto}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Colaborador</DialogTitle>
              <DialogDescription>
                Modifica los campos del formulario y guarda para actualizar la ficha.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleGuardarEdicion} className="space-y-4 py-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={nombreEdicion}
                  onChange={(e) => setNombreEdicion(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Cargo o Posición
                </label>
                <input
                  type="text"
                  value={cargoEdicion}
                  onChange={(e) => setCargoEdicion(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={telefonoEdicion}
                  onChange={(e) => setTelefonoEdicion(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                  required
                />
              </div>

              <DialogFooter className="pt-4 border-t flex justify-end gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit">
                  Guardar Cambios
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* DIÁLOGO 2: Modal de Confirmación de Eliminación */}
        <Dialog open={modalEliminarAbierto} onOpenChange={setModalEliminarAbierto}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-destructive">¿Eliminar contacto?</DialogTitle>
              <DialogDescription>
                Esta acción no se puede deshacer. Se removerán los datos de{' '}
                <strong>{contacto.nombre}</strong> de los registros corporativos.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="gap-2 sm:gap-0 pt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleConfirmarEliminar}>
                Sí, eliminar definitivamente
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
```

---

## 6. ¿Qué puede salir mal? Problemas comunes y soluciones

### 1. "El Tooltip no aparece al pasar el ratón"
* **Causa 1**: Olvidaste envolver tu árbol de componentes con `<TooltipProvider>`.
* **Causa 2**: Pusiste el `TooltipTrigger` sobre un elemento personalizado que no pasa las propiedades de eventos del ratón (`onMouseEnter`, etc.).
* **Solución**: Asegúrate de incluir `<TooltipProvider>` en la raíz y utiliza la propiedad `asChild` cuando envuelvas un componente `<Button>`.

### 2. "Hago clic en el botón dentro del DropdownMenu y no pasa nada"
* **Causa**: Pusiste el evento `onClick` en un elemento hijo dentro del `DropdownMenuItem` en lugar de ponerlo directamente en el `<DropdownMenuItem onClick={...}>`.
* **Solución**: Coloca siempre el manejador de eventos `onClick` en el propio `DropdownMenuItem`.

### 3. "El menú desplegable queda cortado por el borde de la pantalla"
* **Causa**: Por defecto, los menús se alinean a la izquierda (`align="start"`). Si el botón está en la esquina derecha de la pantalla, el menú se desborda hacia afuera.
* **Solución**: Configura `<DropdownMenuContent align="end">` para que el menú se expanda hacia adentro de la pantalla.

### 4. "Cierro el modal pero los datos modificados se guardaron sin presionar el botón"
* **Causa**: Modificaste el estado principal directamente en los inputs (`onChange`) en vez de usar estados temporales para la edición.
* **Solución**: Mantén estados locales temporales (como `nombreEdicion`) y solo aplica los cambios al estado global cuando el usuario presione el botón "Guardar Cambios".

---

## 7. Ejercicio práctico: Agregar diálogo de "Ver Ficha Completa"

Demuestra tu dominio agregando una nueva funcionalidad:

1. **Agrega un tercer modal** controlado con un estado `modalDetallesAbierto`.
2. **Añade una opción en el DropdownMenu**:
   ```tsx
   <DropdownMenuItem onClick={() => setModalDetallesAbierto(true)}>
     📋 Ver ficha detallada
   </DropdownMenuItem>
   ```
3. **Diseña el contenido del diálogo**:
   - Incluye el nombre, cargo, teléfono y correo electrónico.
   - Añade datos simulados adicionales como: "Fecha de ingreso", "Departamento", y "ID de empleado".
   - Coloca un solo botón de cierre en el `DialogFooter`:
     ```tsx
     <DialogClose asChild>
       <Button variant="secondary">Cerrar Ficha</Button>
     </DialogClose>
     ```

---

## ✅ Resumen del capítulo

- **Overlays**: Capas que flotan por encima del flujo normal para enfocar la atención del usuario en una tarea puntual o ahorrar espacio visual.
- **`Dialog`**: La herramienta ideal para confirmaciones destructivas, avisos críticos o formularios emergentes. Requiere siempre `DialogTitle` por motivos de accesibilidad y un botón claro para cancelar.
- **`Tooltip`**: Aclara el significado de botones mudos o de solo icono al posar el cursor. Requiere un `TooltipProvider` en el árbol.
- **`DropdownMenu`**: Agrupa múltiples acciones secundarias bajo un único disparador compacto, usando `align="end"` para mantenerlo dentro de la vista.

---

## Navegación

[← Capítulo 5: Estados de Feedback](file:///docs/instructivo/es/05-feedback.md) | [Capítulo 7: Visualización y Manejo de Datos →](file:///docs/instructivo/es/07-datos.md)
