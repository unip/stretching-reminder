import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingsForm from '../../src/renderer/components/SettingsForm';

describe('SettingsForm', () => {
  const defaultProps = {
    intervalMinutes: 30,
    workHoursStart: 9,
    workHoursEnd: 17,
    enabled: true,
    darkMode: false,
    customMessage: 'Time to stretch!',
    autoLaunch: false,
    setIntervalMinutes: vi.fn(),
    setWorkHours: vi.fn(),
    setEnabled: vi.fn(),
    setDarkMode: vi.fn(),
    setCustomMessage: vi.fn(),
    setAutoLaunch: vi.fn(),
    onSave: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display current interval setting', () => {
    render(<SettingsForm {...defaultProps} />);
    expect(screen.getByLabelText(/interval/i)).toHaveValue(30);
  });

  it('should update local state when interval changes', () => {
    render(<SettingsForm {...defaultProps} />);
    const input = screen.getByLabelText(/interval/i);
    fireEvent.change(input, { target: { value: '45' } });
    expect(input).toHaveValue(45);
  });

  it('should call setIntervalMinutes when save is clicked', () => {
    render(<SettingsForm {...defaultProps} />);
    fireEvent.change(screen.getByLabelText(/interval/i), { target: { value: '45' } });
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));
    expect(defaultProps.setIntervalMinutes).toHaveBeenCalledWith(45);
  });

  it('should display work hours settings', () => {
    render(<SettingsForm {...defaultProps} />);
    expect(screen.getByLabelText(/start time/i)).toHaveValue(9);
    expect(screen.getByLabelText(/end time/i)).toHaveValue(17);
  });

  it('should update local state when work hours change', () => {
    render(<SettingsForm {...defaultProps} />);
    const startInput = screen.getByLabelText(/start time/i);
    fireEvent.change(startInput, { target: { value: '8' } });
    expect(startInput).toHaveValue(8);
  });

  it('should call setWorkHours when save is clicked', () => {
    render(<SettingsForm {...defaultProps} />);
    fireEvent.change(screen.getByLabelText(/start time/i), { target: { value: '8' } });
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));
    expect(defaultProps.setWorkHours).toHaveBeenCalledWith(8, 17);
  });

  it('should display enabled toggle', () => {
    render(<SettingsForm {...defaultProps} />);
    const toggle = screen.getByLabelText(/enable reminders/i);
    expect(toggle).toBeChecked();
  });

  it('should update local state when enabled toggle changes', () => {
    render(<SettingsForm {...defaultProps} />);
    const toggle = screen.getByLabelText(/enable reminders/i);
    fireEvent.click(toggle);
    expect(toggle).not.toBeChecked();
  });

  it('should call setEnabled when save is clicked', () => {
    render(<SettingsForm {...defaultProps} />);
    const toggle = screen.getByLabelText(/enable reminders/i);
    fireEvent.click(toggle);
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));
    expect(defaultProps.setEnabled).toHaveBeenCalledWith(false);
  });

  it('should display dark mode toggle', () => {
    render(<SettingsForm {...defaultProps} />);
    const toggle = screen.getByLabelText(/dark mode/i);
    expect(toggle).not.toBeChecked();
  });

  it('should update local state when dark mode toggle changes', () => {
    render(<SettingsForm {...defaultProps} />);
    const toggle = screen.getByLabelText(/dark mode/i);
    fireEvent.click(toggle);
    expect(toggle).toBeChecked();
  });

  it('should call setDarkMode when save is clicked', () => {
    render(<SettingsForm {...defaultProps} />);
    const toggle = screen.getByLabelText(/dark mode/i);
    fireEvent.click(toggle);
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));
    expect(defaultProps.setDarkMode).toHaveBeenCalledWith(true);
  });

  it('should display custom message input', () => {
    render(<SettingsForm {...defaultProps} />);
    expect(screen.getByLabelText(/custom reminder message/i)).toHaveValue('Time to stretch!');
  });

  it('should update local state when message changes', () => {
    render(<SettingsForm {...defaultProps} />);
    const input = screen.getByLabelText(/custom reminder message/i);
    fireEvent.change(input, { target: { value: 'New message!' } });
    expect(input).toHaveValue('New message!');
  });

  it('should call setCustomMessage when save is clicked', () => {
    render(<SettingsForm {...defaultProps} />);
    const input = screen.getByLabelText(/custom reminder message/i);
    fireEvent.change(input, { target: { value: 'New message!' } });
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));
    expect(defaultProps.setCustomMessage).toHaveBeenCalledWith('New message!');
  });

  it('should display save button', () => {
    render(<SettingsForm {...defaultProps} />);
    expect(screen.getByRole('button', { name: /no changes/i })).toBeInTheDocument();
  });

  it('should enable save button when changes are made', () => {
    render(<SettingsForm {...defaultProps} />);
    const input = screen.getByLabelText(/interval/i);
    fireEvent.change(input, { target: { value: '45' } });
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  it('should call all save handlers when save is clicked', () => {
    render(<SettingsForm {...defaultProps} />);
    fireEvent.change(screen.getByLabelText(/interval/i), { target: { value: '45' } });
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));
    expect(defaultProps.setIntervalMinutes).toHaveBeenCalledWith(45);
    expect(defaultProps.onSave).toHaveBeenCalledTimes(1);
  });
});
