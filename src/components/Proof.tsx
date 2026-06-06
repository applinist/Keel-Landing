import { useEffect, useRef, useState } from 'react'
import { Play, ShieldCheck, Gauge, Activity, ArrowUpRight } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface StepState {
  revealed: boolean
  active: boolean
  done: boolean
}

interface StatusState {
  text: string
  cls: string
}

interface StepDraft {
  meta: string
  line: string
}

interface StepData {
  key: string
  title: string
  detail?: string
  draft?: StepDraft
  esc: boolean
}

const STEPS: StepData[] = [
  {
    key: 'Step 01 / Signal',
    title: "Caught a quiet drop the dashboard wouldn't flag",
    detail: 'Usage down 38% over 14 days. Logins halved. No ticket filed — the kind of churn that leaves silently.',
    esc: false,
  },
  {
    key: 'Step 02 / Assemble context',
    title: 'Pulled the who, the why, and the history',
    detail: 'Champion changed roles 3 weeks ago. Two unanswered feature asks from Q1. Renewal in 41 days. Last QBR: positive.',
    esc: false,
  },
  {
    key: 'Step 03 / Draft outreach',
    title: 'Wrote a tailored re-engagement email',
    draft: {
      meta: 'to: new champion · re: those two Q1 asks',
      line: 'Both requests you raised in Q1 shipped last month — I mapped them to how your team was using the older flow…',
    },
    esc: false,
  },
  {
    key: 'Step 04 / Check its limit',
    title: "Decided this one shouldn't be sent automatically",
    detail: 'High-value account, leadership change, renewal in play. Policy: a relationship this delicate gets a human call — not an automated send.',
    esc: false,
  },
  {
    key: 'Step 05 / Handoff',
    title: 'Handed the account to you — nothing sent',
    detail: 'The draft, the context, and the recommendation are attached. You make the call. The agent knew its limit, and stopped at it.',
    esc: true,
  },
]

const initSteps = (): StepState[] => STEPS.map(() => ({ revealed: false, active: false, done: false }))

function stepCls(s: StepState, isEsc: boolean): string {
  const classes = ['sb-step']
  if (isEsc) classes.push('sb-step--esc')
  if (s.revealed) classes.push('is-revealed')
  if (s.active) classes.push('is-active')
  if (s.done) classes.push('is-done')
  return classes.join(' ')
}

