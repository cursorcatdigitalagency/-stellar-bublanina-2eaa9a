/**
 * QrHero.tsx
 * Conversion-focused hero with neon accents, a tech-forward visual, CTAs, and an embedded lead form.
 * Netlify-enabled: submits via fetch to Netlify Forms and redirects to https://cursorcat.digital/#/thank-you.
 */

import React, { useState } from 'react'
import { Button } from '../../components/ui/button'
import { NeonDivider } from './NeonDivider'
import { Rocket, Phone, User, Mail, Building2 } from 'lucide-react'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { trackEvent } from '../../lib/analytics'

/** Interface for lead form fields */
interface LeadFormValues {
  /** Full name of the lead */
  name: string
  /** Email address for follow-up */
  email: string
  /** Business name */
  business: string
  /** Lead's needs / project details */
  message: string
}

/**
 * encodeForm
 * Builds a URL-encoded body suitable for Netlify form POST.
 */
function encodeForm(data: Record<string, string>): string {
  const params = new URLSearchParams()
  Object.entries(data).forEach(([k, v]) => {
    params.append(k, v)
  })
  return params.toString()
}

/**
 * QrHero
 * Header with bold headline, subhead, primary/secondary CTAs and an embedded lead capture form.
 * The right column includes a hero visual aligned to a futuristic/tech style.
 * The form posts to Netlify via fetch and redirects to the Thank You route.
 */
