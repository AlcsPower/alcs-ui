# Capítulo 9: Proyecto Final Integrador - Agenda Corporativa Completa

¡Muchísimas felicidades! Si estás leyendo este capítulo, significa que has recorrido un camino extraordinario. Has pasado de preguntarte cómo crear un simple botón a comprender con claridad la arquitectura de componentes de `@alcspower/ui`, el manejo de estado en React, el flujo de retroalimentación visual, los menús superpuestos, las tablas dinámicas y las secuencias guiadas de navegación.

Ahora ha llegado el momento de la verdad: **unir todas las piezas del rompecabezas en una aplicación real, moderna y profesional**.

En este capítulo final construiremos juntos una **Agenda de Contactos Empresarial Completa**. No será un ejemplo de juguete con código recortado: construiremos cada archivo con tipado TypeScript estricto, buenas prácticas de diseño modular y comentarios pedagógicos detallados paso a paso.

---

## 📚 Lo que aprenderás y consolidarás en este proyecto final

1. **Arquitectura modular de software frontend**: Cómo organizar carpetas, tipos, componentes y pantallas principales.
2. **Integración armónica de los componentes de `@alcspower/ui`**:
   - **Estructura y Layout**: `Card`, `Tabs`, `Separator`, `Breadcrumb`.
   - **Formularios e interactividad**: `Input`, `Select`, `Switch`, `Checkbox`, `Button`.
   - **Feedback visual**: `Alert`, `Toaster`, `toast`, `Spinner`, `Skeleton`, `Progress`.
   - **Capas superpuestas (Overlays)**: `Dialog`, `DropdownMenu`, `Tooltip`, `TooltipProvider`.
   - **Visualización de datos**: `Table`, `StatusBadge`, `Pagination`, `Badge`.
   - **Navegación guiada**: `Stepper`, `StepperItem`, `StepperTrigger`, `StepperSeparator`, `StepperTitle`.
3. **Flujo de datos unidireccional en React**: Cómo comunicar componentes hijos con componentes padres mediante props y callbacks.
4. **Ciclos de vida y experiencia de usuario (UX)**: Validaciones en tiempo real, estados de carga y confirmaciones destructivas seguras.

---

## 1. Resumen de todos los componentes aprendidos a lo largo del instructivo

Antes de comenzar a escribir el código, repasemos el arsenal de herramientas que tienes en tus manos:

| Componente | Categoría | Propósito en el sistema |
| :--- | :--- | :--- |
| **`Button`** | Acciones | Disparador principal de eventos y llamadas a la acción. |
| **`Input` / `Select`** | Formularios | Captura de texto, números y selección de opciones en formularios. |
| **`Switch` / `Checkbox`**| Formularios | Activación binaria de preferencias y estados booleanos. |
| **`Card`** | Estructura | Envoltorio modular para agrupar información relacionada. |
| **`Tabs`** | Layout | Alternancia entre múltiples vistas en una misma pantalla. |
| **`Separator`** | Layout | Línea divisoria sutil para pausas visuales horizontales y verticales. |
| **`Breadcrumb`** | Navegación | Rastro de migas de pan que indica la posición jerárquica en la app. |
| **`Stepper`** | Navegación | Asistente de progreso secuencial en flujos de varios pasos. |
| **`Alert`** | Feedback | Avisos informativos o de error persistentes en el flujo. |
| **`Toast` / `Toaster`** | Feedback | Notificaciones emergentes y efímeras en una esquina de la pantalla. |
| **`Spinner`** | Carga | Indicador circular animado para botones en espera. |
| **`Skeleton`** | Carga | Silueta grisácea animada que anticipa la llegada de datos. |
| **`Progress`** | Carga | Barra cuantitativa de porcentaje completado. |
| **`Dialog`** | Overlays | Ventana modal con telón de fondo para confirmaciones o edición. |
| **`Tooltip`** | Overlays | Burbuja explicativa que aparece al pasar el cursor sobre iconos. |
| **`DropdownMenu`** | Overlays | Menú desplegable para compactar múltiples acciones secundarias. |
| **`Table`** | Datos | Tabla estructurada con cabecera y celdas para grandes volúmenes. |
| **`StatusBadge`** | Datos | Distintivo visual estandarizado de estado operativo. |
| **`Pagination`** | Datos | Controles de segmentación para navegar entre lotes de datos. |

---

## 2. Descripción general del proyecto: Agenda Corporativa

La aplicación que construiremos simula el sistema interno de gestión de personal de una institución o empresa. Sus características principales son:

- **Vista de Pestañas**:
  - **Pestaña 1 (Directorio General)**: Una tabla profesional con paginación real, indicador de estado operativo (`StatusBadge`), búsqueda rápida y acciones por fila.
  - **Pestaña 2 (Vista de Tarjetas / Favoritos)**: Una cuadrícula de tarjetas de presentación (`Card`) para ver de cerca a los colaboradores destacados.
  - **Pestaña 3 (Nuevo Registro Guiado)**: Un asistente en 3 etapas (`Stepper`) con barra de progreso (`Progress`) y validación para dar de alta a nuevos empleados.
  - **Pestaña 4 (Registro Rápido)**: Un formulario directo con switches y alertas para altas inmediatas.
- **Diálogos de Confirmación**: Modal para eliminar contactos con protección y modal para editar información.
- **Notificaciones globales**: Alertas flotantes mediante `toast` ante cada acción relevante.

---

## 3. Estructura de archivos del proyecto

Para mantener nuestro código limpio y escalable, dividiremos el proyecto en la siguiente estructura de carpetas:

