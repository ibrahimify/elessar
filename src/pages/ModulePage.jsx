import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'

const tableHeaders = ['Signal', 'Value', 'Meaning', 'Action']

export default function ModulePage({ page, audienceMode }) {
  const analyst = audienceMode === 'analyst'
  const lensLabel = analyst ? 'Analyst View' : 'Overview View'
  const modeData = analyst ? page.analyst : page.overview

  return (
    <>
      <PageHeader
        kicker={page.section}
        title={page.title}
        description={page.summary}
      />

      <section className="module-hero liquid-panel">
        <div>
          <span className="module-lens">{lensLabel}</span>
          <h2>{modeData.headline}</h2>
          <p>{modeData.interpretation}</p>
        </div>
        <div className="module-risk-card">
          <span>Current posture</span>
          <strong>{page.risk}</strong>
          <small>{page.action}</small>
        </div>
      </section>

      <div className="module-metric-grid">
        {modeData.metrics.map((metric) => (
          <GlassCard key={`${page.title}-${metric.label}`} className={`module-metric metric-${metric.tone || 'green'}`}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.detail}</p>
          </GlassCard>
        ))}
      </div>

      <div className="module-split">
        <GlassCard className="module-action-card">
          <span>Recommended action</span>
          <h3>{page.action}</h3>
          <p>
            Owner: <strong>{page.owner}</strong>
          </p>
          <p>
            Source: <strong>{page.source}</strong>
          </p>
        </GlassCard>

        <GlassCard className="module-action-card">
          <span>{analyst ? 'Technical readout' : 'Leadership readout'}</span>
          <h3>{analyst ? 'Inspect the drivers before approving action.' : 'Read the status, owner, and next move first.'}</h3>
          <p>
            {analyst
              ? 'This lens keeps the relevant values visible so analysts can validate assumptions, trace source systems, and prioritize the next drilldown.'
              : 'This lens compresses the page into a short operating brief that hospital leaders can understand without opening every chart.'}
          </p>
        </GlassCard>
      </div>

      <GlassCard className="module-table-card">
        <div className="module-table-head">
          <div>
            <span>{analyst ? 'Detailed signals' : 'Leadership signals'}</span>
            <h3>{page.title} data</h3>
          </div>
          <small>{lensLabel}</small>
        </div>
        <div className="module-table-wrap">
          <table className="module-table">
            <thead>
              <tr>
                {tableHeaders.map((header) => <th key={header}>{header}</th>)}
              </tr>
            </thead>
            <tbody>
              {modeData.rows.map((row) => (
                <tr key={row.join('-')}>
                  {row.map((cell, index) => (
                    <td key={`${cell}-${index}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </>
  )
}
