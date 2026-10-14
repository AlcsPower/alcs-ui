import type { Meta, StoryObj } from '@storybook/react';
import {
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
  type ChartConfig
} from '../components/chart';

const sampleConfig: ChartConfig = {
  solicitudes: {
    label: 'Solicitudes',
    color: 'var(--alcspower-chart-1)'
  },
  aprobadas: {
    label: 'Aprobadas',
    color: 'var(--alcspower-chart-3)'
  },
  rechazadas: {
    label: 'Rechazadas',
    color: 'var(--alcspower-chart-4)'
  }
};

const sampleData = [
  { mes: 'Ene', solicitudes: 186, aprobadas: 140, rechazadas: 24 },
  { mes: 'Feb', solicitudes: 305, aprobadas: 200, rechazadas: 45 },
  { mes: 'Mar', solicitudes: 237, aprobadas: 180, rechazadas: 30 },
  { mes: 'Abr', solicitudes: 273, aprobadas: 210, rechazadas: 35 },
  { mes: 'May', solicitudes: 309, aprobadas: 250, rechazadas: 40 },
  { mes: 'Jun', solicitudes: 414, aprobadas: 310, rechazadas: 50 }
];

const meta: Meta<typeof BarChart> = {
  title: 'Visualización/BarChart',
  component: BarChart,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof BarChart>;

export const BarrasAgrupadas: Story = {
  args: {
    data: sampleData,
    config: sampleConfig,
    xAxisKey: 'mes',
    series: [
      { key: 'solicitudes' },
      { key: 'aprobadas' }
    ],
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    accessibleTitle: 'Evolución de solicitudes semestrales'
  }
};

export const BarrasApiladas: Story = {
  args: {
    data: sampleData,
    config: sampleConfig,
    xAxisKey: 'mes',
    series: [
      { key: 'aprobadas', stackId: 'a' },
      { key: 'rechazadas', stackId: 'a' }
    ],
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    accessibleTitle: 'Distribución de solicitudes procesadas'
  }
};

export const LineasTendencia: StoryObj<typeof LineChart> = {
  render: () => (
    <LineChart
      data={sampleData}
      config={sampleConfig}
      xAxisKey="mes"
      curve="natural"
      series={[
        { key: 'solicitudes', strokeWidth: 3, dot: true },
        { key: 'aprobadas', strokeWidth: 2 }
      ]}
      showGrid={true}
      showLegend={true}
      accessibleTitle="Tendencia natural de atención"
    />
  )
};

export const AreaConGradiente: StoryObj<typeof AreaChart> = {
  render: () => (
    <AreaChart
      data={sampleData}
      config={sampleConfig}
      xAxisKey="mes"
      useGradient={true}
      series={[
        { key: 'solicitudes' },
        { key: 'aprobadas' }
      ]}
      showGrid={true}
      showLegend={true}
      accessibleTitle="Volumen acumulado de atención"
    />
  )
};

export const CircularDonut: StoryObj<typeof PieChart> = {
  render: () => {
    const pieData = [
      { canal: 'Portal de Autoservicio', valor: 450 },
      { canal: 'Portal En Línea', valor: 820 },
      { canal: 'Sucursales', valor: 210 }
    ];
    const pieConfig: ChartConfig = {
      'Portal de Autoservicio': { label: 'Autoservicio', color: 'var(--alcspower-chart-1)' },
      'Portal En Línea': { label: 'En Línea', color: 'var(--alcspower-chart-2)' },
      'Sucursales': { label: 'Sucursales', color: 'var(--alcspower-chart-3)' }
    };

    return (
      <div className="max-w-md mx-auto">
        <PieChart
          data={pieData}
          config={pieConfig}
          dataKey="valor"
          nameKey="canal"
          donut={true}
          accessibleTitle="Canales de ingreso de trámites"
        />
      </div>
    );
  }
};
