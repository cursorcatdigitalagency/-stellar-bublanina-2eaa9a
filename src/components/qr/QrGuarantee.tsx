/**
 * QrGuarantee.tsx
 * Prominent guarantee / risk reversal to increase trust and conversions.
 */

import React from 'react'
import { ShieldCheck, BadgeCheck, HeartHandshake } from 'lucide-react'
import { NeonDivider } from './NeonDivider'

/**
 * QrGuarantee
 * Highlights key trust factors with neon accents.
 */
export const QrGuarantee: React.FC = () => {
  return (
    <section aria-label="Our guarantee" className="bg-black">
      <div className="cc-container py-12">
        <div
          className="rounded-2xl p-6 md:p-8 bg-black/70"
          style={{
            border: '1px solid rgba(57,255,20,0.25)',
            boxShadow:
              '0 0 24px rgba(57,255,20,0.20), inset 0 0 12px rgba(0,234,255,0.10)',
          }}
        >
          <h2 className="text-center text-2xl md:text-3xl font-semibold">
            <span className="text-white">Our</span>{' '}
            <span className="text-[#39ff14]">Guarantee</span>
          </h2>

          {/* Grid of guarantees: using 3 columns on md+ for visual balance */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {/* No long-term contracts */}
            <div
              className="rounded-xl p-5 bg-black/60 border border-white/10"
              style={{ boxShadow: 'inset 0 0 12px rgba(57,255,20,0.10)' }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 rounded-md p-2"
                  style={{
                    background: 'rgba(57,255,20,0.12)',
                    boxShadow: '0 0 12px rgba(57,255,20,0.25)',
                  }}
                  aria-hidden="true"
                >
                  <ShieldCheck className="text-[#39ff14]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">No long-term contracts</h3>
                  <p className="text-white/80 text-sm mt-1">
                    We earn your business every month.
                  </p>
                </div>
              </div>
            </div>

            {/* 90-day results or walk away */}
            <div
              className="rounded-xl p-5 bg-black/60 border border-white/10"
              style={{ boxShadow: 'inset 0 0 12px rgba(0,234,255,0.10)' }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 rounded-md p-2"
                  style={{
                    background: 'rgba(0,234,255,0.12)',
                    boxShadow: '0 0 12px rgba(0,234,255,0.25)',
                  }}
                  aria-hidden="true"
                >
                  <BadgeCheck className="text-[#00eaff]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">90-day results or walk away</h3>
                  <p className="text-white/80 text-sm mt-1">
                    If you don’t see measurable results in 90 days, fire us.
                  </p>
                </div>
              </div>
            </div>

            {/* Outcome-focused promise - retitled to no-nonsense tone */}
            <div
              className="rounded-xl p-5 bg-black/60 border border-white/10"
              style={{ boxShadow: 'inset 0 0 12px rgba(0,234,255,0.10)' }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 rounded-md p-2"
                  style={{
                    // Changed to white background/halo as requested
                    background: 'rgba(255,255,255,0.12)',
                    boxShadow: '0 0 12px rgba(255,255,255,0.25)',
                  }}
                  aria-hidden="true"
                >
                  {/* Icon color changed to white */}
                  <HeartHandshake className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">No Nonsense, Just Results</h3>
                  <p className="text-white/80 text-sm mt-1">
                    We focus on what matters—outcomes over vanity metrics—so you grow with clarity and confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>      
      </div>
      <NeonDivider />
    </section>
  )
}

export default QrGuarantee
