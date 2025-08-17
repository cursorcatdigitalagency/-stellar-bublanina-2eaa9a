/**
 * QrCodeTool.tsx
 * Internal utility page to generate a downloadable SVG QR code that points to the QR landing page.
 * - Defaults to https://cursorcat.digital/#/qr with UTM parameters for flyer tracking.
 * - Produces an SVG (not PNG) to comply with the "no PNG creation" rule and for crisp print quality.
 */

import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '../components/ui/button'
import { Copy, Download, RefreshCw } from 'lucide-react'
import * as QRCode from 'qrcode'

/** Props (none for now) */
interface QrCodeToolProps {}

/**
 * buildTrackedUrl
 * Builds the full URL including hash route and UTM parameters for tracking.
 */
function buildTrackedUrl(base: string, utmSource: string, utmMedium: string, utmCampaign: string): string {
  const url = new URL(base)
  // Preserve any existing query in the base and append UTM
  url.searchParams.set('utm_source', utmSource)
  url.searchParams.set('utm_medium', utmMedium)
  url.searchParams.set('utm_campaign', utmCampaign)
  return url.toString()
}

/**
 * QrCodeTool
 * Simple form + live preview + download actions for an SVG QR code.
 * Uses a dark UI with neon accents consistent with the landing page aesthetic.
 */
const QrCodeTool: React.FC<QrCodeToolProps> = () => {
  // Base defaults aimed at our QR landing page (hash route for reliable routing)
  const [baseUrl, setBaseUrl] = useState('https://cursorcat.digital/#/qr')
  const [utmSource, setUtmSource] = useState('qr')
  const [utmMedium, setUtmMedium] = useState('flyer')
  const [utmCampaign, setUtmCampaign] = useState('qr_flyer')

  const [svg, setSvg] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)

  /** Full URL with UTM parameters (memoized to avoid unnecessary regen) */
  const fullUrl = useMemo(() => buildTrackedUrl(baseUrl, utmSource, utmMedium, utmCampaign), [baseUrl, utmSource, utmMedium, utmCampaign])

  /**
   * generateSvg
   * Creates an SVG string QR code from the full URL.
   * We use a white background and very dark code so it scans reliably when printed.
   */
  async function generateSvg(): Promise<void> {
    setIsGenerating(true)
    try {
      const svgString = await QRCode.toString(fullUrl, {
        type: 'svg',
        width: 768, // large for print; users can scale down
        margin: 1,
        color: {
          dark: '#111111', // very dark modules
          light: '#ffffffff', // solid white background
        },
      })
      setSvg(svgString)
    } catch (err) {
      console.error('QR generation failed', err)
      setSvg('')
    } finally {
      setIsGenerating(false)
    }
  }

  /**
   * downloadSvg
   * Downloads the generated SVG as a file named cursorcat-qr.svg.
   */
  function downloadSvg(): void {
    if (!svg) return
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cursorcat-qr.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  /**
   * copyUrl
   * Copies the fully tracked URL to clipboard.
   */
  async function copyUrl(): Promise<void> {
    try {
      await navigator.clipboard.writeText(fullUrl)
      // simple, non-blocking feedback
      console.log('Copied URL:', fullUrl)
    } catch (e) {
      console.error('Failed to copy URL', e)
    }
  }

  // Generate initial SVG on mount
  useEffect(() => {
    generateSvg()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Header / Title */}
      <header className="cc-container py-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          <span className="text-white">QR Code Generator</span>{' '}
          <span className="text-[#00eaff]">for QR Landing Page</span>
        </h1>
        <p className="mt-2 text-white/80">
          Generates a print-ready SVG QR that points to{' '}
          <span className="text-[#39ff14]">#/qr</span> with UTM parameters.
        </p>
      </header>

      {/* Form + Preview */}
      <main className="cc-container pb-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Form */}
          <section
            aria-label="QR Parameters"
            className="rounded-2xl p-6 bg-black/70 border border-white/10"
            style={{ boxShadow: 'inset 0 0 12px rgba(0,234,255,0.10)' }}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="baseUrl" className="block text-sm text-white/70 mb-1">
                  Base URL (use hash route)
                </label>
                <input
                  id="baseUrl"
                  type="url"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="w-full rounded-md bg-black border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00eaff]"
                  placeholder="https://cursorcat.digital/#/qr"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="utmSource" className="block text-sm text-white/70 mb-1">
                    utm_source
                  </label>
                  <input
                    id="utmSource"
                    value={utmSource}
                    onChange={(e) => setUtmSource(e.target.value)}
                    className="w-full rounded-md bg-black border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00eaff]"
                    placeholder="qr"
                  />
                </div>
                <div>
                  <label htmlFor="utmMedium" className="block text-sm text-white/70 mb-1">
                    utm_medium
                  </label>
                  <input
                    id="utmMedium"
                    value={utmMedium}
                    onChange={(e) => setUtmMedium(e.target.value)}
                    className="w-full rounded-md bg-black border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00eaff]"
                    placeholder="flyer"
                  />
                </div>
                <div>
                  <label htmlFor="utmCampaign" className="block text-sm text-white/70 mb-1">
                    utm_campaign
                  </label>
                  <input
                    id="utmCampaign"
                    value={utmCampaign}
                    onChange={(e) => setUtmCampaign(e.target.value)}
                    className="w-full rounded-md bg-black border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00eaff]"
                    placeholder="qr_flyer"
                  />
                </div>
              </div>

              <div className="rounded-md bg-black/50 border border-white/10 p-3 text-xs text-white/70 break-all">
                <div className="mb-1 text-white/90">Full URL:</div>
                {fullUrl}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  size="sm"
                  onClick={generateSvg}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 bg-[#39ff14] text-black hover:bg-[#39ff14] hover:opacity-90"
                  aria-label="Regenerate QR"
                  title="Regenerate QR"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  {isGenerating ? 'Generating…' : 'Regenerate'}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyUrl}
                  className="bg-transparent inline-flex items-center gap-2 border-[#00eaff] text-[#00eaff] hover:text-[#39ff14] hover:border-[#39ff14]"
                  aria-label="Copy tracked URL"
                  title="Copy tracked URL"
                >
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  Copy URL
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadSvg}
                  disabled={!svg}
                  className="bg-transparent inline-flex items-center gap-2 border-[#00eaff] text-[#00eaff] hover:text-[#39ff14] hover:border-[#39ff14]"
                  aria-label="Download SVG"
                  title="Download SVG"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download SVG
                </Button>
              </div>
            </div>
          </section>

          {/* Preview */}
          <section
            aria-label="QR Preview"
            className="rounded-2xl p-6 bg-black/70 border border-white/10 flex items-center justify-center"
            style={{ boxShadow: 'inset 0 0 12px rgba(57,255,20,0.10)' }}
          >
            <div className="w-full max-w-[420px]">
              {svg ? (
                <div
                  className="w-full bg-white rounded-md p-4"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: svg }}
                  aria-label="QR code preview"
                />
              ) : (
                <div className="text-white/70 text-center">QR will appear here…</div>
              )}

              <p className="mt-3 text-xs text-white/60">
                Tip: Keep a white margin around the code when placing on a dark background so scanners can detect edges.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default QrCodeTool
