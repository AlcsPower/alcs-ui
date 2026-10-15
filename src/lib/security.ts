/**
 * @alcspower/ui — Security Utilities
 * Zero-dependency helpers for safe string handling, URL validation, and XSS defense.
 */

const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);

/**
 * Validates whether a provided URL or URI scheme is safe for anchor hrefs and redirects.
 * Disallows malicious schemes such as `javascript:`, `data:`, and `vbscript:`.
 *
 * @param url The URL string to test
 * @returns `true` if the URL is relative or uses an allowed safe protocol; otherwise `false`
 */
export function isSafeUrl(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;

  const trimmed = url.trim();
  if (trimmed.length === 0) return false;

  // Relative URLs and anchor hashes are safe
  if (trimmed.startsWith('/') || trimmed.startsWith('#') || trimmed.startsWith('./') || trimmed.startsWith('../')) {
    return true;
  }

  try {
    const parsed = new URL(trimmed);
    return SAFE_PROTOCOLS.has(parsed.protocol.toLowerCase());
  } catch {
    // If not a valid absolute URL and does not start with relative slash, reject
    return false;
  }
}

const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Escapes common HTML special characters to prevent cross-site scripting (XSS).
 *
 * @param text The string to escape
 * @returns Escaped safe string
 */
export function escapeHtml(text?: string | null): string {
  if (!text || typeof text !== 'string') return '';
  return text.replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char] || char);
}

/**
 * Strips HTML tags from an arbitrary string, returning pure plain text.
 * Useful for normalizing titles, tooltips, and badges.
 *
 * @param text The input text potentially containing markup
 * @returns Plain text without HTML tags
 */
export function stripHtml(text?: string | null): string {
  if (!text || typeof text !== 'string') return '';
  return text.replace(/<[^>]*>/g, '').trim();
}
