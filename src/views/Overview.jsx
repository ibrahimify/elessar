import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend,
} from 'recharts'
import { BUDGET, PROCEDURES, DEPT_COSTS } from '../data.js'
import { BriefingPanel, DecisionCard, ModeNote, SignalStrip } from './InsightPrimitives.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ChartContainer from '../components/ChartContainer.jsx'

const fmt = (n) => new Intl.NumberFormat('hu-HU').format(Math.round(n))
const fmtM = (n) => (n / 1000000).toFixed(1) + 'M'

const COLORS = ['#38BDF8', '#0F766E', '#F59E0B', '#64748B', '#EF4444']

const CustomTooltipBudget = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <div className="tooltip-title">{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name}: <strong>{fmt(p.value)} HUF</strong>
        </div>
      ))}
    </div>
  )
}

const CustomTooltipLine = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <div className="tooltip-title">{label}</div>
      <div>Coverage ratio: <strong>{payload[0]?.value?.toFixed(3)}</strong></div>
      {payload[0]?.value < 1.0 && (
        <div className="tooltip-alert">Below target 1.0</div>
      )}
    </div>
  )
}

export default function Overview({ audienceMode }) {
  const analyst = audienceMode === 'analyst'

  return (
    <>
      <PageHeader
        kicker="Hospital command layer"
        title="Executive Overview"
        description="Orthopaedics department / Full year 2024 / Sources: NEAK DRG model, P4H Hungary Hospital Debt Report, HST 2024 SOTI Report, Kaplan and Porter HBR 2011."
      />

      <section className="hero-panel">
        <div className="hero-content">
          <div className="hero-eyebrow">Critical fiscal signal</div>
          <h1>Orthopaedics is operating below reimbursement coverage every month.</h1>
          <p>
            NEAK reimbursement covered only 78.2% of actual costs on average. The issue is not
            one bad month. It is a structural coverage gap hidden across procedures, operating room
            time, and procurement leakage.
          </p>
        </div>
        <div className="hero-metric">
          <span>2024 NEAK gap</span>
          <strong>-75,926,179 HUF</strong>
          <small>Hospital leadership action required</small>
        </div>
      </section>

      <SignalStrip
        items={[
          { label: 'Coverage', value: '78.2%', tone: 'red' },
          { label: 'Loss cases', value: '28 / 123', tone: 'amber' },
          { label: 'Expiry waste', value: '65.4M HUF', tone: 'red' },
          { label: 'Contract leakage', value: '22 / 38 SKUs', tone: 'amber' },
        ]}
      />

      <ModeNote
        audienceMode={audienceMode}
        executiveText="Plain-language layer is active. Focus is on risk, impact, and what leadership should do next."
        analystText="Analyst layer is active. Charts expose the underlying monthly coverage, procedure variance, and attribution model."
      />

      <div className="decision-grid">
        <DecisionCard
          tone="red"
          label="Primary risk"
          value="75.9M"
          title="Funding gap"
          body="Actual spend is materially above NEAK reimbursement. The shortfall needs procedure-level explanation before budget negotiations."
        />
        <DecisionCard
          tone="amber"
          label="Operational driver"
          value="84%"
          title="Arthroscopy loss rate"
          body="Arthroscopy is the clearest procedure-level signal. Most cases lose money under current reimbursement assumptions."
        />
        <DecisionCard
          tone="blue"
          label="Management action"
          value="3"
          title="Intervention lanes"
          body="Reprice procedure pathways, consolidate fragmented SKUs, and monitor OR overruns before they become monthly deficits."
        />
      </div>

      <div className="kpi-grid">
        <div className="kpi-card kpi-red">
          <div className="kpi-label">Annual NEAK Gap</div>
          <div className="kpi-value red">-75.9M</div>
          <div className="kpi-sub">HUF underfunded vs actual spend</div>
          <div className="kpi-src">Source: NEAK DRG reimbursement model</div>
        </div>
        <div className="kpi-card kpi-amber">
          <div className="kpi-label">Procedures at Deficit</div>
          <div className="kpi-value amber">23%</div>
          <div className="kpi-sub">28 of 123 completed cases ran at loss</div>
          <div className="kpi-src">Arthroscopy: 84% / Fracture Repair: 55%</div>
        </div>
        <div className="kpi-card kpi-red">
          <div className="kpi-label">Expiry Waste</div>
          <div className="kpi-value red">65.4M</div>
          <div className="kpi-sub">HUF in expired stock YTD</div>
          <div className="kpi-src">AI systems reduce this 30% (PrimeSourceX, 2025)</div>
        </div>
        <div className="kpi-card kpi-amber">
          <div className="kpi-label">SKUs Overpaid</div>
          <div className="kpi-value amber">22 / 38</div>
          <div className="kpi-sub">Paying above contracted price</div>
          <div className="kpi-src">119 urgent orders at +22% premium</div>
        </div>
      </div>

      {!analyst && (
        <BriefingPanel
          tone="blue"
          eyebrow="Executive interpretation"
          title="The dashboard turns a budget problem into three controllable workstreams."
          body="Hospital leadership should use this view to ask which procedures lose money, which supplier categories leak contract value, and which month-end trends need intervention before the next reporting cycle."
        >
          <div className="action-stack">
            <span>1. Review arthroscopy pathway economics</span>
            <span>2. Consolidate fragmented consumable SKUs</span>
            <span>3. Monitor Q4 coverage deterioration weekly</span>
          </div>
        </BriefingPanel>
      )}

      {analyst && (
        <BriefingPanel
          tone="slate"
          eyebrow="Analyst interpretation"
          title="Coverage, procedure deficit, and cross-department attribution are linked views of the same problem."
          body="The charts below retain the original model inputs and expose where monthly reimbursement, procedure mix, and department-level cost allocation diverge."
        />
      )}

      <div className="chart-grid">
        <ChartContainer
          title="Monthly Spend vs NEAK Reimbursement"
          subtitle="Gap widened sharply in Q4. November and December moved over budget while NEAK stayed flat."
          legend={(
            <>
              <span className="legend-item"><span className="legend-swatch swatch-blue" />Actual Spend</span>
              <span className="legend-item"><span className="legend-swatch swatch-red" />NEAK Received</span>
            </>
          )}
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={BUDGET} margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.22)" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={fmtM} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltipBudget />} />
              <Bar dataKey="spend" name="Actual Spend" fill="#38BDF8" radius={[2,2,0,0]} />
              <Bar dataKey="neak"  name="NEAK Received" fill="rgba(239,68,68,0.72)" radius={[2,2,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="chart-card">
          <div className="chart-title">Procedure Deficit Rate</div>
          <div className="chart-sub">
            Arthroscopy is the dominant loss pocket. NEAK pays materially below average case cost.
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={PROCEDURES} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.22)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => v + '%'} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="shortName" width={82} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip formatter={(v) => [v + '%', 'Deficit Rate']} />
              <Bar dataKey="deficit_pct" radius={[0,2,2,0]} fill="#EF4444">
                {PROCEDURES.map((p, i) => (
                  <Cell
                    key={i}
                    fill={p.deficit_pct > 50 ? '#EF4444' : p.deficit_pct > 0 ? '#F59E0B' : '#0F766E'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <div className="chart-title">Revenue Coverage Ratio by Month</div>
          <div className="chart-sub">
            NEAK / actual spend. Target is 1.0. Coverage fell to 0.663 in December.
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={BUDGET} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.22)" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis domain={[0.6, 1.05]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => v.toFixed(2)} />
              <Tooltip content={<CustomTooltipLine />} />
              <Line
                type="monotone"
                dataKey="coverage"
                name="Coverage Ratio"
                stroke="#38BDF8"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#38BDF8' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey={() => 1.0}
                name="Target"
                stroke="rgba(239,68,68,0.55)"
                strokeWidth={1.5}
                strokeDasharray="6 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-title">Cross-Department Cost Attribution</div>
          <div className="chart-sub">
            Total costs for 123 completed orthopaedics cases using the left outer join model.
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={DEPT_COSTS}
                dataKey="cost"
                nameKey="dept"
                cx="45%"
                cy="50%"
                innerRadius={58}
                outerRadius={94}
                paddingAngle={3}
              >
                {DEPT_COSTS.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [fmt(v) + ' HUF', '']} />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconType="square"
                iconSize={10}
                formatter={(v) => <span style={{ fontSize: 11 }}>{v}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}
