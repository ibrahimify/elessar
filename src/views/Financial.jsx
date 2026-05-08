import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Cell,
} from 'recharts'
import { BUDGET, PROCEDURES } from '../data.js'

const fmt = (n) => new Intl.NumberFormat('hu-HU').format(Math.round(n))
const fmtK = (n) => (n / 1000).toFixed(0) + 'K'

export default function Financial() {
  return (
    <>
      <div className="section-header">
        <h2>Financial Analysis</h2>
        <p>Budget utilization, NEAK coverage gaps, and cost-per-procedure breakdown · 2024</p>
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
          <div className="kpi-sub">HUF - only 78.2% of spend covered</div>
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

      {/* PROCEDURE CARDS */}
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
              <div className="proc-sub">deficit rate · {p.count} cases</div>
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

      <div className="chart-grid equal">
        {/* Budget utilization */}
        <div className="chart-card">
          <div className="chart-title">Budget Utilization % by Month</div>
          <div className="chart-sub">
            Red line = 100% cap. Nov & Dec significantly over budget - department overspent
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={BUDGET} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
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
              <Bar dataKey="util" radius={[4,4,0,0]}>
                {BUDGET.map((b, i) => (
                  <Cell
                    key={i}
                    fill={b.util > 110 ? '#EF4444' : b.util > 100 ? '#F59E0B' : '#0EA5E9'}
                    fillOpacity={0.85}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cost vs NEAK per procedure */}
        <div className="chart-card">
          <div className="chart-title">Avg Cost vs NEAK Reimbursement per Procedure</div>
          <div className="chart-sub">
            Arthroscopy: NEAK pays 325K vs cost 423K - structural underfunding by NEAK
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#6b7a90' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#0EA5E9', display: 'inline-block' }} />
              Avg Cost
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#6b7a90' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(16,185,129,0.75)', display: 'inline-block' }} />
              NEAK Reimb.
            </span>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart
              data={PROCEDURES}
              margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="shortName" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={fmtK} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip
                formatter={(v, name) => [
                  fmt(v) + ' HUF',
                  name === 'avg_cost' ? 'Avg Cost' : 'NEAK Reimb.',
                ]}
              />
              <Bar dataKey="avg_cost"  name="avg_cost"  fill="#0EA5E9"              radius={[4,4,0,0]} />
              <Bar dataKey="avg_neak"  name="avg_neak"  fill="rgba(16,185,129,0.75)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Procedure Financial Table */}
      <div className="table-card">
        <div className="table-header">
          <h3>Procedure Financial Summary</h3>
          <span className="badge badge-amber">Model based on NEAK DRG data</span>
        </div>
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
      </div>
    </>
  )
}
