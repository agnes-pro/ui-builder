
# Fix Light Mode Hero Contrast

## Problem
The hero section uses a hardcoded dark gradient background (`gradient-hero`), but text classes like `text-foreground`, `text-muted-foreground`, and `border-border` switch to dark colors in light mode, making everything invisible against the dark background.

## Solution
Force all hero section content to use light/white text regardless of theme, since the hero gradient is always dark.

### Changes

**File: `src/pages/Index.tsx`**
- Replace theme-aware color classes inside the hero section with explicit light-on-dark colors:
  - `text-foreground` -> `text-white`
  - `text-muted-foreground` -> `text-white/60`
  - `border-border` -> `border-white/20`
  - `bg-secondary/50` -> `bg-white/10`
  - Outline button: add `text-white border-white/20 hover:bg-white/10` instead of `border-border hover:bg-secondary`
  - Scroll indicator: `text-white/50` instead of `text-muted-foreground`

This ensures the hero always has proper contrast since its background is always the dark gradient, regardless of the active theme. No CSS variable changes needed -- only the hero section markup is affected.
