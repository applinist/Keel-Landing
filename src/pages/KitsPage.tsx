import { useState } from 'react'
import { Search, Package, ArrowLeft } from 'lucide-react'

const CATEGORIES = ['All', 'Onboarding', 'Support', 'Sales', 'HR', 'Ops', 'Finance']

type Kit = {
  id: string
  name: string
  category: string
  description: string
  flows: number
  agents: number
  status: 'ready' | 'beta' | 'soon'
}

const KITS: Kit[] = [
  {
    id: 'customer-onboarding',
    name: 'Customer Onboarding',
    category: 'Onboarding',
    description: 'First-90-days journey from signed contract to confident, active user.',
    flows: 14,
    agents: 3,
    status: 'ready',
  },
  {
    id: 'employee-onboarding',
    name: 'Employee Onboarding',
    category: 'HR',
    description: 'New hire experience: offer accept through end of week one, with manager touchpoints.',
    flows: 11,
    agents: 2,
    status: 'ready',
  },
  {
    id: 'support-triage',
    name: 'Support Triage',
    category: 'Support',
    description: 'Route, acknowledge, and resolve tier-1 tickets before a human ever has to look.',
    flows: 9,
    agents: 4,
    status: 'ready',
  },
  {
    id: 'inbound-sales',
    name: 'Inbound Sales',
    category: 'Sales',
    description: 'Qualify leads, book demos, and arm AEs with context before the call.',
    flows: 8,
    agents: 2,
    status: 'ready',
  },
  {
    id: 'renewal-pipeline',
    name: 'Renewal Pipeline',
    category: 'Sales',
    description: 'Surface at-risk accounts 90 days out and drive proactive renewal conversations.',
    flows: 7,
    agents: 2,
    status: 'beta',
  },
  {
    id: 'invoice-ops',
    name: 'Invoice Ops',
    category: 'Finance',
    description: 'Match POs, flag exceptions, and close the month without chasing approvers.',
    flows: 6,
    agents: 1,
    status: 'beta',
  },
  {
    id: 'incident-response',
    name: 'Incident Response',
    category: 'Ops',
    description: 'Detect, page, coordinate, and write the postmortem — start to finish.',
    flows: 10,
    agents: 3,
    status: 'ready',
  },
  {
    id: 'product-feedback',
    name: 'Product Feedback Loop',
    category: 'Ops',
    description: 'Collect signals from every channel, cluster themes, and route to the right squad.',
    flows: 5,
    agents: 2,
    status: 'beta',
  },
  {
    id: 'offboarding',
    name: 'Employee Offboarding',
    category: 'HR',
    description: 'Graceful exits: access revocation, knowledge transfer, and exit interview.',
    flows: 8,
    agents: 1,
    status: 'ready',
  },
]

function KitCard({ kit, muted = false }: { kit: Kit; muted?: boolean }) {
  return (
    <article className={`kit-card card card--interactive${muted ? ' kit-card--muted' : ''}`}>
      <div className="kit-card__head">
        <span className="tag">{kit.category}</span>
        {kit.status === 'ready' && (
          <span className="pill pill--success kit-card__status">Available</span>
        )}
        {kit.status === 'beta' && (
          <span className="pill pill--warn kit-card__status">Beta</span>
        )}
      </div>
      <h2 className="kit-card__name">{kit.name}</h2>
      <p className="kit-card__desc">{kit.description}</p>
      <footer className="kit-card__foot">
        <span className="kit-card__meta">
          <span className="data">{kit.flows}</span> flows
        </span>
        <span className="kit-card__meta">
          <span className="data">{kit.agents}</span> agents
        </span>
        <button className="btn btn--ghost btn--sm kit-card__cta">
          {kit.status === 'ready' ? 'Preview' : 'Learn more'}
        </button>
      </footer>
    </article>
  )
}

export default function KitsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')

  const matchesFilter = (k: Kit) => {
    const matchCat = activeCategory === 'All' || k.category === activeCategory
    const matchQ =
      !query ||
      k.name.toLowerCase().includes(query.toLowerCase()) ||
      k.description.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  }

  const readyKits = KITS.filter((k) => k.status === 'ready' && matchesFilter(k))
  const betaKits  = KITS.filter((k) => k.status !== 'ready' && matchesFilter(k))
  const totalVisible = readyKits.length + betaKits.length

  return (
    <div className="keel kits-page" data-mode="dark">
      <header className="kits-nav">
        <div className="kits-nav__in">
          <a className="brand" href="#top" onClick={() => (window.location.hash = '')}>
            <img src="/assets/keel-mark.svg" alt="" />Keel
          </a>
          <nav className="kits-nav__links">
            <a href="#top" onClick={() => (window.location.hash = '')}>Back to overview</a>
          </nav>
          <div className="kits-nav__r">
            <a href="#" className="nav__signin">Sign in</a>
            <button className="btn btn--primary btn--sm">Request access</button>
          </div>
        </div>
      </header>

      <main className="kits-main">
        <div className="kits-header">
          <div className="kits-header__in">
            <a
              className="kits-back"
              href="#top"
              onClick={() => (window.location.hash = '')}
            >
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
            {totalVisible === 0 ? (
              <div className="kits-empty">
                <Package size={32} strokeWidth={1.25} />
                <p>No kits match your search.</p>
              </div>
            ) : (
              <>
                {readyKits.length > 0 && (
                  <section className="kits-section">
                    <div className="kits-section__label">
                      <span className="pill pill--success">Available now</span>
                      <span className="kits-section__count">{readyKits.length} kit{readyKits.length !== 1 ? 's' : ''}</span>
                    </div>
                    <ul className="kits-grid">
                      {readyKits.map((kit) => (
                        <li key={kit.id}>
                          <KitCard kit={kit} />
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {betaKits.length > 0 && (
                  <section className="kits-section kits-section--beta">
                    <div className="kits-section__label">
                      <span className="pill pill--warn">In beta</span>
                      <span className="kits-section__count">{betaKits.length} kit{betaKits.length !== 1 ? 's' : ''}</span>
                    </div>
                    <ul className="kits-grid">
                      {betaKits.map((kit) => (
                        <li key={kit.id}>
                          <KitCard kit={kit} muted />
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
