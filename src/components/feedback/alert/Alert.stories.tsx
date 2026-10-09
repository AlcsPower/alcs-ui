import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Overlays/Alert',
  component: Alert,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Informacion: Story = {
  render: () => (
    <div className="w-[450px]">
      <Alert variant="info">
        <AlertTitle>Horario de Atención</AlertTitle>
        <AlertDescription>
          La ventanilla única atiende solicitudes de lunes a viernes de 8:00 AM a 5:00 PM.
        </AlertDescription>
      </Alert>
    </div>
  )
};

export const Exito: Story = {
  render: () => (
    <div className="w-[450px]">
      <Alert variant="success">
        <AlertTitle>Trámite Aprobado</AlertTitle>
        <AlertDescription>
          Su constancia de importación ha sido emitida satisfactoriamente.
        </AlertDescription>
      </Alert>
    </div>
  )
};

export const Advertencia: Story = {
  render: () => (
    <div className="w-[450px]">
      <Alert variant="warning">
        <AlertTitle>Documentación Incompleta</AlertTitle>
        <AlertDescription>
          Falta adjuntar el poder de representación legal debidamente notarizado.
        </AlertDescription>
      </Alert>
    </div>
  )
};

export const Peligro: Story = {
  render: () => (
    <div className="w-[450px]">
      <Alert variant="danger">
        <AlertTitle>Plazo Vencido</AlertTitle>
        <AlertDescription>
          El período de subsanación de 10 días hábiles ha caducado.
        </AlertDescription>
      </Alert>
    </div>
  )
};