```text
mi-agenda/
├── src/
│   ├── types.ts                    # Definiciones de tipos e interfaces TypeScript
│   ├── components/
│   │   ├── Layout.tsx              # Estructura visual, Breadcrumb y encabezado
│   │   ├── ContactCard.tsx         # Tarjeta individual con menú y tooltips
│   │   ├── ContactForm.tsx         # Formulario de alta rápida con validaciones
│   │   ├── ContactList.tsx         # Tabla paginada con StatusBadge y búsqueda
│   │   └── AddContactStepper.tsx   # Asistente secuencial en 3 pasos con Progress
│   ├── App.tsx                     # Componente raíz con el estado central y Toaster
│   └── main.tsx                    # Punto de entrada de la aplicación React
├── package.json
└── tsconfig.json
```

A continuación, crearemos y analizaremos el código de cada uno de estos archivos.

---

## 4. Archivo 1: `src/types.ts` (Modelado de datos)

En TypeScript, definir los tipos antes de escribir componentes nos ahorra horas de errores y autocompleta cada propiedad en nuestro editor.

```tsx
// src/types.ts

/**
 * Categorías posibles para clasificar a los contactos en la empresa.
 */
export type CategoriaContacto = 
  | 'Dirección' 
  | 'Tecnología' 
  | 'Recursos Humanos' 
  | 'Operaciones' 
  | 'Finanzas' 
  | 'Ventas';

/**
 * Estados operativos soportados por el componente StatusBadge.
 */
export type EstadoOperativo = 'active' | 'inactive' | 'pending';

/**
 * Interfaz que define la estructura completa de un contacto en el sistema.
 */
export interface Contact {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  categoria: CategoriaContacto;
  activo: boolean;
  favorito: boolean;
  avatarUrl?: string;
  fechaIngreso: string;
}

/**
 * Estructura de datos simplificada requerida para crear un nuevo contacto.
 */
export type NuevoContactoInput = Omit<Contact, 'id' | 'fechaIngreso'>;
```

---

## 5. Archivo 2: `src/components/ContactCard.tsx` (Tarjeta individual)

Este componente representa la tarjeta de presentación de un contacto individual. Utiliza:
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
- `Badge` para la categoría.
- `DropdownMenu` para opciones de menú (compartir, cambiar estado).
- `Tooltip` para los botones de acción rápida (llamar, enviar correo, alternar favorito).

```tsx
// src/components/ContactCard.tsx
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  toast,
} from '@alcspower/ui';
import { Contact } from '../types';

interface ContactCardProps {
  contacto: Contact;
  onAlternarFavorito: (id: number) => void;
  onEliminar: (id: number) => void;
  onEditar: (contacto: Contact) => void;
}

export function ContactCard({
  contacto,
  onAlternarFavorito,
  onEliminar,
  onEditar,
}: ContactCardProps) {
  return (
    <Card className="flex flex-col justify-between hover:shadow-lg transition-all duration-200 border-border">
      {/* 1. Encabezado de la Tarjeta */}
      <CardHeader className="flex flex-row items-start justify-between pb-3">
        <div className="flex items-center gap-3">
          {/* Avatar simulado con las iniciales */}
          <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-base border border-primary/20">
            {contacto.nombre[0]}
            {contacto.apellido[0]}
          </div>

          <div>
            <CardTitle className="text-base font-bold flex items-center gap-1.5">
              {contacto.nombre} {contacto.apellido}
              {contacto.favorito && <span className="text-amber-500 text-sm">⭐</span>}
            </CardTitle>
            <CardDescription className="text-xs">
              {contacto.categoria}
            </CardDescription>
          </div>
        </div>

        {/* Menú desplegable en la esquina superior derecha */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              ⋮
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={() => onEditar(contacto)}>
              ✏️ Modificar datos
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(contacto.email);
                toast.success('Correo copiado al portapapeles');
              }}
            >
              📋 Copiar correo
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onEliminar(contacto.id)}
              className="text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              🗑️ Eliminar registro
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      {/* 2. Cuerpo del Contenido */}
      <CardContent className="space-y-2 text-sm text-muted-foreground pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-foreground w-16">Teléfono:</span>
          <span className="font-mono text-xs">{contacto.telefono}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-foreground w-16">Correo:</span>
          <span className="truncate text-xs">{contacto.email}</span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Badge variant={contacto.activo ? 'default' : 'secondary'} className="text-[10px] px-2 py-0.5">
            {contacto.activo ? 'Colaborador Activo' : 'En Pausa'}
          </Badge>
          <span className="text-[10px] text-muted-foreground">
            Ingreso: {contacto.fechaIngreso}
          </span>
        </div>
      </CardContent>

      {/* 3. Pie de la Tarjeta con Tooltips */}
      <CardFooter className="border-t pt-3 flex justify-between items-center bg-muted/10">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAlternarFavorito(contacto.id)}
              className="text-xs text-muted-foreground hover:text-amber-500"
            >
              {contacto.favorito ? '⭐ Favorito' : '☆ Marcar favorito'}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {contacto.favorito ? 'Quitar de destacados' : 'Añadir a destacados'}
          </TooltipContent>
        </Tooltip>

        <div className="flex gap-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => toast.success(`Marcando a ${contacto.telefono}...`)}
              >
                📞
              </Button>
            </TooltipTrigger>
            <TooltipContent>Llamar al teléfono</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => toast(`Abriendo cliente de correo para ${contacto.email}`)}
              >
                ✉️
              </Button>
            </TooltipTrigger>
            <TooltipContent>Enviar mensaje de correo</TooltipContent>
          </Tooltip>
        </div>
      </CardFooter>
    </Card>
  );
}
```

