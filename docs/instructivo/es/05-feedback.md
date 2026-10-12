# Capítulo 5: Feedback - Cómo tu app le habla al usuario

¿Alguna vez has presionado un botón en un sitio web y no pasó absolutamente nada durante 5 segundos? Seguro te preguntaste: *"¿Hice clic bien? ¿Se trabó la página? ¿Se cayó el internet? ¿Le doy clic otra vez?"*.

Cuando una aplicación no responde de inmediato, los usuarios se sienten confundidos, frustrados y desconfiados. En el mundo de la programación, la solución a este problema se llama **Feedback** (retroalimentación).

El feedback es la forma en que tu aplicación le comunica al usuario qué está sucediendo en cada momento: si una acción fue exitosa, si hubo un error, o si la app está trabajando en segundo plano mientras carga los datos.

En este capítulo aprenderás a usar los 5 componentes esenciales de feedback de `@alcspower/ui`: **Alert**, **Toast**, **Spinner**, **Skeleton** y **Progress**.

---

## 📚 Lo que aprenderás en este capítulo

1. **La psicología del feedback**: Por qué una aplicación sin mensajes claros parece "rota".
2. **Alert vs Toast**: Cuándo usar una notificación permanente dentro de la página vs una notificación flotante efímera.
3. **El componente `Alert`**:
   - Variantes semánticas: `default`, `destructive`, `success`, `warning`, `info`.
   - Subcomponentes: `AlertTitle` y `AlertDescription`.
4. **El componente `Toast` (Notificaciones emergentes)**:
   - Configuración global del contenedor `<Toaster />`.
   - Disparo interactivo de mensajes: `toast.success`, `toast.error`, `toast.warning` y `toast()`.
   - Opciones prácticas: posición y duración.
5. **Indicadores de espera (`Spinner`, `Skeleton`, `Progress`)**:
   - `Spinner`: El clásico indicador de giro para botones y acciones rápidas.
   - `Skeleton`: El esqueleto moderno que simula la silueta de los datos mientras viajan desde el servidor.
   - `Progress`: La barra de avance cuantitativo (0% a 100%).
6. **Mini-proyecto práctico**: Estados de carga y respuestas interactivas en la Agenda de Contactos.
7. **¿Qué puede salir mal?**: Errores comunes y cómo evitarlos.
8. **Ejercicio interactivo**: Integrar una barra de progreso en el formulario.

---

## 1. Cómo tu app le habla al usuario: La analogía del restaurante

Imagina que entras a un restaurante:

1. **El mesero toma tu orden y dice: "En 15 minutos se lo traigo"**: Ese es un **Toast** o mensaje de confirmación inmediata. Te tranquiliza saber que tu petición fue recibida.
2. **En la mesa hay un letrero que dice: "Piso mojado, cuidado al caminar"**: Esa es una **Alert**. Es un mensaje fijo, visible y relevante para el lugar donde estás parado.
3. **Miras hacia la cocina y ves al cocinero batiendo los ingredientes**: Ese es un **Spinner**. Te indica que alguien está trabajando activamente en tu pedido.
4. **El mesero coloca platos vacíos, cubiertos y servilletas antes de que llegue la comida**: Ese es un **Skeleton**. Te prepara el espacio con la forma física aproximada de lo que vas a recibir.
5. **El horno tiene una pantalla digital que muestra: "Horneado al 75%"**: Ese es un **Progress**. Te permite saber cuánto falta exactamente para terminar.

Cuando combinas estas herramientas, tu usuario nunca se siente abandonado.

---

## 2. El componente `Alert`: Avisos persistentes en contexto

### ¿Qué es una Alert?

Una alerta es un bloque visual destacado que se ubica **dentro del flujo regular de la página**. A diferencia de los avisos emergentes que desaparecen a los pocos segundos, una alerta permanece visible para que el usuario pueda leerla con calma y tomar una decisión reflexiva.

Se usa comúnmente para:
- Mensajes de advertencia importantes sobre una sección.
- Errores críticos de validación que bloquean el guardado de un formulario.
- Anuncios institucionales o informativos permanentes.

### Anatomía de una Alert

```tsx
import { Alert, AlertTitle, AlertDescription } from '@alcspower/ui';
```

- **`Alert`**: El contenedor con borde, fondo semántico e icono apropiado.
- **`AlertTitle`**: El título en negrita que resume la situación.
- **`AlertDescription`**: La explicación detallada o los pasos a seguir.

### Las 5 variantes semánticas

La propiedad `variant` define el color y el tono emocional de la alerta:

