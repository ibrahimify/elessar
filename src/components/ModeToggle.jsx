export default function ModeToggle({ audienceMode, setAudienceMode, className = '' }) {
  return (
    <div className={`mode-toggle ${className}`} aria-label="View lens">
      <button
          type="button"
          className={audienceMode === 'executive' ? 'active' : ''}
          onClick={() => setAudienceMode('executive')}
        >
        Overview
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
