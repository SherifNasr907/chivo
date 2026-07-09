import type { ReactNode } from 'react'

interface PanelProps {
  title?: string
  subtitle?: string
  right?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}

export function Panel({
  title,
  subtitle,
  right,
  children,
  className = '',
  bodyClassName = '',
}: PanelProps) {
  return (
    <section
      className={`rounded-2xl border border-ink-700/70 bg-ink-850/70 shadow-panel backdrop-blur-sm ${className}`}
    >
      {(title || right) && (
        <header className="flex items-start justify-between gap-3 border-b border-ink-700/60 px-5 py-3.5">
          <div>
            {title && (
              <h2 className="text-sm font-semibold tracking-wide text-slate-100">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
            )}
          </div>
          {right && <div className="shrink-0">{right}</div>}
        </header>
      )}
      <div className={`px-5 py-4 ${bodyClassName}`}>{children}</div>
    </section>
  )
}
