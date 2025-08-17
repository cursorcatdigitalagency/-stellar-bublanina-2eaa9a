/**
 * Favicon.tsx
 * Lightweight utility component to inject/update the document favicon links at runtime.
 * Avoids modifying HTML templates and works across SPA route changes.
 */
import React, { useEffect } from 'react'

/** Props for Favicon component */
export interface FaviconProps {
  /** Icon URL (PNG/SVG/ICO). Prefer absolute URL for reliability on CDNs. */
  href: string
  /** MIME type for the icon; defaults to PNG. */
  type?: string
  /** Sizes attribute for the standard icon link. */
  sizes?: string
}

/**
 * Favicon
 * Inserts or updates common favicon link tags in the document head.
 */
const Favicon: React.FC<FaviconProps> = ({ href, type = 'image/png', sizes = '32x32' }) => {
  useEffect(() => {
    /**
     * setIcon
     * Ensures a link[rel=...] exists and points to href with proper attributes.
     */
    const setIcon = (rel: string) => {
      let link = document.querySelector<HTMLLinkElement>(`link[rel='${rel}']`)
      if (!link) {
        link = document.createElement('link')
        link.rel = rel
        document.head.appendChild(link)
      }
      link.href = href
      if (type) link.type = type
      if (sizes && rel === 'icon') link.sizes = sizes
    }

    // Update the common favicon rels
    setIcon('icon')
    setIcon('shortcut icon')

    // Provide an Apple touch icon for better iOS appearance
    let apple = document.querySelector<HTMLLinkElement>("link[rel='apple-touch-icon']")
    if (!apple) {
      apple = document.createElement('link')
      apple.rel = 'apple-touch-icon'
      document.head.appendChild(apple)
    }
    apple.href = href
    apple.sizes = '180x180'
  }, [href, type, sizes])

  return null
}

export default Favicon
