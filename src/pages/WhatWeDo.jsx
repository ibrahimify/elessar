import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import RiskBadge from '../components/RiskBadge.jsx'

const capabilities = [
  {
    title: 'Procurement analytics',
    badge: 'Supply chain',
    body: 'Identify SKU fragmentation, urgent order patterns, purchase price variance, expiry waste, and MDR compliance exposure.',
  },
  {
    title: 'Financial insight',
    badge: 'Finance',
    body: 'Connect budget utilization, NEAK reimbursement, procedure-level cost, and monthly coverage ratios into a single financial view.',
  },
  {
    title: 'Supplier risk',
    badge: 'Risk',
    body: 'Surface contract leakage, supplier variance, urgent purchasing pressure, and categories that need consolidation.',
  },
  {
    title: 'Patient journey analysis',
    badge: 'Operations',
    body: 'Track anonymised procedure economics across Orthopaedics, Radiology, Physiotherapy, Anaesthesia, and Laboratory cost attribution.',
  },
  {
    title: 'Data import and validation',
    badge: 'Data',
    body: 'Validate CSV exports from CT-Ecostat, Medworks, and procurement systems before analysis.',
  },
]

export default function WhatWeDo() {
  return (
    <>
      <PageHeader
        kicker="What we do"
        title="One intelligence layer for hospital cost pressure."
        description="Elessar turns fragmented hospital exports into procurement, finance, supplier, and patient journey insight."
      />

      <div className="capability-grid">
        {capabilities.map((item) => (
          <GlassCard key={item.title} className="capability-card">
            <RiskBadge tone="blue">{item.badge}</RiskBadge>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </GlassCard>
        ))}
      </div>

      <div className="content-grid three">
        <GlassCard className="story-card">
          <span>Problem</span>
          <h3>Public hospitals are asked to optimize without a shared operating picture.</h3>
          <p>
            Finance, procurement, clinical activity, and asset data often live in separate exports.
            That fragmentation hides real cost drivers until they appear as budget pressure,
            urgent orders, or reactive purchasing.
          </p>
        </GlassCard>
        <GlassCard className="story-card">
          <span>Solution</span>
          <h3>Elessar creates an operational digital twin for cost intelligence.</h3>
          <p>
            The platform connects financial, clinical, supply-chain, and equipment signals into
            one decision layer. It does not replace EHR systems. It explains operational cost,
            procurement pressure, and resilience risk.
          </p>
        </GlassCard>
        <GlassCard className="story-card">
          <span>Model</span>
          <h3>The product is built for ROI-driven public-sector healthcare.</h3>
          <p>
            The SaaS model can be sold to hospitals, regional health authorities, or public
            healthcare networks, with modules tied to procurement, finance, equipment, and
            operational planning.
          </p>
        </GlassCard>
      </div>
    </>
  )
}
