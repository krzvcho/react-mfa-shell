
// BloodRecordsListItem.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BloodRecordsListItem from '../BloodRecordsListItem';

const mockRecord = {
  id: 1,
  systolic: 120,
  diastolic: 80,
  pulse: 70,
  measuredAt: '2024-06-01T12:34:56.000Z',
};

describe('BloodRecordsListItem', () => {
  it('renders blood pressure values correctly', () => {
    render(<BloodRecordsListItem record={mockRecord} />);
    expect(screen.getByText(/120 \/ 80 mmHg/i)).toBeInTheDocument();
    expect(screen.getByText(/Pulse: 70 bpm/i)).toBeInTheDocument();
    // The date string depends on locale, so match part of it
    expect(screen.getByText(/Measured At:/i)).toBeInTheDocument();
  });

  it('renders the Card component', () => {
    const { container } = render(<BloodRecordsListItem record={mockRecord} />);
    // MUI Card renders as a <div> with role="region"
    expect(container.querySelector('.MuiCard-root')).not.toBeNull();
  });
});