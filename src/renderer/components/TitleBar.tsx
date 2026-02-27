export default function TitleBar() {
  const handleMinimize = () => {
    window.electron?.send('window-minimize');
    console.log('Window minimize sent');
  };

  const handleMaximize = () => {
    window.electron?.send('window-maximize');
    console.log('Window maximize sent');
  };

  const handleClose = () => {
    window.electron?.send('window-close');
    console.log('Window close sent');
  };

  return (
    <div 
      className="h-10 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-gray-800 dark:to-gray-900 flex items-center justify-between px-3 select-none"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      {/* App Title */}
      <div className="flex items-center gap-2">
        <span className="text-lg">🧘</span>
        <span className="text-sm font-medium text-white">Stretching Reminder</span>
      </div>

      {/* Window Controls */}
      <div className="flex items-center gap-1" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        {/* Minimize */}
        <button
          onClick={handleMinimize}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/20 text-white transition-colors"
          title="Minimize"
          aria-label="Minimize"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>

        {/* Maximize/Restore */}
        <button
          onClick={handleMaximize}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/20 text-white transition-colors"
          title="Maximize"
          aria-label="Maximize"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V5a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H9a1 1 0 01-1-1z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 13v6a1 1 0 01-1 1H9a1 1 0 01-1-1v-6a1 1 0 011-1h6a1 1 0 011 1z" />
          </svg>
        </button>

        {/* Close */}
        <button
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-500 text-white transition-colors"
          title="Close"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
