/**
 * QrFinalCta.tsx
 * Final conversion prompt with a strong CTA (no basic emojis).
 */

import React from 'react'
import { NeonDivider } from './NeonDivider'
import { Button } from '../../components/ui/button'
import { Goal } from 'lucide-react'

/**
 * QrFinalCta
 * Reinforces urgency and provides a bright, centered CTA.
 */
export const QrFinalCta: React.FC = () => {
  return (
    <section id="closer" aria-label="Final Call To Action" className="bg-black">
      <div className="cc-container py-12 md:py-16">
        <h3 className="text-center text-2xl md:text-3xl font-bold">
          <span className="text-white">Your competitors are already advertising.</span>{' '}
          <span className="text-[#00eaff]">Are you?</span>
        </h3>

        <div className="mt-7 flex justify-center">
          <Button
            asChild
            size="lg"
            className="h-12 px-6 text-black font-semibold bg-[#39ff14] hover:bg-[#39ff14] hover:opacity-90"
            style={{
              boxShadow: '0 0 24px rgba(57,255,20,0.45), 0 0 40px rgba(57,255,20,0.25)',
            }}
            data-cta="qr-closer-growth-plan"
            aria-label="Let's Build Your Growth Plan"
            title="Let's Build Your Growth Plan"
          >
            <a
              href="https://calendly.com/brent-cursorcat/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="inline-flex items-center">
                <Goal className="mr-2 h-5 w-5" aria-hidden="true" />
                Let’s Build Your Growth Plan
              </span>
            </a>
          </Button>
        </div>
      </div>
      <NeonDivider />
    </section>
  )
}

export default QrFinalCta
