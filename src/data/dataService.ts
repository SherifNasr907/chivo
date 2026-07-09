// ---------------------------------------------------------------------------
// DATA SERVICE — the single seam between the UI and the data source.
//
// Today it returns the baked real snapshot synchronously. To go live, replace
// the bodies of these functions with `fetch()` / MCP calls that return the
// same shapes (they can be made async without changing call sites much — the
// views already treat these as pure selectors). Nothing else in the app reads
// `snapshot` directly.
// ---------------------------------------------------------------------------

import { snapshot } from './snapshot'
import type {
  BrandKey,
  ChannelKey,
  ChannelSummary,
  Snapshot,
} from './types'

export function getSnapshot(): Snapshot {
  return snapshot
}

export function getMeta() {
  return snapshot.meta
}

export function getChannel(channel: ChannelKey): ChannelSummary | undefined {
  return snapshot.channels.find((c) => c.channel === channel)
}

export function getCdh(): ChannelSummary {
  // CDH consolidated row always exists in the snapshot.
  return snapshot.channels.find((c) => c.channel === 'cdh')!
}

/** Non-consolidated channels, largest gross first. */
export function getSalesChannels(): ChannelSummary[] {
  return snapshot.channels
    .filter((c) => c.channel !== 'cdh')
    .sort((a, b) => b.gross_sales_x_factory - a.gross_sales_x_factory)
}

// --- Marketing / ROI derived selectors -------------------------------------

export interface BrandMarketing {
  brand: BrandKey
  fbActual: number
  influencerRoi: number
  totalSpend: number
}

export function getBrandMarketing(): BrandMarketing[] {
  const brands = new Set<BrandKey>()
  snapshot.fbAds.forEach((r) => brands.add(r.brand))
  snapshot.influencerRoiCost.forEach((r) => brands.add(r.brand))

  return [...brands]
    .map((brand) => {
      const fbActual =
        snapshot.fbAds.find((r) => r.brand === brand)?.actual_spend ?? 0
      const influencerRoi =
        snapshot.influencerRoiCost.find((r) => r.brand === brand)?.roi_fees ?? 0
      return { brand, fbActual, influencerRoi, totalSpend: fbActual + influencerRoi }
    })
    .sort((a, b) => b.totalSpend - a.totalSpend)
}

export function getFbAdsTotal(): number {
  return snapshot.fbAds.reduce((s, r) => s + r.actual_spend, 0)
}

export function getInfluencerRoiTotal(): number {
  return snapshot.influencerRoiCost.reduce((s, r) => s + r.roi_fees, 0)
}

/**
 * Blended paid-marketing ROAS on the coupon-attributed sales side:
 * (Ads + Influencer coupon gross) / (FB ads + Influencer ROI fees).
 * This is directional — coupon attribution understates total demand.
 */
export function getBlendedRoas(): {
  attributedGross: number
  spend: number
  roas: number
} {
  const attributedGross = snapshot.couponSegments.reduce(
    (s, r) => s + r.gross_sales_x_factory,
    0,
  )
  const spend = getFbAdsTotal() + getInfluencerRoiTotal()
  return { attributedGross, spend, roas: spend ? attributedGross / spend : 0 }
}

// --- Ops / stock derived selectors ------------------------------------------

export interface StockAlert {
  name: string
  brand: BrandKey
  sku: string
  stock_quantity: number
  kind: 'product' | 'bundle'
}

/** SKUs and bundles at or below zero available stock (oversold / out of stock). */
export function getStockAlerts(): StockAlert[] {
  const products: StockAlert[] = snapshot.topProducts
    .filter((p) => p.stock_quantity <= 0)
    .map((p) => ({
      name: p.product_name,
      brand: p.brand,
      sku: p.sku,
      stock_quantity: p.stock_quantity,
      kind: 'product' as const,
    }))
  const bundles: StockAlert[] = snapshot.topBundles
    .filter((b) => b.stock_quantity <= 0)
    .map((b) => ({
      name: b.product_name,
      brand: b.brand,
      sku: b.bundle_sku,
      stock_quantity: b.stock_quantity,
      kind: 'bundle' as const,
    }))
  return [...products, ...bundles].sort(
    (a, b) => a.stock_quantity - b.stock_quantity,
  )
}

export function getLatestToolsCost() {
  return snapshot.toolsCost[snapshot.toolsCost.length - 1]
}
