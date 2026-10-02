import type { Preview } from '@storybook/react';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      test: 'error'
    },
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: 'var(--mific-canvas)' },
        { name: 'surface', value: 'var(--mific-surface)' }
      ]
    }
  },
  globalTypes: {
    theme: {
      name: 'Tema Institucional',
      description: 'Alternar modo claro / oscuro institucional',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Modo Claro', icon: 'sun' },
          { value: 'dark', title: 'Modo Oscuro', icon: 'moon' }
        ],
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
      }
      return Story();
    }
  ]
};

export default preview;
