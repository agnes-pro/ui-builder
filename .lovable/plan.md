
# Add Category Tags to Campaigns

## Overview
Add a `category` field to campaigns with values like DeFi, NFT, Infrastructure, and Governance. Display category badges on campaign cards and add a multi-select category filter on the Campaigns page.

---

## Changes

### 1. Update Campaign Type
**File: `src/types/campaign.ts`**
- Add `CampaignCategory` type: `"defi" | "nft" | "infrastructure" | "governance" | "payments" | "social"`
- Add `category: CampaignCategory` field to `Campaign` interface

### 2. Add Categories to Mock Data
**File: `src/data/mockData.ts`**
- Assign categories to each mock campaign:
  - Campaign 1 (Marketplace) -> `"infrastructure"`
  - Campaign 2 (DeFi Analytics) -> `"defi"`
  - Campaign 3 (Payment Gateway) -> `"payments"`
  - Campaign 4 (NFT Collection) -> `"nft"`
  - Campaign 5 (DAO Governance) -> `"governance"`
  - Campaign 6 (Lightning Bridge) -> `"infrastructure"`

### 3. Display Category Badge on Campaign Cards
**File: `src/components/CampaignCard.tsx`**
- Add a category badge next to the status badge on the card image overlay
- Use distinct colors per category (e.g., DeFi = purple, NFT = pink, Infrastructure = blue, Governance = amber, Payments = green, Social = teal)

### 4. Add Multi-Select Category Filter on Campaigns Page
**File: `src/pages/Campaigns.tsx`**
- Add a row of toggleable category chips/buttons below the existing filter bar
- Clicking a chip toggles that category on/off (multi-select behavior)
- Active chips get a filled style, inactive chips get an outline style
- Update the `filtered` memo to include category filtering
- Reset visible count when category filter changes
- Add category filter to the animation key so the grid re-animates on change

### 5. Add Category to Create Campaign Form
**File: `src/pages/CreateCampaign.tsx`**
- Add a category select dropdown in Step 1 (Basic Info)
- Required field with validation

### 6. Show Category on Campaign Detail Page
**File: `src/pages/CampaignDetail.tsx`**
- Display the category badge alongside the status badge in the campaign header

---

## Technical Details

- Category colors will be defined as a shared constant map (similar to `statusColors`) in a utility or kept co-located where used
- The multi-select filter uses simple toggle buttons styled with the existing `Button` component (variant toggling between `secondary` and `outline`)
- No new dependencies needed -- uses existing Badge and Button components
- Filter state is an array of selected categories; empty array means "show all"
