import { useEffect, useRef } from 'react'
import {
  Sprout, HeartPulse, BookOpen, Briefcase,
  ArrowRight, CloudRain, Bug, ShieldCheck, Store,
  Package, MessageSquare, Pill, Lock, Brain,
  Baby, Hospital, Bot, Wifi, BarChart2,
  GraduationCap, Compass, Languages, Smartphone,
  Wallet, ShoppingBag, Handshake, Search, TrendingUp, Lightbulb
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ── Track data ─────────────────────────────────────────────── */
const tracks = [
  {
    id: '01',
    Icon: Sprout,
    color: '#16A34A',
    bg: '#F0FDF4',
    title: 'Climate-Smart AgriTech',
    subtitle: 'Building Resilient Food Systems for Uganda',
    tag: 'Agriculture & Environment',
    body: [
      'Agriculture is the backbone of Uganda\'s economy driving employment, food security, household income, and rural livelihoods. Yet the sector continues to battle climate change, erratic rainfall, post-harvest losses, low productivity, and disconnected market access.',
      'Uganda\'s NDP IV calls for agricultural modernisation and climate resilience. This track invites participants to build digital tools that put the right information and resources directly in the hands of farmers connecting them to markets, advisories, and smarter production methods that can transform how food is grown and distributed.'
    ],
    solutions: [
      { Icon: CloudRain, title: 'Weather & Crop Advisory Platforms', desc: 'Real-time weather updates, crop advisory guidance, and climate intelligence delivered directly to farmers via mobile or web helping them make informed decisions every growing season.' },
      { Icon: Bug, title: 'Pest, Disease & Soil Intelligence', desc: 'Smart detection tools for identifying pests and crop diseases early, alongside soil monitoring and irrigation scheduling systems that protect harvests and increase yields.' },
      { Icon: ShieldCheck, title: 'Agricultural Input Verification', desc: 'Digital verification systems that help farmers identify genuine seeds, fertilizers, and agrochemicals reducing counterfeits that cost smallholders millions in losses annually.' },
      { Icon: Store, title: 'Market Linkage Platforms', desc: 'Connecting farmers directly to buyers, transporters, and storage providers cutting out unnecessary intermediaries, improving income, and reducing post-harvest waste significantly.' },
      { Icon: Package, title: 'Post-Harvest Management Tools', desc: 'Systems for aggregation, storage planning, and supply coordination that drastically reduce the post-harvest losses that deprive Ugandan farmers of a large share of their income.' },
      { Icon: MessageSquare, title: 'Local-Language Advisory Systems', desc: 'Advisory tools delivered in local languages via SMS, USSD, chatbots, or mobile applications reaching farmers in the most remote and underserved rural communities.' },
    ],
  },
  {
    id: '02',
    Icon: HeartPulse,
    color: '#E11D48',
    bg: '#FFF1F2',
    title: 'Inclusive Digital Health',
    subtitle: 'Advancing HIV/AIDS Response, Mental Health & Maternal Care',
    tag: 'Health & Well-being',
    body: [
      'Health equity in Uganda remains a challenge. Gaps in health information access, continuity of care, and preventive services particularly in rural and underserved communities continue to widen. Digital tools hold real power to close these gaps.',
      'This track focuses on the areas where the need is greatest: HIV/AIDS prevention and adherence, mental health support for a generation under pressure, and maternal care for mothers navigating pregnancy with limited access to quality services. Build solutions that are inclusive, accessible, and practically deployable in Uganda\'s health landscape.'
    ],
    solutions: [
      { Icon: Pill, title: 'HIV/AIDS Awareness & Adherence Apps', desc: 'Mobile applications that support HIV/AIDS awareness, promote treatment adherence through reminders, and tackle stigma helping people manage their health with dignity and consistency.' },
      { Icon: Lock, title: 'Anonymous Health Information Platforms', desc: 'Safe, private digital platforms where individuals can access sensitive health information, counselling links, and referral guidance without fear of exposure or judgement.' },
      { Icon: Brain, title: 'Mental Health Support Systems', desc: 'Platforms offering self-screening tools, wellness content, peer support networks, and counselling referrals meeting young Ugandans where they are and reducing the growing mental health gap.' },
      { Icon: Baby, title: 'Maternal Health Tools', desc: 'Tools providing antenatal reminders, immunization tracking, birth preparedness guides, and emergency alert systems that support mothers through every stage of pregnancy and postnatal care.' },
      { Icon: Hospital, title: 'Community Health Information Systems', desc: 'Coordination systems for community health workers that streamline patient follow-up, health outcome tracking, and information sharing across clinics and village health teams.' },
      { Icon: Bot, title: 'AI-Enabled Health Guidance Platforms', desc: 'AI-powered chatbots and platforms that deliver basic health guidance, triage support, and service referrals in local Ugandan languages bridging the gap where formal health services cannot reach.' },
    ],
  },
  {
    id: '03',
    Icon: BookOpen,
    color: '#1D4ED8',
    bg: '#EFF6FF',
    title: 'Future Learning: EdTech for Uganda',
    subtitle: 'Improving Access, Quality, and Inclusiveness in Education',
    tag: 'Education & Human Capital',
    body: [
      'Education is Uganda\'s most critical lever for human capital development a core pillar of NDP IV. Yet the reality in many schools is limited devices, unreliable internet, inadequate learning materials, and unequal opportunity, especially outside urban centres.',
      'This track challenges participants to build EdTech that works within Uganda\'s actual constraints not idealized conditions. Affordable, offline-capable, locally relevant solutions that genuinely improve how teachers teach and how students learn, from primary school to university and beyond.'
    ],
    solutions: [
      { Icon: Wifi, title: 'Offline & Low-Bandwidth E-Learning Platforms', desc: 'E-learning systems designed specifically for offline or low-bandwidth environments — bringing structured, quality education to rural and underserved schools that cannot rely on consistent internet.' },
      { Icon: BarChart2, title: 'Student Assessment & Personalised Learning', desc: 'Digital tools for continuous student assessment, performance tracking, and adaptive learning pathways that respond to individual student progress and learning needs.' },
      { Icon: GraduationCap, title: 'Teacher Support Systems', desc: 'Practical platforms for lesson planning, classroom management, and digital content delivery — equipping Ugandan teachers with the tools they need to deliver better instruction every day.' },
      { Icon: Compass, title: 'Career Guidance & Mentorship Platforms', desc: 'Systems that help students navigate career choices, access skills development pathways, and connect with mentors expanding opportunity beyond what\'s visible in their immediate environment.' },
      { Icon: Languages, title: 'Local-Language Educational Content', desc: 'Content platforms delivering curriculum materials and educational resources in Ugandan local languages making learning more accessible, culturally relevant, and effective for all learners.' },
      { Icon: Smartphone, title: 'Mobile Revision & Quiz Applications', desc: 'Lightweight mobile applications supporting exam preparation, self-testing, and continuous learning usable even on low-end devices and in areas with limited connectivity.' },
    ],
  },
  {
    id: '04',
    Icon: Briefcase,
    color: '#B45309',
    bg: '#FFFBEB',
    title: 'Digital Innovation for Economic Empowerment',
    subtitle: 'Opening Pathways for Entrepreneurship, Finance & Digital Livelihoods',
    tag: 'Economy & Youth Empowerment',
    body: [
      'Uganda\'s youthful population is its greatest asset and its greatest challenge. Millions of young people face unemployment, financial exclusion, and limited access to markets, business support, and economic opportunity. The digital economy can change that.',
      'This track invites participants to build innovations that open real economic pathways: tools that support entrepreneurs, improve financial literacy, connect businesses to markets, and enable young Ugandans to build digital livelihoods. Think practically. Build for the entrepreneur selling from a stall in Owino, the youth group in Gulu, the young farmer in Kabale.'
    ],
    solutions: [
      { Icon: Lightbulb, title: 'Youth Entrepreneurship & Business Platforms', desc: 'Digital platforms that give young entrepreneurs practical tools to start, manage, and grow small businesses — from digital records and invoicing to business planning and customer management.' },
      { Icon: Wallet, title: 'Savings, Budgeting & Financial Literacy Apps', desc: 'Applications that build financial discipline and literacy — helping individuals, SACCOs, and community groups save, budget, track spending, and make better financial decisions.' },
      { Icon: ShoppingBag, title: 'Market Access Tools for Small Enterprises', desc: 'Tools that connect informal and small-scale businesses to wider markets, new customers, and supply chains reducing the isolation that limits growth for Uganda\'s micro-enterprises.' },
      { Icon: Search, title: 'Digital Job-Matching & Skills Development', desc: 'Platforms that match jobseekers to employment opportunities and provide accessible upskilling pathways helping Ugandan youth become more competitive in both local and digital labour markets.' },
      { Icon: TrendingUp, title: 'E-Commerce for Local Products & Services', desc: 'E-commerce solutions built specifically for local Ugandan goods, crafts, and services giving artisans, farmers, and small producers a digital storefront and a path to new customers.' },
      { Icon: Handshake, title: 'Innovation & Mentorship Community Platforms', desc: 'Community-driven platforms that connect young innovators to mentors, training opportunities, funding networks, and enterprise support — building the ecosystem that makes ideas grow.' },
    ],
  },
]

/* ── Single track page section ───────────────────────────────── */
function TrackSection({ track, isLast }) {
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('tr-visible') }),
      { threshold: 0.05 }
    )
    ref.current?.querySelectorAll('.tr-fade').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id={`track-${track.id}`}
      className="themes-track-section"
      style={{ background: track.bg }}
    >
      {/* Top border line */}
      <div className="themes-track-topline" style={{ background: `linear-gradient(to right, transparent, ${track.color}55, transparent)` }} />

      <div className="themes-container">

        {/* ── Track header ── */}
        <div className="tr-fade themes-track-header">
          <div className="themes-track-meta">
            <span className="themes-track-num" style={{ color: track.color }}>Track {track.id}</span>
            <span className="themes-track-tag">{track.tag}</span>
          </div>

          <div className="themes-track-title-row">
            <div className="themes-track-icon-wrap" style={{ background: `${track.color}14`, border: `1px solid ${track.color}30` }}>
              <track.Icon size={28} color={track.color} />
            </div>
            <div>
              <h2 className="themes-track-title">{track.title}</h2>
              <p className="themes-track-subtitle" style={{ color: track.color }}>{track.subtitle}</p>
            </div>
          </div>
        </div>

        {/* ── Why this track — full editorial prose, no cards ── */}
        <div className="tr-fade themes-track-body" style={{ transitionDelay: '0.1s' }}>
          <div className="themes-track-body-label" style={{ borderColor: `${track.color}50` }}>
            <span style={{ color: track.color }}>Why This Track</span>
          </div>
          <div className="themes-track-body-text">
            {track.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="tr-fade themes-divider" style={{ transitionDelay: '0.15s' }}>
          <div className="themes-divider-line" style={{ background: `${track.color}22` }} />
          <span className="themes-divider-label" style={{ color: `${track.color}99` }}>Possible Solutions to Build</span>
          <div className="themes-divider-line" style={{ background: `${track.color}22` }} />
        </div>

        {/* ── Solutions — 2-column list layout, NOT cards ── */}
        <div className="tr-fade themes-solutions-grid" style={{ transitionDelay: '0.2s' }}>
          {track.solutions.map(({ Icon, title, desc }, i) => (
            <div key={i} className="themes-solution-item">
              <div className="themes-solution-icon" style={{ color: track.color, background: `${track.color}10` }}>
                <Icon size={18} />
              </div>
              <div className="themes-solution-content">
                <h4 className="themes-solution-title">{title}</h4>
                <p className="themes-solution-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA strip — only a text link, no heavy card ── */}
        <div className="tr-fade themes-track-cta" style={{ transitionDelay: '0.3s' }}>
          <p className="themes-track-cta-text">
            Building in the <strong style={{ color: track.color }}>{track.title}</strong> track?
            Applications open <strong>June 6, 2026.</strong>
          </p>
          <button disabled style={{ color: track.color, opacity: 0.5, cursor: 'not-allowed', background: 'none', border: 'none', padding: 0, font: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={14} /> Register Locked <ArrowRight size={14} />
          </button>
        </div>

      </div>

      {/* Bottom track number watermark */}
      <div className="themes-track-watermark" style={{ color: `${track.color}07` }}>
        {track.id}
      </div>
    </section>
  )
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function ThemesPage() {
  const heroRef = useRef()

  useEffect(() => {
    window.scrollTo(0, 0)
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('tr-visible') }),
      { threshold: 0.08 }
    )
    heroRef.current?.querySelectorAll('.tr-fade').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="themes-page-root">
      <Navbar />

      {/* ── Page hero ── */}
      <header ref={heroRef} className="themes-page-hero">
        <div className="themes-container">

          {/* Headline */}
          <div className="tr-fade themes-page-headline" style={{ transitionDelay: '0.08s' }}>
            <span className="themes-page-eyebrow">FoCLIS Hackathon 2026 · Innovation Tracks</span>
            <h1 className="themes-page-h1">
              Four tracks.
              <span className="themes-page-h1-accent">One national mission.</span>
            </h1>
            <p className="themes-page-intro">
              Every participant chooses one track and builds a working digital solution that responds to Uganda's most pressing development challenges. The best ideas will be recognised, awarded, and supported for real-world deployment.
            </p>
          </div>

          {/* Overall theme block */}
          <div className="tr-fade themes-main-theme-block" style={{ transitionDelay: '0.16s' }}>
            <span className="themes-main-theme-eyebrow">Overall Hackathon Theme</span>
            <blockquote className="themes-main-theme-quote">
              "Innovating for a Resilient Uganda: Advancing Climate-Smart Agriculture, Inclusive Health and Education, and Economic Empowerment"
            </blockquote>
            <p className="themes-main-theme-body">
              Grounded in Uganda's NDP IV, this theme calls on student innovators to build technology-driven solutions that improve lives, strengthen communities, and accelerate national transformation. Each of the four tracks below is a direct expression of this mission.
            </p>
          </div>

          {/* Track jump links */}
          <div className="tr-fade themes-jump-links" style={{ transitionDelay: '0.22s' }}>
            {tracks.map(t => (
              <a key={t.id} href={`#track-${t.id}`} className="themes-jump-link" style={{ '--c': t.color }}>
                <t.Icon size={15} color={t.color} />
                <span>{t.title}</span>
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ── Track sections ── */}
      {tracks.map((track, i) => (
        <TrackSection key={track.id} track={track} isLast={i === tracks.length - 1} />
      ))}

      {/* ── Closing CTA ── */}
      <section className="themes-closing">
        <div className="themes-container themes-closing-inner">
          <span className="themes-closing-eyebrow">Ready to Build?</span>
          <h3 className="themes-closing-h3">
            Your idea could be<br />
            <span className="themes-closing-accent">the solution Uganda needs.</span>
          </h3>
          <p className="themes-closing-body">
            Applications open June 6, 2026. Pick your track, form your team, and build something that matters.
          </p>
          <div className="themes-closing-actions">
            <button disabled style={{ opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} className="themes-btn-primary">
              <Lock size={16} /> Register Locked
            </button>
            <a href="/#about" className="themes-btn-secondary">Learn More</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}