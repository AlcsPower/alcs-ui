export interface RequestItem {
  id: string;
  codigo: string;
  titular: string;
  tipo: string;
  estado: 'aprobado' | 'en_revision' | 'observado' | 'rechazado';
  fechaIngreso: string;
  monto: string;
}

/** Alias para compatibilidad con código existente */
export type Tramite = RequestItem;

export type ViewType = 'dashboard' | 'records' | 'expedientes';
