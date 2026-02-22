

# Implement Remaining PRD Features (Non-Blockchain)

This plan covers all the remaining UI/UX, polish, and accessibility features from the PRD, excluding real blockchain/wallet integration which you'll handle separately.

---

## 1. Hero Section Enhancements

**File: `src/pages/Index.tsx`**

- Add an overline tag above the heading: "Powered by Stacks + Bitcoin" with a small icon
- Add an animated scroll indicator (chevron bouncing down) at the bottom of the hero section
- Add subtle floating particle/dot animation in the hero background using framer-motion (several small glowing dots that drift slowly)

---

## 2. Dynamic Progress Bar Color Gradients

**Files: `src/components/CampaignCard.tsx`, `src/pages/CampaignDetail.tsx`, `src/components/ContributeModal.tsx`**

- Progress bars currently always use `gradient-orange`
- Add dynamic color logic based on funding percentage:
  - 0-33%: orange gradient (current)
  - 34-66%: orange-to-amber gradient
  - 67-99%: amber-to-green gradient
  - 100%: solid green (success)
- Extract a shared utility `getProgressColor(percentage: number)` into `src/lib/utils.ts`
- Add corresponding CSS gradient classes in `src/index.css`

---

## 3. Enhanced Campaign Detail Page

**File: `src/pages/CampaignDetail.tsx`**

Add three new sections to the left column:

### About the Creator
- Show creator address with a generated avatar (initials-based, like the Profile page)
- Display a mock "Member since" date and campaign count
- Link to view on explorer

### Campaign Updates (Mock)
- Add a mock updates section with 2-3 hardcoded update entries
- Each update shows a date, title, and short text
- Add an "Updates" type to mockData if needed

### View All Backers Modal
- Add a "View All" link next to the "Recent Backers" heading
- Opens a Dialog/Sheet listing all contributions for the campaign
- Scrollable list with address, amount, and date

---

## 4. Image Upload in Create Campaign

**File: `src/pages/CreateCampaign.tsx`**

- Make the banner image dropzone functional (currently just a placeholder div)
- Accept image files via click or drag-and-drop
- Show a preview of the selected image replacing the dropzone
- Add a "Remove" button to clear the selection
- Store the file in local state (no actual upload -- just preview via `URL.createObjectURL`)

---

## 5. USD Equivalent Display in ContributeModal

**File: `src/components/ContributeModal.tsx`**

- Add a USD equivalent line below the amount input (like CreateCampaign already does)
- Use a hardcoded mock rate (e.g., 1 STX = $0.45)
- Show "~$X.XX USD" as the user types

---

## 6. Enhanced 404 Page

**File: `src/pages/NotFound.tsx`**

- Add an animated illustration (a floating Bitcoin icon with `framer-motion`)
- Add suggested campaign links (show 3 random active campaigns from mock data)
- Add a search-like prompt: "Looking for a campaign? Try browsing all campaigns."

---

## 7. Skip Link and Accessibility (a11y)

**File: `src/components/Layout.tsx`**

- Add a visually-hidden skip link at the top: "Skip to main content" that focuses `main`
- The link becomes visible on focus (keyboard navigation)

**File: `src/pages/CampaignDetail.tsx`**

- Add `aria-live="polite"` region for the transaction status updates
- Add `role="progressbar"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax` on progress bars

**Files: various pages**

- Ensure all interactive elements have visible focus rings (already mostly done)

---

## 8. Scroll-Triggered Section Animations on Landing Page

**File: `src/pages/Index.tsx`**

- Wrap "How It Works", "Featured Campaigns", and "Trust Indicators" sections in `motion.div` with `whileInView` fade-in-up animations
- Use `viewport={{ once: true }}` to only trigger once
- Stagger children within each section

---

## 9. Campaign Card Quick Actions

**File: `src/components/CampaignCard.tsx`**

- Add a subtle share button that appears on hover (top-right corner of the card image)
- Small icon button with `Share2` icon
- On click, copies the campaign URL to clipboard and shows a toast (stops event propagation so it doesn't navigate)

---

## Summary of Files Changed

| File | Changes |
|------|---------|
| `src/pages/Index.tsx` | Hero overline, scroll indicator, floating particles, scroll-triggered section animations |
| `src/pages/NotFound.tsx` | Animated illustration, suggested campaigns |
| `src/pages/CampaignDetail.tsx` | About Creator section, Updates section, View All Backers modal, a11y progress bars |
| `src/pages/CreateCampaign.tsx` | Functional image upload with preview |
| `src/components/CampaignCard.tsx` | Share quick-action on hover |
| `src/components/ContributeModal.tsx` | USD equivalent display |
| `src/components/Layout.tsx` | Skip-to-content link |
| `src/lib/utils.ts` | `getProgressColor()` utility |
| `src/index.css` | New gradient classes for progress bar colors |
| `src/data/mockData.ts` | Mock updates data for campaign detail |

---

## Technical Notes

- All animations will respect `prefers-reduced-motion` via conditional variants or CSS media query (already in place)
- No new dependencies needed -- everything uses existing framer-motion, lucide-react, and shadcn/ui components
- Mock STX-to-USD rate will be a constant (`STX_USD_RATE = 0.45`) in `src/lib/utils.ts` for easy replacement later with a real API
- Image upload is client-side only (blob URL preview) -- real upload can be wired in during blockchain integration

