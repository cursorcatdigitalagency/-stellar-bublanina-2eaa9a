/**
 * About section with brief intro, mission, and strengths.
 */
import React from 'react'
import { Section } from '../Section'
import { Check } from 'lucide-react'

export const About: React.FC = () => {
  const bullets = [
    'Data-informed decisions with clear reporting',
    'Transparent, flat-rate pricing and scopes',
    'Conversion-focused design and funnels',
    'Lean, responsive support and fast turnaround',
  ]
  return (
    <Section id="about" className="bg-[var(--cc-surface)]/60">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-2xl font-semibold md:text-3xl">About Cursor Cat Digital</h2>
          <p className="mt-4 text-white/80">
            We help small and growing businesses build systems that attract, convert, and delight customers. Our team
            blends creative thinking with rigorous testing so every decision moves the needle.
          </p>
          <p className="mt-3 text-white/80">
            From social content and branding to high-converting websites, e‑commerce funnels, and analytics—our work is
            built on clarity, speed, and measurable results.
          </p>
        </div>

        <ul className="space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <Check className="mt-1 text-[var(--cc-green)]" size={20} />
              <span className="text-white/90">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
