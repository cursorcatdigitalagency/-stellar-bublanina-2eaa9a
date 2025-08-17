/**
 * QrFooter.tsx
 * Minimal footer with logo and key contact details (no basic emojis).
 */

import React from 'react'
import { Facebook, Linkedin, Phone, Mail, Globe } from 'lucide-react'

/**
 * QrFooter
 * Single-row footer with logo, contact info, and social links.
 */
export const QrFooter: React.FC = () => {
  return (
    <footer className="bg-black">
      <div className="cc-container flex flex-col items-center justify-between gap-4 py-8 text-center md:flex-row md:text-left">
        {/* Logo placeholder (using existing asset) */}
        <div className="flex items-center gap-3">
          <img
            src="https://pub-cdn.sider.ai/u/U005HE2JX58/web-coder/6899a124f530328388947327/resource/1af9ee99-b849-4b65-ad97-18c5cabf7980.png"
            alt="Cursor Cat Digital logo"
            className="h-8 w-8 rounded object-cover"
          />
          <span className="font-semibold">Cursor Cat Digital</span>
        </div>

        {/* Contacts */}
        <div className="text-sm text-white/80 flex flex-col md:flex-row items-center gap-3">
          <a
            href="tel:5879863069"
            className="hover:underline flex items-center gap-2"
            aria-label="Call 587-986-3069"
            data-cta="footer-phone"
            title="Call 587-986-3069"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>587-986-3069</span>
          </a>
          <span className="hidden md:inline-block text-white/30">·</span>
          <a
            href="mailto:brent@cursorcat.digital"
            className="hover:underline flex items-center gap-2"
            aria-label="Email brent@cursorcat.digital"
            data-cta="footer-email"
            title="Email brent@cursorcat.digital"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span>brent@cursorcat.digital</span>
          </a>
          <span className="hidden md:inline-block text-white/30">·</span>
          <a
            href="https://cursorcat.digital"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-2"
            aria-label="Visit cursorcat.digital"
            data-cta="footer-site"
            title="Visit cursorcat.digital"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            <span>cursorcat.digital</span>
          </a>
        </div>

        {/* Social */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.facebook.com/cursorcatdigitalagency"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="Facebook"
            className="text-white/80 hover:text-[#00eaff]"
            data-cta="footer-facebook"
          >
            <Facebook />
          </a>
          <a
            href="https://www.linkedin.com/in/brentnicolas/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="text-white/80 hover:text-[#00eaff]"
            data-cta="footer-linkedin"
          >
            <Linkedin />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default QrFooter
