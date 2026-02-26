import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressRing from '../../src/renderer/components/ProgressRing';

describe('ProgressRing', () => {
  it('should render progress ring with correct size', () => {
    render(<ProgressRing progress={50} size={200} strokeWidth={10} />);
    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
  });

  it('should display progress percentage', () => {
    render(<ProgressRing progress={75} size={200} strokeWidth={10} showPercentage />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('should not display percentage when showPercentage is false', () => {
    render(<ProgressRing progress={75} size={200} strokeWidth={10} showPercentage={false} />);
    expect(screen.queryByText('75%')).not.toBeInTheDocument();
  });

  it('should apply color based on progress level', () => {
    const { container: high } = render(<ProgressRing progress={80} size={200} strokeWidth={10} />);
    // Select the second circle (progress circle, not background)
    const progressCircle = high.querySelectorAll('circle')[1];
    expect(progressCircle).toHaveAttribute('stroke', '#22c55e'); // green-500

    const { container: medium } = render(<ProgressRing progress={40} size={200} strokeWidth={10} />);
    const mediumCircle = medium.querySelectorAll('circle')[1];
    expect(mediumCircle).toHaveAttribute('stroke', '#eab308'); // yellow-500

    const { container: low } = render(<ProgressRing progress={15} size={200} strokeWidth={10} />);
    const lowCircle = low.querySelectorAll('circle')[1];
    expect(lowCircle).toHaveAttribute('stroke', '#ef4444'); // red-500
  });

  it('should calculate correct stroke dasharray', () => {
    const size = 200;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    render(<ProgressRing progress={50} size={size} strokeWidth={strokeWidth} />);

    const circle = screen.getByRole('img').querySelector('circle:nth-child(2)');
    expect(circle).toHaveAttribute('stroke-dasharray', circumference.toString());
  });

  it('should animate on completion', () => {
    const { container } = render(<ProgressRing progress={100} size={200} strokeWidth={10} isComplete />);
    const circle = container.querySelector('circle:nth-child(2)');
    expect(circle).toHaveClass('animate-pulse');
  });
});
