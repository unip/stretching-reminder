import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TimerDisplay from '../../src/renderer/components/TimerDisplay';

describe('TimerDisplay', () => {
  it('should display remaining time in MM:SS format', () => {
    render(<TimerDisplay remainingTime={5 * 60 * 1000} />); // 5 minutes
    // Time is displayed inside ProgressRing, use text matcher
    expect(screen.getByText((text) => text.includes('05:00'))).toBeInTheDocument();
  });

  it('should display hours when time is greater than 60 minutes', () => {
    render(<TimerDisplay remainingTime={90 * 60 * 1000} />); // 90 minutes
    expect(screen.getByText((text) => text.includes('01:30:00'))).toBeInTheDocument();
  });

  it('should show paused state when isPaused is true', () => {
    const { container } = render(
      <TimerDisplay remainingTime={5 * 60 * 1000} isPaused={true} />
    );
    expect(container.querySelector('[data-testid="paused-indicator"]')).toBeInTheDocument();
  });

  it('should not show paused state when isPaused is false', () => {
    const { container } = render(
      <TimerDisplay remainingTime={5 * 60 * 1000} isPaused={false} />
    );
    expect(container.querySelector('[data-testid="paused-indicator"]')).not.toBeInTheDocument();
  });

  it('should call onPause when pause button is clicked', () => {
    const onPause = vi.fn();
    render(
      <TimerDisplay
        remainingTime={5 * 60 * 1000}
        isPaused={false}
        onPause={onPause}
        onResume={vi.fn()}
      />
    );
    screen.getByRole('button', { name: /pause/i }).click();
    expect(onPause).toHaveBeenCalledTimes(1);
  });

  it('should call onResume when resume button is clicked', () => {
    const onResume = vi.fn();
    render(
      <TimerDisplay
        remainingTime={5 * 60 * 1000}
        isPaused={true}
        onPause={vi.fn()}
        onResume={onResume}
      />
    );
    screen.getByRole('button', { name: /resume/i }).click();
    expect(onResume).toHaveBeenCalledTimes(1);
  });

  it('should call onReset when reset button is clicked', () => {
    const onReset = vi.fn();
    render(
      <TimerDisplay
        remainingTime={5 * 60 * 1000}
        isPaused={false}
        onPause={vi.fn()}
        onResume={vi.fn()}
        onReset={onReset}
      />
    );
    screen.getByRole('button', { name: /reset/i }).click();
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
