# 🟡 Módulo 03: Interactividad, Formularios y Estado

> **"Una aplicación estática es como un póster en una pared. Un formulario interactivo es una conversación real entre tu usuario y tu código."**

¡Bienvenido al Módulo 03! En el capítulo anterior aprendiste a pintar en la pantalla tarjetas hermosas con fotos, botones e insignias. Sin embargo, todos esos datos estaban fijos en el código. Si querías cambiar el nombre de un contacto, tenías que abrir el editor de código y editarlo a mano. ¡Obviamente los usuarios reales no van a hacer eso!

En este módulo aprenderemos cómo hacer que tu aplicación escuche al usuario. Descubriremos qué es el **Estado (`useState`)** y cómo utilizar los componentes de formulario oficiales de `@alcspower/ui`: **`Input`**, **`Label`**, **`Field`**, **`Select`**, **`Checkbox`** y **`Switch`**.

Al final de este capítulo, habrás construido un formulario interactivo completo para **"Agregar Nuevos Contactos"** a tu aplicación.

---

## 📚 Lo que aprenderás en este capítulo

1. **¿Qué es el Estado en React (`useState`)?** La analogía del pizarrón borrable.
2. **El componente `Input`**: Cajas de texto modernas, props esenciales y estados de validación (`hasError` y `hasSuccess`).
3. **Accesibilidad con `Label` y `Field`**: Cómo agrupar etiquetas y entradas para que tu app sea accesible y ordenada.
4. **Menús desplegables con `Select`**: Selección de categorías con `SelectTrigger`, `SelectValue`, `SelectContent` y `SelectItem`.
5. **Casillas de verificación con `Checkbox`**: Opciones binarias de confirmación y permisos.
6. **Interruptores deslizantes con `Switch`**: Cuándo usar un Switch en lugar de un Checkbox.
7. **Mini-Proyecto**: Formulario interactivo "Agregar Contacto" con validación y guardado.
8. **¿Qué puede salir mal?**: Errores comunes al manejar entradas y formularios en React.
9. **Ejercicios prácticos** para poner a prueba tu destreza.

---

## 📋 1. ¿Qué es el Estado (`useState`)? (La analogía del Pizarrón Borrable)

Imagina que estás atendiendo la recepción de un hotel. En tu escritorio tienes un **pizarrón blanco borrable**:
- Cuando llega un huésped y te dice *"Mi nombre es Lucas"*, tomas el marcador y escribes en el pizarrón: `Lucas`.
- Si el huésped te dice *"Perdón, me llamo Lucas Gómez"*, tomas el borrador, borras lo anterior y escribes el nuevo texto.
- Cada vez que miras el pizarrón, sabes exactamente cuál es la información más actualizada.

En React, los componentes tradicionales se ejecutan y se olvidan de todo. Para que un componente tenga **memoria**, React nos proporciona una herramienta especial llamada **Hook**, específicamente el hook **`useState`**.

### ¿Cómo se escribe en código?

```tsx
// 1. Importamos useState desde la biblioteca central de React
import { useState } from 'react';

export function EjemploEstadoSimple() {
  // 2. Declaramos una variable de estado con su función modificadora
  //    [valorActual, funcionParaCambiarlo] = useState(valorInicial);
  const [nombre, setNombre] = useState('');

  return (
    <div>
      <p>El nombre en el pizarrón es: <strong>{nombre || '(Vacío)'}</strong></p>
      
      {/* Botón que escribe algo nuevo en el pizarrón */}
      <button onClick={() => setNombre('Lucas Gómez')}>
        Escribir nombre
      </button>

      {/* Botón que borra el pizarrón */}
      <button onClick={() => setNombre('')}>
        Borrar pizarrón
      </button>
    </div>
  );
}
```

> **Regla de oro de `useState`:**
> Nunca debes modificar la variable directamente haciendo `nombre = 'Lucas'`. En React, para que la pantalla se entere de que algo cambió y se vuelva a pintar de inmediato, **siempre debes usar la función actualizadora**, en este caso: `setNombre('Lucas')`.

---

## ✍️ 2. El Componente `Input`: Cajas de Texto Inteligentes

Un `Input` es la ventana a través de la cual el usuario escribe letras, números, correos o contraseñas. 

