import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('renders children text correctly', () => {
    render(<StatusBadge>Activo</StatusBadge>);
    expect(screen.getByText('Activo')).toBeInTheDocument();
  });

  it('renders with default status (neutral)', () => {
    const { container } = render(<StatusBadge>Default Status</StatusBadge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('bg-alcspower-surface-muted');
    expect(badge).toHaveClass('text-alcspower-muted-foreground');
    expect(badge).toHaveClass('border-alcspower-border');
  });

  it('renders with each status variant', () => {
    const { rerender, container } = render(<StatusBadge status="success">Éxito</StatusBadge>);
    let badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('bg-alcspower-success-subtle');
    expect(badge).toHaveClass('text-alcspower-success');
    expect(badge).toHaveClass('border-alcspower-success-border');

    rerender(<StatusBadge status="warning">Advertencia</StatusBadge>);
    badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('bg-alcspower-warning-subtle');
    expect(badge).toHaveClass('text-alcspower-warning');
    expect(badge).toHaveClass('border-alcspower-warning-border');

    rerender(<StatusBadge status="error">Error</StatusBadge>);
    badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('bg-alcspower-destructive-subtle');
    expect(badge).toHaveClass('text-alcspower-destructive');
    expect(badge).toHaveClass('border-alcspower-destructive-border');

    rerender(<StatusBadge status="info">Info</StatusBadge>);
    badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('bg-alcspower-info-subtle');
    expect(badge).toHaveClass('text-alcspower-info');
    expect(badge).toHaveClass('border-alcspower-info-border');

    rerender(<StatusBadge status="neutral">Neutral</StatusBadge>);
    badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('bg-alcspower-surface-muted');
    expect(badge).toHaveClass('text-alcspower-muted-foreground');
    expect(badge).toHaveClass('border-alcspower-border');
  });

  it('does NOT show dot by default', () => {
    const { container } = render(<StatusBadge>Sin dot</StatusBadge>);
    const dotContainer = container.querySelector('.relative.flex.h-1\\.5.w-1\\.5');
    expect(dotContainer).not.toBeInTheDocument();
  });

  it('shows dot when dot prop is true', () => {
    const { container } = render(<StatusBadge dot>Con dot</StatusBadge>);
    const dotContainer = container.querySelector('.relative.flex.h-1\\.5.w-1\\.5');
    expect(dotContainer).toBeInTheDocument();
    expect(dotContainer?.querySelector('.animate-ping')).not.toBeInTheDocument();
  });

  it('does NOT show pulse by default even with dot', () => {
    const { container } = render(<StatusBadge dot>Sin pulse</StatusBadge>);
    const pulseElement = container.querySelector('.animate-ping');
    expect(pulseElement).not.toBeInTheDocument();
  });

  it('shows pulse animation when both dot and pulse are true', () => {
    const { container } = render(<StatusBadge dot pulse>Con pulse</StatusBadge>);
    const pulseElement = container.querySelector('.animate-ping');
    expect(pulseElement).toBeInTheDocument();
    expect(pulseElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('supports className override', () => {
    const { container } = render(<StatusBadge className="custom-test-class">Custom</StatusBadge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('custom-test-class');
  });

  it('size variants apply correct classes', () => {
    const { rerender, container } = render(<StatusBadge size="sm">Small</StatusBadge>);
    let badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('px-2');
    expect(badge).toHaveClass('py-0.5');

    rerender(<StatusBadge size="md">Medium</StatusBadge>);
    badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('px-2.5');
    expect(badge).toHaveClass('py-0.5');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<StatusBadge ref={ref}>Ref test</StatusBadge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current?.textContent).toBe('Ref test');
  });

  it('has zero accessibility violations (axe)', async () => {
    const { container } = render(
      <div>
        <StatusBadge status="neutral">Neutral</StatusBadge>
        <StatusBadge status="success" dot pulse>Éxito</StatusBadge>
        <StatusBadge status="warning" dot>Advertencia</StatusBadge>
        <StatusBadge status="error" size="sm">Error</StatusBadge>
        <StatusBadge status="info">Info</StatusBadge>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
