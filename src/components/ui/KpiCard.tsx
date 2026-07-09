import type { ReactNode } from 'react'

interface KpiCardProps {
  label: string
  value: string
  sub?: ReactNode
  delta?: number // percent change vs prior period
  accent?: string
  hint?: string
}

export function KpiCard({ label, value, sub, delta, accent, hint }: KpiCardProps) {
  const hasDelta = typeof delta === 'number' && isFinite(delta)
  const up = hasDelta && delta! >= 0
  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink-700/70 bg-ink-850/70 px-5 py-4 shadow-panel">
      {accent && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5"
          style={{ background: accent }}
        />
      )}
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {label}
        </p>
        {hasDelta && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              up
                ? 'bg-emerald-500/10 text-emerald-300'
                : 'bg-rose-500/10 text-rose-300'
            }`}
            title="vs previous month"
          >
            {up ? '▲' : '▼'} {Math.abs(delta!).toFixed(1)}%
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight text-slate-50 tnum">
        {value}
      </p>
      {sub && <div className="mt-1 text-xs text-slate-400">{sub}</div>}
      {hint && <p className="mt-2 text-[11px] leading-snug text-slate-500">{hint}</p>}
    </div>
  )
}
