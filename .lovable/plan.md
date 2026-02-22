

# Fix "Create Campaign" Button Visibility in Light Mode

## Problem
The "Create Campaign" outline button in the hero section is invisible in light mode. The `variant="outline"` applies `bg-background` (white in light mode) and its own text color, making both the button background and text blend into the dark hero gradient oddly. The `!text-white` isn't sufficient because the outline variant also sets a white-ish background in light mode, creating a white box with invisible white text.

## Solution
Remove the `variant="outline"` entirely and manually style the button as a transparent/ghost button that always looks correct on the dark hero background.

### Changes

**File: `src/pages/Index.tsx` (line 175)**
- Remove `variant="outline"` from the "Create Campaign" button
- Replace with explicit classes: `bg-transparent border border-white/20 text-white hover:bg-white/10`
- This bypasses all variant-level style conflicts and ensures the button always renders as a transparent outlined button with white text on the dark gradient

This is a single-line className change -- no structural modifications needed.
