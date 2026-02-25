import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import SettingsPage from '../renderer/pages/SettingsPage';

describe('SettingsPage', () => {
  const mockStore = {
    getState: vi.fn(() => ({
      intervalMinutes: 30,
      workHoursStart: 9,
      workHoursEnd: 17,
      enabled: true,
      darkMode: false,
      customMessage: 'Time to stretch!',
      setIntervalMinutes: vi.fn(),
      setWorkHours: vi.fn(),
      toggleEnabled: vi.fn(),
      toggleDarkMode: vi.fn(),
      setCustomMessage: vi.fn(),
      resetToDefaults: vi.fn(),
    })),
    subscribe: vi.fn(() => vi.fn()),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render settings page header', () => {
    render(<SettingsPage store={mockStore as any} />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('should render settings form with store values', () => {
    render(<SettingsPage store={mockStore as any} />);
    
    expect(screen.getByLabelText(/interval/i)).toHaveValue(30);
    expect(screen.getByLabelText(/start time/i)).toHaveValue(9);
    expect(screen.getByLabelText(/end time/i)).toHaveValue(17);
    expect(screen.getByLabelText(/enable reminders/i)).toBeChecked();
    expect(screen.getByLabelText(/dark mode/i)).not.toBeChecked();
  });

  it('should render back button', () => {
    render(<SettingsPage store={mockStore as any} onBack={vi.fn()} />);
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });
});
