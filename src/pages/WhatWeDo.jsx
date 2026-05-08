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
    </>
  )
}
