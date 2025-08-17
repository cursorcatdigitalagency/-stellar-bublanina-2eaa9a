/**
 * QrValueProps.tsx
 * Concise value proposition bullets with simple illustrative icons.
 */

import React from 'react'
import { NeonDivider } from './NeonDivider'
import { Wand2, Target, Flag } from 'lucide-react'

/** Single value item interface */
interface ValueItem {
  /** Icon component for the value */
  Icon: React.ComponentType<{ className?: string; size?: number }>
  /** Title/description */
  text: string
}

/** Value items aligned to brief and conversion copy */
const VALUES: ValueItem[] = [
  { Icon: Wand2, text: 'No cookie-cutter marketing — we tailor to your goals.' },
  { Icon: Target, text: 'Funnels & ads built to convert, not just look pretty.' },
  { Icon: Flag, text: 'Local, reliable, and focused on Canadian businesses.' },
]

/**
 * QrValueProps
 * Three bullet points with neon accents and clear spacing.
 */
export const QrValueProps: React.FC = () => {
  return (
    <section aria-label="Why choose Cursor Cat Digital">
      <div className="cc-container py-10">
        <h2 className="text-center text-2xl md:text-3xl font-semibold">
          <span className="text-white">Why businesses choose</span>{' '}
          <span className="text-[#00eaff]">Cursor Cat Digital</span>
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {VALUES.map(({ Icon, text }) => (
            <div
              key={text}
              className="rounded-xl p-5 bg-black/60 border border-white/10"
              style={{ boxShadow: 'inset 0 0 12px rgba(0,234,255,0.08)' }}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-md p-2"
                  style={{ background: 'rgba(57,255,20,0.12)', boxShadow: '0 0 12px rgba(57,255,20,0.25)' }}
                  aria-hidden="true"
                >
                  <Icon className="text-[#39ff14]" />
                </div>
                <p className="text-white/90">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <NeonDivider />
    </section>
  )
}

export default QrValueProps
