/**
 * analytics.ts
 * Minimal client-side analytics helpers for CTA clicks and form submissions.
 * Uses gtag/dataLayer if present; otherwise logs to console for debugging.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: unknown[]
  }
}

/** Shape of analytics parameters */
export interface AnalyticsParams {
  /** CTA identifier or event label */
  cta?: string
  /** Optional link href when applicable */
  href?: string
  /** Event category or type hint */
  type?: 'link' | 'tel' | 'mailto' | 'calendly' | 'form'
  /** Current location hash for single-page apps */
  hash?: string
  /** Extra payload data */
  [key: string]: unknown
}

/**
 * trackEvent
 * Sends an analytics event via gtag or dataLayer; always logs to console in dev.
 */
export function trackEvent(eventName: string, params: AnalyticsParams = {}): void {
  const payload = { event: eventName, ...params, ts: Date.now() }

  try {
    if (typeof window !== 'undefined') {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params)
      }
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push(payload)
      }
    }
  } catch {
    // swallow analytics errors
  }

  // Helpful debug log
  // eslint-disable-next-line no-console
  console.debug('[analytics]', payload)
}

/**
 * attachCtaListener
 * Delegates click events to track elements marked with data-cta attribute.
 * Returns a cleanup function to remove the listener.
 */
export function attachCtaListener(root: Document | HTMLElement = document): () => void {
  /** Click handler that finds the nearest [data-cta] element and logs it */
  const onClick = (e: Event) => {
    const target = e.target as HTMLElement | null
    if (!target) return

    const ctaEl = target.closest<HTMLElement>('[data-cta]')
    if (!ctaEl) return

    const ctaId = ctaEl.dataset.cta || 'cta'
    // Derive href from link context if available
    let href = ''
    let type: AnalyticsParams['type'] = 'link'

    // Try multiple ways to find a relevant anchor element
    const link =
      (ctaEl as HTMLAnchorElement).href
        ? (ctaEl as HTMLAnchorElement)
        : (ctaEl.closest('a') as HTMLAnchorElement | null) ||
          (ctaEl.querySelector('a') as HTMLAnchorElement | null)

    if (link && typeof link.href === 'string') {
      href = link.getAttribute('href') || link.href || ''
      const hrefLower = href.toLowerCase()
      if (hrefLower.startsWith('tel:')) type = 'tel'
      else if (hrefLower.startsWith('mailto:')) type = 'mailto'
      else if (hrefLower.includes('calendly')) type = 'calendly'
      else type = 'link'
    }

    trackEvent('cta_click', {
      cta: ctaId,
      href,
      type,
      hash: typeof window !== 'undefined' ? window.location.hash : undefined,
    })
  }

  root.addEventListener('click', onClick, { capture: false })
  return () => root.removeEventListener('click', onClick, { capture: false })
}
