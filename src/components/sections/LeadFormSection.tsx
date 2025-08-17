/**
 * LeadFormSection.tsx
 * Previously rendered the "Get Your Free Strategy Plan" Netlify form card.
 * Per request, this section is now removed from display while preserving the #form anchor target.
 */

import React from 'react'

/**
 * LeadFormSection
 * Renders an off-screen anchor to keep existing #form links from breaking,
 * but removes any visible form/UI.
 */
const LeadFormSection: React.FC = () => {
  // Keep the #form anchor to avoid dead links and unexpected scroll errors
  return <div id="form" className="sr-only" aria-hidden="true" />
}

export default LeadFormSection
