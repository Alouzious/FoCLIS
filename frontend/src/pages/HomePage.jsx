import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Prizes from '../components/Prizes'
import Judges from '../components/Judges'
import Partners from '../components/Partners'
import FAQ from '../components/Faq'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Prizes />
        
        <Judges />
        <Partners />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}