import type { ReactNode } from 'react'

type Tone = 'neutral' | 'positive' | 'negative' | 'warning' | 'accent'

const TONES: Record<Tone, string> = {
  neutral: 'bg-ink-700/60 text-slate-300 ring-ink-600',
  positive: 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/30',
  negative: 'bg-rose-500/10 text-rose-300 ring-rose-500/30',
  warning: 'bg-amber-500/10 text-amber-300 ring-amber-500/30',
  accent: 'bg-indigo-500/10 text-indigo-300 ring-indigo-500/30',
}

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: Tone
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${TONES[tone]}`}
    >
      {children}
    </span>
  )
}

export function Dot({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
      style={{ background: color }}
    />
  )
}
