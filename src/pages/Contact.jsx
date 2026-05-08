import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'

const email = 'muhammadibrahimshoeb@gmail.com'

export default function Contact() {
  return (
    <>
      <PageHeader
        kicker="Contact"
        title="Talk to the Elessar team."
        description="For demo access, collaboration, or hospital operations discussions, reach us directly by email."
      />

      <div className="contact-layout contact-layout-simple">
        <GlassCard className="contact-card contact-email-card">
          <span className="page-kicker">Direct email</span>
          <h2>{email}</h2>
          <p>
            Send a message about the Elessar demo, hospital analytics, procurement optimization,
            or potential collaboration.
          </p>
          <div className="contact-actions">
            <a className="btn btn-primary" href={`mailto:${email}`}>Email us</a>
            <a className="btn btn-outline" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn btn-outline" href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </GlassCard>

        <GlassCard className="contact-card">
          <span className="page-kicker">Availability</span>
          <h2>Demo and collaboration</h2>
          <p>
            The current contact links are intentionally simple. Social links are placeholders and can
            be replaced with the team's real profiles later.
          </p>
        </GlassCard>
      </div>
    </>
  )
}
