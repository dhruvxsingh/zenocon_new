"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2, ChevronRight, Copy, ExternalLink, Film, MessageSquare, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Export as both default and named export
export function AppReviewPage() {
  const [templateName, setTemplateName] = useState("app_review_demo")
  const [templateCategory, setTemplateCategory] = useState("UTILITY")
  const [templateLanguage, setTemplateLanguage] = useState("en_US")
  const [templateContent, setTemplateContent] = useState(
    "This is a demonstration of our WhatsApp Business API integration for app review purposes.",
  )
  const [businessName, setBusinessName] = useState("Your Business Name")
  const [copied, setCopied] = useState(false)

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(templateContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container max-w-5xl py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">App Review Helper</h1>
          <p className="text-muted-foreground">Prepare for WhatsApp Business API app review</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Sample Message Template</CardTitle>
                <CardDescription>Create a sample template for app review demonstration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input id="template-name" value={templateName} onChange={(e) => setTemplateName(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template-category">Category</Label>
                    <Select value={templateCategory} onValueChange={setTemplateCategory}>
                      <SelectTrigger id="template-category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTILITY">Utility</SelectItem>
                        <SelectItem value="MARKETING">Marketing</SelectItem>
                        <SelectItem value="AUTHENTICATION">Authentication</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template-language">Language</Label>
                    <Select value={templateLanguage} onValueChange={setTemplateLanguage}>
                      <SelectTrigger id="template-language">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en_US">English (US)</SelectItem>
                        <SelectItem value="es_ES">Spanish (Spain)</SelectItem>
                        <SelectItem value="pt_BR">Portuguese (Brazil)</SelectItem>
                        <SelectItem value="fr_FR">French (France)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input id="business-name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template-content">Template Content</Label>
                    <Textarea
                      id="template-content"
                      value={templateContent}
                      onChange={(e) => setTemplateContent(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleCopyTemplate}>
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? "Copied!" : "Copy Template"}
                </Button>
                <Button asChild>
                  <Link
                    href="https://business.facebook.com/wa/manage/message-templates/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Create in WhatsApp Manager
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>How your template will appear in WhatsApp</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                    <span className="font-medium">{businessName}</span>
                  </div>
                  <div className="rounded-lg bg-green-50 p-3 text-gray-800">{templateContent}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>App Review Instructions</CardTitle>
                <CardDescription>Step-by-step guide for recording your app review demo</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible defaultValue="step-1">
                  <AccordionItem value="step-1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          1
                        </div>
                        <span>Prepare Your Environment</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-8">
                        <p>Before recording, make sure you have:</p>
                        <ul className="list-disc space-y-1 pl-5 text-sm">
                          <li>A test phone number connected to WhatsApp Business API</li>
                          <li>Created and approved the sample template above</li>
                          <li>A test user's phone number to send messages to</li>
                          <li>Screen recording software ready (e.g., OBS, QuickTime)</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-2">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          2
                        </div>
                        <span>Start Recording</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-8">
                        <p>Begin your screen recording and narrate the following:</p>
                        <ul className="list-disc space-y-1 pl-5 text-sm">
                          <li>Introduce yourself and your business</li>
                          <li>Explain the purpose of your WhatsApp integration</li>
                          <li>Mention which WhatsApp Business API features you'll be demonstrating</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-3">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          3
                        </div>
                        <span>Demonstrate Template Messaging</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-8">
                        <p>Show the process of sending a template message:</p>
                        <ul className="list-disc space-y-1 pl-5 text-sm">
                          <li>Navigate to the Messaging Sandbox in this platform</li>
                          <li>Select your app review template</li>
                          <li>Enter the recipient's phone number</li>
                          <li>Fill in any template parameters</li>
                          <li>Send the message and show the API response</li>
                          <li>Show the message being received on the test device</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-4">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          4
                        </div>
                        <span>Demonstrate User-Initiated Messaging</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-8">
                        <p>Show how your business responds to user messages:</p>
                        <ul className="list-disc space-y-1 pl-5 text-sm">
                          <li>Have the test user send a message to your business number</li>
                          <li>Show the incoming message in the Webhook Logs page</li>
                          <li>Navigate to the User-Initiated tab in the Messaging Sandbox</li>
                          <li>Compose and send a reply</li>
                          <li>Show the message being received on the test device</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-5">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          5
                        </div>
                        <span>Show Webhook Integration</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-8">
                        <p>Demonstrate your webhook handling:</p>
                        <ul className="list-disc space-y-1 pl-5 text-sm">
                          <li>Navigate to the Webhook Logs page</li>
                          <li>Explain how your system processes incoming and outgoing messages</li>
                          <li>Show the JSON payload for a few messages</li>
                          <li>Explain how you handle different message types</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-6">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          6
                        </div>
                        <span>Conclude the Recording</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-8">
                        <p>Wrap up your demonstration:</p>
                        <ul className="list-disc space-y-1 pl-5 text-sm">
                          <li>Summarize the features you've demonstrated</li>
                          <li>Explain how these features benefit your users</li>
                          <li>Thank the reviewer for their time</li>
                          <li>Stop the recording and save the file</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Helpful Resources</CardTitle>
                <CardDescription>Links to official documentation and tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-md bg-primary/10 p-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">WhatsApp Business API Documentation</h3>
                      <p className="text-sm text-muted-foreground">
                        Official documentation for the WhatsApp Business API
                      </p>
                      <Button variant="link" className="h-auto p-0 text-sm" asChild>
                        <Link
                          href="https://developers.facebook.com/docs/whatsapp/api/reference"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Documentation
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <div className="rounded-md bg-primary/10 p-2">
                      <Film className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">App Review Guidelines</h3>
                      <p className="text-sm text-muted-foreground">
                        Meta's guidelines for WhatsApp Business API app review
                      </p>
                      <Button variant="link" className="h-auto p-0 text-sm" asChild>
                        <Link
                          href="https://developers.facebook.com/docs/whatsapp/guides/app-review"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Guidelines
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <div className="rounded-md bg-primary/10 p-2">
                      <Smartphone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">WhatsApp Business Manager</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage your WhatsApp Business account and templates
                      </p>
                      <Button variant="link" className="h-auto p-0 text-sm" asChild>
                        <Link
                          href="https://business.facebook.com/wa/manage/home/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open Manager
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800">Ready for App Review</AlertTitle>
            <AlertDescription className="text-green-700">
              Follow the steps above to create a comprehensive app review demonstration. Once your recording is
              complete, submit it through the Meta for Developers portal.
            </AlertDescription>
          </Alert>
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild size="lg">
            <Link href="https://business.facebook.com/wa/manage/home/" target="_blank" rel="noopener noreferrer">
              Go to WhatsApp Manager
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

// Also export as default for Next.js page
export default AppReviewPage
