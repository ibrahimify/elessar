export default function PageHeader({ kicker, title, description, children }) {
  return (
    <header className="page-header">
      <div>
        {kicker && <span className="page-kicker">{kicker}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {children && <div className="page-header-actions">{children}</div>}
    </header>
  )
}
