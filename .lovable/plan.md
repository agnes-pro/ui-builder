

# Production-Grade UI/UX Hardening Plan

This plan addresses the gaps between the current MVP and a production/enterprise-grade frontend. It does NOT cover blockchain integration (you're handling that), but focuses on robustness, polish, and real-world readiness.

---

## Gap Analysis Summary

| Area | Current State | Production Expectation |
|------|---------------|----------------------|
| Error handling | Global ErrorBoundary only | Per-component error states, network error handling, retry logic |
| Form validation | Basic client-side | Zod schema validation, debounced inputs, accessibility errors |
| Loading states | Skeleton loaders present | Optimistic updates, loading buttons, disabled states during actions |
| SEO/Meta | Document title only | Open Graph tags, meta descriptions, structured data |
| Performance | No optimization | Lazy-loaded routes, image optimization, memoization |
| Testing | Single example test | Unit tests for utilities, component tests, integration tests |
| State management | Local state + mock data | Proper data fetching patterns (React Query ready but unused) |
| Responsive polish | Basic responsive | Tablet breakpoints, touch targets, safe areas |
| Toast/notification | Basic toasts | Persistent error notifications, action toasts with undo |
| Footer/Legal | Minimal footer | Terms, Privacy, proper external links |
| Security | None | CSP headers, input sanitization, XSS protection |
| Keyboard navigation | Partial | Full keyboard flow for modals, dropdowns, forms |
| Empty/edge states | Some covered | All pages handle zero-data, error, offline states |

---

## 1. Route-Level Code Splitting and Lazy Loading

**File: `src/App.tsx`**

- Wrap each page import with `React.lazy()` and `Suspense`
- Add a global loading fallback (branded spinner or skeleton)
- This reduces initial bundle size significantly

---

## 2. React Query Integration for Data Fetching

**Files: `src/hooks/useCampaigns.ts` (new), `src/hooks/useCampaign.ts` (new)**

- Replace direct mock data imports with React Query hooks
- Add proper `isLoading`, `isError`, `refetch` states
- This prepares the data layer for when real API/blockchain calls replace mocks
- Remove `setTimeout` loading simulation from pages

---

## 3. Comprehensive Form Validation with Zod

**File: `src/pages/CreateCampaign.tsx`**

- Replace manual validation logic with Zod schemas + react-hook-form
- Add proper field-level error messages with `aria-describedby`
- Debounce title uniqueness check (placeholder for future API)
- Add character count limits with visual feedback
- Validate image file size and dimensions

**File: `src/components/ContributeModal.tsx`**

- Add Zod schema for contribution amount validation
- Add min/max amount constraints

---

## 4. SEO and Meta Tags

**File: `src/components/SEOHead.tsx` (new)**

- Create a reusable component that sets `document.title`, `meta description`, and Open Graph tags
- Use `react-helmet-async` or manual DOM manipulation
- Apply to all pages with page-specific content

---

## 5. Enhanced Error States and Network Handling

**File: `src/components/ErrorState.tsx` (new)**

- Create a reusable error state component with retry button
- Variants: full-page, inline card, toast

**File: `src/components/EmptyState.tsx` (new)**

- Create a reusable empty state component with icon, title, description, and CTA
- Replace ad-hoc empty states across pages

**File: `src/pages/Profile.tsx`, `src/pages/Campaigns.tsx`, `src/pages/CampaignDetail.tsx`**

- Add error handling for data fetch failures
- Add offline detection with banner

---

## 6. Button Loading and Disabled States

**Files: `src/pages/CreateCampaign.tsx`, `src/components/ContributeModal.tsx`**

- Add loading spinner to "Launch Campaign" and "Contribute" buttons during submission
- Disable buttons and show spinner while transaction is processing
- Add success checkmark animation briefly before modal closes

---

## 7. Image Optimization

**File: `src/components/ImageWithFallback.tsx`**

- Add `loading="lazy"` (already on CampaignCard but not on detail page)
- Add `srcSet` support for responsive images
- Add blur placeholder while loading (shimmer effect)
- Constrain image upload to max 5MB with validation message

---

## 8. Keyboard Navigation Audit

**Files: Multiple components**

- Ensure all modals trap focus correctly (Radix does this, but verify)
- Add `Escape` key handler for custom overlays
- Ensure campaign card share button is keyboard-accessible (already has `focus-visible`)
- Add `aria-expanded` to dropdown triggers
- Test full tab-through flow on all pages

---

## 9. Toast Improvements

**File: `src/hooks/use-toast.ts`**

- Add persistent error toasts that don't auto-dismiss
- Add action toasts (e.g., "Undo" after disconnect)
- Add variant styling: success (green), error (red), info (blue)

---

## 10. Responsive Polish

**Files: Various pages**

- Audit tablet viewport (768px-1024px) for layout issues
- Ensure touch targets are minimum 44x44px
- Add `safe-area-inset` padding for notched devices
- Test campaign detail sidebar on tablet (currently `lg:grid-cols-[1fr_380px]` may collapse awkwardly)

---

## 11. Performance Optimizations

**Files: Various**

- Memoize filtered/sorted campaign lists with `useMemo` (already done in Campaigns.tsx)
- Add `React.memo` to `CampaignCard` to prevent unnecessary re-renders in lists
- Debounce search input in Campaigns page (currently filters on every keystroke)
- Use `useCallback` for event handlers passed as props

---

## 12. Unit Tests for Utilities and Key Components

**Files: `src/test/utils.test.ts` (new), `src/test/CampaignCard.test.tsx` (new)**

- Test `getProgressColor`, `formatSTX`, `truncateAddress`, `getDaysLeft`, `getProgressPercentage`
- Test `CampaignCard` renders correctly with different campaign statuses
- Test `ContributeModal` validation logic
- Test `CreateCampaign` step navigation and validation

---

## 13. Footer Enhancement

**File: `src/pages/Index.tsx`**

- Add Terms of Service and Privacy Policy placeholder links
- Add proper `rel="noopener noreferrer"` on all external links (partially done)
- Extract Footer into its own component for reuse on other pages

---

## 14. Consistent Page Structure Component

**File: `src/components/PageHeader.tsx` (new)**

- Extract the repeated pattern of breadcrumbs + title + description into a reusable component
- Ensures consistent spacing and typography across all pages

---

## Summary of Changes

### New Files
| File | Purpose |
|------|---------|
| `src/hooks/useCampaigns.ts` | React Query hook for campaign list |
| `src/hooks/useCampaign.ts` | React Query hook for single campaign |
| `src/components/SEOHead.tsx` | Reusable meta tags component |
| `src/components/ErrorState.tsx` | Reusable error UI |
| `src/components/EmptyState.tsx` | Reusable empty state UI |
| `src/components/PageHeader.tsx` | Reusable page header |
| `src/components/Footer.tsx` | Extracted footer component |
| `src/test/utils.test.ts` | Utility function tests |
| `src/test/CampaignCard.test.tsx` | Component tests |

### Modified Files
| File | Changes |
|------|---------|
| `src/App.tsx` | Lazy loading routes, Suspense fallback |
| `src/pages/CreateCampaign.tsx` | Zod validation, loading states, image validation |
| `src/pages/Campaigns.tsx` | React Query, debounced search, error states |
| `src/pages/CampaignDetail.tsx` | React Query, error states, image lazy loading |
| `src/pages/Profile.tsx` | Error states, empty states |
| `src/pages/Index.tsx` | Extract footer, SEO head |
| `src/components/ContributeModal.tsx` | Zod validation, loading button |
| `src/components/ImageWithFallback.tsx` | Shimmer placeholder, srcSet |
| `src/components/CampaignCard.tsx` | React.memo wrapper |
| `src/index.css` | Safe area insets, shimmer animation |

---

## Priority Order

1. **Route lazy loading** -- immediate bundle size improvement
2. **React Query hooks** -- proper data layer foundation
3. **Zod form validation** -- user-facing quality
4. **Error/empty states** -- robustness
5. **Button loading states** -- interaction feedback
6. **SEO meta tags** -- discoverability
7. **Performance optimizations** -- scalability
8. **Tests** -- maintainability
9. **Responsive polish** -- device coverage
10. **Footer/legal** -- compliance

---

## Technical Notes

- No new major dependencies needed; Zod and React Query are already installed
- React Query is already configured in App.tsx but not used by any page
- All changes are backward-compatible with the future blockchain integration
- Tests use the existing vitest setup (already configured)

