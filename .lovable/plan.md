

# Enterprise-Grade UI Upgrade Plan

## Overview

This plan addresses all the gaps identified to bring the sBTC Crowdfund Protocol UI from ~75% to enterprise-grade quality. It covers 7 areas: skeleton loaders, micro-interactions, Transaction Status Modal, breadcrumbs, error handling, accessibility, and missing PRD components.

---

## 1. Skeleton Loading States

Create reusable skeleton components that match the exact layout of real content, preventing layout shift.

**New file: `src/components/skeletons/CampaignCardSkeleton.tsx`**
- Mirrors the CampaignCard layout: aspect-video image placeholder, title lines, progress bar, footer row
- Uses the existing `Skeleton` component from `src/components/ui/skeleton.tsx`

**New file: `src/components/skeletons/CampaignDetailSkeleton.tsx`**
- Banner skeleton, title block, two-column layout with funding card skeleton and milestone skeletons

**New file: `src/components/skeletons/ProfileSkeleton.tsx`**
- Avatar, address, balance, and tab content skeletons

**Integration:**
- Wrap campaign data in a simulated loading state (e.g., 800ms delay via `useState`/`useEffect`) on Campaigns, CampaignDetail, and Profile pages
- Show 6 `CampaignCardSkeleton` cards on the Campaigns page during load
- Show `CampaignDetailSkeleton` on CampaignDetail during load

---

## 2. Micro-Interactions & Animations

Enhance the feel of the app with subtle hover/transition effects.

**CampaignCard (`src/components/CampaignCard.tsx`):**
- Add `transition-transform duration-300 hover:-translate-y-1` for card lift on hover
- Add `hover:shadow-lg hover:shadow-primary/5` for glow-on-hover

**Buttons:**
- Add `active:scale-[0.98]` to all gradient-orange CTA buttons for a subtle press effect

**Page transitions:**
- Wrap each page's main content in a `div` with `animate-fade-in-up` class with a short delay

**Progress bars:**
- Add `transition-all duration-1000 ease-out` so they animate in when first visible

**Navbar:**
- Add `transition-shadow` so the glass navbar gains a subtle bottom shadow on scroll (via a scroll listener in `Layout.tsx`)

**How It Works / Trust Indicators cards:**
- Already have `hover:border-primary/30` -- add `transition-transform duration-300 hover:-translate-y-1`

---

## 3. Transaction Status Modal

**New file: `src/components/TransactionStatusModal.tsx`**

A modal with 4 states flowing sequentially:

1. **Signing** -- Wallet icon with pulse animation, "Confirm in your wallet" text
2. **Broadcasting** -- Spinner animation, "Broadcasting transaction..." text
3. **Pending** -- Hourglass with shimmer, "Waiting for confirmation..." text, tx hash displayed in mono
4. **Success** -- Animated checkmark (scale-in), "Contribution successful!" with amount + campaign, "View on Explorer" link
5. **Error** -- Animated X (scale-in), error message, "Try Again" button

**Integration:**
- `ContributeModal` -- when user clicks "Contribute", close ContributeModal and open TransactionStatusModal
- Simulate the state flow with `setTimeout` transitions (Signing 2s -> Broadcasting 2s -> Pending 2s -> Success)
- Also wire up the "Launch Campaign" button in CreateCampaign to show the same modal
- Add a `onRetry` callback for the error state

---

## 4. Breadcrumbs

**New file: `src/components/Breadcrumbs.tsx`**

A reusable breadcrumb component using the existing `src/components/ui/breadcrumb.tsx` primitives.

- Accepts an array of `{ label: string; href?: string }` items
- Last item rendered as `BreadcrumbPage` (non-clickable)
- Uses `Link` from react-router-dom for navigation

**Integration:**
- Add to `CampaignDetail.tsx`: Home > Campaigns > [Campaign Title]
- Add to `CreateCampaign.tsx`: Home > Create Campaign
- Add to `Profile.tsx`: Home > My Profile
- Add to `Campaigns.tsx`: Home > Campaigns
- Positioned below the navbar, above page content

---

## 5. Error Handling & Edge Cases

**New file: `src/components/ErrorBoundary.tsx`**
- React error boundary wrapping the app in `App.tsx`
- Catches render errors and shows a friendly "Something went wrong" page with a "Reload" button

**Campaign image fallback:**
- In `CampaignCard.tsx` and `CampaignDetail.tsx`, add `onError` handler on `<img>` tags to replace with a gradient placeholder div showing the Bitcoin icon

**NotFound page (`src/pages/NotFound.tsx`):**
- Upgrade from minimal to a styled 404 with the brand design, illustration, and "Go Home" / "Explore Campaigns" buttons

**Copy address functionality:**
- Make the "Copy" buttons in `Navbar.tsx`, `CampaignDetail.tsx`, and `Profile.tsx` actually copy to clipboard using `navigator.clipboard.writeText()` and show a toast notification on success

