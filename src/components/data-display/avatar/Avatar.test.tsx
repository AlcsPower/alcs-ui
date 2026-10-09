import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Avatar, AvatarImage, AvatarFallback } from './Avatar';

describe('Avatar Component', () => {
  it('renderiza fallback cuando la imagen no ha cargado o falla', () => {
    render(
      <Avatar>
        <AvatarImage src="" alt="Carlos Ruiz" />
        <AvatarFallback>CR</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText('CR')).toBeInTheDocument();
  });

  it('aplica las clases de tamaño correspondientes (sm, md, lg, xl)', () => {
    const { container, rerender } = render(
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
    );
    expect(container.firstChild).toHaveClass('h-8', 'w-8');
    expect(screen.getByText('SM')).toHaveClass('text-xs');

    rerender(
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(container.firstChild).toHaveClass('h-12', 'w-12');
    expect(screen.getByText('LG')).toHaveClass('text-base');

    rerender(
      <Avatar size="xl">
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    );
    expect(container.firstChild).toHaveClass('h-16', 'w-16');
    expect(screen.getByText('XL')).toHaveClass('text-xl');
  });

  it('no presenta violaciones de accesibilidad (axe)', async () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" alt="Usuario" />
        <AvatarFallback>US</AvatarFallback>
      </Avatar>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
