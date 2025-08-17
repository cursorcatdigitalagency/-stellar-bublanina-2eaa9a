/**
 * CalendarModal
 * Lightweight Radix Dialog wrapper to embed Calendly without leaving the site.
 * Used by CTAs to increase conversion and reduce friction.
 */
import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

/** Props for CalendarModal open state and trigger label */
export interface CalendarModalProps {
  /** Controls open state from parent */
  open: boolean
  /** State setter from parent */
  onOpenChange: (open: boolean) => void
}

/**
 * CalendarModal
 * Renders a modal with an embedded Calendly scheduling page.
 */
export const CalendarModal: React.FC<CalendarModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm" />
        {/* Content */}
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[101] w-[95vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-white/10 bg-[var(--cc-surface)] shadow-2xl"
          aria-label="Book a 15-minute call"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <Dialog.Title className="text-base font-semibold">Book a 15‑min fit call</Dialog.Title>
            <Dialog.Close className="rounded p-1 text-white/70 hover:bg-white/10 hover:text-white" aria-label="Close">
              <X size={18} />
            </Dialog.Close>
          </div>
          {/* iFrame wrapper NOTE: height tuned for mobile usability */}
          <div className="h-[70vh] w-full bg-black">
            <iframe
              title="Calendly booking"
              src="https://calendly.com/brent-cursorcat/15min?hide_gdpr_banner=1"
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
