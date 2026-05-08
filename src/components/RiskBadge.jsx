export default function RiskBadge({ tone = 'neutral', children }) {
  return <span className={`risk-badge risk-${tone}`}>{children}</span>
}
