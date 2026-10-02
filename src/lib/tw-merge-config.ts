import { extendTailwindMerge } from 'tailwind-merge';

export const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'bg-color': [
        {
          bg: [
            'alcspower-background',
            'alcspower-foreground',
            'alcspower-surface',
            'alcspower-surface-card',
            'alcspower-surface-muted',
            'alcspower-surface-subtle',
            'alcspower-primary',
            'alcspower-primary-hover',
            'alcspower-primary-active',
            'alcspower-primary-subtle',
            'alcspower-secondary',
            'alcspower-secondary-hover',
            'alcspower-accent',
            'alcspower-muted',
            'alcspower-destructive',
            'alcspower-destructive-hover',
            'alcspower-destructive-active',
            'alcspower-destructive-subtle',
            'alcspower-success',
            'alcspower-success-subtle',
            'alcspower-warning',
            'alcspower-warning-subtle',
            'alcspower-info',
            'alcspower-info-subtle',
            // Clases de compatibilidad previa
            'alcspower-canvas',
            'alcspower-danger',
            'alcspower-danger-subtle'
          ]
        }
      ],
      'text-color': [
        {
          text: [
            'alcspower-foreground',
            'alcspower-background',
            'alcspower-primary',
            'alcspower-primary-foreground',
            'alcspower-secondary-foreground',
            'alcspower-accent-foreground',
            'alcspower-muted-foreground',
            'alcspower-destructive',
            'alcspower-destructive-foreground',
            'alcspower-success',
            'alcspower-success-foreground',
            'alcspower-warning',
            'alcspower-warning-foreground',
            'alcspower-info',
            'alcspower-info-foreground',
            // Clases de compatibilidad previa
            'alcspower-text-primary',
            'alcspower-text-secondary',
            'alcspower-text-muted',
            'alcspower-text-inverse',
            'alcspower-danger',
            'alcspower-danger-foreground'
          ]
        }
      ],
      'border-color': [
        {
          border: [
            'alcspower-border',
            'alcspower-border-subtle',
            'alcspower-input',
            'alcspower-primary',
            'alcspower-destructive',
            'alcspower-destructive-border',
            'alcspower-success-border',
            'alcspower-warning-border',
            'alcspower-info-border',
            // Clases de compatibilidad previa
            'alcspower-danger',
            'alcspower-danger-border'
          ]
        }
      ],
      'ring-color': [
        {
          ring: [
            'alcspower-ring',
            'alcspower-destructive',
            'alcspower-danger',
            'alcspower-primary'
          ]
        }
      ],
      'ring-offset-color': [
        {
          'ring-offset': [
            'alcspower-ring-offset',
            'alcspower-surface',
            'alcspower-surface-card',
            'alcspower-background',
            'alcspower-canvas'
          ]
        }
      ],
      rounded: [
        {
          rounded: [
            'alcspower-sm',
            'alcspower-md',
            'alcspower-lg',
            'alcspower-full'
          ]
        }
      ]
    }
  }
});
