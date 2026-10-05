import type { Meta, StoryObj } from '@storybook/react';
import { type ColumnDef } from '@tanstack/react-table';
import { DataTable } from './DataTable';
import { DataTableColumnHeader } from './DataTableColumnHeader';
import { StatusBadge } from '../status-badge';
import { ErrorState } from '../error-state';
import { Button } from '../button';
import { Download, Plus } from 'lucide-react';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Activo' | 'Pendiente' | 'Inactivo' | 'Suspendido';
  createdAt: string;
}

const sampleUsers: UserItem[] = [
  {
    id: 'USR-001',
    name: 'Ana Martínez',
    email: 'ana.martinez@mific.gob.ni',
    role: 'Administrador',
    status: 'Activo',
    createdAt: '15/01/2026',
  },
  {
    id: 'USR-002',
    name: 'Carlos Gómez',
    email: 'carlos.gomez@mific.gob.ni',
    role: 'Auditor',
    status: 'Pendiente',
    createdAt: '18/01/2026',
  },
  {
    id: 'USR-003',
    name: 'Elena Rostrán',
    email: 'elena.rostran@mific.gob.ni',
    role: 'Especialista',
    status: 'Activo',
    createdAt: '22/01/2026',
  },
  {
    id: 'USR-004',
    name: 'David Blandón',
    email: 'david.blandon@mific.gob.ni',
    role: 'Operador',
    status: 'Inactivo',
    createdAt: '03/02/2026',
  },
  {
    id: 'USR-005',
    name: 'Sofía Morales',
    email: 'sofia.morales@mific.gob.ni',
    role: 'Analista',
    status: 'Activo',
    createdAt: '10/02/2026',
  },
  {
    id: 'USR-006',
    name: 'Roberto Flores',
    email: 'roberto.flores@mific.gob.ni',
    role: 'Auditor',
    status: 'Suspendido',
    createdAt: '14/02/2026',
  },
  {
    id: 'USR-007',
    name: 'Lucía Méndez',
    email: 'lucia.mendez@mific.gob.ni',
    role: 'Especialista',
    status: 'Activo',
    createdAt: '20/02/2026',
  },
  {
    id: 'USR-008',
    name: 'Javier Castillo',
    email: 'javier.castillo@mific.gob.ni',
    role: 'Operador',
    status: 'Pendiente',
    createdAt: '25/02/2026',
  },
  {
    id: 'USR-009',
    name: 'Valeria Ríos',
    email: 'valeria.rios@mific.gob.ni',
    role: 'Analista',
    status: 'Activo',
    createdAt: '01/03/2026',
  },
  {
    id: 'USR-010',
    name: 'Gabriel Silva',
    email: 'gabriel.silva@mific.gob.ni',
    role: 'Especialista',
    status: 'Activo',
    createdAt: '05/03/2026',
  },
  {
    id: 'USR-011',
    name: 'Patricia Navarro',
    email: 'patricia.navarro@mific.gob.ni',
    role: 'Auditor',
    status: 'Inactivo',
    createdAt: '08/03/2026',
  },
  {
    id: 'USR-012',
    name: 'Fernando Vargas',
    email: 'fernando.vargas@mific.gob.ni',
    role: 'Operador',
    status: 'Activo',
    createdAt: '12/03/2026',
  },
];

const columns: ColumnDef<UserItem>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => (
      <span className="font-medium text-alcspower-foreground">
        {row.getValue('name')}
      </span>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rol" />
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as UserItem['status'];
      const statusMap = {
        Activo: 'success',
        Pendiente: 'warning',
        Inactivo: 'neutral',
        Suspendido: 'error',
      } as const;

      return (
        <StatusBadge status={statusMap[status] ?? 'neutral'} dot>
          {status}
        </StatusBadge>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Creación" />
    ),
  },
];

const meta: Meta<typeof DataTable<UserItem>> = {
  title: 'Data/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<UserItem>>;

/**
 * Tabla completa con todas las funcionalidades habilitadas:
 * búsqueda global, ordenación de columnas, paginación, selección múltiple y control de visibilidad.
 */
export const Default: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto">
      <DataTable
        data={sampleUsers}
        columns={columns}
        selectable
        toolbar={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </Button>
            <Button variant="primary" size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              <span>Nuevo Usuario</span>
            </Button>
          </div>
        }
      />
    </div>
  ),
};

/**
 * Versión básica de la tabla sin barra de herramientas ni selección de filas.
 */
export const Simple: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto">
      <DataTable
        data={sampleUsers.slice(0, 5)}
        columns={columns}
        showToolbar={false}
        selectable={false}
        pagination={false}
      />
    </div>
  ),
};

/**
 * Estado de carga con filas tipo skeleton animadas.
 */
export const Loading: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto">
      <DataTable
        data={[]}
        columns={columns}
        isLoading={true}
        loadingRowCount={5}
      />
    </div>
  ),
};

/**
 * Estado de error cuando la carga de datos falla.
 */
export const Error: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto">
      <DataTable
        data={[]}
        columns={columns}
        error={
          <ErrorState
            title="Error de carga"
            description="No se pudieron recuperar los registros del servidor. Intente nuevamente más tarde."
            action={<Button size="sm">Reintentar</Button>}
          />
        }
      />
    </div>
  ),
};

/**
 * Estado vacío cuando no existen registros.
 */
export const Empty: Story = {
  render: () => (
    <div className="w-full max-w-5xl mx-auto">
      <DataTable data={[]} columns={columns} />
    </div>
  ),
};

/**
 * Visualización en tema oscuro (Dark Mode).
 */
export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-alcspower-background p-6 rounded-lg">
      <div className="w-full max-w-5xl mx-auto">
        <DataTable data={sampleUsers} columns={columns} selectable />
      </div>
    </div>
  ),
};
