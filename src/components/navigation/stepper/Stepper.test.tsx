import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import {
  Stepper,
  Step,
  StepIndicator,
  StepTitle,
  StepDescription,
  StepSeparator,
  StepContent,
} from './index';

describe('Stepper Component', () => {
  const sampleSteps = [
    { title: 'Datos Generales', description: 'Información básica del solicitante' },
    { title: 'Documentación', description: 'Carga de archivos adjuntos' },
    { title: 'Confirmación', description: 'Revisión final y firma' },
  ];

  it('renderiza correctamente el Stepper declarativo con steps prop', () => {
    render(<Stepper activeStep={1} steps={sampleSteps} />);

    expect(screen.getByRole('navigation', { name: 'Progreso del asistente' })).toBeInTheDocument();
    expect(screen.getByText('Datos Generales')).toBeInTheDocument();
    expect(screen.getByText('Documentación')).toBeInTheDocument();
    expect(screen.getByText('Confirmación')).toBeInTheDocument();
  });

  it('marca correctamente el paso activo con aria-current="step"', () => {
    render(<Stepper activeStep={1} steps={sampleSteps} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);

    // Paso 0: completado (no debe ser aria-current)
    expect(listItems[0]).not.toHaveAttribute('aria-current');
    // Paso 1: activo (debe ser aria-current="step")
    expect(listItems[1]).toHaveAttribute('aria-current', 'step');
    // Paso 2: pendiente
    expect(listItems[2]).not.toHaveAttribute('aria-current');
  });

  it('permite navegación interactiva por clic y teclado cuando clickable es true', () => {
    const handleStepClick = vi.fn();
    render(
      <Stepper
        activeStep={1}
        clickable
        onStepClick={handleStepClick}
        steps={sampleSteps}
      />
    );

    const step0Button = screen.getAllByRole('button')[0];
    if (!step0Button) throw new Error('Botón no encontrado');

    fireEvent.click(step0Button);
    expect(handleStepClick).toHaveBeenCalledWith(0);

    fireEvent.keyDown(step0Button, { key: 'Enter', code: 'Enter' });
    expect(handleStepClick).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(step0Button, { key: ' ', code: 'Space' });
    expect(handleStepClick).toHaveBeenCalledTimes(3);
  });

  it('soporta composición con subcomponentes (Compound Components) y orientación vertical', () => {
    render(
      <Stepper activeStep={0} orientation="vertical">
        <Step step={0} state="active">
          <StepIndicator />
          <div className="flex flex-col">
            <StepTitle>Paso 1: Solicitud</StepTitle>
            <StepDescription>Completar formulario</StepDescription>
          </div>
        </Step>
        <StepContent>
          <div data-testid="step-content">Formulario desplegado</div>
        </StepContent>
        <StepSeparator />
        <Step step={1} state="pending">
          <StepIndicator />
          <StepTitle>Paso 2: Aprobación</StepTitle>
        </Step>
      </Stepper>
    );

    expect(screen.getByText('Paso 1: Solicitud')).toBeInTheDocument();
    expect(screen.getByTestId('step-content')).toBeInTheDocument();
    expect(screen.getByText('Paso 2: Aprobación')).toBeInTheDocument();
  });

  it('renderiza estado de error cuando state="error"', () => {
    render(
      <Stepper activeStep={1}>
        <Step step={0} state="completed">
          <StepIndicator />
          <StepTitle>Paso 1</StepTitle>
        </Step>
        <Step step={1} state="error">
          <StepIndicator />
          <StepTitle>Paso 2 con Error</StepTitle>
        </Step>
      </Stepper>
    );

    const stepItems = screen.getAllByRole('listitem');
    expect(stepItems[1]?.textContent).toContain('Paso 2 con Error');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <Stepper activeStep={1} steps={sampleSteps} clickable />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
