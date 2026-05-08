import GlassCard from './GlassCard.jsx'
import RiskBadge from './RiskBadge.jsx'

export default function MetricCard({ label, value, description, source, tone = 'blue', status }) {
  return (
    <GlassCard className={`metric-card metric-${tone}`}>
      <div className="metric-card-top">
        <span className="metric-label">{label}</span>
        {status && <RiskBadge tone={tone}>{status}</RiskBadge>}
      </div>
      <div className="metric-value">{value}</div>
      {description && <p className="metric-description">{description}</p>}
      {source && <p className="metric-source">{source}</p>}
    </GlassCard>
  )
}