---

## 6. Archivo 3: `src/components/ContactForm.tsx` (Formulario rápido)

Este componente permite registrar un contacto de forma inmediata en una sola pantalla. Combina:
- Campos de texto (`Input`).
- Selector de opciones (`Select`).
- Interruptor booleano (`Switch`) para el estado activo.
- Caja de selección (`Checkbox`) para marcar como favorito.
- Botón con `Spinner` para simular la persistencia.
- Alertas de validación contextuales (`Alert`).

```tsx
// src/components/ContactForm.tsx
import React, { useState } from 'react';
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
  Spinner,
  Separator,
  toast,
} from '@alcspower/ui';
import { CategoriaContacto, NuevoContactoInput } from '../types';

interface ContactFormProps {
  onGuardarContacto: (datos: NuevoContactoInput) => void;
  onCancelar?: () => void;
}

const CATEGORIAS: CategoriaContacto[] = [
  'Tecnología',
  'Dirección',
  'Recursos Humanos',
  'Operaciones',
  'Finanzas',
  'Ventas',
];

export function ContactForm({ onGuardarContacto, onCancelar }: ContactFormProps) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [categoria, setCategoria] = useState<CategoriaContacto>('Tecnología');
  const [activo, setActivo] = useState(true);
  const [favorito, setFavorito] = useState(false);

  // Estados de control de feedback
  const [guardando, setGuardando] = useState(false);
  const [mensajeError, setMensajeError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeError(null);

    // Validaciones preventivas
    if (!nombre.trim() || !apellido.trim()) {
      setMensajeError('El nombre y el apellido son campos estrictamente requeridos.');
      return;
    }

    if (!telefono.trim() || !email.trim()) {
      setMensajeError('Debes ingresar al menos un teléfono y un correo electrónico.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setMensajeError('El correo electrónico no posee un formato válido (ejemplo: usuario@dominio.com).');
      return;
    }

    // Iniciamos la simulación asíncrona de guardado
    setGuardando(true);

    setTimeout(() => {
      onGuardarContacto({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        telefono: telefono.trim(),
        email: email.trim(),
        categoria,
        activo,
        favorito,
      });

      // Limpiamos los campos del formulario
      setNombre('');
      setApellido('');
      setTelefono('');
      setEmail('');
      setCategoria('Tecnología');
      setActivo(true);
      setFavorito(false);
      setGuardando(false);

      toast.success('¡Contacto registrado satisfactoriamente!');
    }, 1200);
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Formulario de Registro Rápido</CardTitle>
        <CardDescription>
          Ingresa todos los datos requeridos para incorporar a un colaborador al sistema general.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Alerta visible si ocurre algún error de validación */}
          {mensajeError && (
            <Alert variant="destructive">
              <AlertTitle>Verifica la información</AlertTitle>
              <AlertDescription>{mensajeError}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Nombre *
              </label>
              <input
                type="text"
                placeholder="Ej. Sofía"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                disabled={guardando}
                className="w-full px-3 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Apellido *
              </label>
              <input
                type="text"
                placeholder="Ej. Benavides"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                disabled={guardando}
                className="w-full px-3 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Teléfono Corporativo *
              </label>
              <input
                type="tel"
                placeholder="+505 8888-1234"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                disabled={guardando}
                className="w-full px-3 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Correo Electrónico *
              </label>
              <input
                type="email"
                placeholder="sofia.b@empresa.com.ni"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={guardando}
                className="w-full px-3 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Área o Departamento *
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as CategoriaContacto)}
              disabled={guardando}
              className="w-full px-3 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <Separator className="my-3" />

          {/* Opciones booleanas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/20 p-3.5 rounded-lg border">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={activo}
                onChange={(e) => setActivo(e.target.checked)}
                disabled={guardando}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <div>
                <span className="text-sm font-medium block">Colaborador en funciones</span>
                <span className="text-xs text-muted-foreground">Estará habilitado en el directorio</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={favorito}
                onChange={(e) => setFavorito(e.target.checked)}
                disabled={guardando}
                className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
              />
              <div>
                <span className="text-sm font-medium block">Contacto Destacado ⭐</span>
                <span className="text-xs text-muted-foreground">Aparecerá en la pestaña de Favoritos</span>
              </div>
            </label>
          </div>
        </CardContent>

        <CardFooter className="border-t pt-4 flex justify-end gap-3">
          {onCancelar && (
            <Button
              type="button"
              variant="outline"
              disabled={guardando}
              onClick={onCancelar}
            >
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={guardando}>
            {guardando ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Registrando...
              </>
            ) : (
              'Guardar Contacto'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
```

---

## 7. Archivo 4: `src/components/ContactList.tsx` (Tabla con paginación y búsqueda)

