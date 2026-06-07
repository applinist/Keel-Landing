import { useState } from 'react'
import { Plus, Check } from 'lucide-react'
import KitsNav from '../components/KitsNav'
import type { Mode } from '../types'

/* ── Types (mirrors published-kit.ts concepts) ────────────────────────────── */

type KitStatus = 'available' | 'in_development' | 'coming_soon'

type PainFix = { pain: string; fix: string }
type Tier    = { name: string; price: string; features: string[] }
type Faq     = { question: string; answer: string }

type KitDetailData = {
  slug: string
  name: string
  category: string
  status: KitStatus
  tagline: string
  positioning: string
  summary: string
  incumbents: string[]
  legacyPains: string[]
  capabilities: string[]
  painFixes: PainFix[]
  sandboxScenario?: string
  valueNarrative: string
  tiers: Tier[]
  audience: { archetype: string; broadening: string }
  faqs?: Faq[]
}

/* ── CTA resolution ───────────────────────────────────────────────────────── */

function resolveCtaLabel(status: KitStatus): string {
  switch (status) {
    case 'available':      return 'Configure & launch'
    case 'in_development': return 'Join the waitlist'
    case 'coming_soon':    return 'Notify me when it\'s ready'
  }
}

const STATUS_PILL: Record<KitStatus, string> = {
  available:      'pill--success',
  in_development: 'pill--warn',
  coming_soon:    'pill--neutral',
}

const STATUS_LABEL: Record<KitStatus, string> = {
  available:      'Available',
  in_development: 'In development',
  coming_soon:    'Coming soon',
}

/* ── Standard modules (same as kit-detail-template.ts constants) ──────────── */

const STANDARD_ANATOMY = [
  'The product',
  'A brand and a storefront',
  'A way to get paid',
  'Customer communication, run by agents',
  'The standing of a real company',
  'A cockpit to run it',
  'Live in one click — and staying live',
]

const STANDARD_FAQS: Faq[] = [
  {
    question: "Won't everyone get the same company I do?",
    answer:
      "The Kit is the foundation, not the difference. Your edge comes from your market knowledge, positioning, and how far you take the build — not the plumbing everyone needs anyway.",
  },
  {
    question: "Is this just AI slop?",
    answer:
      "AI alone would produce slop — which is why every Kit is built by an experienced hand and must pass the audit before it's listed. AI makes it affordable; expertise and verification make it real.",
  },
  {
    question: "Can I really run this without being technical?",
    answer:
      "Configuration happens in conversation, and the agents run support and operations by default. You operate the business; you don't engineer it.",
  },
]

/* ── Mock detail data ─────────────────────────────────────────────────────── */

