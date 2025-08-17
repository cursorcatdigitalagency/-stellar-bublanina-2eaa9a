/**
 * pricing.ts
 * Centralized pricing constants and helpers shared by Services and Rate Calculator.
 */

export type AdTier = 'lt2' | '2to5' | '5to10' | 'gt10'

/**
 * PRICING
 * Keep all editable price values in one place to ensure consistency across UI.
 * Includes both outcome-based packages and classic a la carte services.
 */
export const PRICING = {
  monthly: {
    // Outcome-based packages
    localDominanceBase: 900, // for first location
    extraLocation: 250, // per additional location
    ecomSprintBase: 1200,
    adMgmt: {
      lt2: 300, // budget < $2k
      '2to5': 600, // $2k–$5k
      '5to10': 900, // $5k–$10k
      gt10: 1200, // >$10k
    },

    // A la carte (legacy style)
    socialMediaMgmt: 199, // Starting at $199/month
    analyticsReporting: 99, // $99/month
    seoEssentials: 349, // SEO monthly retainer (legacy single-service)
    ecomFunnelsLite: 449, // From $449+/month (lite version separate from ecomSprintBase)
  },
  oneTime: {
    // Outcome-based packages
    pilotWithProof: 3500,
    measurementMakeover: 1200,
    landingPage: 300, // per landing page

    // A la carte (legacy style)
    webDesignBase: 499, // From $499+
    brandingStrategy: 299, // $299 one-time
    leadGenCampaign: 349, // From $349 per project
  },
} as const

/**
 * formatCurrency
 * Formats numbers as CAD whole-dollar currency.
 */
export function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n)
}
