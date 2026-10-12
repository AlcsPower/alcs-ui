# 🟡 Módulo 02: Tus Primeros Componentes Visuales

> **"Una gran catedral se construye piedra por piedra. Una gran aplicación web se construye componente por componente."**

¡Bienvenido al Módulo 02! Si completaste con éxito el módulo anterior, ya tienes tu proyecto corriendo y pudiste ver tu primer botón en pantalla. ¡Ese fue tu primer paso real en el desarrollo web moderno!

En este capítulo vamos a explorar a fondo los tres bloques visuales más comunes e indispensables en cualquier aplicación moderna: **`Button`** (Botones), **`Badge`** (Insignias o etiquetas de estado) y **`Avatar`** (Fotos de perfil de usuario). Además, aprenderemos a integrarlos dentro de un contenedor estructurado llamado **`Card`** (Tarjeta), creando el primer ladrillo real de nuestra **Agenda de Contactos**.

---

## 📚 Lo que aprenderás en este capítulo

1. **La anatomía del componente `Button`**:
   - Todas sus variantes visuales (`primary`, `secondary`, `outline`, `ghost`, `destructive`, `link`).
   - Los diferentes tamaños disponibles (`sm`, `md`, `lg`, `icon`, etc.).
   - Manejo de estados de carga (`isLoading` y `loadingText`).
2. **El componente `Badge`**:
   - Para qué sirve comunicar estados (activo, pendiente, ausente, error).
   - Guía de colores y variantes semánticas.
3. **El componente `Avatar`**:
   - Círculos de imagen modernos con soporte de imagen (`AvatarImage`).
   - Mecanismo de respaldo inteligente con iniciales (`AvatarFallback`).
4. **El contenedor `Card`**:
   - Organización con cabecera, título, descripción, contenido y pie de tarjeta.
5. **Mini-Proyecto Práctico**: Creación de una tarjeta de perfil de contacto profesional uniendo los 4 componentes.
6. **¿Qué puede salir mal?**: Errores comunes al usar props y componentes visuales.
7. **Ejercicios de consolidación**.

---

## 🔘 1. El Componente `Button`: Tu Gatillo de Acciones

En cualquier interfaz digital, el botón es el elemento que le permite al usuario decir: *"¡Haz esto ahora!"*. Ya sea guardar una foto, enviar un mensaje, cancelar una suscripción o abrir un menú, los botones comunican **intención** e **importancia**.

En `@alcspower/ui`, el componente `Button` viene con estilos refinados, soporte para accesibilidad con teclado y múltiples estados visuales listos para usar.

### Ejemplo Básico

```tsx
// 1. Importamos el componente desde la biblioteca
import { Button } from '@alcspower/ui';

export function EjemploBotonSimple() {
  return (
    // 2. Usamos el botón con su variante por defecto
    <Button 
      variant="primary" 
      size="md" 
      onClick={() => alert('¡Hiciste clic!')}
    >
      Guardar Contacto
    </Button>
  );
}
```

---

### 🎨 Tabla de Variantes: ¿Cuándo usar cada una?

No todos los botones deben lucir iguales. Si pones 10 botones azules idénticos en la misma pantalla, el usuario no sabrá cuál es el más importante. Por eso existen las **variantes**:

| Variante | Aspecto Visual | ¿Cuándo deberías usarlo? | Ejemplo en la vida real |
| :--- | :--- | :--- | :--- |
| `variant="primary"` | Fondo sólido oscuro/azul con texto blanco. Muy llamativo. | Para la **acción principal** de la pantalla. Solo debería haber uno por vista principal. | "Crear nuevo contacto", "Guardar cambios". |
| `variant="secondary"` | Fondo gris neutro o suave con texto oscuro. | Para acciones secundarias que acompañan a la principal. | "Exportar contactos", "Ver historial". |
| `variant="outline"` | Fondo transparente con borde visible delineado. | Para acciones neutras o secundarias que no deben competir con el botón primario. | "Filtrar", "Cancelar", "Atrás". |
| `variant="ghost"` | Sin fondo ni borde; solo cambia al pasar el ratón (hover). | Para barras de herramientas o botones discretos que deben verse limpios. | Botón de cerrar (X), iconos de menú. |
| `variant="destructive"` | Fondo rojo intenso con texto blanco de alerta. | **¡Acciones peligrosas o irreversibles!** Alertan al usuario de que algo se eliminará. | "Eliminar contacto", "Borrar cuenta". |
| `variant="link"` | Parece un texto subrayado interactivo sin forma de botón. | Para acciones de navegación sutiles dentro de formularios o textos. | "¿Olvidaste tu contraseña?", "Términos". |

