/**
 * Results section
 * Shows 3 quick proof tiles with anonymized but specific outcomes.
 */
import React from 'react'
import { Section } from '../Section'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

/** Result tile interface */
interface ResultItem {
  /** Short label for the client or vertical */
  title: string
  /** Key metrics text */
  metrics: string
  /** Optional image for context (uses smart placeholder) */
  img: string
}

/** Anonymized proof tiles; replace with real case studies later */
const RESULTS: ResultItem[] = [
  {
    title: 'Local plumbing company',
    metrics: 'CPL down 47% in 60 days; +92% form fills',
    img: 'https://pub-cdn.sider.ai/u/U005HE2JX58/web-coder/6899a124f530328388947327/resource/570e637f-d62f-4d33-bbf9-429644d1fb26.jpg',
  },
  {
    title: 'Dental clinic',
    metrics: '38% more booked consults QoQ; $54 CPA',
    img: 'https://pub-cdn.sider.ai/u/U005HE2JX58/web-coder/6899a124f530328388947327/resource/c4c34f3f-f8bb-438f-b133-8e3dee8ccb9c.jpg',
  },
  {
    title: 'Home services',
    metrics: 'First results in 14 days; calls up 2.1× in 6 weeks',
    img: 'https://pub-cdn.sider.ai/u/U005HE2JX58/web-coder/6899a124f530328388947327/resource/3723c365-d2d8-416a-bbcf-202788f3d11e.jpg',
  },
]

/**
 * Results
 * Displays tiles in a responsive grid.
 */
export const Results: React.FC = () => {
  return (
    <Section id="results">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-semibold md:text-3xl text-white">Results</h2>
        <p className="mt-3 text-white/80">Real outcomes we optimize for—calls, forms, and booked jobs.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {RESULTS.map((r) => (
          <Card key={r.title} className="border-white/10 bg-white/5 overflow-hidden">
            <div className="h-36 w-full">
              <img src={r.img} alt="" className="object-cover h-full w-full" />
            </div>
            <CardHeader>
              <CardTitle className="text-white text-base">{r.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 text-sm">{r.metrics}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
