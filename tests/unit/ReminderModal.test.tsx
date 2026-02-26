import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ReminderModal from '../../src/renderer/components/ReminderModal';
import type { Exercise } from '../../src/renderer/data/exerciseLibrary';

describe('ReminderModal', () => {
  const mockExercise: Exercise = {
    id: 'neck-1',
    name: 'Neck Tilt',
    description: 'Tilt your head to one side, hold for 15 seconds.',
    duration: '15-20 seconds each side',
    category: 'neck',
    difficulty: 'easy',
    instructions: [
      'Sit or stand with your back straight',
      'Slowly tilt your head to the right',
      'Hold for 15-20 seconds',
      'Repeat on the left side',
    ],
  };

  const defaultProps = {
    isOpen: true,
    message: 'Time to stretch!',
    exercise: mockExercise,
    onSnooze: vi.fn(),
    onSkip: vi.fn(),
    onClose: vi.fn(),
  };

  it('should not render when isOpen is false', () => {
    const { container } = render(<ReminderModal {...defaultProps} isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render message when open', () => {
    render(<ReminderModal {...defaultProps} />);
    expect(screen.getByText('Time to stretch!')).toBeInTheDocument();
  });

  it('should render exercise suggestion', () => {
    render(<ReminderModal {...defaultProps} />);
    expect(screen.getByText(/Neck Tilt/i)).toBeInTheDocument();
    expect(screen.getByText(/Tilt your head/i)).toBeInTheDocument();
    expect(screen.getByText(/15-20 seconds/i)).toBeInTheDocument();
  });

  it('should show snooze options when snooze button is clicked', () => {
    render(<ReminderModal {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /snooze/i }));
    expect(screen.getByRole('button', { name: '5 min' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '10 min' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '15 min' })).toBeInTheDocument();
  });

  it('should call onSkip when skip button is clicked', () => {
    render(<ReminderModal {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /skip/i }));
    expect(defaultProps.onSkip).toHaveBeenCalledTimes(1);
  });

  it('should call onSnooze with selected minutes when time option is clicked', () => {
    const onSnooze = vi.fn();
    render(<ReminderModal {...defaultProps} onSnooze={onSnooze} />);
    fireEvent.click(screen.getByRole('button', { name: /snooze/i }));
    fireEvent.click(screen.getByRole('button', { name: '10 min' }));
    expect(onSnooze).toHaveBeenCalledWith(10);
  });

  it('should call onClose when close button is clicked', () => {
    render(<ReminderModal {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('should display custom message indicator for non-default messages', () => {
    const customProps = {
      ...defaultProps,
      message: 'Drink water and stretch!',
    };
    render(<ReminderModal {...customProps} />);
    expect(screen.getByText(/custom reminder/i)).toBeInTheDocument();
  });

  it('should not display custom message indicator for default messages', () => {
    const defaultMsgProps = {
      ...defaultProps,
      message: 'Time to stretch!',
    };
    render(<ReminderModal {...defaultMsgProps} />);
    expect(screen.queryByText(/custom reminder/i)).not.toBeInTheDocument();
  });
});
