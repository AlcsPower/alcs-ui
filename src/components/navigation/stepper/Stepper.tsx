import * as React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

// ==========================================
// Contexto de Stepper
// ==========================================

export type StepState = 'pending' | 'active' | 'completed' | 'error';
export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperSize = 'sm' | 'md' | 'lg';
export type StepperShape = 'circle' | 'squircle';

interface StepperContextValue {
  activeStep: number;
  orientation: StepperOrientation;
  size: StepperSize;
  shape: StepperShape;
  clickable?: boolean;
  onStepClick?: (stepIndex: number) => void;
  registerStep: (stepIndex: number) => void;
  totalSteps: number;
}

const StepperContext = React.createContext<StepperContextValue | null>(null);

export function useStepperContext() {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error('Los subcomponentes de Step deben ser utilizados dentro de un <Stepper />');
  }
  return context;
}

// ==========================================
// Interfaces y Tipos
// ==========================================

export interface StepItem {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  state?: StepState;
  disabled?: boolean;
}

export interface StepperProps extends React.HTMLAttributes<HTMLElement> {
  activeStep?: number;
  orientation?: StepperOrientation;
  size?: StepperSize;
  shape?: StepperShape;
  clickable?: boolean;
  onStepClick?: (stepIndex: number) => void;
  steps?: StepItem[];
  ariaLabel?: string;
  children?: React.ReactNode;
}

// ==========================================
// Componente Principal: Stepper
// ==========================================

