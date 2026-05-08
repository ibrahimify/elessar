export default function SectionTabs({ items, active, onChange, className = '' }) {
  return (
    <div className={`section-tabs ${className}`} role="tablist">
      {items.map((item) => (
        <button
          type="button"
          key={item.id}
          role="tab"
          aria-selected={active === item.id}
          className={active === item.id ? 'active' : ''}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
