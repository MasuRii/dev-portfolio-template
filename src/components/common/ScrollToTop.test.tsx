import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScrollToTop } from './ScrollToTop';

describe('ScrollToTop', () => {
  beforeEach(() => {
    vi.stubGlobal('scrollTo', vi.fn());
    // Reset window scroll position
    vi.stubGlobal('scrollY', 0);
  });

  it('is not visible initially', () => {
    render(<ScrollToTop />);
    expect(screen.queryByLabelText('Scroll to top')).not.toBeInTheDocument();
  });

  it('becomes visible after scrolling down', async () => {
    render(<ScrollToTop />);

    // Simulate scroll
    vi.stubGlobal('scrollY', 400);
    fireEvent.scroll(window);

    expect(await screen.findByLabelText('Scroll to top')).toBeInTheDocument();
  });

  it('scrolls to top when clicked', async () => {
    const scrollToSpy = vi.fn();
    vi.stubGlobal('scrollTo', scrollToSpy);
    vi.stubGlobal('scrollY', 400);

    render(<ScrollToTop />);
    fireEvent.scroll(window);

    const button = await screen.findByLabelText('Scroll to top');
    fireEvent.click(button);

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
