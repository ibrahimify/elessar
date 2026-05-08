# Elessar Hospital Analytics Platform

Procurement and financial analytics for Hungarian public hospitals.
Demo scope: Orthopaedics department, 2024 fiscal year, synthetic data calibrated to Semmelweis University Hospital 2024 annual report.

---

## Requirements

- Node.js >= 16
- npm >= 8

---

## Setup

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

---

## Build

```bash
npm run build
# Output: /dist
```

---

## Project Structure

```
src/
  App.jsx             navigation and view routing
  App.css             design system and all styles
  data.js             embedded synthetic dataset with calibration notes
  views/
    Overview.jsx      executive summary, NEAK gap, deficit rates
    Financial.jsx     budget utilization, cost vs NEAK per procedure
    Procurement.jsx   SKU fragmentation, price variance, MDR compliance
    Patients.jsx      patient journey cost breakdown
    Import.jsx        CSV upload with data validation
    Documentation.jsx methodology, calculations, citations
    Sidebar.jsx       navigation
    TopBar.jsx        header and template downloads

documentation/
  Elessar_Methodology.docx   full technical documentation (Word format)
```

---

## Data Model

Three data layers, all computable from standard hospital system exports:

| Layer | Source System | Key Metrics |
|-------|--------------|-------------|
| Budget vs NEAK | CT-Ecostat | Coverage ratio, monthly deficit |
| Patient journey cost | Medworks IHS + CT-Ecostat | Cost per procedure, cross-dept attribution |
| Procurement / SKU | CT-Ecostat inventory module | PPV, expiry waste, fragmentation |

Calibration basis: Semmelweis University Hospital 2024 Annual Report.
NEAK coverage ratio: 78.2% of orthopaedics spend (hospital-wide ratio at Semmelweis: 57.8%).

---

## Key Findings in Demo

- Annual NEAK gap: -108,561,160 HUF (department receives 108M less than it spends)
- 23% of procedures run at a deficit
- Arthroscopy deficit rate: 84% (NEAK 465K HUF vs avg cost 604K HUF)
- Expiry waste: 93,493,000 HUF
- 22 of 37 SKUs paying above contracted price
- 7 fragmented SKU groups with 90M HUF consolidation potential

---

## Methodology Documentation

See `documentation/Elessar_Methodology.docx` for full technical documentation including:
- KPI calculation formulas
- Data calibration methodology
- Semmelweis 2024 balance sheet as primary calibration source
- All citations and references

---

## Competition

HSUP (Hungarian Startup University Program), Budapest, 2025.

---

## Team

Szabi (problem definition, validation), Ibrahim (backend, data), Jawad (frontend).
Mentor: Marton.