Este componente implementa:
- Una barra de búsqueda por texto.
- Una tabla interactiva (`Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`).
- Indicador de estado por fila (`StatusBadge`).
- Paginación matemática con `slice()` (`Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, etc.).
- Estado de carga con `Skeleton` si se están obteniendo datos.
- Estado vacío amigable cuando la búsqueda no coincide con nadie.

```tsx
// src/components/ContactList.tsx
import React, { useState } from 'react';
import {
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
  Skeleton,
} from '@alcspower/ui';
import { Contact } from '../types';

interface ContactListProps {
  contactos: Contact[];
  cargando?: boolean;
  onEditar: (contacto: Contact) => void;
  onEliminar: (id: number) => void;
  onAlternarFavorito: (id: number) => void;
}

export function ContactList({
  contactos,
  cargando = false,
  onEditar,
  onEliminar,
  onAlternarFavorito,
}: ContactListProps) {
  const [filtroTexto, setFiltroTexto] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  // Filtrado reactivo en tiempo real
  const contactosFiltrados = contactos.filter((c) => {
    const textoCompleto = `${c.nombre} ${c.apellido} ${c.email} ${c.categoria}`.toLowerCase();
    return textoCompleto.includes(filtroTexto.toLowerCase());
  });

  // Cálculos matemáticos de la paginación
  const totalPaginas = Math.max(1, Math.ceil(contactosFiltrados.length / elementosPorPagina));
  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const contactosPaginados = contactosFiltrados.slice(indiceInicio, indiceInicio + elementosPorPagina);

  return (
    <div className="space-y-4">
      {/* Barra superior de herramientas y búsqueda */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre, correo o área..."
            value={filtroTexto}
            onChange={(e) => {
              setFiltroTexto(e.target.value);
              setPaginaActual(1); // Volvemos al inicio para evitar páginas vacías
            }}
            className="w-full px-3 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <span className="text-xs text-muted-foreground self-end sm:self-center font-medium">
          Coincidencias: {contactosFiltrados.length} de {contactos.length} contactos
        </span>
      </div>

      {/* Contenedor de la Tabla */}
      <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-10 text-center">⭐</TableHead>
              <TableHead>Colaborador</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cargando ? (
              // Esqueleto animado mientras se cargan los datos
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell><Skeleton className="h-4 w-4 mx-auto" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : contactosPaginados.length === 0 ? (
              // Estado vacío amigable
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <span className="text-2xl">📋</span>
                    <p className="font-semibold text-sm">No se encontraron colaboradores</p>
                    <p className="text-xs">
                      Intenta con otro término de búsqueda o registra un nuevo contacto.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Listado normal de contactos paginados
              contactosPaginados.map((c) => (
                <TableRow key={c.id} className="hover:bg-muted/30 transition-colors">
                  {/* Alternar favorito rápido */}
                  <TableCell className="text-center">
                    <button
                      type="button"
                      onClick={() => onAlternarFavorito(c.id)}
                      className="text-base hover:scale-125 transition-transform"
                      title={c.favorito ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                    >
                      {c.favorito ? '⭐' : '☆'}
                    </button>
                  </TableCell>

                  {/* Nombre y correo */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground text-sm">
                        {c.nombre} {c.apellido}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">{c.email}</span>
                    </div>
                  </TableCell>

                  {/* Teléfono */}
                  <TableCell className="text-sm font-mono text-muted-foreground">
                    {c.telefono}
                  </TableCell>

                  {/* Departamento */}
                  <TableCell>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {c.categoria}
                    </span>
                  </TableCell>

                  {/* StatusBadge */}
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <StatusBadge status={c.activo ? 'active' : 'inactive'} />
                      <span className="text-xs capitalize text-muted-foreground">
                        {c.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </TableCell>

                  {/* Botones de acción */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditar(c)}
                        className="h-8 w-8 p-0"
                        title="Editar datos"
                      >
                        ✏️
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEliminar(c.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        title="Eliminar contacto"
                      >
                        🗑️
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Barra de Paginación */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <p className="text-xs text-muted-foreground">
          Página <strong className="text-foreground">{paginaActual}</strong> de{' '}
          <strong className="text-foreground">{totalPaginas}</strong>
        </p>

        <Pagination>
          <PaginationContent>
            {/* Página Anterior */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (paginaActual > 1) setPaginaActual((p) => p - 1);
                }}
                className={paginaActual === 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
              />
            </PaginationItem>

            {/* Números de página */}
            {Array.from({ length: totalPaginas }, (_, i) => {
              const num = i + 1;
              return (
                <PaginationItem key={num}>
                  <PaginationLink
                    href="#"
                    isActive={num === paginaActual}
                    onClick={(e) => {
                      e.preventDefault();
                      setPaginaActual(num);
                    }}
                    className="cursor-pointer"
                  >
                    {num}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* Página Siguiente */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (paginaActual < totalPaginas) setPaginaActual((p) => p + 1);
                }}
                className={paginaActual === totalPaginas ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
```

---

## 8. Archivo 5: `src/components/AddContactStepper.tsx` (Asistente secuencial)

Este componente ofrece un proceso de onboarding asistido para dar de alta colaboradores. Combina:
- `Stepper`, `StepperItem`, `StepperTrigger`, `StepperSeparator`, `StepperTitle`.
- Barra de progreso `Progress` que muestra el porcentaje de avance (33%, 66%, 100%).
- `Dialog` emergente de confirmación final antes de enviar los datos a la agenda general.

```tsx
// src/components/AddContactStepper.tsx
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperSeparator,
  StepperTitle,
  Progress,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  toast,
} from '@alcspower/ui';
import { CategoriaContacto, NuevoContactoInput } from '../types';

interface AddContactStepperProps {
  onGuardarContacto: (datos: NuevoContactoInput) => void;
  onFinalizarFlujo: () => void;
}

const PASOS = [
  { id: 1, titulo: 'Datos Básicos' },
  { id: 2, titulo: 'Contacto y Área' },
  { id: 3, titulo: 'Revisión Final' },
];

export function AddContactStepper({
  onGuardarContacto,
  onFinalizarFlujo,
}: AddContactStepperProps) {
  const [pasoActual, setPasoActual] = useState(1);
  const [modalConfirmacionAbierto, setModalConfirmacionAbierto] = useState(false);

  // Estados del formulario en proceso
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [categoria, setCategoria] = useState<CategoriaContacto>('Operaciones');
  const [favorito, setFavorito] = useState(false);

  // Cálculo del porcentaje para la barra Progress
  const porcentaje = Math.round((pasoActual / PASOS.length) * 100);

  // Validación por etapa
  const avanzarPaso = () => {
    if (pasoActual === 1) {
      if (!nombre.trim() || !apellido.trim()) {
        toast.warning('Ingresa el nombre y apellido para continuar');
        return;
      }
    } else if (pasoActual === 2) {
      if (!telefono.trim() || !email.trim()) {
        toast.warning('El teléfono y el correo corporativo son obligatorios');
        return;
      }
    }
    setPasoActual((p) => Math.min(p + 1, PASOS.length));
  };

  const retrocederPaso = () => {
    setPasoActual((p) => Math.max(p - 1, 1));
  };

  const confirmarEnvio = () => {
    onGuardarContacto({
      nombre,
      apellido,
      telefono,
      email,
      categoria,
      activo: true,
      favorito,
    });
    setModalConfirmacionAbierto(false);
    toast.success(`¡Colaborador ${nombre} ${apellido} registrado en el sistema!`);
    onFinalizarFlujo();
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-sm">
      <CardHeader className="space-y-4">
        <div>
          <CardTitle className="text-xl">Asistente de Incorporación de Colaboradores</CardTitle>
          <CardDescription>
            Completa las tres etapas obligatorias para emitir la ficha corporativa.
          </CardDescription>
        </div>

        {/* Barra cuantitativa de avance */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-muted-foreground">
            <span>Progreso del registro</span>
            <span>{porcentaje}% completado</span>
          </div>
          <Progress value={porcentaje} className="h-2" />
        </div>

        {/* Stepper horizontal con títulos */}
        <div className="pt-2">
          <Stepper value={pasoActual}>
            {PASOS.map((paso) => (
              <StepperItem key={paso.id} step={paso.id}>
                <StepperTrigger>
                  <StepperTitle>{paso.titulo}</StepperTitle>
                </StepperTrigger>
                {paso.id < PASOS.length && <StepperSeparator />}
              </StepperItem>
            ))}
          </Stepper>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {/* ETAPA 1 */}
        {pasoActual === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="text-sm font-semibold border-b pb-2">Etapa 1: Identificación Inicial</h4>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Nombre(s) *</label>
              <input
                type="text"
                placeholder="Ej. Roberto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm bg-background"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Apellido(s) *</label>
              <input
                type="text"
                placeholder="Ej. Castillo Rivas"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm bg-background"
              />
            </div>
          </div>
        )}

        {/* ETAPA 2 */}
        {pasoActual === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="text-sm font-semibold border-b pb-2">Etapa 2: Medios de Contacto y Asignación</h4>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Teléfono Móvil *</label>
              <input
                type="tel"
                placeholder="+505 8888-0000"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm bg-background"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Correo Corporativo *</label>
              <input
                type="email"
                placeholder="roberto.castillo@empresa.com.ni"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm bg-background"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Área Operativa *</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value as CategoriaContacto)}
                className="w-full px-3 py-2 border rounded-md text-sm bg-background"
              >
                <option value="Operaciones">Operaciones</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Recursos Humanos">Recursos Humanos</option>
                <option value="Finanzas">Finanzas</option>
                <option value="Dirección">Dirección</option>
                <option value="Ventas">Ventas</option>
              </select>
            </div>
          </div>
        )}

        {/* ETAPA 3 */}
        {pasoActual === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <h4 className="text-sm font-semibold border-b pb-2">Etapa 3: Resumen y Validación</h4>
            <p className="text-xs text-muted-foreground">
              Comprueba la información capturada antes de autorizar el registro formal.
            </p>

            <div className="p-4 border rounded-xl bg-muted/20 space-y-2 text-sm">
              <div className="flex justify-between border-b pb-1.5">
                <span className="text-muted-foreground">Colaborador:</span>
                <span className="font-semibold">{nombre} {apellido}</span>
              </div>
              <div className="flex justify-between border-b pb-1.5">
                <span className="text-muted-foreground">Teléfono:</span>
                <span className="font-mono">{telefono}</span>
              </div>
              <div className="flex justify-between border-b pb-1.5">
                <span className="text-muted-foreground">Correo:</span>
                <span className="font-mono">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Departamento:</span>
                <span className="font-semibold text-primary">{categoria}</span>
              </div>
            </div>

            <label className="flex items-center gap-2 pt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={favorito}
                onChange={(e) => setFavorito(e.target.checked)}
                className="h-4 w-4 rounded text-amber-500"
              />
              <span className="text-sm">Marcar inmediatamente como colaborador preferente ⭐</span>
            </label>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4">
        <Button
          variant="outline"
          disabled={pasoActual === 1}
          onClick={retrocederPaso}
        >
          ← Anterior
        </Button>

        {pasoActual < 3 ? (
          <Button onClick={avanzarPaso}>
            Continuar →
          </Button>
        ) : (
          <Button onClick={() => setModalConfirmacionAbierto(true)}>
            Finalizar Incorporación
          </Button>
        )}
      </CardFooter>

      {/* DIÁLOGO MODAL DE CONFIRMACIÓN */}
      <Dialog open={modalConfirmacionAbierto} onOpenChange={setModalConfirmacionAbierto}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>¿Confirmar alta de colaborador?</DialogTitle>
            <DialogDescription>
              Se incorporará a <strong>{nombre} {apellido}</strong> al directorio corporativo en el área de{' '}
              <strong>{categoria}</strong>.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-0 pt-4">
            <DialogClose asChild>
              <Button variant="outline">Revisar de nuevo</Button>
            </DialogClose>
            <Button onClick={confirmarEnvio}>
              Sí, emitir registro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
```

---

## 9. Archivo 6: `src/components/Layout.tsx` (Estructura de la aplicación)

Este componente envuelve la página completa, alojando:
- El rastro de migas de pan (`Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator`, `BreadcrumbPage`).
- El encabezado con logotipo, título y estadísticas.
- El sistema de pestañas (`Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`) para alternar fluidamente entre la lista tabular, la cuadrícula de tarjetas, el asistente y el formulario rápido.

```tsx
// src/components/Layout.tsx
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
} from '@alcspower/ui';

interface LayoutProps {
  tabActivo: string;
  onCambiarTab: (tab: string) => void;
  totalContactos: number;
  totalFavoritos: number;
  children: {
    tabla: React.ReactNode;
    tarjetas: React.ReactNode;
    asistente: React.ReactNode;
    formulario: React.ReactNode;
  };
}

export function Layout({
  tabActivo,
  onCambiarTab,
  totalContactos,
  totalFavoritos,
  children,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-muted/20 text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 1. Barra superior: Miga de pan de ubicación */}
        <div className="bg-card px-4 py-2.5 rounded-lg border shadow-sm">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Portal Corporativo</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Recursos Humanos</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Directorio de Contactos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* 2. Banner de Cabecera con Métricas */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-2xl border shadow-sm">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Agenda Corporativa</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sistema centralizado para la administración del directorio de colaboradores.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-muted/40 px-5 py-3 rounded-xl border">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                Total Registrados
              </span>
              <span className="text-2xl font-black">{totalContactos}</span>
            </div>
            <Separator orientation="vertical" className="h-9" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                Destacados ⭐
              </span>
              <span className="text-2xl font-black text-amber-500">{totalFavoritos}</span>
            </div>
          </div>
        </div>

        {/* 3. Menú de Pestañas Principal */}
        <Tabs value={tabActivo} onValueChange={onCambiarTab} className="w-full space-y-6">
          <div className="flex justify-center sm:justify-start">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full max-w-2xl">
              <TabsTrigger value="tabla">📋 Directorio ({totalContactos})</TabsTrigger>
              <TabsTrigger value="tarjetas">⭐ Destacados ({totalFavoritos})</TabsTrigger>
              <TabsTrigger value="asistente">🚀 Asistente</TabsTrigger>
              <TabsTrigger value="formulario">⚡ Alta Rápida</TabsTrigger>
            </TabsList>
          </div>

          {/* Contenido de cada pestaña */}
          <TabsContent value="tabla" className="focus-visible:outline-none">
            {children.tabla}
          </TabsContent>

          <TabsContent value="tarjetas" className="focus-visible:outline-none">
            {children.tarjetas}
          </TabsContent>

          <TabsContent value="asistente" className="focus-visible:outline-none">
            {children.asistente}
          </TabsContent>

          <TabsContent value="formulario" className="focus-visible:outline-none">
            {children.formulario}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
```

---

## 10. Archivo 7: `src/App.tsx` (Componente Principal Integrador)

En `App.tsx` orquestamos todo el estado de la aplicación:
- La lista maestra de contactos (inicializada con datos de prueba).
- Los diálogos modales globales de eliminación y edición.
- El contenedor `<Toaster />` para que las alertas emergentes funcionen en cualquier rincón.
- El proveedor contextual `<TooltipProvider>`.

```tsx
// src/App.tsx
import React, { useState } from 'react';
import {
  TooltipProvider,
  Toaster,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Button,
  toast,
} from '@alcspower/ui';

import { Contact, NuevoContactoInput } from './types';
import { Layout } from './components/Layout';
import { ContactList } from './components/ContactList';
import { ContactCard } from './components/ContactCard';
import { ContactForm } from './components/ContactForm';
import { AddContactStepper } from './components/AddContactStepper';

// Datos de demostración iniciales
const DATOS_SEMILLA: Contact[] = [
  {
    id: 1,
    nombre: 'Ana',
    apellido: 'García Martínez',
    telefono: '+505 8888-0001',
    email: 'ana.garcia@empresa.com.ni',
    categoria: 'Dirección',
    activo: true,
    favorito: true,
    fechaIngreso: '15/01/2023',
  },
  {
    id: 2,
    nombre: 'Carlos',
    apellido: 'Mendoza Rivas',
    telefono: '+505 8888-0002',
    email: 'carlos.mendoza@empresa.com.ni',
    categoria: 'Tecnología',
    activo: true,
    favorito: false,
    fechaIngreso: '03/03/2024',
  },
  {
    id: 3,
    nombre: 'Valeria',
    apellido: 'Solís Duarte',
    telefono: '+505 8888-0003',
    email: 'valeria.solis@empresa.com.ni',
    categoria: 'Recursos Humanos',
    activo: false,
    favorito: true,
    fechaIngreso: '10/08/2023',
  },
  {
    id: 4,
    nombre: 'Roberto',
    apellido: 'Sánchez Morales',
    telefono: '+505 8888-0004',
    email: 'roberto.sanchez@empresa.com.ni',
    categoria: 'Finanzas',
    activo: true,
    favorito: false,
    fechaIngreso: '22/11/2022',
  },
  {
    id: 5,
    nombre: 'Elena',
    apellido: 'Castillo Vega',
    telefono: '+505 8888-0005',
    email: 'elena.castillo@empresa.com.ni',
    categoria: 'Ventas',
    activo: true,
    favorito: true,
    fechaIngreso: '05/05/2024',
  },
  {
    id: 6,
    nombre: 'Francisco',
    apellido: 'Ortega Guido',
    telefono: '+505 8888-0006',
    email: 'francisco.ortega@empresa.com.ni',
    categoria: 'Tecnología',
    activo: true,
    favorito: false,
    fechaIngreso: '12/09/2024',
  },
];

export function App() {
  const [contactos, setContactos] = useState<Contact[]>(DATOS_SEMILLA);
  const [tabActivo, setTabActivo] = useState('tabla');

  // Estados para modales globales
  const [idAEliminar, setIdAEliminar] = useState<number | null>(null);
  const [contactoEnEdicion, setContactoEnEdicion] = useState<Contact | null>(null);

  // Estados locales temporales de edición
  const [nombreEdicion, setNombreEdicion] = useState('');
  const [apellidoEdicion, setApellidoEdicion] = useState('');
  const [telefonoEdicion, setTelefonoEdicion] = useState('');

  // 1. Agregar contacto nuevo
  const handleAgregarContacto = (nuevo: NuevoContactoInput) => {
    const nuevoRegistro: Contact = {
      ...nuevo,
      id: Date.now(),
      fechaIngreso: new Date().toLocaleDateString('es-NI'),
    };
    setContactos((prev) => [nuevoRegistro, ...prev]);
  };

  // 2. Alternar estado de favorito
  const handleAlternarFavorito = (id: number) => {
    setContactos((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nuevoEstado = !c.favorito;
          if (nuevoEstado) {
            toast.success(`"${c.nombre}" añadido a Destacados ⭐`);
          } else {
            toast('Removido de favoritos');
          }
          return { ...c, favorito: nuevoEstado };
        }
        return c;
      })
    );
  };

  // 3. Preparar edición
  const handleIniciarEdicion = (c: Contact) => {
    setContactoEnEdicion(c);
    setNombreEdicion(c.nombre);
    setApellidoEdicion(c.apellido);
    setTelefonoEdicion(c.telefono);
  };

  // 4. Guardar edición
  const handleGuardarEdicion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactoEnEdicion) return;

    setContactos((prev) =>
      prev.map((c) =>
        c.id === contactoEnEdicion.id
          ? {
              ...c,
              nombre: nombreEdicion,
              apellido: apellidoEdicion,
              telefono: telefonoEdicion,
            }
          : c
      )
    );

    setContactoEnEdicion(null);
    toast.success('Cambios guardados con éxito');
  };

  // 5. Confirmar eliminación destructiva
  const handleConfirmarEliminacion = () => {
    if (idAEliminar === null) return;
    const eliminado = contactos.find((c) => c.id === idAEliminar);
    setContactos((prev) => prev.filter((c) => c.id !== idAEliminar));
    setIdAEliminar(null);
    toast.error(`El contacto "${eliminado?.nombre || ''}" fue eliminado.`);
  };

  // Contactos marcados como favoritos
  const contactosFavoritos = contactos.filter((c) => c.favorito);

  return (
    <TooltipProvider>
      {/* Contenedor Toast con posición en esquina inferior derecha */}
      <Toaster position="bottom-right" richColors />

      <Layout
        tabActivo={tabActivo}
        onCambiarTab={setTabActivo}
        totalContactos={contactos.length}
        totalFavoritos={contactosFavoritos.length}
      >
        {{
          // PESTAÑA 1: Tabla paginada de contactos
          tabla: (
            <ContactList
              contactos={contactos}
              onEditar={handleIniciarEdicion}
              onEliminar={(id) => setIdAEliminar(id)}
              onAlternarFavorito={handleAlternarFavorito}
            />
          ),

          // PESTAÑA 2: Cuadrícula de tarjetas de favoritos
          tarjetas: (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Colaboradores Preferentes</h3>
                <span className="text-xs text-muted-foreground">
                  {contactosFavoritos.length} seleccionados
                </span>
              </div>

              {contactosFavoritos.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed rounded-xl bg-card">
                  <span className="text-3xl block mb-2">⭐</span>
                  <p className="font-semibold text-sm">No tienes colaboradores marcados en favoritos</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Haz clic en el icono de estrella en el directorio para fijarlos aquí.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contactosFavoritos.map((c) => (
                    <ContactCard
                      key={c.id}
                      contacto={c}
                      onAlternarFavorito={handleAlternarFavorito}
                      onEliminar={(id) => setIdAEliminar(id)}
                      onEditar={handleIniciarEdicion}
                    />
                  ))}
                </div>
              )}
            </div>
          ),

          // PESTAÑA 3: Asistente guiado de onboarding
          asistente: (
            <AddContactStepper
              onGuardarContacto={handleAgregarContacto}
              onFinalizarFlujo={() => setTabActivo('tabla')}
            />
          ),

          // PESTAÑA 4: Formulario de alta rápida
          formulario: (
            <ContactForm
              onGuardarContacto={(nuevo) => {
                handleAgregarContacto(nuevo);
                setTabActivo('tabla');
              }}
              onCancelar={() => setTabActivo('tabla')}
            />
          ),
        }}
      </Layout>

      {/* DIÁLOGO GLOBAL DE ELIMINACIÓN */}
      <Dialog open={idAEliminar !== null} onOpenChange={(open) => !open && setIdAEliminar(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive">¿Eliminar contacto de la agenda?</DialogTitle>
            <DialogDescription>
              Esta acción eliminará definitivamente al colaborador del directorio corporativo.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleConfirmarEliminacion}>
              Confirmar Eliminación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DIÁLOGO GLOBAL DE EDICIÓN */}
      <Dialog
        open={contactoEnEdicion !== null}
        onOpenChange={(open) => !open && setContactoEnEdicion(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Datos del Colaborador</DialogTitle>
            <DialogDescription>
              Modifica la información y presiona guardar para reflejar los cambios.
            </DialogDescription>
          </DialogHeader>

          {contactoEnEdicion && (
            <form onSubmit={handleGuardarEdicion} className="space-y-4 py-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Nombre</label>
                <input
                  type="text"
                  value={nombreEdicion}
                  onChange={(e) => setNombreEdicion(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Apellido</label>
                <input
                  type="text"
                  value={apellidoEdicion}
                  onChange={(e) => setApellidoEdicion(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Teléfono</label>
                <input
                  type="tel"
                  value={telefonoEdicion}
                  onChange={(e) => setTelefonoEdicion(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                  required
                />
              </div>

              <DialogFooter className="border-t pt-4 flex justify-end gap-2">
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
          )}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}

export default App;
```

---

## 11. Archivo 8: `src/main.tsx` (Punto de entrada de React)

El archivo `main.tsx` es el responsable de montar el árbol de componentes dentro del elemento `<div id="root">` del archivo HTML principal.

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Asegúrate de importar los estilos de Tailwind CSS

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontró el elemento raíz en el documento HTML (#root).');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 12. Checklist final de lo aprendido

Verifica con orgullo cada uno de los conocimientos que dominas al finalizar este instructivo:

- [x] **Composición con `Card`**: Construir tarjetas con cabecera, descripción, cuerpo y pie.
- [x] **Segmentación con `Tabs`**: Cambiar entre vistas no controladas y controladas mediante `value` y `onValueChange`.
- [x] **Separación sutil con `Separator`**: Dominio de la orientación vertical y horizontal con clases Tailwind.
- [x] **Notificaciones con `Alert`**: Uso de las 5 variantes semánticas (`default`, `info`, `success`, `warning`, `destructive`).
- [x] **Toasts interactivos**: Montaje global de `<Toaster />` y disparos de avisos flotantes rápidos.
- [x] **Estados de Carga**: Uso combinado de `Spinner` en botones, `Skeleton` en tablas y `Progress` en barras de avance.
- [x] **Modales seguros con `Dialog`**: Creación de diálogos accesibles con captura de foco y botón cancelar.
- [x] **Etiquetas con `Tooltip`**: Envoltorio de botones de solo icono con `TooltipProvider` y `asChild`.
- [x] **Menús compactos con `DropdownMenu`**: Opciones alineadas con `align="end"` y elementos destructivos destacados.
- [x] **Tablas profesionales con `Table`**: Representación semántica de listas con celdas y filas uniformes.
- [x] **Semáforos con `StatusBadge`**: Uso de estados normalizados (`active`, `inactive`, `pending`, `warning`, `error`).
- [x] **Paginación dinámica con `Pagination`**: Matemáticas de páginas en cliente con el método `slice()`.
- [x] **Jerarquía con `Breadcrumb`**: Migas de pan navegables que muestran la posición exacta del usuario.
- [x] **Asistentes con `Stepper`**: Descomposición de formularios complejos en secuencias amigables de varios pasos.

---

## 13. ¿Y ahora qué? Próximos pasos recomendados

Ahora que dominas los componentes de `@alcspower/ui`, te encuentras en una posición privilegiada para llevar tus proyectos al siguiente nivel. Aquí tienes cuatro caminos recomendados para continuar creciendo:

### 1. Persistencia local con `localStorage`
En este proyecto final los datos residen en la memoria RAM del navegador (se pierden al recargar la página con F5). Puedes crear un hook personalizado `useLocalStorage` para guardar y leer la lista de contactos en formato JSON automáticamente:

```tsx
// Ejemplo de persistencia rápida:
useEffect(() => {
  const guardados = localStorage.getItem('mis_contactos');
  if (guardados) setContactos(JSON.parse(guardados));
}, []);

useEffect(() => {
  localStorage.setItem('mis_contactos', JSON.stringify(contactos));
}, [contactos]);
```

### 2. Navegación multipágina con `React Router`
En aplicaciones de gran envergadura suele preferirse que cada contacto tenga su propia URL única (por ejemplo `/contactos/123`). Aprender `react-router-dom` te permitirá conectar los componentes `BreadcrumbLink` y `PaginationLink` con URLs reales del navegador.

### 3. Conexión con una API REST real
Sustituye los datos semilla por peticiones HTTP mediante `fetch()` o bibliotecas como `TanStack Query` (React Query) conectándote a una API de pruebas como [JSONPlaceholder](https://jsonplaceholder.typicode.com/) o a tu propio backend en FastAPI, NestJS o ASP.NET Core.

### 4. Autenticación y roles de usuario
Añade una pantalla de inicio de sesión y restringe las acciones destructivas (como el botón `Eliminar`) únicamente a usuarios con el rol de Administrador.

---

## Mensaje final

El camino del desarrollo de software está lleno de retos continuos, pero dominar una biblioteca de componentes de calidad como `@alcspower/ui` te brinda superpoderes: te permite transformar ideas abstractas en productos digitales elegantes, accesibles y listos para producción en cuestión de horas.

¡Sigue construyendo, no temas experimentar y mucho éxito en tus próximos proyectos!

---

## Navegación

[← Capítulo 8: Patrones de Navegación](file:///docs/instructivo/es/08-navegacion.md) | [Volver al Inicio del Instructivo](file:///docs/instructivo/es/01-introduccion.md)
