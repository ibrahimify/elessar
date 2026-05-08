import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'
import ExecutiveSummary from '../components/ExecutiveSummary.jsx'
import MetricCard from '../components/MetricCard.jsx'

export default function About() {
  return (
    <>
      <PageHeader
        kicker="About"
        title="Hospital intelligence for public-sector healthcare."
        description="Elessar connects finance, procurement, and patient journey data so hospitals can understand cost pressure with clarity and trust."
      />

      <ExecutiveSummary
        eyebrow="Platform thesis"
        title="Hospitals already have the data. Elessar makes it understandable."
        body="Hungarian public hospitals run across financial, procurement, and clinical systems that rarely explain the same problem together. Elessar brings those signals into one calm intelligence layer for leaders and analysts."
        actions={[
          'Explain deficits in plain language',
          'Preserve analyst transparency',
          'Support public-sector decision making',
        ]}
      />

      <div className="kpi-grid">
        <MetricCard
          label="Audience modes"
          value="2"
          description="Executive and Analyst modes keep the same data but change the interpretation depth."
          tone="blue"
          status="Clarity"
        />
        <MetricCard
          label="Core datasets"
          value="3"
          description="Budget, patient journey, and procurement exports form the first integrated model."
          tone="teal"
          status="Model"
        />
        <MetricCard
          label="Personal data"
          value="0"
          description="The demo uses anonymised patient IDs and no names or clinical records."
          tone="green"
          status="Privacy"
        />
        <MetricCard
          label="Design goal"
          value="Trust"
          description="Light, calm, glass-like interface for hospital decision makers."
          tone="blue"
          status="Premium"
        />
      </div>

      <div className="content-grid three">
        <GlassCard className="story-card">
          <span>01</span>
          <h3>High-trust healthcare context</h3>
          <p>
            Elessar is designed for European public hospitals where credibility, privacy, auditability,
            and operational usefulness matter more than decorative dashboards.
          </p>
        </GlassCard>
        <GlassCard className="story-card">
          <span>02</span>
          <h3>Built for leadership and analysts</h3>
          <p>
            Executive Mode simplifies the meaning of the numbers. Analyst Mode keeps the tables,
            formulas, benchmarks, and methodology needed for serious review.
          </p>
        </GlassCard>
        <GlassCard className="story-card">
          <span>03</span>
          <h3>Demo scoped to Orthopaedics</h3>
          <p>
            The current demo focuses on Orthopaedics, but the same model can extend to other
            departments that rely on budget, procurement, and patient pathway exports.
          </p>
        </GlassCard>
      </div>
    </>
  )
}
