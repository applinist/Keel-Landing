import { ArrowRight } from 'lucide-react'

export default function AiNative() {
  return (
    <section className="ainative" id="ai-native">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">Built for now, not ported from then</div>
            <h2 className="sec-title">
              Not a copy of the old software. The version that couldn't exist until now.
            </h2>
          </div>
        </div>

        <div className="pillar pillar--primary">
          <div className="pillar__head">
            <span className="eyebrow">Pillar one · the difference</span>
            <p className="pillar__claim">
              Every Kit is built the way you'd build it today, with none of the decade of legacy
              debt the incumbents carry. The difference isn't a longer feature list — it's that
              the manual busywork their architecture forces on people is simply gone.
            </p>
          </div>
          <div className="ba">
            <div className="ba__col ba__col--before">
              <div className="ba__lbl mono">
                <span className="ba__dot" />Before · the old architecture
              </div>
              <p className="ba__text">
                A CS manager combs usage, tickets, and login data across dozens of accounts to
                guess which customers are slipping — then hand-writes each check-in.
              </p>
            </div>
            <div className="ba__arrow" aria-hidden="true">
              <ArrowRight size={20} strokeWidth={1.5} />
            </div>
            <div className="ba__col ba__col--after">
              <div className="ba__lbl mono">
                <span className="ba__dot ba__dot--on" />After · built for now
              </div>
              <p className="ba__text">
                The system watches every account continuously, surfaces the ones actually at risk
                and why, and drafts the outreach. The manager just approves.
              </p>
            </div>
          </div>
        </div>

        <div className="pillar pillar--secondary">
          <div className="pillar__head">
            <span className="eyebrow">Pillar two · and it runs itself</span>
            <p className="pillar__claim pillar__claim--sm">
              Once it's live, AI agents run support and operations by default — the team you'd
              otherwise have to hire. So one person can operate what used to take a department.
            </p>
          </div>
          <div className="vignettes">
            <div className="vig">
              <span className="vig__role mono">Support agent</span>
              <p>
                Resolves a customer's question and escalates the genuine edge case to you, with
                the full context attached.
              </p>
            </div>
            <div className="vig">
              <span className="vig__role mono">Onboarding agent</span>
              <p>Walks a new signup through setup while you sleep.</p>
            </div>
            <div className="vig">
              <span className="vig__role mono">Ops agent</span>
              <p>Flags an anomaly before it becomes an outage.</p>
            </div>
          </div>
          <div className="escnote">
            <span className="pill pill--escalation">handoff</span>
            <p>
              Agents handle the routine and hand the rest to you — with context, and nothing in
              the dark, because it's all logged. This isn't an autonomous-employee fantasy. It's
              the staff you didn't have to hire, knowing when to ask you.
            </p>
          </div>
          <p className="grace mono">And it gets more capable as AI does.</p>
        </div>
      </div>
      <hr className="waterline" />
    </section>
  )
}
