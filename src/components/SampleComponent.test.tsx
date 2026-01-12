import { render, screen } from '../test/utils';
import { SampleComponent } from './SampleComponent';
import { describe, it, expect } from 'vitest';
import React from 'react';

describe('SampleComponent', () => {
  it('renders correctly', () => {
    render(<SampleComponent />);
    expect(screen.getByText('Sample Component')).toBeInTheDocument();
    expect(
      screen.getByText('This is a sample component for testing.')
    ).toBeInTheDocument();
  });
});
