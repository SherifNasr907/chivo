import type { BrandKey, ChannelKey } from '../data/types'

// Categorical palettes chosen for AA contrast on the dark command-center
// surface and to stay distinguishable side-by-side in charts.

export const BRAND_COLORS: Record<BrandKey, string> = {
  cleo: '#818cf8', // indigo
  blankie: '#22d3ee', // cyan
  skinside: '#f472b6', // pink
  dermatique: '#a78bfa', // violet
  ohanabaths: '#34d399', // emerald
  kayanek: '#fbbf24', // amber
}

export const BRAND_LABELS: Record<BrandKey, string> = {
  cleo: 'Cleo',
  blankie: 'Blankie',
  skinside: 'Skinside',
  dermatique: 'Dermatique',
  ohanabaths: 'Ohanabaths',
  kayanek: 'Kayanek',
}

export const CHANNEL_COLORS: Record<ChannelKey, string> = {
  ecommerce: '#38bdf8', // sky
  b2b: '#a78bfa', // violet
  wholesales: '#34d399', // emerald
  pharmacies: '#fbbf24', // amber
  cdh: '#e2e8f0', // slate-200
}

export const CHART_GRID = '#1d263f'
export const CHART_AXIS = '#64748b'
export const POSITIVE = '#34d399'
export const NEGATIVE = '#fb7185'
export const WARNING = '#fbbf24'