En `@alcspower/ui`, el componente `Input` no es solo una etiqueta aburrida de HTML: viene con diseño limpio, estados visuales para validación de errores y éxitos, soporte para diferentes tamaños y la posibilidad de incrustar iconos decorativos o informativos.

### Props principales del `Input`:

| Propiedad | Tipo | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| `value` | `string` | El texto actual que se muestra dentro de la caja. | `value={nombre}` |
| `onChange` | `function` | La función que se dispara cada vez que el usuario presiona una tecla. | `onChange={(e) => setNombre(e.target.value)}` |
| `placeholder` | `string` | Texto fantasma en gris que orienta al usuario antes de escribir. | `placeholder="Ej: Ana María"` |
| `hasError` | `boolean` | Si es `true`, pinta el borde en rojo de alerta. | `hasError={nombreEsInvalido}` |
| `hasSuccess` | `boolean` | Si es `true`, pinta el borde en verde de aprobación. | `hasSuccess={emailValido}` |
| `size` | `'sm' \| 'md' \| 'lg'` | El tamaño físico de la caja. Por defecto es `'md'`. | `size="lg"` |
| `disabled` | `boolean` | Si es `true`, deshabilita el campo en gris claro. | `disabled={true}` |

### Ejemplo: Un "Input Controlado" por Estado

Cuando conectamos el `value` de un input con una variable de estado y su evento `onChange` con la función `setNombre`, decimos que tenemos un **Input Controlado**:

```tsx
import { useState } from 'react';
import { Input } from '@alcspower/ui';

export function CampoDeTextoControlado() {
  const [texto, setTexto] = useState('');

  return (
    <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Input 
        placeholder="Escribe tu nombre..."
        value={texto}
        // Cada vez que el usuario teclea, actualizamos nuestro pizarrón
        onChange={(e) => setTexto(e.target.value)}
        hasSuccess={texto.length >= 3}
        hasError={texto.length > 0 && texto.length < 3}
      />

      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
        Caracteres escritos: {texto.length}
      </span>
    </div>
  );
}
```

---

## 🏷️ 3. `Label` y `Field`: Organización y Accesibilidad

En los sitios web antiguos, era muy común ver cajas de texto flotando solas sin saber a qué correspondían. Si una persona ciega usa un software lector de pantalla, la computadora necesita saber exactamente qué etiqueta describe a cada campo.

`@alcspower/ui` nos ofrece dos componentes para resolver esto de manera impecable:
1. **`Label`**: El texto explicativo (ejemplo: *"Correo Electrónico"* o *"Teléfono móvil"*).
2. **`Field`**: Un contenedor inteligente que envuelve el `Label`, el `Input` y posibles mensajes de ayuda o error, asegurando márgenes y espaciados simétricos.

### Ejemplo de uso con `Field`:

```tsx
import { Label, Field, Input } from '@alcspower/ui';

export function FormularioConField() {
  return (
    <div style={{ maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      
      {/* Campo 1: Nombre */}
      <Field>
        <Label htmlFor="nombre">Nombre Completo</Label>
        <Input id="nombre" placeholder="Ej: María José Morales" />
      </Field>

      {/* Campo 2: Correo */}
      <Field>
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input id="email" type="email" placeholder="maria@ejemplo.com" />
      </Field>

    </div>
  );
}
```

---

## 🔽 4. El Componente `Select`: Menús Desplegables Elegantes

Cuando queremos que el usuario elija **una sola opción dentro de una lista predefinida** (como la categoría de un contacto: *Amigo*, *Trabajo*, *Familiar*), el componente ideal es un **`Select`**.

En `@alcspower/ui`, el `Select` es un componente compuesto por varias piezas que trabajan en armonía:
- `<Select>`: El contenedor principal que almacena el valor actual y el evento de cambio.
- `<SelectTrigger>`: El botón rectangular visible donde el usuario hace clic para desplegar el menú.
- `<SelectValue>`: El texto que muestra la opción seleccionada o un texto orientador (*placeholder*).
- `<SelectContent>`: La cajita flotante con la lista de opciones.
- `<SelectItem>`: Cada una de las opciones seleccionables con su valor interno (`value`).

### Ejemplo paso a paso de `Select`:

