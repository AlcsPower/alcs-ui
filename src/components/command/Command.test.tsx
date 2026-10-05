import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from './Command';

describe('Command Component', () => {
  it('renderiza la paleta de comandos con sus grupos e ítems', () => {
    render(
      <Command>
        <CommandInput placeholder="Buscar acción..." />
        <CommandList>
          <CommandEmpty>Sin resultados.</CommandEmpty>
          <CommandGroup heading="Sugerencias">
            <CommandItem>Calendario</CommandItem>
            <CommandItem>
              Buscar Trámites
              <CommandShortcut>⌘T</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    expect(screen.getByPlaceholderText('Buscar acción...')).toBeInTheDocument();
    expect(screen.getByText('Calendario')).toBeInTheDocument();
    expect(screen.getByText('Buscar Trámites')).toBeInTheDocument();
    expect(screen.getByText('⌘T')).toBeInTheDocument();
  });

  it('permite seleccionar un ítem al hacer clic', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <Command>
        <CommandInput placeholder="Buscar acción..." />
        <CommandList>
          <CommandGroup heading="Acciones">
            <CommandItem onSelect={handleSelect}>Nuevo Expediente</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    await user.click(screen.getByText('Nuevo Expediente'));
    expect(handleSelect).toHaveBeenCalled();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <Command>
        <CommandInput placeholder="Escriba un comando..." />
        <CommandList>
          <CommandGroup heading="Navegación">
            <CommandItem>Inicio</CommandItem>
            <CommandItem>Configuración</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
