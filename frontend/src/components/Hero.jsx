import { useEffect, useRef } from 'react'
import { ArrowDown, MapPin, Calendar, Users } from 'lucide-react'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(26, 107, 255, ${p.opacity})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })
      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(26, 107, 255, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-brand-navy grid-bg">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-brand-green/5 blur-[80px] pointer-events-none" />

      {/* Edition badge */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 pt-28 lg:pt-36 pb-20 flex flex-col lg:flex-row items-center gap-16">

        <div className="flex-1 flex flex-col items-start">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="h-px w-8 bg-brand-accent" />
            <span className="font-mono text-xs tracking-[0.2em] text-brand-accent uppercase">2nd Edition · Kabale University</span>
            <div className="h-px w-8 bg-brand-accent" />
          </div>

          {/* Main Title */}
          <div className="overflow-hidden">
            <h1 className="font-display text-[72px] sm:text-[96px] lg:text-[120px] xl:text-[140px] leading-none tracking-tight text-white animate-slide-up"
              style={{ animationDelay: '0.2s' }}>
              <span className="text-glow">Fo</span><span className="text-brand-green text-glow-green">CLIS</span>
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="font-display text-[60px] sm:text-[80px] lg:text-[100px] xl:text-[118px] leading-none tracking-tight text-white animate-slide-up"
              style={{ animationDelay: '0.35s' }}>
              HACKATHON
            </h1>
          </div>
          <div className="overflow-hidden">
            <h2 className="font-display text-[56px] sm:text-[72px] lg:text-[88px] xl:text-[104px] leading-none tracking-tight text-brand-gold text-glow-gold animate-slide-up"
              style={{ animationDelay: '0.5s' }}>
              2026
            </h2>
          </div>

          {/* Theme line */}
          <div className="mt-8 max-w-xl animate-slide-up" style={{ animationDelay: '0.65s' }}>
            <div className="flex items-start gap-3">
              <div className="mt-1 w-1 h-12 bg-brand-green flex-shrink-0 rounded-full" />
              <div>
                <span className="font-heading font-600 text-sm tracking-widest text-brand-green uppercase block mb-1">Theme</span>
                <p className="font-heading font-700 text-lg lg:text-xl text-white leading-snug">
                  Innovating for a <span className="text-brand-green">Resilient Uganda:</span> Advancing Climate-Smart Agriculture, Inclusive Health and Education, and Economic Empowerment
                </p>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-10 flex flex-wrap gap-6 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            {[
              { icon: Calendar, label: 'Pitching Day', value: 'Sept 16, 2026' },
              { icon: MapPin, label: 'Location', value: 'Kabale University' },
              { icon: Users, label: 'Applications Open', value: 'June 6, 2026' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center text-brand-accent">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-blue-400 tracking-widest uppercase">{label}</div>
                  <div className="font-heading font-700 text-sm text-white">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.95s' }}>
            <a href="#register"
              className="group px-8 py-4 rounded-xl bg-brand-accent text-white font-heading font-700 text-base tracking-wider uppercase hover:shadow-[0_0_40px_rgba(26,107,255,0.7)] hover:scale-105 transition-all duration-300">
              Register Now
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a href="#about"
              className="px-8 py-4 rounded-xl glass text-white font-heading font-700 text-base tracking-wider uppercase hover:bg-white/10 transition-all duration-300">
              Learn More
            </a>
          </div>
        </div>

        {/* Right: Flyer-inspired card */}
        <div className="flex-shrink-0 w-full max-w-sm lg:max-w-xs xl:max-w-sm animate-float">
          <div className="glass rounded-2xl overflow-hidden border border-brand-accent/30 shadow-[0_0_60px_rgba(26,107,255,0.2)]">
            {/* Top bar */}
            <div className="bg-brand-accent/20 border-b border-brand-accent/20 px-6 py-4 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-brand-green animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-brand-accent uppercase">Applications Opening</span>
            </div>
            <div className="p-6 space-y-5">
              <div className="text-center">
                <div className="font-mono text-xs text-blue-400 tracking-widest mb-1">CALL FOR APPLICATIONS</div>
                <div className="font-display text-4xl text-brand-gold text-glow-gold">JUNE 6</div>
                <div className="font-heading font-600 text-brand-gold text-lg">2026</div>
              </div>
              <div className="h-px bg-brand-accent/20" />
              <div className="space-y-3">
                {[
                  { emoji: '🌿', label: 'Climate-Smart Agriculture' },
                  { emoji: '❤️', label: 'Inclusive Health' },
                  { emoji: '📚', label: 'Inclusive Education' },
                  { emoji: '📈', label: 'Economic Empowerment' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="font-body text-sm text-blue-200">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-brand-accent/20" />
              <p className="font-heading font-600 text-center text-sm text-white italic">
                "Your idea may be the <span className="text-brand-green">solution</span> Uganda is waiting for."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60">
        <span className="font-mono text-[10px] tracking-widest text-blue-400 uppercase">Scroll</span>
        <ArrowDown size={16} className="text-blue-400 animate-bounce" />
      </div>
    </section>
  )
}