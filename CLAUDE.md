# CLAUDE.md

Guidance for AI assistants (Claude Code and others) working in this repository.

## What this repository is

This is a **frontend-development scaffold**. As of this writing it contains **no
application source code** — no `package.json`, no build config, no `src/`. What
it *does* contain is pre-configured Claude Code tooling that shapes how frontend
work should be done here once code lands:

- **`.claude/agents/frontend-developer.md`** — a specialized sub-agent for
  building complete frontend applications (React 19+, Vue 3.5+, Angular 20+, plus
  Next.js 15 / Nuxt 4 meta-frameworks).
- **`.claude/skills/ui-ux-pro-max/`** — a searchable UI/UX design-intelligence
  skill (styles, color palettes, font pairings, UX guidelines, chart types, and
  per-stack best practices), driven by a Python CLI.

Treat this repo as the starting point for a new frontend project. When you add
application code, **update this file** to describe the real structure, scripts,
and conventions that emerge.

## Repository layout

```
.
├── CLAUDE.md                         # This file
└── .claude/
    ├── agents/
    │   └── frontend-developer.md     # Frontend specialist sub-agent
    └── skills/
        └── ui-ux-pro-max/
            ├── SKILL.md              # Skill instructions + search reference
            ├── scripts/              # Python CLI (search.py, core.py, design_system.py)
            └── data/                 # CSV knowledge base (styles, colors, typography,
                                      #   ux, charts, landing, products, + per-stack/)
```

## Development workflow

There is no application yet, so there are no install/build/test/lint commands to
run. Before assuming any exist, check for a `package.json` (or equivalent) first.

When starting the actual frontend app, follow the conventions the bundled tooling
already encodes:

1. **Design first.** For any UI work — new components, pages, palettes,
   typography, or reviewing existing UI — use the `ui-ux-pro-max` skill before
   writing markup. See "Using the ui-ux-pro-max skill" below.
2. **Delegate substantial frontend builds** (multi-page apps, framework
   migrations, component libraries) to the `frontend-developer` agent rather than
   improvising. Invoke it via the Agent/Task tooling with `frontend-developer` as
   the agent type.
3. **Default stack:** if the user doesn't specify one, the tooling defaults to
   **`html-tailwind`**. React, Next.js, Vue, Svelte, SwiftUI, React Native,
   Flutter, and shadcn/ui are all supported stacks.
4. **Once code exists,** wire up the standard toolchain (package manager, build,
   test, lint, typecheck) and document the exact commands here so future sessions
   don't have to rediscover them.

## Using the ui-ux-pro-max skill

The skill is a Python CLI over a CSV knowledge base. Python 3 is required
(`python3 --version`).

**Always start with a design system**, then supplement with targeted searches:

```bash
# 1. Generate a full design system (REQUIRED first step for any UI work)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<product> <industry> <keywords>" --design-system [-p "Project Name"]

# 2. Supplement with domain searches as needed
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]

# 3. Get stack-specific implementation guidance (default: html-tailwind)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack <stack>
```

- **Domains:** `product`, `style`, `typography`, `color`, `landing`, `chart`,
  `ux`, `react`, `web`, `prompt`
- **Stacks:** `html-tailwind` (default), `react`, `nextjs`, `vue`, `svelte`,
  `swiftui`, `react-native`, `flutter`, `shadcn`

Full instructions and examples live in
`.claude/skills/ui-ux-pro-max/SKILL.md`.

## Key conventions

These come from the bundled tooling and should be treated as non-negotiable
defaults for UI code in this repo:

- **Accessibility is CRITICAL.** ≥4.5:1 text contrast, visible focus states,
  alt text, `aria-label` on icon-only buttons, keyboard nav matching visual
  order, labeled form fields. Target WCAG 2.2 (including Focus Appearance and
  Target Size Minimum).
- **Touch targets** ≥ 44×44px; use click/tap (not hover) for primary actions;
  disable buttons during async operations.
- **Performance:** optimized images (WebP, `srcset`, lazy loading), honor
  `prefers-reduced-motion`, reserve space for async content to avoid layout
  shift; animate `transform`/`opacity`, not `width`/`height`.
- **Typography:** ≥16px body text on mobile, line-height 1.5–1.75, 65–75 chars
  per line.
- **Icons:** use SVG icons, never emojis.
- **Consistency:** one style system across all pages; define a z-index scale.
- **TypeScript** for framework code; write tests alongside implementation.

## Git & branching

- Do not commit secrets, `.env` files, or credentials.
- Keep commits focused with clear, descriptive messages.
- Do not open a pull request unless the user explicitly asks.

## Maintaining this file

This CLAUDE.md describes a pre-code scaffold. **When application code is added,
revise it** to reflect the real stack, directory structure, and the exact
install/build/test/lint/typecheck commands — replacing the placeholder guidance
above.
