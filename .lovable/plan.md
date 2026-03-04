

# Elevate Landing Page — Redesign "How It Works" and Polish All Sections

## Problem
The "How It Works" section looks generic and flat — plain bordered cards with small icons feel like a template, not a premium product landing page. The overall landing page needs more visual depth, better hierarchy, and a more refined feel.

## Changes

### 1. Redesign "How It Works" section (src/pages/Index.tsx)
- Replace the plain bordered cards with a **connected horizontal flow** layout:
  - Each step gets a **larger icon container** (h-12 w-12) with a subtle gradient background
  - Add a **connecting line/arrow** between steps using a dashed border or SVG connector on desktop (hidden on mobile)
  - Step numbers become prominent **numbered badges** (gradient orange circle) instead of tiny text
  - Center-align the cards with the icon on top for a cleaner visual flow
  - Add a subtle hover glow effect (`glow-orange` on hover)
- On mobile: stack vertically with a vertical connecting line on the left side

### 2. Improve hero section visual depth
- Add a subtle **animated gradient orb** behind the hero text using a slow CSS animation (`float` keyframe)
- Make the hero badge more prominent — slightly larger with a subtle pulse

### 3. Enhance Trust Indicators section
- Add subtle **gradient borders on hover** instead of just `border-primary/20`
- Make icons slightly larger (h-5 w-5) with a gradient icon color on hover

### 4. Add a CTA banner section before the footer
- A simple full-width gradient banner with "Ready to build on Bitcoin?" heading and two CTA buttons
- Uses the `gradient-hero` background for visual consistency with the hero

### 5. Improve section transitions
- Add subtle separator elements between sections (a thin gradient line or dot pattern)

## Files Modified
- `src/pages/Index.tsx` — All section redesigns