#### Código comparativo de variantes:

```tsx
import { Button } from '@alcspower/ui';

export function MuestrarioDeBotones() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Guardar (Primary)</Button>
      <Button variant="secondary">Editar (Secondary)</Button>
      <Button variant="outline">Cancelar (Outline)</Button>
      <Button variant="ghost">Opciones (Ghost)</Button>
      <Button variant="destructive">Eliminar (Destructive)</Button>
      <Button variant="link">Ver detalles (Link)</Button>
    </div>
  );
}
```

---

### 📏 Tamaños de Botón (`size`)

Dependiendo de dónde coloques el botón (dentro de una tabla apretada, en una cabecera amplia o como un icono redondo), necesitarás diferentes dimensiones:

- `size="sm"`: Pequeño y compacto (ideal para filas de tablas o tarjetas compactas).
- `size="md"`: Tamaño mediano estándar (el valor por defecto; ideal para formularios generales).
- `size="lg"`: Tamaño grande y generoso (ideal para llamadas a la acción principales o pantallas móviles).
- `size="icon"`: Botón cuadrado proporcionado para contener exclusivamente un icono (por ejemplo, una lupa o un lápiz).
- `size="icon-sm"`: Icono pequeño para barras compactas.
- `size="icon-lg"`: Icono grande para cabeceras principales.

```tsx
<Button size="sm">Pequeño</Button>
<Button size="md">Estándar</Button>
<Button size="lg">Grande y Visible</Button>
```

---

### ⏳ Estados de Carga (`isLoading` y `loadingText`)

¿Alguna vez hiciste clic en "Pagar" o "Guardar" en una página web y no pasó nada durante 3 segundos, lo que te hizo presionar el botón 5 veces seguidas por desesperación? Eso ocurre cuando los programadores no muestran un estado de carga.

El botón de `@alcspower/ui` resuelve esto de forma brillante y automática:

```tsx
import { Button } from '@alcspower/ui';

export function BotonGuardando() {
  return (
    <Button 
      variant="primary" 
      isLoading={true} 
      loadingText="Guardando en la nube..."
    >
      Guardar Contacto
    </Button>
  );
}
```

> **¿Qué hace automáticamente `@alcspower/ui` por ti?**
> 1. Deshabilita el botón para que el usuario no pueda hacer clics repetidos accidentalmente.
> 2. Muestra un icono giratorio animado (spinner).
> 3. Reemplaza el texto original por el texto de `loadingText`.

---

## 🏷️ 2. El Componente `Badge`: Etiquetas de Estado

Un `Badge` (insignia o cucarda) es una pequeña pastilla de color con texto que se utiliza para comunicar el estado, tipo o categoría de un elemento sin ocupar mucho espacio.

En nuestra Agenda de Contactos, usaremos los badges para mostrar si un contacto está:
- 🟢 **Activo** (`variant="success"`)
- 🟡 **Pendiente de confirmación** (`variant="warning"`)
- 🔴 **Bloqueado o Inactivo** (`variant="destructive"`)
- 🔵 **Información / Nuevo** (`variant="info"`)
- ⚪ **Categoría general** (`variant="secondary"` o `variant="outline"`)

### Ejemplo de uso:

```tsx
import { Badge } from '@alcspower/ui';

export function MuestrarioBadges() {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Badge variant="success">Activo</Badge>
      <Badge variant="warning">Pendiente</Badge>
      <Badge variant="destructive">Bloqueado</Badge>
      <Badge variant="info">Nuevo</Badge>
      <Badge variant="outline" size="sm">Amigo</Badge>
    </div>
  );
}
```

### Tamaños disponibles:
- `size="md"`: Tamaño estándar, perfecto para cabeceras de tarjeta.
- `size="sm"`: Tamaño ultracompacto para tablas densas o detalles secundarios.

---

## 👤 3. El Componente `Avatar`: Rostros Humanos en tu App

