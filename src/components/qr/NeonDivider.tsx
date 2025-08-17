/**
 * NeonDivider.tsx
 * A thin, neon-accented separator to clarify section transitions.
 */

import React from 'react'

/** Props for NeonDivider */
export interface NeonDividerProps {
  /** Optional: extra classes for spacing or positioning */
  className?: string
}

/**
 * NeonDivider
 * Renders a subtle neon green/blue gradient line with glow.
 */
export const NeonDivider: React.FC<NeonDividerProps> = ({ className }) => {
  return (
    <div
      aria-hidden="true"
      className={`h-px w-full bg-gradient-to-r from-[#39ff14] via-[#00eaff] to-[#39ff14] ${className ?? ''}`}
      style={{ boxShadow: '0 0 12px rgba(57,255,20,0.35), 0 0 14px rgba(0,234,255,0.25)' }}
    />
  )
}

export default NeonDivider
