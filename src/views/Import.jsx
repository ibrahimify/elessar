import { useState, useRef } from 'react'
import { BriefingPanel, DecisionCard, ModeNote } from './InsightPrimitives.jsx'
import PageHeader from '../components/PageHeader.jsx'

const REQUIRED_COLUMNS = {
  patients:    ['patient_id','procedure','admission_date','or_duration_min','neak_reimbursement_huf','total_cost_huf','status'],
  procurement: ['sku_id','product_name','category','supplier','contracted_price_huf','actual_price_huf','qty_ordered_ytd'],
  budget:      ['month','year','department','approved_budget_huf','actual_spend_huf','neak_reimbursement_huf'],
}

const EXAMPLES = {
  patients: `patient_id,procedure,admission_date,or_duration_min,expected_duration_min,\nneak_reimbursement_huf,total_cost_huf,status\nPT-0001,Total Knee Replacement,2024-01-15,92,90,1207300,686200,Completed`,
  procurement: `sku_id,product_name,category,supplier,contracted_price_huf,\nactual_price_huf,qty_ordered_ytd,urgent_orders_ytd,eu_mdr_compliant\nSKU-0001,Hip Cup Implant,Implant,MedSupply Kft.,133080,148590,426,7,No`,
  budget: `month,year,department,approved_budget_huf,actual_spend_huf,\nneak_reimbursement_huf,budget_utilization_pct\nJan,2024,Orthopaedics,40000000,39847680,31426450,99.6`,
}

