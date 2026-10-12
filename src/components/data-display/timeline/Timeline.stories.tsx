import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineIndicator,
  TimelineConnector,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineTime,
  TimelineDescription,
  TimelineCard,
} from './Timeline';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  User,
  ShieldCheck,
  Send,
  Download,
} from 'lucide-react';
import { Badge } from '../badge';

const meta: Meta<typeof Timeline> = {
  title: 'Data Display/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Orientación del flujo de eventos',
    },
    density: {
      control: 'radio',
      options: ['compact', 'normal', 'comfortable'],
      description: 'Espaciado vertical entre eventos',
    },
    shape: {
      control: 'radio',
      options: ['circle', 'squircle'],
      description: 'Silueta de los indicadores',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Escala visual de los indicadores',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

const sampleEvents = [
  {
    title: 'Registro de Solicitud',
    description: 'El solicitante ingresó el trámite vía ventanilla virtual con código EXP-2026-904.',
    time: '08:15 AM',
    dateTime: '2026-10-12T08:15:00Z',
    status: 'success' as const,
    icon: <CheckCircle2 className="h-4 w-4" />,
    badge: <Badge variant="secondary">Ingresado</Badge>,
  },
  {
    title: 'Asignación de Inspector Técnico',
    description: 'Expediente remitido a la Dirección General de Normas y Metrología.',
    time: '10:30 AM',
    dateTime: '2026-10-12T10:30:00Z',
    status: 'primary' as const,
    icon: <User className="h-4 w-4" />,
    badge: <Badge variant="default">En Proceso</Badge>,
  },
  {
    title: 'Inspección en Sitio Requerida',
    description: 'Se programó visita técnica para verificación de conformidad de pesos y medidas.',
    time: '02:00 PM',
    dateTime: '2026-10-12T14:00:00Z',
    status: 'warning' as const,
    icon: <AlertTriangle className="h-4 w-4" />,
    badge: <Badge variant="secondary">Pendiente</Badge>,
    card: (
      <div className="flex items-center justify-between">
        <span>Acta preliminar de inspección adjunta</span>
        <button
          type="button"
          className="flex items-center gap-1 font-semibold text-alcspower-primary hover:underline cursor-pointer"
        >
          <Download className="h-3.5 w-3.5" /> Descargar PDF
        </button>
      </div>
    ),
  },
  {
    title: 'Dictamen y Emisión de Resolución',
    description: 'Conclusión formal del trámite administrativo.',
    time: 'Por definir',
    status: 'neutral' as const,
    icon: <Clock className="h-4 w-4" />,
  },
];

export const Default: Story = {
  render: (args) => (
    <div className="max-w-2xl">
      <Timeline {...args} items={sampleEvents} />
    </div>
  ),
  args: {
    shape: 'circle',
    size: 'md',
    density: 'normal',
    orientation: 'vertical',
  },
};

export const SquircleShape: Story = {
  render: (args) => (
    <div className="max-w-2xl">
      <Timeline {...args} items={sampleEvents} />
    </div>
  ),
  args: {
    shape: 'squircle',
    size: 'md',
    density: 'normal',
    orientation: 'vertical',
  },
};

export const DeclarativeComposition: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Timeline>
        <TimelineItem status="success">
          <TimelineSeparator>
            <TimelineIndicator shape="circle" icon={<CheckCircle2 className="h-4 w-4" />} />
            <TimelineConnector status="success" />
          </TimelineSeparator>
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle>Recepción de Documentos</TimelineTitle>
              <TimelineTime>08:00 AM</TimelineTime>
            </TimelineHeader>
            <TimelineDescription>
              Todos los requisitos legales fueron validados conforme ley ministerial.
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem status="primary">
          <TimelineSeparator>
            <TimelineIndicator shape="circle" icon={<FileText className="h-4 w-4" />} />
            <TimelineConnector status="primary" />
          </TimelineSeparator>
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle>Dictamen Jurídico</TimelineTitle>
              <TimelineTime>11:45 AM</TimelineTime>
            </TimelineHeader>
            <TimelineDescription>
              Dictamen favorable emitido por la Asesoría Legal Ministerial.
            </TimelineDescription>
            <TimelineCard>
              <p className="font-semibold text-alcspower-foreground">Dictamen N° DJ-2026-44</p>
              <p className="text-alcspower-muted-foreground mt-0.5">
                Cumplimiento pleno del marco regulatorio aplicable.
              </p>
            </TimelineCard>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem status="neutral" isLast>
          <TimelineSeparator>
            <TimelineIndicator shape="circle" icon={<ShieldCheck className="h-4 w-4" />} />
          </TimelineSeparator>
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle>Firma Ministerial</TimelineTitle>
              <TimelineTime>Pendiente</TimelineTime>
            </TimelineHeader>
            <TimelineDescription>
              En espera de rúbrica digital y sello oficial.
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  ),
};
