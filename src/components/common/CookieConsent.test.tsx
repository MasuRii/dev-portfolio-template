import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CookieConsent from './CookieConsent';

describe('CookieConsent', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  it('should show the consent banner after a delay if no preference is stored', async () => {
    render(<CookieConsent />);

    expect(screen.queryByRole('region')).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Cookie/i })
    ).toBeInTheDocument();
  });

  it('should not show the banner if preference is already stored', () => {
    localStorage.setItem('cookie-consent', 'accepted');
    render(<CookieConsent />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('should store "accepted" in localStorage when Accept All is clicked', async () => {
    render(<CookieConsent />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const acceptButton = screen.getByText(/Accept All/i);
    fireEvent.click(acceptButton);

    expect(localStorage.getItem('cookie-consent')).toBe('accepted');

    // Banner should disappear (AnimatePresence makes it tricky to test immediately without waiting for exit animation)
  });

  it('should store "declined" in localStorage when Decline is clicked', () => {
    render(<CookieConsent />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const declineButton = screen.getByText(/Decline/i);
    fireEvent.click(declineButton);

    expect(localStorage.getItem('cookie-consent')).toBe('declined');
  });
});
