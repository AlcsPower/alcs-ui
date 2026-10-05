import type { Meta, StoryObj } from '@storybook/react';
import { WifiOff } from 'lucide-react';
import { ErrorState } from './ErrorState';
import { Button } from '../button/Button';

const meta: Meta<typeof ErrorState> = {
  title: 'Feedback/ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título principal del mensaje de error',
    },
    description: {
      control: 'text',
      description: 'Descripción explicativa o pasos a seguir para solucionar el error',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {
  args: {
    title: 'Error al cargar datos',
    description: 'Ocurrió un problema de conexión con el servidor. Intente nuevamente.',
  },
};

export const WithAction: Story = {
  render: () => (
    <ErrorState
      title="Error al cargar datos"
      description="Ocurrió un problema de conexión con el servidor. Intente nuevamente."
      action={
        <Button variant="outline">
          Reintentar
        </Button>
      }
    />
  ),
};

export const WithSecondaryAction: Story = {
  render: () => (
    <ErrorState
      title="Error al cargar datos"
      description="Ocurrió un problema de conexión con el servidor. Intente nuevamente."
      action={
        <Button variant="primary">
          Reintentar
        </Button>
      }
      secondaryAction={
        <Button variant="outline">
          Volver al inicio
        </Button>
      }
    />
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <ErrorState
      icon={<WifiOff className="h-6 w-6 stroke-[1.5]" />}
      title="Sin conexión de red"
      description="Verifique su conexión a Internet e inténtelo de nuevo."
      action={
        <Button variant="outline">
          Reintentar conexión
        </Button>
      }
    />
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-alcspower-surface-card p-6 rounded-lg">
      <ErrorState
        title="Error al cargar datos"
        description="Ocurrió un problema de conexión con el servidor. Intente nuevamente."
        action={
          <Button variant="primary">
            Reintentar
          </Button>
        }
        secondaryAction={
          <Button variant="outline">
            Volver al inicio
          </Button>
        }
      />
    </div>
  ),
};
