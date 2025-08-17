/**
 * Sticky top navigation bar with responsive mobile menu
 * - Desktop: inline navigation with active section highlighting
 * - Mobile: hamburger icon toggles a dropdown panel with nav items
 * - Smooth-scroll for in-page sections; "Form" routes to #/qr
 *
 * Note: Brand text next to the logo has been removed per request.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Phone, Mail, Facebook, Linkedin, Menu, X } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'

/** Navigation item shape */
interface NavItem {
  /** Unique id (used for section tracking) */
  id: string
  /** Visible label */
  label: string
  /** Optional href; if present, item navigates rather than smooth-scroll */
  href?: string
}

/**
 * Navigation items
 * Note: "Form" points to the landing page route (#/qr) instead of in-page scroll.
 */
const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'process', label: 'Process' },
  { id: 'services', label: 'Pricing' },
  { id: 'calculator', label: 'Rate Calculator' },
  { id: 'form', label: 'Form', href: '#/qr' }, // External route to landing page form
]

/**
 * MobileMenuPanel
 * A mobile-only dropdown panel displayed under the header when open.
 */
const MobileMenuPanel: React.FC<{
  open: boolean
  items: NavItem[]
  activeId?: string
  onItemClick: (item: NavItem) => void
  onDismiss: () => void
}> = ({ open, items, activeId, onItemClick, onDismiss }) => {
  // Early exit to avoid rendering when closed (saves DOM / perf)
  if (!open) return null

  return (
    <>
      {/* Backdrop overlay - click to dismiss */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[1px] md:hidden z-40"
        aria-hidden="true"
        onClick={onDismiss}
      />
      {/* Dropdown panel anchored below header (h-16) */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="md:hidden fixed top-16 left-0 right-0 z-50 origin-top animate-in fade-in slide-in-from-top-2 duration-200"
      >
        <div className="mx-3 rounded-xl border border-white/10 bg-black/90 shadow-xl">
          <nav className="flex flex-col py-2">
            {items.map((item) => {
              const isActive = !item.href && activeId === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onItemClick(item)}
                  className={`text-left px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cc-green)] rounded-md mx-2 my-1 ${
                    isActive
                      ? 'text-[var(--cc-green)] bg-white/5'
                      : 'text-white/85 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}

/**
 * Navbar
 * Renders sticky header with logo, nav links, contact info, and a mobile hamburger menu.
 * - Desktop: inline nav buttons; "Form" uses an external hash-route link.
 * - Mobile: hamburger toggles a dropdown panel; overlay click/ESC to close; body scroll is locked while open.
 */
export const Navbar: React.FC = () => {
  // Only track sections that actually scroll on the main page (exclude "form" external link)
  const trackableIds = useMemo(() => NAV_ITEMS.filter((n) => !n.href).map((n) => n.id), [])
  const active = useActiveSection(trackableIds)

  /** Handles smooth scroll to a section by id with small offset for sticky header */
  const handleScroll = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 76 // offset for navbar height
    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [])

  // Mobile menu open/close state
  const [mobileOpen, setMobileOpen] = useState(false)

  /** Close the mobile menu safely */
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  /** Handle item click for both smooth-scroll and external link */
  const handleItemClick = useCallback(
    (item: NavItem) => {
      if (item.href) {
        // Navigate to external hash route
        setMobileOpen(false)
        window.location.href = item.href
      } else {
        setMobileOpen(false)
        handleScroll(item.id)
      }
    },
    [handleScroll]
  )

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    const original = document.body.style.overflow
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = original || ''
    }
    return () => {
      document.body.style.overflow = original || ''
    }
  }, [mobileOpen])

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobile()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeMobile])

  // Auto-close if viewport resizes to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) closeMobile()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [closeMobile])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/70 backdrop-blur">
      <div className="cc-container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="https://pub-cdn.sider.ai/u/U005HE2JX58/web-coder/6899a124f530328388947327/resource/1af9ee99-b849-4b65-ad97-18c5cabf7980.png"
            alt="Cursor Cat Digital logo"
            className="h-8 w-8 rounded object-cover"
          />
          {/* Brand text removed per request */}
        </div>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-4 md:flex">
          {NAV_ITEMS.map((item) => {
            // If href exists, render as an anchor that navigates to the landing page route.
            if (item.href) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              )
            }
            // Otherwise, render as a smooth-scroll button to in-page sections.
            return (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className={`text-sm transition-colors ${
                  active === item.id ? 'text-[var(--cc-green)]' : 'text-white/80 hover:text-white'
                }`}
                aria-current={active === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Right side: contact icons + social + mobile hamburger */}
        <div className="flex items-center gap-2">
          <a href="tel:587-986-3069" className="hidden text-white/80 hover:text-white md:flex items-center gap-1 text-sm">
            <Phone size={16} className="text-[var(--cc-green)]" />
            587-986-3069
          </a>
          <a
            href="mailto:brent@cursorcat.digital"
            className="hidden text-white/80 hover:text-white md:flex items-center gap-1 text-sm"
          >
            <Mail size={16} className="text-[var(--cc-green)]" />
            brent@cursorcat.digital
          </a>
          {/* Social icons: now visible on mobile and desktop */}
          <a
            href="https://www.facebook.com/cursorcatdigitalagency"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="inline-flex ml-2 text-white/80 hover:text-white"
            title="Follow us on Facebook"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/brentnicolas/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex text-white/80 hover:text-white"
            title="LinkedIn"
          >
            <Linkedin size={20} />
          </a>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-black/60 text-white/90 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cc-green)]"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            title={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile-only dropdown menu */}
      <MobileMenuPanel
        open={mobileOpen}
        items={NAV_ITEMS}
        activeId={active}
        onItemClick={handleItemClick}
        onDismiss={closeMobile}
      />
    </header>
  )
}

export default Navbar
