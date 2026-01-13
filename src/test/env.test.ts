import { describe, it, expect } from 'vitest';
import { SITE, PUBLIC_EMAIL } from '../lib/env';

describe('Environment Variables', () => {
  it('should have SITE defined', () => {
    expect(SITE).toBeDefined();
    expect(typeof SITE).toBe('string');
  });

  it('should have PUBLIC_EMAIL defined', () => {
    expect(PUBLIC_EMAIL).toBeDefined();
    expect(typeof PUBLIC_EMAIL).toBe('string');
    expect(PUBLIC_EMAIL).toContain('@');
  });
});
