import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption
} from './Table';
import { Badge } from '../badge';

const meta: Meta<typeof Table> = {
  title: 'Data/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleUsers = [
  { name: 'Ana Martínez', status: 'Activo', email: 'ana.martinez@empresa.com' },
  { name: 'Carlos Gómez', status: 'Pendiente', email: 'carlos.gomez@empresa.com' },
  { name: 'Elena Rostrán', status: 'Activo', email: 'elena.rostran@empresa.com' },
  { name: 'David Blandón', status: 'Inactivo', email: 'david.blandon@empresa.com' }
];

export const Default: Story = {
  render: () => (
    <div className="w-[600px] rounded-alcspower-md border border-alcspower-border p-4 bg-alcspower-surface">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleUsers.map((user) => (
            <TableRow key={user.email}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.status === 'Activo'
                      ? 'success'
                      : user.status === 'Pendiente'
                      ? 'warning'
                      : 'secondary'
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
};

export const WithFooter: Story = {
  render: () => (
    <div className="w-[600px] rounded-alcspower-md border border-alcspower-border p-4 bg-alcspower-surface">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Concepto</TableHead>
            <TableHead className="text-right">Cantidad</TableHead>
            <TableHead className="text-right">Monto (NIO)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Tasa de trámite de registro</TableCell>
            <TableCell className="text-right">2</TableCell>
            <TableCell className="text-right">C$ 1,500.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Inspección técnica fitosanitaria</TableCell>
            <TableCell className="text-right">1</TableCell>
            <TableCell className="text-right">C$ 2,200.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Emisión de certificado</TableCell>
            <TableCell className="text-right">3</TableCell>
            <TableCell className="text-right">C$ 900.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right font-bold">C$ 4,600.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
};

export const WithCaption: Story = {
  render: () => (
    <div className="w-[600px] rounded-alcspower-md border border-alcspower-border p-4 bg-alcspower-surface">
      <Table>
        <TableCaption>Listado de solicitudes procesadas durante el período actual.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleUsers.slice(0, 3).map((user) => (
            <TableRow key={user.email}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>
                <Badge
                  variant={user.status === 'Activo' ? 'success' : 'warning'}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
};

export const Responsive: Story = {
  render: () => (
    <div className="w-[500px] rounded-alcspower-md border border-alcspower-border p-4 bg-alcspower-surface">
      <Table responsive>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Expediente</TableHead>
            <TableHead className="whitespace-nowrap">Solicitante</TableHead>
            <TableHead className="whitespace-nowrap">Tipo de Trámite</TableHead>
            <TableHead className="whitespace-nowrap">Departamento</TableHead>
            <TableHead className="whitespace-nowrap">Fecha de Ingreso</TableHead>
            <TableHead className="whitespace-nowrap">Estado</TableHead>
            <TableHead className="whitespace-nowrap">Responsable</TableHead>
            <TableHead className="whitespace-nowrap text-right">Arancel</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">EXP-2026-001</TableCell>
            <TableCell className="whitespace-nowrap">Agroindustrias del Norte S.A.</TableCell>
            <TableCell className="whitespace-nowrap">Registro de Marca</TableCell>
            <TableCell className="whitespace-nowrap">Propiedad Intelectual</TableCell>
            <TableCell className="whitespace-nowrap">12/01/2026</TableCell>
            <TableCell className="whitespace-nowrap"><Badge variant="success">Aprobado</Badge></TableCell>
            <TableCell className="whitespace-nowrap">Lic. Ana Martínez</TableCell>
            <TableCell className="whitespace-nowrap text-right">C$ 1,200.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">EXP-2026-002</TableCell>
            <TableCell className="whitespace-nowrap">Comercializadora Central</TableCell>
            <TableCell className="whitespace-nowrap">Licencia de Exportación</TableCell>
            <TableCell className="whitespace-nowrap">Comercio Exterior</TableCell>
            <TableCell className="whitespace-nowrap">15/01/2026</TableCell>
            <TableCell className="whitespace-nowrap"><Badge variant="warning">En Revisión</Badge></TableCell>
            <TableCell className="whitespace-nowrap">Ing. Carlos Gómez</TableCell>
            <TableCell className="whitespace-nowrap text-right">C$ 2,500.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="whitespace-nowrap font-medium">EXP-2026-003</TableCell>
            <TableCell className="whitespace-nowrap">Distribuidora del Pacífico</TableCell>
            <TableCell className="whitespace-nowrap">Certificado de Origen</TableCell>
            <TableCell className="whitespace-nowrap">Comercio Exterior</TableCell>
            <TableCell className="whitespace-nowrap">18/01/2026</TableCell>
            <TableCell className="whitespace-nowrap"><Badge variant="success">Aprobado</Badge></TableCell>
            <TableCell className="whitespace-nowrap">Lic. Elena Rostrán</TableCell>
            <TableCell className="whitespace-nowrap text-right">C$ 800.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
};

export const DarkMode: Story = {
  render: () => (
    <div className="w-[600px] rounded-alcspower-md border border-alcspower-border p-4 bg-alcspower-surface">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleUsers.map((user) => (
            <TableRow key={user.email}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.status === 'Activo'
                      ? 'success'
                      : user.status === 'Pendiente'
                      ? 'warning'
                      : 'secondary'
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
};
