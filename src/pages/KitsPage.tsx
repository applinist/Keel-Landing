import { useState } from 'react'
import { Search, Package, ArrowRight, ArrowLeft } from 'lucide-react'
import KitsNav from '../components/KitsNav'
import type { Mode } from '../types'

/* ── Types (aligned to kit-listing-template.ts) ─────────────────────────── */

type KitStatus = 'available' | 'in_development' | 'coming_soon'

type Kit = {
  id: string
  slug: string
  name: string
  tagline: string
  category: string
  status: KitStatus
  replaces?: string        // "Replaces Gainsight, Totango"
  cardBlurb?: string       // optional second line
  waitlistCount?: number   // shown on in_development cards
  featured: boolean
}

/* ── CTA resolution (mirrors kit-cta.ts) ───────────────────────────────── */

function resolveCtaLabel(status: KitStatus): string {
  switch (status) {
    case 'available':      return 'Configure & launch'
    case 'in_development': return 'Join the waitlist'
    case 'coming_soon':    return 'Notify me'
  }
}

/* ── Mock data ──────────────────────────────────────────────────────────── */

const CATEGORIES = ['All', 'Onboarding', 'Support', 'Sales', 'HR', 'Ops', 'Finance']

const KITS: Kit[] = [
  {
    id: 'customer-onboarding',
    slug: 'customer-onboarding',
    name: 'Customer Onboarding',
    tagline: 'Turn new signups into active, confident users — without a CS team.',
    category: 'Onboarding',
    status: 'available',
    replaces: 'Replaces Gainsight, Totango',
    featured: true,
  },
  {
    id: 'support-triage',
    slug: 'support-triage',
    name: 'Support Triage',
    tagline: 'Resolve tier-1 tickets before a human ever has to look.',
    category: 'Support',
    status: 'available',
    replaces: 'Replaces Zendesk, Intercom',
    featured: true,
  },
  {
    id: 'inbound-sales',
    slug: 'inbound-sales',
    name: 'Inbound Sales',
    tagline: 'Qualify leads, book demos, and arm AEs with context before the call.',
    category: 'Sales',
    status: 'available',
    replaces: 'Replaces HubSpot Sales Hub',
    featured: false,
  },
  {
    id: 'employee-onboarding',
    slug: 'employee-onboarding',
    name: 'Employee Onboarding',
    tagline: 'Offer accept through end of week one, with manager touchpoints built in.',
    category: 'HR',
    status: 'available',
    replaces: 'Replaces Workday Onboarding, BambooHR',
    featured: false,
  },
  {
    id: 'incident-response',
    slug: 'incident-response',
    name: 'Incident Response',
    tagline: 'Detect, page, coordinate, and write the postmortem — start to finish.',
    category: 'Ops',
    status: 'available',
    featured: false,
  },
  {
    id: 'offboarding',
    slug: 'offboarding',
    name: 'Employee Offboarding',
    tagline: 'Graceful exits: access revocation, knowledge transfer, exit interview.',
    category: 'HR',
    status: 'available',
    featured: false,
  },
  {
    id: 'renewal-pipeline',
    slug: 'renewal-pipeline',
    name: 'Renewal Pipeline',
    tagline: 'Surface at-risk accounts 90 days out and drive proactive renewals.',
    category: 'Sales',
    status: 'in_development',
    replaces: 'Replaces Gainsight, ChurnZero',
    waitlistCount: 84,
    featured: false,
  },
  {
    id: 'invoice-ops',
    slug: 'invoice-ops',
    name: 'Invoice Ops',
    tagline: 'Match POs, flag exceptions, and close the month without chasing approvers.',
    category: 'Finance',
    status: 'in_development',
    waitlistCount: 61,
    featured: false,
  },
  {
    id: 'product-feedback',
    slug: 'product-feedback',
    name: 'Product Feedback Loop',
    tagline: 'Collect signals from every channel, cluster themes, route to the right squad.',
    category: 'Ops',
    status: 'in_development',
    waitlistCount: 47,
    featured: false,
  },
  {
    id: 'partner-ops',
    slug: 'partner-ops',
    name: 'Partner Ops',
    tagline: 'Onboard and activate channel partners without a dedicated team.',
    category: 'Sales',
    status: 'coming_soon',
    featured: false,
  },
  {
    id: 'compliance-monitor',
    slug: 'compliance-monitor',
    name: 'Compliance Monitor',
    tagline: 'Continuous policy checks and audit trails — without a compliance officer.',
    category: 'Ops',
    status: 'coming_soon',
    featured: false,
  },
]

