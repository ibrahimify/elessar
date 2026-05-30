# Elessar - Hospital Analytics Platform

Elessar is a hospital intelligence dashboard for procurement, finance, and patient journey analysis in public healthcare. The current demo is scoped to the Orthopaedics department for fiscal year 2024 and uses synthetic data calibrated against public Semmelweis University Hospital reporting.

Team: Elessar

## What This Project Is

This repository contains a single-page React application that turns hospital exports into decision-ready analytics. It is designed for two audiences:

- Executive Mode for leadership and non-technical stakeholders
- Analyst Mode for controllers, procurement teams, and implementation users who need exact values and methodology

The app includes:

- Budget vs NEAK reimbursement analysis
- Procedure and patient journey costing
- Procurement and SKU fragmentation analysis
- CSV import and validation for hospital exports
- Documentation and methodology views

## Tech Stack

| Area | Technology | Used For |
|---|---|---|
| Frontend framework | React 18 | UI composition, state, routing, view rendering |
| Build tool | Vite | Local development server, production builds, fast refresh |
| Routing | React Router DOM | Page navigation and audience mode routing |
| Charts | Recharts | Budget, procedure, coverage, and procurement visualizations |
| Icons | lucide-react | Lightweight UI icons |
| Styling | Custom CSS in `src/App.css` | Visual system, layout, responsiveness, animations |

## Architecture

This project is frontend-only.

- Frontend source is in `src/`
- There is no backend service, API server, database layer, or external data-fetching logic in this repository
- The data model is embedded locally in `src/data.js`
- CSV import is handled entirely in the browser with the FileReader API

The repository models external hospital systems as source labels only:

- CT-Ecostat for finance, budget, and procurement exports
- Medworks IHS for patient and procedure exports
- Labworks for supporting clinical data references
- NEAK reimbursement as the funding reference model

## Project Structure

```text
elessar/
├── index.html                Application entry HTML
├── package.json              Scripts and dependencies
├── README.md                 Project documentation
├── vite.config.js            Vite configuration
├── public/                   Static public assets
├── documentation/            Extended methodology documentation
└── src/
    ├── main.jsx              React entry point and router bootstrap
    ├── App.jsx               Route definitions and audience mode state
    ├── App.css               Global styling and UI system
    ├── data.js               Synthetic dataset and KPI constants
    ├── components/           Shared UI components
    │   ├── AppShell.jsx
    │   ├── Sidebar.jsx
    │   ├── TopBar.jsx
    │   ├── PageHeader.jsx
    │   ├── GlassCard.jsx
    │   ├── MetricCard.jsx
    │   ├── DataTable.jsx
    │   ├── ChartContainer.jsx
    │   └── other reusable panels and controls
    ├── pages/                Static information pages
    │   ├── ModeSelection.jsx
    │   ├── About.jsx
    │   ├── WhatWeDo.jsx
    │   ├── Team.jsx
    │   └── Contact.jsx
    └── views/                Analytical views and dashboard pages
        ├── Overview.jsx
        ├── Financial.jsx
        ├── Procurement.jsx
        ├── Patients.jsx
        ├── Import.jsx
        ├── Documentation.jsx
        └── InsightPrimitives.jsx
```

## Core Data Model

The application is built around three operational data layers:

| Layer | Purpose | Example Metrics |
|---|---|---|
| Budget vs NEAK | Tracks monthly funding coverage | Coverage ratio, monthly deficit, budget utilization |
| Patient journey | Attributes costs to completed procedures | Cost per case, OR delay, deficit cases |
| Procurement / SKU | Surfaces supply chain leakage | Purchase price variance, expiry waste, fragmentation, MDR exposure |

The synthetic dataset is calibrated to public 2024 Semmelweis University Hospital reporting and uses anonymous patient IDs only. No personal clinical records are stored in this repository.

## KPIs In The Demo

The main KPI constants are defined in `src/data.js` and drive the dashboard views.

| KPI | Value |
|---|---:|
| Annual NEAK gap | -108,561,600 HUF |
| Total spend | 496,755,120 HUF |
| Total NEAK reimbursement | 388,193,960 HUF |
| Deficit cases | 28 |
| Total cases | 123 |
| Cancellation rate | 18.0% |
| Expiry waste | 93,493,000 HUF |
| Urgent orders | 119 |
| SKUs above contract | 22 |
| Total SKUs | 37 |
| Non-MDR items | 10 |
| Average OR delay | 8.0 minutes |
| Fragmented product groups | 7 |
| Estimated fragmentation saving | 90,371,760 HUF |

## Team

The team page in `src/pages/Team.jsx` lists the following members:

- Szabolcs Albert
- Muhammad Ibrahim Shoeb
- Jawad Bin Jahangir
- Márton Kis, Mentor

Primary technical ownership is attributed to Muhammad Ibrahim Shoeb.

Contact:

- Email: muhammadibrahimshoeb@gmail.com

- GitHub: @ibrahimify

If you want to reuse this data, adapt the dataset, or contribute to the project, ask permission from Ibrahim first.

## Getting Started

Requirements:

- Node.js 18 or newer
- npm 8 or newer

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the app at the local Vite address shown in the terminal, usually `http://localhost:5173`.

## Production Build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Where The Frontend Data Comes From

All visible analytics are generated from local source files:

- `src/data.js` contains the synthetic budget, patient, and procurement datasets
- `src/views/Overview.jsx` and the other view files transform those datasets into charts and KPIs
- `src/views/Import.jsx` accepts CSV uploads and validates them in-browser

No backend fetch, REST API, or server endpoint is required for the current demo.

## Methodology And Documentation

The repository includes a dedicated documentation view and an additional Word document under `documentation/` for deeper technical explanation. These materials cover:

- KPI formulas
- Data calibration methodology
- Source-system mapping
- Limitations of the synthetic demo model

## Notes For Contributors

- Keep changes aligned with the current React and Vite architecture
- Preserve the synthetic and anonymised nature of the dataset
- Do not reuse or redistribute the data without approval from Ibrahim
- Update the methodology notes if KPI definitions or source mappings change
