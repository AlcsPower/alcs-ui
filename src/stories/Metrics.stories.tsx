import type { Meta, StoryObj } from '@storybook/react';
import { Activity, DollarSign, TrendingUp, Users } from 'lucide-react';
import {
  MetricCard,
  StatCard,
  DeltaIndicator
} from '../components/metrics';
import { Button } from '../components/button';

const meta: Meta<typeof MetricCard> = {
  title: 'Métricas/MetricCard',
  component: MetricCard,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const KPIEjecutivo: Story = {
  args: {
    title: 'Trámites Concluidos',
    value: '14,250',
    delta: {
      value: 18.2,
      label: 'vs periodo anterior'
    },
    icon: Activity,
    description: 'Meta mensual: 12,000 trámites'
  }
};

export const ConAccion: Story = {
  args: {
    title: 'Recaudación Arancelaria',
    value: 'C$ 4,850,200',
    delta: {
      value: 5.4,
      label: 'vs meta presupuestaria'
    },
    icon: DollarSign,
    action: (
      <Button variant="outline" size="sm">
        Ver desglose
      </Button>
    )
  }
};

export const EstadoCargando: Story = {
  args: {
    title: 'Tiempo Promedio de Respuesta',
    isLoading: true,
    delta: {
      value: -15
    }
  }
};

export const EstadoError: Story = {
  args: {
    title: 'Usuarios Concurrentes',
    hasError: true,
    errorMessage: 'No se pudo conectar con el servicio de telemetría'
  }
};

export const TarjetaEstadisticaConProgreso: StoryObj<typeof StatCard> = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
      <StatCard
        label="Capacidad de Servidores"
        value="64%"
        icon={Activity}
        progress={{ value: 64, max: 100, variant: 'default', showLabel: true }}
        description="Consumo normal de cómputo"
      />
      <StatCard
        label="Almacenamiento Documental"
        value="88%"
        icon={TrendingUp}
        progress={{ value: 88, max: 100, variant: 'warning', showLabel: true }}
        description="Requiere ampliación en 15 días"
      />
      <StatCard
        label="Disponibilidad de Servicios"
        value="99.98%"
        icon={Users}
        progress={{ value: 99.98, max: 100, variant: 'success' }}
        description="Acuerdo de nivel de servicio (SLA) cumplido"
      />
    </div>
  )
};

export const IndicadoresDelta: StoryObj<typeof DeltaIndicator> = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <DeltaIndicator value={24.5} />
      <DeltaIndicator value={-12.8} />
      <DeltaIndicator value={0.0} />
      <DeltaIndicator value={-30} isPositiveGood={false} suffix="% latencia" />
      <DeltaIndicator value={15} isPositiveGood={false} suffix="% errores" />
    </div>
  )
};
