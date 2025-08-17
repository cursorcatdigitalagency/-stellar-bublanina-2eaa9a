/**
 * useRateCalculator.ts
 * Shared Zustand store for the Rate Calculator selections.
 * Allows Services cards and calculator controls to stay in sync.
 */

import { create } from 'zustand'
import { PRICING, AdTier } from '../lib/pricing'

/** State for calculator selections and variables */
export interface RateCalcState {
  /** Outcome-based core packages (toggles) */
  pilotWithProof: boolean
  localDominance: boolean
  ecomSprint: boolean
  measurementMakeover: boolean

  /** Variables and add-ons */
  locations: number
  landingPages: number
  adTier: AdTier

  /** A la carte (legacy single services) */
  socialMediaMgmt: boolean
  analyticsReporting: boolean
  seoEssentials: boolean
  ecomFunnelsLite: boolean
  webDesign: boolean
  brandingStrategy: boolean
  /** Lead gen campaign projects count (one-time per project) */
  leadGenCampaigns: number
}

/** Actions exposed by the store */
export interface RateCalcActions {
  /** Patch set helper */
  set: (patch: Partial<RateCalcState>) => void
  /** Reset everything to defaults */
  reset: () => void
}

/** Initial values */
const initialState: RateCalcState = {
  // Packages
  pilotWithProof: false,
  localDominance: false,
  ecomSprint: false,
  measurementMakeover: false,

  // Variables
  locations: 1,
  landingPages: 0,
  adTier: 'lt2',

  // A la carte services
  socialMediaMgmt: false,
  analyticsReporting: false,
  seoEssentials: false,
  ecomFunnelsLite: false,
  webDesign: false,
  brandingStrategy: false,
  leadGenCampaigns: 0,
}

/**
 * useRateCalculatorStore
 * Exported hook to access calculator state/actions.
 */
export const useRateCalculatorStore = create<RateCalcState & RateCalcActions>((set) => ({
  ...initialState,
  set: (patch) => set(patch),
  reset: () => set({ ...initialState }),
}))

/**
 * computeTotals
 * Calculates monthly and one-time totals based on current selections.
 * Includes guards to sanitize numeric inputs (no negatives/NaN).
 */
export function computeTotals(state: RateCalcState): { monthlyTotal: number; oneTimeTotal: number } {
  // Sanitize numeric inputs to avoid NaN/negative bugs
  const locations = Math.max(1, Math.floor(Number(state.locations) || 1))
  const landingPages = Math.max(0, Math.floor(Number(state.landingPages) || 0))
  const leadGenCampaigns = Math.max(0, Math.floor(Number(state.leadGenCampaigns) || 0))

  let monthly = 0
  let oneTime = 0

  // Packages: recurring
  if (state.localDominance) {
    const extras = Math.max(0, locations - 1) * PRICING.monthly.extraLocation
    monthly += PRICING.monthly.localDominanceBase + extras
  }

  if (state.ecomSprint) {
    monthly += PRICING.monthly.ecomSprintBase
  }

  // Ad management if any package that runs ads is active
  const runningAds = state.localDominance || state.ecomSprint || state.pilotWithProof
  if (runningAds) {
    monthly += PRICING.monthly.adMgmt[state.adTier]
  }

  // Packages: one-time
  if (state.pilotWithProof) {
    oneTime += PRICING.oneTime.pilotWithProof
  }

  if (state.measurementMakeover) {
    oneTime += PRICING.oneTime.measurementMakeover
  }

  // Variables
  if (landingPages > 0) {
    oneTime += landingPages * PRICING.oneTime.landingPage
  }

  // A la carte: recurring
  if (state.socialMediaMgmt) monthly += PRICING.monthly.socialMediaMgmt
  if (state.analyticsReporting) monthly += PRICING.monthly.analyticsReporting
  if (state.seoEssentials) monthly += PRICING.monthly.seoEssentials
  if (state.ecomFunnelsLite) monthly += PRICING.monthly.ecomFunnelsLite

  // A la carte: one-time
  if (state.webDesign) oneTime += PRICING.oneTime.webDesignBase
  if (state.brandingStrategy) oneTime += PRICING.oneTime.brandingStrategy
  if (leadGenCampaigns > 0) {
    oneTime += leadGenCampaigns * PRICING.oneTime.leadGenCampaign
  }

  return { monthlyTotal: monthly, oneTimeTotal: oneTime }
}