| Variante | Tono / Color | Cuándo utilizarla |
| :--- | :--- | :--- |
| `default` | Neutro / Gris | Información general o notas complementarias. |
| `info` | Azul / Calmo | Explicaciones de novedades, consejos o recordatorios útiles. |
| `success` | Verde / Positivo | Confirmaciones permanentes de procesos completados. |
| `warning` | Amarillo / Precaución | Advertencias que no detienen el proceso pero requieren atención. |
| `destructive` | Rojo / Peligro | Errores críticos, fallas del servidor o pérdida irreversible de datos. |

### Ejemplos comentados de cada variante

```tsx
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@alcspower/ui';

export function CatalogoAlertas() {
  return (
    <div className="space-y-4 max-w-xl mx-auto p-4">
      {/* 1. Variante por defecto (Neutral) */}
      <Alert variant="default">
        <AlertTitle>Nota de privacidad</AlertTitle>
        <AlertDescription>
          Los contactos registrados solo serán visibles para miembros de tu equipo.
        </AlertDescription>
      </Alert>

      {/* 2. Variante informativa (Azul) */}
      <Alert variant="info">
        <AlertTitle>Nueva función disponible</AlertTitle>
        <AlertDescription>
          Ahora puedes exportar tu lista de contactos a formato Excel con un solo clic.
        </AlertDescription>
      </Alert>

      {/* 3. Variante de éxito (Verde) */}
      <Alert variant="success">
        <AlertTitle>¡Sincronización completa!</AlertTitle>
        <AlertDescription>
          Se importaron 45 contactos desde la base de datos central sin inconvenientes.
        </AlertDescription>
      </Alert>

      {/* 4. Variante de advertencia (Amarillo) */}
      <Alert variant="warning">
        <AlertTitle>Espacio de almacenamiento al 85%</AlertTitle>
        <AlertDescription>
          Estás cerca del límite de contactos permitidos en el plan gratuito.
        </AlertDescription>
      </Alert>

      {/* 5. Variante destructiva / error (Rojo) */}
      <Alert variant="destructive">
        <AlertTitle>No se pudo conectar con el servidor</AlertTitle>
        <AlertDescription>
          Verifica tu conexión a internet e inténtalo nuevamente en unos minutos.
        </AlertDescription>
      </Alert>
    </div>
  );
}
```

---

## 3. El componente `Toast`: Notificaciones emergentes efímeras

### ¿Qué es un Toast?

El nombre *toast* proviene de la tostadora de pan física: cuando el pan está listo, salta hacia arriba sorpresivamente. En desarrollo web, un Toast es una pequeña tarjeta flotante que aparece en una esquina de la pantalla, notifica un suceso rápido y **desaparece sola después de unos segundos**.

### ¿Cuándo usar Alert vs Toast?

| Criterio | Alert | Toast |
| :--- | :--- | :--- |
| **Ubicación** | Dentro del contenido de la página. | Flotando en una esquina (pantalla completa). |
| **Duración** | Permanente hasta que la página cambie o el usuario la cierre. | Temporal (desaparece a los 3-5 segundos). |
| **Propósito** | Avisos que el usuario necesita consultar mientras trabaja. | Confirmaciones rápidas ("Guardado", "Copiado"). |
| **Interrupción** | Ocupa espacio físico en el flujo. | No desplaza el contenido de la página. |

### Paso 1: Configurar el `<Toaster />` en la raíz de tu app

Para que los toasts puedan aparecer, necesitas colocar el contenedor `<Toaster />` una sola vez en el archivo raíz de tu aplicación (típicamente `App.tsx` o `main.tsx`).

```tsx
// src/App.tsx
import React from 'react';
import { Toaster } from '@alcspower/ui';
import { MiComponente } from './MiComponente';

export function App() {
  return (
    <div className="min-h-screen bg-background">
      <MiComponente />
      
      {/* Contenedor global de notificaciones */}
      {/* richColors activa colores vibrantes (verde para éxito, rojo para error, etc.) */}
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
```

### Paso 2: Disparar notificaciones con `toast`

Una vez configurado el `Toaster`, puedes importar la función `toast` desde cualquier archivo o componente y llamarla en respuesta a acciones del usuario:

```tsx
import { toast } from '@alcspower/ui';

// Éxito (verde)
toast.success('¡Contacto guardado con éxito!');

// Error (rojo)
toast.error('No se pudo eliminar el contacto. Inténtalo de nuevo.');

// Advertencia (amarillo)
toast.warning('Por favor revisa el formato del número telefónico.');

// Neutro o genérico
toast('Enlace copiado al portapapeles.');
```

### Ejemplo completo con botones interactivos

