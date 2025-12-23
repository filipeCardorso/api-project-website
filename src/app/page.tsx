import { Hero } from "@/components/landing/hero"
import { BadgeCloud } from "@/components/landing/badge-cloud"
import { HowItWorks } from "@/components/landing/how-it-works"
import { FeatureGrid } from "@/components/landing/feature-grid"
import { DevSnippetsTabs } from "@/components/landing/dev-snippets-tabs"
import { PricingPreview } from "@/components/landing/pricing-preview"
import { FAQShort } from "@/components/landing/faq-short"
import { CTASection } from "@/components/landing/cta-section"

export default function HomePage() {
  return (
    <>
      <Hero />
      <BadgeCloud />
      <HowItWorks />
      <FeatureGrid />
      <DevSnippetsTabs />
      <PricingPreview />
      <FAQShort />
      <CTASection />
    </>
  )
}
