export default function GlassCard({ as: Component = 'section', className = '', tone = 'default', children, ...props }) {
  return (
    <Component className={`glass-card glass-${tone} ${className}`} {...props}>
      {children}
    </Component>
  )
}
