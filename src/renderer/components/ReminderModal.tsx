import { useState, useEffect } from 'react';
import type { Exercise } from '../data/exerciseLibrary';

interface ReminderModalProps {
  isOpen: boolean;
  message: string;
  exercise: Exercise;
  onSnooze: (minutes?: number) => void;
  onSkip: () => void;
  onClose: () => void;
}

const EXERCISES = []; // Kept for backwards compatibility, use exerciseLibrary instead

export default function ReminderModal({
  isOpen,
  message,
  exercise,
  onSnooze,
  onSkip,
  onClose,
}: ReminderModalProps) {
  const [showSnoozeOptions, setShowSnoozeOptions] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedSnooze, setSelectedSnooze] = useState<number>(5); // Default 5 min

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      // Number keys 1-3 for quick snooze
      if (showSnoozeOptions) {
        if (e.key === '1') handleSnoozeSelect(5);
        if (e.key === '2') handleSnoozeSelect(10);
        if (e.key === '3') handleSnoozeSelect(15);
        if (e.key === 'Escape') setShowSnoozeOptions(false);
      } else {
        if (e.key === 's' || e.key === 'S') handleSnoozeClick();
        if (e.key === 'k' || e.key === 'K') onSkip();
        if (e.key === 'Escape') onClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, showSnoozeOptions, onSnooze, onSkip, onClose]);

  if (!isOpen) return null;

  const handleSnoozeClick = () => {
    setShowSnoozeOptions(true);
  };

  const handleSnoozeSelect = (minutes: number) => {
    setSelectedSnooze(minutes);
    onSnooze(minutes);
    setShowSnoozeOptions(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card max-w-md w-full relative animate-bounce-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">🧘</div>
          <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {message}
          </h2>
          {message !== 'Time to stretch!' && message !== 'Time for a quick stretch!' && (
            <p className="text-xs text-primary-500 dark:text-primary-400 mt-2 italic">
              ✨ Your custom reminder
            </p>
          )}
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Take a quick break to stretch!
          </p>
        </div>

        {/* Exercise Suggestion */}
        {exercise && (
        <div className="bg-primary-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-primary-700 dark:text-primary-300">
              💡 {exercise.name || 'Stretch'}
            </h3>
            <span className="text-xs px-2 py-1 bg-primary-200 dark:bg-primary-800 text-primary-800 dark:text-primary-200 rounded capitalize">
              {exercise.category || 'general'}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-2">{exercise.description || 'Take a moment to stretch.'}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ⏱ {exercise.duration || '1-2 minutes'}
          </p>
          
          {/* Expandable Instructions */}
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="mt-3 text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            {showInstructions ? 'Hide instructions' : 'Show instructions'} ↓
          </button>
          
          {showInstructions && exercise.instructions && exercise.instructions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-primary-200 dark:border-gray-600">
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
        )}

        {/* Action Buttons */}
        {!showSnoozeOptions ? (
          <div className="space-y-3">
            <div className="flex gap-3">
              <button 
                onClick={handleSnoozeClick} 
                className="btn-secondary flex-1"
                title="Press S"
              >
                ⏰ Snooze
              </button>
              <button 
                onClick={onSkip} 
                className="btn-secondary flex-1"
                title="Press K"
              >
                ⏭ Skip
              </button>
            </div>
            {/* Quick Snooze Preview */}
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Press <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">S</kbd> to snooze for {selectedSnooze} min
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              Remind me in:
            </p>
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => handleSnoozeSelect(5)} 
                className={`btn-secondary flex-1 flex flex-col items-center py-3 ${selectedSnooze === 5 ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900' : ''}`}
                title="Press 1"
              >
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">5</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">minutes</span>
              </button>
              <button 
                onClick={() => handleSnoozeSelect(10)} 
                className={`btn-secondary flex-1 flex flex-col items-center py-3 ${selectedSnooze === 10 ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900' : ''}`}
                title="Press 2"
              >
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">10</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">minutes</span>
              </button>
              <button 
                onClick={() => handleSnoozeSelect(15)} 
                className={`btn-secondary flex-1 flex flex-col items-center py-3 ${selectedSnooze === 15 ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900' : ''}`}
                title="Press 3"
              >
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">15</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">minutes</span>
              </button>
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Press <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">1</kbd>, <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">2</kbd>, or <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">3</kbd> to select
            </p>
            <button
              onClick={() => setShowSnoozeOptions(false)}
              className="w-full text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mt-2"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { EXERCISES };
