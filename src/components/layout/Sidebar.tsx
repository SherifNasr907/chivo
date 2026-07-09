import type { ViewKey } from '../../App'

const NAV: { key: ViewKey; label: string; icon: string; blurb: string }[] = [
  { key: 'overview', label: 'Executive', icon: '◧', blurb: 'Consolidated' },
  { key: 'marketing', label: 'Marketing & ROI', icon: '◈', blurb: 'Spend · ROAS' },
  { key: 'ecommerce', label: 'E-Commerce', icon: '◨', blurb: 'DTC deep-dive' },
  { key: 'ops', label: 'Ops & Finance', icon: '◩', blurb: 'Stock · costs' },
]

export function Sidebar({
  view,
  onChange,
}: {
  view: ViewKey
  onChange: (v: ViewKey) => void
}) {
  return (
    <aside className="flex w-16 shrink-0 flex-col items-stretch gap-1 border-r border-ink-700/60 bg-ink-900/60 px-2 py-4 md:w-60 md:px-3">
      <div className="mb-4 flex items-center gap-2.5 px-1 md:px-2">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-black text-white shadow-lg">
          CH
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-bold leading-tight text-slate-100">
            Command Center
          </p>
          <p className="text-[11px] text-slate-400">CDH · 6 brands</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV.map((n) => {
          const active = n.key === view
          return (
            <button
              key={n.key}
              onClick={() => onChange(n.key)}
              aria-current={active ? 'page' : undefined}
              className={`group flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors md:px-3 ${
                active
                  ? 'bg-indigo-500/15 text-slate-50 ring-1 ring-inset ring-indigo-500/40'
                  : 'text-slate-400 hover:bg-ink-800/70 hover:text-slate-200'
              }`}
            >
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center text-base ${
                  active ? 'text-indigo-300' : 'text-slate-500 group-hover:text-slate-300'
                }`}
                aria-hidden
              >
                {n.icon}
              </span>
              <span className="hidden md:block">
                <span className="block text-sm font-semibold leading-tight">
                  {n.label}
                </span>
                <span className="block text-[11px] text-slate-500">{n.blurb}</span>
              </span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto hidden px-2 md:block">
        <p className="text-[10px] leading-relaxed text-slate-600">
          Baked snapshot · data via CDH MCP. Swap <code className="text-slate-500">dataService</code>{' '}
          for live.
        </p>
      </div>
    </aside>
  )
}
