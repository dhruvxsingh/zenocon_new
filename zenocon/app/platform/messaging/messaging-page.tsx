"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUp, Clock, MessageSquare, Send, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock templates
const templates = [
  {
    name: "hello_world",
    language: "en_US",
    namespace: "whatsapp_business_platform",
    components: [
      {
        type: "HEADER",
        format: "TEXT",
        text: "Hello World",
        example: {
          header_text: ["Our Business"],
        },
      },
      {
        type: "BODY",
        text: "Welcome and congratulations!! This message demonstrates your ability to send a WhatsApp message notification from the Cloud API, hosted by Meta. Thank you for taking the time to test with us.",
        example: {
          body_text: [["John", "your inquiry"]],
        },
      },
    ],
  },
  // {
  //   name: "appointment_reminder",
  //   language: "en_US",
  //   namespace: "whatsapp_business_platform",
  //   components: [
  //     {
  //       type: "HEADER",
  //       format: "TEXT",
  //       text: "Appointment Reminder",
  //       example: {
  //         header_text: ["Appointment Reminder"],
  //       },
  //     },
  //     {
  //       type: "BODY",
  //       text: "Hi {{1}}, this is a reminder that you have an appointment scheduled for {{2}} at {{3}}. Please reply YES to confirm or NO to reschedule.",
  //       example: {
  //         body_text: [["Sarah", "tomorrow", "2:00 PM"]],
  //       },
  //     },
  //   ],
  // },
  // {
  //   name: "order_update",
  //   language: "en_US",
  //   namespace: "whatsapp_business_platform",
  //   components: [
  //     {
  //       type: "HEADER",
  //       format: "TEXT",
  //       text: "Order Update",
  //       example: {
  //         header_text: ["Order Update"],
  //       },
  //     },
  //     {
  //       type: "BODY",
  //       text: "Your order #{{1}} has been {{2}}. It will be {{3}} by {{4}}.",
  //       example: {
  //         body_text: [["12345", "shipped", "delivered", "Friday"]],
  //       },
  //     },
  //   ],
  // },
]

