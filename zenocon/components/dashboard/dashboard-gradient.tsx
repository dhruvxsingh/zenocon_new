"use client"

import { cn } from "@/lib/utils"
import { MeshGradient } from "@/components/mesh-gradient"

interface DashboardGradientProps {
  variant?: "primary" | "secondary" | "tertiary"
  intensity?: "light" | "medium" | "strong"
  className?: string
}

export function DashboardGradient({ variant = "primary", intensity = "light", className }: DashboardGradientProps) {
  const getOpacity = () => {
    switch (intensity) {
      case "light":
        return 0.15
      case "medium":
        return 0.25
      case "strong":
        return 0.4
      default:
        return 0.15
    }
  }

  const getColors = () => {
    switch (variant) {
      case "primary":
        return ["#0ea5e9", "#14b8a6", "#8b5cf6"]
      case "secondary":
        return ["#f97316", "#ec4899", "#8b5cf6"]
      case "tertiary":
        return ["#14b8a6", "#0ea5e9", "#a855f7"]
      default:
        return ["#0ea5e9", "#14b8a6", "#8b5cf6"]
    }
  }

  return (
    <div className={cn("pointer-events-none fixed inset-0 z-[-1] h-full w-full overflow-hidden opacity-30", className)}>
      <MeshGradient colors={getColors()} className="h-full w-full" style={{ opacity: getOpacity() }} />
    </div>
  )
}
