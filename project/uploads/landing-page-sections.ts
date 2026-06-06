// Landing page — consolidated section outline
// Modeled as a discriminated union keyed on `kind`.
// Render order = array order. Data is JSON-serializable (string/boolean/array/object only).
//
// Open dependencies are encoded in the data, not hidden in comments:
//   - headlineLocked: false        -> copy parked, find a better line later
//   - "[pending first vertical]"   -> concrete copy needs the first Kit's domain
//   - gatedOnDecision              -> FAQ answer waits on an unmade business decision

/* ------------------------------------------------------------------ */
/* Shared building blocks                                              */
/* ------------------------------------------------------------------ */

type CtaAction =
  | "explore-kits"
  | "watch-sandbox"
  | "join-waitlist"
  | "request-vertical"
  | "read-thesis";

interface Cta {
  label: string;
  action: CtaAction;
  href?: string;
  newTab?: boolean;
}

interface SectionBase {
  id: string;
  eyebrow?: string;
}

/* ------------------------------------------------------------------ */
/* Section variants                                                    */
/* ------------------------------------------------------------------ */

// 1. HERO — insider-led promise + immediate proof escape hatch
interface HeroSection extends SectionBase {
  kind: "hero";
  headline: string;
  subhead: string;
  primaryCta: Cta;
  secondaryCta?: Cta; // "Watch one run" -> sandbox
  microcopy?: string; // price/time anchor, no number
  showSandboxPreview: boolean; // restrained looping glimpse; full showpiece lives in proof
}

// 2. ANATOMY — "A product isn't a company." Seven equal-weight buckets.
interface AnatomyBucket {
  title: string;
  capability: string; // operator-facing "you can..." framing, not "we built..."
  items: string[]; // <= 4 concrete components, translated out of internal jargon
}
interface AnatomySection extends SectionBase {
  kind: "anatomy";
  headline: string;
  headlineLocked: boolean;
  subhead: string;
  buckets: AnatomyBucket[]; // equal visual weight — the mass is the point
}

// 3. AI-NATIVE — two pillars: built for now (not a clone) + runs itself (agents)
interface BeforeAfter {
  legacy: string; // manual busywork the legacy architecture forces on users
  aiNative: string; // the AI-age version doing it for them
}
interface AgentVignette {
  scenario: string; // concrete, operator-facing
}
interface AiNativeSection extends SectionBase {
  kind: "ai-native";
  headline: string;
  productPillar: {
    // PRIMARY beat: defends against "cheap clone"
    claim: string;
    beforeAfter: BeforeAfter; // the single concrete demonstration that earns the claim
  };
  operationsPillar: {
    // SECONDARY beat: agents as the staff you didn't hire
    claim: string;
    vignettes: AgentVignette[];
    escalationNote: string; // honesty: handle routine, hand the rest to you with context
  };
  futureGraceNote?: string; // "grows more capable as AI does" — closing line only, never lead
}

// 4. PROOF — sandbox (gut) + audit (head) + cost-honesty weld. Showpiece #1.
interface ProofSection extends SectionBase {
  kind: "proof";
  headline: string;
  subhead: string;
  sandbox: {
    mode: "curated"; // not open-ended at launch
    scenario: string;
    showsReasoningSteps: boolean; // latency rendered as transparency
    showsEscalation: boolean; // graceful handoff shown, not just flawless success
  };
  audit: {
    name: string; // Programmatic Trust Protocol
    dimensions: string[]; // security, responsiveness/accessibility, AI-runtime reliability
    mustPassToList: boolean; // the marketplace itself is the filter
    criteriaInspectable: boolean; // transparency substitutes for third-party authority
  };
  costHonestyWeld: string; // "why it costs a fraction / not slop" connective beat
}

// 5. PERSONAS — unified under "founder"; backgrounds become edges. Insider primary.
interface FounderEdge {
  origin: string; // blunt, recognizable predicament
  edge: string; // their head start (asset-forward for everyone)
  primary: boolean; // insider = true (fullest treatment)
}
interface PersonasSection extends SectionBase {
  kind: "personas";
  headline: string;
  sharedRequirement: string; // conviction about a market — the honest entry filter
  unifyingFrame: string; // everyone becomes a founder; only the head start differs
  edges: FounderEdge[];
}

