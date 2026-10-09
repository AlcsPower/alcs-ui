import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Button } from '../../forms/button';
import { FileSearch, FolderPlus, BellOff } from 'lucide-react';

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título del estado vacío'
    },
    description: {
      control: 'text',
      description: 'Descripción explicativa'
    }
  }
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'No hay trámites registrados',
    description: 'Actualmente no existen registros asociados a su cuenta institucional.'
  }
};

export const WithAction: Story = {
  render: () => (
    <EmptyState
      icon={<FolderPlus className="h-6 w-6 stroke-[1.5]" />}
      title="Sin solicitudes activas"
      description="Comience creando una nueva solicitud de trámite institucional para dar seguimiento a sus requerimientos."
      action={
        <Button variant="primary">
          Crear nueva solicitud
        </Button>
      }
    />
  )
};

export const SearchNotFound: Story = {
  render: () => (
    <EmptyState
      icon={<FileSearch className="h-6 w-6 stroke-[1.5]" />}
      title="No se encontraron resultados"
      description="No hay coincidencias para el criterio de búsqueda ingresado. Intente con términos más generales."
      action={
        <Button variant="outline">
          Limpiar filtros
        </Button>
      }
    />
  )
};

export const NoNotifications: Story = {
  render: () => (
    <EmptyState
      icon={<BellOff className="h-6 w-6 stroke-[1.5]" />}
      title="Bandeja de notificaciones al día"
      description="No tiene alertas pendientes en este momento."
    />
  )
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-alcspower-surface-card p-6 rounded-lg">
      <EmptyState
        title="Sin documentos en archivo"
        description="El repositorio digital de este expediente se encuentra vacío."
        action={
          <Button variant="primary">
            Cargar documento
          </Button>
        }
      />
    </div>
  )
};
