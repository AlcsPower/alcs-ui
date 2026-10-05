import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import {
  ChartContainer,
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
  type ChartConfig
} from './index';

// Mock de ResponsiveContainer para JSDOM donde las dimensiones suelen ser 0
vi.mock('recharts', async () => {
  const original = await vi.importActual<any>('recharts');
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div className="recharts-responsive-container" style={{ width: 500, height: 300 }}>
        {children}
      </div>
    )
  };
});

describe('Chart Components', () => {
  const sampleConfig: ChartConfig = {
    tramites: {
      label: 'Trámites',
      color: 'var(--alcspower-chart-1)'
    },
    resueltos: {
      label: 'Resueltos',
      color: 'var(--alcspower-chart-3)'
    }
  };

  const sampleData = [
    { mes: 'Enero', tramites: 120, resueltos: 95 },
    { mes: 'Febrero', tramites: 150, resueltos: 130 },
    { mes: 'Marzo', tramites: 180, resueltos: 160 }
  ];

  describe('ChartContainer', () => {
    it('renderiza con rol accesible role="img" y aria-label por defecto', () => {
      render(
        <ChartContainer config={sampleConfig} accessibleTitle="Estadísticas de atención">
          <div>Dummy Chart</div>
        </ChartContainer>
      );

      const chart = screen.getByRole('img', { name: 'Estadísticas de atención' });
      expect(chart).toBeInTheDocument();
      expect(chart).toHaveTextContent('Dummy Chart');
    });

    it('inyecta variables CSS de series cromáticas', () => {
      const { container } = render(
        <ChartContainer config={sampleConfig}>
          <div>Inner</div>
        </ChartContainer>
      );

      const chartEl = container.firstElementChild as HTMLElement;
      expect(chartEl.style.getPropertyValue('--color-tramites')).toBe('var(--alcspower-chart-1)');
      expect(chartEl.style.getPropertyValue('--color-resueltos')).toBe('var(--alcspower-chart-3)');
    });

    it('no tiene violaciones de accesibilidad axe', async () => {
      const { container } = render(
        <ChartContainer
          config={sampleConfig}
          accessibleTitle="Resumen mensual"
          accessibleDescription="Gráfico que muestra la evolución de trámites recibidos vs resueltos."
        >
          <div>Contenido gráfico</div>
        </ChartContainer>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('BarChart', () => {
    it('renderiza correctamente con las series configuradas', () => {
      render(
        <BarChart
          data={sampleData}
          config={sampleConfig}
          xAxisKey="mes"
          series={[
            { key: 'tramites', name: 'Trámites' },
            { key: 'resueltos', name: 'Resueltos' }
          ]}
          accessibleTitle="Trámites por mes"
        />
      );

      const chart = screen.getByRole('img', { name: 'Trámites por mes' });
      expect(chart).toBeInTheDocument();
    });

    it('no tiene violaciones axe-core en BarChart', async () => {
      const { container } = render(
        <BarChart
          data={sampleData}
          config={sampleConfig}
          xAxisKey="mes"
          series={[{ key: 'tramites' }]}
          accessibleTitle="Trámites registrados"
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('LineChart', () => {
    it('renderiza con rol accesible y curva configurada', () => {
      render(
        <LineChart
          data={sampleData}
          config={sampleConfig}
          xAxisKey="mes"
          curve="natural"
          series={[{ key: 'tramites', strokeWidth: 3 }]}
          accessibleTitle="Tendencia de trámites"
        />
      );

      const chart = screen.getByRole('img', { name: 'Tendencia de trámites' });
      expect(chart).toBeInTheDocument();
    });

    it('no tiene violaciones axe en LineChart', async () => {
      const { container } = render(
        <LineChart
          data={sampleData}
          config={sampleConfig}
          xAxisKey="mes"
          series={[{ key: 'tramites' }]}
          accessibleTitle="Tendencia histórica"
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('AreaChart', () => {
    it('renderiza con soporte para gradientes y sombreado', () => {
      render(
        <AreaChart
          data={sampleData}
          config={sampleConfig}
          xAxisKey="mes"
          useGradient={true}
          series={[{ key: 'tramites' }, { key: 'resueltos' }]}
          accessibleTitle="Volumen acumulado"
        />
      );

      const chart = screen.getByRole('img', { name: 'Volumen acumulado' });
      expect(chart).toBeInTheDocument();
    });
  });

  describe('PieChart', () => {
    const pieData = [
      { name: 'Aprobados', value: 400 },
      { name: 'Rechazados', value: 50 },
      { name: 'Pendientes', value: 120 }
    ];

    const pieConfig: ChartConfig = {
      Aprobados: { label: 'Aprobados', color: 'var(--alcspower-chart-3)' },
      Rechazados: { label: 'Rechazados', color: 'var(--alcspower-destructive)' },
      Pendientes: { label: 'Pendientes', color: 'var(--alcspower-chart-4)' }
    };

    it('renderiza correctamente en modo dona y circular', () => {
      render(
        <PieChart
          data={pieData}
          config={pieConfig}
          dataKey="value"
          nameKey="name"
          donut={true}
          accessibleTitle="Distribución de solicitudes"
        />
      );

      const chart = screen.getByRole('img', { name: 'Distribución de solicitudes' });
      expect(chart).toBeInTheDocument();
    });

    it('no tiene violaciones axe en PieChart', async () => {
      const { container } = render(
        <PieChart
          data={pieData}
          config={pieConfig}
          dataKey="value"
          nameKey="name"
          accessibleTitle="Distribución porcentual"
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
