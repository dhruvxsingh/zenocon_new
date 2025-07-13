import type React from "react"
import { cn } from "@/lib/utils"

interface MeshGradientProps {
  className?: string
  children?: React.ReactNode
  variant?: "primary" | "secondary" | "tertiary"
}

export function MeshGradient({ className, children, variant = "primary" }: MeshGradientProps) {
  const gradientClasses = {
    primary: "bg-gradient-to-br from-teal-500/20 via-transparent to-blue-500/20",
    secondary: "bg-gradient-to-tr from-purple-500/10 via-transparent to-teal-500/10",
    tertiary: "bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-transparent",
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className={cn("absolute inset-0", gradientClasses[variant])} />
      {children}
    </div>
  )
}
