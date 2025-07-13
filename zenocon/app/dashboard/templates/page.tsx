import type { Metadata } from "next"
import TemplatesPageClient from "./TemplatesPageClient"

export const metadata: Metadata = {
  title: "WhatsApp Templates | Zenocon",
  description: "Manage your WhatsApp message templates",
}

export default function TemplatesPage() {
  return <TemplatesPageClient />
}
