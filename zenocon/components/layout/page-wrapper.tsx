import type { ReactNode } from "react"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"
import { Particles } from "@/components/particles"

interface PageWrapperProps {
  children: ReactNode
  showParticles?: boolean
}

export function PageWrapper({ children, showParticles = true }: PageWrapperProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {showParticles && (
        <Particles className="fixed inset-0 -z-10 animate-fade-in" quantity={30} ease={30} color="#14b8a6" />
      )}
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
