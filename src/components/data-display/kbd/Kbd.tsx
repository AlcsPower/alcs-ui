import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

// ==========================================
// Tipos de Plataforma y Claves
// ==========================================

export type KbdPlatform = 'macos' | 'windows' | 'linux';

export const KBD_SYMBOLS = {
  cmd: '⌘',
  command: '⌘',
  shift: '⇧',
  alt: '⌥',
  option: '⌥',
  ctrl: 'Ctrl',
  control: 'Ctrl',
  win: '⊞',
  windows: '⊞',
  super: 'Super',
  enter: '↵',
  return: '↵',
  escape: 'Esc',
  esc: 'Esc',
  tab: '⇥',
  backspace: '⌫',
  delete: 'Del',
  del: 'Del',
  up: '↑',
  down: '↓',
  left: '←',
  right: '→',
  space: 'Espacio',
} as const;

export type KbdKey =
  | keyof typeof KBD_SYMBOLS
  | 'modifier';

// ==========================================
// Detección Segura de Plataforma (SSR-Friendly)
// ==========================================

export function detectPlatform(): KbdPlatform {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'macos';
  }
  const p = (navigator.platform || '').toLowerCase();
  const ua = (navigator.userAgent || '').toLowerCase();
  if (p.includes('mac') || ua.includes('mac') || ua.includes('iphone') || ua.includes('ipad')) {
    return 'macos';
  }
  if (p.includes('win') || ua.includes('win')) {
    return 'windows';
  }
  if (p.includes('linux') || ua.includes('linux') || ua.includes('x11')) {
    return 'linux';
  }
  return 'macos';
}

// ==========================================
// Contexto de Plataforma
// ==========================================

export const KbdPlatformContext = React.createContext<KbdPlatform | undefined>(undefined);

export interface KbdProviderProps {
  platform: KbdPlatform;
  children: React.ReactNode;
}

export const KbdProvider: React.FC<KbdProviderProps> = ({ platform, children }) => {
  return (
    <KbdPlatformContext.Provider value={platform}>
      {children}
    </KbdPlatformContext.Provider>
  );
};

export function useKbdPlatform(override?: KbdPlatform | 'auto'): KbdPlatform {
  const contextPlatform = React.useContext(KbdPlatformContext);
  const [detected, setDetected] = React.useState<KbdPlatform>('macos');

  React.useEffect(() => {
    setDetected(detectPlatform());
  }, []);

  if (override && override !== 'auto') {
    return override;
  }
  if (contextPlatform) {
    return contextPlatform;
  }
  return detected;
}

// ==========================================
// Iconos Vectoriales para Teclas Especiales
// ==========================================

export const KbdIcons = {
  command: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
  ),
  shift: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  ),
  option: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 6h5l8 12h5" />
      <path d="M14 6h7" />
    </svg>
  ),
  control: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M6 14l6-6 6 6" />
    </svg>
  ),
  win: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  ),
  super: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l3 3" />
    </svg>
  ),
  enter: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <polyline points="9 10 4 15 9 20" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </svg>
  ),
  backspace: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
      <line x1="18" y1="9" x2="12" y2="15" />
      <line x1="12" y1="9" x2="18" y2="15" />
    </svg>
  ),
  escape: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  ),
  tab: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M9 18l6-6-6-6" />
      <path d="M3 12h12" />
      <path d="M21 6v12" />
    </svg>
  ),
  delete: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    </svg>
  ),
  up: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  ),
  down: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 5v14" />
      <path d="M19 12l-7 7-7-7" />
    </svg>
  ),
  left: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  ),
  right: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  ),
};

// ==========================================
// Variantes CVA con Relieve Físico 3D y Tamaños
// ==========================================

