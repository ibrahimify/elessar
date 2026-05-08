import GlassCard from './GlassCard.jsx'

export default function ExecutiveSummary({ eyebrow, title, body, actions = [], tone = 'blue' }) {
  return (
    <GlassCard className={`executive-summary summary-${tone}`}>
      <div>
        {eyebrow && <span className="summary-eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      {actions.length > 0 && (
        <div className="summary-actions">
          {actions.map((action) => <span key={action}>{action}</span>)}
        </div>
      )}
    </GlassCard>
  )
}
