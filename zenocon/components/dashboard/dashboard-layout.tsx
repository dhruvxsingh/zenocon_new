"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  Bell,
  ChevronDown,
  Cog,
  HelpCircle,
  Home,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  User,
  Users,
  FileText,
  Smartphone,
  Webhook,
  Film,
  Moon,
  Sun,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DashboardGradient } from "@/components/dashboard/dashboard-gradient"
import { useTheme } from "next-themes"
import { useServices } from "@/lib/services/service-provider"
import { Skeleton } from "@/components/ui/skeleton"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { authService, notificationService, profileService, settingsService } = useServices()

  const [user, setUser] = useState<any>(null)
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authService.getCurrentUser()
        setUser(userData)

        const notificationsData = await notificationService.getNotifications()
        setNotifications(notificationsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [authService, notificationService])

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Templates", href: "/dashboard/templates", icon: MessageSquare },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: BarChart3 },
    { name: "Contacts", href: "/dashboard/contacts", icon: Users },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  const platformNavigation = [
    { name: "Business Onboarding", href: "/platform/onboarding", icon: Smartphone },
    { name: "Messaging Sandbox", href: "/platform/messaging", icon: MessageSquare },
    { name: "Webhook Logs", href: "/platform/logs", icon: Webhook },
    { name: "App Review Helper", href: "/platform/app-review", icon: Film },
  ]

  const supportNavigation = [
    { name: "Documentation", href: "/dashboard/documentation", icon: FileText },
    { name: "Help & Support", href: "/dashboard/help", icon: HelpCircle },
  ]

  const handleLogout = async () => {
    try {
      await authService.signOut()
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    try {
      await settingsService.updateTheme(newTheme)
    } catch (error) {
      console.error("Error updating theme:", error)
    }
  }

  const handleNotificationClick = async (id: string) => {
    try {
      await notificationService.markAsRead(id)
      setNotifications(
        notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
      )
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const unreadNotificationsCount = notifications.filter((notification) => !notification.read).length

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar className="border-r border-border/40 bg-background/95 backdrop-blur-sm">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <MessageSquare className="h-6 w-6 text-teal-500" />
              <span className="text-xl font-bold">Zenocon</span>
            </div>
            <div className="px-2 py-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-background pl-8 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={
                          pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
                        }
                        tooltip={item.name}
                      >
                        <Link href={item.href} className="transition-all duration-200 hover:translate-x-1">
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Platform Tools</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {platformNavigation.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href || pathname?.startsWith(item.href)}
                        tooltip={item.name}
                      >
                        <Link href={item.href} className="transition-all duration-200 hover:translate-x-1">
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Support</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {supportNavigation.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href || pathname?.startsWith(item.href)}
                        tooltip={item.name}
                      >
                        <Link href={item.href} className="transition-all duration-200 hover:translate-x-1">
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-3 py-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-2 transition-all duration-200 hover:bg-accent/50"
                  >
                    {loading ? (
                      <>
                        <Skeleton className="h-6 w-6 rounded-full mr-2" />
                        <Skeleton className="h-4 w-24" />
                      </>
                    ) : (
                      <>
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={user?.profile?.avatar_url || "/placeholder.svg?height=32&width=32"} />
                          <AvatarFallback>
                            {user?.profile?.full_name
                              ?.split(" ")
                              .map((n: string) => n[0])
                              .join("") || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span>{user?.profile?.full_name || "User"}</span>
                        <ChevronDown className="ml-auto h-4 w-4" />
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
                    <Cog className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={toggleTheme}>
                    {theme === "dark" ? (
                      <>
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="relative flex flex-1 flex-col overflow-hidden w-full">
          <DashboardGradient variant="tertiary" intensity="light" />
          <header className="flex h-14 items-center gap-4 border-b border-border/40 bg-background/80 px-4 backdrop-blur-sm lg:h-[60px] lg:px-6 z-10 w-full">
            <SidebarTrigger />
            <div className="flex-1" />
            <Button variant="outline" size="icon" onClick={toggleTheme} className="mr-2">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotificationsCount > 0 && (
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {unreadNotificationsCount}
                    </Badge>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-auto">
                  {loading ? (
                    Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="p-2">
                          <Skeleton className="h-5 w-full mb-1" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      ))
                  ) : notifications.length > 0 ? (
                    notifications.slice(0, 5).map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className={`flex flex-col items-start ${notification.read ? "opacity-70" : "font-medium"}`}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <span>{notification.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(notification.created_at).toLocaleString()}
                        </span>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="p-2 text-center text-sm text-muted-foreground">No notifications</div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 overflow-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="min-h-full w-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
