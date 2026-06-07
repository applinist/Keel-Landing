import { Sun, Moon, ArrowLeft } from 'lucide-react'
import type { Mode } from '../types'

interface KitsNavProps {
  mode: Mode
  onToggleMode: () => void
  back?: { href: string; label: string; onClick?: () => void }
  cta: { label: string }
}

export default function KitsNav({ mode, onToggleMode, back, cta }: KitsNavProps) {
  return (
    <header className="kits-nav">
      <div className="kits-nav__in">
        <a className="brand" href="#top" onClick={() => (window.location.hash = '')}>
          <img src="/assets/keel-mark.svg" alt="" />Keel
        </a>

        {back && (
          <nav className="kits-nav__links">
            <a
              href={back.href}
              onClick={back.onClick ? (e) => { e.preventDefault(); back.onClick!() } : undefined}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <ArrowLeft size={13} />
              {back.label}
            </a>
          </nav>
        )}

        <div className="kits-nav__r">
          <button
            className="btn btn--quiet btn--icon kits-nav__mode"
            onClick={onToggleMode}
            aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={mode === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a href="#" className="nav__signin">Sign in</a>
          <button className="btn btn--primary btn--sm">{cta.label}</button>
        </div>
      </div>
    </header>
  )
}
