import { Sun, Moon } from 'lucide-react'
import type { Mode } from '../types'

interface NavProps {
  mode: Mode
  onToggleMode: () => void
}

export default function Nav({ mode, onToggleMode }: NavProps) {
  return (
    <nav className="nav">
      <div className="nav__in">
        <a className="brand" href="#top">
          <img src="/assets/keel-mark.svg" alt="" />Keel
        </a>
        <div className="nav__links">
          <a href="#anatomy">What ships</a>
          <a href="#proof">Proof</a>
          <a href="#how">How it works</a>
          <a href="#objections">Before you decide</a>
        </div>
        <div className="nav__r">
          <button
            className="btn btn--quiet btn--icon kits-nav__mode"
            onClick={onToggleMode}
            aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={mode === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a href="#" className="nav__signin">Sign in</a>
          <a href="#kits" className="btn btn--primary btn--sm">Explore the Kits</a>
        </div>
      </div>
    </nav>
  )
}
