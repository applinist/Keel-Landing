import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Anatomy from './components/Anatomy'
import AiNative from './components/AiNative'
import Proof from './components/Proof'
import Personas from './components/Personas'
import HowItWorks from './components/HowItWorks'
import Objections from './components/Objections'
import Vision from './components/Vision'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import AnnotationBoard from './components/AnnotationBoard'
import KitsPage from './pages/KitsPage'

function getPage() {
  return window.location.hash === '#kits' ? 'kits' : 'home'
}

export default function App() {
  const [page, setPage] = useState(getPage)

  useEffect(() => {
    const handler = () => setPage(getPage())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  if (page === 'kits') return <KitsPage />

  return (
    <div className="keel">
      <Nav />
      <Hero />
      <Anatomy />
      <AiNative />
      <Proof />
      <Personas />
      <HowItWorks />
      <Objections />
      <Vision />
      <FinalCta />
      <Footer />
      <AnnotationBoard />
    </div>
  )
}
