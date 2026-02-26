# Stretching Reminder - TODO List

Last updated: February 26, 2026

---

## 🔴 HIGH PRIORITY - Core Features

### Auto-Launch ✅
- [x] Write test: Enable adds to startup
- [x] Write test: Disable removes from startup
- [x] Implement auto-launch wrapper (use `auto-launch` package)
- [x] Add settings toggle for auto-launch
- [x] Cross-platform support (Windows, macOS, Linux)

**Features Implemented:**
- [x] Start app on system login
- [x] Enable/disable in settings
- [x] AutoLaunchService class with enable/disable/toggle/check methods
- [x] Settings persistence for auto-launch preference

---

### Work Hours Enforcement ✅
- [x] Write test: Timer only runs during work hours
- [x] Write test: Timer pauses outside work hours
- [x] Implement work hours check in timer service
- [x] Add UI indicator when paused due to work hours
- [x] Update tray tooltip to show "Outside work hours" when applicable

**Features Implemented:**
- [x] Respect configured work hours (start/end)
- [x] Auto-pause outside work hours
- [x] Visual indicator in UI and tray tooltip
- [x] Static method `TimerService.isWithinWorkHours()` for testing

---

### Notification Actions ✅
- [x] Write test: Notification shows action buttons
- [x] Write test: Snooze action triggers callback
- [x] Write test: Skip action triggers callback
- [x] Implement notification action handlers
- [x] Connect actions to timer service

**Features Implemented:**
- [x] Native desktop notifications with Snooze 5 min and Skip buttons
- [x] NotificationService extends EventEmitter for action events
- [x] Main process handles actions and controls timer
- [x] Renderer listens for notification actions via IPC
- [x] Auto-snooze (5 min) and skip functionality

---

### Tray Tooltip (Dynamic) ✅
- [x] Update tooltip on timer tick
- [x] Handle paused state in tooltip
- [x] Handle work hours state in tooltip

**Features Implemented:**
- [x] Dynamic updates every second during timer tick
- [x] Shows "Next break in X min" when running
- [x] Shows "Outside work hours - timer paused" when applicable

---

## 🟡 MEDIUM PRIORITY - UX Improvements

### Sound Notification ✅
- [x] Write test: Sound plays on reminder
- [x] Write test: Sound can be enabled/disabled
- [x] Write test: Custom sound selection works
- [x] Implement sound player service
- [x] Add sound toggle to settings
- [x] Persist sound preference

**Features Implemented:**
- [x] Play sound when reminder appears
- [x] Enable/disable in settings
- [x] Web Audio API implementation (no external files)
- [x] Gentle ascending tone pattern (C5-E5-G5)
- [x] Sound preference persistence

---

### Window Customization
- [ ] Write test: Custom title displays in header
- [ ] Write test: Custom buttons respond to clicks
- [ ] Write test: Buttons match dark/light theme
- [ ] Implement custom title bar component
- [ ] Style minimize/close buttons with Tailwind
- [ ] Add custom title setting to settings page
- [ ] Make buttons theme-aware (dark/light mode)

**Features:**
- Custom app title in window header
- Themed window control buttons
- Consistent with primary/accent colors
- Dark mode support
- Frameless window option (optional)

---

### Progress Indicator ✅
- [x] Write test: Progress ring displays correctly
- [x] Write test: Progress updates every second
- [x] Implement progress ring component
- [x] Integrate with TimerDisplay
- [x] Add visual completion animation

**Features Implemented:**
- [x] Circular progress ring around timer (SVG)
- [x] Smooth stroke-dashoffset animation
- [x] Color changes (green → yellow → red)
- [x] Pulse animation on completion
- [x] Time displayed inside ring

---

### Stretch Exercise Library
- [ ] Write test: Exercise library contains all exercises
- [ ] Write test: Exercises rotate without immediate repeats
- [ ] Implement exercise data structure
- [ ] Add exercise descriptions/instructions
- [ ] Add exercise illustrations (optional)
- [ ] Implement smart rotation algorithm

**Current Status:** Random exercise from small array
**Needed:** Full library, no repeats, better variety

**Exercises to Add:**
- Neck stretches
- Shoulder rolls
- Arm stretches
- Wrist stretches
- Back stretches
- Leg stretches
- Seated twists
- Standing stretches

---

