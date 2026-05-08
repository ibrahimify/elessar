import { Link, useLocation, useNavigate } from 'react-router-dom'
import ModeToggle from './ModeToggle.jsx'

const VIEW_META = {
  '/': {
    title: 'Choose Your Lens',
    meta: 'Executive clarity or analyst depth',
  },
  '/overview': {
    title: 'Executive Overview',
    meta: 'Orthopaedics / 2024 fiscal year / hospital intelligence',
  },
  '/financial': {
    title: 'Financial Analysis',
    meta: 'Budget, NEAK coverage, procedure economics',
  },
  '/procurement': {
    title: 'Procurement & SCM',
    meta: 'Supplier leakage, SKU fragmentation, MDR exposure',
  },
  '/patients': {
    title: 'Patient Journeys',
    meta: 'Anonymised pathway costs and operating room variance',
  },
  '/import': {
    title: 'Import Data',
    meta: 'CSV templates and validation workflow',
  },
  '/documentation': {
    title: 'Documentation',
    meta: 'Methodology, formulas, references and assumptions',
  },
  '/about': {
    title: 'About Elessar',
    meta: 'Public-sector hospital intelligence platform',
  },
  '/what-we-do': {
    title: 'What We Do',
    meta: 'Procurement, finance, patient journey, and data validation',
  },
  '/team': {
    title: 'Who We Are',
    meta: 'Product, analytics, healthcare operations, engineering',
  },
  '/contact': {
    title: 'Contact Us',
    meta: 'Start a hospital intelligence conversation',
  },
}

const TEMPLATE_HEADERS = {
  patients: 'patient_id,procedure,admission_date,or_duration_min,expected_duration_min,neak_reimbursement_huf,ortho_dept_cost_huf,radiology_cost_huf,physio_cost_huf,anaesthesia_cost_huf,lab_cost_huf,total_cost_huf,status\nPT-0001,Total Knee Replacement,2024-01-15,92,90,850000,210000,45000,55000,72000,18000,400000,Completed',
  procurement: 'sku_id,product_name,category,supplier,contracted_price_huf,actual_price_huf,qty_ordered_ytd,qty_expired,urgent_orders_ytd,eu_mdr_compliant\nSKU-0001,Titanium Knee Implant Type A,Implant,EuroCare Zrt.,49903,57846,53,3,5,Yes',
  budget: 'month,year,department,approved_budget_huf,actual_spend_huf,neak_reimbursement_huf,budget_utilization_pct\nJan,2024,Orthopaedics,28000000,27892516,22940409,99.6',
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
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

export default function TopBar({ audienceMode, setAudienceMode }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const meta = VIEW_META[pathname] || VIEW_META['/overview']

  return (
    <header className="topbar">
      <div className="topbar-identity">
        <Link to="/" className="topbar-kicker">Elessar Hospital Intelligence</Link>
        <div className="topbar-title">{meta.title}</div>
        <div className="topbar-meta">{meta.meta}</div>
      </div>

      <div className="topbar-center">
        <ModeToggle audienceMode={audienceMode} setAudienceMode={setAudienceMode} />
      </div>

      <div className="topbar-actions">
        <button className="btn btn-outline" onClick={() => downloadTemplate('patients')}>
          <DownloadIcon /> Patient Template
        </button>
        <button className="btn btn-outline" onClick={() => downloadTemplate('procurement')}>
          <DownloadIcon /> SKU Template
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/import')}>
          <UploadIcon /> Import CSV
        </button>
      </div>
    </header>
  )
}
