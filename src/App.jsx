import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell.jsx'
import Overview from './views/Overview.jsx'
import Financial from './views/Financial.jsx'
import Procurement from './views/Procurement.jsx'
import Patients from './views/Patients.jsx'
import Import from './views/Import.jsx'
import Documentation from './views/Documentation.jsx'
import ModeSelection from './pages/ModeSelection.jsx'
import About from './pages/About.jsx'
import WhatWeDo from './pages/WhatWeDo.jsx'
import Team from './pages/Team.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  const [audienceMode, setAudienceMode] = useState('executive')

  return (
    <Routes>
      <Route element={<AppShell audienceMode={audienceMode} setAudienceMode={setAudienceMode} />}>
        <Route path="/" element={<ModeSelection audienceMode={audienceMode} setAudienceMode={setAudienceMode} />} />
        <Route path="/overview" element={<Overview audienceMode={audienceMode} />} />
        <Route path="/financial" element={<Financial audienceMode={audienceMode} />} />
        <Route path="/procurement" element={<Procurement audienceMode={audienceMode} />} />
        <Route path="/patients" element={<Patients audienceMode={audienceMode} />} />
        <Route path="/import" element={<Import audienceMode={audienceMode} />} />
        <Route path="/documentation" element={<Documentation audienceMode={audienceMode} />} />
        <Route path="/about" element={<About />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
