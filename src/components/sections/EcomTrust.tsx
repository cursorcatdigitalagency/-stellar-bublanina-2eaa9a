/**
 * EcomTrust.tsx
 * “Trusted by businesses like yours” section emphasizing ecommerce credibility.
 * Renders a neon-accent grid of recognizable ecommerce platform logos (SVG outlines).
 */

import React from 'react'
import { Section } from '../Section'

/** Single logo item definition */
interface TrustLogo {
  /** Label for accessibility and caption (optional) */
  label: string
  /** Inline SVG renderer */
  Svg: React.FC<{ className?: string }>
}

/** Shopify simplified wordmark */
const ShopifyLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 200 48" className={className} role="img" aria-label="Shopify">
    <path d="M18 10l-6 4v20l6 4 16-4V8L18 10Z" stroke="var(--cc-green)" strokeWidth="2" fill="none" />
    <path d="M34 8v26" stroke="var(--cc-green)" strokeWidth="2" />
    <text x="50" y="30" fill="currentColor" fontSize="18" fontWeight="600">Shopify</text>
  </svg>
)

/** WooCommerce bubble with wordmark */
const WooLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 220 60" className={className} role="img" aria-label="WooCommerce">
    <rect x="6" y="8" width="120" height="40" rx="12" stroke="var(--cc-green)" strokeWidth="2" fill="none" />
    <text x="20" y="34" fill="currentColor" fontSize="18" fontWeight="700">WOO</text>
    <text x="140" y="34" fill="currentColor" fontSize="18" fontWeight="600">Commerce</text>
  </svg>
)

/** Magento hex with wordmark */
const MagentoLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 220 60" className={className} role="img" aria-label="Magento">
    <path d="M30 12l14 8v16l-14 8-14-8V20l14-8Z" stroke="var(--cc-green)" strokeWidth="2" fill="none" />
    <path d="M44 20l14-8v32l-14-8" stroke="var(--cc-green)" strokeWidth="2" fill="none" />
    <text x="80" y="36" fill="currentColor" fontSize="20" fontWeight="600">Magento</text>
  </svg>
)

/** BigCommerce triangle/flag with wordmark */
const BigCommerceLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 240 60" className={className} role="img" aria-label="BigCommerce">
    <path d="M16 44L70 12v32H16Z" stroke="var(--cc-green)" strokeWidth="2" fill="none" />
    <text x="90" y="36" fill="currentColor" fontSize="20" fontWeight="700">BigCommerce</text>
  </svg>
)

const LOGOS: TrustLogo[] = [
  { label: 'Shopify', Svg: ShopifyLogo },
  { label: 'WooCommerce', Svg: WooLogo },
  { label: 'Magento', Svg: MagentoLogo },
  { label: 'BigCommerce', Svg: BigCommerceLogo },
]

/**
 * EcomTrust
 * Neon-accented, responsive logo grid.
 */
export const EcomTrust: React.FC = () => {
  return (
    <Section id="trusted" className="bg-[var(--cc-surface)]/60">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold md:text-3xl text-white">Trusted by businesses like yours</h2>
        <p className="mt-2 text-white/80">Built for ecommerce growth across modern platforms.</p>
      </div>

      <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {LOGOS.map(({ label, Svg }) => (
          <li
            key={label}
            className="rounded-lg border border-white/10 bg-black/30 p-4 transition-colors hover:bg-black/40"
            aria-label={label}
          >
            <div className="flex h-24 items-center justify-center text-white">
              <Svg className="h-16 w-full text-white" />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default EcomTrust
