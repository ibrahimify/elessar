import ModeToggle from './ModeToggle.jsx'

export default function TopBar({ audienceMode, setAudienceMode }) {
  return (
    <header className="topbar topbar-simple">
      <div className="topbar-identity">
        <div className="topbar-title">Choose your lens</div>
      </div>

      <div className="topbar-center">
        <ModeToggle audienceMode={audienceMode} setAudienceMode={setAudienceMode} />
      </div>
    </header>
  )
}
