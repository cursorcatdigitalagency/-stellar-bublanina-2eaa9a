/**
 * Services & Packages section (Outcome-focused offers + Add-ons)
 * Packages grid stays in sync with Rate Calculator. Adds add-on service toggles.
 * Updated: Copy consistency ("Web Design & Development*").
 */
import React from 'react'
import { Section } from '../Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Check } from 'lucide-react'
import { PRICING, formatCurrency } from '../../lib/pricing'
import { useRateCalculatorStore } from '../../store/useRateCalculator'

/** Keys that map to the calculator store booleans */
type ServiceKey =
  | 'pilotWithProof'
  | 'localDominance'
  | 'ecomSprint'
  | 'measurementMakeover'
  | 'socialMediaMgmt'
  | 'analyticsReporting'
  | 'seoEssentials'
  | 'ecomFunnelsLite'
  | 'webDesign'
  | 'brandingStrategy'

/** Interface for a service item with price and inclusions */
interface Service {
  /** Service key to connect with calculator store */
  key: ServiceKey
  /** Service title */
  title: string
  /** Display price text */
  price: string
  /** Short summary description */
  summary: string
  /** List of included items */
  includes: string[]
}

/** Outcome-oriented package stack (kept in sync with calculator constants) */
const PACKAGES: Service[] = [
  {
    key: 'pilotWithProof',
    title: 'Pilot with Proof (8 weeks)',
    price: `One‑time ${formatCurrency(PRICING.oneTime.pilotWithProof)}`,
    summary:
      'Rapid proof‑of‑channel. Tracking fixed, landing page live, and two creative/ad sprints to hit CPL/booked‑call targets.',
    includes: [
      'Analytics + conversion tracking (GA4, CRM/offline conversions)',
      'Landing page + form/call tracking',
      '2x ad sprints (Google Search/Meta) with weekly iteration',
      'Success criteria agreed day 1 (e.g., <$X CPL or Y booked calls)',
    ],
  },
  {
    key: 'localDominance',
    title: 'Local Dominance (monthly)',
    price: `From ${formatCurrency(PRICING.monthly.localDominanceBase)}/mo (first location)`,
    summary:
      'Own your local area with GBP + Local SEO + high‑intent Google Ads. Built for service businesses.',
    includes: [
      'Google Business Profile + reviews ops',
      'Local SEO pages + citation cleanup',
      'Google Ads (Search/PMax) with call quality checks',
      'Looker Studio dashboard + biweekly experiments',
    ],
  },
  {
    key: 'ecomSprint',
    title: 'E‑commerce Growth Sprint (monthly)',
    price: `From ${formatCurrency(PRICING.monthly.ecomSprintBase)}/mo`,
    summary: 'Scale revenue with Shopping/PMax, CRO testing, and lifecycle email flows.',
    includes: ['Merchant Center + feed optimization', 'Shopping/PMax structure and testing', 'CRO tests across PDP/cart/checkout', 'Email flows + remarketing'],
  },
  {
    key: 'measurementMakeover',
    title: 'Measurement Makeover (one‑time)',
    price: `From ${formatCurrency(PRICING.oneTime.measurementMakeover)} one‑time`,
    summary:
      'Confidence in data. GA4 + server‑side GTM, CAPI, offline conversions, naming conventions, and a clean dashboard.',
    includes: [
      'GA4 + (optional) server‑side GTM',
      'Meta CAPI and Google Ads conversions',
      'Offline/CRM conversions and UTM hygiene',
      'Looker Studio dashboard with exec summary',
    ],
  },
]

