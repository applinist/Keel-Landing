import { ArrowRight, ArrowUpRight } from 'lucide-react'

export default function FinalCta() {
  return (
    <section className="final" id="final">
      <div className="wrap">
        <div className="final__in">
          <p className="final__close">
            The window is open, and the foundation is no longer the hard part. The rest is yours.
          </p>
          <h2 className="final__cta-line">Pick your company. Make it yours.</h2>
          <div className="final__cta">
            <button className="btn btn--primary btn--lg">
              Explore the Kits <ArrowRight size={17} strokeWidth={1.5} />
            </button>
            <div className="final__secondary">
              <button className="btn btn--ghost">Join a waitlist</button>
              <button className="btn btn--ghost">Request a vertical</button>
            </div>
          </div>
          <p className="final__pre mono">
            Pre-launch — the waitlist and vertical requests are how you get in early.
          </p>
        </div>

        <a className="thesis" href="#" target="_blank" rel="noopener">
          <span className="thesis__mark">
            <img src="/assets/keel-mark-mono.svg" alt="" />
          </span>
          <blockquote className="thesis__quote">
            A narrow, extraordinary window — and the people bold enough to step through it.
          </blockquote>
          <span className="thesis__cta mono">
            Read the thesis <ArrowUpRight size={14} strokeWidth={1.5} />
          </span>
        </a>
      </div>
    </section>
  )
}
