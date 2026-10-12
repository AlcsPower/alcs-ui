# Capítulo 7: Datos - Tablas, Estados y Paginación Profesional

Cuando una aplicación comienza a crecer, tarde o temprano te enfrentarás a un desafío común: **mostrar grandes volúmenes de información de forma ordenada, legible y rápida**.

Imagínate tener 500 contactos corporativos desplegados en una lista interminable. El usuario tendría que hacer scroll durante minutos enteros para encontrar un registro, la página se volvería pesada y la experiencia visual sería agotadora.

Para resolver este reto, los sistemas modernos de nivel empresarial recurren a tres herramientas clave:
1. **`Table`**: La estructura clásica de filas y columnas para comparar información con facilidad.
2. **`StatusBadge`**: Indicadores visuales instantáneos que comunican el estado operativo de un registro (activo, inactivo, pendiente).
3. **`Pagination`**: El mecanismo para fraccionar grandes listas en páginas manejables y navegables.

En este capítulo aprenderás a combinar estos tres componentes de `@alcspower/ui` para construir tablas de datos completas, elegantes y funcionales.

---

## 📚 Lo que aprenderás en este capítulo

1. **La metáfora de la hoja de cálculo y el libro**: Por qué las tablas y la paginación son el estándar indiscutible para la gestión de datos.
2. **El componente `Table` en detalle**:
   - Anatomía completa: `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead` y `TableCell`.
   - Buenas prácticas de accesibilidad y alineación de columnas.
   - Cómo integrar columnas de acciones (botones, menús) por cada fila.
3. **El componente `StatusBadge`**:
   - Diferencias clave entre un `Badge` genérico y un `StatusBadge`.
   - Estados disponibles: `active`, `inactive`, `pending`, `error`, `warning`.
   - Cuándo y por qué usar cada estado en tus flujos de negocio.
4. **El componente `Pagination`**:
   - Anatomía: `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`.
   - Lógica matemática de paginación en React con `slice(inicio, fin)`.
   - Manejo del estado de la página actual con `useState`.
5. **Mini-proyecto práctico**: Una tabla interactiva con 15 contactos, cálculo de páginas dinámico (5 por página), estados operativos y botones de acción.
6. **¿Qué puede salir mal?**: Errores comunes de paginación y renderizado de tablas.
7. **Ejercicio interactivo**: Filtro de búsqueda en tiempo real sobre la tabla paginada.

---

## 1. Mostrando listas de información: La analogía del directorio telefónico

Imagina el directorio telefónico impreso de una ciudad:
- Si todos los nombres, números y direcciones estuvieran impresos en un solo párrafo continuo sin bordes ni columnas, sería ilegible. Por eso se inventaron las **tablas**: filas horizontales para cada persona y columnas verticales para ordenar el nombre, el teléfono y la dirección.
- Además, el directorio no es un solo pergamino gigante de 3 kilómetros de largo: está dividido en **páginas numeradas**. Si buscas a alguien, vas a la página 15, luego a la 16, y así sucesivamente.

En el desarrollo web:
- Una **`Table`** organiza cada entidad en una fila y cada propiedad en una celda.
- Un **`StatusBadge`** funciona como el sello de color que indica a simple vista si la línea telefónica está "Activa" o "Suspendida".
- La **`Pagination`** te permite entregarle al usuario 5 o 10 filas a la vez, garantizando una carga rápida y una lectura descansada.

---

## 2. El componente `Table`: Tablas semánticas y estilizadas

### Anatomía de una Table

En HTML estándar existen etiquetas como `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>` y `<td>`. `@alcspower/ui` proporciona componentes equivalentes que añaden bordes suaves, efectos de hover al pasar el ratón, tipografía adaptada y compatibilidad con temas oscuros.

| Componente | Etiqueta equivalente | Rol en la interfaz |
| :--- | :--- | :--- |
| `Table` | `<table>` | Contenedor principal que maneja el scroll horizontal si es necesario. |
| `TableHeader` | `<thead>` | Contenedor de la fila superior de encabezados. |
| `TableBody` | `<tbody>` | Contenedor de las filas que contienen los datos reales. |
| `TableRow` | `<tr>` | Representa una fila horizontal individual. |
| `TableHead` | `<th>` | Celda de encabezado (título de la columna, texto en negrita). |
| `TableCell` | `<td>` | Celda de datos estándar dentro de una fila. |

### Importación básica

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@alcspower/ui';
```

### Ejemplo fundamental comentado

```tsx
import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@alcspower/ui';

