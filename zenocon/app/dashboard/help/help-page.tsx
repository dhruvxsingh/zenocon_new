"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ChevronDown, FileText, Headphones, HelpCircle, MessageSquare, Search, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
    }, 1000)
  }

  const faqs = [
    {
      question: "How do I create a WhatsApp Business API account?",
      answer:
        "To create a WhatsApp Business API account, you need to work with a WhatsApp Business Solution Provider (BSP) or apply directly through Meta. Our platform simplifies this process by guiding you through the embedded signup flow. Navigate to the Business Onboarding page to get started.",
    },
    {
      question: "What are message templates and why do I need them?",
      answer:
        "Message templates are pre-approved message formats that allow businesses to send notifications or updates to customers outside the 24-hour messaging window. Templates need to be approved by WhatsApp before they can be used. They're essential for initiating conversations and sending notifications to customers.",
    },
    {
      question: "How long does template approval take?",
      answer:
        "Template approval typically takes 24-48 hours, but can sometimes take longer depending on the template content and current review volumes. Templates that clearly follow WhatsApp's guidelines are approved faster.",
    },
    {
      question: "What is the 24-hour messaging window?",
      answer:
        "The 24-hour messaging window is the period during which businesses can send free-form messages to customers after receiving a customer-initiated message. Once this window expires, businesses must use pre-approved message templates to re-initiate conversations.",
    },
    {
      question: "How do I set up webhooks to receive messages?",
      answer:
        "To set up webhooks, go to the Settings page and navigate to the WhatsApp Business API tab. There, you'll find your webhook URL and verify token. Configure these in your Meta for Developers dashboard to start receiving real-time updates for messages and events.",
    },
    {
      question: "What types of media can I send through WhatsApp Business API?",
      answer:
        "WhatsApp Business API supports various media types including images, documents (PDF, DOC), audio files, video files, and stickers. Each media type has specific size limitations and format requirements.",
    },
    {
      question: "How are WhatsApp Business API messages priced?",
      answer:
        "WhatsApp Business API messages are priced based on conversation sessions. A conversation session starts when a business sends a message to a customer and includes all messages exchanged within a 24-hour window. Pricing varies by country and conversation type (business-initiated or user-initiated).",
    },
    {
      question: "What is the difference between HSM and Session messages?",
      answer:
        "HSM (Highly Structured Messages) are template messages that must be pre-approved and are used to initiate conversations outside the 24-hour window. Session messages are free-form messages that can be sent within the 24-hour customer service window after a customer initiates contact.",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
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
            <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
            <p className="text-muted-foreground">Get help with your WhatsApp Business API integration</p>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search help articles..."
              className="pl-8 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="bg-background/60 backdrop-blur-sm">
            <TabsTrigger value="faq">
              <HelpCircle className="mr-2 h-4 w-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Headphones className="mr-2 h-4 w-4" />
              Contact Support
            </TabsTrigger>
            <TabsTrigger value="documentation">
              <FileText className="mr-2 h-4 w-4" />
              Documentation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find answers to common questions about WhatsApp Business API</CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredFaqs.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {filteredFaqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            <div className="flex items-start">
                              <ChevronDown className="mr-2 h-5 w-5 shrink-0" />
                              <span>{faq.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-7">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No FAQs found matching your search.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Get help from our support team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="Brief description of your issue" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <select
                      id="category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a category</option>
                      <option value="account">Account Setup</option>
                      <option value="templates">Message Templates</option>
                      <option value="api">API Integration</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="technical">Technical Issues</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Describe your issue in detail" className="min-h-[150px]" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="attachments" className="text-sm font-medium">
                      Attachments (Optional)
                    </label>
                    <Input id="attachments" type="file" multiple />
                    <p className="text-xs text-muted-foreground">
                      You can attach screenshots or relevant files (max 5MB each)
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span> Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Submit Ticket
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Other Ways to Get Help</CardTitle>
                  <CardDescription>Connect with us through different channels</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center p-4 rounded-lg border border-border/40 bg-background/40">
                    <MessageSquare className="h-8 w-8 text-teal-500 mb-2" />
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Chat with our support team in real-time during business hours
                    </p>
                    <Button variant="outline" size="sm" className="mt-auto">
                      Start Chat
                    </Button>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-lg border border-border/40 bg-background/40">
                    <Headphones className="h-8 w-8 text-teal-500 mb-2" />
                    <h3 className="font-medium">Schedule a Call</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Book a call with one of our WhatsApp specialists
                    </p>
                    <Button variant="outline" size="sm" className="mt-auto">
                      Book Call
                    </Button>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-lg border border-border/40 bg-background/40">
                    <FileText className="h-8 w-8 text-teal-500 mb-2" />
                    <h3 className="font-medium">Knowledge Base</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Browse our extensive collection of help articles
                    </p>
                    <Button variant="outline" size="sm" className="mt-auto">
                      View Articles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>Explore our guides and API documentation</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col p-4 rounded-lg border border-border/40 bg-background/40">
                    <h3 className="font-medium flex items-center">
                      <FileText className="h-5 w-5 text-teal-500 mr-2" /> Getting Started Guides
                    </h3>
                    <p className="text-sm text-muted-foreground my-2">
                      Step-by-step guides to help you get started with WhatsApp Business API
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="text-sm">• Setting up your WhatsApp Business account</li>
                      <li className="text-sm">• Creating and managing templates</li>
                      <li className="text-sm">• Sending your first message</li>
                      <li className="text-sm">• Understanding the 24-hour window</li>
                    </ul>
                    <Button variant="ghost" size="sm" className="mt-auto self-start group">
                      View Guides{" "}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                  <div className="flex flex-col p-4 rounded-lg border border-border/40 bg-background/40">
                    <h3 className="font-medium flex items-center">
                      <FileText className="h-5 w-5 text-teal-500 mr-2" /> API Reference
                    </h3>
                    <p className="text-sm text-muted-foreground my-2">Comprehensive API documentation for developers</p>
                    <ul className="space-y-2 mb-4">
                      <li className="text-sm">• Messages API</li>
                      <li className="text-sm">• Templates API</li>
                      <li className="text-sm">• Media API</li>
                      <li className="text-sm">• Webhooks</li>
                    </ul>
                    <Button variant="ghost" size="sm" className="mt-auto self-start group">
                      View API Docs{" "}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                  <div className="flex flex-col p-4 rounded-lg border border-border/40 bg-background/40">
                    <h3 className="font-medium flex items-center">
                      <FileText className="h-5 w-5 text-teal-500 mr-2" /> Best Practices
                    </h3>
                    <p className="text-sm text-muted-foreground my-2">
                      Learn how to maximize your WhatsApp Business API implementation
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="text-sm">• Template design best practices</li>
                      <li className="text-sm">• Conversation flow optimization</li>
                      <li className="text-sm">• Compliance and policy guidelines</li>
                      <li className="text-sm">• Performance optimization</li>
                    </ul>
                    <Button variant="ghost" size="sm" className="mt-auto self-start group">
                      View Best Practices{" "}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                  <div className="flex flex-col p-4 rounded-lg border border-border/40 bg-background/40">
                    <h3 className="font-medium flex items-center">
                      <FileText className="h-5 w-5 text-teal-500 mr-2" /> Tutorials
                    </h3>
                    <p className="text-sm text-muted-foreground my-2">Step-by-step tutorials with code examples</p>
                    <ul className="space-y-2 mb-4">
                      <li className="text-sm">• Sending template messages</li>
                      <li className="text-sm">• Handling incoming messages</li>
                      <li className="text-sm">• Working with media files</li>
                      <li className="text-sm">• Setting up webhooks</li>
                    </ul>
                    <Button variant="ghost" size="sm" className="mt-auto self-start group">
                      View Tutorials{" "}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" /> Browse All Documentation
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
