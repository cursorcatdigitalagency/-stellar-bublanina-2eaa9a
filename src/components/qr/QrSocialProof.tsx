/**
 * QrSocialProof.tsx
 * Social proof section with representative business icons (no testimonials).
 */

import React from 'react'
import { NeonDivider } from './NeonDivider'
import { Building2, Wrench, Rocket as StartupIcon } from 'lucide-react'

/**
 * QrSocialProof
 * Displays representative business verticals; testimonials removed per requirements.
 */
export const QrSocialProof: React.FC = () => {
  return (
    <section aria-label="Trusted by businesses like yours" className="bg-black">
      <div className="cc-container py-10">
        <h2 className="text-center text-2xl md:text-3xl font-semibold">
          <span className="text-white">Trusted by businesses like</span>{' '}
          <span className="text-[#39ff14]">yours</span>
        </h2>

        {/* Representative business icons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <Building2
              aria-label="Commercial and storefront businesses"
              title="Commercial / Storefront"
              className="text-[#00eaff]"
            />
            <span className="text-white/70 text-sm">Storefront</span>
          </div>
          <div className="flex items-center gap-2">
            <Wrench
              aria-label="Trades and services"
              title="Trades / Services"
              className="text-[#00eaff]"
            />
            <span className="text-white/70 text-sm">Trades</span>
          </div>
          <div className="flex items-center gap-2">
            <StartupIcon
              aria-label="Startups and new ventures"
              title="Startups / Tech"
              className="text-[#00eaff]"
            />
            <span className="text-white/70 text-sm">Startups</span>
          </div>
        </div>
      </div>
      <NeonDivider />
    </section>
  )
}

export default QrSocialProof
