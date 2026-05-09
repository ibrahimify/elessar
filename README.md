# Elessar Hospital Analytics Platform

Elessar is a hospital analytics dashboard built for the Hungarian public healthcare context. It helps demonstrate how hospital leaders and analysts can connect financial, procurement, and patient journey data to identify reimbursement gaps, cost pressure, procurement variance, and operational inefficiencies.

The current version is a frontend demo focused on an Orthopaedics department for the 2024 fiscal year. It uses a synthetic dataset calibrated against public healthcare finance references and hospital-style export structures.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Data Source and Backend Status](#data-source-and-backend-status)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [Demo Insights](#demo-insights)
- [Methodology](#methodology)
- [Team](#team)
- [Contact and Data Reuse](#contact-and-data-reuse)

## Overview

Elessar is designed as a decision-support interface for hospital operations. The dashboard translates operational exports into executive and analyst views, making it easier to understand where money is lost, where procurement can be improved, and which procedures carry the highest financial risk.

The product is structured around three analytics areas:

| Area | Purpose |
| --- | --- |
| Financial analytics | Compare departmental spend, approved budgets, and NEAK reimbursement coverage. |
| Patient journey costing | Show procedure-level cost attribution across departments and reimbursement outcomes. |
| Procurement analytics | Detect SKU fragmentation, contracted-price variance, urgent orders, and MDR compliance risks. |

## Key Features

- Executive and analyst dashboard modes.
- Overview page with high-level hospital performance indicators.
- Financial view for monthly budget utilization and NEAK reimbursement gaps.
- Procurement view for supplier, SKU, price variance, fragmentation, and compliance analysis.
- Patient journey view for procedure-level cost breakdowns.
- CSV import screen with browser-side template validation.
- Documentation view explaining assumptions, formulas, and methodology.
- GitHub Pages deployment workflow included in `.github/workflows/deploy-pages.yml`.

## Data Source and Backend Status

There is currently no live backend connected to this repository.

The demo data comes from the local frontend file:

```text
src/data.js
```

Dashboard pages import that dataset directly at build time. The application does not currently use an API server, database, cloud storage, authentication service, or backend persistence layer.

The CSV import page validates files in the browser only. It can detect file type, required columns, numeric fields, and formatting issues, but uploaded files are not saved or sent to a server.

## Tech Stack

### Frontend

| Technology | Use |
| --- | --- |
| React 18 | Component-based user interface |
| React Router DOM | Client-side routing |
| Recharts | Dashboard charts and data visualizations |
| Lucide React | Interface icons |
| CSS | Global styling, responsive layout, and visual system |

### Tooling and Build

| Technology | Use |
| --- | --- |
| Vite | Local development server and production build |
| npm | Dependency management and scripts |
| Node.js | JavaScript runtime |
| GitHub Actions | Static deployment workflow for GitHub Pages |

### Data Layer

| Technology | Use |
| --- | --- |
| Local JavaScript modules | Embedded demo dataset in `src/data.js` |
| Browser FileReader API | Local CSV parsing and validation in the import screen |
| Static build output | Deployable frontend assets in `dist/` |

## Getting Started

### Prerequisites

- Node.js 16 or newer
- npm 8 or newer

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

The Vite development server usually opens at:

```text
http://localhost:5173
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the local Vite development server. |
| `npm run build` | Creates a production-ready static build in `dist/`. |
| `npm run preview` | Serves the production build locally for review. |

## Project Structure

```text
elessar/
|-- .github/
|   `-- workflows/
|       `-- deploy-pages.yml
|-- documentation/
|   `-- Elessar_Methodology.docx
|-- public/
|   `-- favicon.svg
|-- src/
|   |-- components/
|   |   |-- AppShell.jsx
|   |   |-- DataTable.jsx
|   |   |-- MetricCard.jsx
|   |   |-- Sidebar.jsx
|   |   `-- TopBar.jsx
|   |-- pages/
|   |   |-- About.jsx
|   |   |-- Contact.jsx
|   |   |-- ModeSelection.jsx
|   |   |-- Team.jsx
|   |   `-- WhatWeDo.jsx
|   |-- views/
|   |   |-- Documentation.jsx
|   |   |-- Financial.jsx
|   |   |-- Import.jsx
|   |   |-- Overview.jsx
|   |   |-- Patients.jsx
|   |   `-- Procurement.jsx
|   |-- App.css
|   |-- App.jsx
|   |-- data.js
|   `-- main.jsx
|-- index.html
|-- package.json
|-- package-lock.json
|-- README.md
`-- vite.config.js
```

Note: generated folders such as `node_modules/` and `dist/` are intentionally excluded from the structure above.

## Data Model

The dashboard is designed around data that hospitals can typically export from existing internal systems.

| Dataset | Example Source System | Example Fields |
| --- | --- | --- |
| Budget and reimbursement | CT-Ecostat | Month, department, approved budget, actual spend, NEAK reimbursement |
| Patient journey cost | Medworks IHS and finance exports | Procedure, OR duration, department cost, total cost, reimbursement |
| Procurement and inventory | CT-Ecostat inventory module | SKU, supplier, contracted price, actual price, quantity, urgent orders, MDR status |

## Demo Insights

The bundled dataset currently demonstrates:

- Annual NEAK gap: -108,561,600 HUF.
- Total annual spend: 496,755,120 HUF.
- Total NEAK reimbursement: 388,193,960 HUF.
- Deficit cases: 28 out of 123.
- Expiry waste: 93,493,000 HUF.
- SKUs over contracted price: 22 out of 37.
- Fragmented SKU groups: 7.
- Estimated SKU consolidation potential: 90,371,760 HUF.

## Methodology

The synthetic demo dataset is calibrated using public healthcare finance references and hospital-style operating assumptions. It is intended for demonstration and validation, not as a live institutional dataset.

Supporting methodology is available in:

```text
documentation/Elessar_Methodology.docx
```

The in-app Documentation page also explains calculation logic, assumptions, formulas, and data readiness requirements.

## Current Limitations

- No backend API is implemented.
- No database is connected.
- No authentication or user management is included.
- CSV imports are validated locally but not persisted.
- Demo values should not be treated as real hospital operating records.

## Team

| Role | Name | Institution / Focus |
| --- | --- | --- |
| CEO | Szabolcs Albert | EDUTUS |
| CTO and Developer | Muhammad Ibrahim Shoeb | BME, technical build, data, cybersecurity |
| Project Manager | Jawad Bin Jahangir | University of Debrecen |
| Mentor | Márton Kis | Healthcare innovation and digitalization |

## Contact and Data Reuse

This project was developed by Muhammad Ibrahim Shoeb.

For permission to reuse the dataset, questions about the methodology, or any issue related to this repository, please contact:

| Channel | Details |
| --- | --- |
| Email | `muhammadibrahimshoeb@gmail.com` |
| GitHub | [github.com/ibrahimify](https://github.com/ibrahimify) |
| LinkedIn | [linkedin.com/in/ibrahimify](https://linkedin.com/in/ibrahimify) |

Please request permission before reusing the demo data, methodology, or project materials outside their intended presentation and evaluation context.