```tsx
import { useState } from 'react';
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem,
  Field,
  Label
} from '@alcspower/ui';

export function SelectorDeCategoria() {
  // Estado para guardar la opción elegida
  const [categoria, setCategoria] = useState('');

  return (
    <Field style={{ maxWidth: '300px' }}>
      <Label>Categoría de Contacto</Label>
      
      {/* onValueChange recibe directamente el texto de la opción seleccionada */}
      <Select value={categoria} onValueChange={(nuevoValor) => setCategoria(nuevoValor)}>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona una categoría..." />
        </SelectTrigger>
        
        <SelectContent>
          <SelectItem value="amigos">Amigos y Conocidos</SelectItem>
          <SelectItem value="familia">Familia Directa</SelectItem>
          <SelectItem value="trabajo">Colegas de Trabajo</SelectItem>
          <SelectItem value="urgencias">Contactos de Emergencia</SelectItem>
        </SelectContent>
      </Select>

      {categoria && (
        <span style={{ fontSize: '0.8rem', color: '#10b981' }}>
          Seleccionaste: {categoria}
        </span>
      )}
    </Field>
  );
}
```

---

## ☑️ 5. El Componente `Checkbox`: Casillas de Selección

El `Checkbox` es una pequeña cajita cuadrada que puede estar marcada (`true`) o desmarcada (`false`). Se usa típicamente para:
- Aceptar términos y condiciones.
- Activar opciones secundarias (ejemplo: *"Permitir recibir notificaciones por correo"*).
- Seleccionar múltiples elementos dentro de una lista.

### Código de ejemplo con `Checkbox`:

```tsx
import { useState } from 'react';
import { Checkbox, Label } from '@alcspower/ui';

export function EjemploCheckbox() {
  const [recibirAlertas, setRecibirAlertas] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <Checkbox 
        id="alertas"
        checked={recibirAlertas} 
        onCheckedChange={(marcado) => setRecibirAlertas(marcado as boolean)} 
      />
      <Label htmlFor="alertas" style={{ cursor: 'pointer' }}>
        Recibir recordatorios de cumpleaños por correo
      </Label>
    </div>
  );
}
```

---

## 🎚️ 6. El Componente `Switch`: Interruptores de Estado Inmediato

Un `Switch` es un interruptor deslizante inspirado en los interruptores físicos de pared o en los ajustes de los teléfonos móviles modernos (iOS / Android).

### ¿Cuándo usar un `Switch` y cuándo un `Checkbox`?

| Control | ¿Cuándo preferirlo? | Metáfora mental |
| :--- | :--- | :--- |
| **`Switch`** | Cuando la acción tiene un efecto **inmediato** o representa encender/apagar una función. | Interruptor de la luz del cuarto (Encendido / Apagado). |
| **`Checkbox`** | Cuando la opción forma parte de un formulario largo que requiere presionar un botón final de "Guardar" o "Enviar". | Casilla de una encuesta impresa con lápiz. |

### Código de ejemplo con `Switch`:

```tsx
import { useState } from 'react';
import { Switch, Label } from '@alcspower/ui';

export function EjemploSwitch() {
  const [esFavorito, setEsFavorito] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '300px' }}>
      <div>
        <Label htmlFor="fav" style={{ display: 'block', fontWeight: 600 }}>Marcar como Favorito</Label>
        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Aparecerá fijado al inicio de la agenda</span>
      </div>

      <Switch 
        id="fav"
        checked={esFavorito}
        onCheckedChange={(activo) => setEsFavorito(activo)}
      />
    </div>
  );
}
```

---

## 🛠️ 7. Mini-Proyecto Práctico: Formulario Completo "Agregar Contacto"

Ahora uniremos todas las piezas en un formulario profesional y funcional. Este componente tendrá:
- Campo de **Nombre** (con validación de error si está vacío).
- Campo de **Teléfono**.
- Menú desplegable para **Categoría**.
- Interruptor para definir si es **Favorito**.
- Casilla para aceptar **Notificaciones**.
- Botón con estado de guardado dinámico.

Copia este código en tu archivo `src/App.tsx`:

