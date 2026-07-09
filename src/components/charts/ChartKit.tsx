import type { ReactNode } from 'react'
import { ResponsiveContainer } from 'recharts'
import { egpCompact, num } from '../../lib/format'

export function ChartFrame({
  height = 260,
  children,
}: {
  height?: number
  children: ReactNode
}) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>{children as any}</ResponsiveContainer>
    </div>
  )
}

type TooltipFormat = 'egp' | 'num' | 'pct'

interface TipProps {
  active?: boolean
  payload?: any[]
  label?: string | number
  format?: TooltipFormat
  labelSuffix?: string
}

function fmt(v: number, f: TooltipFormat) {
  if (f === 'egp') return egpCompact(v)
  if (f === 'pct') return `${v.toFixed(1)}%`
  return num(v)
}

// Shared dark tooltip so every chart reads consistently.
export function ChartTooltip({
  active,
  payload,
  label,
  format = 'egp',
  labelSuffix = '',
}: TipProps) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="rounded-lg border border-ink-600 bg-ink-900/95 px-3 py-2 text-xs shadow-xl">
      {label !== undefined && (
        <p className="mb-1 font-semibold text-slate-200">
          {label}
          {labelSuffix}
        </p>
      )}
      <ul className="space-y-0.5">
        {payload.map((p, i) => (
          <li key={i} className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: p.color || p.fill }}
            />
            <span className="text-slate-400">{p.name}</span>
            <span className="ml-auto font-medium tabular-nums text-slate-100">
              {fmt(Number(p.value), format)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
