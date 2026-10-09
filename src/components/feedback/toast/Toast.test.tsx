import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Toaster, ToastCard } from './Toaster';
import { toast } from './toast';

describe('Toaster and toast Component', () => {
  it('renders Toaster element properly', () => {
    const { container } = render(<Toaster />);
    expect(container).toBeInTheDocument();
  });

  it('triggers a toast message and displays it in the DOM', async () => {
    render(<Toaster />);

    act(() => {
      toast('Notificación de prueba');
    });

    const notification = await screen.findByText('Notificación de prueba');
    expect(notification).toBeInTheDocument();
  });

  it('triggers a success toast message', async () => {
    render(<Toaster />);

    act(() => {
      toast.success('Operación exitosa');
    });

    const notification = await screen.findByText('Operación exitosa');
    expect(notification).toBeInTheDocument();
  });

  it('triggers an error toast message', async () => {
    render(<Toaster />);

    act(() => {
      toast.error('Error al guardar datos');
    });

    const notification = await screen.findByText('Error al guardar datos');
    expect(notification).toBeInTheDocument();
  });

  it('does not have accessibility violations on Toaster (axe)', async () => {
    const { container } = render(<Toaster />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('ToastCard Component', () => {
  it('renders title, description and triggers actions', () => {
    const onAction = vi.fn();
    const onCancel = vi.fn();
    const onClose = vi.fn();

    render(
      <ToastCard
        variant="error"
        title="Error al guardar"
        description="No se pudo conectar con el servidor."
        action={{ label: 'Reintentar', onClick: onAction }}
        cancel={{ label: 'Descartar', onClick: onCancel }}
        onClose={onClose}
      />
    );

    expect(screen.getByText('Error al guardar')).toBeInTheDocument();
    expect(screen.getByText('No se pudo conectar con el servidor.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }));
    expect(onAction).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'Descartar' }));
    expect(onCancel).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar notificación' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not have accessibility violations on ToastCard (axe)', async () => {
    const { container } = render(
      <ToastCard
        variant="success"
        title="Operación exitosa"
        description="Los cambios se guardaron correctamente."
        showProgress
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
