import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Activity, Users } from 'lucide-react';
import { DeltaIndicator, MetricCard, StatCard } from './index';

describe('Metrics & Dashboard Components', () => {
  describe('DeltaIndicator', () => {
    it('muestra aumento positivo con clase e icono correspondiente', () => {
      render(<DeltaIndicator value={15.4} suffix="%" />);
      const el = screen.getByText('+15.4%');
      expect(el).toBeInTheDocument();

      const container = el.parentElement;
      expect(container).toHaveAttribute('aria-label', 'Aumento de +15.4%');
      expect(container).toHaveClass('text-alcspower-success');
    });

    it('muestra disminución negativa', () => {
      render(<DeltaIndicator value={-8.2} suffix="%" />);
      const el = screen.getByText('-8.2%');
      expect(el).toBeInTheDocument();

      const container = el.parentElement;
      expect(container).toHaveAttribute('aria-label', 'Disminución de -8.2%');
      expect(container).toHaveClass('text-alcspower-destructive');
    });

    it('invierte la intención semántica cuando isPositiveGood=false (ej. tiempo de respuesta / costos)', () => {
      // Si disminuyó el tiempo de respuesta (-25%), es una mejora (verde)
      render(<DeltaIndicator value={-25} isPositiveGood={false} suffix="%" />);
      const el = screen.getByText('-25%');
      expect(el.parentElement).toHaveClass('text-alcspower-success');

      // Si aumentaron los errores (+10%), es perjudicial (rojo)
      const { container } = render(
        <DeltaIndicator value={10} isPositiveGood={false} suffix="%" />
      );
      expect(container.firstElementChild).toHaveClass('text-alcspower-destructive');
    });

    it('no tiene violaciones de accesibilidad axe', async () => {
      const { container } = render(<DeltaIndicator value={12.5} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('MetricCard', () => {
    it('renderiza título, valor y delta correctamente', () => {
      render(
        <MetricCard
          title="Trámites Recibidos"
          value="1,248"
          delta={{ value: 12.5, label: 'vs mes anterior' }}
          icon={Activity}
        />
      );

      expect(screen.getByText('Trámites Recibidos')).toBeInTheDocument();
      expect(screen.getByText('1,248')).toBeInTheDocument();
      expect(screen.getByText('+12.5%')).toBeInTheDocument();
      expect(screen.getByText('vs mes anterior')).toBeInTheDocument();
    });

    it('muestra estado de carga (Skeleton) cuando isLoading=true', () => {
      const { container } = render(
        <MetricCard
          title="Ingresos Totales"
          value="$125,000"
          isLoading={true}
          delta={{ value: 5 }}
        />
      );

      expect(screen.getByText('Ingresos Totales')).toBeInTheDocument();
      expect(screen.queryByText('$125,000')).not.toBeInTheDocument();
      const skeletons = container.querySelectorAll('.skeleton, .animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('muestra estado de error cuando hasError=true', () => {
      render(
        <MetricCard
          title="Usuarios Activos"
          value="450"
          hasError={true}
          errorMessage="Error al consultar API de métricas"
        />
      );

      expect(screen.getByText('Error al consultar API de métricas')).toBeInTheDocument();
      expect(screen.queryByText('450')).not.toBeInTheDocument();
    });

    it('renderiza con nivel de encabezado configurado', () => {
      render(
        <MetricCard
          title="Métrica Principal"
          value="99.9%"
          headingLevel="h2"
        />
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Métrica Principal');
    });

    it('no tiene violaciones axe en MetricCard', async () => {
      const { container } = render(
        <MetricCard
          title="SLA Cumplido"
          value="98.5%"
          delta={{ value: 2.1 }}
          icon={Users}
          description="Dentro del umbral objetivo"
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('StatCard', () => {
    it('renderiza etiqueta, valor y barra de progreso accesible', () => {
      render(
        <StatCard
          label="Capacidad del Servidor"
          value="780 MB"
          progress={{ value: 78, max: 100, variant: 'warning', showLabel: true }}
          description="Consumo en las últimas 24 horas"
        />
      );

      expect(screen.getByText('Capacidad del Servidor')).toBeInTheDocument();
      expect(screen.getByText('780 MB')).toBeInTheDocument();
      expect(screen.getByText('78%')).toBeInTheDocument();
      expect(screen.getByText('Consumo en las últimas 24 horas')).toBeInTheDocument();

      const progress = screen.getByRole('progressbar', {
        name: 'Progreso de Capacidad del Servidor'
      });
      expect(progress).toHaveAttribute('aria-valuenow', '78');
    });

    it('no tiene violaciones axe en StatCard', async () => {
      const { container } = render(
        <StatCard
          label="Almacenamiento"
          value="45 GB"
          progress={{ value: 45, max: 100 }}
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
