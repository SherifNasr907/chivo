import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  getCdh,
  getFbAdsTotal,
  getInfluencerRoiTotal,
  getLatestToolsCost,
  getSalesChannels,
  getSnapshot,
  getStockAlerts,
} from '../data/dataService'
import { egp, egpCompact, num, pct } from '../lib/format'
import { BRAND_LABELS, CHART_AXIS, CHART_GRID } from '../lib/theme'
import { ChartFrame, ChartTooltip } from '../components/charts/ChartKit'
import { KpiCard } from '../components/ui/KpiCard'
import { Panel } from '../components/ui/Panel'
import { Badge } from '../components/ui/Badge'

const MONTHS = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function OpsFinance() {
  const snap = getSnapshot()
  const cdh = getCdh()
  const channels = getSalesChannels()
  const alerts = getStockAlerts()
  const tools = getLatestToolsCost()
  const fbTotal = getFbAdsTotal()
  const inflTotal = getInfluencerRoiTotal()

  const cogsByChannel = channels.map((c) => ({
    name: c.display_name.replace(' (Consolidated)', ''),
    'Gross profit': c.gross_profit,
    COGS: c.cogs,
  }))

  const toolsTrend = snap.toolsCost.map((t) => ({
    label: `${MONTHS[t.month]} '${String(t.year).slice(2)}`,
    'Company-wide': t.company_wide,
    'E-com base': t.ecom_base,
  }))

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Gross profit" value={egpCompact(cdh.gross_profit)} accent="#34d399" sub={pct(cdh.gross_profit_pct)} />
        <KpiCard label="COGS" value={egpCompact(cdh.cogs)} accent="#fb7185" sub={`${egp(cdh.cogs_per_unit)}/unit`} />
        <KpiCard label="VAT" value={egpCompact(cdh.vat)} accent="#a78bfa" sub="14/114 of gross" />
        <KpiCard label="Tools cost" value={egpCompact(tools.total)} accent="#38bdf8" sub={`${MONTHS[tools.month]} ${tools.year} (latest)`} />
        <KpiCard label="Paid marketing" value={egpCompact(fbTotal + inflTotal)} accent="#f472b6" sub="FB + influencer" />
        <KpiCard label="Stock alerts" value={num(alerts.length)} accent="#fbbf24" sub="Oversold / out of stock" />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {/* COGS vs GP by channel */}
        <Panel
          className="xl:col-span-2"
          title="Gross profit vs COGS by channel"
          subtitle="June 2026 · EGP"
          right={
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-emerald-400" /> Gross profit</span>
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-rose-400" /> COGS</span>
            </div>
          }
        >
          <ChartFrame height={280}>
            <BarChart data={cogsByChannel} margin={{ top: 8, right: 8, left: 4, bottom: 0 }}>
              <CartesianGrid stroke={CHART_GRID} vertical={false} />
              <XAxis dataKey="name" stroke={CHART_AXIS} tickLine={false} fontSize={12} />
              <YAxis stroke={CHART_AXIS} tickLine={false} fontSize={11} width={46} tickFormatter={(v) => egpCompact(v).replace('EGP ', '')} />
              <Tooltip content={<ChartTooltip format="egp" />} cursor={{ fill: '#ffffff08' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Bar dataKey="Gross profit" stackId="s" fill="#34d399" />
              <Bar dataKey="COGS" stackId="s" fill="#fb7185" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ChartFrame>
        </Panel>

        {/* Operating cost stack */}
        <Panel title="Known operating costs" subtitle="June 2026 (tools: latest posted)">
          <div className="space-y-3">
            <CostRow label="COGS" value={cdh.cogs} tone="#fb7185" total={cdh.cogs + fbTotal + inflTotal + tools.total} />
            <CostRow label="Influencer (ROI)" value={inflTotal} tone="#f472b6" total={cdh.cogs + fbTotal + inflTotal + tools.total} />
            <CostRow label="Facebook ads" value={fbTotal} tone="#38bdf8" total={cdh.cogs + fbTotal + inflTotal + tools.total} />
            <CostRow label={`Tools (${MONTHS[tools.month]})`} value={tools.total} tone="#a78bfa" total={cdh.cogs + fbTotal + inflTotal + tools.total} />
            <div className="mt-3 flex items-center justify-between border-t border-ink-700/60 pt-3">
              <span className="text-sm font-semibold text-slate-200">Total tracked</span>
              <span className="text-sm font-bold tabular-nums text-slate-50">
                {egpCompact(cdh.cogs + fbTotal + inflTotal + tools.total)}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Against {egpCompact(cdh.gross_sales_x_factory)} consolidated gross. Excludes fulfillment,
              payroll and overhead not exposed by CDH.
            </p>
          </div>
        </Panel>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {/* Tools cost trend */}
        <Panel className="xl:col-span-2" title="Tooling / SaaS cost trend" subtitle="Company-wide + e-commerce-only · EGP">
          <ChartFrame height={260}>
            <AreaChart data={toolsTrend} margin={{ top: 8, right: 8, left: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="cw" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="ec" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={CHART_GRID} vertical={false} />
              <XAxis dataKey="label" stroke={CHART_AXIS} tickLine={false} fontSize={11} />
              <YAxis stroke={CHART_AXIS} tickLine={false} fontSize={11} width={44} tickFormatter={(v) => egpCompact(v).replace('EGP ', '')} />
              <Tooltip content={<ChartTooltip format="egp" />} cursor={{ stroke: '#334670' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Area type="monotone" dataKey="E-com base" stackId="1" stroke="#a78bfa" fill="url(#ec)" strokeWidth={2} />
              <Area type="monotone" dataKey="Company-wide" stackId="1" stroke="#38bdf8" fill="url(#cw)" strokeWidth={2} />
            </AreaChart>
          </ChartFrame>
        </Panel>

        {/* Stock alerts */}
        <Panel
          title="Stock alerts"
          subtitle="Oversold or out-of-stock among top sellers"
          right={<Badge tone={alerts.length ? 'negative' : 'positive'}>{num(alerts.length)}</Badge>}
        >
          {alerts.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">
              No oversold items among top sellers. ✔
            </p>
          ) : (
            <ul className="space-y-2">
              {alerts.slice(0, 8).map((a) => (
                <li
                  key={`${a.kind}-${a.sku}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-rose-500/20 bg-rose-500/5 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-slate-100" title={a.name}>
                      {a.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {BRAND_LABELS[a.brand]} · {a.kind}
                    </p>
                  </div>
                  <span className="shrink-0 font-semibold tabular-nums text-rose-300">
                    {num(a.stock_quantity)}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
            Negative = oversold vs available stock. Source: product & bundle tables (stock_quantity).
          </p>
        </Panel>
      </div>
    </div>
  )
}

function CostRow({
  label,
  value,
  tone,
  total,
}: {
  label: string
  value: number
  tone: string
  total: number
}) {
  const share = total ? (value / total) * 100 : 0
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="flex items-center gap-2 text-slate-300">
          <i className="h-2 w-2 rounded-full" style={{ background: tone }} />
          {label}
        </span>
        <span className="tabular-nums text-slate-400">
          {egpCompact(value)} · {pct(share)}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-ink-700/70">
        <div className="h-full rounded-full" style={{ width: `${share}%`, background: tone }} />
      </div>
    </div>
  )
}
