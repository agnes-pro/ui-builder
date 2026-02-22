

# Staggered Card Entrance Animations

## Overview
Add staggered entrance animations so campaign cards animate in one-by-one with a cascading effect, creating a polished reveal when the grid loads or filters change.

## Approach
Use framer-motion's `variants` with `staggerChildren` on the grid container, and per-card entrance variants on each `CampaignCard`. Cards will fade in and slide up sequentially with a 0.08s stagger delay between each.

## Changes

### 1. `src/components/CampaignCard.tsx`
- Accept an optional `index` prop (number) for custom delay support
- Add `variants` for initial/animate states: `{ opacity: 0, y: 20 }` to `{ opacity: 1, y: 0 }`
- The `MotionLink` already supports motion props -- add `variants` and `initial`/`animate` props
- Respect `prefersReducedMotion` by skipping the entrance animation

### 2. `src/pages/Campaigns.tsx`
- Wrap the campaign card grid `div` with `motion.div` using container variants with `staggerChildren: 0.08`
- Pass `index` to each `CampaignCard`
- Re-trigger stagger when filters change by keying the container on the filter state

### 3. `src/pages/Index.tsx`
- Wrap the featured campaigns grid with the same `motion.div` stagger container
- Pass `index` to each featured `CampaignCard`

### 4. `src/pages/Profile.tsx`
- Wrap the "My Campaigns" and "Backed" grids with `motion.div` stagger containers

## Technical Details

**Container variants:**
```
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
```

**Card variants (inside CampaignCard):**
```
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
}
```

### Files to Modify (4)
1. `src/components/CampaignCard.tsx` -- add entrance variants
2. `src/pages/Campaigns.tsx` -- stagger container on grid
3. `src/pages/Index.tsx` -- stagger container on featured grid
4. `src/pages/Profile.tsx` -- stagger container on campaign grids

