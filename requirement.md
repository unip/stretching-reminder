# Stretching Reminder App

## Goal
A desktop app that reminds users to stretch during work hours.

---

## Tech Stack

**Electron + React + TypeScript + Tailwind CSS**

| Layer | Technology |
|-------|------------|
| Framework | Electron |
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| Testing | Vitest + React Testing Library + Playwright |
| State Management | Zustand (lightweight) |
| Persistence | electron-store |

---

## Development Approach: TDD

Each feature follows **Red → Green → Refactor** cycle:
1. **Write a failing test** first (Red)
2. **Write minimal code** to pass the test (Green)
3. **Refactor** while keeping tests passing (Refactor)

---

## Development Plan by Area

### 1. Project Setup & Infrastructure

#### Tasks
- [ ] Initialize project with Vite + Electron + TypeScript template
- [ ] Configure Tailwind CSS with custom theme
- [ ] Set up ESLint + Prettier
- [ ] Configure Vitest for unit testing
- [ ] Configure Playwright for E2E testing
- [ ] Set up folder structure

#### Acceptance Criteria
- `npm run dev` launches dev server with hot reload
- `npm run test` runs all tests
- `npm run build` produces production build
- Tailwind classes apply correctly

---

### 2. Backend (Main Process)

#### 2.1 Timer Service
**TDD Cycle:**
- [ ] Write test: Timer emits event after interval
- [ ] Write test: Timer can be paused/resumed
- [ ] Write test: Timer can be reset
- [ ] Implement timer service
- [ ] Refactor for clean API

**Features:**
- Configurable interval (default: 30 min)
- Pause/Resume/Reset controls
- Event emission for UI updates

#### 2.2 Notification Service
**TDD Cycle:**
- [ ] Write test: Notification shows with title/body
- [ ] Write test: Notification action triggers callback
- [ ] Implement notification wrapper
- [ ] Refactor for reusability

**Features:**
- Native desktop notifications
- Action buttons (Snooze, Skip)
- Permission handling

#### 2.3 Settings Store
**TDD Cycle:**
- [ ] Write test: Settings persist after restart
- [ ] Write test: Settings emit change events
- [ ] Write test: Default values on first launch
- [ ] Implement store with electron-store
- [ ] Refactor for type safety

**Features:**
- Interval duration
- Work hours (start/end)
- Enabled/disabled toggle
- Custom messages
- Dark mode preference
- Sound notification toggle
- Custom window title

#### 2.4 System Tray
**TDD Cycle:**
- [ ] Write test: Tray icon appears on startup
- [ ] Write test: Tray menu actions trigger IPC
- [ ] Implement tray with context menu
- [ ] Refactor for clean separation

**Features:**
- Tray icon with status indicator
- Menu: Pause, Settings, Quit
- Tooltip with next break time

#### 2.5 Auto-Launch
**TDD Cycle:**
- [ ] Write test: Enable adds to startup
- [ ] Write test: Disable removes from startup
- [ ] Implement auto-launch wrapper
- [ ] Refactor for cross-platform

---

### 3. Frontend (Renderer Process)

#### 3.1 UI Components (Tailwind)
**TDD Cycle:**
- [ ] Write test: Button renders with variants
- [ ] Write test: Input binds value correctly
- [ ] Write test: Card displays content
- [ ] Implement reusable components
- [ ] Refactor for DRY styles

**Components:**
- Button (primary, secondary, danger)
- Input/Select/Toggle
- Card container
- Modal/Dialog
- Progress ring/bar

#### 3.2 Timer Display
**TDD Cycle:**
- [ ] Write test: Displays remaining time
- [ ] Write test: Updates every second
- [ ] Write test: Shows paused state
- [ ] Connect to main process timer
- [ ] Refactor for performance

**Features:**
- Large countdown display
- Progress indicator
- Pause/Resume buttons
- Next break info

#### 3.3 Settings Page
**TDD Cycle:**
- [ ] Write test: Form loads current settings
- [ ] Write test: Changes save to store
- [ ] Write test: Validation shows errors
- [ ] Implement settings form
- [ ] Refactor for UX