/** Legacy single services presented as modern add-ons */
const A_LA_CARTE: Service[] = [
  {
    key: 'webDesign',
    title: 'Web Design & Development*',
    price: `From ${formatCurrency(PRICING.oneTime.webDesignBase)} one‑time`,
    summary: 'Modern, mobile‑first websites (1–5 pages) built for speed and conversion.',
    includes: ['Custom design', 'Mobile & speed optimization', 'Optional: blog, booking, or ecommerce'],
  },
  {
    key: 'seoEssentials',
    title: 'SEO Essentials (monthly)',
    price: `${formatCurrency(PRICING.monthly.seoEssentials)}/mo`,
    summary: 'Practical SEO for local intent—on‑page fixes, content tweaks, and GBP support.',
    includes: ['On‑page & titles', 'Content updates', 'Local/GBP basics'],
  },
  {
    key: 'socialMediaMgmt',
    title: 'Social Media Management (monthly)',
    price: `${formatCurrency(PRICING.monthly.socialMediaMgmt)}/mo`,
    summary: 'Consistent, on‑brand posts without the stress.',
    includes: ['Content calendar', 'Branded posts (graphics + captions)', 'Performance summary'],
  },
  {
    key: 'analyticsReporting',
    title: 'Analytics & Reporting (monthly)',
    price: `${formatCurrency(PRICING.monthly.analyticsReporting)}/mo`,
    summary: 'Know what’s working and where to improve.',
    includes: ['Monthly dashboard', 'Traffic & lead reporting', 'Simple insights summary'],
  },
  {
    key: 'ecomFunnelsLite',
    title: 'E‑commerce & Funnels (Lite, monthly)',
    price: `${formatCurrency(PRICING.monthly.ecomFunnelsLite)}/mo`,
    summary: 'Lightweight funnel or ecommerce support without a full sprint.',
    includes: ['Basic funnel setup', 'Simple CRO checks', 'Light remarketing'],
  },
  {
    key: 'brandingStrategy',
    title: 'Branding & Strategy (one‑time)',
    price: `${formatCurrency(PRICING.oneTime.brandingStrategy)} one‑time`,
    summary: 'Align your brand with a practical identity & voice guide.',
    includes: ['Logo & visual identity', 'Voice + positioning', 'Launch/growth plan'],
  },
]

/**
 * Services component rendering pricing cards with CTAs
 */
export const Services: React.FC = () => {
  const { set, ...sel } = useRateCalculatorStore()

  /** Toggle helper to add/remove a package to the estimate */
  const toggle = (key: ServiceKey) => {
    set({ [key]: !sel[key] } as any)
  }

  return (
    <Section id="services">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-semibold md:text-3xl text-white">Packages &amp; Pricing</h2>
        <p className="mt-3 text-white/80">Transparent scopes aligned to outcomes. Add a package to the estimate below.</p>
      </div>

      {/* Packages grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {PACKAGES.map((s) => {
          const selected = !!sel[s.key]
          return (
            <Card key={s.title} className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-lg text-white">{s.title}</CardTitle>
                <CardDescription className="text-[var(--cc-green)] font-semibold">{s.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-white/80">{s.summary}</p>
                <ul className="space-y-2 text-sm">
                  {s.includes.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-[var(--cc-green)]" />
                      <span className="text-white/90">{i}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className={`bg-transparent text-[var(--cc-green)] ${selected ? 'opacity-100' : ''}`}
                    onClick={() => toggle(s.key)}
                    aria-label="Add package to estimate"
                  >
                    {selected ? 'Remove from estimate' : 'Add to estimate'}
                  </Button>
                  <a href="#calculator" aria-label="Jump to rate calculator">
                    <Button variant="outline" className="bg-transparent text-[var(--cc-green)]" size="sm">
                      Open calculator
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Add-on services */}
      <div className="mt-14 mb-6 text-center">
        <h3 className="text-xl font-semibold text-white">Add‑on services</h3>
        <p className="mt-2 text-white/80">Prefer single add‑ons? Toggle what you need and see it in the calculator.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {A_LA_CARTE.map((s) => {
          const selected = !!sel[s.key]
          return (
            <Card key={s.title} className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-lg text-white">{s.title}</CardTitle>
                <CardDescription className="text-[var(--cc-green)] font-semibold">{s.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-white/80">{s.summary}</p>
                <ul className="space-y-2 text-sm">
                  {s.includes.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-[var(--cc-green)]" />
                      <span className="text-white/90">{i}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className={`bg-transparent text-[var(--cc-green)] ${selected ? 'opacity-100' : ''}`}
                    onClick={() => toggle(s.key)}
                    aria-label="Add service to estimate"
                  >
                    {selected ? 'Remove from estimate' : 'Add to estimate'}
                  </Button>
                  <a href="#calculator" aria-label="Jump to rate calculator">
                    <Button variant="outline" className="bg-transparent text-[var(--cc-green)]" size="sm">
                      Open calculator
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Hint for lead gen projects */}
      <p className="mt-4 text-center text-xs text-white/60">
        Need Lead Generation Campaigns? Set the number of projects inside the Rate Calculator.
      </p>
    </Section>
  )
}
