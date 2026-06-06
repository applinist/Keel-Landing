export default function Vision() {
  return (
    <section className="vision" id="vision">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">The horizon</div>
            <h2 className="sec-title">Today, you pick one.</h2>
          </div>
        </div>

        <ol className="arc">
          <li className="arc__stage arc__stage--now">
            <div className="arc__when mono">Today</div>
            <div className="arc__verb">Pick</div>
            <p className="arc__desc">Pick a complete company off the shelf and make it yours.</p>
          </li>
          <li className="arc__stage">
            <div className="arc__when mono">Soon</div>
            <div className="arc__verb">Request</div>
            <p className="arc__desc">
              Request the one you have in mind — and your request shapes what gets built next.
            </p>
          </li>
          <li className="arc__stage arc__stage--far">
            <div className="arc__when mono">Eventually</div>
            <div className="arc__verb">Describe</div>
            <p className="arc__desc">
              Describe the business you imagine, and watch the foundation come to life.
            </p>
          </li>
        </ol>

        <p className="vision__moat">
          Each is a new door opening — not a sign that today's is a draft. And whatever the
          platform learns to build, your edge stays where it always was:{' '}
          <strong>in knowing your market.</strong>
        </p>
      </div>
    </section>
  )
}
