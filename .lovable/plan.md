

# Enhance Campaign Card Micro-Interactions

The card already has solid hover foundations (lift, shadow, image zoom, share reveal, title color). Here are meaningful additions that layer on top without redundancy:

## Enhancements

1. **Progress bar animation on hover** -- Expand the progress bar height from `h-1.5` to `h-2` on group-hover, making it more prominent when the user focuses on the card.

2. **Image gradient overlay on hover** -- Add a subtle bottom gradient overlay that intensifies on hover, improving text contrast and adding depth.

3. **Footer icons animate on hover** -- Users and Clock icons shift color to primary on hover with a slight scale bump via Framer Motion.

4. **Share button scale spring** -- Add `whileHover={{ scale: 1.1 }}` and `whileTap={{ scale: 0.9 }}` to the share button for tactile feedback (convert to `motion.button`).

5. **Badge subtle glow on hover** -- Status badge gets a faint glow matching its color on card hover via transition.

6. **Progress bar shimmer on hover** -- Add a CSS shimmer animation on the progress fill when hovered, suggesting activity/momentum.

## Files Changed
- `src/components/CampaignCard.tsx` -- All enhancements above
- `src/index.css` -- Add `.progress-shimmer` utility if needed for the shimmer effect

