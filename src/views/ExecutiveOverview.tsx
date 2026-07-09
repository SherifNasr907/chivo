import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  getCdh,
  getSalesChannels,
  getSnapshot,
} from '../data/dataService'
import { egpCompact, num, pct } from '../lib/format'
import { BRAND_COLORS, BRAND_LABELS, CHANNEL_COLORS, CHART_AXIS, CHART_GRID } from '../lib/theme'
import { ChartFrame, ChartTooltip } from '../components/charts/ChartKit'
import { KpiCard } from '../components/ui/KpiCard'
import { Panel } from '../components/ui/Panel'
import { Badge, Dot } from '../components/ui/Badge'

export function ExecutiveOverview() {
  const snap = getSnapshot()
  const cdh = getCdh()
  const channels = getSalesChannels()
  const trend = snap.trend
  const cur = trend[trend.length - 1]
  const prev = trend[trend.length - 2]

  const grossDelta = ((cur.cdh_gross - prev.cdh_gross) / prev.cdh_gross) * 100
  const ordersDelta = ((cur.orders - prev.orders) / prev.orders) * 100
  const unitsDelta =
    ((cur.net_units_sold - prev.net_units_sold) / prev.net_units_sold) * 100
  const convDelta =
    ((cur.conversion_rate - prev.conversion_rate) / prev.conversion_rate) * 100

  const brands = [...snap.ecommerceBrands].sort(
    (a, b) => b.gross_sales_x_factory - a.gross_sales_x_factory,
  )
  const maxBrand = brands[0].gross_sales_x_factory

  return (
    <div className="space-y-5">
      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-6">
        <KpiCard
          label="Gross (X-Factory)"
          value={egpCompact(cdh.gross_sales_x_factory)}
          delta={grossDelta}
          accent={CHANNEL_COLORS.cdh}
          sub="Consolidated CDH"
        />
        <KpiCard
          label="Gross profit"
          value={pct(cdh.gross_profit_pct)}
          accent="#34d399"
          sub={egpCompact(cdh.gross_profit)}
        />
        <KpiCard
          label="Orders"
          value={num(cdh.orders)}
          delta={ordersDelta}
          accent="#38bdf8"
        />
        <KpiCard
          label="Net units"
          value={num(cdh.net_units_sold)}
          delta={unitsDelta}
          accent="#a78bfa"
        />
        <KpiCard
          label="E-com conversion"
          value={pct(cur.conversion_rate, 2)}
          delta={convDelta}
          accent="#fbbf24"
          sub={`${num(cdh.active_users ?? 0)} visitors`}
        />
        <KpiCard
          label="E-com AOV"
          value={egpCompact(
            snap.channels.find((c) => c.channel === 'ecommerce')!.aov_gross,
          )}
          accent="#f472b6"
          sub="Gross / order"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {/* Trend */}
        <Panel
          className="xl:col-span-2"
          title="Revenue & margin trend"
          subtitle="Gross by channel (stacked) with consolidated gross-profit %"
          right={<Badge tone="accent">Jan – Jun 2026</Badge>}
        >
          <ChartFrame height={300}>
            <ComposedChart data={trend} margin={{ top: 8, right: 8, left: 4, bottom: 0 }}>
              <CartesianGrid stroke={CHART_GRID} vertical={false} />
              <XAxis dataKey="month" stroke={CHART_AXIS} tickLine={false} fontSize={12} />
              <YAxis
                yAxisId="left"
                stroke={CHART_AXIS}
                tickLine={false}
                fontSize={11}
                tickFormatter={(v) => egpCompact(v).replace('EGP ', '')}
                width={46}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[60, 80]}
                stroke={CHART_AXIS}
                tickLine={false}
                fontSize={11}
                tickFormatter={(v) => `${v}%`}
                width={38}
              />
              <Tooltip content={<ChartTooltip format="egp" />} cursor={{ fill: '#ffffff08' }} />
              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              />
              <Bar yAxisId="left" dataKey="ecommerce" name="E-Commerce" stackId="g" fill={CHANNEL_COLORS.ecommerce} radius={[0, 0, 0, 0]} />
              <Bar yAxisId="left" dataKey="b2b" name="B2B" stackId="g" fill={CHANNEL_COLORS.b2b} />
              <Bar yAxisId="left" dataKey="wholesales" name="Wholesales" stackId="g" fill={CHANNEL_COLORS.wholesales} />
              <Bar yAxisId="left" dataKey="pharmacies" name="Pharmacies" stackId="g" fill={CHANNEL_COLORS.pharmacies} radius={[3, 3, 0, 0]} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cdh_gross_profit_pct"
                name="Gross profit %"
                stroke="#fca5a5"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#fca5a5' }}
              />
            </ComposedChart>
          </ChartFrame>
        </Panel>

        {/* Channel mix */}
        <Panel title="Channel mix" subtitle={`${egpCompact(cdh.gross_sales_x_factory)} consolidated gross`}>
          <div className="space-y-3">
            {channels.map((c) => {
              const share = (c.gross_sales_x_factory / cdh.gross_sales_x_factory) * 100
              return (
                <div key={c.channel}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-slate-300">
                      <Dot color={CHANNEL_COLORS[c.channel]} />
                      {c.display_name}
                    </span>
                    <span className="tabular-nums text-slate-400">
                      {egpCompact(c.gross_sales_x_factory)} · {pct(share)}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-ink-700/70">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${share}%`, background: CHANNEL_COLORS[c.channel] }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Panel>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {/* Channel table */}
        <Panel className="xl:col-span-2" title="Channel performance" subtitle="June 2026">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-ink-700/60 text-left text-[11px] uppercase tracking-wider text-slate-500">
                  <th className="pb-2 font-medium">Channel</th>
                  <th className="pb-2 text-right font-medium">Gross</th>
                  <th className="pb-2 text-right font-medium">GP %</th>
                  <th className="pb-2 text-right font-medium">Orders</th>
                  <th className="pb-2 text-right font-medium">Units</th>
                  <th className="pb-2 text-right font-medium">AOV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-800/80">
                {channels.map((c) => (
                  <tr key={c.channel} className="text-slate-200">
                    <td className="py-2.5">
                      <span className="flex items-center gap-2">
                        <Dot color={CHANNEL_COLORS[c.channel]} />
                        {c.display_name}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-medium tabular-nums">
                      {egpCompact(c.gross_sales_x_factory)}
                    </td>
                    <td className="py-2.5 text-right tabular-nums">
                      <span className={c.gross_profit_pct >= 73 ? 'text-emerald-300' : 'text-slate-300'}>
                        {pct(c.gross_profit_pct)}
                      </span>
                    </td>
                    <td className="py-2.5 text-right tabular-nums text-slate-400">{num(c.orders)}</td>
                    <td className="py-2.5 text-right tabular-nums text-slate-400">{num(c.net_units_sold)}</td>
                    <td className="py-2.5 text-right tabular-nums text-slate-400">{egpCompact(c.aov_gross)}</td>
                  </tr>
                ))}
                <tr className="text-slate-100">
                  <td className="pt-3 font-semibold">CDH total</td>
                  <td className="pt-3 text-right font-bold tabular-nums">{egpCompact(cdh.gross_sales_x_factory)}</td>
                  <td className="pt-3 text-right font-semibold tabular-nums text-emerald-300">{pct(cdh.gross_profit_pct)}</td>
                  <td className="pt-3 text-right tabular-nums">{num(cdh.orders)}</td>
                  <td className="pt-3 text-right tabular-nums">{num(cdh.net_units_sold)}</td>
                  <td className="pt-3 text-right tabular-nums">{egpCompact(cdh.aov_gross)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Panel>

        {/* Brand leaderboard */}
        <Panel title="E-commerce brand leaderboard" subtitle="Gross · June 2026">
          <ChartFrame height={220}>
            <BarChart
              layout="vertical"
              data={brands.map((b) => ({
                name: BRAND_LABELS[b.brand],
                brand: b.brand,
                value: b.gross_sales_x_factory,
              }))}
              margin={{ top: 0, right: 12, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke={CHART_GRID} horizontal={false} />
              <XAxis type="number" hide domain={[0, maxBrand * 1.05]} />
              <YAxis
                type="category"
                dataKey="name"
                width={82}
                stroke={CHART_AXIS}
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <Tooltip content={<ChartTooltip format="egp" />} cursor={{ fill: '#ffffff08' }} />
              <Bar dataKey="value" name="Gross" radius={[0, 4, 4, 0]}>
                {brands.map((b) => (
                  <Cell key={b.brand} fill={BRAND_COLORS[b.brand]} />
                ))}
              </Bar>
            </BarChart>
          </ChartFrame>
          <ul className="mt-3 space-y-1.5 text-xs">
            {brands.map((b) => (
              <li key={b.brand} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <Dot color={BRAND_COLORS[b.brand]} />
                  {BRAND_LABELS[b.brand]}
                </span>
                <span className="tabular-nums text-slate-400">
                  {pct(b.brand_SPV_share_of_channel_SPV)} SPV · GP {pct(b.gross_profit_pct)}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}
