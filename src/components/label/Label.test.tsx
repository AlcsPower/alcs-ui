import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Label } from './Label';
import { Input } from '../input';

describe('Label Component', () => {
  it('renderiza texto y asterisco decorativo cuando required es true', () => {
    render(<Label required htmlFor="email-input">Correo Electrónico</Label>);

    const label = screen.getByText(/correo electrónico/i);
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'email-input');

    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveAttribute('aria-hidden', 'true');
  });

  it('no presenta violaciones de accesibilidad asociado a un input (axe)', async () => {
    const { container } = render(
      <div>
        <Label htmlFor="cedula-field" required>Número de Cédula</Label>
        <Input id="cedula-field" placeholder="001-000000-0000A" required />
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