### Snooze Options (5/10/15 min)
- [ ] Write test: Snooze modal shows all options
- [ ] Write test: Each option sets correct interval
- [ ] Implement snooze selection UI
- [ ] Connect to timer service
- [ ] Add keyboard shortcuts (optional)

**Current Status:** Basic snooze function exists
**Needed:** User selection UI with 5/10/15 min options

---

### Custom Messages Display
- [ ] Write test: Custom message appears in reminder
- [ ] Write test: Default message shows when custom is empty
- [ ] Update ReminderModal to display custom message
- [ ] Add character limit validation
- [ ] Add preview in settings

**Current Status:** Settings save but not displayed
**Needed:** Display in reminder modal

---

### Enabled/Disabled Toggle
- [ ] Write test: Toggle enables/disables reminders
- [ ] Write test: Disabled state persists
- [ ] Add toggle to SettingsPage
- [ ] Update timer service to respect enabled state
- [ ] Add visual indicator in main UI

**Features:**
- Quick enable/disable from settings
- Visual indicator when disabled
- Tray menu quick toggle

---

## 🟢 LOW PRIORITY - Polish & Testing

### Playful Animations
- [ ] Write test: Modal animation plays on open
- [ ] Implement modal entrance animation
- [ ] Add exercise illustration animations
- [ ] Add completion celebration animation
- [ ] Add smooth transitions

**Features:**
- Fade/slide modal entrance
- Bouncing/stretching exercise icons
- Confetti or pulse on completion
- Smooth state transitions

---

### IPC Handler Tests
- [ ] Write test: get-settings handler returns settings
- [ ] Write test: set-interval handler updates settings
- [ ] Write test: timer handlers control timer
- [ ] Write test: notification handlers show notifications
- [ ] Write test: settings change events emit

**Files to Test:**
- `src/main/ipcHandlers.ts`

---

### Manual Testing Checklist

#### Cross-Platform Testing
- [ ] Notifications work on Linux
- [ ] Notifications work on macOS
- [ ] Notifications work on Windows
- [ ] System tray works on Linux
- [ ] System tray works on macOS
- [ ] System tray works on Windows
- [ ] Auto-launch works on Linux
- [ ] Auto-launch works on macOS
- [ ] Auto-launch works on Windows

#### Stability Testing
- [ ] Settings persist after app restart
- [ ] No memory leaks after extended use (1+ hour)
- [ ] Timer accuracy over long periods
- [ ] Multiple monitor support
- [ ] Minimize/restore behavior

---

### Code Signing (Distribution)
- [ ] Research code signing requirements
- [ ] Obtain certificates (if needed)
- [ ] Configure electron-builder for signing
- [ ] Test signed builds

---

### Auto-Update (Optional)
- [ ] Integrate electron-updater
- [ ] Configure update server (GitHub Releases)
- [ ] Add auto-update preferences
- [ ] Test update flow
- [ ] Handle update errors gracefully

---

## ✅ COMPLETED FEATURES

### Project Setup & Infrastructure ✅
- [x] Initialize project with Vite + Electron + TypeScript
- [x] Configure Tailwind CSS
- [x] Set up ESLint + Prettier (v9 flat config)
- [x] Configure Vitest for unit testing
- [x] Configure Playwright for E2E testing
- [x] Set up folder structure

**Acceptance Criteria Met:**
- [x] `npm run dev` launches dev server with hot reload
- [x] `npm run test` runs all tests (66 passing)
- [x] `npm run build` produces production build
- [x] Tailwind classes apply correctly

---

### Backend (Main Process) ✅

#### Timer Service ✅
- [x] Write test: Timer emits event after interval
- [x] Write test: Timer can be paused/resumed
- [x] Write test: Timer can be reset
- [x] Implement timer service
- [x] Refactor for clean API

**Features Implemented:**
- [x] Configurable interval (default: 30 min)
- [x] Pause/Resume/Reset controls
- [x] Event emission for UI updates

#### Notification Service ✅
- [x] Write test: Notification shows with title/body
- [x] Implement notification wrapper
- [x] Refactor for reusability

**Features Implemented:**
- [x] Native desktop notifications
- [x] Permission handling

**Note:** Action buttons pending (see High Priority)

#### Settings Store ✅
- [x] Write test: Settings persist after restart
- [x] Write test: Settings emit change events
- [x] Write test: Default values on first launch
- [x] Implement store with electron-store
- [x] Refactor for type safety

