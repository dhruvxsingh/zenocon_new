"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Code, FileText, MessageSquare, Search, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const guides = [
    {
      title: "Getting Started with WhatsApp Business API",
      description: "Learn how to set up and configure your WhatsApp Business API account",
      icon: BookOpen,
      category: "guides",
      time: "10 min read",
    },
    {
      title: "Creating and Managing Templates",
      description: "Best practices for creating effective message templates",
      icon: MessageSquare,
      category: "guides",
      time: "8 min read",
    },
    {
      title: "Setting Up Webhooks",
      description: "Configure webhooks to receive real-time message updates",
      icon: Code,
      category: "guides",
      time: "12 min read",
    },
    {
      title: "Building Conversational Flows",
      description: "Design effective conversation flows for your customers",
      icon: MessageSquare,
      category: "guides",
      time: "15 min read",
    },
    {
      title: "Campaign Best Practices",
      description: "Tips for creating successful WhatsApp campaigns",
      icon: BookOpen,
      category: "guides",
      time: "7 min read",
    },
    {
      title: "WhatsApp Business API Compliance",
      description: "Understanding Meta's policies and compliance requirements",
      icon: FileText,
      category: "guides",
      time: "9 min read",
    },
  ]

  const apiDocs = [
    {
      title: "Messages API",
      description: "Send and receive messages through the WhatsApp Business API",
      icon: MessageSquare,
      category: "api",
      time: "Reference",
    },
    {
      title: "Templates API",
      description: "Create, manage, and send template messages",
      icon: FileText,
      category: "api",
      time: "Reference",
    },
    {
      title: "Media API",
      description: "Send and receive media files through WhatsApp",
      icon: FileText,
      category: "api",
      time: "Reference",
    },
    {
      title: "Webhooks",
      description: "Receive real-time updates for WhatsApp events",
      icon: Code,
      category: "api",
      time: "Reference",
    },
  ]

  const tutorials = [
    {
      title: "Setting Up Your WhatsApp Business Account",
      description: "Step-by-step guide to creating your WhatsApp Business account",
      icon: Video,
      category: "tutorials",
      time: "5:32",
    },
    {
      title: "Creating Your First Template",
      description: "Learn how to create and submit a message template",
      icon: Video,
      category: "tutorials",
      time: "7:15",
    },
    {
      title: "Sending Your First Message",
      description: "Send a template message to a customer",
      icon: Video,
      category: "tutorials",
      time: "4:48",
    },
    {
      title: "Setting Up Webhooks",
      description: "Configure webhooks to receive message updates",
      icon: Video,
      category: "tutorials",
      time: "8:22",
    },
  ]

  const filteredGuides = guides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredApiDocs = apiDocs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredTutorials = tutorials.filter(
    (tutorial) =>
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
            <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
            <p className="text-muted-foreground">Guides, references, and tutorials for the WhatsApp Business API</p>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documentation..."
              className="pl-8 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        <Tabs defaultValue="guides" className="space-y-6">
          <TabsList className="bg-background/60 backdrop-blur-sm">
            <TabsTrigger value="guides">
              <BookOpen className="mr-2 h-4 w-4" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="api">
              <Code className="mr-2 h-4 w-4" />
              API Reference
            </TabsTrigger>
            <TabsTrigger value="tutorials">
              <Video className="mr-2 h-4 w-4" />
              Video Tutorials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guides" className="space-y-6">
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredGuides.length > 0 ? (
                filteredGuides.map((guide, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <guide.icon className="h-5 w-5 text-teal-500" />
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                      </div>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">{guide.time}</div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="group">
                        Read Guide{" "}
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No guides found matching your search.</p>
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <motion.div
              className="grid gap-6 md:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredApiDocs.length > 0 ? (
                filteredApiDocs.map((doc, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <doc.icon className="h-5 w-5 text-teal-500" />
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                      </div>
                      <CardDescription>{doc.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">{doc.time}</div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="group">
                        View Reference{" "}
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No API references found matching your search.</p>
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6">
            <motion.div
              className="grid gap-6 md:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredTutorials.length > 0 ? (
                filteredTutorials.map((tutorial, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <tutorial.icon className="h-5 w-5 text-teal-500" />
                        <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                      </div>
                      <CardDescription>{tutorial.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">Duration: {tutorial.time}</div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="group">
                        Watch Tutorial{" "}
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No tutorials found matching your search.</p>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>Can't find what you're looking for? We're here to help.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-4">
              <Button variant="outline" className="flex-1">
                <MessageSquare className="mr-2 h-4 w-4" /> Contact Support
              </Button>
              <Button variant="outline" className="flex-1">
                <FileText className="mr-2 h-4 w-4" /> Submit a Feature Request
              </Button>
              <Button variant="outline" className="flex-1">
                <BookOpen className="mr-2 h-4 w-4" /> Visit Meta's Documentation
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