export function TablaEjemploBasico() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        {/* Encabezado con nombres de columnas */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nombre</TableHead>
            <TableHead>Correo Electrónico</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        {/* Cuerpo con los datos */}
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Ana García</TableCell>
            <TableCell>ana.garcia@empresa.com.ni</TableCell>
            <TableCell>+505 8888-0001</TableCell>
            <TableCell className="text-right">Ver detalle</TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium">Carlos Mendoza</TableCell>
            <TableCell>carlos.mendoza@empresa.com.ni</TableCell>
            <TableCell>+505 8888-0002</TableCell>
            <TableCell className="text-right">Ver detalle</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
```

---

## 3. El componente `StatusBadge`: Semáforos de estado

### ¿Qué es un StatusBadge y en qué se diferencia de un Badge normal?

Un `Badge` normal se utiliza para etiquetas genéricas como categorías ("Tecnología", "Ventas", "Nuevo"). 

En cambio, un **`StatusBadge`** está diseñado exclusivamente para comunicar el **estado de un ciclo de vida**. Incorpora un indicador circular (un puntito o dot) y colores semánticos normalizados que eliminan la necesidad de inventar estilos manualmente para cada estado.

### Los 5 estados soportados

La propiedad obligatoria `status` acepta los siguientes valores:

| Valor de `status` | Color visual | Significado habitual |
| :--- | :--- | :--- |
| `'active'` | Verde | El usuario o registro está activo, habilitado y operando con normalidad. |
| `'inactive'` | Gris neutro | El registro está deshabilitado, pausado o dado de baja temporalmente. |
| `'pending'` | Azul o Amarillo suave | Esperando aprobación, verificación de correo o confirmación de pago. |
| `'warning'` | Amarillo / Ámbar | Requiere atención inmediata (por ejemplo: suscripción por vencer). |
| `'error'` | Rojo | Cuenta suspendida, error crítico de sincronización o validación fallida. |

### Importación y uso en una tabla

```tsx
import { StatusBadge } from '@alcspower/ui';

// Uso simple:
<StatusBadge status="active" />
<StatusBadge status="pending" />
<StatusBadge status="inactive" />
<StatusBadge status="error" />
<StatusBadge status="warning" />
```

Si deseas personalizar el texto que acompaña al indicador, puedes pasar texto como hijo si el componente lo permite o acompañarlo en una celda:

```tsx
<TableCell>
  <div className="flex items-center gap-2">
    <StatusBadge status="active" />
    <span className="text-xs font-medium">Operativo</span>
  </div>
</TableCell>
```

---

## 4. El componente `Pagination`: Navegación entre páginas de datos

### ¿Por qué paginar?

Cuando renderizas 2,000 elementos en el navegador al mismo tiempo, el navegador tiene que crear 2,000 nodos en el DOM. Esto hace que la página consuma demasiada memoria, se vuelva lenta y responda con retraso.

La paginación resuelve esto mostrando únicamente un pequeño bloque (por ejemplo, 5 registros) y proporcionando controles para ir a la siguiente página, volver a la anterior o saltar a una página específica.

### Anatomía del componente Pagination

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@alcspower/ui';
```

- **`Pagination`**: El elemento contenedor con rol de navegación accesible.
- **`PaginationContent`**: La lista horizontal que agrupa los botones de página.
- **`PaginationItem`**: Cada elemento de la lista.
- **`PaginationLink`**: Botón de número de página (`isActive` resalta la página actual).
- **`PaginationPrevious`**: Botón "Anterior".
- **`PaginationNext`**: Botón "Siguiente".

### La matemática de la paginación en JavaScript (`slice`)

Para mostrar solo los elementos de la página actual, usamos la siguiente fórmula:

```javascript
const elementosPorPagina = 5;
const paginaActual = 1; // Supongamos página 1

// Índice donde empieza la página: (1 - 1) * 5 = 0
const indiceInicio = (paginaActual - 1) * elementosPorPagina;

// Índice donde termina: 0 + 5 = 5
const indiceFin = indiceInicio + elementosPorPagina;

// Extraemos los elementos del 0 al 4:
const elementosVisibles = listaCompleta.slice(indiceInicio, indiceFin);

// Total de páginas: Redondeamos hacia arriba siempre
const totalPaginas = Math.ceil(listaCompleta.length / elementosPorPagina);
```

---

## 5. Mini-proyecto: Tabla de Contactos Paginada y Dinámica

A continuación construiremos una tabla completa de administración con:
- Un conjunto de 15 contactos con datos diversos.
- Paginación dinámica de 5 contactos por página.
- Indicador visual `StatusBadge` por cada contacto.
- Botones de acción (Editar y Eliminar) por fila.
- Resumen informativo: *"Mostrando página 1 de 3 (15 contactos en total)"*.

```tsx
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  StatusBadge,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  Button,
} from '@alcspower/ui';

type EstadoContacto = 'active' | 'inactive' | 'pending';

interface Contacto {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  departamento: string;
  estado: EstadoContacto;
}

// Lista con 15 contactos para demostrar la paginación
const LISTA_CONTACTOS: Contacto[] = [
  { id: 1, nombre: 'Ana García', correo: 'ana.garcia@empresa.com.ni', telefono: '+505 8888-0001', departamento: 'Dirección', estado: 'active' },
  { id: 2, nombre: 'Carlos Mendoza', correo: 'carlos.mendoza@empresa.com.ni', telefono: '+505 8888-0002', departamento: 'Tecnología', estado: 'active' },
  { id: 3, nombre: 'Valeria Solís', correo: 'valeria.solis@empresa.com.ni', telefono: '+505 8888-0003', departamento: 'RRHH', estado: 'pending' },
  { id: 4, nombre: 'Roberto Sánchez', correo: 'roberto.sanchez@empresa.com.ni', telefono: '+505 8888-0004', departamento: 'Finanzas', estado: 'active' },
  { id: 5, nombre: 'Elena Castillo', correo: 'elena.castillo@empresa.com.ni', telefono: '+505 8888-0005', departamento: 'Marketing', estado: 'inactive' },
  { id: 6, nombre: 'Francisco Rivas', correo: 'francisco.rivas@empresa.com.ni', telefono: '+505 8888-0006', departamento: 'Tecnología', estado: 'active' },
  { id: 7, nombre: 'Gabriela Morales', correo: 'gabriela.morales@empresa.com.ni', telefono: '+505 8888-0007', departamento: 'Ventas', estado: 'active' },
  { id: 8, nombre: 'Héctor Duarte', correo: 'hector.duarte@empresa.com.ni', telefono: '+505 8888-0008', departamento: 'Logística', estado: 'inactive' },
  { id: 9, nombre: 'Isabel Ortega', correo: 'isabel.ortega@empresa.com.ni', telefono: '+505 8888-0009', departamento: 'Dirección', estado: 'active' },
  { id: 10, nombre: 'Jorge Blanco', correo: 'jorge.blanco@empresa.com.ni', telefono: '+505 8888-0010', departamento: 'Legal', estado: 'pending' },
  { id: 11, nombre: 'Karla Vega', correo: 'karla.vega@empresa.com.ni', telefono: '+505 8888-0011', departamento: 'Finanzas', estado: 'active' },
  { id: 12, nombre: 'Luis Fernando Mora', correo: 'luis.mora@empresa.com.ni', telefono: '+505 8888-0012', departamento: 'Sistemas', estado: 'active' },
  { id: 13, nombre: 'Mariana Pineda', correo: 'mariana.pineda@empresa.com.ni', telefono: '+505 8888-0013', departamento: 'RRHH', estado: 'inactive' },
  { id: 14, nombre: 'Néstor Centeno', correo: 'nestor.centeno@empresa.com.ni', telefono: '+505 8888-0014', departamento: 'Operaciones', estado: 'pending' },
  { id: 15, nombre: 'Olga Ruiz', correo: 'olga.ruiz@empresa.com.ni', telefono: '+505 8888-0015', departamento: 'Ventas', estado: 'active' },
];

export function TablaContactosPaginada() {
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  // Cálculos de índices
  const totalPaginas = Math.ceil(LISTA_CONTACTOS.length / elementosPorPagina);
  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const contactosVisibles = LISTA_CONTACTOS.slice(indiceInicio, indiceInicio + elementosPorPagina);

  // Funciones de navegación
  const irPaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const irPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  return (
    <Card className="max-w-5xl mx-auto shadow-sm">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-xl">Directorio General de Empleados</CardTitle>
            <CardDescription>
              Consulta el listado oficial y verifica el estado operativo de cada integrante.
            </CardDescription>
          </div>
          <span className="text-xs bg-muted px-2.5 py-1 rounded-full font-medium text-muted-foreground w-fit">
            Total: {LISTA_CONTACTOS.length} registros
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tabla contenedora */}
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[60px] text-center">#</TableHead>
                <TableHead>Colaborador</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {contactosVisibles.map((contacto) => (
                <TableRow key={contacto.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell className="text-center font-mono text-xs text-muted-foreground">
                    {contacto.id}
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{contacto.nombre}</span>
                      <span className="text-xs text-muted-foreground">{contacto.correo}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm">
                    {contacto.telefono}
                  </TableCell>

                  <TableCell>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                      {contacto.departamento}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={contacto.estado} />
                      <span className="text-xs capitalize text-muted-foreground">
                        {contacto.estado === 'active' ? 'Activo' : contacto.estado === 'inactive' ? 'Inactivo' : 'Pendiente'}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => alert(`Editar ${contacto.nombre}`)}
                      >
                        ✏️
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => alert(`Eliminar ${contacto.nombre}`)}
                      >
                        🗑️
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Sección de Paginación */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-muted-foreground">
            Mostrando página <strong className="text-foreground">{paginaActual}</strong> de{' '}
            <strong className="text-foreground">{totalPaginas}</strong>
          </p>

          <Pagination>
            <PaginationContent>
              {/* Botón Anterior */}
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    irPaginaAnterior();
                  }}
                  className={paginaActual === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>

              {/* Botones numéricos de página */}
              {Array.from({ length: totalPaginas }, (_, index) => {
                const numeroPagina = index + 1;
                return (
                  <PaginationItem key={numeroPagina}>
                    <PaginationLink
                      href="#"
                      isActive={numeroPagina === paginaActual}
                      onClick={(e) => {
                        e.preventDefault();
                        setPaginaActual(numeroPagina);
                      }}
                      className="cursor-pointer"
                    >
                      {numeroPagina}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {/* Botón Siguiente */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    irPaginaSiguiente();
                  }}
                  className={paginaActual === totalPaginas ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## 6. ¿Qué puede salir mal? Problemas comunes y soluciones

### 1. "Al hacer clic en el número de página o en Siguiente, la página se recarga"
* **Causa**: `PaginationLink`, `PaginationPrevious` y `PaginationNext` renderizan enlaces HTML (`<a>`) por defecto. Si tienen `href="#"`, el navegador intentará navegar o saltar al inicio de la página.
* **Solución**: Agrega siempre `e.preventDefault()` en el manejador del clic antes de actualizar el estado de React.

### 2. "Los botones de página anterior o siguiente causan un error cuando llego al límite"
* **Causa**: Al estar en la página 1 y pulsar 'Anterior', el estado pasa a 0 (o a 4 cuando solo hay 3 páginas). Esto produce `slice(-5, 0)` con resultados inesperados o tablas en blanco.
* **Solución**: Protege las funciones asegurando que `paginaActual > 1` para retroceder y `paginaActual < totalPaginas` para avanzar. Además, añade `opacity-50 pointer-events-none` cuando se alcancen los límites.

### 3. "La tabla se deforma o se rompe en pantallas pequeñas de teléfonos"
* **Causa**: Las tablas tienen un ancho mínimo intrínseco. Si la pantalla es de 360px y la tabla necesita 600px, los textos se apretujan o desbordan la pantalla horizontalmente.
* **Solución**: Envuelve siempre tu `<Table>` en un contenedor con `overflow-x-auto` (por ejemplo `<div className="overflow-x-auto border rounded-lg">`). De este modo, la tabla permitirá un deslizamiento horizontal limpio en móviles sin romper la plantilla general.

### 4. "StatusBadge muestra un punto con un color incorrecto"
* **Causa**: Pasaste un texto que no coincide con las opciones admitidas (`status="active" | "inactive" | "pending" | "error" | "warning"`), como por ejemplo `status="Activo"` en mayúscula o en español.
* **Solución**: Usa únicamente los valores tipados en minúsculas en inglés (`active`, `pending`, etc.).

---

## 7. Ejercicio práctico: Búsqueda dinámica con Paginación inteligente

Pon a prueba tus conocimientos agregando una barra de búsqueda sobre la tabla:

1. **Crea un campo de búsqueda** con un input de texto:
   ```tsx
   const [busqueda, setBusqueda] = useState('');
   ```
2. **Filtra la lista de contactos** antes de calcular la paginación:
   ```tsx
   const contactosFiltrados = LISTA_CONTACTOS.filter((c) =>
     c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
     c.departamento.toLowerCase().includes(busqueda.toLowerCase())
   );
   ```
3. **Ajusta la paginación para que trabaje sobre `contactosFiltrados`** en lugar de la lista completa.
4. **Resetea la página a 1 cuando el usuario escriba algo nuevo**:
   ```tsx
   onChange={(e) => {
     setBusqueda(e.target.value);
     setPaginaActual(1); // ¡Fundamental para no quedar en una página vacía!
   }}
   ```
5. Si no hay resultados (`contactosFiltrados.length === 0`), muestra una fila con un mensaje amigable: *"No se encontraron contactos que coincidan con la búsqueda"*.

---

## ✅ Resumen del capítulo

- **`Table`**: Proporciona una forma limpia y estructurada de tabular datos complejos con componentes semánticos (`Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`).
- **`StatusBadge`**: Comunica el estado operativo en un formato visual estándar con círculos semánticos (`active`, `inactive`, `pending`, `warning`, `error`).
- **`Pagination`**: Divide listas extensas en segmentos digeribles mediante `slice()`, mejorando drásticamente el rendimiento y la facilidad de lectura.
- Recuerda siempre prevenir el comportamiento por defecto (`e.preventDefault()`) en los enlaces de paginación para evitar recargas accidentales.

---

## Navegación

[← Capítulo 6: Overlays y Modales](file:///docs/instructivo/es/06-overlays.md) | [Capítulo 8: Patrones de Navegación →](file:///docs/instructivo/es/08-navegacion.md)