export const Stepper = React.forwardRef<HTMLElement, StepperProps>(
  (
    {
      activeStep = 0,
      orientation = 'horizontal',
      size = 'md',
      shape = 'circle',
      clickable = false,
      onStepClick,
      steps,
      ariaLabel = 'Progreso del asistente',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [stepCount, setStepCount] = React.useState(steps ? steps.length : 0);

    const registerStep = React.useCallback((index: number) => {
      setStepCount((prev) => Math.max(prev, index + 1));
    }, []);

    const totalSteps = steps ? steps.length : stepCount;

    const contextValue = React.useMemo<StepperContextValue>(
      () => ({
        activeStep,
        orientation,
        size,
        shape,
        clickable,
        onStepClick,
        registerStep,
        totalSteps,
      }),
      [activeStep, orientation, size, shape, clickable, onStepClick, registerStep, totalSteps]
    );

    return (
      <StepperContext.Provider value={contextValue}>
        <nav
          ref={ref}
          aria-label={ariaLabel}
          className={cn('w-full', className)}
          {...props}
        >
          <ol
            className={cn(
              'flex w-full',
              orientation === 'horizontal'
                ? 'flex-row items-start justify-between'
                : 'flex-col gap-1'
            )}
          >
            {steps
              ? steps.map((item, index) => {
                  const calculatedState: StepState =
                    item.state ??
                    (index < activeStep
                      ? 'completed'
                      : index === activeStep
                      ? 'active'
                      : 'pending');

                  return (
                    <Step
                      key={index}
                      step={index}
                      state={calculatedState}
                      disabled={item.disabled}
                    >
                      <StepIndicator key="indicator" icon={item.icon} />
                      <div key="content" className="flex flex-col">
                        <StepTitle>{item.title}</StepTitle>
                        {item.description && (
                          <StepDescription>{item.description}</StepDescription>
                        )}
                      </div>
                    </Step>
                  );
                })
              : children}
          </ol>
        </nav>
      </StepperContext.Provider>
    );
  }
);
Stepper.displayName = 'Stepper';

// ==========================================
// Subcomponente: Step
// ==========================================

export interface StepProps extends React.LiHTMLAttributes<HTMLLIElement> {
  step: number;
  state?: StepState;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Step = React.forwardRef<HTMLLIElement, StepProps>(
  ({ step, state, disabled, className, children, ...props }, ref) => {
    const {
      activeStep,
      orientation,
      size,
      clickable,
      onStepClick,
      registerStep,
      totalSteps,
    } = useStepperContext();

    React.useEffect(() => {
      registerStep(step);
    }, [step, registerStep]);

    const stepState: StepState =
      state ??
      (step < activeStep ? 'completed' : step === activeStep ? 'active' : 'pending');

    const isCurrent = stepState === 'active';
    const isClickable = clickable && !disabled && Boolean(onStepClick);

    const handleClick = () => {
      if (isClickable && onStepClick) {
        onStepClick(step);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onStepClick?.(step);
      }
    };

    // Separamos el indicador de los demás hijos (título, descripción, etc.)
    let indicatorElement: React.ReactNode = null;
    const otherChildren: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement(child) &&
        (child.type as { displayName?: string })?.displayName === 'StepIndicator'
      ) {
        indicatorElement = React.cloneElement(child, {
          ...((child.props as object) ?? {}),
          _step: step,
          _state: stepState,
        } as Record<string, unknown>);
      } else if (React.isValidElement(child)) {
        otherChildren.push(
          React.cloneElement(child, {
            key: child.key ?? `step-child-${otherChildren.length}`,
            ...((child.props as object) ?? {}),
            _step: step,
            _state: stepState,
          } as Record<string, unknown>)
        );
      } else {
        otherChildren.push(child);
      }
    });

    if (!indicatorElement) {
      indicatorElement = <StepIndicator _step={step} _state={stepState} />;
    }

    if (orientation === 'horizontal') {
      return (
        <li
          ref={ref}
          aria-current={isCurrent ? 'step' : undefined}
          aria-disabled={disabled ? 'true' : undefined}
          className={cn(
            'group relative flex flex-1 flex-col items-center text-center select-none min-w-0',
            disabled && 'pointer-events-none opacity-45',
            className
          )}
          {...props}
        >
          {/* Fila superior: Línea conectora alineada al centro del icono */}
          <div className="relative flex w-full items-center justify-center">
            {/* Tramo izquierdo del conector */}
            {step > 0 && (
              <div
                aria-hidden="true"
                className={cn(
                  'absolute left-0 right-1/2 top-1/2 h-[2px] -translate-y-1/2 transition-colors duration-200',
                  step <= activeStep ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-alcspower-border'
                )}
              />
            )}

            {/* Tramo derecho del conector */}
            {step < totalSteps - 1 && (
              <div
                aria-hidden="true"
                className={cn(
                  'absolute left-1/2 right-0 top-1/2 h-[2px] -translate-y-1/2 transition-colors duration-200',
                  step < activeStep ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-alcspower-border'
                )}
              />
            )}

            {/* Indicador centrado sobre la línea */}
            <div
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              className={cn(
                'relative z-10 outline-none transition-transform duration-200',
                isClickable &&
                  'cursor-pointer hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-alcspower-primary/30 focus-visible:ring-offset-2'
              )}
            >
              {indicatorElement}
            </div>
          </div>

          {/* Bloque inferior: Título y descripción */}
          <div
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={cn(
              'mt-3 flex flex-col items-center text-center max-w-[130px] sm:max-w-[150px] outline-none',
              isClickable && 'cursor-pointer hover:opacity-85'
            )}
          >
            {otherChildren}
          </div>
        </li>
      );
    }

    // Modo Vertical
    return (
      <li
        ref={ref}
        aria-current={isCurrent ? 'step' : undefined}
        aria-disabled={disabled ? 'true' : undefined}
        className={cn(
          'group relative flex w-full items-start gap-4 select-none',
          disabled && 'pointer-events-none opacity-45',
          className
        )}
        {...props}
      >
        {/* Columna izquierda: Indicador + Línea vertical */}
        <div className="relative flex flex-col items-center flex-shrink-0">
          <div
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={cn(
              'relative z-10 outline-none transition-transform duration-200',
              isClickable &&
                'cursor-pointer hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-alcspower-primary/30'
            )}
          >
            {indicatorElement}
          </div>

          {/* Línea conectora vertical hacia el siguiente paso */}
          {step < totalSteps - 1 && (
            <div
              aria-hidden="true"
              className={cn(
                'w-[2px] transition-colors duration-200 my-1',
                size === 'sm' ? 'min-h-6' : size === 'lg' ? 'min-h-10' : 'min-h-8',
                step < activeStep ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-alcspower-border'
              )}
            />
          )}
        </div>

        {/* Columna derecha: Título, descripción y contenido */}
        <div
          role={isClickable ? 'button' : undefined}
          tabIndex={isClickable ? 0 : undefined}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex flex-1 flex-col pt-1 pb-4 outline-none',
            isClickable && 'cursor-pointer'
          )}
        >
          {otherChildren}
        </div>
      </li>
    );
  }
);
Step.displayName = 'Step';

// ==========================================
// Subcomponente: StepIndicator
// ==========================================