export const QrHero: React.FC = () => {
  const [values, setValues] = useState<LeadFormValues>({
    name: '',
    email: '',
    business: '',
    message: '',
  })

  /** Handle controlled input changes for the lead form */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  /**
   * Handle form submission
   * Posts to Netlify Forms using application/x-www-form-urlencoded.
   * On success: redirects to https://cursorcat.digital/#/thank-you
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Analytics: attempt to record submit intent
    trackEvent('qr_lead_submit', {
      type: 'form',
      cta: 'qr-lead-submit',
      name: values.name,
      email: values.email,
      business: values.business,
      message_length: values.message.trim().length,
      hash: typeof window !== 'undefined' ? window.location.hash : undefined,
    })

    try {
      // Prepare Netlify form payload
      const body = encodeForm({
        'form-name': 'contact',
        name: values.name,
        email: values.email,
        business: values.business,
        message: values.message,
      })

      // POST to site root for Netlify form handling
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })

      if (res.ok) {
        trackEvent('qr_lead_submit_success', { type: 'form', cta: 'qr-lead-submit' })
        // Redirect to the dedicated Thank You route
        window.location.href = 'https://cursorcat.digital/#/thank-you'
        return
      }

      // Non-OK response: fallback notice
      // eslint-disable-next-line no-console
      console.error('Netlify form submission failed', res.status, await res.text())
      alert('Submission received. If this page did not redirect, we will still follow up within 24 hours.')
    } catch (err) {
      // Network or unexpected error: inform user and keep values for retry
      // eslint-disable-next-line no-console
      console.error('Submission error', err)
      alert('We could not submit right now. Please try again, or call 587-986-3069.')
    }
  }

  return (
    <header className="relative">
      {/* Neon-accent top border */}
      <NeonDivider />

      <section
        id="qr-hero"
        className="cc-container py-10 md:py-14"
        aria-label="Hero: Book a strategy call"
      >
        <div
          className="rounded-2xl p-6 md:p-8 bg-black/70"
          style={{
            border: '1px solid rgba(0,234,255,0.25)',
            boxShadow:
              '0 0 24px rgba(0,234,255,0.18), inset 0 0 12px rgba(57,255,20,0.10)',
          }}
        >
          <div className="grid gap-8 md:grid-cols-2 md:gap-10 items-start">
            {/* Left: headline + CTAs */}
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                <span className="text-white">Get Results.</span>{' '}
                <span className="text-[#39ff14] drop-shadow-[0_0_12px_rgba(57,255,20,0.5)]">
                  Not Predictions.
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-white/80 md:text-lg">
                We help Canadian businesses grow with digital strategies that actually convert.
              </p>

              {/* Hero visual: futuristic dashboard */}
              <div
                className="mt-6 overflow-hidden rounded-xl border border-white/10"
                style={{ boxShadow: '0 0 24px rgba(0,234,255,0.15)' }}
              >
                <img
                  src="https://pub-cdn.sider.ai/u/U005HE2JX58/web-coder/6899a124f530328388947327/resource/72566f52-1702-49a6-b441-9f369a2982b5.jpeg"
                  alt="Futuristic analytics dashboard representing performance growth"
                  className="object-cover w-full h-44 md:h-56"
                />
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {/* Primary CTA — Calendly */}
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-6 text-black font-semibold bg-[#39ff14] hover:bg-[#39ff14] hover:opacity-90"
                  style={{
                    boxShadow:
                      '0 0 24px rgba(57,255,20,0.45), 0 0 40px rgba(57,255,20,0.25)',
                  }}
                  data-cta="qr-hero-book"
                  aria-label="Book a Free Strategy Call"
                  title="Book a Free Strategy Call"
                >
                  <a
                    href="https://calendly.com/brent-cursorcat/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="inline-flex items-center">
                      <Rocket className="mr-2 h-5 w-5" aria-hidden="true" />
                      Book a Free Strategy Call
                    </span>
                  </a>
                </Button>

                {/* Secondary CTA — Call Now */}
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent h-12 px-6 border-[#00eaff] text-[#00eaff] hover:text-[#39ff14] hover:border-[#39ff14]"
                  style={{
                    boxShadow: '0 0 16px rgba(0,234,255,0.35)',
                  }}
                  data-cta="qr-hero-call"
                  aria-label="Call Us Now"
                  title="Call Us Now"
                  asChild
                >
                  <a href="tel:5879863069">
                    <span className="inline-flex items-center">
                      <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                      Call Us Now
                    </span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: lead form card */}
            <div id="lead-form" aria-label="Lead form for free strategy plan">
              <div
                className="rounded-xl p-5 bg-black/70"
                style={{
                  border: '1px solid rgba(57,255,20,0.25)',
                  boxShadow:
                    '0 0 24px rgba(57,255,20,0.20), inset 0 0 12px rgba(0,234,255,0.10)',
                }}
              >
                <h2 className="text-xl font-semibold text-white">
                  Get Your Free Strategy Plan
                </h2>
                <p className="mt-1 text-sm text-white/70">
                  Tell us a bit about your business — we’ll reply within 24 hours.
                </p>

                {/* Netlify-enabled form: visible form mirrors the hidden registration in index.html */}
                <form
                  className="mt-4 space-y-4"
                  onSubmit={handleSubmit}
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  action="https://cursorcat.digital/#/thank-you"
                >
                  {/* Required hidden field for Netlify */}
                  <input type="hidden" name="form-name" value="contact" />
                  {/* Honeypot anti-spam field */}
                  <p className="hidden" aria-hidden="true">
                    <label>Don’t fill this out: <input name="bot-field" /></label>
                  </p>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white/90">Name</Label>
                      <div className="mt-1 relative">
                        <User
                          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40"
                          aria-hidden="true"
                        />
                        <Input
                          id="name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          placeholder="Jane Doe"
                          className="pl-9 bg-black/60 border-white/15 text-white placeholder:text-white/40"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-white/90">Email</Label>
                      <div className="mt-1 relative">
                        <Mail
                          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40"
                          aria-hidden="true"
                        />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className="pl-9 bg-black/60 border-white/15 text-white placeholder:text-white/40"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="business" className="text-white/90">Business Name</Label>
                      <div className="mt-1 relative">
                        <Building2
                          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40"
                          aria-hidden="true"
                        />
                        <Input
                          id="business"
                          name="business"
                          value={values.business}
                          onChange={handleChange}
                          placeholder="Acme Co."
                          className="pl-9 bg-black/60 border-white/15 text-white placeholder:text-white/40"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white/90">What do you need help with?</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={values.message}
                        onChange={handleChange}
                        placeholder="Briefly describe your goals or challenges…"
                        className="mt-1 bg-black/60 border-white/15 text-white placeholder:text-white/40 min-h-[110px] resize-vertical"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 px-6 text-black font-semibold bg-[#00eaff] hover:bg-[#00eaff] hover:opacity-90"
                    style={{
                      boxShadow:
                        '0 0 24px rgba(0,234,255,0.45), 0 0 40px rgba(0,234,255,0.25)',
                    }}
                    data-cta="qr-lead-submit"
                    aria-label="Get My Free Strategy Plan"
                    title="Get My Free Strategy Plan"
                  >
                    Get My Free Strategy Plan
                  </Button>

                  <p className="text-xs text-white/50">
                    By submitting, you agree to be contacted about your request.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neon-accent bottom border */}
      <NeonDivider />
    </header>
  )
}

export default QrHero
