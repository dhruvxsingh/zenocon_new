"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { type AnimationVariant, getAnimationClass } from "@/lib/animate"
import { cn } from "@/lib/utils"

interface AnimatedProps {
  children: React.ReactNode
  animation: AnimationVariant
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  once?: boolean
}

export function Animated({
  children,
  animation,
  delay = 0,
  duration = 500,
  className = "",
  threshold = 0.1,
  once = true,
}: AnimatedProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: "50px", // Load animations a bit before they come into view
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [once, threshold])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-opacity will-change-transform",
        isVisible ? getAnimationClass(animation) : "opacity-0",
        className,
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}
