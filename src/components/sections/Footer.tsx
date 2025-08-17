/**
 * Footer section with contact info and social links.
 * Behavior:
 * - Mobile (under md): Social icons are hidden.
 * - Desktop (md and up): Social icons are visible.
 * - Mobile clearance: Adds extra bottom padding so the footer content sits above the sticky MobileCtaBar.
 */

import React from 'react'
import { Facebook, Linkedin } from 'lucide-react'

/**
 * Footer component
 * Shows brand snippet, contact info, and social links (desktop only).
 */
export const Footer: React.FC = () => {
  // Current year for copyright
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-black">
      {/* Add larger bottom padding on mobile so footer clears the sticky CTA bar */}
      <div className="cc-container flex flex-col items-center gap-4 pt-10 pb-24 text-center md:flex-row md:justify-between md:text-left md:py-10">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img
            src="https://pub-cdn.sider.ai/u/U005HE2JX58/web-coder/6899a124f530328388947327/resource/1af9ee99-b849-4b65-ad97-18c5cabf7980.png"
            alt="Cursor Cat Digital logo"
            className="h-8 w-8 rounded object-cover"
          />
          <div>
            <p className="font-semibold">Cursor Cat Digital</p>
            <p className="text-xs text-white/70">Where curiosity meets creativity &amp; conversion</p>
          </div>
        </div>

        {/* Contact info */}
        <div className="text-sm">
          <p>
            <a href="tel:587-986-3069" className="hover:underline">587-986-3069</a> ·{' '}
            <a href="mailto:brent@cursorcat.digital" className="hover:underline">brent@cursorcat.digital</a>
          </p>
          <p className="mt-1 text-white/70">© {year} Cursor Cat Digital. All rights reserved.</p>
        </div>

        {/* Social icons: hidden on mobile, visible on desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.facebook.com/cursorcatdigitalagency"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white/80 hover:text-white"
            title="Facebook"
          >
            <Facebook />
          </a>
          <a
            href="https://www.linkedin.com/in/brentnicolas/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white/80 hover:text-white"
            title="LinkedIn"
          >
            <Linkedin />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
