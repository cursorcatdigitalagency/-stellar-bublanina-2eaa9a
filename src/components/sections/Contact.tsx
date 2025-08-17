/**
 * Contact section with phone, email, Calendly strategy call link, Google Form link, and Facebook + LinkedIn.
 * CTA updated to "Book a Strategy Call" linking to Calendly in a new tab.
 */
import React from 'react'
import { Section } from '../Section'
import { Button } from '../../components/ui/button'
import { Phone, Mail, Facebook, ExternalLink, Linkedin, CalendarClock } from 'lucide-react'

/**
 * Contact component
 * - Shows primary contact methods and CTAs.
 * - Buttons keep brand green text and outline variant keeps bg-transparent.
 */
export const Contact: React.FC = () => {
  return (
    <Section id="contact" className="bg-[var(--cc-surface)]/60">
      <div className="grid gap-10 md:items-center">
        <div>
          <h2 className="text-2xl font-semibold md:text-3xl">Get in touch</h2>
          <p className="mt-3 text-white/80">We’d love to learn about your goals and map the fastest path to results.</p>

          <div className="mt-6 space-y-3">
            <a href="tel:587-986-3069" className="flex items-center gap-2 text-white hover:text-white/90">
              <Phone size={18} className="text-[var(--cc-green)]" />
              587-986-3069
            </a>
            <a href="mailto:brent@cursorcat.digital" className="flex items-center gap-2 text-white hover:text-white/90">
              <Mail size={18} className="text-[var(--cc-green)]" />
              brent@cursorcat.digital
            </a>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://www.facebook.com/cursorcatdigitalagency"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-white/90"
                aria-label="Open Facebook in a new tab"
              >
                <Facebook size={18} className="text-[var(--cc-green)]" />
                Facebook
                <ExternalLink size={16} className="opacity-70" />
              </a>
              <a
                href="https://www.linkedin.com/in/brentnicolas/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-white/90"
                aria-label="Open LinkedIn in a new tab"
              >
                <Linkedin size={18} className="text-[var(--cc-green)]" />
                LinkedIn
                <ExternalLink size={16} className="opacity-70" />
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {/* Primary CTA: Calendly strategy call */}
            {/* NOTE: Update the Calendly URL if needed. */}
            <a
              href="https://calendly.com/brentnicolas/strategy-call"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a Strategy Call on Calendly"
            >
              <Button variant="outline" className="bg-transparent gap-2 text-[var(--cc-green)] hover:text-[var(--cc-green)]">
                <CalendarClock size={18} /> Book a Strategy Call
              </Button>
            </a>

            {/* Secondary CTA: Intake form (this might be hidden globally by IntakeButtonHider based on label) */}
            <a
              href="https://forms.gle/VH9xJ5aqAHXTAnBh6"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Google Form in a new tab"
            >
              <Button variant="outline" className="bg-transparent gap-2 text-[var(--cc-green)]">
                Start intake form
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Contact
