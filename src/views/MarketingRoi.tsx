import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  getBlendedRoas,
  getBrandMarketing,
  getFbAdsTotal,
  getInfluencerRoiTotal,
  getSnapshot,
} from '../data/dataService'
import { egpCompact, num, pct } from '../lib/format'
import { BRAND_LABELS, CHART_AXIS, CHART_GRID } from '../lib/theme'
import { ChartFrame, ChartTooltip } from '../components/charts/ChartKit'
import { KpiCard } from '../components/ui/KpiCard'
import { Panel } from '../components/ui/Panel'
import { Badge } from '../components/ui/Badge'

const FB_COLOR = '#38bdf8'
const INFL_COLOR = '#f472b6'

export function MarketingRoi() {
  const snap = getSnapshot()
  const fbTotal = getFbAdsTotal()
  const inflTotal = getInfluencerRoiTotal()
  const totalSpend = fbTotal + inflTotal
  const roas = getBlendedRoas()
  const brandMkt = getBrandMarketing()
  const maxUtm = Math.max(...snap.utm.map((u) => u.revenue))

  const brandData = brandMkt.map((b) => ({
    name: BRAND_LABELS[b.brand],
    Facebook: b.fbActual,
    Influencer: b.influencerRoi,
  }))

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-5">
        <KpiCard label="Paid spend" value={egpCompact(totalSpend)} accent="#818cf8" sub="FB + influencer (ROI)" />
        <KpiCard label="Facebook ads" value={egpCompact(fbTotal)} accent={FB_COLOR} sub="Actual (incl. VAT + fees)" />
        <KpiCard label="Influencer (ROI)" value={egpCompact(inflTotal)} accent={INFL_COLOR} sub="Fees · ROI campaigns" />
        <KpiCard
          label="Blended ROAS"
          value={`${roas.roas.toFixed(2)}×`}
          accent="#34d399"
          sub={`${egpCompact(roas.attributedGross)} attributed`}
          hint="Coupon-attributed gross ÷ paid spend — directional (understates total demand)."
        />
        <KpiCard
          label="Coupon orders"
          value={num(snap.couponSegments.reduce((s, r) => s + r.orders, 0))}
          accent="#fbbf24"
          sub="Ads + influencer codes"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {/* Spend by brand */}
        <Panel
          className="xl:col-span-2"
          title="Marketing spend by brand"
          subtitle="Facebook actual + influencer ROI fees · June 2026"
          right={
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full" style={{ background: FB_COLOR }} /> Facebook</span>
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full" style={{ background: INFL_COLOR }} /> Influencer</span>
            </div>
          }
        >
          <ChartFrame height={300}>
            <BarChart data={brandData} margin={{ top: 8, right: 8, left: 4, bottom: 0 }}>
              <CartesianGrid stroke={CHART_GRID} vertical={false} />
              <XAxis dataKey="name" stroke={CHART_AXIS} tickLine={false} fontSize={12} />
              <YAxis
                stroke={CHART_AXIS}
                tickLine={false}
                fontSize={11}
                width={46}
                tickFormatter={(v) => egpCompact(v).replace('EGP ', '')}
              />
              <Tooltip content={<ChartTooltip format="egp" />} cursor={{ fill: '#ffffff08' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Bar dataKey="Facebook" stackId="s" fill={FB_COLOR} />
              <Bar dataKey="Influencer" stackId="s" fill={INFL_COLOR} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ChartFrame>
        </Panel>

        {/* Coupon segments */}
        <Panel title="Coupon-attributed sales" subtitle="Sales side of ROI, by segment">
          <div className="space-y-4">
            {snap.couponSegments.map((s) => (
              <div key={s.segment} className="rounded-xl border border-ink-700/60 bg-ink-900/40 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-100">{s.segment}</span>
                  <Badge tone="positive">GP {pct(s.gross_profit_pct)}</Badge>
                </div>
                <p className="mt-1 text-xl font-bold tabular-nums text-slate-50">
                  {egpCompact(s.gross_sales_x_factory)}
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-400">
                  <div>
                    <p className="font-semibold tabular-nums text-slate-200">{num(s.orders)}</p>
                    orders
                  </div>
                  <div>
                    <p className="font-semibold tabular-nums text-slate-200">{num(s.net_units_sold)}</p>
                    units
                  </div>
                  <div>
                    <p className="font-semibold tabular-nums text-slate-200">{egpCompact(s.aov_gross)}</p>
                    AOV
                  </div>
                </div>
              </div>
            ))}
            <p className="text-[11px] leading-relaxed text-slate-500">
              Cost side: Facebook {egpCompact(fbTotal)} · influencer {egpCompact(inflTotal)}.
              Segments come from the CDH coupon engine (E-Commerce only).
            </p>
          </div>
        </Panel>
      </div>

      {/* UTM attribution */}
      <Panel
        title="Traffic attribution (UTM)"
        subtitle="E-commerce orders by source / medium · top channels"
        right={<Badge tone="accent">source_medium</Badge>}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <ChartFrame height={300}>
            <BarChart
              layout="vertical"
              data={snap.utm.slice(0, 10).map((u) => ({
                name: `${u.source} / ${u.medium}`,
                value: u.revenue,
              }))}
              margin={{ top: 0, right: 12, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke={CHART_GRID} horizontal={false} />
              <XAxis type="number" hide domain={[0, maxUtm * 1.05]} />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                stroke={CHART_AXIS}
                tickLine={false}
                axisLine={false}
                fontSize={11}
              />
              <Tooltip content={<ChartTooltip format="egp" />} cursor={{ fill: '#ffffff08' }} />
              <Bar dataKey="value" name="Revenue" radius={[0, 4, 4, 0]}>
                {snap.utm.slice(0, 10).map((_, i) => (
                  <Cell key={i} fill={i === 0 ? '#818cf8' : i < 3 ? '#38bdf8' : '#334670'} />
                ))}
              </Bar>
            </BarChart>
          </ChartFrame>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[360px] text-sm">
              <thead>
                <tr className="border-b border-ink-700/60 text-left text-[11px] uppercase tracking-wider text-slate-500">
                  <th className="pb-2 font-medium">Source / medium</th>
                  <th className="pb-2 text-right font-medium">Orders</th>
                  <th className="pb-2 text-right font-medium">Revenue</th>
                  <th className="pb-2 text-right font-medium">AOV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-800/80">
                {snap.utm.slice(0, 10).map((u, i) => (
                  <tr key={i} className="text-slate-200">
                    <td className="py-2 text-slate-300">
                      <span className="font-medium text-slate-100">{u.source}</span>
                      <span className="text-slate-500"> / {u.medium}</span>
                    </td>
                    <td className="py-2 text-right tabular-nums text-slate-400">{num(u.orders)}</td>
                    <td className="py-2 text-right font-medium tabular-nums">{egpCompact(u.revenue)}</td>
                    <td className="py-2 text-right tabular-nums text-slate-400">{egpCompact(u.aov)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Panel>
    </div>
  )
}
