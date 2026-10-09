import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { CalendarEventList, CalendarSelectedDateCard, type CalendarEvent } from './CalendarEventList';

describe('CalendarEventList Component', () => {
  const sampleEvents: CalendarEvent[] = [
    {
      id: '1',
      time: '09:00 AM',
      title: 'Reunión de Planificación',
      desc: 'Revisión del sprint semanal y asignación de tareas.',
      type: 'primary',
    },
    {
      id: '2',
      time: '11:30 AM',
      title: 'Auditoría de Seguridad',
      desc: 'Revisión de certificados SSL y roles de usuario.',
      type: 'warning',
    },
    {
      id: '3',
      time: '02:00 PM',
      title: 'Lanzamiento de Release',
      desc: 'Despliegue a producción de la versión 1.0.0.',
      type: 'success',
    },
    {
      id: '4',
      time: '04:15 PM',
      title: 'Incidente Crítico',
      desc: 'Investigación de caída de servicio en pasarela.',
      type: 'danger',
    },
    {
      id: '5',
      time: '05:30 PM',
      title: 'Sincronización de Equipo',
      desc: 'Alineación de objetivos para el día siguiente.',
      type: 'info',
    },
  ];

  describe('1. Renderizado de títulos', () => {
    it('renderiza correctamente el título por defecto "EVENTOS DEL DÍA"', () => {
      render(<CalendarEventList events={sampleEvents} />);

      expect(screen.getByText('EVENTOS DEL DÍA')).toBeInTheDocument();
    });

    it('renderiza un título personalizado cuando se proporciona', () => {
      render(<CalendarEventList events={sampleEvents} title="AGENDA DE HOY" />);

      expect(screen.getByText('AGENDA DE HOY')).toBeInTheDocument();
      expect(screen.queryByText('EVENTOS DEL DÍA')).not.toBeInTheDocument();
    });
  });

  describe('2. Renderizado de la lista de eventos', () => {
    it('renderiza la lista de eventos con sus horarios, títulos y descripciones', () => {
      render(<CalendarEventList events={sampleEvents} />);

      // Verifica los horarios
      expect(screen.getByText('09:00 AM')).toBeInTheDocument();
      expect(screen.getByText('11:30 AM')).toBeInTheDocument();
      expect(screen.getByText('02:00 PM')).toBeInTheDocument();
      expect(screen.getByText('04:15 PM')).toBeInTheDocument();
      expect(screen.getByText('05:30 PM')).toBeInTheDocument();

      // Verifica los títulos
      expect(screen.getByText('Reunión de Planificación')).toBeInTheDocument();
      expect(screen.getByText('Auditoría de Seguridad')).toBeInTheDocument();
      expect(screen.getByText('Lanzamiento de Release')).toBeInTheDocument();
      expect(screen.getByText('Incidente Crítico')).toBeInTheDocument();
      expect(screen.getByText('Sincronización de Equipo')).toBeInTheDocument();

      // Verifica las descripciones
      expect(screen.getByText('Revisión del sprint semanal y asignación de tareas.')).toBeInTheDocument();
      expect(screen.getByText('Revisión de certificados SSL y roles de usuario.')).toBeInTheDocument();
      expect(screen.getByText('Despliegue a producción de la versión 1.0.0.')).toBeInTheDocument();
      expect(screen.getByText('Investigación de caída de servicio en pasarela.')).toBeInTheDocument();
      expect(screen.getByText('Alineación de objetivos para el día siguiente.')).toBeInTheDocument();
    });

    it('renderiza eventos sin descripción sin fallar', () => {
      const minimalEvents: CalendarEvent[] = [
        {
          id: 'min-1',
          time: '10:00 AM',
          title: 'Evento Simple',
        },
      ];

      render(<CalendarEventList events={minimalEvents} />);

      expect(screen.getByText('10:00 AM')).toBeInTheDocument();
      expect(screen.getByText('Evento Simple')).toBeInTheDocument();
    });
  });

  describe('3. Estilos y clases de borde según el tipo', () => {
    it('aplica las clases de bordes correspondientes a cada tipo de evento', () => {
      render(<CalendarEventList events={sampleEvents} />);

      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(5);

      // primary -> border-l-alcspower-primary
      expect(items[0]).toHaveClass('border-l-alcspower-primary');

      // warning -> border-l-amber-500
      expect(items[1]).toHaveClass('border-l-amber-500');

      // success -> border-l-emerald-500
      expect(items[2]).toHaveClass('border-l-emerald-500');

      // danger -> border-l-rose-500
      expect(items[3]).toHaveClass('border-l-rose-500');

      // info -> border-l-sky-500
      expect(items[4]).toHaveClass('border-l-sky-500');
    });

    it('aplica border-l-alcspower-primary por defecto si no se especifica el tipo', () => {
      const untypedEvents: CalendarEvent[] = [
        {
          id: 'default-type',
          time: '08:00 AM',
          title: 'Evento sin tipo',
        },
      ];

      render(<CalendarEventList events={untypedEvents} />);

      const item = screen.getByRole('listitem');
      expect(item).toHaveClass('border-l-alcspower-primary');
    });
  });

  describe('4. Estado vacío', () => {
    it('muestra el estado vacío por defecto "Sin eventos programados para este día" cuando la lista está vacía', () => {
      render(<CalendarEventList events={[]} />);

      expect(screen.getByText('Sin eventos programados para este día')).toBeInTheDocument();
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('muestra el estado vacío por defecto cuando la prop events es undefined', () => {
      render(<CalendarEventList />);

      expect(screen.getByText('Sin eventos programados para este día')).toBeInTheDocument();
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('muestra un mensaje personalizado cuando se pasa emptyMessage', () => {
      render(
        <CalendarEventList
          events={[]}
          emptyMessage="No se encontraron eventos para la fecha seleccionada"
        />
      );

      expect(screen.getByText('No se encontraron eventos para la fecha seleccionada')).toBeInTheDocument();
      expect(screen.queryByText('Sin eventos programados para este día')).not.toBeInTheDocument();
    });
  });

  describe('5. Tarjeta de fecha (date / showDateCard)', () => {
    it('renderiza la tarjeta de fecha si se pasa la prop date', () => {
      const testDate = new Date(2026, 4, 15); // 15 de mayo de 2026
      render(<CalendarEventList events={sampleEvents} date={testDate} />);

      expect(screen.getByText('FECHA SELECCIONADA')).toBeInTheDocument();
      expect(screen.getByText('15')).toBeInTheDocument();
      expect(screen.getByText('MAY')).toBeInTheDocument();
      expect(screen.getByText(/15 de mayo/i)).toBeInTheDocument();
      expect(screen.getByText(/2026 · 5 eventos/i)).toBeInTheDocument();
    });

    it('no renderiza la tarjeta de fecha si date es undefined', () => {
      render(<CalendarEventList events={sampleEvents} />);

      expect(screen.queryByText('FECHA SELECCIONADA')).not.toBeInTheDocument();
    });

    it('no renderiza la tarjeta de fecha si showDateCard={false}', () => {
      const testDate = new Date(2026, 4, 15);
      render(<CalendarEventList events={sampleEvents} date={testDate} showDateCard={false} />);

      expect(screen.queryByText('FECHA SELECCIONADA')).not.toBeInTheDocument();
    });

    it('permite renderizar CalendarSelectedDateCard de manera independiente', () => {
      const testDate = new Date(2026, 4, 15);
      render(<CalendarSelectedDateCard date={testDate} eventCount={3} />);

      expect(screen.getByText('FECHA SELECCIONADA')).toBeInTheDocument();
      expect(screen.getByText('15')).toBeInTheDocument();
      expect(screen.getByText('MAY')).toBeInTheDocument();
      expect(screen.getByText(/3 eventos/i)).toBeInTheDocument();
    });
  });

  describe('6. Eventos interactivos y onEventClick', () => {
    it('dispara onEventClick cuando se hace clic en un evento interactivo', async () => {
      const user = userEvent.setup();
      const handleEventClick = vi.fn();

      render(<CalendarEventList events={sampleEvents} onEventClick={handleEventClick} />);

      const firstItem = screen.getByText('Reunión de Planificación');
      await user.click(firstItem);

      expect(handleEventClick).toHaveBeenCalledTimes(1);
      expect(handleEventClick).toHaveBeenCalledWith(sampleEvents[0]);
    });

    it('dispara la función onClick individual del evento', async () => {
      const user = userEvent.setup();
      const handleSingleClick = vi.fn();

      const eventsWithCallback: CalendarEvent[] = [
        {
          id: 'custom-click',
          time: '10:00 AM',
          title: 'Evento con handler propio',
          onClick: handleSingleClick,
        },
      ];

      render(<CalendarEventList events={eventsWithCallback} />);

      const item = screen.getByText('Evento con handler propio');
      await user.click(item);

      expect(handleSingleClick).toHaveBeenCalledTimes(1);
      expect(handleSingleClick).toHaveBeenCalledWith(eventsWithCallback[0]);
    });

    it('aplica estilos interactivos (cursor-pointer) solo cuando hay un manejador de clic', () => {
      const handleEventClick = vi.fn();

      const { rerender } = render(<CalendarEventList events={sampleEvents} />);
      let firstItem = screen.getAllByRole('listitem')[0];
      expect(firstItem).not.toHaveClass('cursor-pointer');

      rerender(<CalendarEventList events={sampleEvents} onEventClick={handleEventClick} />);
      firstItem = screen.getAllByRole('listitem')[0];
      expect(firstItem).toHaveClass('cursor-pointer');
    });
  });

  describe('7. Accesibilidad (axe)', () => {
    it('cumple con la prueba de accesibilidad con lista de eventos y tarjeta de fecha', async () => {
      const testDate = new Date(2026, 4, 15);
      const { container } = render(
        <CalendarEventList
          events={sampleEvents}
          date={testDate}
          onEventClick={vi.fn()}
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('cumple con la prueba de accesibilidad en estado vacío', async () => {
      const { container } = render(<CalendarEventList events={[]} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
