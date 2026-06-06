import { useState } from 'react'

interface HeadlineOption {
  label: string
  value: string
}

interface ManifestItem {
  num: string
  title: string
  cap: string
  items: string[]
}

const HEADLINES: HeadlineOption[] = [
  { label: 'Keel metaphor', value: 'A product floats. A company needs a keel.' },
  { label: 'Plain fallback', value: "A product isn't a company." },
]

const MANIFEST: ManifestItem[] = [
  {
    num: '01',
    title: 'The product',
    cap: 'The AI-native application your customers use, with onboarding and in-app help built in.',
    items: ['AI-native web/mobile app', 'User onboarding', 'In-app help'],
  },
  {
    num: '02',
    title: 'A brand and a storefront',
    cap: 'Launch looking established, not empty — on day one.',
    items: ['Logo & visual identity', 'Conversion-built landing page', 'Starter blog & SEO content'],
  },
  {
    num: '03',
    title: 'A way to get paid',
    cap: 'Charge customers and see revenue from your first sale.',
    items: ['Subscription billing & plans', 'Invoicing', 'Automatic failed-payment recovery', 'Revenue & churn view'],
  },
  {
    num: '04',
    title: 'Customer communication, run by agents',
    cap: 'Reach customers and resolve issues without staffing a team.',
    items: ["Authenticated email — won't land in spam", 'Support channels', 'AI support & onboarding agents'],
  },
  {
    num: '05',
    title: 'The standing of a real company',
    cap: 'The legal and security footing customers and their lawyers expect.',
    items: ['Terms & privacy policy', 'Compliance scaffolding', 'Secure accounts & role-based access', 'Audit logging'],
  },
  {
    num: '06',
    title: 'A cockpit to run it',
    cap: 'Know the business is healthy without watching it.',
    items: ['Owner back-office', 'Product & revenue analytics', 'Uptime & error monitoring'],
  },
  {
    num: '07',
    title: 'Live in one click — and staying live',
    cap: 'Go from purchase to first paying customer.',
    items: ['One-click production deploy', 'Production infrastructure', 'Launch checklist'],
  },
]

export default function Anatomy() {
  const [headlineIdx, setHeadlineIdx] = useState(0)

  return (
    <section className="anatomy" id="anatomy">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">A product isn't a company</div>
            <h2 className="sec-title" id="anatomyHeadline">
              {HEADLINES[headlineIdx].value}
            </h2>
          </div>
          <p className="sec-lede">
            A great product is hard to build — and it still isn't a business. A company also has
            to get paid, stay legal, talk to its customers, and keep running. Every Kit ships with
            all of it, built and audited.
          </p>
        </div>

        <div className="hpick" role="group" aria-label="Anatomy headline is parked — pick one">
          <span className="eyebrow hpick__lbl">Parked headline · your pick</span>
          <div className="hpick__opts">
            {HEADLINES.map((h, idx) => (
              <button
                key={idx}
                className={`hpick__opt${headlineIdx === idx ? ' is-active' : ''}`}
                aria-pressed={headlineIdx === idx}
                onClick={() => setHeadlineIdx(idx)}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>

        <ol className="manifest">
          {MANIFEST.map(item => (
            <li className="man" key={item.num}>
              <span className="man__i mono">{item.num}</span>
              <div className="man__main">
                <h3 className="man__title">{item.title}</h3>
                <p className="man__cap">{item.cap}</p>
              </div>
              <ul className="man__items">
                {item.items.map(i => <li key={i}>{i}</li>)}
              </ul>
            </li>
          ))}
        </ol>
        <p className="anatomy__foot mono">
          Seven parts ship with every Kit. The product is one of them — the mass is the point.
        </p>
      </div>
      <hr className="waterline" />
    </section>
  )
}
