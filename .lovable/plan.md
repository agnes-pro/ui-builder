

# Fix Mobile Responsive Layout Issues

## Problem
On mobile (375px), the "How It Works" and "Featured Campaigns" sections are invisible. They render but stay at `opacity: 0` because framer-motion's `whileInView` animations never trigger. The `viewport={{ amount: 0.2 }}` threshold requires 20% of the section to be visible simultaneously, which is hard to achieve on small screens with tall sections (especially the 6-card campaign grid).

Additionally, the hero section is still quite tall on mobile (`min-h-[80vh]`), pushing content further down.

## Changes

### 1. Fix whileInView thresholds (src/pages/Index.tsx)
- Reduce `amount` from `0.2` to `0.05` (or `"some"`) on all section-level `motion.section` elements
- This ensures animations trigger reliably on small viewports
- Affected: "How It Works" section (line 153), Featured Campaigns (line 195), Trust Indicators (line 232)
- Also fix the inner `motion.div` stagger containers (lines 165, 212, 246)

### 2. Reduce hero height on mobile (src/pages/Index.tsx)
- Change `min-h-[80vh]` to `min-h-[60vh] sm:min-h-[70vh]` so the hero doesn't dominate on mobile

### 3. Limit Featured Campaigns on mobile (src/pages/Index.tsx)
- Currently shows 6 cards in a single column on mobile, making the section very tall
- Show only 3 cards on mobile using a responsive slice or CSS `hidden` classes on the last 3

### 4. Trust indicators mobile grid (src/pages/Index.tsx)
- Currently `sm:grid-cols-2 lg:grid-cols-4` which means single column on mobile (4 stacked cards)
- Change to `grid-cols-2 lg:grid-cols-4` so they show as a 2x2 grid even on mobile

## Files Modified
- `src/pages/Index.tsx` — viewport thresholds, hero height, campaign card limit, trust grid

## Technical Details
The root cause is framer-motion's `viewport.amount` property. When set to `0.2`, the element must have 20% of its total height visible in the viewport. A section with 6 campaign cards stacked vertically can be 2000px+ tall on mobile, requiring 400px visible at once while the viewport is only 812px. The animation technically fires, but the tall hidden-content sections get skipped during fast scroll. Setting `amount` to `0.05` or `"some"` fixes this reliably.

