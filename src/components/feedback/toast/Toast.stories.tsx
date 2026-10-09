import type { Meta, StoryObj } from '@storybook/react';
import { Toaster, ToastCard } from './Toaster';
import { toast } from './toast';
import { Button } from '../../forms/button';

const meta: Meta<typeof Toaster> = {
  title: 'Feedback/Toast',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 items-center">
      <Toaster {...args} />
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => toast('Notificación del sistema', { description: 'Los cambios fueron registrados localmente.' })}
        >
          Toast Estándar
        </Button>
        <Button
          variant="primary"
          onClick={() => toast.success('Trámite guardado', { description: 'El expediente EXP-2026-042 fue actualizado con éxito.' })}
        >
          Toast Éxito
        </Button>
        <Button
          variant="destructive"
          onClick={() => toast.error('Error al sincronizar', { description: 'No se pudo conectar con el servidor central.' })}
        >
          Toast Error
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast.warning('Atención requerida', { description: 'Su sesión expirará en 5 minutos.' })}
        >
          Toast Advertencia
        </Button>
        <Button
          variant="ghost"
          onClick={() => toast.info('Nueva actualización', { description: 'La versión v0.9.0 ya se encuentra disponible.' })}
        >
          Toast Informativo
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(
              new Promise((resolve) => setTimeout(resolve, 2000)),
              {
                loading: 'Procesando firma electrónica...',
                success: 'Documento firmado digitalmente.',
                error: 'Fallo al procesar la firma.',
              }
            )
          }
        >
          Toast con Promesa
        </Button>
      </div>
    </div>
  ),
};

export const StaticCards: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-md w-full">
      <Toaster />
      <ToastCard
        variant="success"
        title="Operación exitosa"
        description="Los cambios se guardaron correctamente."
        showProgress
      />
      <ToastCard
        variant="error"
        title="Error al guardar"
        description="No se pudo conectar con el servidor. Intentá de nuevo."
        action={{ label: 'Reintentar', onClick: () => toast('Reintentando...') }}
        cancel={{ label: 'Descartar' }}
        showProgress
      />
      <ToastCard
        variant="warning"
        title="Sesión por expirar"
        description="Tu sesión expira en 5 minutos. Guardá tu trabajo."
        showProgress
      />
      <ToastCard
        variant="info"
        title="Nueva actualización disponible"
        description="Versión 2.4.1 lista para instalar."
        showProgress
      />
    </div>
  ),
};
