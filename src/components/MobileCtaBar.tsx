/**
 * MobileCtaBar.tsx
 * Sticky bottom bar on small screens with:
 * - Primary outlined CTA (tel link). Text is allowed to wrap to stay inside the box.
 * - Small calendar outlined button linking to Calendly (icon-only).
 * Mobile-only, fixed at the bottom of the screen.
 */

import React from 'react'
import { Button } from './ui/button'
import { Phone, CalendarClock } from 'lucide-react'

/** Props for MobileCtaBar kept for compatibility */
export interface MobileCtaBarProps {
  onBook?: () => void
  onPricing?: () => void
}

/**
 * MobileCtaBar
 * Fixed bottom bar with clear phone CTA and a compact Calendly button.
 * Visual notes:
 * - All outline buttons include bg-transparent per project rule.
 * - Main button text wraps and stays centered on small screens to stay inside the box.
 */
export const MobileCtaBar: React.FC<MobileCtaBarProps> = () => {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[var(--cc-surface)]/90 backdrop-blur md:hidden"
      role="region"
      aria-label="Mobile quick actions"
    >
      <div className="cc-container py-2">
        {/* Two actions: main CTA (flex-1) + small calendar icon button */}
        <div className="flex items-center gap-2">
          {/* Main outlined CTA: allow wrapping so the text stays inside the border */}
          <Button
            asChild
            variant="outline"
            className="flex-1 bg-transparent text-[var(--cc-green)] hover:text-[var(--cc-green)] hover:border-white/70"
            aria-label="Call Or Text Us Now"
            title="Call Or Text Us Now"
          >
            <a
              href="tel:587-986-3069"
              className="block text-center"
              style={{
                whiteSpace: 'normal',
                overflowWrap: 'anywhere',
              }}
            >
              <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
              {/* The runtime helper may update this visible copy to 'Book A Strategy Call'. Wrapping stays intact. */}
              Call Or Text Us Now
            </a>
          </Button>

          {/* Small calendar button (icon-only) opening Calendly in a new tab */}
          <Button
            asChild
            variant="outline"
            size="icon"
            className="bg-transparent text-[var(--cc-green)] hover:text-[var(--cc-green)] hover:border-white/70"
            aria-label="Book a Strategy Call on Calendly"
            title="Book a Strategy Call on Calendly"
          >
            <a
              href="https://calendly.com/brentnicolas/strategy-call"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarClock className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Book a Strategy Call</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MobileCtaBar
