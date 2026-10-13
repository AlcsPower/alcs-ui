import type { Meta, StoryObj } from '@storybook/react';
import { TreeView, type TreeNode } from './TreeView';
import { Badge } from '../../data-display/badge';
import { Button } from '../../forms/button';
import { Download } from 'lucide-react';

const expedientesData: TreeNode[] = [
  {
    id: 'mific-central',
    label: 'Ministerio de Fomento, Industria y Comercio (MIFIC)',
    children: [
      {
        id: 'dir-comercio-exterior',
        label: 'Dirección General de Comercio Exterior',
        badge: 'Regulación',
        children: [
          {
            id: 'exp-cuotas-omc',
            label: 'Expediente Cuotas Arancelarias OMC 2026',
            badge: 'Prioritario',
            children: [
              { id: 'doc-resolucion-01', label: 'Resolución Ministerial 04-2026.pdf', badge: 'Firmado' },
              { id: 'doc-adjudicacion-azucar', label: 'Matriz de Adjudicación Cuota Azúcar.xlsx' },
              { id: 'doc-certificado-origen', label: 'Plantilla Certificado de Origen TLC.docx' },
            ],
          },
          {
            id: 'exp-salvaguardas',
            label: 'Investigación de Medidas de Salvaguarda Textil',
            children: [
              { id: 'doc-informe-tecnico', label: 'Informe Técnico de Daño a la Industria.pdf' },
              { id: 'doc-alegatos-partes', label: 'Alegatos de Partes Interesadas.pdf' },
            ],
          },
        ],
      },
      {
        id: 'dir-industria',
        label: 'Dirección General de Fomento Industrial',
        children: [
          {
            id: 'exp-zonas-francas',
            label: 'Régimen de Admisión Temporal y Zonas Francas',
            children: [
              { id: 'doc-inspeccion-planta', label: 'Acta de Inspección Técnica Fiscal.pdf' },
              { id: 'doc-solicitud-exoneracion', label: 'Solicitud Exoneración Arancelaria.pdf' },
            ],
          },
        ],
      },
      {
        id: 'dir-tecnologia',
        label: 'Dirección General de Tecnologías de la Información (DGTIC)',
        badge: 'Sistemas',
        children: [
          {
            id: 'seguridad-infra',
            label: 'Políticas de Seguridad y Auditoría Forense',
            children: [
              { id: 'sec-ldap-policy', label: 'Directiva de Autenticación Híbrida LDAP-AD.pdf' },
              { id: 'sec-backup-plan', label: 'Plan de Contingencia y Respaldos Inmutables.pdf' },
            ],
          },
          {
            id: 'repo-sistemas',
            label: 'Repositorio de Componentes UI y Microservicios',
            children: [
              { id: 'ui-lib-docs', label: 'Documentación Oficial @alcspower/ui.md' },
              { id: 'api-gateway-schema', label: 'OpenAPI 3.1 Gateway Especificación.yaml' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'normativas-nacionales',
    label: 'Gaceta Diario Oficial y Acuerdos Ministeriales',
    children: [
      { id: 'ley-marcas', label: 'Ley 380 - Ley de Marcas y Otros Signos Distintivos.pdf' },
      { id: 'ley-patentes', label: 'Ley 354 - Ley de Patentes de Invención.pdf' },
    ],
  },
  {
    id: 'manual-identidad',
    label: 'Manual de Identidad Visual y Normativa Gráfica Institucional.pdf',
    badge: 'v1.4',
  },
];

const meta: Meta<typeof TreeView> = {
  title: 'Navegación/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Escala métrica de tamaño del árbol',
    },
    showCheckboxes: {
      control: 'boolean',
      description: 'Habilita casillas de verificación para multi-selección',
    },
    cascadeCheckboxes: {
      control: 'boolean',
      description: 'Propagación automática de selección a nodos descendientes',
    },
    showGuideLines: {
      control: 'boolean',
      description: 'Líneas guía verticales conectando la jerarquía',
    },
    showDefaultIcons: {
      control: 'boolean',
      description: 'Muestra carpetas y documentos predeterminados',
    },
    expandOnClick: {
      control: 'boolean',
      description: 'Expande el nodo al hacer clic en cualquier parte de la fila',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeView>;

export const Default: Story = {
  args: {
    data: expedientesData,
    defaultExpandedIds: ['mific-central', 'dir-comercio-exterior', 'exp-cuotas-omc'],
    size: 'md',
    showGuideLines: true,
    showDefaultIcons: true,
  },
};

export const ConCheckboxes: Story = {
  args: {
    data: expedientesData,
    showCheckboxes: true,
    cascadeCheckboxes: true,
    defaultExpandedIds: ['mific-central', 'dir-comercio-exterior'],
    defaultSelectedIds: ['doc-resolucion-01'],
    size: 'md',
    showGuideLines: true,
  },
};

export const EscalasMetricas: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="p-4 rounded-2xl border border-alcspower-border bg-white dark:bg-slate-900 shadow-xs space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground">
          Compacto (sm — 28px)
        </div>
        <TreeView
          data={expedientesData}
          size="sm"
          defaultExpandedIds={['mific-central', 'dir-comercio-exterior']}
        />
      </div>

      <div className="p-4 rounded-2xl border border-alcspower-border bg-white dark:bg-slate-900 shadow-xs space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground">
          Estándar (md — 34px)
        </div>
        <TreeView
          data={expedientesData}
          size="md"
          defaultExpandedIds={['mific-central', 'dir-comercio-exterior']}
        />
      </div>

      <div className="p-4 rounded-2xl border border-alcspower-border bg-white dark:bg-slate-900 shadow-xs space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-alcspower-muted-foreground">
          Amplio (lg — 40px)
        </div>
        <TreeView
          data={expedientesData}
          size="lg"
          defaultExpandedIds={['mific-central', 'dir-comercio-exterior']}
        />
      </div>
    </div>
  ),
};

export const ConBarraDeHerramientas: Story = {
  args: {
    data: expedientesData,
    showToolbar: true,
    toolbarTitle: 'Archivo Central MIFIC',
    toolbarLayout: 'toggle',
    size: 'md',
    showGuideLines: true,
    showDefaultIcons: true,
  },
};

export const ConBarraDeHerramientasPar: Story = {
  args: {
    data: expedientesData,
    showToolbar: true,
    toolbarTitle: 'Gestión Documental Jerárquica',
    toolbarLayout: 'pair',
    size: 'md',
    showGuideLines: true,
    showDefaultIcons: true,
  },
};

export const ConAccionesYBadges: Story = {
  render: () => {
    const dataConAcciones: TreeNode[] = [
      {
        id: 'repo-expedientes',
        label: 'Expedientes de Comercio Exterior',
        children: [
          {
            id: 'doc-export-cafe',
            label: 'Certificado de Exportación Café Especial Oro.pdf',
            badge: <Badge variant="secondary" size="sm">Aprobado</Badge>,
            actions: (
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  title="Descargar"
                  aria-label="Descargar archivo"
                  className="h-6 w-6 rounded-md"
                >
                  <Download className="w-3.5 h-3.5" />
                </Button>
              </div>
            ),
          },
          {
            id: 'doc-auditoria-tabaco',
            label: 'Dictamen Fitosanitario Tabaco.xlsx',
            badge: <Badge variant="outline" size="sm">En Revisión</Badge>,
            actions: (
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  title="Descargar"
                  aria-label="Descargar archivo"
                  className="h-6 w-6 rounded-md"
                >
                  <Download className="w-3.5 h-3.5" />
                </Button>
              </div>
            ),
          },
        ],
      },
    ];

    return (
      <div className="max-w-md p-4 rounded-2xl border border-alcspower-border bg-white dark:bg-slate-900 shadow-xs">
        <TreeView
          data={dataConAcciones}
          defaultExpandedIds={['repo-expedientes']}
          size="md"
        />
      </div>
    );
  },
};

