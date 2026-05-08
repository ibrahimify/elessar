import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend,
} from 'recharts'
import { BUDGET, PROCEDURES, DEPT_COSTS, KPIS } from '../data.js'

const fmt = (n) => new Intl.NumberFormat('hu-HU').format(Math.round(n))
const fmtM = (n) => (n / 1000000).toFixed(1) + 'M'

const COLORS = ['#0EA5E9', '#8B5CF6', '#F59E0B', '#10B981', '#EF4444']

const CustomTooltipBudget = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <strong>{fmt(p.value)} HUF</strong>
        </div>
      ))}
    </div>
  )
}

const CustomTooltipLine = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
      <div>Coverage ratio: <strong>{payload[0]?.value?.toFixed(3)}</strong></div>
      {payload[0]?.value < 1.0 && (
        <div style={{ color: '#EF4444', fontSize: 11, marginTop: 3 }}>⚠ Below target (1.0)</div>
      )}
    </div>
  )
}

export default function Overview() {
  return (
    <>
      <div className="section-header">
        <h2>Executive Overview</h2>
        <p>
          Orthopaedics Department · Full Year 2024 ·
          Sources: NEAK DRG model, P4H Hungary Hospital Debt Report (2024), HST 2024 SOTI Report,
          Kaplan &amp; Porter HBR 2011
        </p>
      </div>

      {/* INSIGHT HERO */}
      <div className="insight-box">
        <div className="insight-eyebrow">⚠ Critical Finding - 2024 Fiscal Year</div>
        <div className="insight-stat">-75,926,179 HUF</div>
        <div className="insight-headline">
          The Orthopaedics department received 75.9M HUF less from NEAK than it actually spent in 2024
        </div>
        <div className="insight-body">
          Every month, the department operates at a structural deficit. NEAK reimbursement covered only 78.2%
          of actual costs on average - yet without data unified in one place, hospital management had no
          visibility into which procedures drove the loss. 84% of all Arthroscopy cases ran at a loss.
          This dashboard is the tool that answers: why, where, and by how much.
        </div>
      </div>

      {/* KPI CARDS */}
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
          <div className="kpi-src">Arthroscopy: 84% · Fracture Repair: 55%</div>
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

      {/* CHARTS ROW 1 */}
      <div className="chart-grid">
        <div className="chart-card">
          <div className="chart-title">Monthly Spend vs NEAK Reimbursement</div>
          <div className="chart-sub">
            Gap widened sharply in Q4 - Nov/Dec over budget while NEAK stayed flat
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#6b7a90' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#0EA5E9', display: 'inline-block' }} />
              Actual Spend
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#6b7a90' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(239,68,68,0.7)', display: 'inline-block' }} />
              NEAK Received
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={BUDGET} margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={fmtM} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltipBudget />} />
              <Bar dataKey="spend" name="Actual Spend" fill="#0EA5E9" radius={[4,4,0,0]} />
              <Bar dataKey="neak"  name="NEAK Received" fill="rgba(239,68,68,0.7)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-title">Procedure Deficit Rate</div>
          <div className="chart-sub">
            Arthroscopy: NEAK pays only 325K vs avg cost 423K - 84% of cases lose money
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={PROCEDURES} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => v + '%'} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="shortName" width={75} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip formatter={(v) => [v + '%', 'Deficit Rate']} />
              <Bar
                dataKey="deficit_pct"
                radius={[0,4,4,0]}
                fill="#EF4444"
              >
                {PROCEDURES.map((p, i) => (
                  <Cell
                    key={i}
                    fill={p.deficit_pct > 50 ? '#EF4444' : p.deficit_pct > 0 ? '#F59E0B' : '#10B981'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHARTS ROW 2 */}
      <div className="chart-grid">
        <div className="chart-card">
          <div className="chart-title">Revenue Coverage Ratio by Month</div>
          <div className="chart-sub">
            NEAK ÷ Actual spend. Target ≥ 1.0. Coverage fell to 0.663 in December - critical
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={BUDGET} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis domain={[0.6, 1.05]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => v.toFixed(2)} />
              <Tooltip content={<CustomTooltipLine />} />
              <Line
                type="monotone"
                dataKey="coverage"
                name="Coverage Ratio"
                stroke="#0EA5E9"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#0EA5E9' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey={() => 1.0}
                name="Target"
                stroke="rgba(239,68,68,0.5)"
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
            Total costs for 123 completed ortho cases - left outer join model
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={DEPT_COSTS}
                dataKey="cost"
                nameKey="dept"
                cx="45%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
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