```tsx
import { useState } from 'react';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  Field,
  Label,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Switch,
  Checkbox
} from '@alcspower/ui';

export default function App() {
  // 1. Estados para cada uno de los campos del formulario
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [categoria, setCategoria] = useState('');
  const [esFavorito, setEsFavorito] = useState(false);
  const [aceptaNotificaciones, setAceptaNotificaciones] = useState(true);

  // Estados para controlar la validación y el proceso de guardado
  const [huboIntentoEnvio, setHuboIntentoEnvio] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [contactoGuardado, setContactoGuardado] = useState<any>(null);

  // Comprobamos si el nombre es válido (mínimo 3 letras)
  const nombreInvalido = huboIntentoEnvio && nombre.trim().length < 3;

  // Función para procesar el envío del formulario
  const manejarGuardar = () => {
    setHuboIntentoEnvio(true);

    // Validación básica: El nombre no puede estar vacío
    if (nombre.trim().length < 3) {
      alert('Por favor ingresa un nombre válido de al menos 3 caracteres.');
      return;
    }

    // Simulamos una petición de guardado que toma 1.5 segundos
    setGuardando(true);
    setTimeout(() => {
      setGuardando(false);
      setContactoGuardado({
        nombre,
        telefono: telefono || 'Sin teléfono',
        categoria: categoria || 'Sin categoría',
        esFavorito,
        aceptaNotificaciones
      });
      alert('¡Contacto guardado exitosamente en la agenda!');
      
      // Reiniciamos los campos
      setNombre('');
      setTelefono('');
      setCategoria('');
      setEsFavorito(false);
      setHuboIntentoEnvio(false);
    }, 1500);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f1f5f9', 
      padding: '2rem 1rem',
      fontFamily: 'sans-serif'
    }}>
      
      {/* 🗂️ Tarjeta que contiene nuestro formulario */}
      <Card style={{ width: '100%', maxWidth: '440px', backgroundColor: '#ffffff' }}>
        
        <CardHeader>
          <CardTitle style={{ fontSize: '1.25rem' }}>➕ Nuevo Contacto</CardTitle>
          <CardDescription>
            Completa la información para agregar una persona a tu agenda.
          </CardDescription>
        </CardHeader>

        <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Campo: Nombre Completo */}
          <Field>
            <Label htmlFor="input-nombre">Nombre Completo *</Label>
            <Input 
              id="input-nombre"
              placeholder="Ej: Gabriela Silvas"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              hasError={nombreInvalido}
              hasSuccess={nombre.trim().length >= 3}
            />
            {nombreInvalido && (
              <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>
                El nombre debe tener al menos 3 caracteres.
              </span>
            )}
          </Field>

          {/* Campo: Teléfono */}
          <Field>
            <Label htmlFor="input-tel">Teléfono</Label>
            <Input 
              id="input-tel"
              placeholder="Ej: +505 8765-4321"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </Field>

          {/* Campo: Categoría (Select) */}
          <Field>
            <Label>Categoría</Label>
            <Select value={categoria} onValueChange={(val) => setCategoria(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Elige un grupo..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Amigo">Amigo</SelectItem>
                <SelectItem value="Familia">Familia</SelectItem>
                <SelectItem value="Trabajo">Trabajo</SelectItem>
                <SelectItem value="Cliente">Cliente</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* Campo: Switch para Favorito */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '0.75rem', 
            backgroundColor: '#f8fafc', 
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0'
          }}>
            <div>
              <Label htmlFor="switch-fav" style={{ fontWeight: 600, display: 'block', cursor: 'pointer' }}>
                Contacto Favorito ⭐
              </Label>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Fijar en la parte superior de tu lista
              </span>
            </div>
            <Switch 
              id="switch-fav"
              checked={esFavorito}
              onCheckedChange={setEsFavorito}
            />
          </div>

          {/* Campo: Checkbox para Notificaciones */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Checkbox 
              id="check-notif"
              checked={aceptaNotificaciones}
              onCheckedChange={(marcado) => setAceptaNotificaciones(marcado as boolean)}
            />
            <Label htmlFor="check-notif" style={{ fontSize: '0.85rem', cursor: 'pointer' }}>
              Deseo recibir recordatorios de eventos para este contacto
            </Label>
          </div>

        </CardContent>

        <CardFooter style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
          <Button 
            variant="outline" 
            onClick={() => {
              setNombre('');
              setTelefono('');
              setCategoria('');
            }}
            disabled={guardando}
          >
            Limpiar
          </Button>

          <Button 
            variant="primary" 
            onClick={manejarGuardar}
            isLoading={guardando}
            loadingText="Guardando contacto..."
          >
            Guardar Contacto
          </Button>
        </CardFooter>

      </Card>

      {/* Tarjeta de Confirmación de Datos Guardados (si existe) */}
      {contactoGuardado && (
        <div style={{ marginTop: '1.5rem', width: '100%', maxWidth: '440px', padding: '1rem', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '0.5rem' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#065f46' }}>✅ Último Contacto Guardado:</h4>
          <p style={{ margin: 0, fontSize: '0.875rem' }}><strong>Nombre:</strong> {contactoGuardado.nombre}</p>
          <p style={{ margin: 0, fontSize: '0.875rem' }}><strong>Teléfono:</strong> {contactoGuardado.telefono}</p>
          <p style={{ margin: 0, fontSize: '0.875rem' }}><strong>Categoría:</strong> {contactoGuardado.categoria}</p>
          <p style={{ margin: 0, fontSize: '0.875rem' }}><strong>¿Favorito?:</strong> {contactoGuardado.esFavorito ? 'Sí ⭐' : 'No'}</p>
        </div>
      )}

    </div>
  );
}
```

