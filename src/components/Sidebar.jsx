import { NavLink } from 'react-router-dom'

const NAV = [
  {
    section: 'Analytics',
    items: [
      { to:'/overview',      label:'Overview',           code:'OVR', Icon:GridIcon },
      { to:'/financial',     label:'Financial Analysis', code:'FIN', Icon:BarIcon  },
      { to:'/procurement',   label:'Procurement & SCM',  code:'SCM', Icon:BoxIcon  },
      { to:'/patients',      label:'Patient Journeys',   code:'PTJ', Icon:UserIcon },
    ],
  },
  {
    section: 'Platform',
    items: [
      { to:'/',              label:'Mode Selection', code:'MOD', Icon:SparkIcon  },
      { to:'/import',        label:'Import Data',    code:'IMP', Icon:UploadIcon },
      { to:'/documentation', label:'Methodology',    code:'DOC', Icon:DocIcon    },
    ],
  },
  {
    section: 'Company',
    items: [
      { to:'/about',      label:'About',       code:'ABT', Icon:InfoIcon },
      { to:'/what-we-do', label:'What We Do',  code:'DO',  Icon:MapIcon  },
      { to:'/team',       label:'Who We Are',  code:'TM',  Icon:TeamIcon },
      { to:'/contact',    label:'Contact Us',  code:'CTA', Icon:MailIcon },
    ],
  },
]

function GridIcon()   { return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> }
function BarIcon()    { return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> }
function BoxIcon()    { return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> }
function UserIcon()   { return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> }
function UploadIcon() { return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> }
function DocIcon()    { return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> }
function SparkIcon()  { return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L6 14h6l-1 8 7-12h-6l1-8z"/></svg> }
function InfoIcon()   { return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> }
function MapIcon()    { return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg> }
function TeamIcon()   { return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M21 21v-2a3 3 0 00-2-2.83"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> }
function MailIcon()   { return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg> }

export default function Sidebar() {
  return (
    <nav className="sidebar" aria-label="Primary navigation">
      <div className="sidebar-logo">
        <NavLink to="/" className="sidebar-brand" aria-label="Elessar home">
          <div className="sidebar-brand-mark">E</div>
          <div>
            <div>Elessar</div>
            <span>Hospital intelligence</span>
          </div>
        </NavLink>
      </div>

      <div className="sidebar-nav">
        {NAV.map(({ section, items }) => (
          <div key={section} className="sidebar-group">
            <div className="sidebar-section">{section}</div>
            {items.map(({ to, label, code, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              >
                <Icon />
                <span className="nav-label">{label}</span>
                <span className="nav-code">{code}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="dept-badge">
          <span className="dept-status">Light mode</span>
          <strong>Orthopaedics Dept.</strong>
          Public hospital analytics demo
          <small>Calibrated to public 2024 sources</small>
        </div>
      </div>
    </nav>
  )
}