**Features Implemented:**
- [x] Interval duration
- [x] Work hours (start/end)
- [x] Dark mode preference
- [x] Custom messages
- [x] Auto-launch toggle

**Note:** Sound notification and custom window title pending (see Medium Priority)

#### System Tray ✅
- [x] Implement tray with context menu
- [x] Refactor for clean separation

**Features Implemented:**
- [x] Tray icon with status indicator
- [x] Menu: Pause, Settings, Quit

**Note:** Tooltip dynamic updates pending

---

### Frontend (Renderer Process) ✅

#### UI Components ✅
- [x] Implement reusable components (Button, Input, Toggle, Card)
- [x] Tailwind styling

#### Timer Display ✅
- [x] Write test: Displays remaining time
- [x] Write test: Updates every second
- [x] Write test: Shows paused state
- [x] Connect to main process timer

**Features Implemented:**
- [x] Large countdown display
- [x] Pause/Resume buttons

**Note:** Progress indicator pending

#### Settings Page ✅
- [x] Write test: Form loads current settings
- [x] Write test: Changes save to store
- [x] Implement settings form

**Features Implemented:**
- [x] Interval input (minutes)
- [x] Work hours time pickers
- [x] Dark mode toggle
- [x] Custom message input

**Note:** Enabled/disabled toggle and auto-launch toggle pending

#### Reminder Modal ✅
- [x] Write test: Modal appears on timer complete
- [x] Write test: Snooze button delays reminder
- [x] Write test: Skip button resets timer
- [x] Implement modal with stretch suggestions

**Features Implemented:**
- [x] Stretch exercise display
- [x] Snooze button
- [x] Skip button

**Note:** Snooze options (5/10/15) and animations pending

#### State Management (Zustand) ✅
- [x] Write test: Store initializes with defaults
- [x] Write test: Actions update state
- [x] Write test: Subscribers receive updates
- [x] Implement store slices

**Slices Implemented:**
- [x] Settings state
- [x] UI state (modal, theme)

---

### Testing ✅

#### Unit Tests (Vitest) ✅
- [x] Timer service tests (8 tests)
- [x] Settings store tests (9 tests)
- [x] Settings store backend tests (8 tests)
- [x] Notification service tests (6 tests)

#### Component Tests (React Testing Library) ✅
- [x] Timer display tests (7 tests)
- [x] Settings form tests (18 tests)
- [x] Settings page tests (3 tests)
- [x] Reminder modal tests (7 tests)

**Total: 66 tests passing**

#### E2E Tests (Playwright) ✅
- [x] App launches successfully
- [x] App displays title
- [x] Start timer button works
- [x] Navigate to settings page
- [x] Change interval and save
- [x] Toggle dark mode
- [x] Start timer and verify countdown
- [x] Persist settings after reload

**Total: 7 E2E tests passing**

---

### Deployment ✅

#### Build Configuration ✅
- [x] Configure electron-builder
- [x] Set up app icons
- [x] Optimize bundle size

---

## Tech Stack (Current)

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Electron | 40.6.1 |
| Frontend | React | 19.1.0 |
| Language | TypeScript | 5.8.3 |
| Styling | Tailwind CSS | 3.4.17 |
| Build Tool | Vite | 6.3.5 |
| Testing (Unit) | Vitest | 3.2.4 |
| Testing (E2E) | Playwright | 1.58.2 |
| State Management | Zustand | 5.0.5 |
| Persistence | electron-store | 8.2.0 |
| Linting | ESLint | 9.39.3 |
| Formatting | Prettier | 3.8.1 |

---

## Development Workflow

### For Each Feature:
1. **Write test** in `tests/` or alongside code (`*.test.ts`)
2. **Run tests** - should fail (Red)
3. **Implement feature** with minimal code
4. **Run tests** - should pass (Green)
5. **Refactor** - improve code quality, keep tests passing
6. **Commit** with descriptive message

### Commands:
```bash
npm run dev          # Start dev server
npm run test         # Run unit + component tests
npm run test:e2e     # Run E2E tests
npm run build        # Production build
npm run lint         # Check code with ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format with Prettier
npm run typecheck    # TypeScript type check
```

---

## Next Recommended Steps

1. **Window Customization** - Custom title bar with themed controls
2. **Stretch Exercise Library** - Expand exercise variety
3. **Snooze Options UI** - 5/10/15 minute selection
4. **Custom Messages Display** - Show in reminder modal
