/**
 * NeonCatKeyboard.tsx
 * SVG line-drawn illustration of a neon cat sitting on a keyboard.
 * Designed for hero placement: tech-forward, playful, scalable.
 */

import React from 'react'

/** Props for NeonCatKeyboard allowing width/height overrides */
export interface NeonCatKeyboardProps extends React.SVGProps<SVGSVGElement> {
  /** Optional size control via width (height auto with viewBox) */
  width?: number | string
}

/**
 * NeonCatKeyboard
 * Minimal, stylized outlines using the brand neon color and neutral strokes.
 */
export const NeonCatKeyboard: React.FC<NeonCatKeyboardProps> = ({ width = '100%', ...rest }) => {
  return (
    <svg
      width={width}
      viewBox="0 0 800 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Neon cat sitting on a keyboard"
      {...rest}
    >
      {/* Keyboard base */}
      <rect x="60" y="360" width="680" height="80" rx="10" stroke="rgba(255,255,255,0.65)" strokeWidth="3" />
      {/* Keys grid */}
      {Array.from({ length: 10 }).map((_, i) => (
        <rect
          key={`k1-${i}`}
          x={80 + i * 62}
          y={380}
          width="52"
          height="20"
          rx="4"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <rect
          key={`k2-${i}`}
          x={80 + i * 62}
          y={406}
          width="52"
          height="20"
          rx="4"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
        />
      ))}

      {/* Cat body (neon) */}
      <path
        d="M270 330c-20-20-32-48-32-76 0-63 55-114 122-114s122 51 122 114c0 28-12 56-32 76"
        stroke="var(--cc-green)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cat head */}
      <path
        d="M360 110c-24 0-44 20-44 44 0 17 10 33 26 40l18 8 18-8c16-7 26-23 26-40 0-24-20-44-44-44Z"
        stroke="var(--cc-green)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* Ears */}
      <path d="M328 132l-26-24 4 30" stroke="var(--cc-green)" strokeWidth="5" strokeLinecap="round" />
      <path d="M392 132l26-24-4 30" stroke="var(--cc-green)" strokeWidth="5" strokeLinecap="round" />
      {/* Eyes and nose (minimal dots/tri) */}
      <circle cx="344" cy="150" r="4" fill="var(--cc-green)" />
      <circle cx="376" cy="150" r="4" fill="var(--cc-green)" />
      <path d="M360 162l6 6h-12l6-6Z" fill="var(--cc-green)" />
      {/* Cat paws on keyboard */}
      <path d="M300 345c0 10 8 18 18 18s18-8 18-18" stroke="var(--cc-green)" strokeWidth="5" strokeLinecap="round" />
      <path d="M422 345c0 10 8 18 18 18s18-8 18-18" stroke="var(--cc-green)" strokeWidth="5" strokeLinecap="round" />
      {/* Tail */}
      <path
        d="M478 300c30 8 54 30 54 58 0 17-9 31-25 39"
        stroke="var(--cc-green)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Subtle neon accent lines behind */}
      <line x1="140" y1="78" x2="220" y2="78" stroke="#00eaff" strokeOpacity="0.6" strokeWidth="4" />
      <line x1="560" y1="90" x2="640" y2="90" stroke="#00eaff" strokeOpacity="0.6" strokeWidth="4" />
    </svg>
  )
}

export default NeonCatKeyboard
