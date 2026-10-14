import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
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
} from './index';

describe('Timeline Component', () => {
  const sampleItems = [
    {
      title: 'Solicitud Recibida',
      description: 'Ingreso digital por portal corporativo',
      time: '09:00 AM',
      dateTime: '2026-10-12T09:00:00Z',
      status: 'success' as const,
    },
    {
      title: 'Revisión Técnica',
      description: 'Evaluación de requisitos técnicos',
      time: '11:30 AM',
      dateTime: '2026-10-12T11:30:00Z',
      status: 'primary' as const,
    },
    {
      title: 'Dictamen Final',
      description: 'Firma y aprobación pendiente',
      time: 'En espera',
      status: 'warning' as const,
    },
  ];

  it('renderiza correctamente el Timeline de forma data-driven con items prop', () => {
    render(<Timeline items={sampleItems} ariaLabel="Trazabilidad de la solicitud" />);

    expect(screen.getByRole('list', { name: 'Trazabilidad de la solicitud' })).toBeInTheDocument();
    expect(screen.getByText('Solicitud Recibida')).toBeInTheDocument();
    expect(screen.getByText('Revisión Técnica')).toBeInTheDocument();
    expect(screen.getByText('Dictamen Final')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('renderiza etiquetas semánticas time con atributo dateTime', () => {
    render(<Timeline items={sampleItems} />);

    const timeElements = screen.getAllByText(/AM|En espera/);
    expect(timeElements.length).toBeGreaterThan(0);
    const firstTime = screen.getByText('09:00 AM');
    expect(firstTime.tagName.toLowerCase()).toBe('time');
    expect(firstTime).toHaveAttribute('dateTime', '2026-10-12T09:00:00Z');
  });

  it('renderiza correctamente la composición declarativa de Timeline', () => {
    render(
      <Timeline>
        <TimelineItem status="success">
          <TimelineSeparator>
            <TimelineIndicator shape="circle" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <TimelineHeader>
              <TimelineTitle as="h3">Inicio de Actividad</TimelineTitle>
              <TimelineTime>Hace 1 hora</TimelineTime>
            </TimelineHeader>
            <TimelineDescription>Usuario inició sesión</TimelineDescription>
            <TimelineCard>Metadatos de sesión IP: 192.168.1.1</TimelineCard>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );

    expect(screen.getByRole('heading', { level: 3, name: 'Inicio de Actividad' })).toBeInTheDocument();
    expect(screen.getByText('Usuario inició sesión')).toBeInTheDocument();
    expect(screen.getByText(/Metadatos de sesión/)).toBeInTheDocument();
  });

  it('aplica correctamente las variantes de forma circle y squircle', () => {
    render(
      <Timeline shape="squircle">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineIndicator data-testid="ind-squircle" />
          </TimelineSeparator>
          <TimelineContent>
            <TimelineTitle>Squircle Item</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );

    const indicator = screen.getByTestId('ind-squircle');
    expect(indicator.className).toContain('rounded-xl');
  });

  it('soporta inversión de orden con reverse prop', () => {
    render(<Timeline items={sampleItems} reverse />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('Dictamen Final');
    expect(listItems[2]).toHaveTextContent('Solicitud Recibida');
  });

  it('no presenta violaciones de accesibilidad (axe-core)', async () => {
    const { container } = render(
      <Timeline items={sampleItems} ariaLabel="Auditoría de eventos" />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