```tsx
import React from 'react';
import { Button, toast } from '@alcspower/ui';

export function DemostracionToasts() {
  return (
    <div className="flex flex-wrap gap-3 p-6 border rounded-xl">
      <Button
        variant="default"
        onClick={() => toast.success('Contacto guardado correctamente')}
      >
        Disparar Éxito
      </Button>

      <Button
        variant="destructive"
        onClick={() => toast.error('Error al conectar con la base de datos')}
      >
        Disparar Error
      </Button>

      <Button
        variant="outline"
        onClick={() => toast.warning('Quedan pocos cupos para este evento')}
      >
        Disparar Advertencia
      </Button>

      <Button
        variant="secondary"
        onClick={() => toast('Borrador guardado automáticamente')}
      >
        Disparar Neutral
      </Button>
    </div>
  );
}
```

---

## 4. Indicadores de Carga: Spinner, Skeleton y Progress

Cuando una aplicación envía datos a un servidor o consulta una API, la respuesta no es inmediata: puede tomar entre 200 milisegundos y varios segundos. Mostrar un estado de carga adecuado reduce drásticamente la ansiedad del usuario.

### A. El componente `Spinner`

El `Spinner` es un icono circular animado que gira indefinidamente. Es ideal cuando el usuario debe esperar una acción puntual, como el clic en un botón.

#### Importación y tamaños
```tsx
import { Spinner } from '@alcspower/ui';

// Tamaños disponibles: 'sm' | 'md' | 'lg'
<Spinner size="sm" />  // Para botones compactos
<Spinner size="md" />  // Para tarjetas o modales
<Spinner size="lg" />  // Para pantallas de carga completa
```

#### Patrón clásico: Botón con estado de carga
```tsx
import React, { useState } from 'react';
import { Button, Spinner } from '@alcspower/ui';

export function BotonGuardar() {
  const [guardando, setGuardando] = useState(false);

  const ejecutarGuardado = () => {
    setGuardando(true);
    // Simulamos una petición de 2 segundos a un servidor
    setTimeout(() => {
      setGuardando(false);
    }, 2000);
  };

  return (
    <Button onClick={ejecutarGuardado} disabled={guardando}>
      {guardando ? (
        <>
          <Spinner size="sm" className="mr-2" />
          Guardando cambios...
        </>
      ) : (
        'Guardar Contacto'
      )}
    </Button>
  );
}
```

---

### B. El componente `Skeleton`

#### ¿Qué es un Skeleton? (La analogía de la silueta)
¿Has notado cómo aplicaciones como Facebook, LinkedIn o YouTube muestran cajas grises pulsantes con la forma de las fotos y los textos antes de que carguen las publicaciones reales?

Eso es un **Skeleton** (esqueleto). En lugar de mostrar un spinner aburrido en el centro de la pantalla, el Skeleton reproduce la silueta y distribución de la interfaz. Esto produce una ilusión óptica de mayor velocidad y reduce saltos bruscos de diseño cuando los datos finalmente aparecen.

#### Importación y uso
```tsx
import { Skeleton } from '@alcspower/ui';

// Simular una tarjeta de contacto cargando:
<div className="flex items-center space-x-4 p-4 border rounded-lg">
  {/* Silueta de un avatar circular */}
  <Skeleton className="h-12 w-12 rounded-full" />
  
  <div className="space-y-2">
    {/* Silueta del título o nombre */}
    <Skeleton className="h-4 w-[250px]" />
    {/* Silueta del subtítulo o teléfono */}
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>
```

#### El patrón condicional: `cargando ? <Skeleton /> : <Datos />`
```tsx
export function ListaContactosConSkeleton({ cargando, contactos }: any) {
  if (cargando) {
    return (
      <div className="space-y-3">
        {/* Mostramos 3 esqueletos para simular 3 filas */}
        {[1, 2, 3].map((n) => (
          <div key={n} className="p-4 border rounded-lg space-y-2">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {contactos.map((c: any) => (
        <div key={c.id} className="p-4 border rounded-lg">
          <h4 className="font-bold">{c.nombre}</h4>
          <p className="text-sm text-muted-foreground">{c.telefono}</p>
        </div>
      ))}
    </div>
  );
}
```

---

### C. El componente `Progress`

El componente `Progress` es una barra horizontal que representa el porcentaje de avance de una operación conocida (por ejemplo, subir un archivo de 5 MB o completar 4 pasos de un registro).

#### Importación y uso
```tsx
import { Progress } from '@alcspower/ui';

// value acepta un número de 0 a 100
<Progress value={75} />
<Progress value={30} className="h-2" />
```

