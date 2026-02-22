

# Fix Remaining Light Mode Hero Contrast Issues

## Problem
Two elements in the hero section still have contrast issues in light mode:

1. **The H1 heading ("Fund the Future of")** — missing `text-white` class, so it inherits `text-foreground` which is dark in light mode, making it nearly invisible against the dark gradient
2. **The "Create Campaign" outline button** — while `text-white` is applied, the `variant="outline"` base styles from the Button component override it, making the text invisible on the white-styled button

## Changes

**File: `src/pages/Index.tsx`**

- **Line 162**: Add `text-white` to the `h1` element's className
- **Line 175**: Add `!text-white` (with Tailwind's important modifier) to ensure it overrides the outline variant's default text color, or alternatively remove `variant="outline"` and style it manually with `bg-transparent`

Both are one-line className additions — no structural changes needed.
