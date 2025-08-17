/**
 * HowWeWork section
 * Plain‑English, 3‑step overview of the first 90 days to help non‑marketers understand the plan.
 * Avoids jargon, adds clear outcomes per step, and includes a small glossary note.
 */
import React from 'react'
import { Section } from '../Section'
import { Wand2, Rocket, Gauge, CheckCircle2, HelpCircle } from 'lucide-react'

/** A single step in the plan with copy and an icon */
interface Step {
  /** Step title in plain language */
  title: string
  /** Timeframe label like "Weeks 1–2" */
  timeframe: string
  /** Short, simple bullets */
  points: string[]
  /** The clear outcome the client can expect from this step */
  outcome: string
  /** Lucide icon component for the step */
  Icon: React.ComponentType<{ size?: number; className?: string }>
}

/** Step card component rendering one step with icon and simple bullets */
const StepCard: React.FC<{ step: Step }> = ({ step }) => {
  return (
    <li className="rounded-lg border border-white/10 bg-white/5 p-5">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500/15">
          <step.Icon size={18} className="text-[var(--cc-green)]" />
        </div>
        <div>
          <p className="font-semibold text-white">{step.title}</p>
          <p className="text-xs text-white/70">{step.timeframe}</p>
        </div>
      </div>

      <ul className="space-y-2">
        {step.points.map((p) => (
          <li key={p} className="flex gap-2 text-sm text-white/90">
            <CheckCircle2 size={18} className="mt-0.5 text-[var(--cc-green)]" /> {p}
          </li>
        ))}
      </ul>

      <p className="mt-3 rounded-md border border-white/10 bg-black/30 p-3 text-sm">
        <span className="font-medium text-white/90">Outcome: </span>
        <span className="text-white/80">{step.outcome}</span>
      </p>
    </li>
  )
}

/** Three simple steps with non‑technical wording */
const STEPS: Step[] = [
  {
    title: 'Get set up the right way',
    timeframe: 'Weeks 1–2',
    points: [
      'We make sure every call and form is counted correctly.',
      'Set a simple target (e.g., cost per lead or booked calls).',
      'Agree on your offer, message, and next steps.',
    ],
    outcome: 'A clean starting line and a shared goal, so we know what “good” looks like.',
    Icon: Wand2,
  },
  {
    title: 'Launch and learn',
    timeframe: 'Weeks 3–4',
    points: [
      'Publish a focused landing page that answers “why you”.',
      'Run first ads on Google/Meta aimed at calls and forms.',
      'Try 2–3 messages to see what actually gets bites.',
    ],
    outcome: 'Early results and clear signals about what your market responds to.',
    Icon: Rocket,
  },
  {
    title: 'Improve what works',
    timeframe: 'Weeks 5–12',
    points: [
      'Every 2 weeks: keep the winners, cut the losers.',
      'Shift budget toward the best keywords, ads, and pages.',
      'Share a plain‑English report with “what changed” and “what’s next”.',
    ],
    outcome: 'Lower cost per lead and more booked jobs, with simple reporting you can skim.',
    Icon: Gauge,
  },
]

/**
 * HowWeWork
 * Render steps in friendly cards with a short glossary note to demystify terms.
 */
export const HowWeWork: React.FC = () => {
  return (
    <Section id="process" className="bg-[var(--cc-surface)]/60">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-semibold md:text-3xl text-white">How we work (first 90 days)</h2>
        <p className="mt-3 text-white/80">No buzzwords. Three simple steps to real results.</p>
      </div>

      <ol className="mx-auto max-w-3xl space-y-6">
        {STEPS.map((s) => (
          <StepCard key={s.title} step={s} />
        ))}
      </ol>

      {/* Tiny glossary in plain English to clarify common terms without jargon */}
      <div className="mx-auto mt-8 max-w-3xl rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/80">
        <p className="mb-2 flex items-center gap-2 font-medium text-white/90">
          <HelpCircle size={16} className="text-[var(--cc-green)]" />
          Quick plain‑English notes
        </p>
        <ul className="grid gap-2 md:grid-cols-2">
          <li>
            <span className="font-medium text-white">Tracking:</span> making sure calls and forms are counted so you can see which
            ads and pages actually work.
          </li>
          <li>
            <span className="font-medium text-white">Landing page:</span> a single page built to turn visitors into leads—no fluff.
          </li>
          <li>
            <span className="font-medium text-white">Experiment:</span> try a new headline, image, or audience and keep the winner.
          </li>
          <li>
            <span className="font-medium text-white">Report:</span> a short summary of what we did, what improved, and what’s next.
          </li>
        </ul>
      </div>
    </Section>
  )
}