Un `Avatar` representa a una persona u organización. En aplicaciones reales, las fotos de perfil tienen un gran problema: **las imágenes en internet a veces fallan al cargar** (el enlace se rompe, la conexión del usuario es lenta o el contacto simplemente nunca subió una foto).

`@alcspower/ui` implementa un sistema inteligente compuesto por tres piezas:
1. `<Avatar>`: El contenedor circular con bordes redondeados y sombra suave.
2. `<AvatarImage>`: La imagen de la foto con su dirección `src` y texto alternativo `alt`.
3. `<AvatarFallback>`: El contenido de respaldo (normalmente las dos iniciales del nombre de la persona, por ejemplo "CR" para Carlos Rodríguez). Si la imagen tarda o falla en cargar, ¡el fallback se muestra automáticamente!

### Ejemplo práctico:

```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@alcspower/ui';

export function EjemploAvatar() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      {/* 1. Avatar con foto válida */}
      <Avatar>
        <AvatarImage 
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" 
          alt="Foto de Ana Morales" 
        />
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>

      {/* 2. Avatar donde la foto no existe o falló (muestra el respaldo) */}
      <Avatar>
        <AvatarImage 
          src="https://enlace-roto-que-no-existe.com/foto.jpg" 
          alt="Foto de Carlos Ruiz" 
        />
        <AvatarFallback>CR</AvatarFallback>
      </Avatar>
    </div>
  );
}
```

---

## 🗂️ 4. El Componente `Card`: La Estructura de Tarjeta

Ahora que tenemos los bloques pequeños, necesitamos un contenedor donde colocarlos de forma armoniosa. Una **`Card`** (tarjeta) agrupa información relacionada en una caja limpia con bordes suaves, sombra sutil y fondo claro.

En `@alcspower/ui`, la tarjeta está diseñada en piezas semánticas para dar máxima claridad:

```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@alcspower/ui';

export function TarjetaEstructura() {
  return (
    <Card style={{ maxWidth: '400px' }}>
      <CardHeader>
        <CardTitle>Título de la Tarjeta</CardTitle>
        <CardDescription>Una breve descripción explicativa</CardDescription>
      </CardHeader>
      
      <CardContent>
        <p>Aquí va el cuerpo principal con los datos que quieras mostrar.</p>
      </CardContent>
      
      <CardFooter>
        <p>Aquí suelen colocarse los botones de acción al fondo.</p>
      </CardFooter>
    </Card>
  );
}
```

---

## 🛠️ 5. Mini-Proyecto Práctico: Tu Primera Tarjeta de Contacto

¡Es hora de unir todo lo aprendido! Vamos a crear una tarjeta de contacto profesional para nuestra agenda, utilizando juntos:
- `Card` como estructura.
- `Avatar` para la foto del contacto.
- `Badge` para mostrar su estado de disponibilidad y su categoría.
- `Button` para las acciones de "Llamar", "Mensaje" y "Eliminar".

Copia el siguiente código en tu archivo `src/App.tsx`:

```tsx
import { useState } from 'react';
// Importamos todos los componentes que necesitamos de @alcspower/ui
import { 
  Button, 
  Badge, 
  Avatar, 
  AvatarImage, 
  AvatarFallback,
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@alcspower/ui';

export default function App() {
  // Estado local para simular que estamos llamando al contacto
  const [estaLlamando, setEstaLlamando] = useState(false);

  // Función que simula una llamada durante 2 segundos
  const simularLlamada = () => {
    setEstaLlamando(true);
    setTimeout(() => {
      setEstaLlamando(false);
      alert('Llamada finalizada con éxito.');
    }, 2000);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      padding: '1.5rem'
    }}>
      {/* 🗂️ Tarjeta principal de contacto */}
      <Card style={{ width: '100%', maxWidth: '380px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        
        {/* Cabecera de la tarjeta: Avatar + Nombre + Insignia */}
        <CardHeader style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
          
          {/* 👤 Avatar con imagen y fallback de iniciales */}
          <Avatar>
            <AvatarImage 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" 
              alt="Foto de Sofía Mendoza" 
            />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>

          {/* Textos de la cabecera */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <CardTitle style={{ margin: 0, fontSize: '1.15rem' }}>Sofía Mendoza</CardTitle>
              {/* 🏷️ Badge que indica que está activa */}
              <Badge variant="success" size="sm">Activa</Badge>
            </div>
            <CardDescription style={{ margin: 0, marginTop: '0.25rem' }}>
              Diseñadora UI/UX
            </CardDescription>
          </div>
        </CardHeader>

        {/* Cuerpo de la tarjeta: Información de contacto */}
        <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#475569' }}>
          <div>
            <strong>Email:</strong> sofia.mendoza@ejemplo.com
          </div>
          <div>
            <strong>Teléfono:</strong> +505 8888-9999
          </div>
          <div>
            <strong>Categoría:</strong> <Badge variant="outline" size="sm">Trabajo</Badge>
          </div>
        </CardContent>

        {/* Pie de la tarjeta: Botones de interacción */}
        <CardFooter style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
          {/* Botón primario con soporte para estado de carga */}
          <Button 
            variant="primary" 
            size="sm" 
            onClick={simularLlamada}
            isLoading={estaLlamando}
            loadingText="Marcando..."
          >
            Llamar
          </Button>

          {/* Botón secundario para enviar mensaje */}
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => alert('Abriendo chat con Sofía...')}
          >
            Mensaje
          </Button>

          {/* Botón destructivo para borrar el contacto */}
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => confirm('¿Estás seguro de que deseas eliminar este contacto?')}
          >
            Eliminar
          </Button>
        </CardFooter>

      </Card>
    </div>
  );
}
```

