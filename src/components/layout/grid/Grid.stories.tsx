import type { Meta, StoryObj } from '@storybook/react';
import { Grid, GridItem } from './Grid';
import { Card } from '../../data-display/card';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 12],
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    flow: {
      control: 'select',
      options: ['row', 'col', 'dense'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  args: {
    cols: 3,
    gap: 'md',
  },
  render: (args) => (
    <Grid {...args}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="p-4 flex flex-col justify-center items-center text-center">
          <div className="font-bold text-alcspower-foreground">Módulo {i}</div>
          <div className="text-xs text-alcspower-muted-foreground mt-1">Servicio Corporativo</div>
        </Card>
      ))}
    </Grid>
  ),
};

export const Responsive: Story = {
  args: {
    cols: 1,
    colsSm: 2,
    colsMd: 3,
    colsLg: 4,
    gap: 'md',
  },
  render: (args) => (
    <Grid {...args}>
      {['Exportaciones', 'Importaciones', 'Propiedad Intelectual', 'Comercio Interior'].map((title) => (
        <Card key={title} className="p-4 border border-alcspower-border">
          <div className="text-sm font-bold text-alcspower-foreground">{title}</div>
          <div className="text-xs text-alcspower-muted-foreground mt-1">Dirección General</div>
        </Card>
      ))}
    </Grid>
  ),
};

export const WithSpans: Story = {
  args: {
    cols: 4,
    gap: 'md',
  },
  render: (args) => (
    <Grid {...args}>
      <GridItem colSpan={2} className="p-6 bg-alcspower-primary/10 border border-alcspower-primary/30 rounded-xl">
        <h4 className="font-bold text-alcspower-primary">Resumen Principal (colSpan=2)</h4>
        <p className="text-xs text-alcspower-muted-foreground mt-1">Ocupa el doble de espacio horizontal.</p>
      </GridItem>
      <GridItem colSpan={1} className="p-6 bg-alcspower-surface border border-alcspower-border rounded-xl">
        <div className="font-semibold text-alcspower-foreground">Métrica A</div>
      </GridItem>
      <GridItem colSpan={1} className="p-6 bg-alcspower-surface border border-alcspower-border rounded-xl">
        <div className="font-semibold text-alcspower-foreground">Métrica B</div>
      </GridItem>
      <GridItem colSpan="full" className="p-4 bg-alcspower-surface-muted/40 border border-alcspower-border rounded-xl text-center">
        <span className="text-xs font-mono text-alcspower-muted-foreground">Banner Horizontal Inferior (colSpan=full)</span>
      </GridItem>
    </Grid>
  ),
};
