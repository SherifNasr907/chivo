# CDH Command Center

A single-page analytics **command center** for a multi-brand e-commerce
business — consolidated performance across **6 brands** (Cleo, Blankie,
Skinside, Dermatique, Ohanabaths, Kayanek) and **5 channels** (E-Commerce, B2B,
Wholesales, Pharmacies, and the consolidated CDH rollup).

Built with **React + Vite + TypeScript + Tailwind + Recharts**. The dashboard is
powered by a **real data snapshot** pulled from the CDH MCP server (period:
**June 2026**, trend: Jan–Jun 2026), embedded behind a single swappable data
seam so it runs fully standalone.

## Views

| View | What it shows |
|------|---------------|
| **Executive Overview** | Consolidated KPIs, 6-month revenue & margin trend, channel mix, channel table, e-commerce brand leaderboard |
| **Marketing & ROI** | Facebook + influencer spend by brand, coupon-attributed sales (Ads / Influencers), blended ROAS, UTM traffic attribution |
| **E-Commerce Deep-Dive** | Conversion, order-value & basket-size histograms, top products & bundles, sales by governorate |
| **Ops & Finance** | Gross profit vs COGS by channel, operating-cost stack, SaaS/tooling cost trend, stock (oversold) alerts |

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Build for production:

```bash
npm run build    # type-check + bundle to dist/
npm run preview  # serve the built app
```

## Data

All figures are **EGP**. The snapshot lives in `src/data/snapshot.ts`; the UI
reads it only through `src/data/dataService.ts`. To refresh the numbers, re-pull
from the CDH MCP and replace the values in `snapshot.ts` (shapes are 1:1 with the
MCP tools). To go live, reimplement `dataService.ts` against a real backend.

See [`CLAUDE.md`](./CLAUDE.md) for architecture and conventions.