export const kbdVariants = cva(
  'inline-flex items-center justify-center font-mono font-semibold select-none tabular-nums tracking-tight align-middle leading-none relative cursor-default transition-[transform,box-shadow,background-color,border-color] duration-150',
  {
    variants: {
      variant: {
        outline:
          'border border-gray-200 border-b-2 border-b-gray-300/90 bg-gradient-to-b from-white to-gray-50/90 text-gray-700 shadow-[0_1px_0_rgba(0,0,0,0.08),0_2px_0_rgba(0,0,0,0.04)] hover:border-gray-300 hover:shadow-[0_1px_0_rgba(0,0,0,0.06),0_3px_0_rgba(0,0,0,0.03)] dark:from-slate-800 dark:to-slate-900 dark:border-slate-700 dark:border-b-slate-950 dark:text-slate-200 dark:shadow-[0_1.5px_0_1px_rgba(255,255,255,0.08),0_2px_0_rgba(0,0,0,0.5)] dark:hover:border-slate-600',
        filled:
          'bg-slate-800 text-white border border-slate-900 border-b-2 border-b-black shadow-[0_1px_0_rgba(0,0,0,0.2),0_2px_0_rgba(0,0,0,0.1)] hover:bg-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:border-b-black dark:text-slate-100',
        primary:
          'bg-gradient-to-b from-alcspower-primary to-alcspower-primary-hover text-white border border-alcspower-primary-active border-b-2 border-b-blue-900 shadow-[0_1px_0_rgba(37,99,235,0.3),0_2px_0_rgba(37,99,235,0.15)] hover:from-alcspower-primary-hover hover:to-alcspower-primary-active',
        minimal:
          'bg-transparent text-gray-700 dark:text-slate-300 border-transparent border-b-[1.5px] border-b-gray-300 dark:border-b-slate-600 shadow-none hover:border-b-alcspower-primary hover:text-alcspower-primary px-1',
        // Retrocompatibilidad
        solid:
          'bg-slate-800 text-white border border-slate-900 border-b-2 border-b-black shadow-[0_1px_0_rgba(0,0,0,0.2),0_2px_0_rgba(0,0,0,0.1)] hover:bg-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:border-b-black',
        subtle:
          'bg-alcspower-surface-muted text-alcspower-foreground border border-alcspower-border-subtle border-b-2 border-b-alcspower-border-strong/30 shadow-2xs',
        ghost:
          'bg-transparent border border-transparent text-alcspower-muted-foreground shadow-none',
      },
      size: {
        xs: 'h-5 min-w-5 px-1 text-[10px] rounded-[4px]',
        sm: 'h-6 min-w-6 px-1.5 text-[11px] rounded-[5px]',
        md: 'h-7 min-w-7 px-2 text-xs rounded-[6px]',
        lg: 'h-[34px] min-w-[34px] px-2.5 text-[13px] rounded-[7px]',
        xl: 'h-[42px] min-w-[42px] px-3.5 text-sm rounded-[8px]',
      },
      shape: {
        rounded: '',
        squircle: 'rounded-xl',
      },
      pressed: {
        true: 'translate-y-[1px] border-b-[1px] shadow-none bg-gray-100 dark:bg-slate-800',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
      shape: 'rounded',
      pressed: false,
    },
  }
);

// ==========================================
// Kbd Props e Implementación
// ==========================================

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    Omit<VariantProps<typeof kbdVariants>, 'pressed'> {
  as?: 'kbd' | 'span';
  platform?: KbdPlatform | 'auto';
  keyName?: KbdKey;
  pressed?: boolean;
}

/**
 * Primitiva accesible `<kbd>` para representar teclas o atajos de teclado individuales
 * con relieve físico 3D y renderizado multi-plataforma (macOS, Windows, Linux).
 */
export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  (
    {
      as: Component = 'kbd',
      variant,
      size,
      shape,
      platform: platformProp,
      keyName,
      pressed = false,
      className,
      children,
      title,
      ...props
    },
    ref
  ) => {
    const platform = useKbdPlatform(platformProp);

    // Identificar si los children corresponden a una clave conocida en caso de no especificarse keyName
    const resolvedKeyName: KbdKey | undefined = React.useMemo(() => {
      if (keyName) return keyName;
      if (typeof children === 'string') {
        const lower = children.trim().toLowerCase();
        if (lower === 'command' || lower === 'cmd') return 'command';
        if (lower === 'shift') return 'shift';
        if (lower === 'option' || lower === 'alt') return 'option';
        if (lower === 'control' || lower === 'ctrl') return 'control';
        if (lower === 'win' || lower === 'windows') return 'win';
        if (lower === 'super') return 'super';
        if (lower === 'modifier') return 'modifier';
        if (lower === 'enter' || lower === 'return') return 'enter';
        if (lower === 'backspace') return 'backspace';
        if (lower === 'escape' || lower === 'esc') return 'escape';
        if (lower === 'tab') return 'tab';
        if (lower === 'delete' || lower === 'del') return 'delete';
        if (lower === 'up') return 'up';
        if (lower === 'down') return 'down';
        if (lower === 'left') return 'left';
        if (lower === 'right') return 'right';
      }
      return undefined;
    }, [keyName, children]);

    // Resolver contenido según plataforma y tecla
    const renderedContent = React.useMemo(() => {
      if (!resolvedKeyName) {
        return children;
      }

      // Modifier dinámico (macOS = Command ⌘, Windows/Linux = Ctrl)
      if (resolvedKeyName === 'modifier') {
        if (platform === 'macos') {
          return (
            <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
              <KbdIcons.command className="w-[60%] h-[60%] shrink-0" />
            </span>
          );
        }
        return 'Ctrl';
      }

      // Command / Cmd
      if (resolvedKeyName === 'command' || resolvedKeyName === 'cmd') {
        if (platform === 'macos') {
          return (
            <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
              <KbdIcons.command className="w-[60%] h-[60%] shrink-0" />
            </span>
          );
        }
        return 'Ctrl';
      }

      // Shift
      if (resolvedKeyName === 'shift') {
        return (
          <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
            <KbdIcons.shift className="w-[60%] h-[60%] shrink-0" />
          </span>
        );
      }

      // Option / Alt
      if (resolvedKeyName === 'option' || resolvedKeyName === 'alt') {
        if (platform === 'macos') {
          return (
            <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
              <KbdIcons.option className="w-[60%] h-[60%] shrink-0" />
            </span>
          );
        }
        return 'Alt';
      }

      // Control / Ctrl
      if (resolvedKeyName === 'control' || resolvedKeyName === 'ctrl') {
        if (platform === 'macos') {
          return (
            <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
              <KbdIcons.control className="w-[60%] h-[60%] shrink-0" />
            </span>
          );
        }
        return 'Ctrl';
      }

      // Windows / Win
      if (resolvedKeyName === 'win' || resolvedKeyName === 'windows') {
        if (platform === 'macos') {
          return (
            <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
              <KbdIcons.command className="w-[60%] h-[60%] shrink-0" />
            </span>
          );
        }
        if (platform === 'linux') {
          return (
            <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
              <KbdIcons.super className="w-[60%] h-[60%] shrink-0" />
            </span>
          );
        }
        return (
          <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
            <KbdIcons.win className="w-[55%] h-[55%] shrink-0" />
          </span>
        );
      }

      // Super (Linux Meta / Super)
      if (resolvedKeyName === 'super') {
        if (platform === 'linux') {
          return (
            <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
              <KbdIcons.super className="w-[60%] h-[60%] shrink-0" />
            </span>
          );
        }
        if (platform === 'windows') {
          return (
            <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
              <KbdIcons.win className="w-[55%] h-[55%] shrink-0" />
            </span>
          );
        }
        return (
          <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
            <KbdIcons.command className="w-[60%] h-[60%] shrink-0" />
          </span>
        );
      }

      // Enter / Return
      if (resolvedKeyName === 'enter' || resolvedKeyName === 'return') {
        return (
          <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
            <KbdIcons.enter className="w-[60%] h-[60%] shrink-0" />
          </span>
        );
      }

      // Backspace
      if (resolvedKeyName === 'backspace') {
        return (
          <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
            <KbdIcons.backspace className="w-[60%] h-[60%] shrink-0" />
          </span>
        );
      }

      // Escape / Esc
      if (resolvedKeyName === 'escape' || resolvedKeyName === 'esc') {
        return 'Esc';
      }

      // Tab
      if (resolvedKeyName === 'tab') {
        return (
          <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
            <KbdIcons.tab className="w-[60%] h-[60%] shrink-0" />
          </span>
        );
      }

      // Delete / Del
      if (resolvedKeyName === 'delete' || resolvedKeyName === 'del') {
        return 'Del';
      }

      // Flechas de dirección
      if (resolvedKeyName === 'up') {
        return (
          <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
            <KbdIcons.up className="w-[60%] h-[60%] shrink-0" />
          </span>
        );
      }
      if (resolvedKeyName === 'down') {
        return (
          <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
            <KbdIcons.down className="w-[60%] h-[60%] shrink-0" />
          </span>
        );
      }
      if (resolvedKeyName === 'left') {
        return (
          <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
            <KbdIcons.left className="w-[60%] h-[60%] shrink-0" />
          </span>
        );
      }
      if (resolvedKeyName === 'right') {
        return (
          <span className="inline-flex items-center justify-center w-full h-full leading-none pointer-events-none select-none">
            <KbdIcons.right className="w-[60%] h-[60%] shrink-0" />
          </span>
        );
      }

      return children;
    }, [resolvedKeyName, platform, children]);

    return (
      <Component
        ref={ref}
        className={cn(kbdVariants({ variant, size, shape, pressed }), className)}
        title={title}
        {...props}
      >
        {renderedContent}
      </Component>
    );
  }
);
Kbd.displayName = 'Kbd';

// ==========================================
// KbdGroup
// ==========================================

export interface KbdGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  separator?: React.ReactNode;
  platform?: KbdPlatform | 'auto';
}

/**
 * Contenedor para combinaciones de teclas con espaciado y separadores semánticos (`+`).
 */
export const KbdGroup = React.forwardRef<HTMLDivElement, KbdGroupProps>(
  ({ separator = '+', platform, className, children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const content = (
      <div
        ref={ref}
        role="group"
        aria-label="Combinación de atajos de teclado"
        className={cn('inline-flex items-center gap-1.5', className)}
        {...props}
      >
        {separator
          ? childrenArray.map((child, index) => (
              <React.Fragment key={index}>
                {child}
                {index < childrenArray.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="text-[11px] font-medium text-alcspower-muted-foreground select-none px-0.5"
                  >
                    {separator}
                  </span>
                )}
              </React.Fragment>
            ))
          : children}
      </div>
    );

    if (platform && platform !== 'auto') {
      return (
        <KbdPlatformContext.Provider value={platform}>
          {content}
        </KbdPlatformContext.Provider>
      );
    }

    return content;
  }
);
KbdGroup.displayName = 'KbdGroup';
