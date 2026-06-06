export default function AnnotationBoard() {
  return (
    <aside className="annot" id="annotations" aria-label="Designer annotations — open decisions">
      <div className="wrap">
        <div className="annot__head">
          <span className="eyebrow">Designer notes · not part of the live page</span>
          <h2 className="annot__title">Two open decisions surfaced</h2>
          <p className="annot__intro">
            Per the brief, these are flagged rather than silently resolved. Both live inside the
            page above.
          </p>
        </div>
        <div className="annot__grid">
          <div className="annot__card">
            <span className="annot__num mono">01</span>
            <h3 className="annot__h">Parked Anatomy headline</h3>
            <p>
              The section model marks this <code>headlineLocked: false</code>, and the copy deck
              offers two lines. Both are live in the <a href="#anatomy">Anatomy</a> section via
              the "your pick" toggle — the Keel-metaphor primary ("A product floats. A company
              needs a keel.") and the plain fallback ("A product isn't a company."). No silent
              choice made.
            </p>
          </div>
          <div className="annot__card">
            <span className="annot__num mono">02</span>
            <h3 className="annot__h">Gated FAQ answers</h3>
            <p>
              Two answers depend on unmade business decisions and are rendered as honest "still
              being settled" entries in <a href="#objections">Before you decide</a> —{' '}
              <strong>ownership / source-license terms</strong> and{' '}
              <strong>post-purchase support</strong>. The commoditization answer ("won't everyone
              get the same company") shows its written philosophical answer; its structural fork is
              still a revenue-model decision.
            </p>
          </div>
          <div className="annot__card annot__card--note">
            <span className="annot__num mono">·</span>
            <h3 className="annot__h">Swappable placeholder</h3>
            <p>
              The before→after and sandbox both use the <strong>Customer Success</strong> vertical
              as the working example from the data. It's clearly swappable once the first vertical
              is chosen.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
