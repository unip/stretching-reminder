import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingsForm from '../renderer/components/SettingsForm';

describe('SettingsForm', () => {
  const defaultProps = {
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
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display current interval setting', () => {
    render(<SettingsForm {...defaultProps} />);
    expect(screen.getByLabelText(/interval/i)).toHaveValue(30);
  });

  it('should call setIntervalMinutes when interval changes', () => {
    render(<SettingsForm {...defaultProps} />);
    const input = screen.getByLabelText(/interval/i);
    fireEvent.change(input, { target: { value: '45' } });
    expect(defaultProps.setIntervalMinutes).toHaveBeenCalledWith(45);
  });

  it('should display work hours settings', () => {
    render(<SettingsForm {...defaultProps} />);
    expect(screen.getByLabelText(/start time/i)).toHaveValue(9);
    expect(screen.getByLabelText(/end time/i)).toHaveValue(17);
  });

  it('should call setWorkHours when work hours change', () => {
    render(<SettingsForm {...defaultProps} />);
    const startInput = screen.getByLabelText(/start time/i);
    fireEvent.change(startInput, { target: { value: '8' } });
    expect(defaultProps.setWorkHours).toHaveBeenCalledWith(8, 17);
  });

  it('should display enabled toggle', () => {
    render(<SettingsForm {...defaultProps} />);
    const toggle = screen.getByLabelText(/enable reminders/i);
    expect(toggle).toBeChecked();
  });

  it('should call toggleEnabled when toggle changes', () => {
    render(<SettingsForm {...defaultProps} />);
    const toggle = screen.getByLabelText(/enable reminders/i);
    fireEvent.click(toggle);
    expect(defaultProps.toggleEnabled).toHaveBeenCalledTimes(1);
  });

  it('should display dark mode toggle', () => {
    render(<SettingsForm {...defaultProps} />);
    const toggle = screen.getByLabelText(/dark mode/i);
    expect(toggle).not.toBeChecked();
  });

  it('should call toggleDarkMode when toggle changes', () => {
    render(<SettingsForm {...defaultProps} />);
    const toggle = screen.getByLabelText(/dark mode/i);
    fireEvent.click(toggle);
    expect(defaultProps.toggleDarkMode).toHaveBeenCalledTimes(1);
  });

  it('should display custom message input', () => {
    render(<SettingsForm {...defaultProps} />);
    expect(screen.getByLabelText(/custom reminder message/i)).toHaveValue('Time to stretch!');
  });

  it('should call setCustomMessage when message changes', () => {
    render(<SettingsForm {...defaultProps} />);
    const input = screen.getByLabelText(/custom reminder message/i);
    fireEvent.change(input, { target: { value: 'New message!' } });
    expect(defaultProps.setCustomMessage).toHaveBeenCalledWith('New message!');
  });

  it('should display save button', () => {
    render(<SettingsForm {...defaultProps} />);
    expect(screen.getByRole('button', { name: /save settings/i })).toBeInTheDocument();
  });
});
