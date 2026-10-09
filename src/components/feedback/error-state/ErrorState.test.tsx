import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { WifiOff } from 'lucide-react';
import { ErrorState } from './ErrorState';
import { Button } from '../../forms/button';

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

  it('renders error code badge when code is provided', () => {
    render(<ErrorState title="Fallo" code="ERR_CONNECTION_TIMEOUT" />);
    expect(screen.getByText('ERR_CONNECTION_TIMEOUT')).toBeInTheDocument();
    expect(screen.getByText('ERR_CONNECTION_TIMEOUT')).toHaveClass('error-code');
  });

  it('toggles technical details when button is clicked', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();

    render(
      <ErrorState
        title="Fallo"
        details={<div>Timestamp: 2026-10-15</div>}
        detailsLabel="Ver detalles"
        hideDetailsLabel="Ocultar detalles"
      />
    );

    const toggleBtn = screen.getByRole('button', { name: /ver detalles/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(screen.queryByText(/timestamp: 2026-10-15/i)).not.toBeInTheDocument();

    await user.click(toggleBtn);
    expect(screen.getByText(/timestamp: 2026-10-15/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ocultar detalles/i })).toBeInTheDocument();
  });

  it('supports severity variants (warning, info, primary, gray)', () => {
    const { container } = render(
      <ErrorState title="Acceso denegado" severity="warning" />
    );
    const wrapper = container.querySelector('.error-icon-wrapper');
    expect(wrapper).toHaveClass('warning');
  });

  it('supports size and container variants', () => {
    const { container: compactContainer } = render(
      <ErrorState title="Compacto" size="compact" variant="compact" />
    );
    expect(compactContainer.querySelector('.error-state')).toHaveClass(
      'compact',
      'error-state-compact'
    );

    const { container: cardContainer } = render(
      <ErrorState title="Inside card" variant="inside-card" />
    );
    expect(cardContainer.querySelector('.error-state')).toHaveClass(
      'inside-card',
      'error-state-inside-card'
    );
  });

  it('renders custom headingLevel', () => {
    render(<ErrorState title="Título H2" headingLevel="h2" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Título H2');
  });

  it('passes vitest-axe accessibility test with 0 violations', async () => {
    const { container } = render(
      <ErrorState
        title="Error al cargar datos"
        code="ERR_500"
        description="Ocurrió un problema de conexión con el servidor. Intente nuevamente."
        action={<Button variant="primary">Reintentar</Button>}
        secondaryAction={<Button variant="outline">Volver al inicio</Button>}
        details="Detalle técnico de error para pruebas"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

