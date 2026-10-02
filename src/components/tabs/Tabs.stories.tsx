import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import { Card, CardHeader, CardTitle, CardContent } from '../card';

const meta: Meta = {
  title: 'Navegacion/Tabs',
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="datos-generales" className="w-[450px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="datos-generales">Datos</TabsTrigger>
        <TabsTrigger value="documentos">Documentos</TabsTrigger>
        <TabsTrigger value="resolucion">Resolución</TabsTrigger>
      </TabsList>
      <TabsContent value="datos-generales">
        <Card>
          <CardHeader>
            <CardTitle>Información General del Trámite</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-alcspower-text-secondary">
            Empresa solicitante: Agroindustrias de Nicaragua.<br />
            Representante: Lic. Juan Pérez.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="documentos">
        <Card>
          <CardHeader>
            <CardTitle>Documentos Adjuntos</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-alcspower-text-secondary">
            - Escritura de constitución (PDF)<br />
            - Cédula RUC (PDF)
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="resolucion">
        <Card>
          <CardHeader>
            <CardTitle>Dictamen Técnico</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-alcspower-text-secondary">
            Dictamen favorable emitido el 28 de febrero de 2026.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
};
