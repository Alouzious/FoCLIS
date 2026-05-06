import { useEffect, useRef } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ─── All content from the concept document ────────────────────────────────
const subThemes = [
  {
    id: '01',
    number: '6.1',
    emoji: '🌿',
    accent: '#22C55E',
    accentDim: 'rgba(34,197,94,0.10)',
    accentBorder: 'rgba(34,197,94,0.22)',
    glowColor: 'rgba(34,197,94,0.12)',
    label: 'Sub-Theme 01',
    title: 'Climate-Smart AgriTech',
    subtitle: 'Building Resilient Food Systems for Uganda',
    tag: 'Agriculture & Environment',
    whyFits: [
      'Agriculture remains one of the most important sectors in Uganda\'s economy and is central to employment, food security, household income, and rural livelihoods. However, the sector continues to face major challenges such as climate change, erratic rainfall, pests and diseases, post-harvest losses, low productivity, limited extension support, and difficulties in accessing reliable markets and quality farm inputs. In line with Uganda\'s NDP IV, there is an increasing need for innovations that support agricultural modernization, value addition, sustainability, and climate resilience.',
      'This sub-theme is relevant because it encourages participants to develop practical digital solutions that can support farmers, improve decision-making, strengthen food systems, and enhance resilience in agricultural communities. It also creates room for technologies that can connect farmers to information, services, markets, and smart production methods.',
    ],
    solutions: [
      { icon: '🌦️', title: 'Weather & Crop Advisory Platforms', desc: 'Mobile or web-based platforms that deliver real-time weather updates, crop advisory guidance, and climate information to farmers.' },
      { icon: '🐛', title: 'Pest, Disease & Soil Intelligence', desc: 'Smart tools for pest and disease detection, soil monitoring, and irrigation scheduling to protect harvests and improve yields.' },
      { icon: '✅', title: 'Agricultural Input Verification Systems', desc: 'Digital systems for verifying agricultural inputs and reducing counterfeit seeds or fertilizers that harm productivity.' },
      { icon: '🏪', title: 'Market Linkage Platforms', desc: 'Platforms connecting farmers directly to buyers, transporters, and storage providers to improve income and reduce waste.' },
      { icon: '📦', title: 'Post-Harvest Management Tools', desc: 'Digital tools for aggregation, storage planning, and supply coordination to significantly reduce post-harvest losses.' },
      { icon: '💬', title: 'Local-Language Advisory Systems', desc: 'Advisory systems delivered via SMS, USSD, chatbots, or mobile applications in local languages to reach rural farmers effectively.' },
    ],
  },
  {
    id: '02',
    number: '6.2',
    emoji: '❤️',
    accent: '#F43F5E',
    accentDim: 'rgba(244,63,94,0.10)',
    accentBorder: 'rgba(244,63,94,0.22)',
    glowColor: 'rgba(244,63,94,0.12)',
    label: 'Sub-Theme 02',
    title: 'Inclusive Digital Health',
    subtitle: 'Advancing HIV/AIDS Response, Mental Health, and Maternal Care',
    tag: 'Health & Well-being',
    whyFits: [
      'Health remains a major national priority in Uganda, particularly in relation to access, affordability, quality, and equity of service delivery. Although progress has been made in improving healthcare systems, significant gaps still exist in health information access, continuity of care, referral support, and preventive services, especially in rural and underserved communities. Digital tools have the potential to improve healthcare access, strengthen awareness, and support timely intervention.',
      'This sub-theme is particularly relevant because it focuses on critical public health areas such as HIV/AIDS, mental health, and maternal health. HIV/AIDS continues to require sustained awareness, prevention, stigma reduction, and treatment adherence support. Mental health challenges are increasingly affecting young people and communities, yet access to support services remains limited. Maternal health also remains a pressing concern, especially in areas of antenatal support, postnatal follow-up, birth preparedness, and referral systems.',
      'This sub-theme therefore provides an opportunity for participants to create inclusive, accessible, and practical digital health solutions that address these challenges head-on.',
    ],
    solutions: [
      { icon: '💊', title: 'HIV/AIDS Awareness & Adherence Apps', desc: 'Mobile applications for HIV/AIDS awareness, treatment adherence reminders, and stigma reduction in communities.' },
      { icon: '🔒', title: 'Anonymous Health Information Platforms', desc: 'Digital platforms where individuals can anonymously access health information, counselling, and referral guidance.' },
      { icon: '🧠', title: 'Mental Health Support Systems', desc: 'Platforms offering self-screening tools, wellness resources, peer support networks, or counselling referrals for mental health.' },
      { icon: '🤱', title: 'Maternal Health Tools', desc: 'Tools providing antenatal reminders, immunization tracking, birth preparedness guides, and emergency alert systems for mothers.' },
      { icon: '🏥', title: 'Community Health Information Systems', desc: 'Systems for coordinating community health workers, managing patient follow-up care, and tracking health outcomes at scale.' },
      { icon: '🤖', title: 'AI-Enabled Health Guidance Platforms', desc: 'Chatbot or AI-powered platforms that provide basic health guidance and service referrals in local Ugandan languages.' },
    ],
  },
  {
    id: '03',
    number: '6.3',
    emoji: '📚',
    accent: '#38BDF8',
    accentDim: 'rgba(56,189,248,0.10)',
    accentBorder: 'rgba(56,189,248,0.22)',
    glowColor: 'rgba(56,189,248,0.12)',
    label: 'Sub-Theme 03',
    title: 'Future Learning: EdTech for Uganda',
    subtitle: 'Improving Access, Quality, and Inclusiveness in Education',
    tag: 'Education & Human Capital',
    whyFits: [
      'Education is central to human capital development, which is one of the key pillars of Uganda\'s NDP IV. As the country continues to expand digital transformation, there is a growing need for solutions that improve access to learning, support teachers, enhance learner engagement, and strengthen digital literacy. However, many schools and learners still face challenges such as limited access to digital tools, weak internet connectivity, inadequate e-learning infrastructure, shortage of quality learning materials, and unequal educational opportunities — particularly in rural and underserved communities.',
      'This sub-theme is relevant because it encourages participants to build solutions that improve the quality, inclusiveness, and accessibility of education in Uganda. It also gives room for the development of affordable, practical, and low-bandwidth tools that respond to the realities of schools, teachers, and learners in both urban and rural settings.',
    ],
    solutions: [
      { icon: '📶', title: 'Offline & Low-Bandwidth E-Learning Platforms', desc: 'E-learning platforms specifically designed for offline or low-bandwidth use, bringing quality education to underserved and rural areas.' },
      { icon: '📊', title: 'Student Assessment & Personalized Learning Tools', desc: 'Digital tools for student assessment, performance tracking, and personalized learning pathways tailored to individual needs.' },
      { icon: '👩‍🏫', title: 'Teacher Support Systems', desc: 'Systems for lesson planning, classroom management, and digital content delivery to empower and equip educators effectively.' },
      { icon: '🎯', title: 'Career Guidance & Mentorship Platforms', desc: 'Platforms offering career guidance, skilling opportunities, and mentorship connections for students and Ugandan youth.' },
      { icon: '🌍', title: 'Local-Language Educational Content Platforms', desc: 'Content platforms delivering curriculum materials and educational resources in local Ugandan languages for schools and communities.' },
      { icon: '📱', title: 'Mobile Revision & Quiz Applications', desc: 'Mobile applications that support exam preparation, continuous learning, and sustained academic performance improvement.' },
    ],
  },
  {
    id: '04',
    number: '6.4',
    emoji: '📈',
    accent: '#F59E0B',
    accentDim: 'rgba(245,158,11,0.10)',
    accentBorder: 'rgba(245,158,11,0.22)',
    glowColor: 'rgba(245,158,11,0.12)',
    label: 'Sub-Theme 04',
    title: 'Digital Innovation for Economic Empowerment',
    subtitle: 'Opening Pathways for Entrepreneurship, Finance, and Digital Livelihoods',
    tag: 'Economy & Youth Empowerment',
    whyFits: [
      'Economic empowerment is essential to building resilient communities and enabling citizens — especially young people — to participate meaningfully in national development. Uganda has a youthful population with strong entrepreneurial potential, but many young people still face unemployment, underemployment, limited access to market opportunities, inadequate business support, and financial exclusion. Digital innovation can play a major role in addressing these challenges by opening new pathways for entrepreneurship, skills development, financial access, and digital livelihoods.',
      'This sub-theme is relevant because it broadens the hackathon\'s impact beyond service delivery sectors and allows participants to design innovations that support income generation, business growth, financial inclusion, and youth empowerment. It also aligns with national aspirations for private sector development, job creation, and enterprise growth.',
    ],
    solutions: [
      { icon: '💼', title: 'Youth Entrepreneurship & Business Platforms', desc: 'Digital platforms that support youth entrepreneurship, freelancing, and small business growth with practical tools and resources.' },
      { icon: '💰', title: 'Savings, Budgeting & Financial Literacy Apps', desc: 'Applications that teach financial literacy and help individuals and groups save, budget, and manage money effectively.' },
      { icon: '🛒', title: 'Market Access Tools for Small Enterprises', desc: 'Tools that connect small enterprises and informal businesses to customers, wider markets, and sustainable growth opportunities.' },
      { icon: '🤝', title: 'Digital Job-Matching & Skills Development', desc: 'Platforms that match jobseekers with employers and provide accessible, practical skills development pathways for Ugandan youth.' },
      { icon: '🛍️', title: 'E-Commerce for Local Products & Services', desc: 'E-commerce solutions specifically designed to promote and sell local Ugandan products, crafts, and services online.' },
      { icon: '🌱', title: 'Innovation & Mentorship Community Platforms', desc: 'Community platforms connecting young innovators to mentorship, training, funding networks, and enterprise opportunities.' },
    ],
  },
]

