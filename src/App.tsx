/**
 * App.tsx
 * Main routing setup using React Router v7 Data Router with a HashRouter.
 * This avoids runtime export issues on Netlify and provides a safe fallback.
 * Adds a tiny global style injector to hide a specific QR CTA button without touching feature components.
 * Adds runtime helpers:
 *  - IntakeButtonHider: removes any "Start intake form" buttons.
 *  - CtaTextUpdater: renames "Schedule Your Strategy Call" CTA to "Book A Strategy Call" and keeps it centered on mobile.
 * Mounts the Sonner Toaster globally to enable toast notifications across routes.
 */

import React, { useEffect } from 'react'
import { createHashRouter, RouterProvider } from 'react-router'
import HomePage from './pages/Home'
import QrLandingPage from './pages/QrLanding'
import Favicon from './components/Favicon'
import QrCodeTool from './pages/QrCodeTool'
import ThankYou from './pages/ThankYou'
import { Toaster } from 'sonner'

/**
 * HidingStyles
 * Injects a small global CSS rule to hide the specific "Talk to Us About Your Business Goals" anchor.
 * Targets both the data-cta attribute and the href="#lead-form" as a safeguard.
 * Also centers the Strategy Call CTA on mobile and ensures text wraps inside the outlined box.
 */
const HidingStyles: React.FC = () => {
  return (
    <style
      // Using inline CSS to avoid overwriting unknown component files or global.css
      dangerouslySetInnerHTML={{
        __html: `
/* Hide the QR services talk CTA button globally */
a[data-cta="qr-services-talk"],
a[href="#lead-form"] {
  display: none !important;
}

/* Center/wrap the Strategy Call CTA on mobile only */
@media (max-width: 767px) {
  /* Support both the old and new aria-labels */
  a[aria-label="Schedule Your Strategy Call"],
  button[aria-label="Schedule Your Strategy Call"],
  a[aria-label="Book A Strategy Call"],
  button[aria-label="Book A Strategy Call"] {
    display: block !important;       /* ensure margin auto works */
    margin-left: auto !important;    /* center horizontally */
    margin-right: auto !important;   /* center horizontally */
    align-self: center !important;   /* works inside flex parents */
    text-align: center !important;   /* ensure text aligns centrally */
    white-space: normal !important;  /* allow wrapping so text stays inside border */
    overflow-wrap: anywhere;         /* break long words if needed */
    max-width: 90vw;                 /* keep it inside viewport on very small screens */
  }
}
        `.trim(),
      }}
    />
  )
}

/**
 * IntakeButtonHider
 * Runtime DOM watcher that removes any button (or role="button" anchor) whose visible text
 * is exactly "Start intake form" (case-insensitive).
 * This avoids editing unknown feature files and prevents regressions.
 */
const IntakeButtonHider: React.FC = () => {
  useEffect(() => {
    // Early return for non-browser environments
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    /** Hide any matching "Start intake form" buttons currently in the DOM */
    const hideNow = (): void => {
      // We target <button> and <a role="button"> for robustness
      const candidates = Array.from(
        document.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>('button, a[role="button"]')
      )
      candidates.forEach((el) => {
        // Normalize text content for a stable comparison
        const label = (el.textContent || '').trim().toLowerCase()
        if (label === 'start intake form') {
          // Hide element without removing from the DOM; maintain accessibility hint
          el.setAttribute('aria-hidden', 'true')
          ;(el as HTMLElement).style.display = 'none'
        }
      })
    }

    // Initial hide on mount
    hideNow()

    // Observe future DOM mutations to hide if it renders later
    const observer = new MutationObserver(() => hideNow())
    observer.observe(document.body, { childList: true, subtree: true })

    // Cleanup observer on unmount
    return () => observer.disconnect()
  }, [])

  // This helper renders nothing
  return null
}

/**
 * CtaTextUpdater
 * Renames any CTA labeled "Schedule Your Strategy Call" to "Book A Strategy Call"
 * while preserving SVG icons and structure. Also aligns aria-label/title for consistency.
 */
const CtaTextUpdater: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    /**
     * Replace the visible text node (not SVG) with the desired copy.
     * - Keeps existing SVGs untouched.
     * - Updates aria-label and title for accessibility and consistency.
     */
    const updateCtaText = (): void => {
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>(
          'a[aria-label="Schedule Your Strategy Call"], button[aria-label="Schedule Your Strategy Call"], a[title="Schedule Your Strategy Call"], button[title="Schedule Your Strategy Call"]'
        )
      )

      targets.forEach((el) => {
        // Update attributes
        el.setAttribute('aria-label', 'Book A Strategy Call')
        el.setAttribute('title', 'Book A Strategy Call')

        // Find an existing meaningful text node to replace
        let replaced = false
        el.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = (node.nodeValue || '').trim()
            if (text.length > 0) {
              node.nodeValue = 'Book A Strategy Call'
              replaced = true
            }
          }
        })

        // If no text node existed (e.g., only icon), append a spaced text node
        if (!replaced) {
          el.appendChild(document.createTextNode(' Book A Strategy Call'))
        }
      })
    }

    // Run immediately
    updateCtaText()

    // Keep it robust against re-renders
    const observer = new MutationObserver(() => updateCtaText())
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return null
}

/**
 * router
 * Defines app routes for Hash-based navigation.
 * Includes a catch-all that redirects to Home to avoid blank states.
 */
const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/qr',
    element: <QrLandingPage />,
  },
  {
    path: '/qr-code',
    element: <QrCodeTool />,
  },
  {
    path: '/thank-you',
    element: <ThankYou />,
  },
  {
    // Fallback for any unknown hash path: send to Home
    path: '*',
    element: <HomePage />,
  },
])

/**
 * App
 * Provides the router with a lightweight loading fallback to prevent white screens.
 * Also injects the favicon globally.
 * Adds a small path->hash sync so /qr (and /qr-code and /thank-you) resolve correctly even without a hash.
 * Injects global CSS to hide the specific QR CTA anchor without modifying section files.
 * Mounts a global Toaster for notifications (used by toasts across routes).
 */
export default function App(): JSX.Element {
  useEffect(() => {
    // Path-to-hash redirect: supports pretty URL /qr, /qr-code, /thank-you by updating location.hash.
    if (typeof window !== 'undefined' && window.location) {
      const { pathname, hash } = window.location
      if (pathname === '/qr' && hash !== '#/qr') {
        window.location.hash = '/qr'
      } else if (pathname === '/qr-code' && hash !== '#/qr-code') {
        window.location.hash = '/qr-code'
      } else if (pathname === '/thank-you' && hash !== '#/thank-you') {
        window.location.hash = '/thank-you'
      }
    }
  }, [])

  return (
    <>
      <Favicon href="https://pub-cdn.sider.ai/u/U005HE2JX58/web-coder/6899a124f530328388947327/resource/467e96a2-e02b-4966-886c-13db2d1f88ec.png" />
      {/* Global CSS injection to hide the requested CTA and center strategy-call CTA on mobile */}
      <HidingStyles />
      {/* Runtime hider to remove the "Start intake form" button wherever it renders */}
      <IntakeButtonHider />
      {/* Runtime updater to rename "Schedule Your Strategy Call" -> "Book A Strategy Call" */}
      <CtaTextUpdater />
      {/* Global toaster for app-wide notifications */}
      <Toaster position="top-center" theme="dark" richColors closeButton />
      <RouterProvider
        router={router}
        fallbackElement={
          <div className="min-h-screen flex items-center justify-center bg-black text-white">
            Loading…
          </div>
        }
      />
    </>
  )
}
