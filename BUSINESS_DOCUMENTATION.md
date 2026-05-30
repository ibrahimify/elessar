# Elessar — Business Documentation

---

## Problem Statement
*(max. 1000 characters)*

Hungarian public hospitals operate with fragmented data spread across finance, procurement, clinical activity, and asset management systems. Hospital leaders and analysts cannot connect these siloed exports to understand their real operating position — reimbursement gaps, procurement waste, and inefficiencies only become visible when they materialize as budget pressure or urgent purchasing decisions.

Hungary's public hospitals carry systemic underfunding pressure (~300M EUR documented hospital debt, P4H reference), with NEAK reimbursement consistently falling below actual clinical cost. In a sample Orthopaedics department, only 78.2% of spend is covered by NEAK, leaving a ~110M HUF annual gap. Without a unified analytics layer, hospitals cannot identify which procedures lose money, which procurement patterns drive leakage, or which operational actions would have the most impact. Elessar addresses this gap.

---

## Go-to-Market Strategy
*(TAM / SAM / SOM)*

### Market Sizing

| Level | Definition | Estimate |
|---|---|---|
| **TAM** — Total Addressable Market | Global hospital analytics and decision-support software market | ~USD 43B (2024), growing at ~15% CAGR |
| **SAM** — Serviceable Addressable Market | Central & Eastern European (CEE) public hospital sector analytics: Hungary, Poland, Czech Republic, Slovakia, Romania | ~USD 800M–1.2B (estimated addressable software spend across ~2,000+ public hospitals in the region) |
| **SOM** — Serviceable Obtainable Market | Hungarian public hospitals in the first 3 years; high-cost surgical departments (Orthopaedics, Surgery, Cardiology); initial 10–20 hospital clients | ~USD 3–8M ARR at target pricing |

### Go-to-Market Phases

**Phase 1 — Pilot (Year 1):** Deploy at 2–3 Hungarian public hospitals through the strategic network of Mentor Márton Kis (Strategic Director, major Hungarian hospital). Validate the platform with live CT-Ecostat and Medworks export data. Produce evidence of measurable savings (procurement consolidation, expiry waste reduction, contract enforcement).

**Phase 2 — Hungarian market expansion (Year 2–3):** Leverage NEAK reporting requirements and Ministry of Human Capacities digitalization initiatives to expand across the Hungarian public hospital network (~60 institutions). Introduce tiered module licensing. Build procurement and finance director buyer channel.

**Phase 3 — CEE regional expansion (Year 3–5):** Adapt the reimbursement logic for Polish NFZ, Czech ZPMV, and Slovak SZP payer models. Enter CEE market with localised product and regional partnership agreements.

---

## Competitor Analysis

### Competitor Matrix

| Competitor | Type | Strengths | Weaknesses vs Elessar |
|---|---|---|---|
| **SAP S/4HANA for Healthcare** | Enterprise ERP | Full ERP integration, multinational support | Extremely expensive, 18–24 month implementation, not purpose-built for NEAK or public-sector procurement patterns |
| **Oracle Health (Cerner)** | Clinical HIS/Analytics | Large installed base, clinical depth | Primarily EHR-focused, no NEAK reimbursement logic, not built for procurement analytics |
| **Microsoft Power BI / Tableau** | Generic BI tools | Flexible, widely known | No healthcare domain logic, no NEAK model, requires expensive customization, no interpretation layer |
| **CT-Ecostat** | Hungarian hospital management system | Widely used in Hungarian hospitals, source of truth for budgets and procurement | Source-data system only — no analytics layer, no cross-domain insight, no decision support views |
| **Medworks / IHS** | Hungarian HIS | Deep clinical activity data | Source-data system only — no financial or procurement integration |
| **Philips HealthSuite / GE Centricity Analytics** | Hospital analytics platforms | International reach, strong clinical analytics | Not built for Central European public-sector reimbursement; no Hungarian regulatory context |

### Elessar USP

Elessar is the only analytics platform purpose-built for the Hungarian public hospital operating context with:

1. **Built-in NEAK DRG reimbursement logic** — procedure-level deficit identification is native to the product, not a customization.
2. **Dual audience architecture** — the same data is presented in Executive Overview (decision language) and Analyst Detail (technical evidence) modes, eliminating the need to build separate tools for leadership and operational teams.
3. **Cross-domain integration from existing exports** — Elessar connects financial (CT-Ecostat), clinical (Medworks/IHS), and procurement data without requiring hospital IT infrastructure changes. It works with the exports hospitals already generate.
4. **Supply chain intelligence for healthcare** — SKU fragmentation detection, contract price variance flagging, urgent order pattern analysis, MDR compliance monitoring, and expiry waste quantification in one procurement module.
5. **Public-sector cost structure** — lean SaaS model designed for the budget and procurement constraints of public healthcare institutions.

