import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  StatusBadge,
  Button,
} from '@alcspower/ui';
import { Search, Eye, Filter } from 'lucide-react';
import { Tramite } from '../types';
import { NuevoTramiteModal } from './NuevoTramiteModal';

const TRAMITES_INICIALES: Tramite[] = [
  {
    id: 'TR-101',
    codigo: 'EXP-2026-0891',
    titular: 'Cafés Especiales de Las Segovias S.A.',
    tipo: 'Certificado de Origen',
    estado: 'aprobado',
    fechaIngreso: '08/10/2026',
    monto: '$120.00',
  },
  {
    id: 'TR-102',
    codigo: 'EXP-2026-0888',
    titular: 'Industrias Lácteas del Norte',
    tipo: 'Licencia Sanitaria',
    estado: 'en_revision',
    fechaIngreso: '08/10/2026',
    monto: '$250.00',
  },
  {
    id: 'TR-103',
    codigo: 'EXP-2026-0875',
    titular: 'Comercializadora Textil Moderna',
    tipo: 'Registro de Marca',
    estado: 'observado',
    fechaIngreso: '07/10/2026',
    monto: '$150.00',
  },
  {
    id: 'TR-104',
    codigo: 'EXP-2026-0869',
    titular: 'Importadora y Distribuidora Solís',
    tipo: 'Homologación Técnica',
    estado: 'aprobado',
    fechaIngreso: '06/10/2026',
    monto: '$320.00',
  },
  {
    id: 'TR-105',
    codigo: 'EXP-2026-0854',
    titular: 'Laboratorios Farmacéuticos Unidos',
    tipo: 'Licencia Sanitaria',
    estado: 'rechazado',
    fechaIngreso: '05/10/2026',
    monto: '$250.00',
  },
];

export function ExpedientesView() {
  const [tramites, setTramites] = useState<Tramite[]>(TRAMITES_INICIALES);
  const [filtro, setFiltro] = useState('');

  const tramitesFiltrados = tramites.filter(
    (t) =>
      t.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
      t.titular.toLowerCase().includes(filtro.toLowerCase()) ||
      t.tipo.toLowerCase().includes(filtro.toLowerCase())
  );

  const getStatusBadgeVariant = (estado: Tramite['estado']) => {
    switch (estado) {
      case 'aprobado':
        return { status: 'success' as const, label: 'Aprobado' };
      case 'en_revision':
        return { status: 'processing' as const, label: 'En Revisión' };
      case 'observado':
        return { status: 'warning' as const, label: 'Observado' };
      case 'rechazado':
        return { status: 'error' as const, label: 'Rechazado' };
    }
  };

  const handleNuevoTramite = (nuevo: Tramite) => {
    setTramites((prev) => [nuevo, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Bandeja Oficial de Expedientes
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Gestión y seguimiento de solicitudes de registros, licencias y certificaciones.
          </p>
        </div>
        <NuevoTramiteModal onTramiteCreado={handleNuevoTramite} />
      </div>

      <Card className="shadow-2xs">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Listado de Solicitudes</CardTitle>
              <CardDescription>
                Mostrando {tramitesFiltrados.length} de {tramites.length} expedientes registrados.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar por código, titular o tipo..."
                  className="pl-9"
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" aria-label="Filtrar">
                <Filter className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Código Folio</th>
                  <th className="px-6 py-3.5">Titular / Empresa</th>
                  <th className="px-6 py-3.5">Tipo de Trámite</th>
                  <th className="px-6 py-3.5">Fecha</th>
                  <th className="px-6 py-3.5">Estado</th>
                  <th className="px-6 py-3.5 text-right">Arancel</th>
                  <th className="px-6 py-3.5 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {tramitesFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      No se encontraron expedientes que coincidan con la búsqueda.
                    </td>
                  </tr>
                ) : (
                  tramitesFiltrados.map((item) => {
                    const badgeInfo = getStatusBadgeVariant(item.estado);
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-6 py-4 font-mono font-semibold text-xs text-primary">
                          {item.codigo}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                          {item.titular}
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                          {item.tipo}
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-xs">
                          {item.fechaIngreso}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={badgeInfo.status} size="sm">
                            {badgeInfo.label}
                          </StatusBadge>
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-slate-200">
                          {item.monto}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                            aria-label={`Ver detalle de ${item.codigo}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