**Form validation in CreateCampaign:**
- Add inline error messages when fields are empty and user tries to proceed
- Show warning when milestone percentages don't sum to 100
- Disable "Launch Campaign" if wallet not connected, with tooltip explaining why

**ContributeModal validation:**
- Show error if amount exceeds wallet balance
- Show error if amount is 0 or negative
- Disable button with appropriate message when wallet not connected

---

## 6. Accessibility Improvements

**Global:**
- Add `<title>` tags to each page via `useEffect` setting `document.title`
- Add `role="main"` to Layout's `<main>` element
- Add `aria-live="polite"` to toast regions

**Forms (CreateCampaign):**
- Replace bare `<label>` tags with the `Label` component from shadcn
- Add `aria-describedby` linking inputs to their helper text
- Add `aria-invalid` on inputs when validation fails
- Add proper `htmlFor` attributes

**Modals:**
- Already using Radix Dialog (good) -- ensure all modals have `DialogDescription` (already present)

**CampaignCard:**
- Add `aria-label` describing the card: "Campaign: [title], [progress]% funded"

**Keyboard navigation:**
- Ensure the mobile menu drawer can be closed with Escape (already handled by Sheet)
- Add visible focus rings using `focus-visible:ring-2 focus-visible:ring-ring` on interactive elements

**Reduced motion:**
- Add `@media (prefers-reduced-motion: reduce)` to `src/index.css` that disables all custom animations
- Wrap `AnimatedCounter` to instantly show final value when reduced motion is preferred

---

## 7. Missing PRD Components

**Footer enhancement (`src/pages/Index.tsx`):**
- Expand the minimal footer to include navigation links (Campaigns, Create, Profile), social links, and a "Built on Stacks" badge

**Activity tab in Profile (`src/pages/Profile.tsx`):**
- Replace the empty state with a mock activity timeline
- Each entry: icon (created/contributed/milestone/refund) + description + timestamp + explorer link
- Add mock activity data to `mockData.ts`

**"Load More" pagination on Campaigns page:**
- Show first 6 campaigns initially
- Add a "Load More" button at the bottom that reveals 6 more
- Show skeleton cards briefly when loading more

**Functional copy-address buttons:**
- Already covered in Error Handling section above

**Toast notifications:**
- Use the existing toast system (`useToast`) to show feedback for:
  - Wallet connected/disconnected
  - Address copied to clipboard
  - Campaign launched (mock)
  - Contribution submitted (mock)

---

## Technical Details

### Files to Create (7 new files)
1. `src/components/skeletons/CampaignCardSkeleton.tsx`
2. `src/components/skeletons/CampaignDetailSkeleton.tsx`
3. `src/components/skeletons/ProfileSkeleton.tsx`
4. `src/components/TransactionStatusModal.tsx`
5. `src/components/Breadcrumbs.tsx`
6. `src/components/ErrorBoundary.tsx`
7. `src/components/ImageWithFallback.tsx`

### Files to Modify (11 files)
1. `src/App.tsx` -- wrap with ErrorBoundary
2. `src/index.css` -- add reduced motion media query
3. `src/components/Layout.tsx` -- add scroll shadow listener to navbar
4. `src/components/Navbar.tsx` -- functional copy, toast on connect/disconnect
5. `src/components/CampaignCard.tsx` -- lift hover, image fallback, aria-label
6. `src/components/ContributeModal.tsx` -- validation, trigger TransactionStatusModal
7. `src/components/ConnectWalletModal.tsx` -- toast on connect
8. `src/pages/Index.tsx` -- enhanced footer, page title
9. `src/pages/Campaigns.tsx` -- breadcrumbs, load more pagination, skeleton loading, page title
10. `src/pages/CampaignDetail.tsx` -- breadcrumbs, skeleton loading, copy address, image fallback, page title
11. `src/pages/CreateCampaign.tsx` -- breadcrumbs, form validation, TransactionStatusModal, page title
12. `src/pages/Profile.tsx` -- breadcrumbs, activity timeline, skeleton loading, copy address, page title
13. `src/pages/NotFound.tsx` -- redesign with brand styling
14. `src/data/mockData.ts` -- add mock activity data
15. `src/contexts/WalletContext.tsx` -- add toast on connect/disconnect

### Sequencing
1. Skeleton components + ImageWithFallback (no dependencies)
2. Breadcrumbs + ErrorBoundary + TransactionStatusModal (no dependencies)
3. CSS updates (reduced motion)
4. Page-level integrations (all pages updated with skeletons, breadcrumbs, page titles, micro-interactions)
5. Modal integrations (ContributeModal -> TransactionStatusModal flow)
6. Toast integrations and copy-address functionality
7. Accessibility pass (labels, aria attributes, form improvements)