**Features:**
- Interval input (minutes)
- Work hours time pickers
- Enable/disable toggle
- Dark mode toggle
- Auto-launch toggle

#### 3.4 Reminder Modal
**TDD Cycle:**
- [ ] Write test: Modal appears on timer complete
- [ ] Write test: Snooze button delays reminder
- [ ] Write test: Skip button resets timer
- [ ] Implement modal with stretch suggestions
- [ ] Refactor for animations

**Features:**
- Stretch exercise display
- Snooze (5, 10, 15 min options)
- Skip break
- Playful animations
- Sound notification on reminder
- Customizable sound selection

---

#### 3.6 Window Customization
**TDD Cycle:**
- [ ] Write test: Custom window title displays correctly
- [ ] Write test: Custom close/minimize buttons match theme
- [ ] Implement custom title bar component
- [ ] Add theme-aware button styling
- [ ] Refactor for reusability

**Features:**
- Custom window title (configurable)
- Themed close/minimize buttons
- Dark/light mode support
- Consistent with app branding

#### 3.5 State Management (Zustand)
**TDD Cycle:**
- [ ] Write test: Store initializes with defaults
- [ ] Write test: Actions update state
- [ ] Write test: Subscribers receive updates
- [ ] Implement store slices
- [ ] Refactor for separation

**Slices:**
- Timer state
- Settings state
- UI state (modal, theme)

---

### 4. Testing

#### 4.1 Unit Tests (Vitest)
- [ ] Timer service tests
- [ ] Settings store tests
- [ ] Utility function tests
- [ ] IPC handler tests

#### 4.2 Component Tests (React Testing Library)
- [ ] Button/ Input/ Toggle tests
- [ ] Timer display tests
- [ ] Settings form tests
- [ ] Modal tests

#### 4.3 E2E Tests (Playwright)
- [ ] App launches successfully
- [ ] Timer counts down and notifies
- [ ] Settings can be changed and persist
- [ ] Tray menu actions work
- [ ] Dark mode toggle works

#### 4.4 Manual Testing Checklist
- [ ] Notifications on Linux
- [ ] Notifications on macOS (if available)
- [ ] Notifications on Windows (if available)
- [ ] System tray works on all platforms
- [ ] Auto-launch works on all platforms
- [ ] Settings persist after restart
- [ ] No memory leaks after extended use

---

### 5. Deployment

#### 5.1 Build Configuration
- [ ] Configure electron-builder
- [ ] Set up app icons (all platforms)
- [ ] Configure code signing (if needed)
- [ ] Optimize bundle size

#### 5.2 Distribution
- [ ] Build for Linux (.deb, .AppImage)
- [ ] Build for macOS (.dmg) - if needed
- [ ] Build for Windows (.exe, .msi) - if needed
- [ ] Create release on GitHub

#### 5.3 Auto-Update (Optional)
- [ ] Integrate electron-updater
- [ ] Configure update server
- [ ] Test update flow

---

## Project Structure

```
stretching-reminder/
├── src/
│   ├── main/
│   │   ├── index.ts           # Entry point
│   │   ├── timer.ts           # Timer service
│   │   ├── notifications.ts   # Notification service
│   │   ├── tray.ts            # System tray
│   │   └── settings.ts        # Settings store
│   ├── renderer/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── store/             # Zustand stores
│   │   └── styles/            # Tailwind imports
│   ├── preload/
│   │   └── index.ts           # IPC bridge
│   └── shared/
│       └── types.ts           # Shared TypeScript types
├── tests/
│   ├── unit/                  # Vitest tests
│   ├── components/            # RTL tests
│   └── e2e/                   # Playwright tests
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── playwright.config.ts
└── electron-builder.json
```

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
npm run package      # Package for distribution
```

---

## Next Steps

1. **Start with Project Setup** - Initialize scaffolding with all tooling
2. **Backend First** - Timer service + Settings store (core logic)
3. **Frontend Second** - Timer display + Settings UI
4. **Integration** - Connect frontend to backend via IPC
5. **Polish** - System tray, notifications, auto-launch
6. **Test** - Full test suite + manual testing
7. **Deploy** - Package and distribute
