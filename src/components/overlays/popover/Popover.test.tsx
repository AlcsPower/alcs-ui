import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Popover, PopoverTrigger, PopoverContent } from './Popover';
import { Button } from '../../forms/button';

describe('Popover Component', () => {
  it('abre el popover al hacer clic en el trigger y muestra su contenido', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Abrir Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Contenido informativo del popover</p>
        </PopoverContent>
      </Popover>
    );

    expect(screen.queryByText('Contenido informativo del popover')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /abrir popover/i }));
    expect(screen.getByText('Contenido informativo del popover')).toBeInTheDocument();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <Popover open>
        <PopoverTrigger asChild>
          <Button>Opciones</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div>
            <h3>Título Popover</h3>
            <p>Texto accesible dentro de popover.</p>
          </div>
        </PopoverContent>
      </Popover>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
