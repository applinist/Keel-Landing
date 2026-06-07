import { useState, useEffect } from 'react'
import type { Mode } from './types'
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
import KitDetailPage from './pages/KitDetailPage'

type Route =
  | { page: 'home' }
  | { page: 'kits' }
  | { page: 'kit-detail'; slug: string }

function getRoute(): Route {
  const hash = window.location.hash.slice(1) // strip leading #
  if (hash.startsWith('kits/')) return { page: 'kit-detail', slug: hash.slice(5) }
  if (hash === 'kits') return { page: 'kits' }
  return { page: 'home' }
}

export default function App() {
  const [route, setRoute] = useState<Route>(getRoute)
  const [mode, setMode] = useState<Mode>(
    () => (localStorage.getItem('keel-mode') as Mode) ?? 'dark'
  )

  const toggleMode = () => {
    setMode(prev => {
      const next: Mode = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('keel-mode', next)
      return next
    })
  }

  useEffect(() => {
    const handler = () => {
      setRoute(getRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  if (route.page === 'kits') return <KitsPage mode={mode} onToggleMode={toggleMode} />
  if (route.page === 'kit-detail') return <KitDetailPage slug={route.slug} mode={mode} onToggleMode={toggleMode} />

  return (
    <div className="keel" data-mode={mode}>
      <Nav mode={mode} onToggleMode={toggleMode} />
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
