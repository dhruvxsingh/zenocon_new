"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

// Mock data for analytics
const messageData = [
  { date: "2023-05-01", sent: 120, delivered: 118, read: 95, responded: 42 },
  { date: "2023-05-02", sent: 145, delivered: 142, read: 110, responded: 51 },
  { date: "2023-05-03", sent: 132, delivered: 130, read: 105, responded: 48 },
  { date: "2023-05-04", sent: 160, delivered: 155, read: 125, responded: 60 },
  { date: "2023-05-05", sent: 175, delivered: 170, read: 140, responded: 65 },
  { date: "2023-05-06", sent: 190, delivered: 185, read: 150, responded: 70 },
  { date: "2023-05-07", sent: 205, delivered: 200, read: 165, responded: 75 },
  { date: "2023-05-08", sent: 220, delivered: 215, read: 175, responded: 80 },
  { date: "2023-05-09", sent: 235, delivered: 230, read: 190, responded: 85 },
  { date: "2023-05-10", sent: 250, delivered: 245, read: 200, responded: 90 },
  { date: "2023-05-11", sent: 265, delivered: 260, read: 215, responded: 95 },
  { date: "2023-05-12", sent: 280, delivered: 275, read: 225, responded: 100 },
  { date: "2023-05-13", sent: 295, delivered: 290, read: 240, responded: 105 },
  { date: "2023-05-14", sent: 310, delivered: 305, read: 250, responded: 110 },
]

const campaignData = [
  { name: "Welcome Series", sent: 1250, delivered: 1200, read: 980, responded: 450 },
  { name: "May Promotion", sent: 5000, delivered: 4850, read: 3200, responded: 1500 },
  { name: "Feedback Request", sent: 2500, delivered: 2450, read: 1800, responded: 950 },
  { name: "Order Updates", sent: 3200, delivered: 3150, read: 2900, responded: 1200 },
  { name: "Re-engagement", sent: 4000, delivered: 3900, read: 2200, responded: 800 },
]

const templateData = [
  { name: "Welcome Message", sent: 850, delivered: 840, read: 780, responded: 320 },
  { name: "Order Confirmation", sent: 1250, delivered: 1240, read: 1150, responded: 450 },
  { name: "Shipping Update", sent: 980, delivered: 970, read: 890, responded: 380 },
  { name: "Feedback Request", sent: 750, delivered: 740, read: 580, responded: 290 },
  { name: "Promotional Offer", sent: 1500, delivered: 1450, read: 950, responded: 420 },
]

const engagementData = [
  { name: "Read", value: 75 },
  { name: "Responded", value: 25 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  // Format dates for display
  const formattedMessageData = messageData.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }))

  // Filter data based on time range
  const filteredMessageData = timeRange === "7d" ? formattedMessageData.slice(-7) : formattedMessageData

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 md:p-8">
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">Track your WhatsApp messaging performance and engagement</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="14d">Last 14 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-background/60 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,120</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.2%</div>
                  <p className="text-xs text-muted-foreground">+0.3% from last month</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Read Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">82.5%</div>
                  <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42.1%</div>
                  <p className="text-xs text-muted-foreground">+8.4% from last month</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Message Performance</CardTitle>
                  <CardDescription>Track your message delivery, read, and response rates over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      sent: {
                        label: "Sent",
                        color: "hsl(var(--chart-1))",
                      },
                      delivered: {
                        label: "Delivered",
                        color: "hsl(var(--chart-2))",
                      },
                      read: {
                        label: "Read",
                        color: "hsl(var(--chart-3))",
                      },
                      responded: {
                        label: "Responded",
                        color: "hsl(var(--chart-4))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={filteredMessageData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="sent" stroke="var(--color-sent)" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="delivered" stroke="var(--color-delivered)" />
                        <Line type="monotone" dataKey="read" stroke="var(--color-read)" />
                        <Line type="monotone" dataKey="responded" stroke="var(--color-responded)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Engagement Breakdown</CardTitle>
                    <CardDescription>Percentage of messages read and responded to</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={engagementData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {engagementData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Daily Message Volume</CardTitle>
                    <CardDescription>Number of messages sent per day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={filteredMessageData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="sent" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Compare the performance of your WhatsApp campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={campaignData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sent" fill="#8884d8" name="Sent" />
                        <Bar dataKey="delivered" fill="#82ca9d" name="Delivered" />
                        <Bar dataKey="read" fill="#ffc658" name="Read" />
                        <Bar dataKey="responded" fill="#ff8042" name="Responded" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Top Performing Campaigns</CardTitle>
                    <CardDescription>Campaigns with the highest engagement rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {campaignData
                        .sort((a, b) => b.read / b.sent - a.read / a.sent)
                        .slice(0, 3)
                        .map((campaign, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{campaign.name}</div>
                              <div className="text-sm text-muted-foreground">
                                Read rate: {((campaign.read / campaign.sent) * 100).toFixed(1)}%
                              </div>
                            </div>
                            <div className="text-sm font-medium">
                              {campaign.read} / {campaign.sent}
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Response Rates</CardTitle>
                    <CardDescription>Campaigns with the highest response rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {campaignData
                        .sort((a, b) => b.responded / b.read - a.responded / a.read)
                        .slice(0, 3)
                        .map((campaign, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{campaign.name}</div>
                              <div className="text-sm text-muted-foreground">
                                Response rate: {((campaign.responded / campaign.read) * 100).toFixed(1)}%
                              </div>
                            </div>
                            <div className="text-sm font-medium">
                              {campaign.responded} / {campaign.read}
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Template Performance</CardTitle>
                  <CardDescription>Compare the performance of your WhatsApp templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={templateData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={150} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sent" fill="#8884d8" name="Sent" />
                        <Bar dataKey="delivered" fill="#82ca9d" name="Delivered" />
                        <Bar dataKey="read" fill="#ffc658" name="Read" />
                        <Bar dataKey="responded" fill="#ff8042" name="Responded" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Top Performing Templates</CardTitle>
                    <CardDescription>Templates with the highest read rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {templateData
                        .sort((a, b) => b.read / b.sent - a.read / a.sent)
                        .slice(0, 3)
                        .map((template, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{template.name}</div>
                              <div className="text-sm text-muted-foreground">
                                Read rate: {((template.read / template.sent) * 100).toFixed(1)}%
                              </div>
                            </div>
                            <div className="text-sm font-medium">
                              {template.read} / {template.sent}
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Response Rates</CardTitle>
                    <CardDescription>Templates with the highest response rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {templateData
                        .sort((a, b) => b.responded / b.read - a.responded / a.read)
                        .slice(0, 3)
                        .map((template, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{template.name}</div>
                              <div className="text-sm text-muted-foreground">
                                Response rate: {((template.responded / template.read) * 100).toFixed(1)}%
                              </div>
                            </div>
                            <div className="text-sm font-medium">
                              {template.responded} / {template.read}
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
