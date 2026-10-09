import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut
} from './ContextMenu';

describe('ContextMenu Component', () => {
  it('abre el menú contextual al disparar el evento contextmenu (clic derecho)', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="target-area">
          Área con Clic Derecho
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Copiar</ContextMenuItem>
          <ContextMenuItem>Pegar</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    expect(screen.queryByText('Copiar')).not.toBeInTheDocument();

    const target = screen.getByTestId('target-area');
    fireEvent.contextMenu(target);

    expect(screen.getByText('Copiar')).toBeInTheDocument();
    expect(screen.getByText('Pegar')).toBeInTheDocument();
  });

  it('ejecuta la acción del ítem y cierra el menú', async () => {
    const handleAction = vi.fn();
    const user = userEvent.setup();

    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="trigger-click">
          Zona de prueba
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={handleAction}>Duplicar</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    fireEvent.contextMenu(screen.getByTestId('trigger-click'));

    const item = screen.getByText('Duplicar');
    await user.click(item);

    expect(handleAction).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Duplicar')).not.toBeInTheDocument();
  });

  it('aplica estilo destructivo en ContextMenuItem con destructive={true}', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="trigger-dest">
          Fila
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem destructive>Eliminar Archivo</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    fireEvent.contextMenu(screen.getByTestId('trigger-dest'));

    const item = screen.getByText('Eliminar Archivo');
    expect(item).toHaveClass('text-alcspower-destructive');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="trigger-a11y">
          Objetivo Accesible
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            Ver Detalles <ContextMenuShortcut>⌘D</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Descargar</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    fireEvent.contextMenu(screen.getByTestId('trigger-a11y'));

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
