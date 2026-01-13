import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ReadingProgress from './ReadingProgress';

// Mock framer-motion since useScroll depends on window scroll events
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useScroll: () => ({
      scrollYProgress: {
        get: () => 0.5,
        onChange: vi.fn(),
      },
    }),
    useSpring: (val: unknown) => val,
  };
});

describe('ReadingProgress', () => {
  it('renders the progress bar', () => {
    render(<ReadingProgress />);
    const progressBar = screen.getByTestId('reading-progress');
    expect(progressBar).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<ReadingProgress />);
    const progressBar = screen.getByTestId('reading-progress');
    expect(progressBar).toHaveAttribute('aria-hidden', 'true');
  });

  it('is fixed at the top of the screen', () => {
    render(<ReadingProgress />);
    const progressBar = screen.getByTestId('reading-progress');
    expect(progressBar).toHaveClass('fixed', 'top-0', 'left-0', 'right-0');
  });
});
