import { useState } from 'react'

interface FaqItem {
  q: string
  a: string
  gated: boolean
}

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const FAQ: FaqItem[] = [
  {
    q: "Won't everyone get the same company I do?",
    a: "The Kit is the foundation, not the difference. Two restaurants can buy the same oven; the food is still theirs. Your edge was never going to come from the plumbing — it comes from your market knowledge, your positioning, your customers, your brand, and how far you take the build. The Kit hands everyone the table stakes and frees you to compete on what actually sets you apart.",
    gated: false,
  },
  {
    q: 'Is this just AI slop?',
    a: "AI on its own would produce slop — which is exactly why every Kit is built by an experienced hand and must pass an automated architecture audit before it's listed. AI makes it affordable; expertise and verification make it real.",
    gated: false,
  },
  {
    q: 'Do I own it, or am I locked in?',
    a: "We're still setting the ownership and source-license terms, and we won't print a promise before it's real. When it's settled it'll be stated here in plain language — including what you can take with you. Ask us where it stands today.",
    gated: true,
  },
  {
    q: 'After I buy, am I on my own?',
    a: "The post-purchase support and updates model isn't finalized yet, and we won't commit to support that doesn't exist. We'd rather leave this honest than overstate it. Ask us what's available now.",
    gated: true,
  },
  {
    q: 'How established are you — who else uses this?',
    a: "We're early, and that's the point — getting in while the window is open and the incumbents are still slow. The trust here doesn't come from logos we'd be inventing; it comes from the audit, the track record, and the Kit you can watch run for yourself before you pay.",
    gated: false,
  },
  {
    q: 'Can I really run this without being technical?',
    a: "Configuration happens in conversation, and the agents run support and operations by default. You operate the business. You don't engineer it.",
    gated: false,
  },
]

export default function Objections() {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]))

  function toggle(idx: number) {
    setOpenSet(prev => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }

  return (
    <section className="objections" id="objections">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">Before you decide</div>
            <h2 className="sec-title">Before you decide.</h2>
          </div>
        </div>

        <div className="obj__grid">
          <aside className="spine">
            <div className="eyebrow">Who's behind this</div>
            <p className="spine__lede">
              The whole idea rests on one premise — that AI still needs an experienced hand to
              produce something real. So here's the hand.
            </p>
            <ul className="spine__points">
              <li>
                <span className="spine__n data">25 yrs</span>
                <p>
                  building production software end to end — across ERP, CRM, and BPM platforms,
                  including a Salesforce-like no-code workflow and screen builder.
                </p>
              </li>
              <li>
                <span className="spine__n data">10 yrs</span>
                <p>
                  of those building the no-code generation and UI tooling this platform runs on —
                  so "AI plus an experienced hand makes production-grade software" isn't a claim
                  here, it's the craft.
                </p>
              </li>
              <li>
                <span className="spine__n data">Every Kit</span>
                <p>has to pass the audit — the proof on each one.</p>
              </li>
            </ul>
          </aside>

          <div className="accordion faq" id="faq">
            {FAQ.map((item, idx) => {
              const isOpen = openSet.has(idx)
              return (
                <div
                  key={idx}
                  className={`accordion__item${item.gated ? ' accordion__item--gated' : ''}`}
                  data-open={isOpen ? 'true' : 'false'}
                >
                  <button className="accordion__head" onClick={() => toggle(idx)}>
                    {item.q}
                    {item.gated && <span className="gated-pill mono">still being settled</span>}
                    <span className="accordion__icon"><PlusIcon /></span>
                  </button>
                  {isOpen && (
                    <div className="accordion__body">{item.a}</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <hr className="waterline" />
    </section>
  )
}
