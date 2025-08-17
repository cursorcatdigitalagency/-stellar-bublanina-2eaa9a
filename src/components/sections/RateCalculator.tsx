/**
 * RateCalculator section
 * Interactive estimator for monthly and one-time costs across key offers and add-ons.
 * CTA updated to "Call Or Text Us Now".
 */

import React, { useMemo, useState } from 'react'
import { Section } from '../Section'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { PRICING, formatCurrency, AdTier } from '../../lib/pricing'
import { useRateCalculatorStore, computeTotals } from '../../store/useRateCalculator'

/** Props for RateCalculator to allow opening the calendar modal from parent */
export interface RateCalculatorProps {
  /** Trigger the booking modal (legacy; kept for compatibility) */
  onBook?: () => void
}

/** Lead generation campaign type options shown in the dropdown */
type LeadGenType =
  | 'None'
  | 'Google Ads (Search/PMax)'
  | 'Meta Ads (Facebook/Instagram)'
  | 'LinkedIn Outreach'
  | 'Email Outreach'
  | 'Lead Magnet + Landing Page'

/**
 * RateCalculator
 * - Users select packages and add-ons; totals update from the shared store.
 * - Desktop layout: compact 12-col grid for a denser, left-to-right scan.
 */
export const RateCalculator: React.FC<RateCalculatorProps> = ({ onBook }) => {
  const {
    // Packages
    pilotWithProof,
    localDominance,
    ecomSprint,
    measurementMakeover,
    // Variables
    locations,
    landingPages,
    adTier,
    // Add-ons (formerly a la carte)
    socialMediaMgmt,
    analyticsReporting,
    seoEssentials,
    ecomFunnelsLite,
    webDesign,
    brandingStrategy,
    leadGenCampaigns,
    // actions
    set,
    reset,
  } = useRateCalculatorStore()

  /** Compute totals based on current selections */
  const { monthlyTotal, oneTimeTotal } = useMemo(
    () =>
      computeTotals({
        // packages
        pilotWithProof,
        localDominance,
        ecomSprint,
        measurementMakeover,
        // variables
        locations,
        landingPages,
        adTier,
        // add-ons
        socialMediaMgmt,
        analyticsReporting,
        seoEssentials,
        ecomFunnelsLite,
        webDesign,
        brandingStrategy,
        leadGenCampaigns,
      }),
    [
      pilotWithProof,
      localDominance,
      ecomSprint,
      measurementMakeover,
      locations,
      landingPages,
      adTier,
      socialMediaMgmt,
      analyticsReporting,
      seoEssentials,
      ecomFunnelsLite,
      webDesign,
      brandingStrategy,
      leadGenCampaigns,
    ],
  )

  /** Local UI state for lead generation type (UX-only) */
  const [leadGenType, setLeadGenType] = useState<LeadGenType>(
    leadGenCampaigns > 0 ? 'Google Ads (Search/PMax)' : 'None',
  )

  /** Override displayed one-time total to reflect $499/project regardless of internal constant. */
  const displayOneTimeTotal = useMemo(() => {
    const override = 499
    const unitDelta = override - PRICING.oneTime.leadGenCampaign
    return oneTimeTotal + unitDelta * leadGenCampaigns
  }, [oneTimeTotal, leadGenCampaigns])

  return (
    <Section id="calculator" className="bg-[var(--cc-surface)]/60">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold md:text-2xl text-white">Rate Calculator</h2>
        <p className="mt-2 text-sm text-white/80">Build your stack. We’ll finalize scope on a quick call.</p>
      </div>

      <Card className="border-white/10 bg-white/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-base">Build your plan</CardTitle>
        </CardHeader>

        <CardContent className="p-4">
          {/* Grid */}
          <div className="grid gap-3 md:grid-cols-12">
            {/* Column content unchanged for brevity ... */}
            {/* Column 1: Core packages */}
            <div className="space-y-3 md:col-span-4">
              <p className="text-xs font-semibold text-white/90 uppercase tracking-wide">Core packages</p>

              <label className="flex cursor-pointer items-start gap-3 rounded-md border border-white/10 bg-black/20 p-2.5 hover:bg-black/30">
                <input
                  type="checkbox"
                  checked={pilotWithProof}
                  onChange={(e) => set({ pilotWithProof: e.target.checked })}
                  className="mt-1"
                  aria-label="Pilot with Proof"
                />
                <div className="text-sm leading-tight">
                  <p className="font-medium text-white">Pilot with Proof (8 weeks)</p>
                  <p className="text-xs text-white/70">One‑time {formatCurrency(PRICING.oneTime.pilotWithProof)}</p>
                </div>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-md border border-white/10 bg-black/20 p-2.5 hover:bg-black/30">
                <input
                  type="checkbox"
                  checked={localDominance}
                  onChange={(e) => set({ localDominance: e.target.checked })}
                  className="mt-1"
                  aria-label="Local Dominance"
                />
                <div className="text-sm leading-tight">
                  <p className="font-medium text-white">Local Dominance (monthly)</p>
                  <p className="text-xs text-white/70">
                    Base {formatCurrency(PRICING.monthly.localDominanceBase)} for 1 location
                  </p>
                </div>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-md border border-white/10 bg-black/20 p-2.5 hover:bg-black/30">
                <input
                  type="checkbox"
                  checked={ecomSprint}
                  onChange={(e) => set({ ecomSprint: e.target.checked })}
                  className="mt-1"
                  aria-label="E-commerce Growth Sprint"
                />
                <div className="text-sm leading-tight">
                  <p className="font-medium text-white">E‑commerce Growth Sprint (monthly)</p>
                  <p className="text-xs text-white/70">Base {formatCurrency(PRICING.monthly.ecomSprintBase)}</p>
                </div>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-md border border-white/10 bg-black/20 p-2.5 hover:bg-black/30">
                <input
                  type="checkbox"
                  checked={measurementMakeover}
                  onChange={(e) => set({ measurementMakeover: e.target.checked })}
                  className="mt-1"
                  aria-label="Measurement Makeover"
                />
                <div className="text-sm leading-tight">
                  <p className="font-medium text-white">Measurement Makeover (one‑time)</p>
                  <p className="text-xs text-white/70">From {formatCurrency(PRICING.oneTime.measurementMakeover)}</p>
                </div>
              </label>
            </div>

            {/* Column 2: Variables */}
            <div className="space-y-3 md:col-span-4">
              <p className="text-xs font-semibold text-white/90 uppercase tracking-wide">Variables</p>

              <div className="rounded-md border border-white/10 bg-black/20 p-2.5">
                <label className="block text-xs text-white/80">Locations (Local Dominance)</label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={locations}
                    onChange={(e) =>
                      set({
                        locations: Math.max(
                          1,
                          Number.isNaN(parseInt(e.target.value, 10)) ? 1 : parseInt(e.target.value, 10),
                        ),
                      })
                    }
                    className="w-28 rounded-md border border-white/20 bg-black/40 p-2 text-sm text-white placeholder-white/60 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. 1"
                  />
                  <p className="text-xs text-white/60">
                    First {formatCurrency(PRICING.monthly.localDominanceBase)} · extra{' '}
                    {formatCurrency(PRICING.monthly.extraLocation)}/mo
                  </p>
                </div>
              </div>

              <div className="rounded-md border border-white/10 bg-black/20 p-2.5">
                <label className="block text-xs text-white/80">Landing pages</label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    value={landingPages}
                    onChange={(e) =>
                      set({
                        landingPages: Math.max(
                          0,
                          Number.isNaN(parseInt(e.target.value, 10)) ? 0 : parseInt(e.target.value, 10),
                        ),
                      })
                    }
                    className="w-28 rounded-md border border-white/20 bg-black/40 p-2 text-sm text-white placeholder-white/60 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. 2"
                  />
                  <p className="text-xs text-white/60">One‑time {formatCurrency(PRICING.oneTime.landingPage)} each</p>
                </div>
              </div>

              <div className="rounded-md border border-white/10 bg-black/20 p-2.5">
                <label className="block text-xs text-white/80">Ad budget (mgmt tier)</label>
                <select
                  value={adTier}
                  onChange={(e) => set({ adTier: e.target.value as AdTier })}
                  className="mt-2 w-full rounded-md border border-white/20 bg-black/40 p-2 text-sm text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                  aria-label="Ad budget management tier"
                >
                  <option value="lt2">&lt; $2k/mo — {formatCurrency(PRICING.monthly.adMgmt.lt2)} mgmt</option>
                  <option value="2to5">$2k–$5k — {formatCurrency(PRICING.monthly.adMgmt['2to5'])} mgmt</option>
                  <option value="5to10">$5k–$10k — {formatCurrency(PRICING.monthly.adMgmt['5to10'])} mgmt</option>
                  <option value="gt10">&gt; $10k — {formatCurrency(PRICING.monthly.adMgmt.gt10)} mgmt</option>
                </select>
                <p className="mt-1 text-[11px] leading-snug text-white/60">
                  Included if you run paid ads (Pilot, Local Dominance, or E‑com Sprint).
                </p>
              </div>
            </div>

            {/* Column 3: Add-ons (Monthly above One-time) */}
            <div className="space-y-3 md:col-span-4">
              <div className="rounded-md border border-white/10 bg-black/20 p-2.5">
                <p className="mb-2 text-xs font-semibold text-white/90 uppercase tracking-wide">Add‑ons — Monthly</p>

                <div className="grid gap-2 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-start gap-3 rounded-md border border-white/10 bg-black/30 p-2 hover:bg-black/40">
                    <input
                      type="checkbox"
                      checked={socialMediaMgmt}
                      onChange={(e) => set({ socialMediaMgmt: e.target.checked })}
                      className="mt-1"
                      aria-label="Social Media Management"
                    />
                    <div className="text-sm leading-tight">
                      <p className="font-medium text-white">Social Media Management</p>
                      <p className="text-xs text-white/70">{formatCurrency(PRICING.monthly.socialMediaMgmt)}/mo</p>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-md border border-white/10 bg-black/30 p-2 hover:bg-black/40">
                    <input
                      type="checkbox"
                      checked={analyticsReporting}
                      onChange={(e) => set({ analyticsReporting: e.target.checked })}
                      className="mt-1"
                      aria-label="Analytics & Reporting"
                    />
                    <div className="text-sm leading-tight">
                      <p className="font-medium text-white">Analytics &amp; Reporting</p>
                      <p className="text-xs text-white/70">{formatCurrency(PRICING.monthly.analyticsReporting)}/mo</p>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-md border border-white/10 bg-black/30 p-2 hover:bg-black/40">
                    <input
                      type="checkbox"
                      checked={seoEssentials}
                      onChange={(e) => set({ seoEssentials: e.target.checked })}
                      className="mt-1"
                      aria-label="SEO Essentials"
                    />
                    <div className="text-sm leading-tight">
                      <p className="font-medium text-white">SEO Essentials</p>
                      <p className="text-xs text-white/70">{formatCurrency(PRICING.monthly.seoEssentials)}/mo</p>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-md border border-white/10 bg-black/30 p-2 hover:bg-black/40">
                    <input
                      type="checkbox"
                      checked={ecomFunnelsLite}
                      onChange={(e) => set({ ecomFunnelsLite: e.target.checked })}
                      className="mt-1"
                      aria-label="E-commerce & Funnels (Lite)"
                    />
                    <div className="text-sm leading-tight">
                      <p className="font-medium text-white">E‑commerce &amp; Funnels (Lite)</p>
                      <p className="text-xs text-white/70">{formatCurrency(PRICING.monthly.ecomFunnelsLite)}/mo</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="rounded-md border border-white/10 bg-black/20 p-2.5">
                <p className="mb-2 text-xs font-semibold text-white/90 uppercase tracking-wide">Add‑ons — One‑time</p>

                <div className="grid gap-2 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-start gap-3 rounded-md border border-white/10 bg-black/30 p-2 hover:bg-black/40">
                    <input
                      type="checkbox"
                      checked={webDesign}
                      onChange={(e) => set({ webDesign: e.target.checked })}
                      className="mt-1"
                      aria-label="Web Design & Development"
                    />
                    <div className="text-sm leading-tight">
                      <p className="font-medium text-white">Web Design &amp; Development*</p>
                      <p className="text-xs text-white/70">From {formatCurrency(PRICING.oneTime.webDesignBase)}</p>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-md border border-white/10 bg-black/30 p-2 hover:bg-black/40">
                    <input
                      type="checkbox"
                      checked={brandingStrategy}
                      onChange={(e) => set({ brandingStrategy: e.target.checked })}
                      className="mt-1"
                      aria-label="Branding & Strategy"
                    />
                    <div className="text-sm leading-tight">
                      <p className="font-medium text-white">Branding &amp; Strategy</p>
                      <p className="text-xs text-white/70">{formatCurrency(PRICING.oneTime.brandingStrategy)} one‑time</p>
                    </div>
                  </label>

                  <div className="rounded-md border border-white/10 bg-black/30 p-2">
                    <label className="block text-xs text-white/80">Lead Generation Campaigns</label>
                    <div className="mt-2 flex items-center gap-3">
                      <select
                        value={leadGenType}
                        onChange={(e) => {
                          const next = e.target.value as LeadGenType
                          setLeadGenType(next)
                          set({ leadGenCampaigns: next === 'None' ? 0 : 1 })
                        }}
                        className="w-full rounded-md border border-white/20 bg-black/40 p-2 text-sm text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                        aria-label="Lead generation campaign type"
                      >
                        {[
                          'None',
                          'Google Ads (Search/PMax)',
                          'Meta Ads (Facebook/Instagram)',
                          'LinkedIn Outreach',
                          'Email Outreach',
                          'Lead Magnet + Landing Page',
                        ].map((t) => (
                          <option value={t} key={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <span className="text-xs text-white/70">{formatCurrency(499)} / project</span>
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-[11px] leading-snug text-white/60">* Final scope priced after discovery.</p>
              </div>
            </div>

            {/* Slim summary bar */}
            <div className="mt-2 rounded-md border border-white/10 bg-black/30 p-3 md:col-span-12 md:flex md:items-center md:justify-between">
              <div className="flex flex-wrap gap-5">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/80">Monthly</span>
                  <span className="text-sm font-semibold text-white">{formatCurrency(monthlyTotal)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/80">One‑time</span>
                  <span className="text-sm font-semibold text-white">{formatCurrency(displayOneTimeTotal)}</span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 md:mt-0">
                <Button asChild variant="outline" className="bg-transparent text-[var(--cc-green)]" size="sm" aria-label="Call Or Text Us Now">
                  <a href="tel:587-986-3069">Call Or Text Us Now</a>
                </Button>

                <a href="#form" aria-label="Jump to form section">
                  <Button variant="outline" className="bg-transparent text-[var(--cc-green)]" size="sm">
                    Call Or Text Us Now
                  </Button>
                </a>
                <Button variant="outline" className="bg-transparent text-[var(--cc-green)]" size="sm" onClick={reset}>
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="mt-4 text-center text-xs text-white/60">Prefer set packages? See “Packages &amp; Pricing” above.</p>
    </Section>
  )
}

export default RateCalculator
