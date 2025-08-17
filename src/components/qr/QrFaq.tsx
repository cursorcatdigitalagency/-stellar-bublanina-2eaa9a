/**
 * QrFaq.tsx
 * FAQ section addressing common objections with clear, concise answers.
 */

import React from 'react'
import { NeonDivider } from './NeonDivider'
import { HelpCircle } from 'lucide-react'

/** Single QA item type */
interface QA {
  /** Question text */
  q: string
  /** Answer text */
  a: string
}

/** Commonly asked questions for QR traffic */
const FAQS: QA[] = [
  {
    q: 'How fast can I see results?',
    a: 'Many campaigns begin generating leads within 2–4 weeks. Timelines vary by industry, offer, and budget, but we prioritize quick, measurable wins and optimize continuously.',
  },
  {
    q: 'What industries do you work with?',
    a: 'We partner with storefronts, trades, and startups across Canada. If your audience is online, we can help you reach them efficiently.',
  },
  {
    q: 'What makes Cursor Cat different from big agencies?',
    a: 'We’re lean, transparent, and focused on outcomes—not vanity metrics. You get direct access, faster execution, and strategies tailored to your goals.',
  },
]

/**
 * QrFaq
 * Uses native details/summary for accessibility; styled with neon accents.
 */
export const QrFaq: React.FC = () => {
  return (
    <section aria-label="Frequently Asked Questions" className="bg-black">
      <div className="cc-container py-12">
        <h2 className="text-center text-2xl md:text-3xl font-semibold">
          <span className="text-white">Frequently Asked</span>{' '}
          <span className="text-[#00eaff]">Questions</span>
        </h2>

        <div className="mt-8 space-y-3">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl bg-black/60 border border-white/10"
              style={{ boxShadow: 'inset 0 0 12px rgba(0,234,255,0.08)' }}
            >
              <summary className="flex cursor-pointer items-center gap-3 p-5 select-none">
                <HelpCircle className="h-5 w-5 text-[#00eaff]" aria-hidden="true" />
                <span className="font-medium text-white">{item.q}</span>
                <span className="ml-auto text-white/40 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-5 pb-5 text-white/80 text-sm">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
      <NeonDivider />
    </section>
  )
}

export default QrFaq
