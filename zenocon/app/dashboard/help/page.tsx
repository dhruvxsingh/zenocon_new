import type { Metadata } from "next"
import HelpPage from "./help-page"

export const metadata: Metadata = {
  title: "Help & Support | Zenocon",
  description: "Get help and support for your WhatsApp Business API",
}

export default function Page() {
  return <HelpPage />
}