---

## ⚠️ ¿Qué puede salir mal? (Errores Comunes en Formularios)

### 1. El Input no te deja escribir nada en la caja
- **Causa**: Le pusiste `value={nombre}` pero olvidaste escribir la propiedad `onChange={(e) => setNombre(e.target.value)}`.
- **Explicación**: React congela el input con el valor inicial de la variable. Si no le enseñas cómo actualizar la variable cuando presionas una tecla, el input permanecerá bloqueado.

### 2. Error al hacer clic en las opciones del `Select`
- **Causa**: Olvidaste importar o anidar correctamente los componentes hijos (`SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`).
- **Solución**: Asegúrate de que cada opción esté envuelta en un `<SelectItem value="...">Texto</SelectItem>`. Recuerda que la prop se llama `value`, no `val` ni `id`.

### 3. El Switch o Checkbox no cambian de posición
- **Causa**: En el evento `onCheckedChange` estás intentando leer `e.target.checked` como si fuera un evento nativo de HTML.
- **Solución**: En `@alcspower/ui`, `onCheckedChange` te entrega directamente el nuevo valor booleano: `onCheckedChange={(nuevoEstado) => setEstado(nuevoEstado)}`.

---

## 🧪 Ejercicios de Consolidación

Para afianzar tu aprendizaje antes de pasar al siguiente módulo:

1. **Agrega un campo de Correo Electrónico (`Input`)**:
   - Debe tener la prop `type="email"`.
   - Si contiene una arroba (`@`), haz que se muestre en verde usando `hasSuccess={email.includes('@')}`.
2. **Agrega un campo de Notas Adicionales**:
   - Usa un `Input` o área de texto para escribir detalles como *"Nos conocimos en el congreso de 2025"*.
3. **Muestra el total de contactos**:
   - Modifica el estado para que, en lugar de guardar un solo contacto, guarde una lista de contactos y muestre cuántos has registrado.

---

## ✅ Resumen del Módulo 03

En este módulo lograste:
- Comprender qué es el **Estado (`useState`)** y cómo darle memoria viva a tus componentes en React.
- Dominar el componente **`Input`**, sus estados de validación en tiempo real (`hasError` y `hasSuccess`) y cómo controlarlo con eventos de teclado.
- Utilizar **`Label`** y **`Field`** para construir formularios accesibles y con espaciados perfectos.
- Implementar selectores desplegables con **`Select`** y sus piezas modulares.
- Conocer la diferencia conceptual y práctica entre **`Checkbox`** y **`Switch`**.
- Ensamblar un formulario completo de captura de datos con confirmación visual.

¡Has dado un salto gigantesco! Ya sabes crear interfaces y capturar información interactiva. En el próximo módulo exploraremos la organización de vistas complejas mediante pestañas (**`Tabs`**), divisores (**`Separator`**) y ventanas de diálogo emergentes.

---

| [← Módulo 02: Primer Componente](02-primer-componente.md) | [Módulo 04: Estructuras y Navegación →](04-layouts.md) |
| :--- | ---: |
