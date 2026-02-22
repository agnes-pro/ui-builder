

# sBTC Crowdfund Protocol — Frontend Implementation Plan

## Overview
A premium, dark-themed decentralized crowdfunding platform built on Stacks (Bitcoin L2). Users can create campaigns with milestone-based fund releases, contribute STX, and claim refunds — all powered by a Clarity smart contract.

> **Note:** This plan covers the **frontend UI only**. Wallet integration (`@stacks/connect`) and smart contract calls will use mock/placeholder data initially, ready to be wired up to the real Stacks testnet contract (`STZPZY7NEZERJKZCB2ZZE3XVENKDZD031TBYSQJD.sbtc-crowdfund`).

---

## Phase 1: Design System & Core Layout

### 1.1 — Dark Theme & Brand Tokens
- Implement the full color palette (Bitcoin Orange `#F7931A`, Deep Space `#0D1117`, Cosmic Purple `#8B5CF6`, etc.) as CSS custom properties
- Add Google Fonts: **Inter** (body), **Space Grotesk** (display headings), **JetBrains Mono** (addresses/numbers)
- Define gradient tokens (Hero Gradient, Card Glow, Success Gradient, Glass Effect)
- Set up shadow/elevation system and glow effects (Orange, Purple, Cyan)
- Configure animation utilities (fade-in-up, fade-in-scale, pulse-glow, shimmer)

### 1.2 — Navigation
- Fixed top navbar (72px) with glass effect backdrop blur
- Logo + nav links: Campaigns, Create, My Profile
- **Connect Wallet** button (disconnected state) / truncated address + avatar dropdown (connected state)
- Mobile: hamburger menu → full-screen slide-out drawer
- Breadcrumbs component for inner pages

### 1.3 — Custom Component Variants
- Button variants: Primary (orange), Secondary (outline), Ghost, Gradient (premium CTA), Danger
- Input variants: dark-themed with cyan focus glow, STX Amount Input (with "STX" badge prefix), Address Input (mono font, truncation, copy button)
- Campaign Card component with image, status badge, progress bar, creator address, and action buttons
- Status badges (Active/Funded/Completed/Failed) with colored backgrounds
- Progress bars with gradient fills that change color based on percentage
- Milestone stepper (completed/current/pending states)

---

## Phase 2: Pages

### 2.1 — Landing Page (Home)
- **Hero section**: full-viewport with animated gradient mesh background, headline "Fund the Future of Bitcoin", two CTAs (Explore Campaigns + Create Campaign), and a stats row (Total Raised, Campaigns, Success Rate) with animated number counters
- **How It Works**: 3-column grid — Create → Fund → Deliver with icons and descriptions
- **Featured Campaigns**: grid of 6 campaign cards with "View All" link
- **Trust Indicators**: 4-column grid — Bitcoin Security, Milestone Protection, Automatic Refunds, Transparent

### 2.2 — Campaigns List Page
- Page header with title and subtitle
- Filter bar: search input, status dropdown (All/Active/Funded/Completed/Failed), sort dropdown (Newest/Most Funded/Ending Soon/Most Backed), grid/list toggle
- Responsive campaign grid (3 cols desktop → 2 tablet → 1 mobile)
- Empty state with illustration and "Create Campaign" CTA
- "Load More" pagination with skeleton loading states

### 2.3 — Campaign Detail Page
- Banner image (16:9), status badge, creation date, campaign title, creator address
- **Two-column layout** (desktop) / single column (mobile):
  - **Left (65%)**: Campaign description (markdown rendered), milestones section with individual milestone cards (status, description, percentage, complete button for creator), recent backers list
  - **Right (35%, sticky)**: Funding card (amount raised, goal, progress bar, backer count, days left, Contribute CTA, share icons), milestones summary stepper, "Your Contribution" card (if user backed, with refund option)

### 2.4 — Create Campaign Page (Multi-step Wizard)
- Step progress indicator at top
- **Step 1 — Basic Info**: Title (max 64 chars), description (rich text/markdown), banner image upload (drag & drop)
- **Step 2 — Funding Goal**: STX amount input with USD equivalent, campaign duration dropdown (7/14/30/60/90 days)
- **Step 3 — Milestones**: Add/remove milestones with description + percentage allocation, validation that total = 100%
- **Step 4 — Review & Launch**: Preview card, details summary, warning that details can't be changed, launch button
- Back/Next navigation between steps

### 2.5 — Profile/Dashboard Page
- Profile header: avatar, truncated address, wallet provider, copy/explorer links, STX balance
- Tab navigation: **My Campaigns** | **My Contributions** | **Activity**
  - My Campaigns: grid of user's created campaigns with quick stats and pending actions
  - My Contributions: list of backed campaigns with contribution amounts, status, and refund buttons
  - Activity: timeline of all transactions (created, contributed, milestones, refunds) with timestamps and explorer links
- Empty states for each tab

---

## Phase 3: Modals & Interactions

### 3.1 — Connect Wallet Modal
- Hiro Wallet button (primary) and Xverse Wallet button (secondary)
- "Don't have a wallet?" help link
- Glass backdrop with blur

### 3.2 — Contribute Modal
- Campaign name, current progress bar, STX amount input with USD equivalent, user balance display, transaction fee estimate
- Cancel and Contribute action buttons

### 3.3 — Transaction Status Modal
- Multi-state flow: Signing → Broadcasting → Pending → Success / Error
- Animated icons for each state (wallet icon, spinner, hourglass, checkmark/X)
- Retry button on error

---

## Phase 4: Mock Data & State Management

### 4.1 — Mock Data Layer
- Create TypeScript types for Campaign, Milestone, Contribution matching the smart contract data structures
- Build a mock data service with sample campaigns in various states (active, funded, completed, failed)
- Simulate wallet connection state (connected/disconnected) with mock address and balance

### 4.2 — State Management
- React Context for wallet state (connected, address, balance, network)
- TanStack Query for campaign data fetching (with mock API layer)
- React Hook Form + Zod for the create campaign wizard validation

---

## Phase 5: Polish & Responsiveness

- Ensure all pages are fully responsive across breakpoints (320px → 1920px)
- Mobile bottom-sheet style modals
- Skeleton loading states for all data-dependent sections
- Error states for network errors, wallet errors, form validation
- `prefers-reduced-motion` support
- Accessible focus indicators, ARIA labels, semantic HTML

