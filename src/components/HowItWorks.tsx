import { useEffect, useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function HowItWorks() {
  const reduced = useReducedMotion()
  const distRef = useRef<HTMLDivElement>(null)
  const hasPlayedRef = useRef<boolean>(false)
  const [showReplay, setShowReplay] = useState(false)

  function play() {
    const el = distRef.current
    if (!el) return
    el.classList.remove('is-playing')
    void el.offsetWidth // force reflow to restart CSS animation
    el.classList.add('is-playing')
    setShowReplay(true)
  }

  useEffect(() => {
    if (reduced || !distRef.current) return
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(en => {
          if (en.isIntersecting && !hasPlayedRef.current) {
            hasPlayedRef.current = true
            play()
            io.disconnect()
          }
        })
      },
      { threshold: 0.35 }
    )
    io.observe(distRef.current)
    return () => io.disconnect()
  }, [reduced])

  return (
    <section className="how" id="how">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">How it works</div>
            <h2 className="sec-title">Pick. Configure. Launch.</h2>
          </div>
          <p className="sec-lede">
            The metaphor isn't speed — it's distance. The old way was a long way to a starting
            line. This is most of it, already behind you.
          </p>
        </div>

        <div className="dist" id="dist" ref={distRef} data-static={reduced ? 'true' : undefined}>
          <div className="dist__col dist__old">
            <div className="dist__head">
              <span className="eyebrow">The old way to launch a software company</span>
            </div>
            <ol className="oldway">
              {[
                'Hire a team',
                'Raise the money',
                'Build the product',
                'Wire up billing',
                'Write the legal docs',
                "Set up email that doesn't land in spam",
                'Build the back-office',
                'Deploy the infrastructure',
              ].map((item, idx) => (
                <li key={idx} className="ow">
                  <span className="ow__n mono">{String(idx + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
              <li className="ow ow--cont">
                <span className="ow__n mono">09</span>…and keep going
              </li>
            </ol>
            <div className="dist__measure dist__measure--long">
              <span className="dist__bracket" />
              <span className="dist__measure-lbl mono">≈ a year · before a single customer</span>
            </div>
          </div>

          <div className="dist__gap" aria-hidden="true">
            <span className="dist__gap-line" />
            <span className="dist__gap-lbl mono">
              that's<br />the whole<br />distance
            </span>
          </div>

          <div className="dist__col dist__new">
            <div className="dist__head">
              <span className="eyebrow">With Keel</span>
              {showReplay && (
                <button className="btn btn--ghost btn--sm dist__replay" onClick={play}>
                  <RotateCcw size={14} strokeWidth={1.5} /> Replay
                </button>
              )}
            </div>
            <ol className="steps3">
              <li className="st3">
                <span className="st3__node mono">1</span>
                <div className="st3__body">
                  <h3 className="st3__label">Pick</h3>
                  <p className="st3__desc">Browse, choose your Kit, and watch it run in the sandbox.</p>
                </div>
              </li>
              <li className="st3">
                <span className="st3__node mono">2</span>
                <div className="st3__body">
                  <h3 className="st3__label">Configure</h3>
                  <p className="st3__desc">
                    Make it yours — name, brand, colors, copy, structure. The guided configurator
                    does it with you, in plain conversation. No code. No developer.
                  </p>
                  <div className="tiers">
                    <span className="tiers__lbl mono">How far you take it</span>
                    <ul className="tiers__list">
                      <li>
                        <span className="tiers__name">Self-service configurator</span>
                        <span className="tiers__depth">Most people. Chat-guided, no code.</span>
                      </li>
                      <li>
                        <span className="tiers__name">Managed service</span>
                        <span className="tiers__depth">Hands-on help for deeper customization.</span>
                      </li>
                      <li>
                        <span className="tiers__name">Source license</span>
                        <span className="tiers__depth">Full ownership and control.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="st3">
                <span className="st3__node mono">3</span>
                <div className="st3__body">
                  <h3 className="st3__label">Launch</h3>
                  <p className="st3__desc">
                    One click to production. It goes live. The agents start working.
                  </p>
                </div>
              </li>
            </ol>
            <div className="dist__measure dist__measure--short">
              <span className="dist__bracket" />
              <span className="dist__measure-lbl mono">an afternoon</span>
            </div>
          </div>
        </div>

        <p className="how__handoff">
          And now you do the part only you can do — find the customers, win the market, build the
          thing that's yours. <strong>We compressed the setup, not the business.</strong>
        </p>
      </div>
      <hr className="waterline" />
    </section>
  )
}