---

## Personas

### Persona 1 — Katalin, Hospital Finance Director

**Age:** 46 | **Role:** CFO / Finance Director, regional public hospital, Hungary | **Institution:** University-affiliated hospital, 800+ beds

**Background:**  
Katalin has 18 years of finance experience, the last 8 in public healthcare. She oversees budget planning, NEAK reimbursement reporting, and departmental cost reviews. She presents financial results to hospital management and the Ministry. She works primarily with CT-Ecostat exports and Excel, reconciling data manually every month.

**Goals:**
- Understand the real financial position of each department without waiting for month-end manual reports.
- Prepare defensible reimbursement negotiation materials backed by procedure-level data.
- Identify which departments are driving the deficit and what can be controlled locally.

**Frustrations:**
- Fragmented exports from CT-Ecostat, Medworks, and procurement require manual reconciliation every cycle.
- Procedure-level reimbursement gaps are invisible until the annual review.
- Leadership presentations rely on numbers that lack clear cause-and-effect explanations.

**How Elessar serves Katalin:**  
The Executive Overview mode gives Katalin a clean monthly financial position with NEAK gap, budget utilization, and trend signals in one view. The Analyst mode provides the procedure-level data she needs for NEAK negotiation. The Documentation page preserves full methodology so her work is auditable.

---

### Persona 2 — Péter, Head of Procurement

**Age:** 39 | **Role:** Procurement Director, large urban public hospital | **Institution:** Public hospital, ~600 beds

**Background:**  
Péter manages supplier contracts, public tender processes, and consumable purchasing across 8 departments. He is responsible for MDR compliance and supply continuity. He tracks 300+ active SKUs through CT-Ecostat inventory module and Excel-based supplier scorecards.

**Goals:**
- Identify which SKUs are being purchased above contracted prices before it becomes an audit finding.
- Reduce the number of urgent orders (currently at +22% cost premium) by improving stock planning.
- Demonstrate procurement savings to leadership to protect the procurement department's budget.

**Frustrations:**
- SKU fragmentation is invisible at the department level — multiple suppliers for the same product type are never consolidated.
- MDR compliance tracking depends on supplier documentation sent by email, not a systematic view.
- Urgent orders are treated as operational emergencies, not as data signals about planning failure.

**How Elessar serves Péter:**  
The Procurement view surfaces SKU fragmentation with estimated consolidation savings, flags above-contract purchases, identifies urgent order patterns by supplier, and tracks MDR compliance status. The Analyst mode provides the full SKU register with variance data Péter can use in supplier review meetings.

---

### Persona 3 — Dr. András, Hospital Medical Director

**Age:** 57 | **Role:** Hospital CEO / Medical Director | **Institution:** County general hospital

**Background:**  
Dr. András oversees hospital strategy, quality, and operational performance. He has a clinical background and strong domain knowledge but limited time for detailed financial or procurement reports. He needs to make budget and investment decisions quickly, trust the data he is given, and present results to the regional health authority.

**Goals:**
- A clear, concise operating view he can read in under five minutes.
- Early warning of departments running deficits before the quarterly review.
- A tool he can share with department heads to create ownership without requiring technical expertise.

**Frustrations:**
- Every department head presents data in a different format, making cross-department comparisons unreliable.
- Financial reports explain what happened but not why or what action to take.
- External audits reveal problems that should have been visible internally months earlier.

**How Elessar serves Dr. András:**  
The Executive Overview mode presents the hospital's operating position in plain decision language — funding gap, key procedure risks, three intervention lanes. The platform's dual-mode architecture allows him to delegate analyst work to his finance team while keeping the leadership layer clean and accessible.

---

## Value Proposition
*(max. 1000 characters)*

Elessar gives Hungarian public hospital leaders and analysts one intelligence layer that connects the fragmented exports already generated by their existing systems — CT-Ecostat, Medworks/IHS, and procurement data — into a unified decision-support platform. Finance directors see procedure-level reimbursement gaps and budget trend pressure. Procurement directors see SKU fragmentation, contract leakage, urgent order patterns, and MDR compliance exposure. Hospital CEOs see the operating position in plain language without technical noise. Unlike generic BI tools or expensive ERP modules, Elessar is purpose-built for the Hungarian NEAK DRG model, deploys without infrastructure change, and separates executive and analyst views from the same data. A single orthopaedics department demo identifies 90M+ HUF in procurement savings and 110M HUF in NEAK gap — making the ROI case transparent at first presentation.

---

## How the Solution Addresses the Problem

Elessar's approach is structured around three layers:

**1. Data connection layer**  
The platform imports structured CSV exports from CT-Ecostat (finance and procurement), Medworks/IHS (patient activity and procedure data), and NEAK DRG reference tables. It validates format, required fields, and numeric integrity at import — removing the manual reconciliation step that currently consumes hours of analyst time each month.

