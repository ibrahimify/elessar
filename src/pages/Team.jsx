import PageHeader from '../components/PageHeader.jsx'
import GlassCard from '../components/GlassCard.jsx'

const members = [
  {
    role: 'CEO',
    name: 'Szabolcs Albert',
    institution: 'EDUTUS',
    avatar: 'SA',
    tags: ['AI', 'Biotech / MedTech', 'Health', 'Logistics'],
    body: 'Albert brings the founder lens for Elessar: science-minded, fairness-driven, and focused on ethical progress. He imagines a future that is technologically advanced, environmentally sustainable, and mindful of people and systems. His leadership style centers on competence, capability, and helping others improve.',
  },
  {
    role: 'CTO',
    name: 'Muhammad Ibrahim Shoeb',
    institution: 'BME',
    avatar: 'MI',
    tags: ['AI', 'Cybersecurity', 'Digital Media', 'Fintech', 'Sport'],
    body: 'Ibrahim studies Computer Science and Engineering at BME and is currently in his 4th year. He also works at Wizz Air as a Security Trainee. He combines engineering, cybersecurity, and management skills, and leads the technical build of the Elessar demo.',
    link: 'linkedin.com/in/ibrahimify',
  },
  {
    role: 'Project Manager',
    name: 'Jawad Bin Jahangir',
    institution: 'University of Debrecen',
    avatar: 'JJ',
    tags: ['AI', 'Cybersecurity', 'Fintech', 'Sport', 'Marketing'],
    body: 'Jawad is a 2nd year BSc Computer Science student from Bangladesh, currently studying at the University of Debrecen. He is a passionate coder with experience in Python, SQL, JavaScript, Flask for backend work, and React for frontend development. He also brings strong communication skills for teamwork and growth.',
  },
  {
    role: 'Mentor',
    name: 'Márton Kis',
    institution: 'Healthcare Innovation Expert',
    avatar: 'MK',
    tags: ['Business Development', 'Idea Validation', 'Presentation', 'Data Science', 'Startups', 'AI', 'Health'],
    body: 'Márton is a healthcare innovation expert, financial economist, and innovation enthusiast. He has practical experience across banking, telco, IT, media, trade, sports, and healthcare, managing domestic and international companies. As Strategic Director at one of Hungary\'s largest hospitals, he works on large digitalization projects in healthcare and social care. Through Semmelweis University, senior consulting, startup mentoring, and tender review work, he helps teams untangle, optimize, and digitize complex processes.',
  },
]

export default function Team() {
  return (
    <>
      <PageHeader
        kicker="Who we are"
        title="The team behind Elessar."
        description="A compact team combining product ambition, engineering, healthcare operations insight, data analytics, and mentorship."
      />

      <div className="team-grid">
        {members.map((member) => (
          <GlassCard key={member.name} className="team-card team-card-rich">
            <div className="team-card-head">
              <div className="team-avatar">{member.avatar}</div>
              <div>
                <span>{member.role}</span>
                <h3>{member.name}</h3>
                <small>{member.institution}</small>
              </div>
            </div>
            <p>{member.body}</p>
            {member.link && <a className="team-profile-link" href={`https://${member.link}`} target="_blank" rel="noreferrer">{member.link}</a>}
            <div className="team-tags">
              {member.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </GlassCard>
        ))}
      </div>
    </>
  )
}
