// Types mirror the shapes returned by the CDH MCP tools so that the baked
// snapshot in `snapshot.ts` can later be swapped for live responses without
// touching the views. See `dataService.ts` for the swappable seam.

export type ChannelKey = 'ecommerce' | 'b2b' | 'wholesales' | 'pharmacies' | 'cdh'

export type BrandKey =
  | 'cleo'
  | 'blankie'
  | 'skinside'
  | 'dermatique'
  | 'ohanabaths'
  | 'kayanek'

/** One row of get_channels_summary / channel totals. */
export interface ChannelSummary {
  channel: ChannelKey
  display_name: string
  gross_sales_x_factory: number
  vat: number
  sales_post_vat: number
  product_sales: number
  net_units_sold: number
  asp_gross: number
  asp_net_vat: number
  cogs: number
  cogs_per_unit: number
  other_revenue: number
  orders: number
  aov_gross: number
  active_users: number | null
  conversion_rate: number | null
  gross_profit: number
  gross_profit_pct: number
  shipping_collected: number
  service_fees_collected: number
  discount: number
  refunds: number
  tax: number
}

export interface BrandKpi {
  brand: BrandKey
  gross_sales_x_factory: number
  sales_post_vat: number
  product_sales: number
  net_units_sold: number
  asp_net_vat: number
  cogs: number
  orders: number
  aov_gross: number
  active_users: number | null
  conversion_rate: number | null
  gross_profit: number
  gross_profit_pct: number
  other_revenue: number
  discount: number
  brand_SPV_share_of_channel_SPV: number
}

/** One month of the consolidated trend (per-channel gross + CDH rollup). */
export interface MonthlyTrendPoint {
  month: string // "Jan"
  ecommerce: number
  b2b: number
  wholesales: number
  pharmacies: number
  cdh_gross: number
  cdh_gross_profit_pct: number
  orders: number
  net_units_sold: number
  conversion_rate: number
  cogs: number
}

export interface FbAdsBrandCost {
  brand: BrandKey
  spend: number
  actual_spend: number
}

export interface InfluencerBrandCost {
  brand: BrandKey
  roi_fees: number
}

export interface CouponSegmentSummary {
  segment: string
  gross_sales_x_factory: number
  product_sales: number
  orders: number
  net_units_sold: number
  gross_profit: number
  gross_profit_pct: number
  aov_gross: number
}

export interface UtmRow {
  source: string
  medium: string
  orders: number
  revenue: number
  aov: number
}

export interface DistributionRow {
  band: string
  orders: number
  customers: number
  gross_sales_x_factory: number
  units_sold: number
  aov: number
}

export interface LocationRow {
  state: string // canonical English label
  state_ar?: string
  orders: number
  customers: number
  gross_sales_x_factory: number
  units_sold: number
  aov: number
}

export interface ProductRow {
  brand: BrandKey
  product_name: string
  sku: string
  net_sales: number
  net_units_sold: number
  asp_net_vat: number
  cogs: number
  cogs_per_unit: number
  stock_quantity: number
}

export interface BundleRow {
  bundle_sku: string
  product_name: string
  brand: BrandKey
  bundles_sold: number
  bundle_revenue: number
  cogs: number
  stock_quantity: number
}

export interface ToolsCostRow {
  year: number
  month: number
  company_wide: number
  ecom_base: number
  total: number
}

export interface Snapshot {
  meta: {
    period_label: string
    period_start: string
    period_end: string
    currency: string
    generated_at: string
    source: string
  }
  channels: ChannelSummary[]
  ecommerceBrands: BrandKpi[]
  trend: MonthlyTrendPoint[]
  fbAds: FbAdsBrandCost[]
  influencerRoiCost: InfluencerBrandCost[]
  couponSegments: CouponSegmentSummary[]
  utm: UtmRow[]
  orderValue: DistributionRow[]
  basketSize: DistributionRow[]
  locations: LocationRow[]
  topProducts: ProductRow[]
  topBundles: BundleRow[]
  toolsCost: ToolsCostRow[]
}
