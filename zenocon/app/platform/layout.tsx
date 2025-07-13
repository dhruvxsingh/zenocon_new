import type React from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export const metadata = {
  title: "WhatsApp Business Platform",
  description: "WhatsApp Business Platform tools and utilities",
}

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