const MOCK_DETAILS: Record<string, KitDetailData> = {
  'customer-onboarding': {
    slug: 'customer-onboarding',
    name: 'Customer Onboarding',
    category: 'Onboarding',
    status: 'available',
    tagline: 'Turn new signups into active, confident users — without a CS team.',
    positioning: 'The complete post-sale system for SaaS companies that can\'t yet justify a dedicated CS hire.',
    summary:
      'Most onboarding is just documentation no one reads and check-ins no one books. This Kit replaces all of it with an agent-run journey that adapts to each customer\'s pace, flags risk early, and hands off to a human only when it matters.',
    incumbents: ['Gainsight', 'Totango', 'ChurnZero'],
    legacyPains: [
      'Onboarding managers spend 80% of their time on scheduling and status updates',
      'Most customers never reach their first value milestone before churning',
      'Health scores are always stale by the time you act on them',
      'Enterprise CS tools cost $60k+/year and require a dedicated admin to configure',
    ],
    capabilities: [
      'Continuous health monitoring — not just scheduled check-ins',
      'Adaptive journey that adjusts based on real engagement signals',
      'Automatic escalation to a human when risk is detected',
      'Pre-built triggers for common SaaS activation milestones',
    ],
    painFixes: [
      { pain: 'Onboarding manager bottleneck', fix: 'Agent handles all routine touchpoints automatically' },
      { pain: 'Customers ghost after purchase', fix: 'Proactive outreach triggered by inactivity signals' },
      { pain: 'Stale health scores', fix: 'Real-time monitoring across product, support, and comms' },
      { pain: '$60k/year for enterprise CS tools', fix: 'Fraction of the cost, pre-configured and audited' },
    ],
    sandboxScenario:
      'A new enterprise customer has gone quiet after the kickoff call. Watch the Kit detect low activation, draft a tailored re-engagement, and escalate to the CSM only after the third non-response.',
    valueNarrative:
      'A single retained enterprise customer covers the annual cost many times over. Most customers see payback within the first 30 days.',
    tiers: [
      {
        name: 'Starter',
        price: '$299 / mo',
        features: [
          'Up to 100 active customers',
          '1 onboarding agent',
          'Standard 90-day journey',
          'Email + Slack alerts',
        ],
      },
      {
        name: 'Growth',
        price: '$799 / mo',
        features: [
          'Up to 500 active customers',
          '3 agents',
          'Custom journey builder',
          'CRM sync (HubSpot, Salesforce)',
          'Priority support',
        ],
      },
      {
        name: 'Scale',
        price: 'Custom',
        features: [
          'Unlimited customers',
          'All agents + custom agents',
          'White-label',
          'SSO & audit log',
          'Dedicated onboarding',
        ],
      },
    ],
    audience: {
      archetype:
        'A B2B SaaS founder or Head of CS managing 50–500 customers with a team of 1–3, where every churn event is felt.',
      broadening:
        'Also a strong fit for agencies and managed service providers who need to run structured onboarding across multiple clients simultaneously.',
    },
    faqs: [
      {
        question: 'How long does setup take?',
        answer:
          'Most customers are live within 2 days. Configuration happens in conversation — you describe your customer journey and success milestones, the Kit handles the rest.',
      },
      {
        question: 'What if my onboarding journey is unique?',
        answer:
          'The Kit is a foundation, not a straitjacket. Every stage, trigger, and message is configurable. The agents learn your playbook.',
      },
    ],
  },
}

function getFallbackDetail(slug: string): KitDetailData {
  // Return a placeholder for kits without full mock data yet
  return {
    slug,
    name: slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
    category: 'Kit',
    status: 'available',
    tagline: 'Full detail coming soon.',
    positioning: '',
    summary: 'This kit detail page is being prepared.',
    incumbents: [],
    legacyPains: [],
    capabilities: [],
    painFixes: [],
    valueNarrative: '',
    tiers: [],
    audience: { archetype: '', broadening: '' },
  }
}

/* ── Section components ───────────────────────────────────────────────────── */

function KitHeader({ kit }: { kit: KitDetailData }) {
  const ctaLabel = resolveCtaLabel(kit.status)
  const collectsIntake = kit.status !== 'available'

  return (
    <section className="kd-header">
      <div className="kd-header__in">
        <div className="kd-header__body">
          <div className="kd-header__meta">
            <span className="tag">{kit.category}</span>
            <span className={`pill ${STATUS_PILL[kit.status]}`}>{STATUS_LABEL[kit.status]}</span>
          </div>
          <h1 className="kd-header__name">{kit.name}</h1>
          <p className="kd-header__tagline">{kit.tagline}</p>
          {kit.positioning && (
            <p className="kd-header__positioning">{kit.positioning}</p>
          )}
          <p className="kd-header__summary">{kit.summary}</p>
        </div>

        <aside className="kd-header__cta-card card">
          <p className="kd-cta-card__label eyebrow">Ready to launch</p>
          <p className="kd-cta-card__hint">
            {collectsIntake
              ? 'Leave your details and we\'ll be in touch when it\'s ready.'
              : 'Configure your kit in a conversation. Live in days.'}
          </p>
          <button className="btn btn--primary btn--lg" style={{ width: '100%' }}>
            {ctaLabel}
          </button>
          {kit.sandboxScenario && (
            <button className="btn btn--ghost btn--sm kd-cta-card__sandbox">
              Watch it run
            </button>
          )}
          <ul className="kd-cta-card__bullets">
            <li><Check size={13} /> No engineers needed</li>
            <li><Check size={13} /> Live in 2 days</li>
            <li><Check size={13} /> You own every line</li>
          </ul>
        </aside>
      </div>
    </section>
  )
}