function parseCSV(text) {
  const lines = text.trim().split('\n').filter(Boolean)
  if (lines.length < 2) return { headers:[], rows:[] }
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g,''))
  const rows = lines.slice(1).map(line => {
    const vals = line.split(',').map(v => v.trim().replace(/"/g,''))
    return Object.fromEntries(headers.map((h,i) => [h, vals[i] ?? '']))
  })
  return { headers, rows }
}

function detectType(headers) {
  if (headers.includes('patient_id') || headers.includes('procedure')) return 'patients'
  if (headers.includes('sku_id') || headers.includes('product_name')) return 'procurement'
  if (headers.includes('month') && headers.includes('approved_budget_huf')) return 'budget'
  return null
}

function validate(headers, rows, type) {
  const issues = []
  const missing = (REQUIRED_COLUMNS[type] || []).filter(c => !headers.includes(c))
  if (missing.length) issues.push({ level:'error', msg:`Missing columns: ${missing.join(', ')}` })
  const numFields = { patients:['or_duration_min','neak_reimbursement_huf','total_cost_huf'], procurement:['contracted_price_huf','actual_price_huf','qty_ordered_ytd'], budget:['approved_budget_huf','actual_spend_huf','neak_reimbursement_huf'] }[type] || []
  const badNums = rows.reduce((n, r) => n + numFields.filter(f => r[f] !== undefined && isNaN(Number(r[f]))).length, 0)
  if (badNums) issues.push({ level:'warning', msg:`${badNums} non-numeric value(s) in numeric columns` })
  const empty = rows.filter(r => Object.values(r).every(v => !v)).length
  if (empty) issues.push({ level:'warning', msg:`${empty} empty row(s) will be skipped` })
  if (type === 'patients') {
    const bad = rows.filter(r => r.admission_date && isNaN(Date.parse(r.admission_date))).length
    if (bad) issues.push({ level:'warning', msg:`${bad} row(s) have unparseable dates (expected YYYY-MM-DD)` })
  }
  return issues
}

function download(type) {
  const raw = EXAMPLES[type].replace(/\\\n/g,'')
  const blob = new Blob([raw], { type:'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href=url; a.download=`elessar_template_${type}.csv`; a.click()
  URL.revokeObjectURL(url)
}

export default function Import({ audienceMode }) {
  const [result, setResult] = useState(null)
  const ref = useRef()

  function handleFile(file) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = e => {
      const { headers, rows } = parseCSV(e.target.result)
      const type = detectType(headers)
      if (!type) { setResult({ status:'error', filename:file.name, rows:rows.length, type:'Unknown', issues:[{ level:'error', msg:'Cannot detect file type. Check that column headers match the template.' }], headers }); return }
      const issues = validate(headers, rows, type)
      setResult({ status: issues.some(i => i.level==='error') ? 'error' : issues.length ? 'warning' : 'ok', filename:file.name, rows:rows.length, type, issues, headers })
    }
    reader.readAsText(file)
  }

  return (
    <>
      <PageHeader
        kicker="Data operations"
        title="Import Hospital Data"
        description="Upload CSV exports from CT-Ecostat or Medworks. Columns are validated before loading."
      />

      <ModeNote
        audienceMode={audienceMode}
        executiveText="Showing the intake process as a simple readiness workflow."
        analystText="Showing templates, detected columns, validation warnings, and parsed row counts."
      />

      <div className="decision-grid">
        <DecisionCard
          tone="blue"
          label="Step 1"
          value="CSV"
          title="Export data"
          body="Use CT-Ecostat, Medworks, or procurement exports with the expected column headers."
        />
        <DecisionCard
          tone="teal"
          label="Step 2"
          value="Validate"
          title="Check structure"
          body="The import layer detects file type, required columns, numeric fields, and date formatting."
        />
        <DecisionCard
          tone="amber"
          label="Step 3"
          value="Review"
          title="Resolve issues"
          body="Warnings and missing columns are shown before any operational dashboard update."
        />
      </div>

      <div
        className="upload-zone"
        onClick={() => ref.current.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) }}
      >
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <h3>Drop CSV file here or click to browse</h3>
        <p>CT-Ecostat exports, Medworks patient data, procurement records</p>
        <input ref={ref} type="file" accept=".csv" style={{display:'none'}} onChange={e => handleFile(e.target.files[0])} />
      </div>

      {result && (
        <div className="table-card" style={{marginBottom:18}}>
          <div className="table-header">
            <h3>Validation: {result.filename}</h3>
            {result.status==='ok'      && <span className="badge badge-green">All checks passed</span>}
            {result.status==='warning' && <span className="badge badge-amber">Passed with warnings</span>}
            {result.status==='error'   && <span className="badge badge-red">Validation failed</span>}
          </div>
          <div className="import-result">
            <div><strong>Type detected:</strong> {result.type}</div>
            <div><strong>Rows parsed:</strong> {result.rows}</div>
            <div style={{marginTop:4}}><strong>Columns:</strong> <span className="mono">{result.headers?.join(', ')}</span></div>
            {result.issues.length === 0 && <p className="import-ok" style={{marginTop:10}}>Data is clean and ready to load.</p>}
            {result.issues.map((issue, i) => (
              <p key={i} className={issue.level==='error'?'import-err':'import-warn'} style={{marginTop:6}}>
                {issue.level==='error' ? 'Error: ' : 'Warning: '}{issue.msg}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="chart-card" style={{marginBottom:18}}>
        <div className="chart-title">Data Templates</div>
        <div className="chart-sub">Download and fill these with actual CT-Ecostat or Medworks exports.</div>
        <div className="template-grid">
          {['patients','procurement','budget'].map(type => (
            <div key={type} className="template-block">
              <h4>{type === 'patients' ? 'Patient Journey' : type === 'procurement' ? 'Procurement / SKU' : 'Budget Monthly'}</h4>
              <pre className="template-pre">{EXAMPLES[type].replace(/\\\n/g,'')}</pre>
              <button className="btn btn-outline" style={{width:'100%',justifyContent:'center',fontSize:11}} onClick={() => download(type)}>
                Download {type}.csv
              </button>
            </div>
          ))}
        </div>
      </div>

      <BriefingPanel
        tone="blue"
        eyebrow="Confirmed source systems"
        title="The model is designed around exports hospitals already have."
        body="CT-Ecostat, Medworks IHS, Labworks, and MIRA can export Excel or CSV. NEAK reimbursement data is available at department level per the data analyst interview conducted April 2025."
      />
    </>
  )
}
