import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Progress,
  StatusBadge,
  Button,
} from '@alcspower/ui';
import {
  FileCheck2,
  Clock,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  Download,
} from 'lucide-react';

export function DashboardView() {
  const kpis = [
    {
      title: 'Expedientes Resueltos',
      value: '2,845',
      trend: '+12.4%',
      trendUp: true,
      icon: FileCheck2,
      description: 'En el mes actual',
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400',
    },
    {
      title: 'Trámites en Tránsito',
      value: '412',
      trend: '+4.2%',
      trendUp: true,
      icon: Clock,
      description: 'Promedio resolución: 4 días',
      color: 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 dark:text-sky-400',
    },
    {
      title: 'Observaciones Técnicas',
      value: '18',
      trend: '-8.1%',
      trendUp: false,
      icon: AlertTriangle,
      description: 'Subsanación en curso',
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400',
    },
    {
      title: 'Eficiencia Operativa',
      value: '96.2%',
      trend: '+1.5%',
      trendUp: true,
      icon: TrendingUp,
      description: 'Meta mensual: 95%',
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400',
    },
  ];

  const actividades = [
    {
      codigo: 'EXP-2026-0891',
      accion: 'Firma digital de resolución emitida',
      usuario: 'Lic. Claudia Morales',
      tiempo: 'Hace 15 min',
      estado: 'success' as const,
    },
    {
      codigo: 'EXP-2026-0888',
      accion: 'Dictamen técnico preliminar aprobado',
      usuario: 'Ing. Roberto Gómez',
      tiempo: 'Hace 42 min',
      estado: 'processing' as const,
    },
    {
      codigo: 'EXP-2026-0875',
      accion: 'Notificación de subsanación de documentos',
      usuario: 'Mesa de Entradas',
      tiempo: 'Hace 2 horas',
      estado: 'warning' as const,
    },
    {
      codigo: 'EXP-2026-0869',
      accion: 'Expediente registrado en ventanilla única',
      usuario: 'Atención al Usuario',
      tiempo: 'Hace 3 horas',
      estado: 'default' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Encabezado con Botón de Exportación */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Tablero de Control Ministerial
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monitoreo en tiempo real de trámites, tiempos de respuesta e indicadores de servicio.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Descargar Reporte PDF
          </Button>
        </div>
      </div>

      {/* Tarjetas de Métricas (KPIs) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className="shadow-2xs hover:shadow-xs transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {kpi.title}
                  </span>
                  <div className={`p-2 rounded-xl ${kpi.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {kpi.value}
                  </p>
                  <span
                    className={`inline-flex items-center text-xs font-semibold ${
                      kpi.trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'
                    }`}
                  >
                    {kpi.trend}
                    <ArrowUpRight className="h-3 w-3 ml-0.5" />
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {kpi.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Grilla Secundaria: Cumplimiento de Metas y Actividad Reciente */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Avance por Dirección */}
        <Card className="lg:col-span-1 shadow-2xs">
          <CardHeader>
            <CardTitle>Rendimiento por Dirección</CardTitle>
            <CardDescription>Cumplimiento de metas de despacho.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-700 dark:text-slate-300">Registro de Marcas</span>
                <span className="text-slate-500">88%</span>
              </div>
              <Progress value={88} variant="primary" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-700 dark:text-slate-300">Comercio Exterior</span>
                <span className="text-slate-500">74%</span>
              </div>
              <Progress value={74} variant="primary" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-700 dark:text-slate-300">Normas Técnicas (NTON)</span>
                <span className="text-slate-500">92%</span>
              </div>
              <Progress value={92} variant="success" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-700 dark:text-slate-300">Ventanilla Única</span>
                <span className="text-slate-500">62%</span>
              </div>
              <Progress value={62} variant="warning" />
            </div>
          </CardContent>
        </Card>

        {/* Trazabilidad de Actividad Reciente */}
        <Card className="lg:col-span-2 shadow-2xs">
          <CardHeader>
            <CardTitle>Trazabilidad Reciente</CardTitle>
            <CardDescription>Últimos movimientos registrados en el sistema.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {actividades.map((act, idx) => (
                <div key={idx} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-primary">
                        {act.codigo}
                      </span>
                      <StatusBadge status={act.estado} size="sm">
                        {act.estado === 'success' ? 'Completado' : act.estado === 'processing' ? 'En Proceso' : act.estado === 'warning' ? 'Observado' : 'Registrado'}
                      </StatusBadge>
                    </div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {act.accion}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Por {act.usuario}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400">
                    {act.tiempo}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
