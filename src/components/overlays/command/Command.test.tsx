import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { FileText, Calendar } from 'lucide-react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandDialog,
  CommandFooter,
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

  it('renderiza items estructurados con icon, title, description y shortcut', () => {
    render(
      <Command>
        <CommandInput placeholder="Buscar..." />
        <CommandList>
          <CommandGroup heading="Trámites">
            <CommandItem
              icon={<FileText data-testid="doc-icon" />}
              title="Nuevo Registro de Marca"
              description="Iniciar trámite de marca comercial"
              shortcut="⌘M"
            />
            <CommandItem
              icon={<Calendar data-testid="cal-icon" />}
              title="Inspección Técnica Industrial"
              description="Agendar inspección de planta"
            />
          </CommandGroup>
        </CommandList>
      </Command>
    );

    expect(screen.getByText('Nuevo Registro de Marca')).toBeInTheDocument();
    expect(screen.getByText('Iniciar trámite de marca comercial')).toBeInTheDocument();
    expect(screen.getByText('⌘M')).toBeInTheDocument();
    expect(screen.getByTestId('doc-icon')).toBeInTheDocument();

    expect(screen.getByText('Inspección Técnica Industrial')).toBeInTheDocument();
    expect(screen.getByText('Agendar inspección de planta')).toBeInTheDocument();
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

  it('renderiza estado vacío con mensaje y hint personalizado', () => {
    render(
      <Command>
        <CommandInput placeholder="Buscar..." />
        <CommandList>
          <CommandEmpty hint="Probá buscando marcas o patentes">
            Sin resultados encontrados
          </CommandEmpty>
        </CommandList>
      </Command>
    );

    expect(screen.getByText('Sin resultados encontrados')).toBeInTheDocument();
    expect(screen.getByText('Probá buscando marcas o patentes')).toBeInTheDocument();
  });

  it('renderiza CommandFooter con atajos de navegación', () => {
    render(
      <div>
        <CommandFooter />
      </div>
    );

    expect(screen.getByText('navegar')).toBeInTheDocument();
    expect(screen.getByText('seleccionar')).toBeInTheDocument();
    expect(screen.getByText('cerrar')).toBeInTheDocument();
    expect(screen.getByText('Motor cmdk · fuzzy filter')).toBeInTheDocument();
  });

  it('renderiza CommandDialog modal cuando está abierto', () => {
    render(
      <CommandDialog open>
        <CommandInput placeholder="Buscar acción..." />
        <CommandList>
          <CommandItem>Trámite Rápido</CommandItem>
        </CommandList>
      </CommandDialog>
    );

    expect(screen.getByPlaceholderText('Buscar acción...')).toBeInTheDocument();
    expect(screen.getByText('Trámite Rápido')).toBeInTheDocument();
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
