import { getCdh, getMeta } from '../../data/dataService'
import { egpCompact, num, pct } from '../../lib/format'
import { Badge } from '../ui/Badge'

const TITLES: Record<string, string> = {
  overview: 'Executive Overview',
  marketing: 'Marketing & ROI',
  ecommerce: 'E-Commerce Deep-Dive',
  ops: 'Ops & Finance',
}

export function Topbar({ view }: { view: string }) {
  const meta = getMeta()
  const cdh = getCdh()
  return (
    <header className="sticky top-0 z-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-ink-700/60 bg-ink-950/80 px-5 py-3 backdrop-blur-md">
      <div className="min-w-0">
        <h1 className="truncate text-base font-bold text-slate-50">
          {TITLES[view] ?? 'Command Center'}
        </h1>
        <p className="text-xs text-slate-400">
          {meta.period_label} · all channels · amounts in {meta.currency}
        </p>
      </div>

      <div className="ml-auto flex flex-wrap items-center gap-x-6 gap-y-1">
        <Stat label="Gross (X-Factory)" value={egpCompact(cdh.gross_sales_x_factory)} />
        <Stat label="Gross profit" value={pct(cdh.gross_profit_pct)} />
        <Stat label="Orders" value={num(cdh.orders)} />
        <Badge tone="positive">● Live snapshot</Badge>
      </div>
    </header>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-right">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className="text-sm font-semibold tabular-nums text-slate-100">{value}</p>
    </div>
  )
}
