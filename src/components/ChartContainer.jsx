import GlassCard from './GlassCard.jsx'

export default function ChartContainer({ title, subtitle, legend, children, className = '' }) {
  return (
    <GlassCard className={`chart-card ${className}`}>
      <div className="chart-card-header">
        <div>
          <div className="chart-title">{title}</div>
          {subtitle && <div className="chart-sub">{subtitle}</div>}
        </div>
        {legend && <div className="chart-legend">{legend}</div>}
      </div>
      {children}
    </GlassCard>
  )
}