// 6. HOW-IT-WORKS — Pick. Configure. Launch. Old-way scroll contrast. Showpiece #2.
interface FlowStep {
  label: string;
  description: string;
  note?: string; // e.g. configurator reassurance on Configure
}
interface CustomizationTier {
  name: string;
  depth: string; // framed as "how far you take it", folded lightly into Configure
}
interface HowItWorksSection extends SectionBase {
  kind: "how-it-works";
  headline: string;
  oldWayItems: string[]; // long slog list = the cost/time anchor made physical
  steps: FlowStep[];
  scrollContrast: {
    metaphor: "short-distance"; // distance, not speed; no scroll-jacking
    payoffLine: string;
    reducedMotionFallback: string;
  };
  tiers: CustomizationTier[];
  honestyHandoff: string; // ends on "...now you do the part only you can do"
}

// 7. OBJECTIONS — founder credibility spine + blunt FAQ. Calm, not a showpiece.
interface FaqItem {
  question: string; // buyer's blunt voice
  answer: string;
  gatedOnDecision?: string; // copy pending an unmade business decision
}
interface ObjectionsSection extends SectionBase {
  kind: "objections";
  headline: string;
  founderCredibility: {
    spine: string; // the experienced hand AI needs is demonstrably yours
    proofPoints: string[];
  };
  faqs: FaqItem[];
}

// 8. VISION — light, late grace note. Today is the hero; future is a horizon.
interface VisionStage {
  when: "today" | "soon" | "eventually";
  verb: "pick" | "request" | "describe";
  description: string;
}
interface VisionSection extends SectionBase {
  kind: "vision";
  headline: string;
  stages: VisionStage[];
  moatNote: string; // buyer's edge stays in market knowledge, not the tech
}

// 9. FINAL-CTA — close + why-now thesis card lives here, low on the page.
interface FinalCtaSection extends SectionBase {
  kind: "final-cta";
  closingLine: string; // honest urgency, no manufactured scarcity
  ctaLine: string;
  primaryCta: Cta;
  secondaryCtas: Cta[]; // waitlist / request — the pre-launch reality
  thesisCard: {
    teaser: string; // pull-quote does micro-urgency even unclicked
    cta: Cta; // read-thesis -> blog, new tab
  };
}

/* ------------------------------------------------------------------ */
/* The discriminated union + page container                            */
/* ------------------------------------------------------------------ */

export type Section =
  | HeroSection
  | AnatomySection
  | AiNativeSection
  | ProofSection
  | PersonasSection
  | HowItWorksSection
  | ObjectionsSection
  | VisionSection
  | FinalCtaSection;

export type SectionKind = Section["kind"];

export interface LandingPage {
  sections: Section[]; // render order = array order
}

/* ------------------------------------------------------------------ */
/* Data — consolidated decisions from the design session               */
/* ------------------------------------------------------------------ */

