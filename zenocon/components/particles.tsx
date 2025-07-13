"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  refresh?: boolean
  color?: string
  varyOpacity?: boolean
}

export function Particles({
  className,
  quantity = 30, // Reduced from 50
  staticity = 50,
  ease = 50,
  refresh = false,
  color = "#14b8a6",
  varyOpacity = true,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<any[]>([])
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Only run particles when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.1 },
    )

    if (canvasContainerRef.current) {
      observer.observe(canvasContainerRef.current)
    }

    return () => {
      if (canvasContainerRef.current) {
        observer.unobserve(canvasContainerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d", { alpha: true })
    }
    initCanvas()

    let animationFrameId: number

    if (isVisible) {
      animationFrameId = window.requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (isVisible) {
        initCanvas()
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [isVisible])

  useEffect(() => {
    if (isVisible) {
      initCanvas()
    }
  }, [refresh, isVisible])

  const initCanvas = () => {
    resizeCanvas()
    drawParticles()
  }

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current = []
      canvasSize.current.w = canvasContainerRef.current.offsetWidth
      canvasSize.current.h = canvasContainerRef.current.offsetHeight
      canvasRef.current.width = canvasSize.current.w * dpr
      canvasRef.current.height = canvasSize.current.h * dpr
      canvasRef.current.style.width = `${canvasSize.current.w}px`
      canvasRef.current.style.height = `${canvasSize.current.h}px`
      context.current.scale(dpr, dpr)
    }
  }

  const circleParams = () => {
    const x = Math.floor(Math.random() * canvasSize.current.w)
    const y = Math.floor(Math.random() * canvasSize.current.h)
    const size = Math.floor(Math.random() * 2) + 1
    const opacity = varyOpacity ? Math.random() * 0.5 + 0.1 : 0.3

    return {
      x,
      y,
      translateX: 0,
      translateY: 0,
      size,
      alpha: 0,
      targetAlpha: opacity,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      magnetism: 0.1 + Math.random() * 4,
    }
  }

  const drawParticles = () => {
    circles.current = []
    for (let i = 0; i < quantity; i++) {
      circles.current.push(circleParams())
    }
  }

  const remapValue = (value: number, start1: number, end1: number, start2: number, end2: number): number => {
    const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
    return remapped > 0 ? remapped : 0
  }

  const animate = () => {
    if (!isVisible) return

    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)
      circles.current.forEach((circle, i) => {
        // Handle the alpha value
        const edge = [
          circle.x + circle.translateX - circle.size, // distance from left edge
          canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
          circle.y + circle.translateY - circle.size, // distance from top edge
          canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
        ]
        const closestEdge = edge.reduce((a, b) => Math.min(a, b))
        const remapClosestEdge = remapValue(closestEdge, 0, 20, 0, 1)
        if (remapClosestEdge > 1) {
          circle.alpha += 0.02
          if (circle.alpha > circle.targetAlpha) {
            circle.alpha = circle.targetAlpha
          }
        } else {
          circle.alpha = circle.targetAlpha * remapClosestEdge
        }
        circle.x += circle.dx
        circle.y += circle.dy
        if (circle.x < 0 || circle.x > canvasSize.current.w) {
          circle.dx *= -1
        }
        if (circle.y < 0 || circle.y > canvasSize.current.h) {
          circle.dy *= -1
        }
        // Mouse interaction
        const mouseDistance = Math.sqrt(
          Math.pow(mouse.current.x - circle.x, 2) + Math.pow(mouse.current.y - circle.y, 2),
        )
        const mouseMaxDistance = staticity
        const distanceRatio = Math.min(1, mouseDistance / mouseMaxDistance)
        const translateValue = (1 - distanceRatio) * ease
        const translateX = (mouse.current.x - circle.x) * translateValue
        const translateY = (mouse.current.y - circle.y) * translateValue
        // Apply changes
        circle.translateX = translateX
        circle.translateY = translateY
        // Draw
        const circleX = circle.x + circle.translateX
        const circleY = circle.y + circle.translateY
        context.current.beginPath()
        context.current.arc(circleX, circleY, circle.size, 0, 2 * Math.PI)
        context.current.fillStyle = `${color}${Math.round(circle.alpha * 255).toString(16)}`
        context.current.fill()
      })
    }

    if (isVisible) {
      window.requestAnimationFrame(animate)
    }
  }

  return (
    <div className={cn("fixed inset-0 -z-10", className)} ref={canvasContainerRef} style={{ willChange: "transform" }}>
      <canvas ref={canvasRef} style={{ willChange: "transform" }} />
    </div>
  )
}
