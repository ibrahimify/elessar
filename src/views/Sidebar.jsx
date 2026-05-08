const NAV = [
  {
    section: 'Analytics',
    items: [
      { id:'overview',      label:'Overview',          Icon:GridIcon    },
      { id:'financial',     label:'Financial Analysis', Icon:BarIcon     },
      { id:'procurement',   label:'Procurement & SCM',  Icon:BoxIcon     },
      { id:'patients',      label:'Patient Journeys',   Icon:UserIcon    },
    ],
  },
  {
    section: 'Data & Docs',
    items: [
      { id:'import',        label:'Import Data',        Icon:UploadIcon  },
      { id:'documentation', label:'Methodology',        Icon:DocIcon     },
    ],
  },
]

function GridIcon()   { return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> }
function BarIcon()    { return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> }
function BoxIcon()    { return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> }
function UserIcon()   { return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> }
function UploadIcon() { return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> }
function DocIcon()    { return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> }

export default function Sidebar({ activeView, setActiveView }) {
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-brand">
          <div className="sidebar-brand-mark">E</div>
          Elessar
        </div>
        <div className="sidebar-tagline">Hospital Analytics Platform</div>
      </div>

      {NAV.map(({ section, items }) => (
        <div key={section}>
          <div className="sidebar-section">{section}</div>
          {items.map(({ id, label, Icon }) => (
            <div
              key={id}
              className={`nav-item${activeView === id ? ' active' : ''}`}
              onClick={() => setActiveView(id)}
            >
              <Icon />
              {label}
            </div>
          ))}
        </div>
      ))}

      <div className="sidebar-footer">
        <div className="dept-badge">
          <strong>Orthopaedics Dept.</strong>
          Regional Public Hospital<br />
          Synthetic demo, calibrated<br />
          to Semmelweis 2024 data
        </div>
      </div>
    </nav>
  )
}
