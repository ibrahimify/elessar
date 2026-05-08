import { useNavigate } from 'react-router-dom'
import ModeToggle from '../components/ModeToggle.jsx'
import GlassCard from '../components/GlassCard.jsx'

export default function ModeSelection({ audienceMode, setAudienceMode }) {
  const navigate = useNavigate()

  function chooseMode(mode) {
    setAudienceMode(mode)
    navigate('/overview')
  }

  return (
    <div className="mode-page">
      <section className="mode-hero">
        <div className="mode-brand">
          <div className="mode-brand-mark">E</div>
          <span>Elessar</span>
        </div>
        <span className="page-kicker">Hospital intelligence, tuned to the reader</span>
        <h1>Choose how Elessar explains the hospital.</h1>
        <p>
          Executive Mode turns complex hospital data into boardroom-ready decisions.
          Analyst Mode keeps the full evidence layer with exact values, tables, formulas, and drilldowns.
        </p>
        <ModeToggle audienceMode={audienceMode} setAudienceMode={setAudienceMode} className="mode-toggle-large" />
      </section>

      <div className="mode-card-grid">
        <GlassCard
          as="button"
          type="button"
          className={`mode-option-card ${audienceMode === 'executive' ? 'selected' : ''}`}
          onClick={() => chooseMode('executive')}
        >
          <span className="mode-option-eyebrow">Executive Mode</span>
          <h2>Clear signal for leadership</h2>
          <p>
            Built for hospital executives, finance directors, and procurement leaders who need
            risk level, plain-language meaning, simple numbers, and recommended action.
          </p>
          <div className="mode-option-list">
            <span>Plain-language summary</span>
            <span>Risk level and next action</span>
            <span>Minimal charts and stronger narrative</span>
          </div>
        </GlassCard>

        <GlassCard
          as="button"
          type="button"
          className={`mode-option-card ${audienceMode === 'analyst' ? 'selected' : ''}`}
          onClick={() => chooseMode('analyst')}
        >
          <span className="mode-option-eyebrow">Analyst Mode</span>
          <h2>Full evidence layer</h2>
          <p>
            Built for analysts, controllers, procurement teams, and implementation users who need
            exact values, detailed tables, formulas, methodology, and benchmark context.
          </p>
          <div className="mode-option-list">
            <span>Detailed charts and tables</span>
            <span>Exact values and methodology</span>
            <span>Technical explanations and drilldowns</span>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
