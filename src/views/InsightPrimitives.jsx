export function BriefingPanel({ eyebrow, title, body, tone = 'blue', children }) {
  return (
    <section className={`briefing-panel briefing-${tone}`}>
      <div className="briefing-copy">
        <div className="briefing-eyebrow">{eyebrow}</div>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      {children && <div className="briefing-actions">{children}</div>}
    </section>
  )
}

export function DecisionCard({ label, value, title, body, tone = 'blue' }) {
  return (
    <article className={`decision-card decision-${tone}`}>
      <div className="decision-label">{label}</div>
      <div className="decision-value">{value}</div>
      <h4>{title}</h4>
      <p>{body}</p>
    </article>
  )
}

export function SignalStrip({ items }) {
  return (
    <div className="signal-strip">
      {items.map((item) => (
        <div key={item.label} className={`signal-item signal-${item.tone || 'blue'}`}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  )
}

export function ModeNote({ audienceMode, analystText, executiveText }) {
  return (
    <div className="mode-note">
      <span>{audienceMode === 'analyst' ? 'Analyst lens' : 'Executive lens'}</span>
      {audienceMode === 'analyst' ? analystText : executiveText}
    </div>
  )
}
