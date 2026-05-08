function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}
function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}

const TEMPLATE_HEADERS = {
  patients: 'patient_id,procedure,admission_date,or_duration_min,expected_duration_min,neak_reimbursement_huf,ortho_dept_cost_huf,radiology_cost_huf,physio_cost_huf,anaesthesia_cost_huf,lab_cost_huf,total_cost_huf,status\nPT-0001,Total Knee Replacement,2024-01-15,92,90,850000,210000,45000,55000,72000,18000,400000,Completed',
  procurement: 'sku_id,product_name,category,supplier,contracted_price_huf,actual_price_huf,qty_ordered_ytd,qty_expired,urgent_orders_ytd,eu_mdr_compliant\nSKU-0001,Titanium Knee Implant Type A,Implant,EuroCare Zrt.,49903,57846,53,3,5,Yes',
  budget: 'month,year,department,approved_budget_huf,actual_spend_huf,neak_reimbursement_huf,budget_utilization_pct\nJan,2024,Orthopaedics,28000000,27892516,22940409,99.6',
}

function downloadTemplate(type) {
  const content = TEMPLATE_HEADERS[type]
  const blob = new Blob([content], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `elessar_template_${type}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function TopBar({ setActiveView }) {
  return (
    <div className="topbar">
      <div>
        <div className="topbar-title">Orthopaedics Cost Intelligence</div>
        <div className="topbar-meta">
          150 patient records · 38 SKUs · 2024 fiscal year · Synthetic demo data backed by real sources
        </div>
      </div>
      <div className="topbar-actions">
        <button className="btn btn-outline" onClick={() => downloadTemplate('patients')}>
          <DownloadIcon /> Patient Template
        </button>
        <button className="btn btn-outline" onClick={() => downloadTemplate('procurement')}>
          <DownloadIcon /> SKU Template
        </button>
        <button className="btn btn-primary" onClick={() => setActiveView('import')}>
          <UploadIcon /> Import CSV
        </button>
      </div>
    </div>
  )
}
