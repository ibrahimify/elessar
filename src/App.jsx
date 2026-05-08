import { useState } from 'react'
import Sidebar from './views/Sidebar.jsx'
import TopBar from './views/TopBar.jsx'
import Overview from './views/Overview.jsx'
import Financial from './views/Financial.jsx'
import Procurement from './views/Procurement.jsx'
import Patients from './views/Patients.jsx'
import Import from './views/Import.jsx'
import Documentation from './views/Documentation.jsx'

export default function App() {
  const [activeView, setActiveView] = useState('overview')

  const views = {
    overview:      <Overview />,
    financial:     <Financial />,
    procurement:   <Procurement />,
    patients:      <Patients />,
    import:        <Import />,
    documentation: <Documentation />,
  }

  return (
    <div className="app">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="main">
        <TopBar activeView={activeView} setActiveView={setActiveView} />
        <div className="content">
          {views[activeView]}
        </div>
      </div>
    </div>
  )
}
