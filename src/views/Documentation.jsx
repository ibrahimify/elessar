import { useState } from 'react'
import { DecisionCard, ModeNote } from './InsightPrimitives.jsx'
import PageHeader from '../components/PageHeader.jsx'
import SectionTabs from '../components/SectionTabs.jsx'

const SECTIONS = [
  { id:'summary',    label:'Executive Summary'       },
  { id:'problem',    label:'Problem Statement'       },
  { id:'data',       label:'Data Sources'            },
  { id:'metrics',    label:'KPI Calculations'        },
  { id:'model',      label:'Patient Journey Model'   },
  { id:'calibration',label:'Data Calibration'        },
  { id:'limitations',label:'Limitations'             },
  { id:'references', label:'References'              },
]

export default function Documentation({ audienceMode }) {
  const [active, setActive] = useState('summary')

  return (
    <>
      <PageHeader
        kicker="Evidence layer"
        title="Methodology and Documentation"
        description="Technical description of data model, KPI calculations, and source citations. All metrics in this dashboard are computable from standard hospital information system exports."
      />

      <ModeNote
        audienceMode={audienceMode}
        executiveText="Showing the documentation as a credibility layer for buyers, hospital leaders, and procurement stakeholders."
        analystText="Showing formulas, calibration assumptions, source references, and model limitations for technical review."
      />

      <div className="decision-grid">
        <DecisionCard
          tone="blue"
          label="Model"
          value="3"
          title="Core datasets"
          body="Budget, patient journey, and procurement data form the minimum viable intelligence layer."
        />
        <DecisionCard
          tone="teal"
          label="Privacy"
          value="0"
          title="Personal identifiers"
          body="The patient journey layer uses anonymised records and excludes names or clinical records."
        />
        <DecisionCard
          tone="amber"
          label="Review"
          value="8"
          title="Method sections"
          body="The methodology view keeps assumptions, formulas, references, and limitations explicit."
        />
      </div>

      <div className="doc-layout">
        <div className="doc-toc">
          <h4>Contents</h4>
          <SectionTabs items={SECTIONS} active={active} onChange={setActive} className="doc-tabs" />
        </div>

        <div className="doc-body">

          {active === 'summary' && (
            <div className="doc-section">
              <h3>Executive Summary</h3>
              <p>
                Elessar is a procurement and financial analytics platform for public hospitals in Hungary.
                The platform ingests data from existing hospital information systems (CT-Ecostat, Medworks,
                Labworks) and produces department-level cost intelligence that is not currently available
                to hospital management.
              </p>
              <p>
                This demo focuses on the Orthopaedics department of a regional public hospital.
                The underlying data model is synthetic but calibrated to the 2024 annual report of
                Semmelweis University Hospital, the largest public teaching hospital in Hungary.
                All structural ratios (NEAK coverage, material cost share, personnel cost share)
                are derived from publicly available financial statements.
              </p>
              <h4>Core Problem</h4>
              <p>
                As documented by Kaplan and Porter (2011) in the Harvard Business Review, hospital
                management cannot link cost to process improvements because they do not know what
                individual procedures actually cost. Existing costing systems measure costs at the
                department level, not at the procedure or patient level. This makes evidence-based
                optimization structurally impossible.
              </p>
              <p>
                The Hungarian context compounds this: past-due hospital debt reached 117 billion HUF
                (approx. EUR 300 million) by March 2024, with 75% owed to medical technology
                suppliers. The NEAK director publicly confirmed that "there are hardly any medical
                interventions for which funding provides sufficient financial coverage."
              </p>
              <h4>Scope of Demo</h4>
              <p>
                This dashboard demonstrates the core analytical layer for a single department
                (Orthopaedics). Three datasets are used: monthly budget versus NEAK reimbursement,
                patient-level cost attribution across departments, and procurement SKU-level spend.
                These three datasets are available from the Controlling Department of any Hungarian
                public hospital using CT-Ecostat.
              </p>
            </div>
          )}

          {active === 'problem' && (
            <div className="doc-section">
              <h3>Problem Statement</h3>
              <h4>Structural Underfunding of Hungarian Public Hospitals</h4>
              <p>
                Hungary spends approximately 6.4% of GDP on healthcare versus the EU average of 9.9%.
                This structural gap means that NEAK reimbursement rates have not kept pace with
                operating cost inflation. At Semmelweis University Hospital in 2024, NEAK revenues
                of 132.98 billion HUF covered only 57.8% of total operating expenses of 230.1 billion HUF.
              </p>
              <p>
                For an orthopaedics department specifically, NEAK coverage is higher than the
                hospital-wide average because orthopaedic DRG codes carry relatively high point values.
                This demo models NEAK coverage at 78.2% of actual spend, consistent with the range
                observed in surgical departments of regional public hospitals.
              </p>
              <h4>Data Fragmentation</h4>
              <p>
                Hospital financial data in Hungary is distributed across multiple systems that do not
                communicate. The financial system (CT-Ecostat) holds budget and reimbursement data.
                The hospital information system (Medworks) holds procedure and patient-flow data.
                The procurement system holds order and inventory data. No single view exists that
                connects these sources at the procedure or patient level.
              </p>
              <p>
                The consequence is reactive management: budget overruns are identified weeks after
                they occur, and the root cause (which procedures, which suppliers, which departments)
                is not visible without manual analysis. This is precisely the condition that Kaplan
                and Porter describe as "an almost complete lack of understanding of how much it costs
                to deliver patient care."
              </p>
              <h4>Supply Chain Inefficiency</h4>
              <p>
                Without centralized analytics, hospitals engage in what industry literature terms
                "emotional buying" -- procurement driven by availability confidence rather than
                data-driven reorder modeling. This results in overstocking (expiry waste), stockouts
                (urgent orders at 15 to 30% price premium), and SKU fragmentation (ordering the same
                functional product under multiple codes from different suppliers).
              </p>
            </div>
          )}

          {active === 'data' && (
            <div className="doc-section">
              <h3>Data Sources</h3>
              <h4>Primary Calibration: Semmelweis University Hospital 2024</h4>
              <p>
                The annual financial report of Semmelweis University Hospital (Semmelweis Klinikak)
                provides the key structural ratios used to calibrate the synthetic dataset.
                The balance sheet figures are in thousand HUF (ezer forint).
              </p>
              <table className="data-table" style={{marginBottom:14}}>
                <thead>
                  <tr>
                    <th>Line Item</th><th>2024 Original Plan (KHUF)</th><th>2024 Modified Plan (KHUF)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Net Sales Revenue','34,111,766','34,903,766'],
                    ['Other Revenue (total)','200,839,742','218,712,796'],
                    ['NEAK Financing Revenue','132,981,827','150,059,575'],
                    ['Clinical Operational Support','6,000,000','6,795,305'],
                    ['Material Expenses','84,717,074','92,642,401'],
                    ['Personnel Expenses','134,946,019','145,441,259'],
                    ['Depreciation & Amortization','6,150,693','7,080,423'],
                    ['Other Expenses','4,308,468','4,341,801'],
                    ['Operating Profit (Result A)','4,829,255','4,110,679'],
                    ['Profit After Tax','6,635,701','5,908,462'],
                  ].map(([a,b,c]) => (
                    <tr key={a}>
                      <td><strong>{a}</strong></td>
                      <td className="mono">{b}</td>
                      <td className="mono">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>
                Key ratios derived from this data: NEAK as share of total expenses = 57.8%;
                material expenses as share of total = 36.8%; personnel as share of total = 58.6%.
                These ratios inform the modelled orthopaedics department figures.
              </p>
              <h4>Secondary Sources</h4>
              <p>
                HST Pathways (2024 State of the Industry Report) provides surgical procedure benchmarks:
                OR utilization averages (56% average, 64% top quartile), case cancellation rate (21%),
                average OR overrun (+5.8 minutes), and the finding that increasing OR utilization
                by 10 to 20% can add USD 575K to 2.25M in annual net revenue.
              </p>
              <p>
                P4H Network and Euractiv (June 2024) document that Hungarian hospital past-due debt
                reached HUF 117 billion (approx. EUR 300 million) by March 2024, with 75% owed to
                medical technology suppliers. The NEAK director confirmed structural underfunding
                of reimbursement rates.
              </p>
              <p>
                PrimeSourceX (September 2025) reports that hospitals using analytics-based inventory
                systems reduced procurement costs by 15% and improved on-time deliveries by 25%.
                AI-driven inventory tracking reduced waste by up to 30%.
              </p>
            </div>
          )}

          {active === 'metrics' && (
            <div className="doc-section">
              <h3>KPI Calculations</h3>
              <h4>1. Annual NEAK Gap</h4>
              <p>The total shortfall between NEAK reimbursement received and actual departmental spend across all 12 months.</p>
              <div className="doc-formula">Annual NEAK Gap = SUM(monthly_neak_received) - SUM(monthly_actual_spend)</div>
              <p>
                In this model: 388,193,960 HUF received - 496,755,120 HUF spent = -108,561,160 HUF.
                All values sourced from CT-Ecostat financial exports, available at department level per confirmed interview with Hungarian government data analyst (April 2025).
              </p>

              <h4>2. Revenue Coverage Ratio</h4>
              <p>Measures what fraction of actual spend is covered by NEAK reimbursement in a given month. A value below 1.0 indicates deficit operation.</p>
              <div className="doc-formula">Coverage Ratio (month) = NEAK_received(month) / Actual_spend(month)</div>
              <p>Target threshold is 1.0. In this model, all 12 months are below 1.0, ranging from 0.663 (December) to 0.908 (May).</p>

              <h4>3. Cost per Procedure</h4>
              <p>
                The total cost attributed to a single completed procedure, aggregating costs from all
                departments involved in the care pathway. Implements the Kaplan-Porter methodology
                (Time-Driven Activity-Based Costing applied to healthcare).
              </p>
              <div className="doc-formula">
                Cost_per_procedure = Ortho_cost + Radiology_cost + Physio_cost + Anaesthesia_cost + Lab_cost
              </div>
              <p>Department costs are allocated from CT-Ecostat via a left outer join on the Orthopaedics procedure log. This means all procedure records from Orthopaedics are retained, and matching costs from other departments are joined where available.</p>

              <h4>4. Deficit Rate per Procedure Type</h4>
              <p>The percentage of completed cases where total cost exceeded NEAK reimbursement.</p>
              <div className="doc-formula">
                Deficit_rate = COUNT(cases where total_cost &gt; neak_reimbursement) / COUNT(completed_cases)
              </div>
              <p>Arthroscopy returns 84% deficit rate because NEAK reimburses approximately 465,000 HUF while average procedure cost is 604,500 HUF. This structural gap is consistent with the NEAK director's public statement on underfunding.</p>

              <h4>5. SKU Fragmentation Index</h4>
              <p>Counts the number of distinct SKU codes used to purchase the same functional product category. High fragmentation indicates missed volume discount opportunities.</p>
              <div className="doc-formula">
                Fragmentation_index(product) = COUNT(distinct SKU codes for same functional product)
                Consolidation_potential = total_spend * 0.12
              </div>
              <p>The 12% saving estimate is derived from PrimeSourceX (2025) findings on analytics-driven procurement consolidation.</p>

              <h4>6. Purchase Price Variance (PPV)</h4>
              <p>The percentage difference between the contracted unit price and the actual unit price paid. Positive variance indicates the hospital is paying above the contracted rate.</p>
              <div className="doc-formula">
                PPV(%) = ((Actual_price - Contracted_price) / Contracted_price) * 100
              </div>
              <p>22 of 37 SKUs in this model have positive PPV, indicating maverick buying or contract leakage. This is computed from procurement system exports (order line items with supplier and price).</p>

              <h4>7. Expiry Waste</h4>
              <p>The monetary value of stock that expired before use, computed from inventory management exports.</p>
              <div className="doc-formula">
                Expiry_waste = SUM(qty_expired * actual_unit_price) across all SKUs
              </div>
              <p>Model total: 93,493,000 HUF. This directly quantifies the financial impact of over-ordering and poor demand forecasting.</p>

              <h4>8. Budget Utilization Rate</h4>
              <p>The ratio of actual spend to approved budget for a given month, expressed as a percentage.</p>
              <div className="doc-formula">
                Utilization(%) = (Actual_spend / Approved_budget) * 100
              </div>
              <p>Months above 100% indicate budget overrun. In this model, 6 of 12 months exceeded the approved budget, with November (116.5%) and December (117.1%) showing the highest overruns.</p>
            </div>
          )}

          {active === 'model' && (
            <div className="doc-section">
              <h3>Patient Journey Data Model</h3>
              <h4>Left Outer Join Architecture</h4>
              <p>
                The core data model follows a left outer join approach with Orthopaedics as the
                anchor table. Every procedure recorded in the Orthopaedics system is retained.
                Cost records from other departments (Radiology, Physiotherapy, Anaesthesia,
                Laboratory) are joined where a matching patient-procedure record exists.
              </p>
              <div className="doc-formula">
                Patient_journey_record = Ortho_procedure_record<br/>
                LEFT JOIN Radiology_costs ON patient_id<br/>
                LEFT JOIN Physio_costs ON patient_id<br/>
                LEFT JOIN Anaesthesia_costs ON patient_id<br/>
                LEFT JOIN Lab_costs ON patient_id
              </div>
              <p>
                This structure ensures no orthopaedics procedure is lost even if cross-department
                cost records are incomplete (which is common given the fragmented data landscape
                described by the data analyst interview).
              </p>
              <h4>Patient ID Anonymization</h4>
              <p>
                Patient identifiers are replaced with sequential anonymous IDs (PT-XXXX).
                No names, national identification numbers, or clinical diagnosis codes are stored
                in this layer. Only procedure type, timing, and cost attribution data is retained,
                consistent with GDPR Article 89 (processing for statistical purposes) and the
                EU Health Data Space Regulation secondary use framework.
              </p>
              <h4>Cross-Department Cost Attribution</h4>
              <p>
                For each procedure, costs from supporting departments are attributed based on
                the specific services consumed during that patient visit. The attribution keys are:
              </p>
              <table className="data-table" style={{marginBottom:0}}>
                <thead><tr><th>Department</th><th>Attribution Key</th><th>Data Source</th></tr></thead>
                <tbody>
                  {[
                    ['Orthopaedics','Primary procedure record','Medworks IHS'],
                    ['Radiology','Imaging orders linked to admission','Labworks / PACS'],
                    ['Physiotherapy','Rehab sessions linked to admission','Medworks IHS'],
                    ['Anaesthesia','Anaesthesia charge per OR record','MIRA / Medworks'],
                    ['Laboratory','Lab orders linked to admission','Labworks'],
                  ].map(([a,b,c]) => <tr key={a}><td><strong>{a}</strong></td><td>{b}</td><td className="mono">{c}</td></tr>)}
                </tbody>
              </table>
            </div>
          )}

          {active === 'calibration' && (
            <div className="doc-section">
              <h3>Data Calibration Methodology</h3>
              <h4>Scaling from Semmelweis to Regional Hospital</h4>
              <p>
                Semmelweis University Hospital is the largest public hospital in Hungary with
                approximately 120 clinical departments, 2,000+ beds, and annual expenses exceeding
                230 billion HUF. The Elessar demo models an orthopaedics department of a regional
                public hospital (approximately 40 beds, 500 procedures per year).
              </p>
              <p>
                The monthly budget of 40 million HUF (480 million annual) was determined by:
                scaling Semmelweis total material costs (84.7 billion HUF) by an orthopaedics
                department share of approximately 3.2%, applying a regional hospital discount factor
                of 0.85 (regional hospitals have lower cost bases than university hospitals),
                and adding a personnel component consistent with the 58.6% personnel share
                observed at Semmelweis.
              </p>
              <h4>NEAK DRG Reimbursement Values</h4>
              <p>
                DRG tariff values for orthopaedic procedures are based on the publicly available
                NEAK tariff schedules and the Austrian DRG system documentation (Hagenbichler, 2010),
                which serves as the methodological basis for the Hungarian system.
              </p>
              <table className="data-table" style={{marginBottom:0}}>
                <thead><tr><th>Procedure</th><th>Avg NEAK (HUF)</th><th>Avg Cost (HUF)</th><th>Coverage</th><th>DRG Basis</th></tr></thead>
                <tbody>
                  {[
                    ['Total Knee Replacement','1,207,300','686,200','175.9%','High DRG weight (joint replacement)'],
                    ['Hip Replacement','1,128,400','659,000','171.2%','High DRG weight (joint replacement)'],
                    ['Spinal Fusion','1,749,600','637,200','274.5%','Highest DRG weight in orthopaedics'],
                    ['Fracture Repair','600,600','598,400','100.4%','Near breakeven, highly variable'],
                    ['Arthroscopy','465,000','604,500','76.9%','Structurally underfunded in Hungary'],
                  ].map(([a,b,c,d,e]) => <tr key={a}><td><strong>{a}</strong></td><td className="mono">{b}</td><td className="mono">{c}</td><td className="mono">{d}</td><td style={{fontSize:11}}>{e}</td></tr>)}
                </tbody>
              </table>
            </div>
          )}

          {active === 'limitations' && (
            <div className="doc-section">
              <h3>Limitations and Assumptions</h3>
              <h4>Synthetic Data</h4>
              <p>
                All patient records, procurement records, and budget figures in this dashboard are
                synthetic. They are generated to be structurally and statistically consistent with
                real hospital operations as documented in the cited sources, but they do not represent
                any actual hospital or patient.
              </p>
              <h4>No Real Patient Data</h4>
              <p>
                The platform has not yet been deployed with real hospital data. The data analyst
                interview conducted in April 2025 confirmed that the required data exists in
                Hungarian public hospitals and is extractable from CT-Ecostat, but a formal data
                access agreement with a hospital has not yet been executed.
              </p>
              <h4>NEAK Tariff Approximations</h4>
              <p>
                NEAK DRG tariff values used in this model are approximations based on the Austrian
                DRG documentation (which the Hungarian system is derived from) and public discussion
                of Hungarian hospital financing. Actual tariff values are published by NEAK but
                require interpretation of the full DRG point weight table, which varies by hospital
                tier (complexity I, II, III).
              </p>
              <h4>Savings Estimates</h4>
              <p>
                The 20 to 30% operational cost reduction cited in marketing materials is the upper
                bound from ML-based optimization studies (Fatima, 2023). The 10 to 15% figure from
                the same paper is more conservative and represents the expected achievable range
                for a first deployment. The 12% SKU consolidation saving is from PrimeSourceX (2025).
              </p>
            </div>
          )}

          {active === 'references' && (
            <div className="doc-section">
              <h3>References</h3>
              <div className="ref-list">
                {[
                  'Kaplan, R. S. and Porter, M. E. (2011). How to Solve the Cost Crisis in Health Care. Harvard Business Review, September 2011.',
                  'Semmelweis Klinikak (2024). Annual Financial Report 2024 -- Balance Sheet and Income Statement. Budapest: Semmelweis University Hospital.',
                  'Hagenbichler, E. (2010). The Austrian DRG System. Federal Ministry of Health, Austria. ISBN 978-3-902611-45-1.',
                  'HST Pathways (2024). 13 Benchmarks and 5 Trends for ASCs: Insights from the 2024 State of the Industry Report. October 2024.',
                  'P4H Network / Euractiv (2024). Hungarian hospitals drowning in debt, suppliers risk bankruptcy, services compromised. Kopari, Z. Published June 11, 2024.',
                  'Liason, A. Optimizing Healthcare Operational Costs Using Business Intelligence and Predictive Financial Modeling. [Research article].',
                  'Fatima, S. (2023). Healthcare Cost Optimization: Leveraging Machine Learning to Identify Inefficiencies in Healthcare Systems. International Journal of Advanced Research in Engineering Technology and Science, 10(3).',
                  'KPMG AG Switzerland (2022). Benchmark-Oriented Cost Optimization in Healthcare. October 2022. Zurich: KPMG.',
                  'PrimeSourceX (2025). Healthcare Supply Chains: How Data-Driven Insights Enhance Efficiency and Reduce Costs. Published September 2025.',
                  'Kiss, A., Kiss, N. and Varadi, B. (2023). Do budget constraints limit access to health care? Evidence from PCI treatments in Hungary. International Journal of Health Economics and Management, 23(2), 281-302.',
                  'European Commission / WHO Hungary (2023). Improving patient experience and efficiency in the Hungarian health system through scaling up bundle payments and strengthening clinical governance.',
                  'NEAK (National Health Insurance Fund of Hungary). DRG-based reimbursement schedule. Published annually. Available at: neak.gov.hu.',
                  'Elessar Team (2025). Data analyst interview transcript. Government health data infrastructure expert, Budapest. April 2025. [Internal document].',
                ].map((ref, i) => (
                  <div key={i} className="ref-item">{ref}</div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
