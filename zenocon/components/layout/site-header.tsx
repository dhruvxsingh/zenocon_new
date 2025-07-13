"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  Menu,
  X,
  ChevronDown,
  Store,
  Utensils,
  ShoppingBag,
  Truck,
  GraduationCap,
  Briefcase,
  Heart,
  Building,
  Plane,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const industries = [
    { name: "All Industries", href: "/industries", icon: Store },
    { name: "Food & Beverage", href: "/industries/food-beverage", icon: Utensils },
    { name: "E-commerce", href: "/industries/ecommerce", icon: ShoppingBag },
    { name: "Logistics", href: "/industries/logistics", icon: Truck },
    { name: "Education", href: "/industries/education", icon: GraduationCap },
    { name: "Professional Services", href: "/industries/professional-services", icon: Briefcase },
    { name: "Healthcare", href: "/industries/healthcare", icon: Heart },
    { name: "Finance", href: "/industries/finance", icon: Building },
    { name: "Travel", href: "/industries/travel", icon: Plane },
  ]

  const navigation = [
    { name: "Features", href: "/features" },
    {
      name: "Industries",
      href: "/industries",
      dropdown: true,
      items: industries,
    },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <MessageSquare className="h-6 w-6 text-teal-500" />
            <span className="text-xl font-bold">Zenocon</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navigation.map((item) =>
              item.dropdown ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-teal-500">
                    {item.name} <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    {item.items?.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link href={subItem.href} className="flex items-center gap-2">
                          <subItem.icon className="h-4 w-4" />
                          <span>{subItem.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-teal-500",
                    pathname === item.href ? "text-teal-500" : "text-gray-600",
                  )}
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block text-sm font-medium text-gray-600 hover:text-teal-500">
            Login
          </Link>
          <Button asChild className="bg-teal-500 hover:bg-teal-600">
            <Link href="/signup">Get Started</Link>
          </Button>
          <button
            className="md:hidden p-2 text-gray-600 hover:text-teal-500 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="container py-4 space-y-4">
            {navigation.map((item) =>
              item.dropdown ? (
                <div key={item.name} className="space-y-2">
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="pl-4 space-y-2 border-l border-gray-100">
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-teal-500"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <subItem.icon className="h-4 w-4" />
                        <span>{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block text-sm font-medium transition-colors hover:text-teal-500",
                    pathname === item.href ? "text-teal-500" : "text-gray-600",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ),
            )}
            <Link
              href="/login"
              className="block text-sm font-medium text-gray-600 hover:text-teal-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
