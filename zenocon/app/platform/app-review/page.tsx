import type { Metadata } from "next"
import { AppReviewPage } from "./app-review-page"

export const metadata: Metadata = {
  title: "App Review Helper | WhatsApp Platform",
  description: "Prepare for WhatsApp Business API app review",
}

export default function Page() {
  return <AppReviewPage />
}
