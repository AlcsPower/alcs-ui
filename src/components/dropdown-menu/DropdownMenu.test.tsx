import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from './DropdownMenu';
import { Button } from '../button';

describe('DropdownMenu Component', () => {
  it('abre el menú y muestra opciones interactivas', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Opciones</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuItem disabled>Configuración Avanzada</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.queryByText('Perfil')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /opciones/i }));
    expect(screen.getByText('Mi Cuenta')).toBeInTheDocument();
    expect(screen.getByText('Perfil')).toBeInTheDocument();

    const disabledItem = screen.getByText(/configuración avanzada/i);
    expect(disabledItem).toHaveAttribute('data-disabled');
  });

  it('no presenta violaciones de accesibilidad cuando está abierto', async () => {
    const { container } = render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <Button>Menú</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Elemento 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