const indicatorVariants = cva(
  'box-border relative flex flex-shrink-0 items-center justify-center font-semibold transition-all duration-200 select-none border-[1.5px]',
  {
    variants: {
      size: {
        sm: 'h-10 w-10 text-xs',
        md: 'h-13 w-13 text-sm',
        lg: 'h-16 w-16 text-base',
      },
      shape: {
        circle: 'rounded-full',
        squircle: 'rounded-2xl',
      },
      state: {
        pending:
          'border-alcspower-border bg-alcspower-surface-muted/50 text-alcspower-muted-foreground shadow-2xs opacity-80',
        active:
          'border-alcspower-primary bg-alcspower-surface text-alcspower-primary ring-4 ring-alcspower-primary/15 shadow-xs font-bold scale-[1.02]',
        completed:
          'border-transparent bg-emerald-500 text-white shadow-xs',
        error:
          'border-alcspower-destructive bg-alcspower-destructive/10 text-alcspower-destructive ring-4 ring-alcspower-destructive/15 shadow-xs',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
      state: 'pending',
    },
  }
);

export interface StepIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof indicatorVariants> {
  icon?: React.ReactNode;
  _step?: number;
  _state?: StepState;
}

export const StepIndicator = React.forwardRef<HTMLDivElement, StepIndicatorProps>(
  (
    {
      className,
      icon,
      size: sizeProp,
      shape: shapeProp,
      state: stateProp,
      _step,
      _state,
      children,
      ...props
    },
    ref
  ) => {
    const context = useStepperContext();
    const size = sizeProp ?? context.size;
    const shape = shapeProp ?? context.shape;
    const state = stateProp ?? _state ?? 'pending';
    const displayStep = (_step ?? 0) + 1;

    let content: React.ReactNode = icon ?? displayStep;

    const iconSizeClass =
      size === 'sm'
        ? 'h-4 w-4'
        : size === 'lg'
        ? 'h-6 w-6'
        : 'h-5 w-5';

    if (!icon) {
      if (state === 'completed') {
        content = <Check className={iconSizeClass} strokeWidth={2.8} />;
      } else if (state === 'error') {
        content = <AlertCircle className={iconSizeClass} strokeWidth={2.5} />;
      }
    } else {
      // Si tiene icono personalizado y está completado, mostramos el badge check superpuesto
      if (state === 'completed') {
        content = (
          <>
            {icon}
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm border border-emerald-500/20"
            >
              <Check className="h-3 w-3 stroke-[3]" />
            </span>
          </>
        );
      }
    }

    return (
      <div
        ref={ref}
        className={cn(indicatorVariants({ size, shape, state }), className)}
        aria-hidden="true"
        {...props}
      >
        {children ?? content}
      </div>
    );
  }
);
StepIndicator.displayName = 'StepIndicator';

// ==========================================
// Subcomponente: StepTitle
// ==========================================

export interface StepTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  _state?: StepState;
}

export const StepTitle = React.forwardRef<HTMLHeadingElement, StepTitleProps>(
  ({ className, _state, children, ...props }, ref) => {
    const { size } = useStepperContext();

    return (
      <span
        ref={ref}
        className={cn(
          'font-semibold text-alcspower-foreground transition-colors leading-tight',
          size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm',
          _state === 'active' && 'text-alcspower-primary font-bold',
          _state === 'completed' && 'text-alcspower-foreground',
          _state === 'error' && 'text-alcspower-destructive font-bold',
          _state === 'pending' && 'text-alcspower-muted-foreground',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
StepTitle.displayName = 'StepTitle';

// ==========================================
// Subcomponente: StepDescription
// ==========================================

export interface StepDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  _state?: StepState;
}

export const StepDescription = React.forwardRef<HTMLParagraphElement, StepDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = useStepperContext();

    return (
      <span
        ref={ref}
        className={cn(
          'text-alcspower-muted-foreground transition-colors mt-0.5 leading-snug',
          size === 'sm' ? 'text-[11px]' : size === 'lg' ? 'text-sm' : 'text-xs',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
StepDescription.displayName = 'StepDescription';

// ==========================================
// Subcomponente: StepSeparator
// ==========================================

export interface StepSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  completed?: boolean;
}

export const StepSeparator = React.forwardRef<HTMLDivElement, StepSeparatorProps>(
  ({ completed = false, className, ...props }, ref) => {
    const { orientation } = useStepperContext();

    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          aria-hidden="true"
          className={cn(
            'ml-6 my-1 h-6 w-[2px] transition-colors',
            completed ? 'bg-emerald-500' : 'bg-alcspower-border',
            className
          )}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          'mx-2 h-[2px] flex-1 transition-colors min-w-6',
          completed ? 'bg-emerald-500' : 'bg-alcspower-border',
          className
        )}
        {...props}
      />
    );
  }
);
StepSeparator.displayName = 'StepSeparator';

// ==========================================
// Subcomponente: StepContent (Especial para vertical)
// ==========================================

export interface StepContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const StepContent = React.forwardRef<HTMLDivElement, StepContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mt-2 text-sm text-alcspower-foreground', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
StepContent.displayName = 'StepContent';
