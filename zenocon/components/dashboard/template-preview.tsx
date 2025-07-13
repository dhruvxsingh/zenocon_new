"use client"

import { MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

interface TemplatePreviewProps {
  template: {
    headerType?: string
    headerContent?: string
    bodyContent: string
    footerContent?: string
    buttons?: { type: string; text: string }[]
  }
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  // Replace placeholders with example values
  const processedBody = template.bodyContent
    .replace(/{{1}}/g, "John")
    .replace(/{{2}}/g, "12345")
    .replace(/{{3}}/g, "May 25")
    .replace(/{{4}}/g, "https://example.com/track")

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-[300px] rounded-lg overflow-hidden border shadow-sm">
        {/* Phone header */}
        <div className="bg-gray-800 text-white p-2 text-xs flex items-center justify-between">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <span>4G</span>
            <span>●●●●</span>
          </div>
        </div>

        {/* WhatsApp header */}
        <div className="bg-teal-600 text-white p-2 flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <span className="text-sm font-medium">WhatsApp Business</span>
        </div>

        {/* Message container */}
        <div className="bg-gray-100 p-4 h-[400px] flex flex-col">
          <div className="mt-auto">
            {/* Message bubble */}
            <div className="bg-white rounded-lg p-3 shadow-sm max-w-[250px] ml-auto">
              {/* Header */}
              {template.headerType === "text" && template.headerContent && (
                <div className="font-bold mb-1">{template.headerContent}</div>
              )}

              {template.headerType === "image" && (
                <div className="bg-gray-200 h-32 rounded mb-2 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Image</span>
                </div>
              )}

              {template.headerType === "video" && (
                <div className="bg-gray-200 h-32 rounded mb-2 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Video</span>
                </div>
              )}

              {/* Body */}
              <div className="mb-1 whitespace-pre-line">{processedBody}</div>

              {/* Footer */}
              {template.footerContent && <div className="text-xs text-gray-500 mt-1">{template.footerContent}</div>}
            </div>

            {/* Buttons */}
            {template.buttons && template.buttons.length > 0 && (
              <div className="mt-1 space-y-1">
                {template.buttons.map((button, index) => (
                  <button
                    key={index}
                    className="bg-white text-teal-600 rounded-full py-1 px-4 text-sm w-full text-center shadow-sm hover:bg-gray-50 transition-colors"
                  >
                    {button.text || `Button ${index + 1}`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-xs text-muted-foreground mt-2">Preview of how your template will appear in WhatsApp</div>
    </motion.div>
  )
}
