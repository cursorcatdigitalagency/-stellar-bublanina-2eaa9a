/**
 * QrServices.tsx
 * Brief snapshot of services with custom iconography and CTA linking to the lead form.
 */

import React from 'react'
import { NeonDivider } from './NeonDivider'
import { Target, Megaphone, Funnel, BarChart3, Palette, Search } from 'lucide-react'

/** Service item interface for icon + text */
interface ServiceItem {
  /** Icon to render */
  Icon: React.ComponentType<{ className?: string; size?: number }>
  /** Title of service */
  title: string
  /** Short description for clarity */
  description: string
}

/** Core services with brief descriptions and icons */
const SERVICES: ServiceItem[] = [
  {
    Icon: Target,
    title: 'Lead Generation Campaigns',
    description: 'Bring in qualified leads with intent to buy.',
  },
  {
    Icon: Megaphone,
    title: 'Social Media Ads',
    description: 'Paid campaigns built to convert — not just get clicks.',
  },
  {
    Icon: Funnel,
    title: 'Funnels + Websites',
    description: 'Conversion-oriented builds designed for growth.',
  },
  {
    Icon: BarChart3,
    title: 'Analytics & Tracking',
    description: 'See what’s working and double down with confidence.',
  },
  {
    Icon: Palette,
    title: 'Branding & Strategy',
    description: 'Positioning, identity, and messaging that fit your market.',
  },
  {
    Icon: Search,
    title: 'SEO Essentials',
    description: 'Technical basics and on‑page fixes so you’re found.',
  },
]

/**
 * QrServices
 * Lists core offers with custom icons and a CTA that scrolls to the lead form.
 */
export const QrServices: React.FC = () => {
  return (
    <section aria-label="What we can help you with" className="bg-black">
      <div className="cc-container py-10">
        <h2 className="text-center text-2xl md:text-3xl font-semibold">
          <span className="text-white">What We Can Help You With</span>
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {SERVICES.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl p-5 bg-black/60 border border-white/10"
              style={{ boxShadow: 'inset 0 0 12px rgba(0,234,255,0.08)' }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 rounded-md p-2"
                  style={{
                    background: 'rgba(57,255,20,0.12)',
                    boxShadow: '0 0 12px rgba(57,255,20,0.25)',
                  }}
                  aria-hidden="true"
                >
                  <Icon className="text-[#39ff14]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="text-white/80 text-sm mt-1">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#lead-form"
            className="inline-flex h-12 items-center justify-center rounded-md px-6 text-black font-semibold bg-[#00eaff] hover:bg-[#00eaff] hover:opacity-90"
            style={{
              boxShadow:
                '0 0 24px rgba(0,234,255,0.45), 0 0 40px rgba(0,234,255,0.25)',
            }}
            data-cta="qr-services-talk"
            aria-label="Talk to Us About Your Business Goals"
            title="Talk to Us About Your Business Goals"
          >
            Talk to Us About Your Business Goals
          </a>
        </div>
      </div>

      <NeonDivider />
    </section>
  )
}

export default QrServices
