import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Data Display/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>¿Cuáles son los requisitos para registro de marca?</AccordionTrigger>
          <AccordionContent>
            Para registrar una marca comercial en el Registro de la Propiedad Intelectual (RPI), se requiere:
            formulario oficial de solicitud debidamente firmado, copia de identificación del titular, 
            representación gráfica del signo distintivo y comprobante de pago de arancel correspondiente.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>¿Cuál es el plazo estimado de resolución?</AccordionTrigger>
          <AccordionContent>
            El tiempo promedio establecido por la normativa vigente para el examen de forma y publicación 
            en La Gaceta es de aproximadamente 30 a 45 días hábiles a partir de la radicación.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>¿Dónde puedo realizar el pago de tasas?</AccordionTrigger>
          <AccordionContent>
            Los pagos pueden efectuarse mediante transferencia a las cuentas institucionales autorizadas del 
            MIFIC o directamente en la caja central de la sede ministerial.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="w-[480px] max-w-full">
      <Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Módulo de Exportaciones</AccordionTrigger>
          <AccordionContent>
            Gestión y seguimiento de permisos fitosanitarios y certificados de origen con Centroamérica y terceros países.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Módulo de Normas Técnicas (NTON)</AccordionTrigger>
          <AccordionContent>
            Consulta del compendio oficial de normas técnicas obligatorias nicaragüenses aprobadas por el Comité Técnico.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
