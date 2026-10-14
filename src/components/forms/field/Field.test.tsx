import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import {
  Field,
  FieldLabel,
  FieldControl,
  FieldHint,
  FieldError
} from './index';
import { Input } from '../input';
import { Textarea } from '../textarea';

describe('Field Component Primitive', () => {
  it('vincula automáticamente FieldLabel y control con id y htmlFor', () => {
    render(
      <Field>
        <FieldLabel>Cédula de Identidad</FieldLabel>
        <FieldControl asChild>
          <Input placeholder="001-000000-0000A" />
        </FieldControl>
      </Field>
    );

    const input = screen.getByPlaceholderText('001-000000-0000A');
    const label = screen.getByText('Cédula de Identidad');

    expect(input.id).toBeTruthy();
    expect(label).toHaveAttribute('for', input.id);
  });

  it('respeta un ID personalizado si se especifica en Field', () => {
    render(
      <Field id="custom-user-id">
        <FieldLabel>Usuario</FieldLabel>
        <FieldControl asChild>
          <Input placeholder="usuario@alcspower.com" />
        </FieldControl>
      </Field>
    );

    const input = screen.getByPlaceholderText('usuario@alcspower.com');
    const label = screen.getByText('Usuario');

    expect(input.id).toBe('custom-user-id');
    expect(label).toHaveAttribute('for', 'custom-user-id');
  });

  it('asocia aria-describedby cuando existe FieldHint', () => {
    render(
      <Field id="email-field">
        <FieldLabel>Correo corporativo</FieldLabel>
        <FieldControl asChild>
          <Input type="email" placeholder="correo@empresa.com" />
        </FieldControl>
        <FieldHint>Debe terminar en @empresa.com</FieldHint>
      </Field>
    );

    const input = screen.getByPlaceholderText('correo@empresa.com');
    const hint = screen.getByText('Debe terminar en @empresa.com');

    expect(hint.id).toBe('email-field-hint');
    expect(input).toHaveAttribute('aria-describedby', 'email-field-hint');
  });

  it('asocia aria-describedby y aria-invalid cuando existe FieldError y hasError es true', () => {
    render(
      <Field id="pwd-field" hasError>
        <FieldLabel>Contraseña</FieldLabel>
        <FieldControl asChild>
          <Input type="password" placeholder="******" />
        </FieldControl>
        <FieldError>La contraseña debe tener al menos 8 caracteres</FieldError>
      </Field>
    );

    const input = screen.getByPlaceholderText('******');
    const error = screen.getByRole('alert');

    expect(error).toHaveTextContent('La contraseña debe tener al menos 8 caracteres');
    expect(error.id).toBe('pwd-field-error');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'pwd-field-error');
  });

  it('combina hint y error en aria-describedby simultáneamente', () => {
    render(
      <Field id="combined-field" hasError>
        <FieldLabel>Código Postal</FieldLabel>
        <FieldControl asChild>
          <Input placeholder="12345" />
        </FieldControl>
        <FieldHint>5 dígitos numéricos</FieldHint>
        <FieldError>Código inválido</FieldError>
      </Field>
    );

    const input = screen.getByPlaceholderText('12345');
    expect(input).toHaveAttribute(
      'aria-describedby',
      'combined-field-hint combined-field-error'
    );
  });

  it('propaga required y disabled al control y etiqueta', () => {
    render(
      <Field required disabled>
        <FieldLabel>Observaciones</FieldLabel>
        <FieldControl asChild>
          <Textarea placeholder="Comentarios..." />
        </FieldControl>
      </Field>
    );

    const textarea = screen.getByPlaceholderText('Comentarios...');
    expect(textarea).toBeDisabled();
    expect(textarea).toBeRequired();

    // El asterisco decorativo de requerido se renderiza en la etiqueta
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('propaga size a los controles hijos compatibles', () => {
    render(
      <Field size="sm">
        <FieldLabel>Campo pequeño</FieldLabel>
        <FieldControl asChild>
          <Input placeholder="pequeño" />
        </FieldControl>
      </Field>
    );

    const input = screen.getByPlaceholderText('pequeño');
    expect(input).toHaveClass('h-8', 'text-xs');
  });

  it('no asocia errorId a aria-describedby si hasError es true pero no hay FieldError renderizado (H-03)', () => {
    render(
      <Field id="error-without-msg" hasError>
        <FieldLabel>Campo con error visual</FieldLabel>
        <FieldControl asChild>
          <Input placeholder="sin mensaje" />
        </FieldControl>
      </Field>
    );

    const input = screen.getByPlaceholderText('sin mensaje');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).not.toHaveAttribute('aria-describedby');
  });

  it('asigna aria-labelledby al contenedor con role="group" cuando existe FieldLabel (H-18)', () => {
    render(
      <Field id="labeled-group">
        <FieldLabel>Etiqueta Grupo</FieldLabel>
        <FieldControl asChild>
          <Input placeholder="input" />
        </FieldControl>
      </Field>
    );

    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('aria-labelledby', 'labeled-group-label');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <Field id="accessible-field" hasError required>
        <FieldLabel>Teléfono Corporativo</FieldLabel>
        <FieldControl asChild>
          <Input placeholder="+1 555-0100" />
        </FieldControl>
        <FieldHint>Incluya el código de país</FieldHint>
        <FieldError>Número de teléfono incompleto</FieldError>
      </Field>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
