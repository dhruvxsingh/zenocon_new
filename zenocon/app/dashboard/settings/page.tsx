import type { Metadata } from "next"
import SettingsPage from "./settings-page"

export const metadata: Metadata = {
  title: "Settings | Zenocon",
  description: "Manage your account and application settings",
}

export default function Page() {
  return <SettingsPage />
}
