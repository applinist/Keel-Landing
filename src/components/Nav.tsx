export default function Nav() {
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
          <a href="#" className="nav__signin">Sign in</a>
          <button className="btn btn--primary btn--sm">Explore the Kits</button>
        </div>
      </div>
    </nav>
  )
}
