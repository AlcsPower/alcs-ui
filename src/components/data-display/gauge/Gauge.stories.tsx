import type { Meta, StoryObj } from '@storybook/react';
import { Gauge } from './Gauge';
import { Card, CardHeader, CardTitle, CardContent } from '../card';

const meta: Meta<typeof Gauge> = {
  title: 'Data Display/Gauge',
  component: Gauge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['semicircle', 'arc', 'circle'],
      description: 'Disposición geométrica del arco',
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'destructive', 'auto'],
      description: 'Color semántico o cálculo automático',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamaño métrico del medidor',
    },
    showNeedle: {
      control: 'boolean',
      description: 'Muestra aguja mecánica',
    },
    showMinMax: {
      control: 'boolean',
      description: 'Muestra valores en los extremos',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Gauge>;

export const Default: Story = {
  args: {
    value: 82,
    unit: '%',
    variant: 'semicircle',
    color: 'auto',
    label: 'Cumplimiento SLA',
    sublabel: 'Meta requerida: 80%',
    size: 'md',
    showMinMax: true,
  },
};

export const VariantesGeometricas: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-around gap-8 p-6">
      <Gauge
        value={85}
        variant="semicircle"
        color="success"
        label="Semicírculo (180°)"
        sublabel="Expedientes al día"
        size="md"
        showMinMax
      />
      <Gauge
        value={68}
        variant="arc"
        color="primary"
        label="Tacómetro (240°)"
        sublabel="Carga de Servidores"
        size="md"
        showMinMax
      />
      <Gauge
        value={92}
        variant="circle"
        color="success"
        label="Anillo Completo (360°)"
        sublabel="Disponibilidad Anual"
        size="md"
      />
    </div>
  ),
};

export const ConAgujaMecanica: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-around gap-8 p-6">
      <Gauge
        value={35}
        variant="semicircle"
        color="auto"
        showNeedle
        label="Nivel de Riesgo (Bajo)"
        size="md"
        showMinMax
      />
      <Gauge
        value={74}
        variant="arc"
        color="auto"
        showNeedle
        label="Uso de Memoria (Medio)"
        size="md"
        showMinMax
      />
      <Gauge
        value={92}
        variant="arc"
        color="auto"
        showNeedle
        label="Alerta de Capacidad"
        size="md"
        showMinMax
      />
    </div>
  ),
};

export const EscalasDeTamano: Story = {
  render: () => (
    <div className="flex flex-wrap items-end justify-around gap-6 p-6">
      <Gauge value={75} size="sm" label="Pequeño (sm)" />
      <Gauge value={75} size="md" label="Estándar (md)" />
      <Gauge value={75} size="lg" label="Grande (lg)" />
      <Gauge value={75} size="xl" label="Extra Grande (xl)" />
    </div>
  ),
};

export const EnDashboardCard: Story = {
  render: () => (
    <div className="max-w-xs">
      <Card>
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-sm font-semibold text-alcspower-foreground">
            SLA de Atención Corporativa
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center pt-2">
          <Gauge
            value={94}
            variant="semicircle"
            color="auto"
            size="md"
            showMinMax
            sublabel="94 de 100 solicitudes en plazo"
          />
        </CardContent>
      </Card>
    </div>
  ),
};
