// Display formatting helpers. All money is EGP.

export function egpCompact(value: number): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''
  if (abs >= 1_000_000) return `${sign}EGP ${(abs / 1_000_000).toFixed(2)}M`
  if (abs >= 1_000) return `${sign}EGP ${(abs / 1_000).toFixed(1)}K`
  return `${sign}EGP ${abs.toFixed(0)}`
}

export function egp(value: number): string {
  return `EGP ${Math.round(value).toLocaleString('en-US')}`
}

export function num(value: number): string {
  return Math.round(value).toLocaleString('en-US')
}

export function compact(value: number): string {
  const abs = Math.abs(value)
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1)}K`
  return `${Math.round(value)}`
}

export function pct(value: number, digits = 1): string {
  return `${value.toFixed(digits)}%`
}

export function money2(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function titleCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
