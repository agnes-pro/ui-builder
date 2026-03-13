

# Refactor Index.tsx into Landing Page Components

## Plan

Extract 5 components from the ~330-line Index.tsx into `src/components/landing/`:

| Component | Lines | Contents |
|-----------|-------|----------|
| `HeroSection.tsx` | 102-157 | Hero with parallax, gradient orbs, stats, AnimatedCounter |
| `HowItWorks.tsx` | 161-213 | Steps flow with connectors, data array |
| `FeaturedCampaigns.tsx` | 217-254 | Campaign grid with featured filter |
| `TrustIndicators.tsx` | 258-295 | Security cards grid, data array |
| `CTABanner.tsx` | 297-325 | CTA section |

Shared animation variants (`sectionVariants`, `staggerContainer`, `childVariants`) and `SectionSeparator` move to `src/components/landing/shared.ts`.

**Index.tsx** becomes a thin orchestrator:
```tsx
export default function Index() {
  return (
    <PageTransition>
      <Layout>
        <SEOHead ... />
        <HeroSection />
        <SectionSeparator />
        <HowItWorks />
        <SectionSeparator />
        <FeaturedCampaigns />
        <SectionSeparator />
        <TrustIndicators />
        <CTABanner />
        <Footer />
      </Layout>
    </PageTransition>
  );
}
```

## Files
- **Create**: `src/components/landing/shared.ts`, `HeroSection.tsx`, `HowItWorks.tsx`, `FeaturedCampaigns.tsx`, `TrustIndicators.tsx`, `CTABanner.tsx`
- **Edit**: `src/pages/Index.tsx` — replace with thin orchestrator

