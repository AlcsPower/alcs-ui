import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuRadioGroup
} from './ContextMenu';

const meta: Meta<typeof ContextMenu> = {
  title: 'Superposiciones/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => {
    const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
    const [theme, setTheme] = React.useState('light');

    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[180px] w-[340px] items-center justify-center rounded-xl border-2 border-dashed border-alcspower-border bg-alcspower-surface-muted/40 text-sm font-medium text-alcspower-muted-foreground select-none hover:border-alcspower-primary/60 transition-colors">
          Haz clic derecho aquí
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuItem>
            Atrás <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            Adelante <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Recargar <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem
            checked={bookmarksChecked}
            onCheckedChange={setBookmarksChecked}
          >
            Mostrar Marcadores
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuLabel>Tema</ContextMenuLabel>
          <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
            <ContextMenuRadioItem value="light">Claro</ContextMenuRadioItem>
            <ContextMenuRadioItem value="dark">Oscuro</ContextMenuRadioItem>
            <ContextMenuRadioItem value="system">Sistema</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSeparator />
          <ContextMenuItem destructive>
            Eliminar <ContextMenuShortcut>⌫</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};
