
# Add Framer Motion Hover Animations to CampaignCard

## Overview
Replace the current CSS-only hover effects on CampaignCard with framer-motion's `motion` components for richer, more fluid micro-interactions including scale, shadow lift, and image zoom.

## Current State
The card already has CSS hover effects:
- `hover:-translate-y-1` (lift)
- `hover:shadow-lg hover:shadow-primary/5` (shadow)
- `hover:border-primary/30` (border glow)
- `group-hover:scale-105` on the image (zoom)

These work but feel mechanical. Framer-motion provides spring physics and `whileHover`/`whileTap` for smoother, more natural interactions.

## Changes

### File: `src/components/CampaignCard.tsx`

**What changes:**
1. Import `motion` from `framer-motion`
2. Replace the outer `<Link>` with a `motion(Link)` wrapper (or wrap Link content in `motion.div`)
3. Add `whileHover` animation: `{ y: -6, scale: 1.02 }` with spring transition
4. Add `whileTap` animation: `{ scale: 0.98 }` for click feedback
5. Add animated box shadow on hover via framer-motion's `boxShadow` property
6. Replace the CSS `group-hover:scale-105` on the image with a framer-motion approach using the `group` hover state
7. Remove redundant CSS hover classes (`hover:-translate-y-1`, `hover:shadow-lg`, etc.) since framer-motion handles them
8. Respect `prefers-reduced-motion` by checking the media query and disabling animations accordingly

**Technical approach:**
- Use `motion.create(Link)` to create a motion-compatible Link component
- Use `whileHover` and `whileTap` props for the card-level animations
- Use `transition: { type: "spring", stiffness: 300, damping: 20 }` for natural bounce
- Keep the CSS `transition-colors` for the title color change (simpler to leave as CSS)
- Keep the image zoom as CSS `group-hover:scale-105` since it depends on the group hover context

### Files to Modify
1. `src/components/CampaignCard.tsx` -- add framer-motion hover/tap animations

### No new files needed
