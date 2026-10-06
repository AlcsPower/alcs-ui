import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  FileText,
  Calendar,
  Calculator,
  Shield,
  BarChart3,
  Package,
  Clock,
  User,
  Settings,
  Users,
  HelpCircle,
} from 'lucide-react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandDialog,
  CommandFooter,
} from './Command';
import { Button } from '../button';

const meta: Meta<typeof Command> = {
  title: 'Comandos y Selección/Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Command>;

export const Default: Story = {
  render: () => (
    <div className="w-[520px] max-w-full">
      <Command>
        <CommandInput placeholder="Buscar trámite, reporte o comando..." shortcut="⌘K" />
        <CommandList>
          <CommandEmpty hint="Intentá con otros términos de búsqueda">
            No se encontraron resultados
          </CommandEmpty>
          <CommandGroup heading="Trámites Frecuentes">
            <CommandItem
              icon={<FileText className="h-4 w-4" />}
              title="Nuevo Registro de Marca"
              description="Iniciar trámite de marca comercial"
              shortcut="⌘M"
            />
            <CommandItem
              icon={<Calendar className="h-4 w-4" />}
              title="Inspección Técnica Industrial"
              description="Agendar inspección de planta"
            />
            <CommandItem
              icon={<Calculator className="h-4 w-4" />}
              title="Cálculo Arancelario"
              description="Calcular impuestos de importación"
            />
            <CommandItem
              icon={<Shield className="h-4 w-4" />}
              title="Licencia de Importación"
              description="Gestionar permisos de ingreso"
              shortcut="⌘L"
            />
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Reportes">
            <CommandItem
              icon={<BarChart3 className="h-4 w-4" />}
              title="Reporte de Ventas"
              description="Generar consolidado mensual"
              shortcut="⌘R"
            />
            <CommandItem
              icon={<Package className="h-4 w-4" />}
              title="Inventario Actual"
              description="Ver existencias en tiempo real"
            />
            <CommandItem
              icon={<Clock className="h-4 w-4" />}
              title="Log de Auditoría"
              description="Historial de cambios del sistema"
            />
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Sistema">
            <CommandItem
              icon={<User className="h-4 w-4" />}
              title="Perfil de Funcionario"
              description="Ver y editar datos personales"
            />
            <CommandItem
              icon={<Settings className="h-4 w-4" />}
              title="Ajustes Generales"
              description="Configuración del sistema"
              shortcut="⌘S"
            />
            <CommandItem
              icon={<Users className="h-4 w-4" />}
              title="Gestión de Usuarios"
              description="Administrar accesos y roles"
              shortcut="⌘U"
            />
            <CommandItem
              icon={<HelpCircle className="h-4 w-4" />}
              title="Centro de Ayuda"
              description="Documentación y soporte técnico"
              shortcut="F1"
            />
          </CommandGroup>
        </CommandList>
        <CommandFooter />
      </Command>
    </div>
  ),
};

export const ModoModal: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex flex-col items-center gap-3">
        <Button onClick={() => setOpen(true)}>
          Abrir Paleta Modal (⌘K)
        </Button>
        <span className="text-xs text-alcspower-muted-foreground font-mono">
          O presioná Ctrl+K / ⌘K
        </span>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Buscar trámite, reporte o comando..." />
          <CommandList>
            <CommandEmpty>No se encontraron resultados</CommandEmpty>
            <CommandGroup heading="Trámites Frecuentes">
              <CommandItem
                icon={<FileText className="h-4 w-4" />}
                title="Nuevo Registro de Marca"
                description="Iniciar trámite de marca comercial"
                shortcut="⌘M"
                onSelect={() => setOpen(false)}
              />
              <CommandItem
                icon={<Calendar className="h-4 w-4" />}
                title="Inspección Técnica Industrial"
                description="Agendar inspección de planta"
                onSelect={() => setOpen(false)}
              />
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Sistema">
              <CommandItem
                icon={<Settings className="h-4 w-4" />}
                title="Ajustes Generales"
                description="Configuración del sistema"
                shortcut="⌘S"
                onSelect={() => setOpen(false)}
              />
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    );
  },
};
