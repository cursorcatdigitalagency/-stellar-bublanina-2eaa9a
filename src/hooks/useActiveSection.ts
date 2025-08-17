/**
 * useActiveSection
 * Observes section elements and returns the currently active section id
 * to support nav link highlighting while scrolling.
 */
import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id') || ''
            if (id) setActive(id)
          }
        })
      },
      {
        rootMargin: '-40% 0px -50% 0px', // triggers when the section enters mid viewport
        threshold: [0, 0.2, 0.6, 1],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds.join(',')])

  return active
}
