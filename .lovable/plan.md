

# World-Class UI/UX Improvements

## Overview
A set of polish, interaction, and UX improvements to bring the frontend from "production-grade" to "world-class" -- focusing on micro-interactions, user trust, navigation quality, and form resilience.

---

## 1. Mobile Nav Auto-Close on Navigation
**File: `src/components/Navbar.tsx`**
- Add controlled `open` state to the Sheet component
- Close the Sheet automatically when a nav link is clicked
- This is a basic usability bug that breaks mobile flow

## 2. Theme Toggle (Light/Dark Mode)
**Files: `src/index.css`, `tailwind.config.ts`, `src/components/Navbar.tsx`, `index.html`**
- Add light mode CSS variables under `.light` or default `:root`
- Add a Sun/Moon toggle button in the Navbar
- Persist preference to `localStorage`
- Use `next-themes` (already installed) for seamless switching

## 3. Create Campaign Draft Auto-Save
**File: `src/pages/CreateCampaign.tsx`**
- Save form state to `localStorage` on every change (debounced)
- Restore on mount with a dismissible "Draft restored" banner
- Clear on successful launch
- Prevents data loss on accidental refresh

## 4. Milestone Percentage Slider
**File: `src/pages/CreateCampaign.tsx`**
- Replace raw number inputs with visual Slider components (already have `@radix-ui/react-slider`)
- Show a stacked bar visualization of milestone allocation
- Much more intuitive than typing percentages manually

## 5. Wallet Identicons
**New file: `src/components/Identicon.tsx`**
- Generate deterministic gradient avatars from wallet addresses (no external dependency, use a simple hash-to-color function)
- Replace all `wallet.address?.slice(2,4)` avatar placeholders
- Use in Navbar dropdown, Profile header, Backer lists, Creator sections

## 6. Scroll-to-Top Button
**New file: `src/components/ScrollToTop.tsx`**, **File: `src/components/Layout.tsx`**
- Floating button appears after scrolling 400px
- Smooth scroll to top on click
- Animated entrance/exit with framer-motion

## 7. Campaign Live Preview in Create Flow
**File: `src/pages/CreateCampaign.tsx`**
- In the Review step (step 4), render an actual `CampaignCard` preview using the form data
- Shows users exactly what their campaign will look like in the grid

## 8. Success Celebration
**File: `src/pages/CreateCampaign.tsx`**, **File: `src/components/TransactionStatusModal.tsx`**
- Add confetti or particle burst animation on "success" transaction status
- Makes the moment of creating a campaign or contributing feel rewarding

## 9. Cmd+K Global Search
**New file: `src/components/CommandMenu.tsx`**, **File: `src/components/Layout.tsx`**
- Use the `cmdk` package (already installed) to create a command palette
- Search campaigns, navigate to pages, connect wallet -- all from keyboard
- Triggered by `Cmd+K` / `Ctrl+K` or a search icon in the Navbar

## 10. Fix Hardcoded Data and Dead Links
**Files: `src/pages/CampaignDetail.tsx`, `src/components/Footer.tsx`**
- Replace hardcoded "500 STX" contribution with actual data lookup from `mockContributions`
- Replace hardcoded "3 campaigns" with actual count from mock data
- Either create stub pages for Terms/Privacy or remove the links

---

## Technical Details

- **Theme toggle**: Leverages `next-themes` ThemeProvider wrapping the app. Light mode variables will be added as a `:root` (light default) block alongside the existing dark variables.
- **Draft auto-save**: Uses `useEffect` with a 500ms debounce writing to `localStorage` key `sbtcfund-draft-campaign`. Restored via `useState` initializer.
- **Identicons**: Pure function that hashes the address string to generate 2-3 HSL colors for a gradient -- no external library needed.
- **Cmd+K**: The `cmdk` package is already a dependency. Will use `Dialog` from cmdk with campaign search and page navigation commands.
- **Confetti**: Lightweight CSS-only particle animation (no new dependency), triggered on the success state of `TransactionStatusModal`.
- **Slider**: Uses the existing `@radix-ui/react-slider` component already in `src/components/ui/slider.tsx`.

## Priority Order
1. Mobile nav auto-close (bug fix)
2. Fix hardcoded data / dead links (trust)
3. Theme toggle (high-impact, broadly expected)
4. Cmd+K search (power-user delight)
5. Draft auto-save (prevents frustration)
6. Milestone slider (form UX)
7. Scroll-to-top (navigation comfort)
8. Identicons (visual identity)
9. Campaign preview in create flow (confidence)
10. Success celebration (delight)
