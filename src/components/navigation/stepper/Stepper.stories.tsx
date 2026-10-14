import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  Stepper,
  Step,
  StepIndicator,
  StepTitle,
  StepDescription,
  StepSeparator,
  StepContent,
} from './Stepper';
import { Button } from '../../forms/button';
import { User, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

const meta: Meta<typeof Stepper> = {
  title: 'Navegación/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Disposición del flujo de pasos',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Escala visual de los indicadores',
    },
    activeStep: {
      control: 'number',
      description: 'Índice del paso activo actual (0-indexed)',
    },
    clickable: {
      control: 'boolean',
      description: 'Habilita interacción directa para saltar entre pasos',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const processSteps = [
  {
    title: 'Datos del Solicitante',
    description: 'Identificación y domicilio',
    icon: <User className="h-4 w-4" />,
  },
  {
    title: 'Documentos Adjuntos',
    description: 'Identificación y documentos de soporte',
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: 'Validación de Seguridad',
    description: 'Verificación de antecedentes',
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    title: 'Emisión y Firma',
    description: 'Resolución final',
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
];

export const Default: Story = {
  args: {
    activeStep: 1,
    steps: processSteps,
  },
};

export const InteractivoControlado: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);

    return (
      <div className="flex flex-col gap-8 max-w-3xl">
        <Stepper
          activeStep={currentStep}
          clickable
          onStepClick={setCurrentStep}
          steps={processSteps}
        />

        <div className="rounded-xl border border-alcspower-border bg-alcspower-surface p-6 shadow-2xs">
          <h4 className="text-base font-semibold text-alcspower-foreground">
            {processSteps[currentStep]?.title}
          </h4>
          <p className="mt-1 text-sm text-alcspower-muted-foreground">
            {processSteps[currentStep]?.description}
          </p>
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            >
              Anterior
            </Button>
            <Button
              variant="primary"
              disabled={currentStep === processSteps.length - 1}
              onClick={() =>
                setCurrentStep((prev) => Math.min(processSteps.length - 1, prev + 1))
              }
            >
              Siguiente Paso
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

export const VerticalConContenido: Story = {
  render: () => {
    return (
      <div className="max-w-md">
        <Stepper orientation="vertical" activeStep={1}>
          <Step step={0} state="completed">
            <StepIndicator />
            <div className="flex flex-col">
              <StepTitle>Recepción de Documentos</StepTitle>
              <StepDescription>Completado el 08/10/2026</StepDescription>
            </div>
          </Step>
          <StepSeparator completed />

          <Step step={1} state="active">
            <StepIndicator />
            <div className="flex flex-col">
              <StepTitle>Revisión Técnica</StepTitle>
              <StepDescription>En evaluación por el especialista</StepDescription>
            </div>
          </Step>
          <StepContent>
            <div className="rounded-lg bg-alcspower-surface-muted/60 p-4 border border-alcspower-border-subtle text-xs text-alcspower-muted-foreground">
              La solicitud se encuentra asignada al área de operaciones.
            </div>
          </StepContent>
          <StepSeparator />

          <Step step={2} state="pending">
            <StepIndicator />
            <div className="flex flex-col">
              <StepTitle>Resolución Corporativa</StepTitle>
              <StepDescription>Pendiente de aprobación</StepDescription>
            </div>
          </Step>
        </Stepper>
      </div>
    );
  },
};

export const EstadoError: Story = {
  render: () => {
    return (
      <Stepper activeStep={1}>
        <Step step={0} state="completed">
          <StepIndicator />
          <div className="flex flex-col">
            <StepTitle>Validación Inicial</StepTitle>
            <StepDescription>Aprobado</StepDescription>
          </div>
        </Step>
        <StepSeparator completed />

        <Step step={1} state="error">
          <StepIndicator />
          <div className="flex flex-col">
            <StepTitle>Inspección Legal</StepTitle>
            <StepDescription>Documento rechazado</StepDescription>
          </div>
        </Step>
        <StepSeparator />

        <Step step={2} state="pending">
          <StepIndicator />
          <div className="flex flex-col">
            <StepTitle>Firma Autorizada</StepTitle>
            <StepDescription>En espera</StepDescription>
          </div>
        </Step>
      </Stepper>
    );
  },
};