// Export as both named and default export
export function MessagingPage() {
  const [activeTab, setActiveTab] = useState("business-initiated")
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [templateParams, setTemplateParams] = useState<Record<string, string>>({})
  const [recipientPhone, setRecipientPhone] = useState("+91")
  const [responseJson, setResponseJson] = useState<string | null>(null)

  // User-initiated messaging state
  const [replyWindow, setReplyWindow] = useState(true)
  const [replyMessage, setReplyMessage] = useState("")
  const [conversation, setConversation] = useState<
    Array<{
      direction: "inbound" | "outbound"
      content: string
      timestamp: Date
    }>
  >([
    {
      direction: "inbound",
      content: "Hi, I'm interested in your services. Can you tell me more?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
  ])

  const handleTemplateChange = (templateName: string) => {
    const template = templates.find((t) => t.name === templateName) || templates[0]
    setSelectedTemplate(template)
    setTemplateParams({})
  }


  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSendTemplate = async () => {
    setLoading(true);
    setStatus(null);

    const response = await fetch('/api/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: recipientPhone }), // Replace with actual number
    });

    const data = await response.json();

    if (response.ok) {
      setStatus('Message sent successfully!');
    } else {
      setStatus(`Failed: ${data.error}`);
    }

    setLoading(false);

    setResponseJson(JSON.stringify(data, null, 2))

    // Add to conversation
    const templateContent = getFilledTemplateContent()
    setConversation((prev) => [
      ...prev,
      {
        direction: "outbound",
        content: `[Template: ${selectedTemplate.name}] ${templateContent}`,
        timestamp: new Date(),
      },
    ])
  };



  // const handleSendTemplate = () => {
  //   // Mock sending a template message
  //   const response = {
  //     messaging_product: "whatsapp",
  //     contacts: [
  //       {
  //         input: recipientPhone,
  //         wa_id: "12345678901",
  //       },
  //     ],
  //     messages: [
  //       {
  //         id: "wamid.HBgLMTIzNDU2Nzg5MDEVAgARGBI5QTNDQTA5OTdGODFGQkJFOAA=",
  //       },
  //     ],
  //   }

  //   setResponseJson(JSON.stringify(response, null, 2))

  //   // Add to conversation
  //   const templateContent = getFilledTemplateContent()
  //   setConversation((prev) => [
  //     ...prev,
  //     {
  //       direction: "outbound",
  //       content: `[Template: ${selectedTemplate.name}] ${templateContent}`,
  //       timestamp: new Date(),
  //     },
  //   ])
  // }

  const handleSendReply = () => {
    if (!replyMessage.trim()) return

    // Add to conversation
    setConversation((prev) => [
      ...prev,
      {
        direction: "outbound",
        content: replyMessage,
        timestamp: new Date(),
      },
    ])

    // Mock response
    const response = {
      messaging_product: "whatsapp",
      contacts: [
        {
          input: recipientPhone,
          wa_id: "12345678901",
        },
      ],
      messages: [
        {
          id: "wamid.HBgLMTIzNDU2Nzg5MDEVAgARGBI5QTNDQTA5OTdGODFGQkJFOAA=",
        },
      ],
    }

    setResponseJson(JSON.stringify(response, null, 2))
    setReplyMessage("")
  }

  const simulateIncomingMessage = () => {
    setConversation((prev) => [
      ...prev,
      {
        direction: "inbound",
        content: "Thanks for the information! Do you offer any discounts?",
        timestamp: new Date(),
      },
    ])
  }

  const getFilledTemplateContent = () => {
    // Get the body component
    const bodyComponent = selectedTemplate.components.find((c) => c.type === "BODY")
    if (!bodyComponent) return ""

    // Replace placeholders with values
    let content = bodyComponent.text
    Object.entries(templateParams).forEach(([key, value]) => {
      content = content.replace(`{{${key}}}`, value)
    })

    return content
  }

  const getParameterCount = () => {
    // Count unique parameters in all components
    const params = new Set<string>()

    selectedTemplate.components.forEach((component) => {
      if (component.text) {
        const matches = component.text.match(/\{\{(\d+)\}\}/g) || []
        matches.forEach((match) => {
          const paramNumber = match.replace(/\{\{|\}\}/g, "")
          params.add(paramNumber)
        })
      }
    })

    return Array.from(params).sort((a, b) => Number(a) - Number(b))
  }

  return (
    <div className="container max-w-6xl py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Messaging Sandbox</h1>
          <p className="text-muted-foreground">Test WhatsApp messaging in both directions</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="business-initiated">Business-Initiated</TabsTrigger>
            <TabsTrigger value="user-initiated">User-Initiated</TabsTrigger>
          </TabsList>

          <TabsContent value="business-initiated" className="mt-6">
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send Template Message</CardTitle>
                  <CardDescription>Send a template message to a WhatsApp user</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="template">Template</Label>
                      <Select value={selectedTemplate.name} onValueChange={handleTemplateChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.map((template) => (
                            <SelectItem key={template.name} value={template.name}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue={selectedTemplate.language}>
                        <SelectTrigger>
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
                      <Label htmlFor="namespace">Namespace</Label>
                      <Input id="namespace" value={selectedTemplate.namespace} readOnly />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recipient">Recipient Phone Number</Label>
                      <Input
                        id="recipient"
                        value={recipientPhone}
                        onChange={(e) => setRecipientPhone(e.target.value)}
                      />
                    </div>

                    <Accordion type="single" collapsible defaultValue="parameters">
                      <AccordionItem value="parameters">
                        <AccordionTrigger>Template Parameters</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            {getParameterCount().map((param) => (
                              <div key={param} className="space-y-2">
                                <Label htmlFor={`param-${param}`}>Parameter {param}</Label>
                                <Input
                                  id={`param-${param}`}
                                  placeholder={`Enter value for {{${param}}}`}
                                  value={templateParams[param] || ""}
                                  onChange={(e) =>
                                    setTemplateParams((prev) => ({
                                      ...prev,
                                      [param]: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSendTemplate}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Template Message
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Template Preview</CardTitle>
                    <CardDescription>Preview how your template will appear</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg bg-gray-100 p-4">
                      <div className="space-y-4">
                        {selectedTemplate.components.map((component, index) => (
                          <div key={index} className="space-y-1">
                            {component.type === "HEADER" && (
                              <div className="font-semibold">
                                {component.text.replace(
                                  /\{\{(\d+)\}\}/g,
                                  (match, paramNumber) => templateParams[paramNumber] || match,
                                )}
                              </div>
                            )}
                            {component.type === "BODY" && (
                              <div>
                                {component.text.replace(
                                  /\{\{(\d+)\}\}/g,
                                  (match, paramNumber) => templateParams[paramNumber] || match,
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {responseJson && (
                  <Card>
                    <CardHeader>
                      <CardTitle>API Response</CardTitle>
                      <CardDescription>Response from the WhatsApp Business API</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <pre className="max-h-[300px] overflow-auto rounded-lg bg-gray-100 p-4 text-sm">
                        <code>{responseJson}</code>
                      </pre>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="user-initiated" className="mt-6">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="md:row-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Conversation</CardTitle>
                      <CardDescription>Simulate a WhatsApp conversation</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={simulateIncomingMessage}>
                      Simulate Incoming Message
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[500px] flex-col">
                    <div className="flex-1 space-y-4 overflow-y-auto p-2">
                      {conversation.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.direction === "inbound" ? "justify-start" : "justify-end"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.direction === "inbound" ? "bg-gray-100 text-gray-900" : "bg-teal-500 text-white"
                            }`}
                          >
                            <div className="text-sm">{message.content}</div>
                            <div className="mt-1 text-right text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      {replyWindow ? (
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                              <Clock className="h-3 w-3" />
                              24-hour window active
                            </Badge>
                            <div className="ml-auto text-xs text-muted-foreground">Window expires in 23:45:12</div>
                          </div>
                          <div className="flex gap-2">
                            <Textarea
                              placeholder="Type your reply..."
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              className="min-h-[80px] flex-1"
                            />
                            <Button className="self-end" onClick={handleSendReply} disabled={!replyMessage.trim()}>
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-lg border border-dashed p-4 text-center text-muted-foreground">
                          <MessageSquare className="mx-auto mb-2 h-8 w-8" />
                          <p>24-hour window expired. You must use a template message to contact this user.</p>
                          <Button variant="outline" className="mt-2" onClick={() => setActiveTab("business-initiated")}>
                            Switch to Templates
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conversation Info</CardTitle>
                  <CardDescription>Details about this conversation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <span>{recipientPhone}</span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Message Window</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant={replyWindow ? "outline" : "secondary"} className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {replyWindow ? "Active" : "Expired"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={() => setReplyWindow(!replyWindow)}
                        >
                          {replyWindow ? "Simulate Expiry" : "Reset Window"}
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Message Stats</h3>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 rounded-md bg-muted p-2">
                          <ArrowDown className="h-4 w-4 text-blue-500" />
                          <div>
                            <div className="text-xs text-muted-foreground">Received</div>
                            <div className="font-medium">
                              {conversation.filter((m) => m.direction === "inbound").length}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 rounded-md bg-muted p-2">
                          <ArrowUp className="h-4 w-4 text-teal-500" />
                          <div>
                            <div className="text-xs text-muted-foreground">Sent</div>
                            <div className="font-medium">
                              {conversation.filter((m) => m.direction === "outbound").length}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {responseJson && (
                <Card>
                  <CardHeader>
                    <CardTitle>API Response</CardTitle>
                    <CardDescription>Response from the WhatsApp Business API</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="max-h-[200px] overflow-auto rounded-lg bg-gray-100 p-4 text-sm">
                      <code>{responseJson}</code>
                    </pre>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

// Also export as default for Next.js page
export default MessagingPage