export const landingPage: LandingPage = {
  sections: [
    {
      kind: "hero",
      id: "hero",
      headline:
        "You know where the incumbent is weak. Now you can launch the alternative.",
      subhead:
        "A complete, AI-native software company — product, brand, billing, support, and infrastructure — already built and audited. You bring the market. We've built everything else.",
      primaryCta: { label: "Explore the Kits", action: "explore-kits" },
      secondaryCta: { label: "Watch one run", action: "watch-sandbox" },
      microcopy:
        "What used to take a funded team a year. Yours to configure and launch.",
      showSandboxPreview: true,
    },
    {
      kind: "anatomy",
      id: "anatomy",
      headline: "A product isn't a company.",
      headlineLocked: false, // parked — find a better line later
      subhead:
        "A great product is hard to build — and it still isn't a business. A company also has to get paid, stay legal, talk to its customers, and keep running. Every Kit ships with all of it, built and audited.",
      buckets: [
        {
          title: "The product",
          capability:
            "The AI-native application your customers use, with onboarding and in-app help built in.",
          items: ["AI-native web/mobile app", "User onboarding", "In-app help"],
        },
        {
          title: "A brand and a storefront",
          capability:
            "Launch looking established instead of empty, on day one.",
          items: [
            "Logo & visual identity",
            "Conversion-built landing page",
            "Starter blog & SEO content",
          ],
        },
        {
          title: "A way to get paid",
          capability:
            "Charge customers and see revenue from your first sale.",
          items: [
            "Subscription billing & plans",
            "Invoicing",
            "Automatic failed-payment recovery",
            "Revenue & churn view",
          ],
        },
        {
          title: "Customer communication, run by agents",
          capability:
            "Reach customers and resolve issues without staffing a team.",
          items: [
            "Authenticated email (won't land in spam)",
            "Support channels",
            "AI support & onboarding agents",
          ],
        },
        {
          title: "The standing of a real company",
          capability:
            "The legal and security footing customers (and their lawyers) expect.",
          items: [
            "Terms & privacy policy",
            "Compliance scaffolding",
            "Secure accounts & role-based access",
            "Audit logging",
          ],
        },
        {
          title: "A cockpit to run it",
          capability:
            "Know the business is healthy without watching it.",
          items: [
            "Owner back-office",
            "Product & revenue analytics",
            "Uptime & error monitoring",
          ],
        },
        {
          title: "Live in one click — and staying live",
          capability:
            "Go from purchase to first paying customer.",
          items: [
            "One-click production deploy",
            "Production infrastructure",
            "Launch checklist",
          ],
        },
      ],
    },
    {
      kind: "ai-native",
      id: "ai-native",
      headline: "Not a copy of the old software. The version that couldn't exist until now.",
      productPillar: {
        claim:
          "Built on today's assumptions, with none of the legacy debt — so the manual busywork the old architecture forces on users is simply gone. The claim is about how the software works, not how much it does (no feature-count war with a 20-year incumbent).",
        // working example: Customer Success (first vertical) — validate in vertical session
        beforeAfter: {
          legacy:
            "A CS manager combs usage, tickets, and login data across dozens of accounts to guess which customers are slipping — then hand-writes each check-in.",
          aiNative:
            "The system watches every account continuously, surfaces the ones actually at risk with the why, and drafts the outreach. The manager just approves.",
        },
      },
      operationsPillar: {
        claim:
          "Once it's live, AI agents run support and operations by default — the team you'd otherwise have to hire. So one person can operate what used to take a team.",
        vignettes: [
          { scenario: "A support agent resolves a customer ticket and escalates the edge case to you with full context." },
          { scenario: "An onboarding agent walks a new signup through setup while you sleep." },
          { scenario: "An ops agent flags an anomaly before it becomes an outage." },
        ],
        escalationNote:
          "Agents handle the routine and hand the rest to you, with context — and nothing happens in the dark, because it's all logged. Not an autonomous-employee fantasy.",
      },
      futureGraceNote:
        "And it grows more capable as AI does — but that's a closing grace note, never the lead.",
    },
    {
      kind: "proof",
      id: "proof",
      headline: "See it run before you spend a cent.",
      subhead:
        "Watch the agents work live, and see exactly what every Kit had to pass.",
      sandbox: {
        mode: "curated",
        // working example: Customer Success (first vertical) — validate in vertical session
        scenario:
          "An account's usage quietly drops. The agent catches the signal, assembles the context (who, why, history), drafts a tailored re-engagement email — and when the situation needs a human call, escalates to the owner with a summary instead of sending.",
        showsReasoningSteps: true, // turn latency into transparency
        showsEscalation: true, // show a graceful handoff, not only success
      },
      audit: {
        name: "Programmatic Trust Protocol",
        dimensions: [
          "Security",
          "Responsiveness & accessibility",
          "AI-runtime reliability & latency",
        ],
        mustPassToList: true,
        criteriaInspectable: true, // honest: it's our uniform standard, in the open — not a third-party cert
      },
      costHonestyWeld:
        "Cheap to build (AI) → guided by an expert hand → must pass this audit before you can buy it → and you can watch it behave right now. That sequence is the answer to 'what's the catch,' delivered as evidence.",
    },
    {
      kind: "personas",
      id: "personas",
      headline: "However you got here, you're a founder now.",
      sharedRequirement:
        "You all bring one thing — conviction about a market. (This genuinely isn't for someone with no view on any market.)",
      unifyingFrame:
        "The Kit hands you everything the founder role otherwise demands you build or hire. What differs is your head start.",
      edges: [
        {
          origin: "Came from inside the incumbent?",
          edge: "Your edge is knowing exactly where it's weak — and a market that already trusts you.",
          primary: true,
        },
        {
          origin: "Could build it yourself?",
          edge: "Your edge is going straight to what makes your version different, instead of laying the same foundation a fifth time.",
          primary: false,
        },
        {
          origin: "Just have conviction and no team?",
          edge: "Your edge is starting at all — without the years, the runway, or the hires.",
          primary: false,
        },
      ],
    },
    {
      kind: "how-it-works",
      id: "how-it-works",
      headline: "Pick. Configure. Launch.",
      oldWayItems: [
        "Hire a team",
        "Raise money",
        "Build the product",
        "Wire up billing",
        "Write the legal docs",
        "Set up authenticated email",
        "Build the back-office",
        "Deploy the infrastructure",
        "…and keep going",
      ],
      steps: [
        {
          label: "Pick",
          description: "Browse, choose your vertical, watch it run in the sandbox.",
        },
        {
          label: "Configure",
          description: "Make it yours — name, brand, colors, copy, structure.",
          note: "The LLM-guided configurator does it with you in chat. No code, no developer. This is the beat that answers the insider's real fear.",
        },
        {
          label: "Launch",
          description: "One click to production; it goes live; the agents start working.",
        },
      ],
      scrollContrast: {
        metaphor: "short-distance",
        payoffLine: "That's the whole distance.",
        reducedMotionFallback:
          "Static side-by-side: a tall old-way column vs. three dots.",
      },
      tiers: [
        { name: "Self-service configurator", depth: "Most people. Chat-guided, no code." },
        { name: "Managed service", depth: "Hands-on help for deeper customization." },
        { name: "Source license", depth: "Full ownership and control." },
      ],
      honestyHandoff:
        "…and now you do the part only you can do. We compressed the setup, not the business.",
    },
    {
      kind: "objections",
      id: "objections",
      headline: "Before you decide.",
      founderCredibility: {
        spine:
          "The concept's thesis is that AI still needs an experienced hand. Here's the hand — and the audit that proves it on every Kit.",
        proofPoints: [
          "25 years building production SaaS end to end — ERP, CRM, and BPM platforms, including a Salesforce-like no-code workflow and screen builder.",
          "10 of those years building no-code generation and UI/code tooling — so 'AI plus an experienced hand produces production-grade software' is the craft, not a claim.",
          "Every Kit must pass the automated architecture audit — the per-Kit proof that the hand did its job.",
        ],
      },
      faqs: [
        {
          question: "Won't everyone get the same company I do?",
          answer:
            "The Kit is the foundation, not the differentiation. Two restaurants can buy the same oven; the food is still theirs. Your edge comes from your market knowledge, positioning, customers, brand, and how you configure and extend it.",
          gatedOnDecision:
            "Philosophical answer only, or also structural (limited licenses per vertical/region)? Revenue-model fork — copy bends to the choice.",
        },
        {
          question: "Do I own it, or am I locked into you forever?",
          answer: "[gated] Depends on source-license terms.",
          gatedOnDecision: "Source-license terms (listed as open in the concept doc).",
        },
        {
          question: "After I buy, am I on my own?",
          answer: "[gated] Can't promise support that doesn't exist yet.",
          gatedOnDecision: "Post-purchase support / updates model.",
        },
        {
          question: "Is this just AI slop?",
          answer:
            "AI alone would produce slop — which is exactly why every Kit is built by an experienced hand and must pass an automated architecture audit before it's listed. AI makes it affordable; expertise and verification make it real.",
        },
        {
          question: "How established are you — who else uses this?",
          answer:
            "We're early — and that's the window. Getting in now, before the edge fades, is the advantage (possibly on founding-customer terms). The trust comes from the audit, the track record, and the sandbox you already saw — not from logos we don't pretend to have.",
        },
        {
          question: "Can I really run this without being technical?",
          answer:
            "Configuration is chat-guided, and the agents run support and operations by default. You operate; you don't engineer.",
        },
      ],
    },
    {
      kind: "vision",
      id: "vision",
      headline: "Today, you pick one.",
      stages: [
        { when: "today", verb: "pick", description: "Pick a complete company off the shelf and make it yours." },
        { when: "soon", verb: "request", description: "Request the one you have in mind — your request shapes what gets built next." },
        { when: "eventually", verb: "describe", description: "Describe the business you imagine — and watch the foundation come to life." },
      ],
      moatNote:
        "Each is a new door opening — not today's being a draft. And your edge stays in your market knowledge, which no engine commoditizes.",
    },
    {
      kind: "final-cta",
      id: "final-cta",
      closingLine:
        "The window is open, and the foundation is no longer the hard part. The rest is yours.",
      ctaLine: "Pick your company. Make it yours.",
      primaryCta: { label: "Explore the Kits", action: "explore-kits" },
      secondaryCtas: [
        { label: "Join a waitlist", action: "join-waitlist" },
        { label: "Request a vertical", action: "request-vertical" },
      ],
      thesisCard: {
        teaser:
          "A narrow, extraordinary window — and the people bold enough to step through it.",
        cta: { label: "Read the thesis", action: "read-thesis", newTab: true },
      },
    },
  ],
};
