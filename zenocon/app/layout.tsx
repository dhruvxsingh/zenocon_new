import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ServiceProvider } from "@/lib/services/service-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zenocon | Power Smarter Customer Conversations",
  description: "Automate campaigns, manage support, and grow loyalty – all through WhatsApp",
  other: {
    'facebook-domain-verification': 'nczst4fbvnr1n6ij8ejmg3hx8e9um4',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ServiceProvider useMocks={true}>{children}</ServiceProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