// ─── Sub-theme section block ───────────────────────────────────────────────
function SubThemeSection({ theme, index }) {
  const ref = useRef()

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.06 }
    )
    ref.current?.querySelectorAll('.section-fade').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} id={`subtheme-${theme.id}`}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: index % 2 === 0 ? '#020B1E' : '#040E22' }}>

      {/* Ambient glow */}
      <div className="absolute pointer-events-none"
        style={{
          width: '700px', height: '500px', borderRadius: '50%',
          background: theme.glowColor, filter: 'blur(130px)',
          top: '30%', left: index % 2 === 0 ? '-15%' : '70%',
        }} />

      {/* Top separator line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${theme.accent}50, transparent)` }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">

        {/* ── Sub-theme Header ── */}
        <div className="section-fade mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
              style={{ color: theme.accent, background: theme.accentDim, border: `1px solid ${theme.accentBorder}` }}>
              {theme.label}
            </span>
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-blue-500">
              {theme.tag}
            </span>
          </div>

          <div className="flex items-start gap-6 lg:gap-8">
            <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center text-3xl lg:text-4xl"
              style={{ background: theme.accentDim, border: `1.5px solid ${theme.accentBorder}` }}>
              {theme.emoji}
            </div>
            <div className="flex-1">
              <h2 className="font-heading font-800 text-4xl sm:text-5xl lg:text-[56px] text-white leading-none mb-3">
                {theme.title}
              </h2>
              <p className="font-heading font-600 text-lg lg:text-xl leading-snug" style={{ color: theme.accent }}>
                {theme.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* ── Why It Fits ── */}
        <div className="section-fade mb-14" style={{ transitionDelay: '0.1s' }}>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Left label */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 mb-3 lg:mb-4">
                <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: theme.accent }} />
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color: theme.accent }}>
                  Why This Track?
                </span>
              </div>
              {/* Decorative number */}
              <div className="font-display text-[80px] lg:text-[100px] leading-none select-none"
                style={{ color: theme.accentDim, WebkitTextStroke: `1px ${theme.accentBorder}` }}>
                {theme.id}
              </div>
            </div>

            {/* Right: full paragraphs */}
            <div className="lg:col-span-9 space-y-5">
              {theme.whyFits.map((paragraph, i) => (
                <p key={i} className="font-body text-blue-200 text-base lg:text-[17px] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="section-fade mb-14" style={{ transitionDelay: '0.15s' }}>
          <div className="flex items-center gap-4">
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${theme.accent}50, transparent)` }} />
            <div className="flex items-center gap-2 flex-shrink-0">
              <CheckCircle size={14} style={{ color: theme.accent }} />
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: theme.accent }}>
                Possible Solutions
              </span>
            </div>
            <div className="h-px flex-1" style={{ background: `linear-gradient(to left, ${theme.accent}50, transparent)` }} />
          </div>
        </div>

        {/* ── Solutions Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {theme.solutions.map((sol, i) => (
            <div key={i}
              className="section-fade group rounded-2xl p-6 lg:p-7 transition-all duration-300 hover:scale-[1.025]"
              style={{
                transitionDelay: `${0.2 + i * 0.07}s`,
                background: 'rgba(8,22,54,0.55)',
                border: `1px solid ${theme.accentBorder}`,
                backdropFilter: 'blur(12px)',
              }}>
              {/* Icon */}
              <div className="text-3xl mb-4">{sol.icon}</div>
              {/* Title */}
              <h4 className="font-heading font-700 text-base lg:text-lg text-white mb-3 leading-snug">
                {sol.title}
              </h4>
              {/* Description */}
              <p className="font-body text-sm lg:text-[15px] text-blue-300 leading-relaxed">
                {sol.desc}
              </p>
              {/* Accent underline grows on hover */}
              <div className="mt-5 h-0.5 rounded-full transition-all duration-400 group-hover:w-12 w-5"
                style={{ background: theme.accent }} />
            </div>
          ))}
        </div>

        {/* ── Track CTA strip ── */}
        <div className="section-fade" style={{ transitionDelay: '0.55s' }}>
          <div className="rounded-2xl px-7 py-6 lg:px-10 lg:py-7 flex flex-col sm:flex-row items-start sm:items-center gap-5"
            style={{ background: theme.accentDim, border: `1px solid ${theme.accentBorder}` }}>
            <div className="flex-1">
              <p className="font-heading font-700 text-white text-base lg:text-lg">
                Interested in building in the{' '}
                <span style={{ color: theme.accent }}>{theme.title}</span> track?
              </p>
              <p className="font-body text-blue-400 text-sm mt-1">
                Applications open June 6, 2026. Register now to get notified first.
              </p>
            </div>
            <a href="#register"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-700 text-sm tracking-wider uppercase text-white transition-all duration-300 hover:scale-105"
              style={{ background: theme.accent }}>
              Apply for This Track
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── ThemesPage ─────────────────────────────────────────────────────────────
export default function ThemesPage() {
  const heroRef = useRef()

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    heroRef.current?.querySelectorAll('.section-fade').forEach(el => obs.observe(el))
    return () => obs.disconnect()

    // Scroll to top on mount
  }, [])

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen" style={{ background: '#020B1E' }}>
      <Navbar />

      {/* ── Page Hero ── */}
      <div ref={heroRef} className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 overflow-hidden grid-bg"
        style={{ background: '#020B1E' }}>
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(26,107,255,0.10) 0%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-10">

          {/* Breadcrumb */}
          <div className="section-fade flex items-center gap-2 mb-8 font-mono text-xs tracking-widest text-blue-500 uppercase">
            <a href="/" className="hover:text-brand-accent transition-colors">Home</a>
            <span>/</span>
            <span className="text-brand-accent">Themes & Sub-Themes</span>
          </div>

          {/* Headline */}
          <div className="section-fade max-w-4xl mb-10" style={{ transitionDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-brand-green" />
              <span className="font-mono text-xs tracking-[0.2em] text-brand-green uppercase">Innovation Tracks · FoCLIS Hackathon 2026</span>
            </div>
            <h1 className="font-heading font-800 text-5xl sm:text-6xl lg:text-7xl text-white leading-none mb-6">
              The Hackathon<br />
              <span className="text-brand-green">Theme &</span>{' '}
              <span className="text-brand-accent">Sub-Themes</span>
            </h1>
            <p className="font-body text-blue-200 text-lg lg:text-xl leading-relaxed max-w-3xl">
              The FoCLIS Hackathon 2026 is built around one central theme and four focused sub-themes, each addressing a critical national priority aligned with Uganda's Fourth National Development Plan (NDP IV). Every participant chooses one sub-theme track and develops a digital solution that creates measurable, real-world impact.
            </p>
          </div>

          {/* ── MAIN THEME CARD ── */}
          <div className="section-fade" style={{ transitionDelay: '0.2s' }}>
            <div className="rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(13,48,128,0.5) 0%, rgba(10,31,68,0.6) 100%)',
                border: '1px solid rgba(26,107,255,0.3)',
                backdropFilter: 'blur(16px)',
              }}>

              {/* Top bar */}
              <div className="px-8 py-4 lg:px-12 flex items-center gap-3"
                style={{ background: 'rgba(26,107,255,0.12)', borderBottom: '1px solid rgba(26,107,255,0.2)' }}>
                <div className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse" />
                <span className="font-mono text-xs tracking-[0.2em] text-brand-accent uppercase">
                  Overall Hackathon Theme
                </span>
              </div>

              <div className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                  <div>
                    <h2 className="font-heading font-800 text-3xl lg:text-4xl text-white leading-snug mb-5">
                      Innovating for a{' '}
                      <span className="text-brand-green">Resilient Uganda:</span>{' '}
                      Advancing Climate-Smart Agriculture, Inclusive Health and Education, and Economic Empowerment
                    </h2>
                    <p className="font-body text-blue-200 text-base leading-relaxed">
                      This overarching theme reflects Uganda's most pressing development priorities. It calls on student innovators to go beyond the classroom and build technology-driven solutions that can directly improve lives, strengthen communities, and accelerate national transformation.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="font-body text-blue-200 text-base leading-relaxed">
                      The theme is grounded in Uganda's NDP IV, which places strong emphasis on science, technology, innovation, and digital transformation as core drivers of socio-economic growth. It challenges participants to think nationally — to identify real problems, develop practical digital prototypes, and demonstrate the kind of impact that can be scaled, incubated, and implemented.
                    </p>
                    <p className="font-body text-blue-300 text-base leading-relaxed">
                      Beneath this theme sit four sub-themes that define the specific innovation tracks available to participants. Each sub-theme is carefully chosen to reflect sectors where digital innovation can have the greatest and most immediate impact on Ugandan communities.
                    </p>
                  </div>
                </div>

                {/* 4 sub-theme pills */}
                <div className="mt-10 flex flex-wrap gap-3">
                  {subThemes.map(t => (
                    <a key={t.id} href={`#subtheme-${t.id}`}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-600 text-sm transition-all duration-200 hover:scale-105"
                      style={{ background: t.accentDim, border: `1px solid ${t.accentBorder}`, color: t.accent }}>
                      <span>{t.emoji}</span>
                      <span>{t.title}</span>
                      <ArrowRight size={13} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sub-theme sections ── */}
      {subThemes.map((theme, i) => (
        <SubThemeSection key={theme.id} theme={theme} index={i} />
      ))}

      {/* ── Closing CTA ── */}
      <div className="relative py-28 overflow-hidden" style={{ background: '#020B1E' }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: 'rgba(26,107,255,0.08)' }} />

        <div className="relative max-w-3xl mx-auto px-5 lg:px-10 text-center">
          <div className="font-mono text-xs tracking-widest text-brand-accent uppercase mb-5">Ready to Build?</div>
          <h3 className="font-heading font-800 text-4xl lg:text-5xl xl:text-6xl text-white leading-none mb-6">
            Your Idea Could Be the<br />
            <span className="text-brand-green">Solution Uganda Needs</span>
          </h3>
          <p className="font-body text-blue-300 text-base lg:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Applications open on June 6, 2026. Choose your track, form your team, and build something that matters. The best solutions will be showcased, recognized, awarded, and potentially supported for real-world deployment and incubation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/#register"
              className="px-10 py-4 rounded-xl bg-brand-accent text-white font-heading font-700 text-base tracking-wider uppercase hover:shadow-[0_0_40px_rgba(26,107,255,0.55)] hover:scale-105 transition-all duration-300">
              Register Now →
            </a>
            <a href="/#timeline"
              className="px-10 py-4 rounded-xl glass text-white font-heading font-700 text-base tracking-wider uppercase hover:bg-white/10 transition-all duration-300">
              View Timeline
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}