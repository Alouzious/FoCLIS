import { useEffect, useRef, useState } from 'react'
import { User, Users, Mail, Phone, MessageSquare, ChevronDown, CheckCircle, Send } from 'lucide-react'

const tracks = [
  'Climate-Smart AgriTech',
  'Inclusive Digital Health',
  'Future Learning: EdTech',
  'Digital Economic Empowerment',
]

export default function Register() {
  const ref = useRef()
  const [tab, setTab] = useState('attendee') // 'attendee' | 'partner' | 'inquiry'
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', org: '', track: '', message: '' })

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.section-fade').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    // Frontend-ready: wire to backend API endpoint here
    setSubmitted(true)
  }

  return (
    <section id="register" ref={ref} className="relative py-28 lg:py-36 overflow-hidden" style={{ background: '#040E22' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />
      <div className="absolute left-1/4 bottom-0 w-[500px] h-[500px] rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 lg:px-10">
        <div className="section-fade flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-brand-accent" />
          <span className="font-mono text-xs tracking-[0.2em] text-brand-accent uppercase">Join the Movement</span>
        </div>
        <div className="section-fade mb-12" style={{ transitionDelay: '0.1s' }}>
          <h2 className="font-heading font-800 text-5xl lg:text-6xl text-white leading-none">
            Register / <span className="text-brand-accent">Inquire</span>
          </h2>
          <p className="font-body text-blue-300 text-base mt-3 max-w-xl">
            Whether you're a student, a potential partner, or just curious — reach out and we'll get back to you.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="section-fade flex gap-2 mb-8 flex-wrap" style={{ transitionDelay: '0.2s' }}>
          {[
            { id: 'attendee', label: '🎓 Register as Participant', icon: User },
            { id: 'partner', label: '🤝 Register as Hack Partner', icon: Users },
            { id: 'inquiry', label: '💬 Send an Inquiry', icon: MessageSquare },
          ].map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setSubmitted(false) }}
              className={`px-5 py-2.5 rounded-xl font-heading font-700 text-sm tracking-wider transition-all duration-300 ${tab === t.id
                ? 'bg-brand-accent text-white shadow-[0_0_20px_rgba(26,107,255,0.4)]'
                : 'glass text-blue-300 hover:text-white hover:bg-white/5'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Form card */}
        <div className="section-fade" style={{ transitionDelay: '0.3s' }}>
          <div className="glass rounded-2xl p-8 lg:p-12">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle size={56} className="text-brand-green mb-6" />
                <h3 className="font-heading font-800 text-3xl text-white mb-3">You're In! 🎉</h3>
                <p className="font-body text-blue-300 text-base max-w-sm">
                  {tab === 'attendee' && 'Your registration has been received. We\'ll send confirmation details to your email soon.'}
                  {tab === 'partner' && 'Thanks for your interest in partnering! Our team will reach out within 48 hours.'}
                  {tab === 'inquiry' && 'Your message has been sent. We\'ll get back to you as soon as possible.'}
                </p>
                <button onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-3 rounded-xl glass text-blue-300 font-heading font-600 text-sm hover:text-white transition-colors">
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-xs tracking-widest text-blue-400 uppercase block mb-2">
                      Full Name *
                    </label>
                    <input name="name" required value={form.name} onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl glass text-white placeholder-blue-600 font-body text-sm focus:outline-none focus:border-brand-accent/60 transition-colors" />
                  </div>
                  <div>
                    <label className="font-mono text-xs tracking-widest text-blue-400 uppercase block mb-2">
                      Email Address *
                    </label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl glass text-white placeholder-blue-600 font-body text-sm focus:outline-none focus:border-brand-accent/60 transition-colors" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-xs tracking-widest text-blue-400 uppercase block mb-2">
                      Phone / WhatsApp
                    </label>
                    <input name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+256 700 000 000"
                      className="w-full px-4 py-3 rounded-xl glass text-white placeholder-blue-600 font-body text-sm focus:outline-none focus:border-brand-accent/60 transition-colors" />
                  </div>
                  <div>
                    <label className="font-mono text-xs tracking-widest text-blue-400 uppercase block mb-2">
                      {tab === 'partner' ? 'Organisation / Company *' : 'University / Institution'}
                    </label>
                    <input name="org" value={form.org} onChange={handleChange}
                      placeholder={tab === 'partner' ? 'Your organisation name' : 'Kabale University'}
                      className="w-full px-4 py-3 rounded-xl glass text-white placeholder-blue-600 font-body text-sm focus:outline-none focus:border-brand-accent/60 transition-colors" />
                  </div>
                </div>

                {tab === 'attendee' && (
                  <div>
                    <label className="font-mono text-xs tracking-widest text-blue-400 uppercase block mb-2">
                      Preferred Track *
                    </label>
                    <div className="relative">
                      <select name="track" required value={form.track} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl glass text-white font-body text-sm appearance-none focus:outline-none cursor-pointer"
                        style={{ background: 'rgba(10,31,68,0.4)' }}>
                        <option value="" disabled className="bg-[#020B1E]">Select a sub-theme track…</option>
                        {tracks.map(t => <option key={t} value={t} className="bg-[#020B1E]">{t}</option>)}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="font-mono text-xs tracking-widest text-blue-400 uppercase block mb-2">
                    {tab === 'inquiry' ? 'Your Message *' : 'Brief Project Idea / Note'}
                  </label>
                  <textarea name="message" rows={4} value={form.message} onChange={handleChange}
                    placeholder={
                      tab === 'attendee' ? 'Briefly describe your project idea or what you hope to build…'
                      : tab === 'partner' ? 'Tell us about your organisation and how you\'d like to partner…'
                      : 'What would you like to know?'
                    }
                    className="w-full px-4 py-3 rounded-xl glass text-white placeholder-blue-600 font-body text-sm resize-none focus:outline-none focus:border-brand-accent/60 transition-colors" />
                </div>

                <div className="pt-2">
                  <button type="submit"
                    className="group w-full sm:w-auto px-10 py-4 rounded-xl bg-brand-accent text-white font-heading font-700 text-base tracking-wider uppercase hover:shadow-[0_0_40px_rgba(26,107,255,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                    <Send size={18} />
                    {tab === 'attendee' && 'Submit Registration'}
                    {tab === 'partner' && 'Register as Partner'}
                    {tab === 'inquiry' && 'Send Inquiry'}
                  </button>
                  <p className="mt-3 font-mono text-[10px] text-blue-500 tracking-widest">
                    * Applications open: 6 June 2026. Submitting now adds you to early notification list.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Direct contact */}
        <div className="section-fade mt-10 grid sm:grid-cols-2 gap-4" style={{ transitionDelay: '0.5s' }}>
          <div className="glass rounded-xl p-5 flex items-center gap-4">
            <Mail size={20} className="text-brand-accent flex-shrink-0" />
            <div>
              <div className="font-mono text-[10px] text-blue-400 tracking-widest uppercase mb-0.5">Email Us</div>
              <a href="mailto:hackathon@foclis.ac.ug" className="font-heading font-600 text-sm text-white hover:text-brand-accent transition-colors">
                hackathon@foclis.ac.ug
              </a>
            </div>
          </div>
          <div className="glass rounded-xl p-5 flex items-center gap-4">
            <Phone size={20} className="text-brand-green flex-shrink-0" />
            <div>
              <div className="font-mono text-[10px] text-blue-400 tracking-widest uppercase mb-0.5">WhatsApp / Call</div>
              <span className="font-heading font-600 text-sm text-white">+256 700 000 000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}