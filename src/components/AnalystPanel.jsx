import GlassCard from './GlassCard.jsx'

export default function AnalystPanel({ audienceMode, title, description, children }) {
  if (audienceMode !== 'analyst') return null

  return (
    <GlassCard className="analyst-panel">
      {(title || description) && (
        <div className="analyst-panel-header">
          {title && <h3>{title}</h3>}
          {description && <p>{description}</p>}
        </div>
      )}
      {children}
    </GlassCard>
  )
}
