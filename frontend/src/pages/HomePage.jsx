import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import ThemesTeaser from '../components/ThemesTeaser'
import Timeline from '../components/Timeline'
import Partners from '../components/Partners'
import Team from '../components/Team'
import Register from '../components/Register'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <ThemesTeaser />
        <Timeline />
        <Partners />
        <Team />
        <Register />
      </main>
      <Footer />
    </>
  )
}