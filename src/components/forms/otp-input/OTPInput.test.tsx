import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { OTPInput } from './OTPInput';

describe('OTPInput Component', () => {
  it('renderiza la cantidad correcta de inputs según length', () => {
    render(<OTPInput length={4} />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    expect(inputs).toHaveLength(4);
    expect(inputs[0]!).toHaveAttribute('aria-label', 'Dígito 1 de 4');
  });

  it('permite escribir dígitos y avanzar el foco', () => {
    const handleChange = vi.fn();
    render(<OTPInput length={4} onChange={handleChange} />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

    fireEvent.change(inputs[0]!, { target: { value: '5' } });
    expect(inputs[0]!).toHaveValue('5');
    expect(handleChange).toHaveBeenCalledWith('5');
    expect(document.activeElement).toBe(inputs[1]!);
  });

  it('dispara onComplete cuando se llenan todos los dígitos', () => {
    const handleComplete = vi.fn();
    render(<OTPInput length={3} onComplete={handleComplete} />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

    fireEvent.change(inputs[0]!, { target: { value: '1' } });
    fireEvent.change(inputs[1]!, { target: { value: '2' } });
    fireEvent.change(inputs[2]!, { target: { value: '3' } });

    expect(handleComplete).toHaveBeenCalledWith('123');
  });

  it('maneja el evento Backspace retrocediendo al dígito anterior si el actual está vacío', () => {
    render(<OTPInput length={4} defaultValue="12" />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

    inputs[2]!.focus();
    fireEvent.keyDown(inputs[2]!, { key: 'Backspace' });

    expect(inputs[1]!).toHaveValue('');
    expect(document.activeElement).toBe(inputs[1]!);
  });

  it('permite pegar un código completo desde el portapapeles', () => {
    const handleComplete = vi.fn();
    const handleChange = vi.fn();
    render(<OTPInput length={6} onChange={handleChange} onComplete={handleComplete} />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

    fireEvent.paste(inputs[0]!, {
      clipboardData: {
        getData: () => '987654',
      },
    });

    expect(inputs[0]!).toHaveValue('9');
    expect(inputs[1]!).toHaveValue('8');
    expect(inputs[2]!).toHaveValue('7');
    expect(inputs[3]!).toHaveValue('6');
    expect(inputs[4]!).toHaveValue('5');
    expect(inputs[5]!).toHaveValue('4');
    expect(handleComplete).toHaveBeenCalledWith('987654');
  });

  it('ignora caracteres no numéricos cuando type="number"', () => {
    render(<OTPInput length={4} type="number" />);
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];

    fireEvent.change(inputs[0]!, { target: { value: 'a' } });
    expect(inputs[0]!).toHaveValue('');
  });

  it('renderiza separador intermedio si se proporciona', () => {
    render(<OTPInput length={6} separator={<span data-testid="sep">-</span>} />);
    expect(screen.getByTestId('sep')).toBeInTheDocument();
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(<OTPInput length={4} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
