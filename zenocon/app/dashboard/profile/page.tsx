import type { Metadata } from "next"
import { ProfilePage } from "./profile-page"

export const metadata: Metadata = {
  title: "Profile | Zenocon",
  description: "View and manage your user profile",
}

export default function Page() {
  return <ProfilePage />
}