---

## ⚠️ ¿Qué puede salir mal? (Solución de Problemas)

1. **`Module not found: Can't resolve '@alcspower/ui'`**:
   - Revisa si escribiste exactamente `@alcspower/ui` (con la arroba y la barra inclinada).
   - Recuerda verificar que el archivo `.npmrc` esté en la raíz de tu proyecto si necesitas reinstalar paquetes.

2. **El Avatar no muestra la foto y solo muestra las letras iniciales**:
   - ¡Eso no es un error, es el sistema de respaldo funcionando! Si la URL de la imagen está mal escrita, bloqueada por tu red o no tiene conexión a internet, el componente automáticamente protege tu pantalla mostrando el `AvatarFallback`.

3. **Error de TypeScript: `Type '"azul"' is not assignable to type 'ButtonVariants'`**:
   - Recuerda que TypeScript vigila tus palabras. No puedes inventar nombres de variantes como `"azul"`. Debes usar las opciones exactas: `"primary"`, `"secondary"`, `"outline"`, `"ghost"`, `"destructive"`, `"link"`.

---

## 🧪 Ejercicios de Consolidación

Para dominar estos componentes:
1. **Crea una segunda tarjeta** para un contacto llamado *"Carlos Fuentes"*:
   - Debe tener un `Badge` con `variant="warning"` que diga `"Ausente"`.
   - Su categoría debe ser un `Badge` con `variant="secondary"` que diga `"Familiar"`.
2. **Crea una tercera tarjeta** para un contacto llamado *"Roberto Gómez"*:
   - En la imagen del Avatar pon una URL rota a propósito (por ejemplo `src="invalido"`) para verificar que su `AvatarFallback` muestra `"RG"`.
   - Ponle un `Badge` con `variant="destructive"` que diga `"Bloqueado"`.
3. Agrupa las tres tarjetas en una fila o cuadrícula horizontal utilizando `display: 'flex', gap: '1rem'`.

---

## ✅ Resumen del Módulo 02

En este módulo aprendiste:
- Cómo utilizar el componente **`Button`**, sus 6 variantes de diseño, sus tamaños y cómo activar el estado de carga animado con `isLoading`.
- Cómo usar **`Badge`** para comunicar información de estado de forma visual e intuitiva con colores estándar.
- Cómo estructurar el componente **`Avatar`** con imágenes seguras que nunca dejan un espacio vacío gracias al `AvatarFallback`.
- Cómo empaquetar todo de forma profesional y ordenada dentro del componente **`Card`**.

¡Ya sabes armar interfaces visuales hermosas! Pero hasta ahora, los datos están fijos en el código. En el siguiente módulo aprenderemos cómo permitir que el usuario ingrese su propio nombre, teléfono y categoría a través de **Formularios interactivos y el concepto de Estado (`useState`)**.

---

| [← Módulo 01: Instalación](01-instalacion.md) | [Módulo 03: Formularios y Estado →](03-formularios.md) |
| :--- | ---: |