**2. Computation and detection layer**  
On top of connected data, Elessar applies:
- NEAK DRG reimbursement logic to compute per-procedure surplus or deficit, coverage ratios, and monthly budget utilization.
- Procurement analytics algorithms to detect SKU fragmentation (same product under multiple codes), purchase price variance vs contracted rates, urgent order frequency and associated cost premium, and MDR compliance status.
- Cross-department cost attribution using the left outer join model to trace patient journey costs across Orthopaedics, Radiology, Physiotherapy, Anaesthesia, and Laboratory.

**3. Interpretation and presentation layer**  
Raw numbers are insufficient for hospital decision-making. Elessar translates computed values into:
- Executive mode: plain-language operating brief with top risk signals, recommended action lanes, and trend interpretation.
- Analyst mode: full technical evidence layer with tables, variance charts, monthly series, and methodology references — structured for audit use.

This architecture means a hospital finance director can open the platform on Monday morning and immediately understand whether November and December coverage ratios are creating a structural problem, without opening a single spreadsheet.

---

## Solution Evolution During Teamwork

The initial concept for Elessar was a financial dashboard — a cleaner way to display CT-Ecostat budget data. During early development discussions, the team, with guidance from Mentor Márton Kis, identified that displaying data was not the actual problem. The problem was interpretation: hospital leaders have access to exports but no system that explains what the numbers mean for their next decision.

This insight led to the dual audience mode architecture. The team prototyped both views in parallel and discovered that the same underlying dataset needed fundamentally different presentation logic for a CFO versus a procurement analyst. The Executive mode deliberately removes technical detail; the Analyst mode preserves full traceability.

A second major discovery was the scale of the procurement problem relative to the financial problem. While the initial focus was on NEAK reimbursement gaps (~110M HUF), analysis of the procurement dataset revealed 90M+ HUF in SKU fragmentation consolidation potential, 65M+ HUF in expiry waste, and 119 urgent orders carrying a +22% premium. This shifted substantial product scope toward the Supply Chain Control Tower module family, which became the largest section of the platform.

The team also recognized that the current frontend-only demo, while useful for evaluation, underrepresents the product's scope. The modulePages.js architecture was extended to 22 distinct module pages covering supply chain, equipment management, finance, and contact management — demonstrating the full product vision beyond the initial orthopaedics financial demo. This expansion emerged from discussions about what a hospital operations team would actually need on a weekly basis, not just at month-end.

Finally, the team discovered through Márton Kis's hospital network that the critical adoption barrier in Hungarian public healthcare is not technology readiness — it is trust. Hospitals need to see that a platform preserves methodology transparency, supports audit requirements, and does not replace their existing systems. This shaped the Documentation view (in-app methodology explanation) and the privacy-first design approach (anonymized patient IDs, no PII).

---

## Business Model Canvas

*(Please upload the BMC as an image — text representation provided below)*

| Block | Content |
|---|---|
| **Customer Segments** | Hungarian public hospitals (primary); CEE public health systems (secondary); Regional health authorities and NEAK-funded networks |
| **Value Propositions** | Unified analytics layer for fragmented hospital exports; NEAK-aware reimbursement gap detection; Procurement savings identification; Dual executive/analyst modes; No infrastructure change required |
| **Channels** | Direct sales via healthcare innovation networks; Pilot programs through mentor and strategic director relationships; Healthcare conference and NEAK policy event presence |
| **Customer Relationships** | Dedicated implementation support; SaaS subscription with onboarding; Feedback loop built into the product (ontology contribution, send feedback modules) |
| **Revenue Streams** | SaaS subscription per hospital (module-based and full-platform tiers); Implementation and onboarding fees; Possible public tender-based procurement |
| **Key Resources** | Purpose-built NEAK DRG model; Hospital data ontology and methodology; Technical team (CTO/Developer); Healthcare domain expertise (Mentor); React/Vite frontend platform |
| **Key Activities** | Product development and module expansion; Hospital pilot deployment and data integration; Reimbursement model maintenance as NEAK rates change; Customer onboarding and training |
| **Key Partners** | CT-Ecostat and Medworks/IHS (source system partners); NEAK and Ministry of Human Capacities (regulatory context); Hungarian hospital network (via Márton Kis); BME and EDUTUS for R&D |
| **Cost Structure** | Engineering and product development; Cloud infrastructure (future backend); Pilot deployment and onboarding; Regulatory compliance and data security |

---

## Go-to-Market Strategy (Detailed)

Elessar targets Hungarian public hospitals as the initial market, with a staged entry plan:

