/**
 * Hero.tsx
 * Top landing section with headline, subhead, and a Calendly CTA.
 *
 * Update:
 * - Removed the tel CTA entirely (as requested earlier).
 * - Calendar button now includes visible text "Book A Strategy Call" to the right of the icon.
 * - Kept outline styling with bg-transparent, ensuring consistency with the design system.
 */

import React from 'react'
import { Button } from '../ui/button'
import { CalendarClock } from 'lucide-react'

/** Props for Hero to allow parent interactions (kept for compatibility) */
export interface HeroProps {
  /** Optional: scroll to pricing/services section (unused here) */
  onContact?: () => void
}

/**
 * Hero
 * Focused hero with headline, subhead, and a labeled Calendly button.
 */
export const Hero: React.FC<HeroProps> = () => {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="cc-container grid items-center gap-8 py-12 md:grid-cols-2 md:py-16">
        {/* Copy */}
        <div>
          <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl">
            Digital Marketing that pairs curiosity with conversion
          </h1>
          <p className="mt-4 text-white/80 md:text-lg">
            Transparent pricing. Local expertise across Canada.
          </p>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/**
             * Calendly button with icon + label.
             * - outline with bg-transparent (project rule)
             * - opens Calendly in a new tab
             * - allow wrapping via whitespace-normal to avoid overflow on very small screens
             */}
            <Button
              asChild
              variant="outline"
              className="bg-transparent text-[var(--cc-green)] hover:text-[var(--cc-green)] hover:border-white/70 whitespace-normal"
              aria-label="Book A Strategy Call on Calendly"
              title="Book A Strategy Call on Calendly"
            >
              <a
                href="https://calendly.com/brentnicolas/strategy-call"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CalendarClock className="h-4 w-4" aria-hidden="true" />
                <span>Book A Strategy Call</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Visual: Cursor Cat Digital logo image */}
        <div className="relative w-full overflow-hidden rounded-xl bg-transparent">
          <img
            src="https://pub-cdn.sider.ai/u/U005HE2JX58/web-coder/6899a124f530328388947327/resource/d37dff25-22d4-4a6d-a562-4864d07b1e01.png"
            alt="Cursor Cat Digital logo"
            className="object-cover w-full h-full"
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
