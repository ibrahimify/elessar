import GlassCard from './GlassCard.jsx'

export default function EmptyState({ title, description, action }) {
  return (
    <GlassCard className="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </GlassCard>
  )
}
