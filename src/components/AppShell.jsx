import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import TopBar from './TopBar.jsx'

function routeClass(pathname) {
  if (pathname === '/') return 'mode-selection'
  return pathname.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase() || 'overview'
}

export default function AppShell({ audienceMode, setAudienceMode }) {
  const { pathname } = useLocation()

  return (
    <div className={`app app-${routeClass(pathname)} mode-${audienceMode}`}>
      <Sidebar />
      <div className="main">
        <TopBar audienceMode={audienceMode} setAudienceMode={setAudienceMode} />
        <main key={pathname} className={`content content-${routeClass(pathname)}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
