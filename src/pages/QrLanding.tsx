/**
 * QrLanding.tsx
 * Dedicated, conversion-focused landing page for QR flyer traffic.
 * - Dark, high-contrast design with neon accents.
 * - No top navigation; all flows through primary CTAs and embedded form.
 * - Modular sections for maintainability.
 * - Shows a thank-you toast when redirected with ?thanks=1.
 */

import React, { useEffect } from 'react'
import '../styles/global.css'
import { QrHero } from '../components/qr/QrHero'
import { QrValueProps } from '../components/qr/QrValueProps'
import { QrSocialProof } from '../components/qr/QrSocialProof'
import { QrServices } from '../components/qr/QrServices'
import { QrGuarantee } from '../components/qr/QrGuarantee'
import { QrFaq } from '../components/qr/QrFaq'
import { QrFinalCta } from '../components/qr/QrFinalCta'
import { QrFooter } from '../components/qr/QrFooter'
import { attachCtaListener } from '../lib/analytics'
import { toast } from 'sonner'

/**
 * getHashQuery
 * Parses the querystring when using a HashRouter (e.g. "#/qr?thanks=1").
 */
function getHashQuery(): URLSearchParams | null {
  if (typeof window === 'undefined') return null
  const hash = window.location.hash || ''
  const qIndex = hash.indexOf('?')
  if (qIndex === -1) return null
  const query = hash.substring(qIndex + 1)
  return new URLSearchParams(query)
}

/**
 * QrLandingPage
 * Assembles all sections; ensures document title is specific to QR page.
 * Also attaches global CTA tracking for elements with data-cta attributes.
 * Displays a success toast on "?thanks=1" and then cleans the URL.
 */
const QrLandingPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Get Results. Not Predictions. — Cursor Cat Digital (QR Landing)'
  }, [])

  useEffect(() => {
    // Attach CTA tracking across the landing page
    const detach = attachCtaListener(document)
    return () => detach()
  }, [])

  useEffect(() => {
    // Show a one-time thank-you toast if redirected with ?thanks=1
    const params = getHashQuery()
    if (params?.get('thanks') === '1') {
      toast.success('Thanks! Welcome to Cursor Cat Digital 😺', {
        description:
          "We've received your request. We'll reach out within 24 hours. Prefer faster? Call 587-986-3069.",
        duration: 6000,
      })

      // Clean the URL by removing the query portion from the hash without reloading
      try {
        const url = new URL(window.location.href)
        url.hash = (url.hash || '').split('?')[0]
        // Keep other parts intact; do a history replace (no navigation)
        window.history.replaceState(null, '', url.toString())
      } catch {
        // no-op if URL manipulation fails
      }
    }
  }, [])

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <QrHero />
      <QrValueProps />
      <QrSocialProof />
      <QrServices />
      <QrGuarantee />
      <QrFaq />
      <QrFinalCta />
      <QrFooter />
    </div>
  )
}

export default QrLandingPage
