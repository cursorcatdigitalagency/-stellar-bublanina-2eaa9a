/**
 * Faq.tsx
 * Plain-language FAQ to answer common questions without jargon.
 */
import React from 'react'
import { Section } from '../Section'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion'

/** A single FAQ item */
interface QA {
  /** Question text */
  q: string
  /** Answer text */
  a: string
}

/** Simple, non-technical questions and answers */
const QAS: QA[] = [
  {
    q: 'How fast can we start seeing results?',
    a:
      'Most businesses see early signs within 3–4 weeks. We fix tracking first, launch a focused page and ads, then improve every 2 weeks.',
  },
  {
    q: 'Do I need a big ad budget?',
    a:
      'No. We can start small and scale. We’ll recommend a budget based on your area and service so you’re not overspending.',
  },
  {
    q: 'Is there a long contract?',
    a: 'No. We work month‑to‑month. If we’re not the right fit, you aren’t locked in.',
  },
  {
    q: 'What will I need to provide?',
    a:
      'Basic business info, your best offers, access to your website or profiles, and a quick weekly check‑in for decisions.',
  },
  {
    q: 'How do you report results?',
    a:
      'We focus on calls and forms. You’ll get a short update every 2 weeks and a simple dashboard you can skim.',
  },
]

/**
 * Faq
 * Accordion list of common questions in plain English.
 */
export const Faq: React.FC = () => {
  return (
    <Section id="faq" className="bg-[var(--cc-surface)]/60">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold md:text-3xl text-white">Frequently asked questions</h2>
        <p className="mt-3 text-white/80">Clear answers for busy owners—no marketing jargon.</p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {QAS.map((item, idx) => (
            <AccordionItem key={item.q} value={`item-${idx}`}>
              <AccordionTrigger className="text-left text-white/90">{item.q}</AccordionTrigger>
              <AccordionContent className="text-white/80">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  )
}

export default Faq
