import { extendTailwindMerge } from 'tailwind-merge';

export const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'bg-color': [
        {
          bg: [
            'mific-background',
            'mific-foreground',
            'mific-surface',
            'mific-surface-card',
            'mific-surface-muted',
            'mific-surface-subtle',
            'mific-primary',
            'mific-primary-hover',
            'mific-primary-active',
            'mific-primary-subtle',
            'mific-secondary',
            'mific-secondary-hover',
            'mific-accent',
            'mific-muted',
            'mific-destructive',
            'mific-destructive-hover',
            'mific-destructive-active',
            'mific-destructive-subtle',
            'mific-success',
            'mific-success-subtle',
            'mific-warning',
            'mific-warning-subtle',
            'mific-info',
            'mific-info-subtle',
            // Clases de compatibilidad previa
            'mific-canvas',
            'mific-danger',
            'mific-danger-subtle'
          ]
        }
      ],
      'text-color': [
        {
          text: [
            'mific-foreground',
            'mific-background',
            'mific-primary',
            'mific-primary-foreground',
            'mific-secondary-foreground',
            'mific-accent-foreground',
            'mific-muted-foreground',
            'mific-destructive',
            'mific-destructive-foreground',
            'mific-success',
            'mific-success-foreground',
            'mific-warning',
            'mific-warning-foreground',
            'mific-info',
            'mific-info-foreground',
            // Clases de compatibilidad previa
            'mific-text-primary',
            'mific-text-secondary',
            'mific-text-muted',
            'mific-text-inverse',
            'mific-danger',
            'mific-danger-foreground'
          ]
        }
      ],
      'border-color': [
        {
          border: [
            'mific-border',
            'mific-border-subtle',
            'mific-input',
            'mific-primary',
            'mific-destructive',
            'mific-destructive-border',
            'mific-success-border',
            'mific-warning-border',
            'mific-info-border',
            // Clases de compatibilidad previa
            'mific-danger',
            'mific-danger-border'
          ]
        }
      ],
      'ring-color': [
        {
          ring: [
            'mific-ring',
            'mific-destructive',
            'mific-danger',
            'mific-primary'
          ]
        }
      ],
      'ring-offset-color': [
        {
          'ring-offset': [
            'mific-ring-offset',
            'mific-surface',
            'mific-surface-card',
            'mific-background',
            'mific-canvas'
          ]
        }
      ],
      rounded: [
        {
          rounded: [
            'mific-sm',
            'mific-md',
            'mific-lg',
            'mific-full'
          ]
        }
      ]
    }
  }
});
