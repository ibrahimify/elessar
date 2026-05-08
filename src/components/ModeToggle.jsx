export default function ModeToggle({ audienceMode, setAudienceMode, className = '' }) {
  return (
    <div className={`mode-toggle ${className}`} aria-label="Audience mode">
      <button
        type="button"
        className={audienceMode === 'executive' ? 'active' : ''}
        onClick={() => setAudienceMode('executive')}
      >
        Executive
      </button>
      <button
        type="button"
        className={audienceMode === 'analyst' ? 'active' : ''}
        onClick={() => setAudienceMode('analyst')}
      >
        Analyst
      </button>
    </div>
  )
}
