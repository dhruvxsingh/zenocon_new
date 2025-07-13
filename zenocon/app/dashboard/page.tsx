import type { Metadata } from "next"
import DashboardPage from "./dashboard-page"

export const metadata: Metadata = {
  title: "Dashboard | Zenocon",
  description: "Manage your WhatsApp business messaging with Zenocon",
}

export default function Page() {
  return <DashboardPage />
}
