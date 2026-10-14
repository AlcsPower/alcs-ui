import type { Meta, StoryObj } from '@storybook/react';
import { LoadingOverlay } from './LoadingOverlay';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../data-display/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../data-display/table';
import { Button } from '../../forms/button';

const meta: Meta<typeof LoadingOverlay> = {
  title: 'Feedback/LoadingOverlay',
  component: LoadingOverlay,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Determina si el overlay está visible'
    },
    label: {
      control: 'text',
      description: 'Texto descriptivo del estado de carga'
    },
    spinnerSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del spinner'
    }
  }
};

export default meta;
type Story = StoryObj<typeof LoadingOverlay>;

export const Default: Story = {
  args: {
    visible: true,
    label: 'Cargando...',
    spinnerSize: 'md'
  },
  render: (args) => (
    <div className="relative h-64 w-96 border border-alcspower-border rounded-lg p-6 bg-alcspower-surface flex flex-col justify-between">
      <div>
        <h4 className="text-base font-semibold text-alcspower-foreground">Panel de Control</h4>
        <p className="mt-1 text-sm text-alcspower-muted-foreground">
          Sincronizando la información con los servicios centrales.
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm">Detalles</Button>
      </div>
      <LoadingOverlay {...args} />
    </div>
  )
};

export const OverCard: Story = {
  render: () => (
    <Card className="relative p-6 w-96">
      <CardHeader className="p-0 pb-4">
        <CardTitle>Registro Corporativo</CardTitle>
        <CardDescription>Resumen de solicitud #REQ-2026-089</CardDescription>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <p className="text-sm text-alcspower-foreground">
          Estado: En revisión técnica.
        </p>
        <p className="mt-1 text-sm text-alcspower-muted-foreground">
          Responsable: Dirección de Comercio y Normas.
        </p>
      </CardContent>
      <CardFooter className="p-0 flex justify-end gap-2">
        <Button variant="outline" size="sm" disabled>Cancelar</Button>
        <Button variant="primary" size="sm" disabled>Aprobar</Button>
      </CardFooter>
      <LoadingOverlay visible label="Cargando expediente..." spinnerSize="md" />
    </Card>
  )
};

export const OverTable: Story = {
  render: () => (
    <div className="relative border border-alcspower-border rounded-lg p-4 bg-alcspower-surface w-full max-w-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Solicitante</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">SOL-001</TableCell>
            <TableCell>Empresa ABC, S.A.</TableCell>
            <TableCell>05/10/2026</TableCell>
            <TableCell>Pendiente</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">SOL-002</TableCell>
            <TableCell>Distribuidora Central</TableCell>
            <TableCell>04/10/2026</TableCell>
            <TableCell>Completado</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">SOL-003</TableCell>
            <TableCell>Comercial Norte</TableCell>
            <TableCell>02/10/2026</TableCell>
            <TableCell>En proceso</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <LoadingOverlay visible label="Actualizando registros..." spinnerSize="lg" />
    </div>
  )
};

export const CustomLabel: Story = {
  render: () => (
    <div className="relative h-64 w-96 border border-alcspower-border rounded-lg p-6 bg-alcspower-surface flex flex-col items-center justify-center">
      <p className="text-sm text-alcspower-foreground">Formulario de registro corporativo</p>
      <LoadingOverlay visible label="Guardando cambios..." spinnerSize="lg" />
    </div>
  )
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-alcspower-background p-6 rounded-lg">
      <Card className="relative p-6 w-96 border-alcspower-border bg-alcspower-surface-card">
        <CardHeader className="p-0 pb-4">
          <CardTitle>Sincronización Nocturna</CardTitle>
          <CardDescription>Actualizando catálogos corporativos</CardDescription>
        </CardHeader>
        <CardContent className="p-0 pb-4">
          <p className="text-sm text-alcspower-foreground">
            Los datos se refrescan de manera asíncrona en modo oscuro.
          </p>
        </CardContent>
        <LoadingOverlay visible label="Sincronizando datos..." spinnerSize="md" />
      </Card>
    </div>
  )
};
