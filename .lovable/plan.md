

# Scale Down the Overall UI — Make Everything More Compact

## Overview
The entire homepage feels oversized — the hero takes up too much vertical space, section headings are too large, padding between sections is excessive, and cards have too much whitespace. This plan reduces sizes across the board for a tighter, more professional feel.

## Changes

### 1. Hero Section (src/pages/Index.tsx)
- Reduce hero height from `min-h-[85vh]` to `min-h-[70vh]`
- Reduce h1 from `text-5xl md:text-7xl` to `text-4xl md:text-5xl`
- Reduce description from `text-lg md:text-xl` to `text-base md:text-lg`
- Reduce buttons from `h-12 text-base` to `h-10 text-sm`
- Reduce stats from `text-3xl md:text-4xl` to `text-2xl md:text-3xl`
- Reduce stats margin from `mt-12` to `mt-8`
- Reduce button margin from `mt-8` to `mt-6`

### 2. Section Spacing (src/pages/Index.tsx)
- Reduce all section padding from `py-16` to `py-12`
- Reduce inner gaps from `mt-10` to `mt-8`

### 3. Section Headings (src/pages/Index.tsx)
- Reduce all h2 from `text-3xl md:text-4xl` to `text-2xl md:text-3xl`

### 4. How It Works Cards (src/pages/Index.tsx)
- Reduce icon container from `h-14 w-14` to `h-12 w-12`
- Reduce icon from `h-7 w-7` to `h-6 w-6`
- Reduce title from `text-xl` to `text-lg`
- Reduce card padding from `p-6` to `p-5`

### 5. Trust Indicator Cards (src/pages/Index.tsx)
- Already reasonably sized, minor reduction in icon container from `h-11 w-11` to `h-10 w-10`

### 6. Campaign Cards (src/components/CampaignCard.tsx)
- Reduce title from `text-lg` to `text-base`
- Reduce card content padding from `p-4` to `p-3.5`

### 7. Footer (src/components/Footer.tsx)
- Reduce footer padding from `py-8` to `py-6`
- Reduce grid gap from `gap-8` to `gap-6`

## Files Modified
- `src/pages/Index.tsx` — hero sizing, section spacing, heading sizes, card sizes
- `src/components/CampaignCard.tsx` — card title and padding
- `src/components/Footer.tsx` — footer padding

## Impact
All changes are CSS class adjustments only. No structural or functional changes. The layout stays identical, just scaled down to feel more modern and information-dense.

