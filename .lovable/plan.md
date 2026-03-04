

## Analysis: Hero Section Height

**Current state:** `min-h-[60vh]` on mobile, `min-h-[70vh]` on `sm:` breakpoint.

**Proposed change:** `min-h-[90vh]` on `sm:` breakpoint.

**Rationale:**
- The current `70vh` is compact (consistent with the landing page's refined, compact style achieved earlier)
- Changing to `90vh` would **make the hero significantly taller**, creating more breathing room and prominence
- This is a **design trade-off**:
  - **Pro**: Hero becomes more impactful and immersive; visitors spend more time viewing premium visuals (gradient orbs, animations)
  - **Con**: Increases scroll distance before reaching "How It Works" section; on tablets/smaller desktops, the hero dominates more screen real estate
  - **Pacing**: `90vh` pushes the call-to-action stats lower, which may reduce initial engagement with quantitative proof points

**Recommendation:** Change to `min-h-[90vh]` if your analytics show users scroll through the full hero and you want maximum visual impact. Keep `70vh` if you want faster content discovery and prefer showing stats immediately.

The 3-step process is ideal for A/B testing — try `90vh` for 2 weeks, measure scroll depth to "How It Works," and compare with the current `70vh`.

