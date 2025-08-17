/**
 * Home page for Cursor Cat Digital
 * Landing layout with hero, trust bar, ecommerce trust logos (removed per request), form, process, benefits, services/pricing, calculator, comparison, FAQ, contact, and a sticky mobile CTA.
 */
import React, { useEffect, useCallback, useState } from 'react'
import '../styles/global.css'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Services } from '../components/sections/Services'
import { Contact } from '../components/sections/Contact'
import { Footer } from '../components/sections/Footer'
import { HowWeWork } from '../components/sections/HowWeWork'
import { MobileCtaBar } from '../components/MobileCtaBar'
import { CalendarModal } from '../components/CalendarModal'
import RateCalculator from '../components/sections/RateCalculator'
import { TrustBar } from '../components/sections/TrustBar'
import { Benefits } from '../components/sections/Benefits'
import { Comparison } from '../components/sections/Comparison'
import { Faq } from '../components/sections/Faq'
import { ServiceAreas } from '../components/sections/ServiceAreas'
import LeadFormSection from '../components/sections/LeadFormSection'

/**
 * HomePage
 * Renders the full landing layout with a sticky footer pattern.
 */
const HomePage: React.FC = () => {
  /** Set page title for basic SEO */
  useEffect(() => {
    document.title = 'Cursor Cat Digital — Where Curiosity Meets Creativity & Conversion'
  }, [])

  /** Smooth scroll helper (retained) */
  const smoothScroll = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 76
    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [])

  /** Calendar modal open state (retained for future use) */
  const [openCal, setOpenCal] = useState(false)

  /** Scroll helpers (retained) */
  const scrollToPricing = useCallback(() => smoothScroll('services'), [smoothScroll])
  const scrollToContact = useCallback(() => smoothScroll('contact'), [smoothScroll])

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cc-bg)]">
      <Navbar />
      {/* Provide bottom padding for the mobile sticky bar to avoid overlap */}
      <main className="flex-1 pb-20 md:pb-0">
        <Hero />
        {/* Promises / trust indicators */}
        <TrustBar />
        {/* Main CTA form */}
        <LeadFormSection />
        <HowWeWork />
        <Benefits />
        <About />
        <Services />
        <RateCalculator onBook={() => setOpenCal(true)} />
        <Comparison />
        <Faq />
        <ServiceAreas />
        <Contact />
      </main>
      <Footer />

      {/* Mobile sticky CTA bar */}
      <MobileCtaBar onBook={() => setOpenCal(true)} onPricing={scrollToPricing} />

      {/* Calendar modal */}
      <CalendarModal open={openCal} onOpenChange={setOpenCal} />
    </div>
  )
}

export default HomePage