/* ── Status helpers ─────────────────────────────────────────────────────── */

const STATUS_ORDER: Record<KitStatus, number> = {
  available: 0,
  in_development: 1,
  coming_soon: 2,
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

const SECTION_LABEL: Record<KitStatus, string> = {
  available:      'Available now',
  in_development: 'In development',
  coming_soon:    'Coming soon',
}

/* ── Card ───────────────────────────────────────────────────────────────── */

function KitCard({ kit, muted = false }: { kit: Kit; muted?: boolean }) {
  const ctaLabel = resolveCtaLabel(kit.status)
  const isPrimary = kit.status === 'available'

  return (
    <a
      href={`#kits/${kit.slug}`}
      className={`kit-card card card--interactive${muted ? ' kit-card--muted' : ''}`}
      style={{ textDecoration: 'none' }}
    >
      <div className="kit-card__head">
        <span className="tag">{kit.category}</span>
        <span className={`pill ${STATUS_PILL[kit.status]} kit-card__status`}>
          {STATUS_LABEL[kit.status]}
        </span>
      </div>

      <h2 className="kit-card__name">{kit.name}</h2>
      <p className="kit-card__tagline">{kit.tagline}</p>

      {kit.replaces && (
        <p className="kit-card__replaces">{kit.replaces}</p>
      )}

      <footer className="kit-card__foot">
        {kit.status === 'in_development' && kit.waitlistCount != null && (
          <span className="kit-card__waitlist">
            <span className="data">{kit.waitlistCount}</span> waiting
          </span>
        )}
        <span
          className={`btn btn--sm kit-card__cta ${isPrimary ? 'btn--primary' : 'btn--ghost'}`}
        >
          {ctaLabel}
        </span>
      </footer>
    </a>
  )
}

/* ── Featured card (wider, more emphasis) ───────────────────────────────── */

function FeaturedKitCard({ kit }: { kit: Kit }) {
  return (
    <a
      href={`#kits/${kit.slug}`}
      className="kit-card kit-card--featured card card--interactive"
      style={{ textDecoration: 'none' }}
    >
      <div className="kit-card__head">
        <span className="tag">{kit.category}</span>
        <span className={`pill ${STATUS_PILL[kit.status]} kit-card__status`}>
          {STATUS_LABEL[kit.status]}
        </span>
      </div>
      <h2 className="kit-card__name kit-card__name--lg">{kit.name}</h2>
      <p className="kit-card__tagline">{kit.tagline}</p>
      {kit.replaces && <p className="kit-card__replaces">{kit.replaces}</p>}
      <footer className="kit-card__foot">
        <span className="btn btn--primary btn--sm kit-card__cta">
          {resolveCtaLabel(kit.status)}
        </span>
        <span className="kit-card__arrow">
          <ArrowRight size={14} />
        </span>
      </footer>
    </a>
  )
}

/* ── Section ────────────────────────────────────────────────────────────── */

function KitsSection({
  status,
  kits,
  muted = false,
}: {
  status: KitStatus
  kits: Kit[]
  muted?: boolean
}) {
  if (kits.length === 0) return null
  return (
    <section className={`kits-section${muted ? ' kits-section--muted' : ''}`}>
      <div className="kits-section__label">
        <span className={`pill ${STATUS_PILL[status]}`}>{SECTION_LABEL[status]}</span>
        <span className="kits-section__count">
          {kits.length} kit{kits.length !== 1 ? 's' : ''}
        </span>
      </div>
      <ul className="kits-grid">
        {kits.map((kit) => (
          <li key={kit.id}>
            <KitCard kit={kit} muted={muted} />
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function KitsPage({ mode, onToggleMode }: { mode: Mode; onToggleMode: () => void }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')

  const matchesFilter = (k: Kit) => {
    const matchCat = activeCategory === 'All' || k.category === activeCategory
    const matchQ =
      !query ||
      k.name.toLowerCase().includes(query.toLowerCase()) ||
      k.tagline.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  }

  // Featured: always shown regardless of filter
  const featuredKits = KITS.filter((k) => k.featured)

  // Filtered grid — sorted by status order, then waitlist count desc, then name
  const filteredKits = KITS.filter(matchesFilter).sort((a, b) => {
    const byStatus = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
    if (byStatus !== 0) return byStatus
    if (a.status === 'in_development')
      return (b.waitlistCount ?? 0) - (a.waitlistCount ?? 0)
    return a.name.localeCompare(b.name)
  })

  const availableKits    = filteredKits.filter((k) => k.status === 'available')
  const inDevKits        = filteredKits.filter((k) => k.status === 'in_development')
  const comingSoonKits   = filteredKits.filter((k) => k.status === 'coming_soon')
  const totalVisible     = filteredKits.length

  return (
    <div className="keel kits-page" data-mode={mode}>
      <KitsNav
        mode={mode}
        onToggleMode={onToggleMode}
        back={{ href: '#top', label: 'Back to overview', onClick: () => (window.location.hash = '') }}
        cta={{ label: 'Request access' }}
      />

      <main className="kits-main">
        {/* Page header */}
        <div className="kits-header">
          <div className="kits-header__in">
            <a className="kits-back" href="#top" onClick={() => (window.location.hash = '')}>
              <ArrowLeft size={14} />
              Overview
            </a>
            <h1 className="kits-title">Explore the Kits</h1>
            <p className="kits-subtitle">
              Pre-built playbooks for every team. Deploy in days, own them forever.
            </p>

            <div className="kits-controls">
              <div className="kits-search">
                <Search size={15} className="kits-search__icon" />
                <input
                  className="kits-search__input"
                  type="search"
                  placeholder="Search kits…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="kits-filters" role="group" aria-label="Filter by category">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className="chip"
                    aria-pressed={activeCategory === cat}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="kits-body">
          <div className="kits-body__in">

            {/* Featured strip — always visible */}
            {featuredKits.length > 0 && (
              <section className="kits-featured">
                <div className="kits-section__label">
                  <span className="kits-featured__eyebrow eyebrow">Featured</span>
                </div>
                <ul className="kits-grid kits-grid--featured">
                  {featuredKits.map((kit) => (
                    <li key={kit.id}>
                      <FeaturedKitCard kit={kit} />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Filtered sections */}
            {totalVisible === 0 ? (
              <div className="kits-empty">
                <Package size={32} strokeWidth={1.25} />
                <p>No kits match your search.</p>
              </div>
            ) : (
              <>
                <KitsSection status="available"      kits={availableKits} />
                <KitsSection status="in_development" kits={inDevKits} muted />
                <KitsSection status="coming_soon"    kits={comingSoonKits} muted />
              </>
            )}

            {/* Request vertical — always shown */}
            <div className="kits-request">
              <div className="kits-request__in">
                <div>
                  <p className="kits-request__headline">Don't see your market?</p>
                  <p className="kits-request__body">
                    Request the Kit you have in mind. Demand decides what we build next.
                  </p>
                </div>
                <button className="btn btn--ghost">Request a Kit</button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
