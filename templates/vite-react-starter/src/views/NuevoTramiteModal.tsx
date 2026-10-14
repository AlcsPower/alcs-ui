import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  toast,
} from '@alcspower/ui';
import { Plus } from 'lucide-react';
import { Tramite } from '../types';

interface NuevoTramiteModalProps {
  onTramiteCreado: (nuevo: Tramite) => void;
}

export function NuevoTramiteModal({ onTramiteCreado }: NuevoTramiteModalProps) {
  const [open, setOpen] = useState(false);
  const [titular, setTitular] = useState('');
  const [tipo, setTipo] = useState('Registro de Marca');
  const [monto, setMonto] = useState('$150.00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titular.trim()) {
      toast.error('Nombre del titular requerido', {
        description: 'Por favor ingrese la razón social o titular de la solicitud.',
      });
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const nuevo: Tramite = {
      id: `REQ-${Date.now()}`,
      codigo: `REQ-2026-${randomNum}`,
      titular: titular.trim(),
      tipo,
      estado: 'en_revision',
      fechaIngreso: '09/10/2026',
      monto,
    };

    onTramiteCreado(nuevo);
    setOpen(false);
    setTitular('');

    toast.success('Solicitud registrada con éxito', {
      description: `Se ha generado el código de solicitud ${nuevo.codigo}.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" className="gap-2 shadow-2xs">
          <Plus className="h-4 w-4" />
          Nueva Solicitud
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Registro de Nueva Solicitud</DialogTitle>
            <DialogDescription>
              Ingrese los datos para aperturar una nueva solicitud en el portal.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="titular">Nombre de la Empresa o Titular</Label>
              <Input
                id="titular"
                placeholder="Ej. Distribuidora Agropecuaria S.A."
                value={titular}
                onChange={(e) => setTitular(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tipo">Tipo de Solicitud</Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger id="tipo">
                  <SelectValue placeholder="Seleccione el tipo de solicitud" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Registro de Marca">Registro de Marca</SelectItem>
                  <SelectItem value="Certificado de Origen">Certificado de Origen</SelectItem>
                  <SelectItem value="Licencia Sanitaria">Licencia Sanitaria</SelectItem>
                  <SelectItem value="Homologación Técnica">Homologación Técnica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="arancel">Tasa de Arancel Oficial</Label>
              <Input
                id="arancel"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="$150.00"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Registrar Solicitud
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export const NewRequestModal = NuevoTramiteModal;
