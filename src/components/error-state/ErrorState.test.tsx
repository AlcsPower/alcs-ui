import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { WifiOff } from 'lucide-react';
import { ErrorState } from './ErrorState';
import { Button } from '../button';

describe('ErrorState Component', () => {
  it('renders with title', () => {
    render(<ErrorState title="Error de conexión" />);
    expect(screen.getByText('Error de conexión')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(
      <ErrorState
        title="Error de conexión"
        description="No se pudo establecer conexión con el servidor."
      />
    );
    expect(
      screen.getByText('No se pudo establecer conexión con el servidor.')
    ).toBeInTheDocument();
  });

  it('renders default AlertCircle icon', () => {
    const { container } = render(<ErrorState title="Error" />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('h-6', 'w-6');
  });

  it('renders custom icon', () => {
    render(
      <ErrorState
        title="Sin conexión"
        icon={<WifiOff data-testid="custom-icon" className="h-6 w-6" />}
      />
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders action and secondaryAction buttons', () => {
    render(
      <ErrorState
        title="Fallo al procesar"
        action={<Button variant="primary">Reintentar</Button>}
        secondaryAction={<Button variant="outline">Cancelar</Button>}
      />
    );
    expect(screen.getByRole('button', { name: /reintentar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
  });

  it('has role="alert"', () => {
    render(<ErrorState title="Alerta de error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('reenables ref forwarding', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ErrorState ref={ref} title="Error con ref" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute('role', 'alert');
  });

  it('custom className merges properly', () => {
    render(<ErrorState title="Error" className="custom-error-class" />);
    const element = screen.getByRole('alert');
    expect(element).toHaveClass('custom-error-class');
    expect(element).toHaveClass('min-h-[320px]');
  });

  it('passes vitest-axe accessibility test with 0 violations', async () => {
    const { container } = render(
      <ErrorState
        title="Error al cargar datos"
        description="Ocurrió un problema de conexión con el servidor. Intente nuevamente."
        action={<Button variant="primary">Reintentar</Button>}
        secondaryAction={<Button variant="outline">Volver al inicio</Button>}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
