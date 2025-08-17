/**
 * ServiceAreas.tsx
 * Display Canadian coverage with province pills.
 */
import React from 'react'
import { Section } from '../Section'
import { MapPin } from 'lucide-react'

/** A single service area tag */
interface Area {
  /** Province name */
  name: string
}

/** Provinces across Canada (alphabetical by common grouping) */
const AREAS: Area[] = [
  { name: 'Alberta' },
  { name: 'British Columbia' },
  { name: 'Saskatchewan' },
  { name: 'Manitoba' },
  { name: 'Ontario' },
  { name: 'Quebec' },
  { name: 'New Brunswick' },
  { name: 'Nova Scotia' },
  { name: 'Prince Edward Island' },
  { name: 'Newfoundland and Labrador' },
]

/**
 * ServiceAreas
 * A strip of province pills to emphasize Canada-wide coverage.
 */
export const ServiceAreas: React.FC = () => {
  return (
    <Section id="areas">
      <div className="mb-6 flex items-center justify-center gap-2 text-center">
        <MapPin size={18} className="text-[var(--cc-green)]" />
        <h2 className="text-xl font-semibold text-white md:text-2xl">Proudly serving Canada</h2>
      </div>

      <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2">
        {AREAS.map((a) => (
          <span
            key={a.name}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80"
          >
            {a.name}
          </span>
        ))}
      </div>
    </Section>
  )
}

export default ServiceAreas
