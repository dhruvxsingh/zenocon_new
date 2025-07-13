import type { Metadata } from "next"
import { OnboardingPage } from "./onboarding-page"

export const metadata: Metadata = {
  title: "Business Onboarding | WhatsApp Platform",
  description: "Get onboarded to WhatsApp Business via Meta's embedded signup flow",
}

export default function Page() {
  return <OnboardingPage />
}