#### Ejemplo con simulación temporal mediante `setInterval`
```tsx
import React, { useState, useEffect } from 'react';
import { Progress, Button } from '@alcspower/ui';

export function DescargaSimulada() {
  const [progreso, setProgreso] = useState(0);
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    if (!activo) return;

    const intervalo = setInterval(() => {
      setProgreso((prev) => {
        if (prev >= 100) {
          clearInterval(intervalo);
          setActivo(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(intervalo);
  }, [activo]);

  const iniciar = () => {
    setProgreso(0);
    setActivo(true);
  };

  return (
    <div className="space-y-3 max-w-sm p-4 border rounded-xl">
      <div className="flex justify-between text-sm">
        <span className="font-medium">Exportando archivo...</span>
        <span className="text-muted-foreground">{progreso}%</span>
      </div>
      <Progress value={progreso} className="h-2" />
      <Button size="sm" onClick={iniciar} disabled={activo}>
        {activo ? 'Procesando...' : 'Comenzar Exportación'}
      </Button>
    </div>
  );
}
```

---

## 5. Mini-proyecto: Manejo de Estados en la Agenda

En este mini-proyecto implementaremos una experiencia completa de feedback en nuestra agenda:
1. Una lista que muestra un **Skeleton** mientras finge cargar datos desde un servidor.
2. Un formulario que valida campos y muestra una **Alert** de error si falta el nombre.
3. Un botón con **Spinner** durante el guardado.
4. Un **Toast** de éxito al completar el registro.

```tsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
  Skeleton,
  Spinner,
  Toaster,
  toast,
} from '@alcspower/ui';

interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
  area: string;
}

const DATOS_INICIALES: Contacto[] = [
  { id: 1, nombre: 'Ana García', telefono: '+505 8888-0001', area: 'Dirección' },
  { id: 2, nombre: 'Carlos Mendoza', telefono: '+505 8888-0002', area: 'Tecnología' },
];

export function ModuloFeedbackAgenda() {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [cargandoLista, setCargandoLista] = useState(true);
  
  // Estados para el nuevo contacto
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [area, setArea] = useState('Ventas');
  
  // Estado para el feedback de acción
  const [guardando, setGuardando] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState<string | null>(null);

  // Simulamos carga inicial de datos con un retraso de 1.8 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setContactos(DATOS_INICIALES);
      setCargandoLista(false);
      toast('Lista de contactos cargada del servidor');
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const manejarGuardar = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorValidacion(null);

    // Validación básica: El nombre debe tener al menos 3 caracteres
    if (!nombre.trim() || nombre.trim().length < 3) {
      setErrorValidacion('El nombre del contacto es obligatorio y debe tener al menos 3 caracteres.');
      return;
    }

    if (!telefono.trim()) {
      setErrorValidacion('El número telefónico es indispensable para el contacto.');
      return;
    }

    // Iniciamos la animación de guardado
    setGuardando(true);

    setTimeout(() => {
      const nuevo: Contacto = {
        id: Date.now(),
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        area,
      };

      setContactos((prev) => [nuevo, ...prev]);
      setNombre('');
      setTelefono('');
      setGuardando(false);

      // Feedback de éxito inmediato
      toast.success(`¡Contacto "${nuevo.nombre}" guardado exitosamente!`);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Contenedor Toast */}
      <Toaster position="bottom-right" richColors />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Directorio con Retroalimentación Activa</h2>
        <p className="text-sm text-muted-foreground">
          Ejemplo práctico combinando Skeleton, Alert, Spinner y Toast.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna Izquierda: Formulario de Registro */}
        <Card>
          <CardHeader>
            <CardTitle>Agregar Contacto</CardTitle>
            <CardDescription>Completa el formulario para registrar un colaborador.</CardDescription>
          </CardHeader>

          <form onSubmit={manejarGuardar}>
            <CardContent className="space-y-4">
              {/* Alerta de validación condicional */}
              {errorValidacion && (
                <Alert variant="destructive">
                  <AlertTitle>Faltan datos obligatorios</AlertTitle>
                  <AlertDescription>{errorValidacion}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Nombre Completo</label>
                <input
                  type="text"
                  placeholder="Ej. Sofía Benavides"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  disabled={guardando}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Teléfono</label>
                <input
                  type="tel"
                  placeholder="+505 8888-0000"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  disabled={guardando}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Departamento</label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  disabled={guardando}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                >
                  <option value="Ventas">Ventas</option>
                  <option value="Tecnología">Tecnología</option>
                  <option value="Administración">Administración</option>
                </select>
              </div>
            </CardContent>

            <CardFooter className="border-t pt-4 flex justify-end">
              <Button type="submit" disabled={guardando}>
                {guardando ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Guardando en base de datos...
                  </>
                ) : (
                  'Registrar Contacto'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Columna Derecha: Lista con Skeleton Loading */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Colaboradores ({contactos.length})</CardTitle>
              {cargandoLista && <span className="text-xs text-muted-foreground">Cargando...</span>}
            </div>
            <CardDescription>Lista en tiempo real sincronizada.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {cargandoLista ? (
              // Mostramos siluetas de Skeleton mientras cargan los datos
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : contactos.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                No hay contactos registrados todavía.
              </p>
            ) : (
              // Mostramos la lista real una vez que terminaron de cargar
              contactos.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-muted/30 transition-colors"
                >
                  <div>
                    <h4 className="font-semibold text-sm">{c.nombre}</h4>
                    <p className="text-xs text-muted-foreground">{c.telefono}</p>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded bg-secondary text-secondary-foreground">
                    {c.area}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

---

## 6. ¿Qué puede salir mal? Problemas comunes y soluciones

### 1. "Llamo a `toast.success()` pero no aparece nada en pantalla"
* **Causa**: Olvidaste colocar el componente `<Toaster />` en la raíz de tu aplicación (`App.tsx`). La función `toast` busca este contenedor para dibujar la notificación; si no existe, la llamada se ignora en silencio.
* **Solución**: Agrega `<Toaster position="bottom-right" richColors />` en el nivel superior de tu árbol de componentes.

### 2. "Los colores del Toast se ven todos grises o transparentes"
* **Causa**: No añadiste la propiedad `richColors` al `<Toaster />`.
* **Solución**: Utiliza `<Toaster richColors />` para que los estados `success`, `error` y `warning` muestren sus respectivos fondos coloreados.

### 3. "El Skeleton tiene dimensiones cero o no se ve nada"
* **Causa**: Un `Skeleton` es esencialmente un `div` estilizado. Si no le indicas un ancho y un alto con clases (por ejemplo `className="h-4 w-full"`), su altura por defecto será 0 píxeles.
* **Solución**: Define siempre `h-*` y `w-*` en las clases del Skeleton.

### 4. "El Spinner hace que el botón se ensanche de golpe al hacer clic"
* **Causa**: Al cambiar el texto de `"Guardar"` a `"<Spinner /> Guardando..."`, la longitud del contenido cambia y mueve los elementos adyacentes.
* **Solución**: Puedes darle al botón un ancho mínimo fijo (`min-w-[140px]`) para que conserve su tamaño exacto tanto en reposo como en estado de carga.

---

## 7. Ejercicio práctico: Medidor de progreso en el registro

Pon en práctica tus conocimientos incorporando una barra de `Progress` en el formulario:

1. **Calcula el porcentaje de llenado del formulario**:
   - Tienes 3 campos: `nombre`, `telefono` y `area`.
   - Si 1 campo está lleno, el avance es 33%.
   - Si 2 campos están llenos, el avance es 66%.
   - Si los 3 están llenos, el avance es 100%.
2. **Renderiza el componente `Progress`** arriba del botón de guardar:
   ```tsx
   <div className="space-y-1">
     <div className="flex justify-between text-xs text-muted-foreground">
       <span>Completitud del perfil</span>
       <span>{porcentajeCompletado}%</span>
     </div>
     <Progress value={porcentajeCompletado} className="h-1.5" />
   </div>
   ```
3. **Deshabilita el botón de guardar** hasta que el progreso alcance el 100%.

---

## ✅ Resumen del capítulo

- **Feedback**: Es la conversación constante entre la interfaz y el usuario para confirmar qué está pasando y reducir la incertidumbre.
- **`Alert`**: Para mensajes permanentes e importantes dentro del flujo de la página (`default`, `info`, `success`, `warning`, `destructive`).
- **`Toast`**: Para avisos rápidos y flotantes que desaparecen solos tras una acción puntual. Requiere montar `<Toaster />` una vez en la aplicación.
- **`Spinner`**: Ideal dentro de botones para indicar que se está procesando una acción iniciada por el usuario.
- **`Skeleton`**: Simula la estructura física del contenido antes de que termine de cargarse, brindando una sensación visual más rápida y fluida.
- **`Progress`**: Muestra el avance medible (0-100%) de operaciones continuas.

---

## Navegación

[← Capítulo 4: Layout y Cards](file:///docs/instructivo/es/04-layout-y-cards.md) | [Capítulo 6: Overlays y Modales →](file:///docs/instructivo/es/06-overlays.md)
