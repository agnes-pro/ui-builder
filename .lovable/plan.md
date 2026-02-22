

# Fix Badge forwardRef Warning

## Problem
The `Badge` component in `src/components/ui/badge.tsx` is a plain function component that doesn't accept refs. When rendered inside framer-motion's `MotionLink` in `CampaignCard`, React logs a `forwardRef` warning because motion components may pass refs down to children.

## Fix
Update `Badge` to use `React.forwardRef` so it properly accepts and forwards the ref to its underlying `<div>`.

## Changes

### File: `src/components/ui/badge.tsx`
- Wrap `Badge` with `React.forwardRef<HTMLDivElement, BadgeProps>`
- Forward the `ref` to the inner `<div>`
- Update the `displayName`

This is a one-file, non-breaking change -- the Badge API stays the same.

