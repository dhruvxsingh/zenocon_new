import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documentation | Zenocon",
  description: "WhatsApp Business API documentation and guides",
}

// Fix: Import the default export instead of a named export
import DocumentationPage from "./documentation-page"

export default function Page() {
  return <DocumentationPage />
}
