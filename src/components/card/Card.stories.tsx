import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from '../button';
import { Badge } from '../badge';

const meta: Meta = {
  title: 'Controles/Card',
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Expediente EXP-2026-902</CardTitle>
          <Badge variant="success">Aprobado</Badge>
        </div>
        <CardDescription>Registro sanitario de productos de exportación</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-mific-text-secondary">
          Titular: Lácteos del Norte S.A.<br />
          Fecha de emisión: 15 de marzo de 2026
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">Descargar PDF</Button>
        <Button variant="primary" size="sm">Ver Detalles</Button>
      </CardFooter>
    </Card>
  )
};
