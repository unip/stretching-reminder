interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
  isComplete?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function ProgressRing({
  progress,
  size = 200,
  strokeWidth = 10,
  showPercentage = true,
  isComplete = false,
  className = '',
  children,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  // Determine color based on progress level
  const getProgressColor = (): string => {
    if (progress >= 60) return '#22c55e'; // green-500
    if (progress >= 30) return '#eab308'; // yellow-500
    return '#ef4444'; // red-500
  };

  const strokeColor = getProgressColor();

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        role="img"
        aria-label={`Progress: ${Math.round(progress)}%`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          className="dark:stroke-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`transition-all duration-500 ease-out ${isComplete ? 'animate-pulse' : ''}`}
          style={{
            transitionProperty: 'stroke-dashoffset, stroke',
          }}
        />
      </svg>
      {/* Percentage text or children */}
      {showPercentage && !children && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            {Math.round(progress)}%
          </span>
        </div>
      )}
      {/* Custom children content */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
