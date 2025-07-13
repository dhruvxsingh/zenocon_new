import { cn } from "@/lib/utils"

interface MeshBlobProps {
  className?: string
  variant?: "teal" | "blue" | "purple"
  size?: "sm" | "md" | "lg"
  opacity?: number
}

export function MeshBlob({ className, variant = "teal", size = "md", opacity = 0.1 }: MeshBlobProps) {
  const variantClasses = {
    teal: "bg-teal-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
  }

  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
  }

  return (
    <div
      className={cn("absolute rounded-full blur-3xl", variantClasses[variant], sizeClasses[size], className)}
      style={{ opacity }}
    />
  )
}
