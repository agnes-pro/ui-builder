

# Add Framer Motion Page Transition Animations

## Overview
Add smooth, performant page transition animations using `framer-motion` so navigating between routes feels fluid and polished. This replaces the current CSS-only `animate-fade-in-up` approach with proper enter/exit route-level transitions.

## Current State
- Pages currently use a CSS class `animate-fade-in-up` on their root container
- There are no exit animations when leaving a page
- Route changes feel abrupt -- content just swaps instantly

## Implementation

### 1. Install framer-motion
Add `framer-motion` as a dependency.

### 2. Create a PageTransition wrapper component
**New file: `src/components/PageTransition.tsx`**

A reusable wrapper using `motion.div` with:
- **Enter**: fade in + slide up (opacity 0 -> 1, y: 20px -> 0)
- **Exit**: fade out + slight slide down (opacity 1 -> 0, y: -10px)
- Duration: 300ms ease-out for enter, 200ms for exit
- Respects `prefers-reduced-motion` -- instantly shows content without animation

### 3. Add AnimatePresence to App.tsx
- Import `AnimatePresence` from framer-motion
- Extract routes into a component that uses `useLocation()` to provide a `key` prop
- Wrap `<Routes>` with `<AnimatePresence mode="wait">` so exit animations complete before enter animations begin

### 4. Wrap each page with PageTransition
Update all 6 page components to wrap their content in `<PageTransition>`:
- `src/pages/Index.tsx`
- `src/pages/Campaigns.tsx`
- `src/pages/CampaignDetail.tsx`
- `src/pages/CreateCampaign.tsx`
- `src/pages/Profile.tsx`
- `src/pages/NotFound.tsx`

Remove the existing `animate-fade-in-up` CSS class from each page's root div since framer-motion handles this now.

## Technical Details

### Files to Create (1)
- `src/components/PageTransition.tsx`

### Files to Modify (7)
- `src/App.tsx` -- add AnimatePresence + useLocation key
- `src/pages/Index.tsx` -- wrap with PageTransition, remove CSS animation class
- `src/pages/Campaigns.tsx` -- wrap with PageTransition, remove CSS animation class
- `src/pages/CampaignDetail.tsx` -- wrap with PageTransition, remove CSS animation class
- `src/pages/CreateCampaign.tsx` -- wrap with PageTransition, remove CSS animation class
- `src/pages/Profile.tsx` -- wrap with PageTransition, remove CSS animation class
- `src/pages/NotFound.tsx` -- wrap with PageTransition

### Key Design Decisions
- Using `mode="wait"` on AnimatePresence so the old page fades out before the new one fades in (prevents layout overlap)
- The PageTransition component checks `window.matchMedia('(prefers-reduced-motion: reduce)')` and skips animations accordingly
- Keeping transitions subtle (300ms) to feel smooth without slowing navigation

