import type React from "react"
import { PageWrapper } from "@/components/layout/page-wrapper"

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PageWrapper>{children}</PageWrapper>
}
