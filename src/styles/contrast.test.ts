import { describe, it, expect } from 'vitest';

/**
 * Calcula la luminancia relativa según la especificación WCAG 2.1 §1.4.3
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function getRelativeLuminance(hex: string): number {
  const sanitized = hex.replace('#', '');
  const r = parseInt(sanitized.substring(0, 2), 16) / 255;
  const g = parseInt(sanitized.substring(2, 4), 16) / 255;
  const b = parseInt(sanitized.substring(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return (
    0.2126 * toLinear(r) +
    0.7152 * toLinear(g) +
    0.0722 * toLinear(b)
  );
}

/**
 * Calcula el ratio de contraste entre dos colores hex
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
function getContrastRatio(foregroundHex: string, backgroundHex: string): number {
  const l1 = getRelativeLuminance(foregroundHex);
  const l2 = getRelativeLuminance(backgroundHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('Design Tokens WCAG 2.1 Contrast Ratios (I-03)', () => {
  describe('Modo Claro (Light Theme)', () => {
    const light = {
      background: '#f8fafc',
      foreground: '#0f172a',
      surface: '#ffffff',
      surfaceMuted: '#f1f5f9',
      primary: '#004b87',
      primaryForeground: '#ffffff',
      secondary: '#f1f5f9',
      secondaryForeground: '#0f172a',
      mutedForeground: '#64748b',
      destructive: '#dc2626',
      destructiveForeground: '#ffffff',
      success: '#15803d',
      successForeground: '#ffffff',
      warning: '#b45309',
      warningForeground: '#ffffff',
      info: '#0369a1',
      infoForeground: '#ffffff'
    };

    it('Texto principal tiene contraste AAA (>= 7.0:1) sobre superficies y fondo', () => {
      const ratioSurface = getContrastRatio(light.foreground, light.surface);
      const ratioBg = getContrastRatio(light.foreground, light.background);

      expect(ratioSurface).toBeGreaterThanOrEqual(7.0);
      expect(ratioBg).toBeGreaterThanOrEqual(7.0);
    });

    it('Texto secundario/muted cumple WCAG AA (>= 4.5:1) sobre surface y background', () => {
      const ratioSurface = getContrastRatio(light.mutedForeground, light.surface);
      const ratioBg = getContrastRatio(light.mutedForeground, light.background);

      expect(ratioSurface).toBeGreaterThanOrEqual(4.5);
      expect(ratioBg).toBeGreaterThanOrEqual(4.5);
    });

    it('Botón y elementos Primarios institucionales cumplen WCAG AAA (>= 7.0:1)', () => {
      const ratioPrimary = getContrastRatio(light.primaryForeground, light.primary);
      expect(ratioPrimary).toBeGreaterThanOrEqual(7.0);
    });

    it('Estados funcionales (Destructive, Success, Warning, Info) cumplen WCAG AA (>= 4.5:1)', () => {
      expect(getContrastRatio(light.destructiveForeground, light.destructive)).toBeGreaterThanOrEqual(4.5);
      expect(getContrastRatio(light.successForeground, light.success)).toBeGreaterThanOrEqual(4.5);
      expect(getContrastRatio(light.warningForeground, light.warning)).toBeGreaterThanOrEqual(4.5);
      expect(getContrastRatio(light.infoForeground, light.info)).toBeGreaterThanOrEqual(4.5);
    });

    it('Secundario cumple WCAG AAA (>= 7.0:1) entre texto y fondo secundario', () => {
      expect(getContrastRatio(light.secondaryForeground, light.secondary)).toBeGreaterThanOrEqual(7.0);
    });
  });

  describe('Modo Oscuro (Dark Theme)', () => {
    const dark = {
      background: '#090d16',
      foreground: '#f8fafc',
      surface: '#0f172a',
      surfaceMuted: '#1e293b',
      primary: '#38bdf8',
      primaryForeground: '#082f49',
      secondary: '#1e293b',
      secondaryForeground: '#f8fafc',
      mutedForeground: '#94a3b8',
      destructive: '#ef4444',
      destructiveForeground: '#1a0202',
      success: '#4ade80',
      successForeground: '#052e16',
      warning: '#fbbf24',
      warningForeground: '#451a03',
      info: '#38bdf8',
      infoForeground: '#082f49'
    };

    it('Texto principal tiene contraste AAA (>= 7.0:1) sobre superficies y fondo oscuro', () => {
      const ratioSurface = getContrastRatio(dark.foreground, dark.surface);
      const ratioBg = getContrastRatio(dark.foreground, dark.background);

      expect(ratioSurface).toBeGreaterThanOrEqual(7.0);
      expect(ratioBg).toBeGreaterThanOrEqual(7.0);
    });

    it('Texto muted en modo oscuro cumple WCAG AA (>= 4.5:1) sobre surface', () => {
      const ratioSurface = getContrastRatio(dark.mutedForeground, dark.surface);
      expect(ratioSurface).toBeGreaterThanOrEqual(4.5);
    });

    it('Botón y elementos Primarios en modo oscuro cumplen WCAG AA (>= 4.5:1)', () => {
      const ratioPrimary = getContrastRatio(dark.primaryForeground, dark.primary);
      expect(ratioPrimary).toBeGreaterThanOrEqual(4.5);
    });

    it('Estados funcionales en modo oscuro cumplen WCAG AA (>= 4.5:1)', () => {
      expect(getContrastRatio(dark.destructiveForeground, dark.destructive)).toBeGreaterThanOrEqual(4.5);
      expect(getContrastRatio(dark.successForeground, dark.success)).toBeGreaterThanOrEqual(4.5);
      expect(getContrastRatio(dark.warningForeground, dark.warning)).toBeGreaterThanOrEqual(4.5);
      expect(getContrastRatio(dark.infoForeground, dark.info)).toBeGreaterThanOrEqual(4.5);
    });

    it('Secundario en modo oscuro cumple WCAG AAA (>= 7.0:1)', () => {
      expect(getContrastRatio(dark.secondaryForeground, dark.secondary)).toBeGreaterThanOrEqual(7.0);
    });
  });
});
