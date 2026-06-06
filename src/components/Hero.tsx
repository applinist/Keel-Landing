import { useEffect, useState } from 'react'
import { ArrowRight, Play, ArrowDown } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface TeaseItem {
  esc: boolean
  text: string
}

const TEASE_ITEMS: TeaseItem[] = [
  { esc: false, text: 'Scanning usage, tickets, logins' },
  { esc: false, text: 'Signal — account #2208 cooling' },
  { esc: false, text: 'Assembling context: who, why, history' },
  { esc: false, text: 'Drafting tailored re-engagement' },
  { esc: true,  text: 'Edge case — handing to the owner' },
]

export default function Hero() {
  const reduced = useReducedMotion()
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => document.body.classList.add('is-loaded'))
    )
    return () => cancelAnimationFrame(id)
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const id = setInterval(
      () => setActiveIdx(i => (i + 1) % (TEASE_ITEMS.length + 1)),
      1600
    )
    return () => clearInterval(id)
  }, [reduced])

  return (
    <header className="hero" id="top">
      <div className="wrap hero__in">
        <div className="hero__copy">
          <div className="eyebrow hero__eyebrow">AI-native software companies</div>
          <h1 className="hero__headline">
            You know where the incumbent is weak. Now you can launch the alternative.
          </h1>
          <p className="hero__sub">
            A complete, AI-native software company — product, brand, billing, support, and
            infrastructure — already built and audited. You bring the market. We've built
            everything else.
          </p>
          <div className="hero__cta">
            <button className="btn btn--primary btn--lg">
              Explore the Kits <ArrowRight size={17} strokeWidth={1.5} />
            </button>
            <a href="#proof" className="btn btn--ghost btn--lg">
              <Play size={17} strokeWidth={1.5} /> Watch one run
            </a>
          </div>
          <p className="hero__micro mono">
            What used to take a funded team a year. Yours to configure and launch.
          </p>
        </div>

        <aside className="tease" aria-label="A glimpse of an agent working — full run below">
          <div className="tease__bar">
            <span className="dot" /><span className="dot" /><span className="dot" />
            <span className="tease__t mono">retention agent · live</span>
            <span className="tease__live">
              <span className="tease__live-dot" />watching
            </span>
          </div>
          <div className="tease__body">
            <div className="tease__stat">
              <span className="tease__num data">318</span>
              <span className="tease__num-lbl mono">accounts watched, continuously</span>
            </div>
            <ul className="tease__feed" aria-hidden="true">
              {TEASE_ITEMS.map((item, idx) => {
                const cls = reduced
                  ? ''
                  : activeIdx === idx ? 'is-active'
                  : idx > activeIdx ? 'is-dim'
                  : ''
                return (
                  <li key={idx} className={cls}>
                    <span className={`tease__tick${item.esc ? ' tease__tick--esc' : ''}`} />
                    {item.text}
                  </li>
                )
              })}
            </ul>
            <a href="#proof" className="tease__more mono">
              Watch the full run <ArrowDown size={13} strokeWidth={1.5} />
            </a>
          </div>
        </aside>
      </div>
      <hr className="waterline hero__water" />
    </header>
  )
}
