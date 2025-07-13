"use client"

import { AlertDescription } from "@/components/ui/alert"

import { AlertTitle } from "@/components/ui/alert"

import { Alert } from "@/components/ui/alert"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2, ChevronRight, Facebook, Phone, Store } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function OnboardingPage() {
  const [onboardingState, setOnboardingState] = useState({
    metaLoginComplete: false,
    businessVerified: false,
    phoneNumberConnected: false,
    wabaId: "",
    phoneNumber: "",
  })

  const startOnboarding = () => {
    // Mock the Meta login process
    setOnboardingState((prev) => ({ ...prev, metaLoginComplete: true }))

    // After 2 seconds, mock business verification
    setTimeout(() => {
      setOnboardingState((prev) => ({ ...prev, businessVerified: true }))

      // After 3 more seconds, mock phone number connection
      setTimeout(() => {
        setOnboardingState((prev) => ({
          ...prev,
          phoneNumberConnected: true,
          wabaId: "123456789012345",
          phoneNumber: "+1 (555) 123-4567",
        }))
      }, 3000)
    }, 2000)
  }

  const resetOnboarding = () => {
    setOnboardingState({
      metaLoginComplete: false,
      businessVerified: false,
      phoneNumberConnected: false,
      wabaId: "",
      phoneNumber: "",
    })
  }

  const isComplete = onboardingState.phoneNumberConnected

  return (
    <div className="container max-w-5xl py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Business Onboarding</h1>
            <p className="text-muted-foreground">Connect your business to WhatsApp Business Platform</p>
          </div>
          {isComplete && (
            <Button asChild variant="default">
              <Link href="/platform/messaging">
                Go to Messaging Sandbox
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>WhatsApp Business Embedded Signup</CardTitle>
            <CardDescription>
              Connect your Meta Business Manager and phone number to get started with WhatsApp Business Platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className={`rounded-full p-2 ${onboardingState.metaLoginComplete ? "bg-green-100" : "bg-muted"}`}>
                  <Facebook
                    className={`h-6 w-6 ${onboardingState.metaLoginComplete ? "text-green-600" : "text-muted-foreground"}`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium">Step 1: Meta Login</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect your Meta account to access your Business Manager
                  </p>
                  {onboardingState.metaLoginComplete && (
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <CheckCircle2 className="mr-1 h-4 w-4" /> Meta login complete
                    </div>
                  )}
                </div>
              </div>

              <div className="border-b" />

              <div className="flex items-start gap-4">
                <div className={`rounded-full p-2 ${onboardingState.businessVerified ? "bg-green-100" : "bg-muted"}`}>
                  <Store
                    className={`h-6 w-6 ${onboardingState.businessVerified ? "text-green-600" : "text-muted-foreground"}`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium">Step 2: Business Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Select or create a Business Manager and verify your business
                  </p>
                  {onboardingState.businessVerified && (
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <CheckCircle2 className="mr-1 h-4 w-4" /> Business verified
                    </div>
                  )}
                </div>
              </div>

              <div className="border-b" />

              <div className="flex items-start gap-4">
                <div
                  className={`rounded-full p-2 ${onboardingState.phoneNumberConnected ? "bg-green-100" : "bg-muted"}`}
                >
                  <Phone
                    className={`h-6 w-6 ${onboardingState.phoneNumberConnected ? "text-green-600" : "text-muted-foreground"}`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium">Step 3: Phone Number Connection</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect an existing phone number or purchase a new one
                  </p>
                  {onboardingState.phoneNumberConnected && (
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <CheckCircle2 className="mr-1 h-4 w-4" /> Phone number connected
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {!isComplete ? (
              <Button onClick={startOnboarding} disabled={onboardingState.metaLoginComplete}>
                {onboardingState.metaLoginComplete ? "Onboarding in progress..." : "Start Onboarding"}
              </Button>
            ) : (
              <Button variant="outline" onClick={resetOnboarding}>
                Reset Onboarding
              </Button>
            )}
          </CardFooter>
        </Card>

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Alert className="mb-8 border-green-200 bg-green-50">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">Onboarding Complete!</AlertTitle>
              <AlertDescription className="text-green-700">
                Your business is now connected to WhatsApp Business Platform.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>Connection Details</CardTitle>
                <CardDescription>Your WhatsApp Business Account details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">WABA ID</h3>
                    <p className="text-lg">{onboardingState.wabaId}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Phone Number</h3>
                    <p className="text-lg">{onboardingState.phoneNumber}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="default">
                  <Link href="/platform/messaging">
                    Go to Messaging Sandbox
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
