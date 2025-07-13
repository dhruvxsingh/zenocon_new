import type { Metadata } from "next"
import { MessagingPage } from "./messaging-page"

export const metadata: Metadata = {
  title: "Messaging Sandbox | WhatsApp Platform",
  description: "Test WhatsApp messaging in both directions",
}

export default function Page() {
  return <MessagingPage />
}
