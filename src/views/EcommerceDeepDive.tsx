import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { getChannel, getSnapshot } from '../data/dataService'
import { egp, egpCompact, num, pct } from '../lib/format'
import { BRAND_COLORS, BRAND_LABELS, CHART_AXIS, CHART_GRID } from '../lib/theme'
import { ChartFrame, ChartTooltip } from '../components/charts/ChartKit'
import { KpiCard } from '../components/ui/KpiCard'
import { Panel } from '../components/ui/Panel'
import { Badge, Dot } from '../components/ui/Badge'

const BAND_COLORS = ['#334670', '#3b82f6', '#38bdf8', '#818cf8']

export function EcommerceDeepDive() {
  const snap = getSnapshot()
  const ec = getChannel('ecommerce')!
  const maxLoc = snap.locations[0].gross_sales_x_factory
  const topLocations = snap.locations.slice(0, 12)

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="E-com gross" value={egpCompact(ec.gross_sales_x_factory)} accent="#38bdf8" />
        <KpiCard label="Conversion" value={pct(ec.conversion_rate ?? 0, 2)} accent="#fbbf24" sub={`${num(ec.active_users ?? 0)} visitors`} />
        <KpiCard label="AOV (gross)" value={egp(ec.aov_gross)} accent="#f472b6" />
        <KpiCard label="ASP (net/VAT)" value={egp(ec.asp_net_vat)} accent="#a78bfa" sub="Per unit" />
        <KpiCard label="Net units" value={num(ec.net_units_sold)} accent="#34d399" />
        <KpiCard label="Gross profit" value={pct(ec.gross_profit_pct)} accent="#22d3ee" sub={egpCompact(ec.gross_profit)} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Order value distribution */}
        <Panel title="Order-value distribution" subtitle="Orders per value band (EGP)">
          <ChartFrame height={240}>
            <BarChart data={snap.orderValue} margin={{ top: 8, right: 8, left: 4, bottom: 0 }}>
              <CartesianGrid stroke={CHART_GRID} vertical={false} />
              <XAxis dataKey="band" stroke={CHART_AXIS} tickLine={false} fontSize={12} />
              <YAxis stroke={CHART_AXIS} tickLine={false} fontSize={11} width={44} tickFormatter={(v) => num(v)} />
              <Tooltip content={<ChartTooltip format="num" />} cursor={{ fill: '#ffffff08' }} />
              <Bar dataKey="orders" name="Orders" radius={[4, 4, 0, 0]}>
                {snap.orderValue.map((_, i) => (
                  <Cell key={i} fill={BAND_COLORS[i % BAND_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ChartFrame>
          <p className="mt-2 text-[11px] text-slate-500">
            {pct((snap.orderValue[3].orders / ec.orders) * 100)} of orders are 500+ EGP,
            driving {egpCompact(snap.orderValue[3].gross_sales_x_factory)} gross.
          </p>
        </Panel>

        {/* Basket size */}
        <Panel title="Basket-size distribution" subtitle="Orders by items per basket">
          <ChartFrame height={240}>
            <BarChart data={snap.basketSize} margin={{ top: 8, right: 8, left: 4, bottom: 0 }}>
              <CartesianGrid stroke={CHART_GRID} vertical={false} />
              <XAxis dataKey="band" stroke={CHART_AXIS} tickLine={false} fontSize={12} />
              <YAxis stroke={CHART_AXIS} tickLine={false} fontSize={11} width={44} tickFormatter={(v) => num(v)} />
              <Tooltip content={<ChartTooltip format="num" />} cursor={{ fill: '#ffffff08' }} />
              <Bar dataKey="orders" name="Orders" radius={[4, 4, 0, 0]}>
                {snap.basketSize.map((_, i) => (
                  <Cell key={i} fill={BAND_COLORS[i % BAND_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ChartFrame>
          <p className="mt-2 text-[11px] text-slate-500">
            {pct((snap.basketSize[3].orders / ec.orders) * 100)} of orders carry 4+ items —
            bundle-led baskets at {egp(snap.basketSize[3].aov)} AOV.
          </p>
        </Panel>
      </div>

      {/* Products & bundles */}
      <div className="grid gap-5 xl:grid-cols-2">
        <Panel title="Top products" subtitle="By net sales · E-Commerce · June 2026">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] text-sm">
              <thead>
                <tr className="border-b border-ink-700/60 text-left text-[11px] uppercase tracking-wider text-slate-500">
                  <th className="pb-2 font-medium">Product</th>
                  <th className="pb-2 text-right font-medium">Net sales</th>
                  <th className="pb-2 text-right font-medium">Units</th>
                  <th className="pb-2 text-right font-medium">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-800/80">
                {snap.topProducts.slice(0, 12).map((p) => (
                  <tr key={`${p.brand}-${p.sku}`} className="text-slate-200">
                    <td className="py-2">
                      <span className="flex items-center gap-2">
                        <Dot color={BRAND_COLORS[p.brand]} />
                        <span className="max-w-[220px] truncate" title={p.product_name}>
                          {p.product_name}
                        </span>
                      </span>
                      <span className="ml-4 text-[11px] text-slate-500">{BRAND_LABELS[p.brand]}</span>
                    </td>
                    <td className="py-2 text-right font-medium tabular-nums">{egpCompact(p.net_sales)}</td>
                    <td className="py-2 text-right tabular-nums text-slate-400">{num(p.net_units_sold)}</td>
                    <td className="py-2 text-right tabular-nums">
                      <span className={p.stock_quantity <= 0 ? 'text-rose-300' : 'text-slate-400'}>
                        {num(p.stock_quantity)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Top bundles" subtitle="By revenue · E-Commerce · June 2026">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] text-sm">
              <thead>
                <tr className="border-b border-ink-700/60 text-left text-[11px] uppercase tracking-wider text-slate-500">
                  <th className="pb-2 font-medium">Bundle</th>
                  <th className="pb-2 text-right font-medium">Revenue</th>
                  <th className="pb-2 text-right font-medium">Sold</th>
                  <th className="pb-2 text-right font-medium">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-800/80">
                {snap.topBundles.slice(0, 12).map((b) => (
                  <tr key={b.bundle_sku} className="text-slate-200">
                    <td className="py-2">
                      <span className="flex items-center gap-2">
                        <Dot color={BRAND_COLORS[b.brand]} />
                        <span className="max-w-[220px] truncate" title={b.product_name}>
                          {b.product_name}
                        </span>
                      </span>
                      <span className="ml-4 text-[11px] text-slate-500">{BRAND_LABELS[b.brand]}</span>
                    </td>
                    <td className="py-2 text-right font-medium tabular-nums">{egpCompact(b.bundle_revenue)}</td>
                    <td className="py-2 text-right tabular-nums text-slate-400">{num(b.bundles_sold)}</td>
                    <td className="py-2 text-right tabular-nums">
                      <span className={b.stock_quantity <= 0 ? 'text-rose-300' : 'text-slate-400'}>
                        {num(b.stock_quantity)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      {/* Geography */}
      <Panel
        title="Sales by governorate"
        subtitle="Billing location · E-Commerce · June 2026"
        right={<Badge tone="accent">{num(snap.locations.length)} governorates</Badge>}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <ChartFrame height={320}>
            <BarChart
              layout="vertical"
              data={topLocations.map((l) => ({ name: l.state, value: l.gross_sales_x_factory }))}
              margin={{ top: 0, right: 12, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke={CHART_GRID} horizontal={false} />
              <XAxis type="number" hide domain={[0, maxLoc * 1.05]} />
              <YAxis
                type="category"
                dataKey="name"
                width={104}
                stroke={CHART_AXIS}
                tickLine={false}
                axisLine={false}
                fontSize={11}
              />
              <Tooltip content={<ChartTooltip format="egp" />} cursor={{ fill: '#ffffff08' }} />
              <Bar dataKey="value" name="Gross" radius={[0, 4, 4, 0]}>
                {topLocations.map((_, i) => (
                  <Cell key={i} fill={i < 3 ? '#38bdf8' : '#334670'} />
                ))}
              </Bar>
            </BarChart>
          </ChartFrame>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[360px] text-sm">
              <thead>
                <tr className="border-b border-ink-700/60 text-left text-[11px] uppercase tracking-wider text-slate-500">
                  <th className="pb-2 font-medium">Governorate</th>
                  <th className="pb-2 text-right font-medium">Orders</th>
                  <th className="pb-2 text-right font-medium">Gross</th>
                  <th className="pb-2 text-right font-medium">AOV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-800/80">
                {topLocations.map((l) => (
                  <tr key={l.state} className="text-slate-200">
                    <td className="py-2">
                      <span className="text-slate-100">{l.state}</span>
                      {l.state_ar && <span className="ml-2 text-[11px] text-slate-500">{l.state_ar}</span>}
                    </td>
                    <td className="py-2 text-right tabular-nums text-slate-400">{num(l.orders)}</td>
                    <td className="py-2 text-right font-medium tabular-nums">{egpCompact(l.gross_sales_x_factory)}</td>
                    <td className="py-2 text-right tabular-nums text-slate-400">{egp(l.aov)}</td>
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
