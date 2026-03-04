

# Scale Down All Pages to Match Landing Page Style

## Overview
Apply the landing page's compact, information-dense visual style to the Campaigns, Campaign Detail, Create Campaign, and Profile pages. The landing page uses tighter spacing, smaller text sizes, uppercase tracking labels, and compact padding -- the other pages still use larger, more template-like sizing.

## Style Reference (from Landing Page)
- Section padding: `py-14` (not `py-20`)
- Headings: `text-2xl` max (not `text-3xl`/`text-4xl`)
- Body text: `text-[13px]`/`text-sm` (not `text-base`)
- Labels: `text-[11px] uppercase tracking-[0.2em]` pattern
- Card padding: `p-4`/`p-5` (not `p-6`)
- Gaps: `gap-3`/`gap-4` (not `gap-6`/`gap-10`)
- Buttons: `h-9 text-sm` (not `h-12 text-base`)

## Changes by File

### 1. src/components/PageHeader.tsx
- Title: `text-3xl md:text-4xl` to `text-2xl md:text-3xl`
- Description: add `text-sm` for tighter body text
- Reduce gap from `gap-2` to `gap-1`

### 2. src/pages/Campaigns.tsx
- Container padding: `py-8` to `py-10`
- Filter bar: reduce gap, use `h-9` inputs
- Category buttons: already `h-8`, keep
- Grid gap: `gap-5` to `gap-4`
- "Load More" button: smaller sizing

### 3. src/pages/CampaignDetail.tsx
- Banner height: `h-64 md:h-80` to `h-48 md:h-64`
- Container bottom padding: `pb-20` to `pb-14`
- Negative margin: `-mt-20` to `-mt-16`
- Two-column gap: `gap-10` to `gap-8`
- Left column spacing: `space-y-10` to `space-y-8`
- Section headings: `text-xl` to `text-lg`
- Campaign title: `text-3xl md:text-4xl` to `text-2xl md:text-3xl`
- Funding card: `text-3xl` amount to `text-2xl`, progress bar `h-3` to `h-2`, button `h-12 text-base` to `h-10 text-sm`
- Card padding: `p-6` to `p-5`
- Milestone items: `p-5` to `p-4`
- Stats boxes: `p-3` to `p-2.5`
- Sidebar spacing: `space-y-6` to `space-y-4`

### 4. src/pages/CreateCampaign.tsx
- Container padding: `py-12` to `py-10`
- Main heading: `text-3xl` to `text-2xl`
- Step indicator spacing: `mt-8` to `mt-6`
- Card `mt-8` to `mt-6`
- Card content padding: `p-6` to `p-5`
- Form spacing: `space-y-6` to `space-y-5`
- Navigation padding: `pt-8` to `pt-6`
- Image upload area height: `h-40` to `h-32`
- Textarea rows: 6 to 4

### 5. src/pages/Profile.tsx
- Container padding: `py-12` to `py-10`
- Identicon: size 64 to 48
- Balance text: `text-lg` to `text-base`
- Tabs top margin: `mt-10` to `mt-8`
- Grid gap in campaigns tab: `gap-6` to `gap-4`
- Contribution/activity items: `p-4` to `p-3.5`
- Activity icon size: `h-8 w-8` to `h-7 w-7`

### 6. src/components/Navbar.tsx
- Reduce nav height from `h-[72px]` to `h-16` (64px)
- Update Layout `pt-[72px]` to `pt-16` to match

### 7. src/components/Layout.tsx
- Update `pt-[72px]` to `pt-16`

## Files Modified
- `src/components/PageHeader.tsx`
- `src/components/Navbar.tsx`
- `src/components/Layout.tsx`
- `src/pages/Campaigns.tsx`
- `src/pages/CampaignDetail.tsx`
- `src/pages/CreateCampaign.tsx`
- `src/pages/Profile.tsx`