**Immediate (2025–2026):** Leverage Mentor Márton Kis's role as Strategic Director at a major Hungarian hospital to deploy a pilot in one real hospital department. Use the orthopaedics demo as proof-of-concept with live CT-Ecostat and Medworks exports. Generate a documented savings case.

**Short term (2026–2027):** Expand to 5–10 Hungarian hospitals via direct outreach and healthcare innovation events. Publish case study demonstrating procurement savings and reimbursement insight. Begin conversations with regional health authorities about network-level deployment.

**Medium term (2027–2028):** Adapt product for the CEE public hospital context. Launch in Poland and Czech Republic where similar DRG-based reimbursement models create analogous analytical gaps. Target public procurement frameworks.

**Target buyers:** Hospital CFOs, procurement directors, and hospital CEOs. Secondary buyers: regional health authority CIOs and digitalization program leads.

**Pricing strategy:** See pricing section below.

---

## IP Readiness

Several elements of the Elessar platform have potential intellectual property value:

1. **NEAK DRG reimbursement model implementation** — the specific computation logic mapping Hungarian DRG codes to procedure-level cost and surplus/deficit is a proprietary domain model calibrated against public healthcare references.

2. **Dual audience mode architecture** — the Executive/Analyst separation applied to the same underlying hospital dataset is a product design approach that could be formalized as a design patent or trade secret.

3. **Hospital analytics ontology** — the entity model connecting procedures, SKUs, suppliers, assets, cost centers, and departments into a structured hospital operating graph is a form of domain-specific knowledge that took significant effort to define.

4. **Synthetic demo dataset methodology** — the methodology for generating calibrated synthetic hospital data against public references (Semmelweis annual report, P4H Hungary debt report, HST 2024 SOTI) is described in the Elessar Methodology document and could be protected.

5. **Brand** — "Elessar" and the visual identity (the gem motif, glass-panel design system) are original and protectable as trademarks.

At this stage, the team has not formally filed patents or trademarks. The priority for IP protection would be the reimbursement model logic and the methodology documentation.

---

## Pricing Logic

**Model:** SaaS subscription, billed annually, per hospital institution.

**Rationale:**  
Hungarian public hospitals operate under public procurement law (Kbt.) and have constrained annual budgets. Pricing must be justifiable as ROI-positive in the first year, given that the product can identify 90–200M HUF in annual savings opportunities in a single department. A realistic pricing ceiling is 5–10% of demonstrable savings, making €10,000–30,000/year per hospital a commercially defensible ask.

**Proposed pricing tiers:**

| Tier | Scope | Price (per hospital/year) |
|---|---|---|
| **Starter** | Single department (e.g., Orthopaedics); Financial + Procurement modules | €8,000–12,000 |
| **Professional** | Full hospital; All modules; Up to 5 user seats | €20,000–30,000 |
| **Enterprise** | Hospital network or regional health authority; Unlimited departments; Custom integration support | Custom / tender-based |

**One-time onboarding fee:** €2,000–5,000 for data integration setup and staff training.

**Realistic market price:** €15,000–25,000/year per hospital (Professional tier) is considered achievable given comparable SaaS analytics tools in the European healthcare market. This positions Elessar below enterprise ERP module costs by a factor of 10–20x while delivering focused hospital analytics ROI.

**Public procurement note:** Hungarian public institutions above a spending threshold must follow EU procurement directives. Elessar should be priced and packaged to be frameable within existing hospital IT or digitalization budget lines, ideally below the mandatory public tender threshold for initial pilot deployments.

---

## Investment Plans and Future Development

Elessar is currently at a frontend demo stage. The next development phase requires investment in:

**Technical build:**
- Backend API and database layer (Node.js/PostgreSQL or similar)
- Secure authentication and role-based access control
- Live data integration with CT-Ecostat and Medworks/IHS export APIs
- Automated data validation and ingestion pipeline

**Product expansion:**
- Full deployment of the 22 module pages defined in the platform roadmap
- Simulation mode for scenario planning (reimbursement, procurement, procedure mix)
- Equipment management and maintenance tracker modules

**Commercial development:**
- Pilot hospital deployment (1–2 sites)
- Sales and implementation capacity
- Regulatory and data security compliance (GDPR, Hungarian healthcare data law)

**Funding sought:** €150,000–300,000 seed round to cover 12–18 months of technical build, pilot deployment, and commercial validation.

**Use of funds:**
- 50% engineering and product development
- 20% pilot deployment and hospital integration
- 20% commercial development and sales
- 10% legal, compliance, and operational costs

The team is actively seeking angel investors or early-stage funds with a healthcare technology or public-sector digitalization focus. Introductions through the EDUTUS and BME startup networks, as well as the Hungarian healthcare innovation community, are the primary outreach channels.

---

*Document prepared for Elessar business evaluation. For questions contact: muhammadibrahimshoeb@gmail.com*
