import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle, ChevronDown } from 'lucide-react'

// ─── Full content from the concept document ────────────────────────────────
const themes = [
  {
    id: '01',
    number: '6.1',
    emoji: '🌿',
    accent: '#22C55E',
    accentMid: '#16A34A',
    accentDim: 'rgba(34,197,94,0.12)',
    accentBorder: 'rgba(34,197,94,0.25)',
    glowColor: 'rgba(34,197,94,0.15)',
    label: 'Sub-Theme 01',
    title: 'Climate-Smart AgriTech',
    subtitle: 'Building Resilient Food Systems for Uganda',
    tag: 'Agriculture & Environment',
    whyFitsShort: 'Agriculture is central to Uganda\'s economy, food security, and rural livelihoods yet the sector faces climate change, post-harvest losses, low productivity, and weak digital support.',
    whyFitsFull: [
      'Agriculture remains one of the most important sectors in Uganda\'s economy and is central to employment, food security, household income, and rural livelihoods. However, the sector continues to face major challenges such as climate change, erratic rainfall, pests and diseases, post-harvest losses, low productivity, limited extension support, and difficulties in accessing reliable markets and quality farm inputs.',
      'In line with Uganda\'s NDP IV, there is an increasing need for innovations that support agricultural modernization, value addition, sustainability, and climate resilience.',
      'This sub-theme encourages participants to develop practical digital solutions that can support farmers, improve decision-making, strengthen food systems, and enhance resilience in agricultural communities. It also creates room for technologies that can connect farmers to information, services, markets, and smart production methods.',
    ],
    solutions: [
      { icon: '🌦️', title: 'Weather & Crop Advisory Platforms', desc: 'Mobile or web-based platforms that deliver weather updates, crop advisory guidance, and climate information to farmers in real time.' },
      { icon: '🐛', title: 'Pest, Disease & Soil Intelligence', desc: 'Smart tools for pest and disease detection, soil monitoring, and irrigation scheduling to protect harvests and improve yields.' },
      { icon: '✅', title: 'Agricultural Input Verification', desc: 'Digital systems for verifying agricultural inputs and reducing counterfeit seeds or fertilizers that harm productivity.' },
      { icon: '🏪', title: 'Market Linkage Platforms', desc: 'Platforms connecting farmers directly to buyers, transporters, and storage providers to improve income and reduce waste.' },
      { icon: '📦', title: 'Post-Harvest Management Tools', desc: 'Digital tools for aggregation, storage planning, and supply coordination to reduce post-harvest losses.' },
      { icon: '💬', title: 'Local-Language Advisory Systems', desc: 'Advisory systems delivered via SMS, USSD, chatbots, or mobile applications in local languages to reach rural farmers.' },
    ],
  },
  {
    id: '02',
    number: '6.2',
    emoji: '❤️',
    accent: '#F43F5E',
    accentMid: '#E11D48',
    accentDim: 'rgba(244,63,94,0.12)',
    accentBorder: 'rgba(244,63,94,0.25)',
    glowColor: 'rgba(244,63,94,0.15)',
    label: 'Sub-Theme 02',
    title: 'Inclusive Digital Health',
    subtitle: 'Advancing HIV/AIDS Response, Mental Health, and Maternal Care',
    tag: 'Health & Well-being',
    whyFitsShort: 'Health remains a national priority in Uganda, with significant gaps in access, continuity of care, and preventive services especially in rural and underserved communities.',
    whyFitsFull: [
      'Health remains a major national priority in Uganda, particularly in relation to access, affordability, quality, and equity of service delivery. Although progress has been made in improving healthcare systems, significant gaps still exist in health information access, continuity of care, referral support, and preventive services, especially in rural and underserved communities. Digital tools have the potential to improve healthcare access, strengthen awareness, and support timely intervention.',
      'This sub-theme is particularly relevant because it focuses on critical public health areas such as HIV/AIDS, mental health, and maternal health. HIV/AIDS continues to require sustained awareness, prevention, stigma reduction, and treatment adherence support. Mental health challenges are increasingly affecting young people and communities, yet access to support services remains limited. Maternal health also remains a pressing concern, especially in areas of antenatal support, postnatal follow-up, birth preparedness, and referral systems.',
      'This sub-theme provides an opportunity for participants to create inclusive, accessible, and practical digital health solutions that address these challenges head-on.',
    ],
    solutions: [
      { icon: '💊', title: 'HIV/AIDS Awareness & Adherence Apps', desc: 'Mobile applications for HIV/AIDS awareness, treatment adherence reminders, and stigma reduction in communities.' },
      { icon: '🔒', title: 'Anonymous Health Information Platforms', desc: 'Digital platforms where individuals can access health information, counselling, and referral guidance anonymously.' },
      { icon: '🧠', title: 'Mental Health Support Systems', desc: 'Platforms offering self-screening tools, wellness resources, peer support networks, or counselling referrals for mental health.' },
      { icon: '🤱', title: 'Maternal Health Tools', desc: 'Tools providing antenatal reminders, immunization tracking, birth preparedness guides, and emergency alert systems.' },
      { icon: '🏥', title: 'Community Health Information Systems', desc: 'Systems for coordinating community health workers, managing follow-up care, and tracking patient outcomes.' },
      { icon: '🤖', title: 'AI-Enabled Health Guidance', desc: 'Chatbot or AI-powered platforms that provide basic health guidance and referrals in local Ugandan languages.' },
    ],
  },
  {
    id: '03',
    number: '6.3',
    emoji: '📚',
    accent: '#38BDF8',
    accentMid: '#0EA5E9',
    accentDim: 'rgba(56,189,248,0.12)',
    accentBorder: 'rgba(56,189,248,0.25)',
    glowColor: 'rgba(56,189,248,0.15)',
    label: 'Sub-Theme 03',
    title: 'Future Learning: EdTech for Uganda',
    subtitle: 'Improving Access, Quality, and Inclusiveness in Education',
    tag: 'Education & Human Capital',
    whyFitsShort: 'Education is a key pillar of Uganda\'s NDP IV, yet many schools and learners struggle with limited digital tools, poor connectivity, and unequal access to quality learning resources.',
    whyFitsFull: [
      'Education is central to human capital development, which is one of the key pillars of Uganda\'s NDP IV. As the country continues to expand digital transformation, there is a growing need for solutions that improve access to learning, support teachers, enhance learner engagement, and strengthen digital literacy.',
      'However, many schools and learners still face challenges such as limited access to digital tools, weak internet connectivity, inadequate e-learning infrastructure, shortage of quality learning materials, and unequal educational opportunities particularly in rural and underserved communities.',
      'This sub-theme encourages participants to build solutions that improve the quality, inclusiveness, and accessibility of education in Uganda. It gives room for the development of affordable, practical, and low-bandwidth tools that respond to the realities of schools, teachers, and learners in both urban and rural settings.',
    ],
    solutions: [
      { icon: '📶', title: 'Offline & Low-Bandwidth E-Learning', desc: 'E-learning platforms specifically designed for offline or low-bandwidth use, bringing quality education to underserved areas.' },
      { icon: '📊', title: 'Student Assessment & Personalized Learning', desc: 'Digital tools for student assessment, performance tracking, and personalized learning pathways.' },
      { icon: '👩‍🏫', title: 'Teacher Support Systems', desc: 'Systems for lesson planning, classroom management, and digital content delivery to empower educators.' },
      { icon: '🎯', title: 'Career Guidance & Mentorship Platforms', desc: 'Platforms offering career guidance, skills development, and mentorship opportunities for students and youth.' },
      { icon: '🌍', title: 'Local-Language Educational Content', desc: 'Content platforms delivering curriculum materials and educational resources in local Ugandan languages.' },
      { icon: '📱', title: 'Mobile Revision & Quiz Applications', desc: 'Mobile applications to support exam preparation, continuous learning, and academic performance improvement.' },
    ],
  },
  {
    id: '04',
    number: '6.4',
    emoji: '📈',
    accent: '#F59E0B',
    accentMid: '#D97706',
    accentDim: 'rgba(245,158,11,0.12)',
    accentBorder: 'rgba(245,158,11,0.25)',
    glowColor: 'rgba(245,158,11,0.15)',
    label: 'Sub-Theme 04',
    title: 'Digital Innovation for Economic Empowerment',
    subtitle: 'Opening Pathways for Entrepreneurship, Finance, and Digital Livelihoods',
    tag: 'Economy & Youth Empowerment',
    whyFitsShort: 'Uganda has a youthful population with strong entrepreneurial potential, but many young people face unemployment, financial exclusion, and limited access to market and business opportunities.',
    whyFitsFull: [
      'Economic empowerment is essential to building resilient communities and enabling citizens especially young people to participate meaningfully in national development. Uganda has a youthful population with strong entrepreneurial potential, but many young people still face unemployment, underemployment, limited access to market opportunities, inadequate business support, and financial exclusion.',
      'Digital innovation can play a major role in addressing these challenges by opening new pathways for entrepreneurship, skills development, financial access, and digital livelihoods.',
      'This sub-theme broadens the hackathon\'s impact beyond service delivery sectors and allows participants to design innovations that support income generation, business growth, financial inclusion, and youth empowerment. It also aligns with national aspirations for private sector development, job creation, and enterprise growth.',
    ],
    solutions: [
      { icon: '💼', title: 'Youth Entrepreneurship & Business Platforms', desc: 'Digital platforms that support youth entrepreneurship, freelancing, and small business growth with tools and resources.' },
      { icon: '💰', title: 'Savings, Budgeting & Financial Literacy Apps', desc: 'Applications that teach financial literacy and help individuals and groups save, budget, and manage money effectively.' },
      { icon: '🛒', title: 'Market Access for Small Enterprises', desc: 'Tools that connect small enterprises and informal businesses to customers, markets, and growth opportunities.' },
      { icon: '🤝', title: 'Job-Matching & Skills Development Platforms', desc: 'Digital platforms that match jobseekers with employers and provide accessible skills development pathways.' },
      { icon: '🛍️', title: 'E-Commerce for Local Products & Services', desc: 'E-commerce solutions specifically designed for local Ugandan products, artisans, and service providers.' },
      { icon: '🌱', title: 'Innovation & Mentorship Community Platforms', desc: 'Community platforms connecting young innovators to mentorship, training, funding, and enterprise opportunities.' },
    ],
  },
]

