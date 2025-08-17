/**
 * Benefits.tsx
 * Plain-English benefits focused on outcomes for local service businesses.
 */
import React from 'react'
import { Section } from '../Section'
import { Card, CardContent } from '../../components/ui/card'
import { PhoneCall, MapPin, Target, Wrench, LineChart, Headphones } from 'lucide-react'

/** A single benefit item description */
interface BenefitItem {
  /** Benefit label in plain English */
  title: string
  /** Short explanation */
  desc: string
  /** Icon component */
  Icon: React.ComponentType<{ size?: number; className?: string }>
}

/** Benefits list kept simple and jargon-free */
const BENEFITS: BenefitItem[] = [
  { title: 'More calls, not just clicks', desc: 'We aim for booked jobs and real inquiries.', Icon: PhoneCall },
  { title: 'Built for local search', desc: 'Show up where nearby customers actually look.', Icon: MapPin },
  { title: 'Clear goals', desc: 'Agree on a simple target like cost per lead.', Icon: Target },
  { title: 'Fast fixes first', desc: 'Fix tracking and basics in the first two weeks.', Icon: Wrench },
  { title: 'Improve month to month', desc: 'Keep what works, cut what doesn’t—every 2 weeks.', Icon: LineChart },
  { title: 'Easy to reach', desc: 'Ask a question, get a reply within 24 hours.', Icon: Headphones },
]

/**
 * Benefits
 * Grid of benefit cards with friendly icons and simple copy.
 */
export const Benefits: React.FC = () => {
  return (
    <Section id="benefits" className="bg-[var(--cc-surface)]/60">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-semibold md:text-3xl text-white">Built for busy local businesses</h2>
        <p className="mt-3 text-white/80">No buzzwords—just the things that actually move the needle.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((b) => (
          <Card key={b.title} className="border-white/10 bg-white/5">
            <CardContent className="flex gap-3 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500/15">
                <b.Icon size={18} className="text-[var(--cc-green)]" />
              </div>
              <div>
                <p className="font-medium text-white">{b.title}</p>
                <p className="text-sm text-white/80">{b.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}

export default Benefits
