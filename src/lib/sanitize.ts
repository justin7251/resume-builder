import DOMPurify from 'dompurify';
import { browser } from '$app/environment';

export function sanitizeHtml(html: string): string {
  if (!browser) return html;
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true }
  });
}
