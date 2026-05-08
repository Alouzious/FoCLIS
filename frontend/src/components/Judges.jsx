// import { useState } from 'react'
// import { Linkedin, Twitter, Globe } from 'lucide-react'

/* const people = [
  {
    id: 1,
    name: 'Dr. Amara Osei',
    role: 'Judge',
    title: 'AI Research Lead',
    org: 'Google DeepMind Africa',
    tag: 'Machine Learning',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop&crop=center',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: 2,
    name: 'Prof. Nadia Kamara',
    role: 'Judge',
    title: 'AgriTech Innovator',
    org: 'Makerere University',
    tag: 'Climate & Agri',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=300&fit=crop&crop=center',
    socials: { linkedin: '#', website: '#' },
  },
  {
    id: 3,
    name: 'Kwame Asante',
    role: 'Judge',
    title: 'Blockchain Engineer',
    org: 'Cardano Africa',
    tag: 'Web3 & Fintech',
    img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop&crop=center',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: 4,
    name: 'Dr. Lena Mwangi',
    role: 'Speaker',
    title: 'HealthTech Founder',
    org: 'MedAI East Africa',
    tag: 'Health Innovation',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop&crop=center',
    socials: { linkedin: '#', website: '#' },
  },
  {
    id: 5,
    name: 'Samuel Nkrumah',
    role: 'Speaker',
    title: 'Venture Partner',
    org: 'Savannah Fund',
    tag: 'Impact Investing',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=300&fit=crop&crop=center',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: 6,
    name: 'Fatima Al-Hassan',
    role: 'Speaker',
    title: 'EdTech Architect',
    org: 'UNESCO Digital Lab',
    tag: 'Education Tech',
    img: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=300&fit=crop&crop=center',
    socials: { linkedin: '#', website: '#' },
  },
] */

/* const roleColors = {
  Judge: { bg: 'rgba(26, 107, 255, 0.12)', text: '#1A6BFF', border: 'rgba(26, 107, 255, 0.3)' },
  Speaker: { bg: 'rgba(245, 158, 11, 0.12)', text: '#F59E0B', border: 'rgba(245, 158, 11, 0.3)' },
} */

export default function Judges() {
  /* const [filter, setFilter] = useState('All')
  const filters = ['All', 'Judges', 'Speakers']

  const visible = people.filter(p => {
    if (filter === 'All') return true
    if (filter === 'Judges') return p.role === 'Judge'
    return p.role === 'Speaker'
  }) */

  return (
    <section id="speakers" style={{ padding: '80px 0', background: '#020B1E' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#1A6BFF',
            marginBottom: '10px',
          }}>
            FoCLIS Hackathon 2026
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 700,
              color: '#F0F4FF',
              lineHeight: 1.1,
              margin: 0,
              fontFamily: "'Syne', sans-serif",
            }}>
              Judges &{' '}
              <span style={{ color: '#1A6BFF' }}>Speakers</span>
            </h2>
          </div>
        </div>

        {/* Revealing Soon Card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
        }}>
          <div style={{
            background: 'rgba(10, 31, 68, 0.45)',
            border: '1px solid rgba(26, 107, 255, 0.12)',
            borderRadius: '14px',
            padding: '48px 32px',
            textAlign: 'center',
            maxWidth: '500px',
            width: '100%',
          }}>
            <h3 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#F0F4FF',
              margin: '0 0 12px',
              fontFamily: "'Syne', sans-serif",
            }}>
              Revealing Soon
            </h3>
            <p style={{
              fontSize: '16px',
              color: 'rgba(240,244,255,0.5)',
              margin: '0',
              lineHeight: 1.6,
            }}>
              Our amazing judges and speakers will be announced very soon. Stay tuned for updates!
            </p>
          </div>
        </div>

        {/* Old grid - commented out */}
        {/* <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '20px',
        }}>
          {visible.map(person => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div> */}

        {/* Bottom note */}
        {/* <p style={{
          textAlign: 'center',
          marginTop: '40px',
          fontSize: '13px',
          color: 'rgba(240,244,255,0.35)',
          letterSpacing: '0.05em',
        }}>
          More judges & speakers will be announced soon
        </p> */}
      </div>
    </section>
  )
}