function CheckMark() {
  return (
    <svg className="sb-check" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 6.2 5 8.6 9.5 3.6" stroke="#06110f" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Proof() {
  const reduced = useReducedMotion()
  const [stepStates, setStepStates] = useState<StepState[]>(initSteps)
  const [running, setRunning] = useState(false)
  const [status, setStatus] = useState<StatusState>({ text: 'idle', cls: '' })
  const [hint, setHint] = useState('5 steps · runs in real time')
  const [runLabel, setRunLabel] = useState('Run the scenario')
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    if (!reduced) return
    setStepStates(STEPS.map(() => ({ revealed: true, active: false, done: true })))
    setStatus({ text: 'handed to owner', cls: 'is-done' })
    setRunLabel('Replay the run')
    setHint('static view · reduced motion')
  }, [reduced])

  useEffect(() => () => timersRef.current.forEach(clearTimeout), [])

  function clearTimers() {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  function reset() {
    clearTimers()
    setStepStates(initSteps())
    setStatus({ text: 'idle', cls: '' })
  }

  function run() {
    if (running) return
    setRunning(true)
    reset()
    setRunLabel('Running…')
    setStatus({ text: 'running', cls: 'is-running' })

    const perStep = 1050
    STEPS.forEach((_step, idx) => {
      timersRef.current.push(
        window.setTimeout(() => {
          setStepStates(prev =>
            prev.map((s, i) => (i === idx ? { ...s, revealed: true, active: true } : s))
          )
          setStatus({ text: `step ${idx + 1} / 5`, cls: 'is-running' })
        }, idx * perStep)
      )
      timersRef.current.push(
        window.setTimeout(() => {
          setStepStates(prev =>
            prev.map((s, i) => (i === idx ? { ...s, active: false, done: true } : s))
          )
        }, idx * perStep + perStep - 220)
      )
    })

    timersRef.current.push(
      window.setTimeout(() => {
        setRunning(false)
        setRunLabel('Run it again')
        setStatus({ text: 'handed to owner — nothing sent', cls: 'is-done' })
        setHint('it knew its limit, and stopped at it')
      }, STEPS.length * perStep + 120)
    )
  }

  function handleRun() {
    if (reduced) {
      setStatus({ text: 'replayed — handed to owner', cls: 'is-done' })
    } else {
      run()
    }
  }

  return (
    <section className="proof" id="proof">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">Proof / the sandbox</div>
            <h2 className="sec-title">See it run before you spend a cent.</h2>
          </div>
          <p className="sec-lede">
            Watch the agents work, live — and see exactly what every Kit had to pass.
          </p>
        </div>

        <p className="proof__framing">
          This isn't a video. Trigger it and watch a real scenario play out: an account's usage
          quietly drops, the agent catches the signal, pulls together the context — who, why, the
          history — and drafts a tailored re-engagement email. And when the situation needs a human
          call, it hands the account to you with a summary instead of sending. You can see it
          think, step by step, and you can see it know its limits.
        </p>

        <div className="sandbox" id="sandbox" data-mode-anim={reduced ? undefined : 'step'}>
          <div className="sandbox__bar">
            <span className="dot" /><span className="dot" /><span className="dot" />
            <span className="sandbox__t mono">customer-success · sandbox · retention agent</span>
            <span className="sandbox__mode mono">curated scenario</span>
          </div>

          <div className="sandbox__grid">
            <div className="sandbox__rail">
              <div className="eyebrow sb-rail__key">The scenario</div>
              <p className="sb-rail__scenario">
                An account's usage quietly drops. The agent catches the signal, assembles the
                context, drafts the outreach — and decides whether it should send or hand the
                call to you.
              </p>
              <dl className="sb-rail__meta">
                <div><dt className="mono">Account</dt><dd className="data">Halyard Freight</dd></div>
                <div><dt className="mono">Plan</dt><dd className="data">Growth · $199/mo</dd></div>
                <div><dt className="mono">Signal</dt><dd className="data sb-warn">usage −38% / 14d</dd></div>
              </dl>
              <button
                className="btn btn--primary sb-run"
                onClick={handleRun}
                aria-controls="sbSteps"
                aria-disabled={running}
              >
                <Play size={16} strokeWidth={1.5} />
                <span className="sb-run__label">{runLabel}</span>
              </button>
              <p className="sb-rail__hint mono">{hint}</p>
            </div>

            <div className="sandbox__trace">
              <div className="sb-trace__head">
                <span className="eyebrow">Reasoning trace</span>
                <span
                  className={`sb-trace__status mono${status.cls ? ' ' + status.cls : ''}`}
                  aria-live="polite"
                >
                  {status.text}
                </span>
              </div>

              <ol className="sb-steps" id="sbSteps" aria-live="polite">
                {STEPS.map((step, idx) => {
                  const s = stepStates[idx]
                  return (
                    <li key={idx} className={stepCls(s, step.esc)}>
                      <span className={`sb-step__node${step.esc ? ' sb-step__node--esc' : ''}`}>
                        {!step.esc && <CheckMark />}
                        {!step.esc && <span className="sb-step__spin" />}
                      </span>
                      <div className="sb-step__body">
                        <div className={`sb-step__key mono${step.esc ? ' sb-esc-key' : ''}`}>
                          {step.key}
                        </div>
                        {step.esc ? (
                          <div className="sb-esc-card">
                            <span className="pill pill--escalation">escalation</span>
                            <div className="sb-step__title">{step.title}</div>
                            <div className="sb-step__detail">{step.detail}</div>
                            <div className="sb-esc-actions">
                              <button className="btn btn--primary btn--sm">Review &amp; send</button>
                              <button className="btn btn--ghost btn--sm">Edit the draft</button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="sb-step__title">{step.title}</div>
                            {step.detail && <div className="sb-step__detail">{step.detail}</div>}
                            {step.draft && (
                              <div className="sb-draft">
                                <div className="sb-draft__meta mono">{step.draft.meta}</div>
                                <p className="sb-draft__line">{step.draft.line}</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>

        <div className="proof__pair">
          <div className="audit card">
            <div className="audit__head">
              <div className="eyebrow">The audit</div>
              <span className="pill pill--success">must pass to list</span>
            </div>
            <h3 className="audit__name">Programmatic Trust Protocol</h3>
            <p className="audit__body">
              Every Kit has to pass the same automated architecture audit before it's ever listed.
              The marketplace itself is the filter — this is our standard applied to everything,
              not a badge we award ourselves.
            </p>
            <ul className="audit__dims">
              <li>
                <ShieldCheck size={18} strokeWidth={1.5} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                <div>
                  <span className="audit__dim-name">Security</span>
                  <span className="audit__dim-sub mono">auth, data, dependencies</span>
                </div>
              </li>
              <li>
                <Gauge size={18} strokeWidth={1.5} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                <div>
                  <span className="audit__dim-name">Responsiveness &amp; accessibility</span>
                  <span className="audit__dim-sub mono">WCAG AA · performance budgets</span>
                </div>
              </li>
              <li>
                <Activity size={18} strokeWidth={1.5} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                <div>
                  <span className="audit__dim-name">AI-runtime reliability &amp; latency</span>
                  <span className="audit__dim-sub mono">agent behavior under load</span>
                </div>
              </li>
            </ul>
            <a href="#" className="audit__inspect mono">
              The criteria are open to inspect <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          </div>

          <div className="weld card">
            <div className="eyebrow">Why it costs a fraction — the honest answer</div>
            <p className="weld__lede">
              AI makes a Kit cheap to <em>build</em>. AI alone would produce something that breaks
              in production. So here's the whole catch, in order:
            </p>
            <ol className="weld__chain">
              <li className="weld__link">
                <span className="weld__n mono">01</span>
                <div><span className="weld__t">Cheap to build</span><span className="weld__s">AI does the heavy lifting.</span></div>
              </li>
              <li className="weld__link">
                <span className="weld__n mono">02</span>
                <div><span className="weld__t">Made real by an expert hand</span><span className="weld__s">Built by someone who's shipped production software for 25 years.</span></div>
              </li>
              <li className="weld__link">
                <span className="weld__n mono">03</span>
                <div><span className="weld__t">Verified before it's sold</span><span className="weld__s">Passes the audit above — or it isn't listed.</span></div>
              </li>
              <li className="weld__link weld__link--now">
                <span className="weld__n mono">04</span>
                <div><span className="weld__t">And you can watch it behave, right now</span><span className="weld__s">No leap of faith. The run above is the evidence.</span></div>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <hr className="waterline" />
    </section>
  )
}