// ─── Individual SubTheme Block ──────────────────────────────────────────────
function ThemeBlock({ theme, index }) {
  const ref = useRef()
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.section-fade').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const isEven = index % 2 === 0

  return (
    <div ref={ref} className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: index % 2 === 0 ? '#020B1E' : '#040E22' }}>

      {/* Accent glow blob */}
      <div className="absolute pointer-events-none"
        style={{
          width: '600px', height: '600px', borderRadius: '50%',
          background: theme.glowColor,
          filter: 'blur(120px)',
          top: '50%', left: isEven ? '-10%' : '80%',
          transform: 'translateY(-50%)',
        }} />

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${theme.accent}40, transparent)` }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">

        {/* ── Header ── */}
        <div className="section-fade mb-12 lg:mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1 rounded-full"
              style={{ color: theme.accent, background: theme.accentDim, border: `1px solid ${theme.accentBorder}` }}>
              {theme.label}
            </span>
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-blue-400">
              {theme.tag}
            </span>
          </div>

          <div className="flex items-start gap-5 lg:gap-8">
            <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center text-3xl lg:text-4xl"
              style={{ background: theme.accentDim, border: `1.5px solid ${theme.accentBorder}` }}>
              {theme.emoji}
            </div>
            <div>
              <h2 className="font-heading font-800 text-4xl sm:text-5xl lg:text-6xl text-white leading-none mb-3">
                {theme.title}
              </h2>
              <p className="font-heading font-600 text-lg lg:text-xl" style={{ color: theme.accent }}>
                {theme.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* ── Why It Fits ── */}
        <div className="section-fade mb-14" style={{ transitionDelay: '0.1s' }}>
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

            {/* Label column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-8 rounded-full" style={{ background: theme.accent }} />
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color: theme.accent }}>
                  Why This Track?
                </span>
              </div>
              <p className="font-heading font-600 text-base text-white leading-snug">
                {theme.whyFitsShort}
              </p>
            </div>

            {/* Detail column */}
            <div className="lg:col-span-2 space-y-4">
              {/* Always show first paragraph */}
              <p className="font-body text-blue-200 text-base leading-relaxed">
                {theme.whyFitsFull[0]}
              </p>

              {/* Expandable: paragraphs 2 & 3 */}
              <div className={`space-y-4 overflow-hidden transition-all duration-500 ${expanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {theme.whyFitsFull.slice(1).map((p, i) => (
                  <p key={i} className="font-body text-blue-200 text-base leading-relaxed">{p}</p>
                ))}
              </div>

              <button onClick={() => setExpanded(v => !v)}
                className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors"
                style={{ color: theme.accent }}>
                <ChevronDown size={14} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                {expanded ? 'Show Less' : 'Read Full Context'}
              </button>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="section-fade mb-14" style={{ transitionDelay: '0.15s' }}>
          <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${theme.accent}40, transparent)` }} />
        </div>

        {/* ── Possible Solutions ── */}
        <div className="section-fade" style={{ transitionDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle size={16} style={{ color: theme.accent }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: theme.accent }}>
              Possible Example Solutions
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {theme.solutions.map((sol, i) => (
              <div key={i}
                className="section-fade group rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-default"
                style={{
                  transitionDelay: `${0.25 + i * 0.06}s`,
                  background: 'rgba(10,31,68,0.35)',
                  border: `1px solid ${theme.accentBorder}`,
                  backdropFilter: 'blur(10px)',
                }}>
                <div className="text-3xl mb-4">{sol.icon}</div>
                <h4 className="font-heading font-700 text-base text-white mb-2 leading-snug">{sol.title}</h4>
                <p className="font-body text-sm text-blue-300 leading-relaxed">{sol.desc}</p>
                {/* bottom accent line */}
                <div className="mt-5 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-16"
                  style={{ background: theme.accent }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="section-fade mt-14" style={{ transitionDelay: '0.5s' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 glass rounded-2xl px-8 py-6"
            style={{ borderColor: theme.accentBorder }}>
            <div className="flex-1">
              <p className="font-heading font-700 text-white text-base">
                Ready to build in the <span style={{ color: theme.accent }}>{theme.title}</span> track?
              </p>
              <p className="font-body text-blue-400 text-sm mt-1">
                Applications open June 6, 2026. Register now to be notified first.
              </p>
            </div>
            <a href="#register"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-700 text-sm tracking-wider uppercase text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: theme.accent, boxShadow: `0 0 0 0 ${theme.accent}` }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 25px ${theme.glowColor}`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
              Apply for This Track
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Themes Page Section ───────────────────────────────────────────────
export default function Themes() {
  const heroRef = useRef()
  const navRef = useRef()
  const [activeNav, setActiveNav] = useState(0)
  const [navSticky, setNavSticky] = useState(false)
  const sectionRefs = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    heroRef.current?.querySelectorAll('.section-fade').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Sticky nav + active highlight on scroll
  useEffect(() => {
    const onScroll = () => {
      const navEl = navRef.current
      if (navEl) {
        setNavSticky(window.scrollY > navEl.offsetTop - 80)
      }
      sectionRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        if (rect.top <= 160 && rect.bottom >= 160) setActiveNav(i)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTheme = (i) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="themes">

      {/* ── Hero Banner ── */}
      <div ref={heroRef} className="relative py-28 lg:py-36 overflow-hidden grid-bg"
        style={{ background: '#020B1E' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(26,107,255,0.12) 0%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
          <div className="section-fade flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-brand-green" />
            <span className="font-mono text-xs tracking-[0.2em] text-brand-green uppercase">Innovation Tracks</span>
          </div>

          <div className="section-fade max-w-3xl" style={{ transitionDelay: '0.1s' }}>
            <h1 className="font-heading font-800 text-5xl sm:text-6xl lg:text-7xl text-white leading-none mb-6">
              The Four <span className="text-brand-green">Sub-Themes</span>
            </h1>
            <p className="font-body text-blue-200 text-lg leading-relaxed max-w-2xl">
              The FoCLIS Hackathon 2026 is organized around four focused innovation tracks, each addressing a critical national priority aligned with Uganda's Fourth National Development Plan (NDP IV). Participants choose one track and build a digital solution that creates real impact.
            </p>
          </div>

          {/* 4 quick-nav cards */}
          <div className="section-fade grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14" style={{ transitionDelay: '0.2s' }}>
            {themes.map((t, i) => (
              <button key={t.id} onClick={() => scrollToTheme(i)}
                className="group text-left rounded-2xl p-5 transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: 'rgba(10,31,68,0.4)',
                  border: `1px solid ${t.accentBorder}`,
                  backdropFilter: 'blur(10px)',
                }}>
                <div className="text-3xl mb-3">{t.emoji}</div>
                <div className="font-mono text-[10px] tracking-widest uppercase mb-1.5" style={{ color: t.accent }}>
                  Track {t.id}
                </div>
                <div className="font-heading font-700 text-sm text-white leading-tight mb-3">{t.title}</div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] transition-colors" style={{ color: t.accent }}>
                  Explore <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky Tab Nav ── */}
      <div ref={navRef}
        className={`z-40 transition-all duration-300 ${navSticky ? 'sticky top-[64px] shadow-xl' : ''}`}
        style={{ background: 'rgba(4,14,34,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(26,107,255,0.15)' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            {themes.map((t, i) => (
              <button key={t.id} onClick={() => scrollToTheme(i)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-heading font-600 text-xs tracking-wider uppercase transition-all duration-200 ${activeNav === i ? 'text-white' : 'text-blue-400 hover:text-white'}`}
                style={activeNav === i ? { background: t.accentDim, color: t.accent } : {}}>
                <span>{t.emoji}</span>
                <span className="hidden sm:inline">{t.title}</span>
                <span className="sm:hidden">{t.id}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Full Theme Sections ── */}
      {themes.map((theme, i) => (
        <div key={theme.id} ref={el => sectionRefs.current[i] = el} id={`theme-${theme.id}`}>
          <ThemeBlock theme={theme} index={i} />
        </div>
      ))}

      {/* ── Bottom CTA Banner ── */}
      <div className="relative py-24 overflow-hidden" style={{ background: '#020B1E' }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />
        <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
          <div className="font-mono text-xs tracking-widest text-brand-accent uppercase mb-4">Ready to Participate?</div>
          <h3 className="font-heading font-800 text-4xl lg:text-5xl text-white leading-none mb-5">
            Your Idea Could Be the<br /><span className="text-brand-green">Solution Uganda Needs</span>
          </h3>
          <p className="font-body text-blue-300 text-base max-w-2xl mx-auto mb-10">
            Applications open on June 6, 2026. Choose your track, form your team, and build something that matters. The best solutions will be showcased, awarded, and potentially incubated for real-world deployment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#register"
              className="px-10 py-4 rounded-xl bg-brand-accent text-white font-heading font-700 text-base tracking-wider uppercase hover:shadow-[0_0_40px_rgba(26,107,255,0.6)] hover:scale-105 transition-all duration-300">
              Register Now →
            </a>
            <a href="#timeline"
              className="px-10 py-4 rounded-xl glass text-white font-heading font-700 text-base tracking-wider uppercase hover:bg-white/10 transition-all duration-300">
              View Timeline
            </a>
          </div>
        </div>
      </div>

    </section>
  )
}