/**
 * Comparison.tsx
 * Simple comparison of DIY vs Typical Agency vs Cursor Cat to clarify positioning.
 */
import React from 'react'
import { Section } from '../Section'
import { Check, X } from 'lucide-react'

/** A single comparison row */
interface Row {
  /** Feature label in plain language */
  label: string
  /** Whether DIY usually has it */
  diy: boolean
  /** Whether Typical Agency usually has it */
  agency: boolean
  /** Whether Cursor Cat has it */
  us: boolean
}

/** Rows kept concise, outcome-oriented, and non-technical */
const ROWS: Row[] = [
  { label: 'Clear lead goals (calls, forms)', diy: false, agency: true, us: true },
  { label: 'Fast tracking fix (days, not weeks)', diy: false, agency: false, us: true },
  { label: 'Local-first approach', diy: false, agency: true, us: true },
  { label: 'Plain-English updates every 2 weeks', diy: false, agency: false, us: true },
  { label: 'No long-term contracts', diy: true, agency: false, us: true },
]

/** Renders a check or an X with proper color */
const Flag: React.FC<{ ok: boolean }> = ({ ok }) =>
  ok ? <Check size={18} className="text-[var(--cc-green)]" /> : <X size={18} className="text-red-400" />

/**
 * Comparison
 * Responsive table that stacks on mobile.
 */
export const Comparison: React.FC = () => {
  return (
    <Section id="comparison">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold md:text-3xl text-white">How we compare</h2>
        <p className="mt-3 text-white/80">Simple, local, and focused on booked jobs—not vanity metrics.</p>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5">
        {/* Header */}
        <div className="grid grid-cols-4 border-b border-white/10 bg-black/40 px-4 py-3 text-sm font-semibold text-white/90">
          <div>What you get</div>
          <div className="text-center">Do‑it‑yourself</div>
          <div className="text-center">Typical agency</div>
          <div className="text-center">Cursor Cat</div>
        </div>

        {/* Rows */}
        <ul className="divide-y divide-white/10">
          {ROWS.map((r) => (
            <li key={r.label} className="grid grid-cols-4 items-center px-4 py-3 text-sm">
              <div className="text-white/90">{r.label}</div>
              <div className="flex justify-center">
                <Flag ok={r.diy} />
              </div>
              <div className="flex justify-center">
                <Flag ok={r.agency} />
              </div>
              <div className="flex justify-center">
                <Flag ok={r.us} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile hint */}
      <p className="mt-3 text-center text-xs text-white/60">On smaller screens, scroll the table sideways if needed.</p>
    </Section>
  )
}

export default Comparison
