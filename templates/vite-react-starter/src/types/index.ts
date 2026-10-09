export interface Tramite {
  id: string;
  codigo: string;
  titular: string;
  tipo: string;
  estado: 'aprobado' | 'en_revision' | 'observado' | 'rechazado';
  fechaIngreso: string;
  monto: string;
}

export type ViewType = 'dashboard' | 'expedientes';
