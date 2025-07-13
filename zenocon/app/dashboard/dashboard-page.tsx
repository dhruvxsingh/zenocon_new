"use client"

import Link from "next/link"
import { ArrowRight, BarChart3, CheckCircle, Clock, MessageSquare, Users, XCircle } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 md:gap-8 p-4 md:p-8">
        <div>
          <motion.h1
            className="text-3xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome back, John
          </motion.h1>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Here's what's happening with your WhatsApp business messaging
          </motion.p>
        </div>

        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,543</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Contacts</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,350</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Templates</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+3 new this month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92.6%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="templates" className="space-y-4">
            <TabsList className="bg-background/60 backdrop-blur-sm">
              <TabsTrigger value="templates">Recent Templates</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="templates" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Welcome Message", status: "approved", date: "2 days ago" },
                  { name: "Order Confirmation", status: "approved", date: "1 week ago" },
                  { name: "Shipping Update", status: "pending", date: "3 days ago" },
                  { name: "Feedback Request", status: "approved", date: "5 days ago" },
                  { name: "Promotional Offer", status: "rejected", date: "1 day ago" },
                  { name: "Appointment Reminder", status: "approved", date: "2 weeks ago" },
                ].map((template, i) => (
                  <Card
                    key={i}
                    className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                  >
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Clock className="mr-1 h-3 w-3" /> {template.date}
                        </CardDescription>
                      </div>
                      <div
                        className={`px-2 py-1 text-xs rounded-full flex items-center ${
                          template.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : template.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {template.status === "approved" && <CheckCircle className="mr-1 h-3 w-3" />}
                        {template.status === "pending" && <Clock className="mr-1 h-3 w-3" />}
                        {template.status === "rejected" && <XCircle className="mr-1 h-3 w-3" />}
                        {template.status.charAt(0).toUpperCase() + template.status.slice(1)}
                      </div>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="ghost" size="sm" asChild className="group">
                        <Link href="/dashboard/templates">
                          View template{" "}
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <Button asChild className="bg-teal-500 hover:bg-teal-600">
                <Link href="/dashboard/templates">View all templates</Link>
              </Button>
            </TabsContent>
            <TabsContent value="activity" className="space-y-4">
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent activity across the platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { action: "Created new template", item: "Appointment Reminder", time: "2 hours ago" },
                    { action: "Edited template", item: "Welcome Message", time: "Yesterday" },
                    { action: "Sent campaign", item: "May Promotion", time: "2 days ago" },
                    { action: "Added contacts", item: "New Customers Group", time: "3 days ago" },
                    { action: "Template approved", item: "Order Confirmation", time: "1 week ago" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.item}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{activity.time}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
