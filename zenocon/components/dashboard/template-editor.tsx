"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Check, ImageIcon, Plus, Video, X } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { TemplatePreview } from "@/components/dashboard/template-preview"

interface TemplateEditorProps {
  children: React.ReactNode
  onSave?: (templateData: any) => void
  initialData?: any
  isEdit?: boolean
}

export function TemplateEditor({ children, onSave, initialData, isEdit = false }: TemplateEditorProps) {
  const [open, setOpen] = useState(false)
  const [templateData, setTemplateData] = useState({
    name: "",
    category: "utility",
    language: "en_US",
    headerType: "text",
    headerContent: "",
    bodyContent: "Hello {{1}}, thank you for your order #{{2}}. We'll notify you when it ships.",
    footerContent: "Thank you for shopping with us!",
    buttons: [
      { type: "quick_reply", text: "Track Order" },
      { type: "quick_reply", text: "View Details" },
    ],
  })

  // Initialize with initial data if provided
  useEffect(() => {
    if (initialData) {
      setTemplateData({
        name: initialData.name || "",
        category: initialData.category?.toLowerCase() || "utility",
        language: initialData.language === "English" ? "en_US" : initialData.language || "en_US",
        headerType: initialData.headerType || "text",
        headerContent: initialData.headerContent || "",
        bodyContent: initialData.bodyContent || "",
        footerContent: initialData.footerContent || "",
        buttons: initialData.buttons || [],
      })
    }
  }, [initialData, open])

  const handleChange = (field: string, value: string) => {
    setTemplateData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddButton = () => {
    if (templateData.buttons.length < 3) {
      setTemplateData((prev) => ({
        ...prev,
        buttons: [...prev.buttons, { type: "quick_reply", text: "" }],
      }))
    }
  }

  const handleRemoveButton = (index: number) => {
    setTemplateData((prev) => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== index),
    }))
  }

  const handleButtonChange = (index: number, value: string) => {
    setTemplateData((prev) => ({
      ...prev,
      buttons: prev.buttons.map((button, i) => (i === index ? { ...button, text: value } : button)),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSave) {
      onSave(templateData)
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Template" : "Create New WhatsApp Template"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Edit your WhatsApp message template. Edited templates will need to be re-approved."
              : "Create a new message template for your WhatsApp Business account"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Template Name</Label>
                <Input
                  id="name"
                  value={templateData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g., order_confirmation"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={templateData.category} onValueChange={(value) => handleChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utility">Utility</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="authentication">Authentication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={templateData.language} onValueChange={(value) => handleChange("language", value)}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en_US">English (US)</SelectItem>
                      <SelectItem value="es_ES">Spanish</SelectItem>
                      <SelectItem value="fr_FR">French</SelectItem>
                      <SelectItem value="de_DE">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="buttons">Buttons</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Header (Optional)</Label>
                  <Select value={templateData.headerType} onValueChange={(value) => handleChange("headerType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select header type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                    </SelectContent>
                  </Select>

                  {templateData.headerType === "text" && (
                    <Input
                      value={templateData.headerContent}
                      onChange={(e) => handleChange("headerContent", e.target.value)}
                      placeholder="Header text (60 characters max)"
                      maxLength={60}
                    />
                  )}

                  {templateData.headerType === "image" && (
                    <div className="flex items-center gap-2">
                      <div className="flex h-20 w-20 items-center justify-center rounded border border-dashed">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <Button type="button" variant="outline" size="sm">
                        Upload Image
                      </Button>
                    </div>
                  )}

                  {templateData.headerType === "video" && (
                    <div className="flex items-center gap-2">
                      <div className="flex h-20 w-20 items-center justify-center rounded border border-dashed">
                        <Video className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <Button type="button" variant="outline" size="sm">
                        Upload Video
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body">Body (Required)</Label>
                  <Textarea
                    id="body"
                    value={templateData.bodyContent}
                    onChange={(e) => handleChange("bodyContent", e.target.value)}
                    placeholder="Enter your message body here. Use {{1}}, {{2}}, etc. for variables."
                    className="min-h-[100px]"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Use &#123;&#123;1&#125;&#125;, &#123;&#123;2&#125;&#125;, etc. as placeholders for dynamic content
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="footer">Footer (Optional)</Label>
                  <Input
                    id="footer"
                    value={templateData.footerContent}
                    onChange={(e) => handleChange("footerContent", e.target.value)}
                    placeholder="Footer text (60 characters max)"
                    maxLength={60}
                  />
                </div>
              </TabsContent>

              <TabsContent value="buttons" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Quick Reply Buttons (Up to 3)</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddButton}
                      disabled={templateData.buttons.length >= 3}
                    >
                      <Plus className="mr-1 h-4 w-4" /> Add Button
                    </Button>
                  </div>

                  {templateData.buttons.map((button, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Input
                        value={button.text}
                        onChange={(e) => handleButtonChange(index, e.target.value)}
                        placeholder={`Button ${index + 1} text`}
                        maxLength={20}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveButton(index)}
                        className="hover:bg-red-100 hover:text-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}

                  <p className="text-xs text-muted-foreground">
                    Quick reply buttons allow users to respond with a single tap
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="pt-4">
                <div className="flex justify-center">
                  <TemplatePreview template={templateData} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-500 hover:bg-teal-600 transition-colors">
              <Check className="mr-2 h-4 w-4" /> {isEdit ? "Update Template" : "Save Template"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
