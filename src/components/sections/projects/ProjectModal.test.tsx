import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import { ProjectModal } from './ProjectModal';
import type { Project } from '../../../types/project';

const mockProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Project One',
    description: 'Description One',
    summary: 'Summary One',
    category: 'Web',
    thumbnail: '/thumb1.jpg',
    imageAlt: 'Alt One',
    tags: ['React'],
    technologies: ['React', 'TypeScript'],
    links: {
      live: 'https://example.com',
      github: 'https://github.com/example/repo',
    },
    featured: true,
    challenges: 'Challenge One',
    solutions: 'Solution One',
    metrics: [{ label: 'Performance', value: '100%' }],
  },
];

describe('ProjectModal', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders nothing when no project is selected', () => {
    render(<ProjectModal projects={mockProjects} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens modal when open-project-modal event is dispatched', async () => {
    render(<ProjectModal projects={mockProjects} />);

    // Dispatch custom event to open modal
    const event = new CustomEvent('open-project-modal', {
      detail: 'project-1',
    });
    window.dispatchEvent(event);

    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(screen.getByText('Project One')).toBeInTheDocument();
    expect(screen.getByText('Description One')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    render(<ProjectModal projects={mockProjects} />);

    window.dispatchEvent(
      new CustomEvent('open-project-modal', { detail: 'project-1' })
    );

    const closeButton = await screen.findByLabelText('Close modal');
    fireEvent.click(closeButton);

    await waitFor(
      () => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
