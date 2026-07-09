# CLAUDE.md

Guidance for AI assistants (Claude Code and others) working in this repository.

## What this repository is

**CDH Command Center** — a single-page analytics dashboard for a multi-brand
e-commerce company. It presents consolidated business performance across **6
brands** (Cleo, Blankie, Skinside, Dermatique, Ohanabaths, Kayanek) and **5
sales channels** (E-Commerce, B2B, Wholesales, Pharmacies, and the consolidated
"CDH" rollup).

The data shown is a **real baked snapshot** pulled from the CDH MCP server
(primary period: **June 2026**, trend: **Jan–Jun 2026**). It is embedded as a
typed data layer so the app runs fully standalone with no backend. A single
seam (`src/data/dataService.ts`) is the only place the UI reads data, so it can
later be swapped for a live API/MCP backend without touching any view.

## Tech stack

- **React 18** + **TypeScript** (strict)
- **Vite 5** (build/dev server)
- **Tailwind CSS 3** (utility styling, dark theme)
- **Recharts 2** (charts)
- No router — view switching is local state in `App.tsx` (`ViewKey`).

## Commands

```bash
npm install      # install dependencies
npm run dev      # start Vite dev server (HMR)
npm run build    # type-check (tsc -b) + production build to dist/
npm run preview  # serve the production build locally
npm run lint     # tsc --noEmit type-check only
```

`npm run build` runs the TypeScript project build first, so a type error fails
the build. Treat a green `npm run build` as the bar for "it works".

## Repository layout

```
src/
├── main.tsx                 # React entry
├── App.tsx                  # shell + view switching (ViewKey union)
├── index.css                # Tailwind layers + base dark theme
├── data/
│   ├── types.ts             # types mirroring CDH MCP response shapes
│   ├── snapshot.ts          # the REAL baked data (edit here to refresh data)
│   └── dataService.ts       # THE SEAM — selectors + derived aggregations
├── lib/
│   ├── format.ts            # egp(), egpCompact(), num(), pct() … (all money is EGP)
│   └── theme.ts             # BRAND_COLORS / CHANNEL_COLORS / chart tokens
├── components/
│   ├── layout/              # Sidebar, Topbar
│   ├── ui/                  # Panel, KpiCard, Badge (+ Dot)
│   └── charts/ChartKit.tsx  # ChartFrame (ResponsiveContainer) + shared ChartTooltip
└── views/
    ├── ExecutiveOverview.tsx  # consolidated KPIs, trend, channel mix, brand board
    ├── MarketingRoi.tsx       # FB + influencer spend, coupon ROI, UTM attribution
    ├── EcommerceDeepDive.tsx  # conversion, AOV/basket histograms, products, geo
    └── OpsFinance.tsx         # GP vs COGS, cost stack, tools trend, stock alerts
```

## Data model & conventions

- **Money is EGP.** "Gross" everywhere means `gross_sales_x_factory`
  ("Gross Sales (X-Factory)"), the CDH canonical top-line. VAT is `gross * 14/114`.
- The snapshot object is typed by `Snapshot` in `types.ts`. Field names match the
  CDH MCP tools (`get_channels_summary`, `get_channel_kpis`,
  `get_facebook_ads_cost`, `get_coupon_channels_summary`, `get_utm_analytics`,
  `get_order_value_distribution`, `get_basket_size_distribution`,
  `get_location_analytics`, `get_product_table`, `get_bundles_table`,
  `get_tools_cost`, `get_influencer_costs`) so a live swap is 1:1.
- **Never read `snapshot.ts` directly from a view.** Go through `dataService.ts`.
  Derived numbers (blended ROAS, brand marketing totals, stock alerts) live there
  as pure selectors — keep new aggregations there too.
- **ROAS is directional**: coupon-attributed gross ÷ paid spend. Coupon
  attribution understates total demand — keep that caveat visible in the UI.

## Refreshing the data

To update to a new period, re-pull from the CDH MCP and replace the values in
`src/data/snapshot.ts` (keep the shapes). Nothing else needs to change. To go
fully live, reimplement the functions in `dataService.ts` to `fetch()` from a
backend that returns the same shapes (they can become async).

## Styling conventions (from the bundled ui-ux-pro-max guidance)

- Dark command-center aesthetic; surfaces use the `ink` palette (see
  `tailwind.config.js`). Panels are `rounded-2xl` with `border-ink-700`.
- Categorical color is centralized in `lib/theme.ts` — use `BRAND_COLORS` /
  `CHANNEL_COLORS`, don't hardcode hexes in components.
- Numbers use `tabular-nums` (`.tnum` / `tabular-nums`) for column alignment.
- Accessibility: keep ≥4.5:1 contrast, visible focus, and honor
  `prefers-reduced-motion` (already handled in `index.css`).
- Charts share `ChartTooltip` and `ChartFrame` from `components/charts/ChartKit`.

## Tooling in `.claude/`

- `.claude/agents/frontend-developer.md` — frontend specialist sub-agent.
- `.claude/skills/ui-ux-pro-max/` — UI/UX design-intelligence skill (Python CLI
  over a CSV knowledge base). Run its `search.py` with `--design-system` before
  large new UI work. See its `SKILL.md`.

## Git & branching

- Do not commit secrets, `.env` files, or credentials.
- `node_modules/` and `dist/` are git-ignored.
- Do not open a pull request unless explicitly asked.
