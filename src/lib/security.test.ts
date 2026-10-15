import { describe, it, expect } from 'vitest';
import { isSafeUrl, escapeHtml, stripHtml } from './security';

describe('Security Utilities', () => {
  describe('isSafeUrl', () => {
    it('accepts safe absolute URLs', () => {
      expect(isSafeUrl('https://example.com')).toBe(true);
      expect(isSafeUrl('http://localhost:3000')).toBe(true);
      expect(isSafeUrl('mailto:support@alcspower.com')).toBe(true);
      expect(isSafeUrl('tel:+1234567890')).toBe(true);
    });

    it('accepts safe relative URLs and hashes', () => {
      expect(isSafeUrl('/dashboard')).toBe(true);
      expect(isSafeUrl('./settings')).toBe(true);
      expect(isSafeUrl('../profile')).toBe(true);
      expect(isSafeUrl('#section-1')).toBe(true);
    });

    it('rejects unsafe schemes and payloads', () => {
      expect(isSafeUrl('javascript:alert(1)')).toBe(false);
      expect(isSafeUrl('JAVASCRIPT:alert(1)')).toBe(false);
      expect(isSafeUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
      expect(isSafeUrl('vbscript:msgbox(1)')).toBe(false);
    });

    it('handles falsy or empty values gracefully', () => {
      expect(isSafeUrl('')).toBe(false);
      expect(isSafeUrl('   ')).toBe(false);
      expect(isSafeUrl(null)).toBe(false);
      expect(isSafeUrl(undefined)).toBe(false);
    });
  });

  describe('escapeHtml', () => {
    it('escapes &, <, >, ", and \'', () => {
      expect(escapeHtml('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
      );
      expect(escapeHtml("Tom & 'Jerry'")).toBe('Tom &amp; &#39;Jerry&#39;');
    });

    it('handles falsy or empty values gracefully', () => {
      expect(escapeHtml('')).toBe('');
      expect(escapeHtml(null)).toBe('');
      expect(escapeHtml(undefined)).toBe('');
    });
  });

  describe('stripHtml', () => {
    it('removes tags while preserving inner text', () => {
      expect(stripHtml('<p>Hello <strong>World</strong>!</p>')).toBe('Hello World!');
      expect(stripHtml('<span class="chip">Active</span>')).toBe('Active');
    });

    it('handles falsy or empty values gracefully', () => {
      expect(stripHtml('')).toBe('');
      expect(stripHtml(null)).toBe('');
      expect(stripHtml(undefined)).toBe('');
    });
  });
});
