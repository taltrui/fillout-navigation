# Fillout Navigation Component

## Tech Stack

- **Framework**: Next.js 15.3.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sortable
- **UI Components**: Shadcn (AlertDialog, DropdownMenu, Input)
- **State**: Custom localStorage hook with event synchronization

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

## Component Features

### Navigation Button

- **Drag Handle**: Entire button is draggable for reordering
- **Click to Select**: Changes URL parameter and updates page content
- **Context Menu**: 3-dot menu with rename, duplicate, delete, and "set as first" options
- **Dynamic Icons**: Different icons based on position (first, middle, last)
- **State Indicators**: Visual distinction between selected and unselected states

### Page Management

- **Add Pages**:
  - "Add Page" button at the end
  - "+" icons between pages for inserting in specific positions
- **Rename Pages**: Modal dialog
- **Duplicate Pages**: Creates copy with "(copy)" suffix
- **Delete Pages**: Confirmation dialog
- **Reorder Pages**: Drag and drop to reorder

### Data Persistence

- **localStorage Integration**: All changes automatically saved
- **Cross-Component Sync**: Changes in navigation immediately reflect in main page
- **Custom Event System**: Synchronizes localStorage changes across components
- **Hydration Safe**: Prevents SSR/client mismatches

## Styling System

- **CSS Variables**: Custom design tokens for colors and shadows
- **Tailwind Classes**: Utility-first styling with custom color classes
- **Responsive Design**: Horizontal scrolling for mobile and narrow viewports
- **Animations**: Smooth transitions for all interactions

## State Management

The application uses a custom `useLocalStorage` hook that:

- Provides React state-like interface for localStorage
- Automatically syncs changes across all components using the same key
- Handles SSR/client hydration properly
- Includes error handling and fallbacks
- Dispatches custom events for same-tab synchronization
- Instead of using a state for the selected page, it uses a URL parameter to determine the current page, allowing for deep linking and bookmarking.
