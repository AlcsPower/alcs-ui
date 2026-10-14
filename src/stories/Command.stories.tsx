import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from '../components/command';
import { Combobox } from '../components/combobox';
import { Button } from '../components/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/card';
import { Calendar, User, Settings, Calculator, FileText } from 'lucide-react';

const meta: Meta = {
  title: 'Comandos/Paleta y Selección',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const PaletaComandosIncrustada: StoryObj = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Búsqueda Rápida</CardTitle>
      </CardHeader>
      <CardContent>
        <Command className="rounded-lg border border-alcspower-border shadow-sm">
          <CommandInput placeholder="Escribe un comando o busca..." />
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup heading="Sugerencias">
              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendario de Trámites</span>
              </CommandItem>
              <CommandItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>Reportes de Exportación</span>
                <CommandShortcut>⌘R</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Calculator className="mr-2 h-4 w-4" />
                <span>Calculadora Arancelaria</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Configuración">
              <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil de Usuario</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Ajustes del Sistema</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CardContent>
    </Card>
  ),
};

export const DialogoComandosModal: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      };
      document.addEventListener('keydown', down);
      return () => document.removeEventListener('keydown', down);
    }, []);

    return (
      <div className="space-y-4">
        <p className="text-sm text-alcspower-muted-foreground">
          Presiona <kbd className="rounded bg-alcspower-surface-muted px-1.5 py-0.5 font-mono text-xs border">⌘K</kbd> o haz clic en el botón:
        </p>
        <Button onClick={() => setOpen(true)}>Abrir Paleta de Comandos</Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Escribe un comando o búsqueda..." />
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup heading="Acciones Principales">
              <CommandItem onSelect={() => setOpen(false)}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Nuevo Registro</span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Agendar Inspección</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    );
  },
};

const departamentos = [
  { value: 'managua', label: 'Managua', group: 'Pacífico' },
  { value: 'leon', label: 'León', group: 'Pacífico' },
  { value: 'chinandega', label: 'Chinandega', group: 'Pacífico' },
  { value: 'matagalpa', label: 'Matagalpa', group: 'Centro-Norte' },
  { value: 'jinotega', label: 'Jinotega', group: 'Centro-Norte' },
  { value: 'esteli', label: 'Estelí', group: 'Centro-Norte' },
  { value: 'bluefields', label: 'Bluefields (RACCS)', group: 'Caribe' },
  { value: 'bilwi', label: 'Puerto Cabezas (RACCN)', group: 'Caribe' },
];

export const SelectorCombobox: StoryObj = {
  render: () => {
    const [selected, setSelected] = useState<string | undefined>('managua');
    const [multiSelected, setMultiSelected] = useState<string[]>(['leon', 'esteli']);

    return (
      <div className="space-y-6 max-w-md">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Selección Simple con Grupos</label>
          <Combobox
            options={departamentos}
            value={selected}
            onChange={setSelected}
            placeholder="Selecciona departamento..."
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Selección Múltiple con Chips</label>
          <Combobox
            multiple={true}
            options={departamentos}
            value={multiSelected}
            onChange={setMultiSelected}
            placeholder="Selecciona múltiples departamentos..."
          />
        </div>
      </div>
    );
  },
};
