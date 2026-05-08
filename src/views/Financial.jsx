import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Cell,
} from 'recharts'
import { BUDGET, PROCEDURES } from '../data.js'
import { BriefingPanel, DecisionCard, ModeNote } from './InsightPrimitives.jsx'
import PageHeader from '../components/PageHeader.jsx'
import DataTable from '../components/DataTable.jsx'
import AnalystPanel from '../components/AnalystPanel.jsx'

const fmt = (n) => new Intl.NumberFormat('hu-HU').format(Math.round(n))
const fmtK = (n) => (n / 1000).toFixed(0) + 'K'

export default function Financial({ audienceMode }) {
  const analyst = audienceMode === 'analyst'

  return (
    <>
      <PageHeader
        kicker="Finance control"
        title="Financial Analysis"
        description="Budget utilization, NEAK coverage gaps, and cost-per-procedure breakdown / 2024."
      />

      <ModeNote
        audienceMode={audienceMode}
        executiveText="Showing the financial story in decision language: risk, cause, and next management action."
        analystText="Showing detailed procedure economics and the reimbursement model table."
      />

      <div className="decision-grid">
        <DecisionCard
          tone="blue"
          label="Spend base"
          value="347.7M"
          title="Annual cost pool"
          body="The department's actual 2024 spend is the baseline for coverage, budget utilization, and procedure margin analysis."
        />
        <DecisionCard
          tone="red"
          label="Coverage risk"
          value="78.2%"
          title="NEAK received"
          body="Reimbursement covers only part of actual spend, creating a recurring gap that needs budget and pathway action."
        />
        <DecisionCard
          tone="amber"
          label="Operational drag"
          value="+8 min"
          title="Average OR delay"
          body="OR overruns increase direct cost and make already thin procedure margins more fragile."
        />
      </div>

      <div className="kpi-grid">
        <div className="kpi-card kpi-teal">
          <div className="kpi-label">Total Annual Spend</div>
          <div className="kpi-value teal">347.7M</div>
          <div className="kpi-sub">HUF actual expenditure 2024</div>
        </div>
        <div className="kpi-card kpi-red">
          <div className="kpi-label">Total NEAK Received</div>
          <div className="kpi-value red">271.8M</div>
          <div className="kpi-sub">HUF. Only 78.2% of spend covered</div>
        </div>
        <div className="kpi-card kpi-amber">
          <div className="kpi-label">Avg OR Delay</div>
          <div className="kpi-value amber">+8 min</div>
          <div className="kpi-sub">per procedure above expected</div>
          <div className="kpi-src">Benchmark: +5.8 min avg (HST 2024 SOTI)</div>
        </div>
        <div className="kpi-card kpi-amber">
          <div className="kpi-label">Cancellation Rate</div>
          <div className="kpi-value amber">18%</div>
          <div className="kpi-sub">of scheduled procedures</div>
          <div className="kpi-src">Benchmark: 21% avg ASC (HST 2024 SOTI)</div>
        </div>
      </div>

      {!analyst && (
        <BriefingPanel
          tone="red"
          eyebrow="Executive readout"
          title="The finance issue is not simply overspend. It is reimbursement mismatch."
          body="Leadership should use the charts below to separate controllable operating variance from reimbursement design. Arthroscopy is the clearest place to start because the deficit is procedure-specific and repeatable."
        />
      )}

      {analyst && (
        <div className="proc-grid">
          {PROCEDURES.map((p) => {
            const gap = p.avg_neak - p.avg_cost
            const cls = p.deficit_pct > 50 ? 'proc-danger' : p.deficit_pct > 0 ? 'proc-warn' : 'proc-safe'
            return (
              <div key={p.procedure} className={`proc-card ${cls}`}>
                <div className="proc-name">{p.procedure}</div>
                <div className={`proc-pct ${p.deficit_pct > 0 ? 'red' : 'green'}`}>
                  {p.deficit_pct}%
                </div>
                <div className="proc-sub">deficit rate / {p.count} cases</div>
                <div className="proc-gap">
                  Gap/case:{' '}
                  <strong style={{ color: gap < 0 ? 'var(--red)' : 'var(--green)' }}>
                    {gap < 0 ? '-' : '+'}{fmtK(Math.abs(gap))} HUF
                  </strong>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="chart-grid equal">
        <div className="chart-card">
          <div className="chart-title">Budget Utilization by Month</div>
          <div className="chart-sub">
            Red line is the 100% cap. November and December are materially over budget.
          </div>
          <ResponsiveContainer width="100%" height={270}>
            <BarChart data={BUDGET} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.22)" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis
                domain={[85, 125]}
                tickFormatter={(v) => v + '%'}
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip formatter={(v) => [v.toFixed(1) + '%', 'Budget Utilization']} />
              <ReferenceLine y={100} stroke="#EF4444" strokeDasharray="5 4" strokeWidth={1.5} label={{ value: '100%', position: 'insideTopRight', fontSize: 10, fill: '#EF4444' }} />
              <Bar dataKey="util" radius={[2,2,0,0]}>
                {BUDGET.map((b, i) => (
                  <Cell
                    key={i}
                    fill={b.util > 110 ? '#EF4444' : b.util > 100 ? '#F59E0B' : '#38BDF8'}
                    fillOpacity={0.9}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-title">Avg Cost vs NEAK Reimbursement per Procedure</div>
          <div className="chart-sub">
            Arthroscopy is structurally underfunded. NEAK pays 465K vs cost 605K in the current model.
          </div>
          <div className="legend-row">
            <span className="legend-item"><span className="legend-swatch swatch-blue" />Avg Cost</span>
            <span className="legend-item"><span className="legend-swatch swatch-green" />NEAK Reimb.</span>
          </div>
          <ResponsiveContainer width="100%" height={270}>
            <BarChart
              data={PROCEDURES}
              margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.22)" />
              <XAxis dataKey="shortName" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={fmtK} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip
                formatter={(v, name) => [
                  fmt(v) + ' HUF',
                  name === 'avg_cost' ? 'Avg Cost' : 'NEAK Reimb.',
                ]}
              />
              <Bar dataKey="avg_cost" name="avg_cost" fill="#38BDF8" radius={[2,2,0,0]} />
              <Bar dataKey="avg_neak" name="avg_neak" fill="rgba(15,118,110,0.78)" radius={[2,2,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {analyst && (
        <AnalystPanel
          audienceMode={audienceMode}
          title="Analyst detail"
          description="Exact procedure financial model values are preserved below for review."
        >
        <div className="table-card">
          <div className="table-header">
            <h3>Procedure Financial Summary</h3>
            <span className="badge badge-amber">Model based on NEAK DRG data</span>
          </div>
          <DataTable>
          <table className="data-table">
            <thead>
              <tr>
                <th>Procedure</th>
                <th>Cases</th>
                <th>Avg Cost (HUF)</th>
                <th>Avg NEAK (HUF)</th>
                <th>Gap / Case</th>
                <th>Deficit Rate</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {PROCEDURES.map((p) => {
                const gap = p.avg_neak - p.avg_cost
                return (
                  <tr key={p.procedure}>
                    <td><strong>{p.procedure}</strong></td>
                    <td className="mono">{p.count}</td>
                    <td className="mono">{fmt(p.avg_cost)}</td>
                    <td className="mono">{fmt(p.avg_neak)}</td>
                    <td className="mono" style={{ color: gap < 0 ? 'var(--red)' : 'var(--green)', fontWeight: 700 }}>
                      {gap < 0 ? '-' : '+'}{fmt(Math.abs(gap))}
                    </td>
                    <td className="mono">{p.deficit_pct}%</td>
                    <td>
                      {p.deficit_pct > 50 ? (
                        <span className="badge badge-red">Critical</span>
                      ) : p.deficit_pct > 0 ? (
                        <span className="badge badge-amber">At Risk</span>
                      ) : (
                        <span className="badge badge-green">Healthy</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          </DataTable>
        </div>
        </AnalystPanel>
      )}
    </>
  )
}