function LegacyCostSection({ incumbents, pains }: { incumbents: string[]; pains: string[] }) {
  if (!pains.length) return null
  return (
    <section className="kd-section kd-legacy">
      <div className="kd-section__in">
        <div className="kd-section__label">
          <span className="eyebrow">The old way</span>
        </div>
        <div className="kd-legacy__body">
          {incumbents.length > 0 && (
            <div className="kd-legacy__incumbents">
              <p className="kd-legacy__sub">What this replaces</p>
              <div className="kd-legacy__chips">
                {incumbents.map((inc) => (
                  <span key={inc} className="chip">{inc}</span>
                ))}
              </div>
            </div>
          )}
          <ul className="kd-legacy__pains">
            {pains.map((pain, i) => (
              <li key={i} className="kd-legacy__pain">
                <span className="kd-legacy__n">{String(i + 1).padStart(2, '0')}</span>
                <span>{pain}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function AiNativeSection({ capabilities, pairs }: { capabilities: string[]; pairs: PainFix[] }) {
  if (!capabilities.length && !pairs.length) return null
  return (
    <section className="kd-section kd-ainative">
      <div className="kd-section__in">
        <div className="kd-section__label">
          <span className="eyebrow">The AI-native difference</span>
        </div>
        <div className="kd-ainative__grid">
          {capabilities.length > 0 && (
            <div className="kd-ainative__caps">
              <h2 className="kd-ainative__heading">What changes</h2>
              <ul className="kd-ainative__list">
                {capabilities.map((cap, i) => (
                  <li key={i} className="kd-ainative__cap">
                    <span className="kd-ainative__dot" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {pairs.length > 0 && (
            <div className="kd-ainative__pairs">
              <h2 className="kd-ainative__heading">Before → after</h2>
              <ul className="kd-painfixes">
                {pairs.map((p, i) => (
                  <li key={i} className="kd-painfix">
                    <span className="kd-painfix__pain">{p.pain}</span>
                    <span className="kd-painfix__arrow">→</span>
                    <span className="kd-painfix__fix">{p.fix}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function WholeCompanySection() {
  return (
    <section className="kd-section kd-anatomy">
      <div className="kd-section__in">
        <div className="kd-section__label">
          <span className="eyebrow">What ships with every Kit</span>
        </div>
        <h2 className="kd-anatomy__heading">Seven things. One launch.</h2>
        <ul className="kd-anatomy__list">
          {STANDARD_ANATOMY.map((item, i) => (
            <li key={i} className="kd-anatomy__item">
              <span className="kd-anatomy__n data">{String(i + 1).padStart(2, '0')}</span>
              <span className="kd-anatomy__label">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ProofSection({ sandboxScenario }: { sandboxScenario?: string }) {
  return (
    <section className="kd-section kd-proof">
      <div className="kd-section__in">
        <div className="kd-section__label">
          <span className="eyebrow">Proof</span>
        </div>
        <div className="kd-proof__grid">
          {sandboxScenario && (
            <div className="kd-proof__sandbox card">
              <p className="kd-proof__sandbox-label eyebrow">Live sandbox</p>
              <p className="kd-proof__scenario">{sandboxScenario}</p>
              <button className="btn btn--ghost btn--sm">Watch it run</button>
            </div>
          )}
          <div className="kd-proof__audit card">
            <p className="kd-proof__audit-label eyebrow">Programmatic Trust Protocol</p>
            <p className="kd-proof__audit-must">Must pass to list</p>
            <ul className="kd-proof__dims">
              {['Security', 'Responsiveness & accessibility', 'AI-runtime reliability'].map((d) => (
                <li key={d} className="kd-proof__dim">
                  <Check size={13} className="kd-proof__check" />
                  {d}
                </li>
              ))}
            </ul>
            <a href="#" className="kd-proof__inspect">Inspect the criteria →</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ValueAnchorSection({ narrative, tiers }: { narrative: string; tiers: Tier[] }) {
  if (!tiers.length) return null
  return (
    <section className="kd-section kd-value">
      <div className="kd-section__in">
        <div className="kd-section__label">
          <span className="eyebrow">Pricing</span>
        </div>
        {narrative && <p className="kd-value__narrative">{narrative}</p>}
        <div className="kd-tiers">
          {tiers.map((tier, i) => (
            <div key={i} className={`kd-tier card${i === 1 ? ' kd-tier--highlight' : ''}`}>
              <p className="kd-tier__name">{tier.name}</p>
              <p className="kd-tier__price">{tier.price}</p>
              <ul className="kd-tier__features">
                {tier.features.map((f) => (
                  <li key={f}>
                    <Check size={12} className="kd-tier__check" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`btn btn--sm ${i === 1 ? 'btn--primary' : 'btn--ghost'}`} style={{ width: '100%', marginTop: 'auto' }}>
                {resolveCtaLabel('available')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhoItsForSection({ archetype, broadening }: { archetype: string; broadening: string }) {
  if (!archetype) return null
  return (
    <section className="kd-section kd-who">
      <div className="kd-section__in">
        <div className="kd-section__label">
          <span className="eyebrow">Who it's for</span>
        </div>
        <div className="kd-who__grid">
          <div>
            <h2 className="kd-who__heading">The primary fit</h2>
            <p className="kd-who__text">{archetype}</p>
          </div>
          {broadening && (
            <div>
              <h2 className="kd-who__heading">Also a fit if…</h2>
              <p className="kd-who__text">{broadening}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function FaqSection({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null)
  if (!items.length) return null
  return (
    <section className="kd-section kd-faq">
      <div className="kd-section__in">
        <div className="kd-section__label">
          <span className="eyebrow">Before you decide</span>
        </div>
        <div className="kd-faq__list">
          {items.map((faq, i) => (
            <div key={i} className="accordion__item" data-open={open === i ? 'true' : undefined}>
              <button
                className="accordion__head"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {faq.question}
                <Plus size={16} className="accordion__icon" />
              </button>
              <p className="accordion__body">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCtaSection({ kit }: { kit: KitDetailData }) {
  const collectsIntake = kit.status !== 'available'
  return (
    <section className="kd-section kd-final-cta">
      <div className="kd-section__in">
        <div className="kd-final-cta__in">
          <div>
            <h2 className="kd-final-cta__heading">
              {collectsIntake ? 'Get early access' : 'Ready to launch?'}
            </h2>
            <p className="kd-final-cta__sub">
              {collectsIntake
                ? `Join the list for ${kit.name}. You'll hear from us first.`
                : `${kit.name} is ready to configure. You'll be live in days.`}
            </p>
          </div>
          <div className="kd-final-cta__actions">
            {collectsIntake ? (
              <div className="kd-intake">
                <input className="input kd-intake__field" type="email" placeholder="your@email.com" />
                <button className="btn btn--primary">{resolveCtaLabel(kit.status)}</button>
              </div>
            ) : (
              <button className="btn btn--primary btn--lg">{resolveCtaLabel(kit.status)}</button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function KitDetailPage({ slug, mode, onToggleMode }: { slug: string; mode: Mode; onToggleMode: () => void }) {
  const kit = MOCK_DETAILS[slug] ?? getFallbackDetail(slug)
  const allFaqs = [...STANDARD_FAQS, ...(kit.faqs ?? [])]

  const goToListing = () => { window.location.hash = 'kits' }

  return (
    <div className="keel kd-page" data-mode={mode}>
      <KitsNav
        mode={mode}
        onToggleMode={onToggleMode}
        back={{ href: '#kits', label: 'All Kits', onClick: goToListing }}
        cta={{ label: resolveCtaLabel(kit.status) }}
      />

      {/* Breadcrumb */}
      <div className="kd-crumb">
        <div className="kd-crumb__in">
          <nav className="crumbs">
            <a href="#kits" onClick={(e) => { e.preventDefault(); goToListing() }}>Kits</a>
            <span className="sep">/</span>
            <span aria-current="page">{kit.name}</span>
          </nav>
        </div>
      </div>

      <KitHeader kit={kit} />
      <hr className="waterline" />
      <LegacyCostSection incumbents={kit.incumbents} pains={kit.legacyPains} />
      <AiNativeSection capabilities={kit.capabilities} pairs={kit.painFixes} />
      <WholeCompanySection />
      <hr className="waterline" />
      <ProofSection sandboxScenario={kit.sandboxScenario} />
      <ValueAnchorSection narrative={kit.valueNarrative} tiers={kit.tiers} />
      <WhoItsForSection archetype={kit.audience.archetype} broadening={kit.audience.broadening} />
      <hr className="waterline" />
      <FaqSection items={allFaqs} />
      <FinalCtaSection kit={kit} />
    </div>
  )
}
