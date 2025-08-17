/**
 * TrustBar.tsx
 * Simple trust/promises strip to reduce friction and clarify how we operate.
 */
import React from 'react'
import { ShieldCheck, Clock, BadgeDollarSign } from 'lucide-react'

/**
 * TrustBar
 * Displays 3 short promises in a compact, readable layout.
 */
export const TrustBar: React.FC = () => {
  return (
    <section id="trust" aria-label="trust" className="border-y border-white/10 bg-black/60">
      <div className="cc-container grid grid-cols-1 gap-4 py-4 text-sm sm:grid-cols-3">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-[var(--cc-green)]" />
          <span className="text-white/90">No long‑term contracts</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-[var(--cc-green)]" />
          <span className="text-white/90">Replies within 24 hours</span>
        </div>
        <div className="flex items-center gap-2">
          <BadgeDollarSign size={18} className="text-[var(--cc-green)]" />
          <span className="text-white/90">Transparent, flat‑rate pricing</span>
        </div>
      </div>
    </section>
  )
}

export default TrustBar
