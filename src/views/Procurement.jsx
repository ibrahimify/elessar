import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend,
} from 'recharts'
import { PROCUREMENT, SKU_FRAGMENTATION } from '../data.js'
import { BriefingPanel, DecisionCard, ModeNote } from './InsightPrimitives.jsx'
import PageHeader from '../components/PageHeader.jsx'
import DataTable from '../components/DataTable.jsx'

const fmt = (n) => new Intl.NumberFormat('hu-HU').format(Math.round(n))
const fmtM = (n) => (n / 1000000).toFixed(1) + 'M'

const CAT_COLORS = {
  Implant:     '#38BDF8',
  Consumable:  '#0F766E',
  Anaesthetic: '#F59E0B',
  Imaging:     '#64748B',
  Rehab:       '#EF4444',
}

const catSpend = Object.entries(
  PROCUREMENT.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + s.actual * s.qty
    return acc
  }, {})
).map(([name, value]) => ({ name, value }))

export default function Procurement({ audienceMode }) {
  const analyst = audienceMode === 'analyst'

  return (
    <>
      <PageHeader
        kicker="Supply chain control"
        title="Procurement and Supply Chain"
        description="SKU fragmentation, price variance, expiry waste, MDR compliance. All computable from CT-Ecostat and Controlling Department exports."
      />

      <ModeNote
        audienceMode={audienceMode}
        executiveText="Showing supplier and inventory issues as action lanes: consolidation, contract leakage, and compliance exposure."
        analystText="Showing SKU-level variance, urgent order counts, and MDR status for procurement analysis."
      />

      <div className="decision-grid">
        <DecisionCard
          tone="red"
          label="Waste exposure"
          value="65.4M"
          title="Expired inventory"
          body="The stock problem has a measurable cash cost. It should be managed as a finance issue, not only a logistics issue."
        />
        <DecisionCard
          tone="amber"
          label="Contract leakage"
          value="22 / 38"
          title="SKUs above contract"
          body="More than half of listed SKUs are paid above contract, pointing to purchasing leakage or supplier variance."
        />
        <DecisionCard
          tone="blue"
          label="Consolidation"
          value="7"
          title="Fragmented groups"
          body="Repeated functional products across suppliers create avoidable complexity and weaken volume negotiation."
        />
      </div>

      <div className="alert alert-amber">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <div>
          <strong>SKU fragmentation detected.</strong>
          7 product groups are ordered under multiple SKU codes from different suppliers.
          Surgical Glove (M) alone has 3 variants totalling 148M HUF spend.
          Consolidation could save 63.2M HUF annually using the 12% estimate per group.
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card kpi-red">
          <div className="kpi-label">Expiry Waste YTD</div>
          <div className="kpi-value red">65.4M</div>
          <div className="kpi-sub">HUF in expired stock</div>
        </div>
        <div className="kpi-card kpi-amber">
          <div className="kpi-label">Urgent Orders</div>
          <div className="kpi-value amber">119</div>
          <div className="kpi-sub">at +22% price premium</div>
          <div className="kpi-src">Urgent orders cost 15 to 30% more (industry avg)</div>
        </div>
        <div className="kpi-card kpi-red">
          <div className="kpi-label">Non-MDR Compliant</div>
          <div className="kpi-value red">10</div>
          <div className="kpi-sub">devices at procurement risk</div>
          <div className="kpi-src">EU MDR transition causing EU-wide disruptions</div>
        </div>
        <div className="kpi-card kpi-amber">
          <div className="kpi-label">SKUs Above Contract</div>
          <div className="kpi-value amber">22 / 38</div>
          <div className="kpi-sub">paying above contracted price</div>
        </div>
      </div>

      {!analyst && (
        <BriefingPanel
          tone="blue"
          eyebrow="Executive interpretation"
          title="Procurement savings are concentrated in a small number of fixable patterns."
          body="The highest-value work is SKU consolidation, urgent order reduction, and enforcing contracted pricing. The analyst view keeps the full SKU register for procurement teams."
        />
      )}

      <div className="chart-grid">
        <div className="chart-card">
          <div className="chart-title">SKU Fragmentation - Consolidation Potential</div>
          <div className="chart-sub">
            Same product ordered under multiple SKU codes. Estimated 12% saving per group through consolidation.
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={SKU_FRAGMENTATION}
              layout="vertical"
              margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.22)" horizontal={false} />
              <XAxis
                type="number"
                tickFormatter={fmtM}
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={135}
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(v, name) => [
                  fmt(v) + ' HUF',
                  name === 'total_spend' ? 'Total Spend' : 'Potential Saving',
                ]}
              />
              <Bar dataKey="total_spend" name="total_spend" fill="rgba(56,189,248,0.24)" radius={[0,2,2,0]} />
              <Bar dataKey="saving" name="saving" fill="#38BDF8" radius={[0,2,2,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-title">Spend by Category</div>
          <div className="chart-sub">Consumables dominate spend and carry the highest fragmentation risk.</div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={catSpend}
                dataKey="value"
                nameKey="name"
                cx="45%"
                cy="50%"
                innerRadius={64}
                outerRadius={102}
                paddingAngle={3}
              >
                {catSpend.map((c) => (
                  <Cell key={c.name} fill={CAT_COLORS[c.name] || '#94A3B8'} />
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

      {analyst && (
        <div className="table-card">
          <div className="table-header">
            <h3>Full SKU List - Price Variance and Compliance</h3>
            <span className="badge badge-red">22 SKUs paying above contracted price</span>
          </div>
          <DataTable>
            <table className="data-table">
              <thead>
                <tr>
                  <th>SKU ID</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Supplier</th>
                  <th>Contracted (HUF)</th>
                  <th>Actual (HUF)</th>
                  <th>Variance</th>
                  <th>Qty</th>
                  <th>Urgent Orders</th>
                  <th>EU MDR</th>
                </tr>
              </thead>
              <tbody>
                {PROCUREMENT.map((s) => (
                  <tr key={s.id} className={s.variance > 10 ? 'row-warning' : ''}>
                    <td className="mono" style={{ color: '#6b7a90' }}>{s.id}</td>
                    <td><strong>{s.name}</strong></td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          background: CAT_COLORS[s.category] + '22',
                          color: CAT_COLORS[s.category],
                        }}
                      >
                        {s.category}
                      </span>
                    </td>
                    <td style={{ fontSize: 11 }}>{s.supplier}</td>
                    <td className="mono">{fmt(s.contracted)}</td>
                    <td className="mono">{fmt(s.actual)}</td>
                    <td
                      className="mono"
                      style={{
                        color: s.variance > 10 ? 'var(--red)' : s.variance > 0 ? 'var(--amber)' : 'var(--green)',
                        fontWeight: 700,
                      }}
                    >
                      {s.variance > 0 ? '+' : ''}{s.variance.toFixed(1)}%
                    </td>
                    <td className="mono">{s.qty}</td>
                    <td className="mono">
                      {s.urgent > 0 ? (
                        <span className="badge badge-amber">{s.urgent}</span>
                      ) : (
                        <span style={{ color: '#6b7a90' }}>-</span>
                      )}
                    </td>
                    <td>
                      {s.mdr === 'Yes' ? (
                        <span className="badge badge-green">MDR</span>
                      ) : (
                        <span className="badge badge-red">Non-MDR</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataTable>
        </div>
      )}
    </>
  )
}
