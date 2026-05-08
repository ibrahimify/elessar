import { useState } from 'react'
import { PATIENTS } from '../data.js'
import { BriefingPanel, DecisionCard, ModeNote } from './InsightPrimitives.jsx'
import PageHeader from '../components/PageHeader.jsx'
import DataTable from '../components/DataTable.jsx'

const fmt = (n) => new Intl.NumberFormat('hu-HU').format(Math.round(n))

const PROCEDURES = ['All', 'Arthroscopy', 'Fracture Repair', 'Total Knee Replacement', 'Hip Replacement', 'Spinal Fusion']

export default function Patients({ audienceMode }) {
  const [filterProc, setFilterProc]     = useState('All')
  const [filterStatus, setFilterStatus] = useState('all')
  const analyst = audienceMode === 'analyst'

  const filtered = PATIENTS.filter((p) => {
    const procOk   = filterProc === 'All' || p.procedure === filterProc
    const statusOk =
      filterStatus === 'all' ? true :
      filterStatus === 'deficit' ? p.diff < 0 :
      p.diff >= 0
    return procOk && statusOk
  })

  const highestLossCases = PATIENTS.filter((p) => p.diff < 0).slice(0, 3)

  return (
    <>
      <PageHeader
        kicker="Patient economics"
        title="Patient Journey Cost Analysis"
        description="Anonymous event-level cost tracking with Orthopaedics as anchor and cross-department costs assigned through the left outer join model."
      />

      <ModeNote
        audienceMode={audienceMode}
        executiveText="Showing patient journeys as understandable cost stories, with the detailed table reserved for analyst mode."
        analystText="Showing the patient-level cost table with filters, department attribution, and surplus or deficit values."
      />

      <div className="decision-grid">
        <DecisionCard
          tone="blue"
          label="Average cost"
          value="447K"
          title="Per completed case"
          body="Average procedure cost gives leadership a simple baseline before reading the detailed pathway table."
        />
        <DecisionCard
          tone="red"
          label="Loss exposure"
          value="28"
          title="Cases running at loss"
          body="A minority of cases create visible negative margin. Those cases should be reviewed by procedure type."
        />
        <DecisionCard
          tone="amber"
          label="Time variance"
          value="+8 min"
          title="OR overrun"
          body="Small operating room delays compound into direct cost pressure when reimbursement is already tight."
        />
      </div>

      <div className="alert alert-red">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div>
          <strong>Kaplan and Porter framing:</strong>
          hospitals cannot improve cost because they do not know what individual procedures actually cost.
          This view turns patient-level activity into procedure cost intelligence without exposing personal data.
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card kpi-teal">
          <div className="kpi-label">Avg Cost / Procedure</div>
          <div className="kpi-value teal">447K HUF</div>
          <div className="kpi-sub">across 123 completed cases</div>
        </div>
        <div className="kpi-card kpi-teal">
          <div className="kpi-label">Avg NEAK / Procedure</div>
          <div className="kpi-value teal">782K HUF</div>
          <div className="kpi-sub">weighted average reimbursement</div>
        </div>
        <div className="kpi-card kpi-red">
          <div className="kpi-label">Cases Running at Loss</div>
          <div className="kpi-value red">28 cases</div>
          <div className="kpi-sub">23% of all completed procedures</div>
        </div>
        <div className="kpi-card kpi-amber">
          <div className="kpi-label">Avg OR Overrun</div>
          <div className="kpi-value amber">+8 min</div>
          <div className="kpi-sub">every extra minute = direct cost</div>
        </div>
      </div>

      {!analyst && (
        <>
          <BriefingPanel
            tone="blue"
            eyebrow="Executive interpretation"
            title="Patient journeys explain why the department-level gap exists."
            body="Instead of asking whether Orthopaedics is over budget, leadership can now ask which procedures and support departments produce negative case economics."
          />

          <div className="case-grid">
            {highestLossCases.map((p) => (
              <article key={p.id} className="case-card">
                <div className="case-topline">
                  <span>{p.id}</span>
                  <strong>{p.procedure}</strong>
                </div>
                <div className="case-loss">-{fmt(Math.abs(p.diff))} HUF</div>
                <div className="case-meta">
                  <span>Total cost: {fmt(p.total)}</span>
                  <span>NEAK: {fmt(p.neak)}</span>
                  <span>OR: {p.or_min} min / expected {p.exp_min}</span>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {analyst && (
        <div className="table-card">
          <div className="table-header">
            <h3>Patient Cost Breakdown - Deficit rows highlighted</h3>
            <div className="table-tools">
              <select
                className="filter-select"
                value={filterProc}
                onChange={(e) => setFilterProc(e.target.value)}
              >
                {PROCEDURES.map((p) => <option key={p}>{p}</option>)}
              </select>
              <select
                className="filter-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All cases</option>
                <option value="deficit">Deficit only</option>
                <option value="surplus">Surplus only</option>
              </select>
              <span className="badge badge-gray">{filtered.length} records</span>
            </div>
          </div>
          <DataTable>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Procedure</th>
                  <th>Date</th>
                  <th>OR Duration</th>
                  <th>Ortho Cost</th>
                  <th>Radiology</th>
                  <th>Physio</th>
                  <th>Anaesthesia</th>
                  <th>Total Cost</th>
                  <th>NEAK</th>
                  <th>Surplus / Deficit</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className={p.diff < 0 ? 'row-deficit' : ''}>
                    <td className="mono" style={{ color: '#6b7a90' }}>{p.id}</td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{p.procedure}</span>
                    </td>
                    <td className="mono">{p.date}</td>
                    <td className="mono">
                      <span style={{ color: p.or_min > p.exp_min ? 'var(--amber)' : 'inherit' }}>
                        {p.or_min} min
                      </span>
                      <span style={{ color: '#94A3B8', fontSize: 10, marginLeft: 3 }}>
                        (exp. {p.exp_min})
                      </span>
                    </td>
                    <td className="mono">{fmt(p.ortho)}</td>
                    <td className="mono">{p.radio > 0 ? fmt(p.radio) : <span style={{ color: '#CBD5E1' }}>-</span>}</td>
                    <td className="mono">{p.physio > 0 ? fmt(p.physio) : <span style={{ color: '#CBD5E1' }}>-</span>}</td>
                    <td className="mono">{fmt(p.anaes)}</td>
                    <td className="mono" style={{ fontWeight: 700 }}>{fmt(p.total)}</td>
                    <td className="mono">{fmt(p.neak)}</td>
                    <td
                      className="mono"
                      style={{
                        color: p.diff < 0 ? 'var(--red)' : 'var(--green)',
                        fontWeight: 700,
                      }}
                    >
                      {p.diff < 0 ? '-' : '+'}{fmt(Math.abs(p.diff))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataTable>
        </div>
      )}

      <div className="alert alert-teal">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div>
          <strong>Data privacy note:</strong>
          all patient IDs are anonymised. No personal identifiers, names, or clinical records are stored.
          Procedure, cost, and department attribution data only.
        </div>
      </div>
    </>
  )
}
