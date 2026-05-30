import { NavLink } from 'react-router-dom'
import { MODULE_NAV, slugFromLabel } from '../modulePages.js'

export default function Sidebar() {
  const assetBase = import.meta.env.BASE_URL

  return (
    <nav className="sidebar" aria-label="Primary navigation">
      <div className="sidebar-logo">
        <NavLink to="/" className="sidebar-brand" aria-label="Elessar home">
          <span className="sidebar-brand-mark">
            <img src={`${assetBase}elessar-logo-clean.png`} alt="" aria-hidden="true" />
          </span>
          <span className="sidebar-brand-copy">
            <strong>Elessar</strong>
            <small>Hospital Intelligence</small>
          </span>
        </NavLink>
      </div>

      <div className="sidebar-nav">
        {MODULE_NAV.map(({ section, items }) => (
          <div key={section} className="sidebar-group">
            <div className="sidebar-section">{section}</div>
            {items.map((label) => (
              <NavLink
                key={`${section}-${label}`}
                to={slugFromLabel(label)}
                className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              >
                <span className="nav-dot" aria-hidden="true" />
                <span className="nav-label">{label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="gem-badge" aria-hidden="true">
          <img src={`${assetBase}elessar-gem.svg`} alt="" />
        </div>
      </div>
    </nav>
  )
}
