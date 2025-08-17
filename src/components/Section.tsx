/**
 * Section wrapper component
 * Provides consistent spacing, id anchor, and optional background helpers.
 */
import React from 'react'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Unique id to anchor navigation */
  id: string
  /** Optional narrow width container */
  contained?: boolean
}

export const Section: React.FC<SectionProps> = ({ id, contained = true, className = '', children, ...rest }) => {
  return (
    <section id={id} aria-label={id} className={`py-16 md:py-24 ${className}`} {...rest}>
      <div className={contained ? 'cc-container' : ''}>{children}</div>
    </section>
  )
}
