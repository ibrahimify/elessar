import { useState } from 'react'
import { PATIENTS } from '../data.js'

const fmt = (n) => new Intl.NumberFormat('hu-HU').format(Math.round(n))

const PROCEDURES = ['All', 'Arthroscopy', 'Fracture Repair', 'Total Knee Replacement', 'Hip Replacement', 'Spinal Fusion']

export default function Patients() {
  const [filterProc, setFilterProc]     = useState('All')
  const [filterStatus, setFilterStatus] = useState('all')

  const filtered = PATIENTS.filter((p) => {
    const procOk   = filterProc === 'All' || p.procedure === filterProc
    const statusOk =
      filterStatus === 'all' ? true :
      filterStatus === 'deficit' ? p.diff < 0 :
      p.diff >= 0
    return procOk && statusOk
  })

  return (
    <>
      <div className="section-header">
        <h2>Patient Journey Cost Analysis</h2>
        <p>
          Anonymous event-level cost tracking - Orthopaedics as anchor,
          cross-department costs via left outer join model
        </p>
      </div>

      <div className="alert alert-red">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div>
          <strong>Kaplan &amp; Porter (Harvard Business Review, 2011):</strong>
          "Providers cannot link cost to process improvements because they don't know what individual
          procedures actually cost." - This table solves exactly that. Cost per patient, per procedure,
          broken down across every department involved in the care journey.
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

      <div className="table-card">
        <div className="table-header">
          <h3>Patient Cost Breakdown - Deficit rows highlighted</h3>
          <div style={{ display: 'flex', gap: 8 }}>
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
        <div style={{ overflowX: 'auto' }}>
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
        </div>
      </div>

      <div className="alert alert-teal">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div>
          <strong>Data Privacy Note:</strong>
          All patient IDs are anonymised. No personal identifiers, names, or clinical records are stored.
          Procedure + cost + department attribution data only. Fully GDPR-compliant under EU Health Data
          Space secondary use framework.
        </div>
      </div>
    </>
  )
}
