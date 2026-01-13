import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import {
  LinkNotAvailableModal,
  isPlaceholderLink,
} from './LinkNotAvailableModal';

describe('LinkNotAvailableModal', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders nothing initially', () => {
    render(<LinkNotAvailableModal />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens modal when open-link-not-available-modal event is dispatched', async () => {
    render(<LinkNotAvailableModal />);

    const event = new CustomEvent('open-link-not-available-modal', {
      detail: { type: 'live', url: '#' },
    });
    window.dispatchEvent(event);

    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(screen.getByText('Demo Link')).toBeInTheDocument();
    expect(screen.getByText('Got it!')).toBeInTheDocument();
  });
});

describe('isPlaceholderLink', () => {
  it('identifies placeholder links correctly', () => {
    expect(isPlaceholderLink('#')).toBe(true);
    expect(isPlaceholderLink('https://example.com')).toBe(true);
    expect(isPlaceholderLink('https://github.com/example/repo')).toBe(true);
    expect(isPlaceholderLink('https://real-site.com')).toBe(false);
    expect(isPlaceholderLink('')).toBe(true);
  });
});
