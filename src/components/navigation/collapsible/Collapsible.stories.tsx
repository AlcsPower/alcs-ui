import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Filter,
  User,
  Calendar,
  Paperclip,
  Settings,
  Shield,
  MessageSquare,
  Layers,
  Lock,
  Clock
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleGroup
} from './Collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'Data Display/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'padded'
  }
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

/**
 * Expandible Simple: Contenedor ligero para secciones que se pueden ocultar.
 * Ideal para filtros avanzados y paneles de configuración.
 */
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="w-[640px] max-w-full mx-auto">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger
            icon={<Filter className="h-4 w-4" />}
            subtitle="Personalizá los criterios de búsqueda"
            toggleText={isOpen ? 'Ocultar' : 'Mostrar'}
          >
            Filtros Avanzados
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="mb-3">Configurá los filtros para refinar tu búsqueda:</p>
            <ul className="list-disc pl-5 mb-3 space-y-1 text-alcspower-muted-foreground">
              <li><strong className="text-alcspower-foreground font-semibold">Rango de fechas:</strong> seleccioná el período de interés</li>
              <li><strong className="text-alcspower-foreground font-semibold">Estado:</strong> filtrá por estado del trámite</li>
              <li><strong className="text-alcspower-foreground font-semibold">Departamento:</strong> limitá por jurisdicción</li>
              <li><strong className="text-alcspower-foreground font-semibold">Tipo de documento:</strong> filtrá por categoría</li>
            </ul>
            <p className="text-xs text-alcspower-muted-foreground">
              Los filtros se aplican automáticamente al cambiar cualquier valor.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  }
};

/**
 * Variante Bordered: Agrupado apilado sin espacio entre items en un solo contenedor con borde.
 */
export const Bordered: Story = {
  render: () => {
    const [openThird, setOpenThird] = React.useState(true);

    return (
      <div className="w-[640px] max-w-full mx-auto">
        <CollapsibleGroup variant="bordered">
          <Collapsible variant="bordered">
            <CollapsibleTrigger
              icon={<User className="h-4 w-4" />}
            >
              Información del solicitante
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p>Datos personales del solicitante del trámite.</p>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible variant="bordered">
            <CollapsibleTrigger
              icon={<Calendar className="h-4 w-4" />}
            >
              Fechas importantes
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p>Fechas clave del proceso: inicio, vencimiento y resolución.</p>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            variant="bordered"
            open={openThird}
            onOpenChange={setOpenThird}
          >
            <CollapsibleTrigger
              icon={<Paperclip className="h-4 w-4" />}
            >
              Documentación adjunta
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p>Archivos y documentos relacionados con el trámite.</p>
            </CollapsibleContent>
          </Collapsible>
        </CollapsibleGroup>
      </div>
    );
  }
};

/**
 * Variante Ghost: Minimalista sin borde exterior, con líneas divisorias.
 */
export const Ghost: Story = {
  render: () => (
    <div className="w-[640px] max-w-full mx-auto">
      <CollapsibleGroup variant="ghost">
        <Collapsible variant="ghost">
          <CollapsibleTrigger
            icon={<Settings className="h-4 w-4" />}
          >
            Configuración avanzada
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p>Opciones avanzadas para usuarios técnicos.</p>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible variant="ghost">
          <CollapsibleTrigger
            icon={<Shield className="h-4 w-4" />}
          >
            Seguridad y permisos
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p>Gestioná los permisos de acceso y seguridad de la cuenta.</p>
          </CollapsibleContent>
        </Collapsible>
      </CollapsibleGroup>
    </div>
  )
};

/**
 * Tamaños: sm, md (por defecto), lg.
 */
export const Sizes: Story = {
  render: () => (
    <div className="w-[640px] max-w-full mx-auto space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground block mb-2">
          Small (sm)
        </span>
        <Collapsible size="sm">
          <CollapsibleTrigger
            icon={<MessageSquare className="h-3.5 w-3.5" />}
          >
            Comentarios
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p>Dejá tus comentarios sobre este trámite.</p>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground block mb-2">
          Large (lg)
        </span>
        <Collapsible size="lg">
          <CollapsibleTrigger
            icon={<Layers className="h-4.5 w-4.5" />}
            subtitle="Información completa y estado actual"
          >
            Detalles del trámite
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p>
              Visualizá todos los detalles del trámite incluyendo historial de cambios, documentos asociados y estado actual del proceso.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
};

/**
 * Estado deshabilitado.
 */
export const Disabled: Story = {
  render: () => (
    <div className="w-[640px] max-w-full mx-auto">
      <Collapsible disabled>
        <CollapsibleTrigger
          icon={<Lock className="h-4 w-4" />}
          subtitle="Requiere permisos especiales"
        >
          Sección bloqueada
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>No tiene permisos para ver este contenido.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
};

/**
 * Abierto por defecto.
 */
export const OpenByDefault: Story = {
  render: () => (
    <div className="w-[640px] max-w-full mx-auto">
      <Collapsible defaultOpen>
        <CollapsibleTrigger
          icon={<Clock className="h-4 w-4" />}
          subtitle="Leé antes de continuar"
          toggleText={(open) => (open ? 'Ocultar' : 'Mostrar')}
        >
          Instrucciones importantes
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p className="mb-2">
            <strong className="text-alcspower-foreground font-semibold">Atención:</strong> Antes de iniciar el trámite, asegurate de tener toda la documentación requerida. Los campos marcados con * son obligatorios.
          </p>
          <p>
            El proceso puede tardar hasta 5 días hábiles. Recibirás una notificación por correo electrónico cuando el trámite sea resuelto.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
};
