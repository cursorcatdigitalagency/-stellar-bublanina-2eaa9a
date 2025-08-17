/**
 * ThankYou.tsx
 * Dedicated thank-you page shown after successful Netlify form submission.
 * - Branded neon styling consistent with QR landing.
 * - Shows a custom, branded toast on mount.
 */

import React, { useEffect } from 'react'
import { Button } from '../components/ui/button'
import { NeonDivider } from '../components/qr/NeonDivider'
import { PartyPopper, Goal, Home } from 'lucide-react'
import { toast } from 'sonner'

/** Props for ThankYou page (none currently) */
export interface ThankYouProps {}

/**
 * ThankYou
 * Displays a confirmation message and primary next steps.
 * Also triggers a custom branded toast on mount.
 */
const ThankYou: React.FC<ThankYouProps> = () => {
  useEffect(() => {
    // Update title for clarity
    document.title = 'Thanks — Cursor Cat Digital'

    // Branded custom toast with neon accent
    toast.custom(
      () => (
        <div
          role="status"
          className="relative overflow-hidden rounded-lg border border-white/10 bg-black/80 text-white shadow-lg"
          style={{ boxShadow: '0 0 24px rgba(0,234,255,0.25)' }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, rgba(57,255,20,0.14), rgba(0,234,255,0.14))',
              mixBlendMode: 'overlay',
              opacity: 0.6,
            }}
            aria-hidden="true"
          />
          <div className="relative flex items-start gap-3 p-4">
            <div
              className="rounded-md p-2"
              style={{ background: 'rgba(57,255,20,0.12)', boxShadow: '0 0 12px rgba(57,255,20,0.25)' }}
              aria-hidden="true"
            >
              <PartyPopper className="h-5 w-5 text-[#39ff14]" />
            </div>
            <div>
              <div className="font-semibold">Thanks! Welcome to Cursor Cat Digital</div>
              <div className="text-sm text-white/80">
                We received your request. We’ll get back to you within 24 hours.
                Prefer faster? Call 587-986-3069.
              </div>
            </div>
          </div>
        </div>
      ),
      {
        duration: 6000,
        position: 'top-center',
      }
    )
  }, [])

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Top neon divider */}
      <NeonDivider />

      <main className="cc-container py-12 md:py-16">
        <section
          aria-label="Thank you confirmation"
          className="mx-auto max-w-3xl rounded-2xl bg-black/70 p-6 md:p-8"
          style={{
            border: '1px solid rgba(0,234,255,0.25)',
            boxShadow:
              '0 0 24px rgba(0,234,255,0.18), inset 0 0 12px rgba(57,255,20,0.10)',
          }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            <span className="text-white">Thanks for reaching out.</span>{' '}
            <span className="text-[#00eaff]">We’re on it.</span>
          </h1>

          <p className="mt-3 text-center text-white/80">
            Your submission was received successfully. A member of our team will follow up within 24 hours.
            If you’d like to jump ahead, you can book a strategy call now.
          </p>

          <div
            className="mt-8 overflow-hidden rounded-xl border border-white/10"
            style={{ boxShadow: '0 0 24px rgba(57,255,20,0.15)' }}
          >
            <img
              src="https://pub-cdn.sider.ai/u/U005HE2JX58/web-coder/6899a124f530328388947327/resource/41b24055-12f5-4945-a713-aec18c25590d.jpg"
              alt="Neon grid backdrop"
              className="object-cover w-full h-44 md:h-56"
            />
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 px-6 text-black font-semibold bg-[#39ff14] hover:bg-[#39ff14] hover:opacity-90"
              style={{ boxShadow: '0 0 24px rgba(57,255,20,0.45), 0 0 40px rgba(57,255,20,0.25)' }}
              data-cta="thankyou-book"
              aria-label="Book a Strategy Call"
              title="Book a Strategy Call"
            >
              <a href="https://calendly.com/brent-cursorcat/30min" target="_blank" rel="noopener noreferrer">
                <span className="inline-flex items-center">
                  <Goal className="mr-2 h-5 w-5" aria-hidden="true" />
                  Book a Strategy Call
                </span>
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent h-12 px-6 border-[#00eaff] text-[#00eaff] hover:text-[#39ff14] hover:border-[#39ff14]"
              data-cta="thankyou-home"
              aria-label="Back to Home"
              title="Back to Home"
            >
              <a href="#/">
                <span className="inline-flex items-center">
                  <Home className="mr-2 h-5 w-5" aria-hidden="true" />
                  Back to Home
                </span>
              </a>
            </Button>
          </div>
        </section>
      </main>

      {/* Bottom neon divider */}
      <NeonDivider />
    </div>
  )
}

export default ThankYou
