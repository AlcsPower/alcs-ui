import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import { Toaster } from './Toaster';
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

  it('does not have accessibility violations (axe)', async () => {
    const { container } = render(<Toaster />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
