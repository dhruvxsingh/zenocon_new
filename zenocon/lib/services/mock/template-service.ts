import type { ITemplateService } from "../types"

export class MockTemplateService implements ITemplateService {
  private mockTemplates = [
    {
      id: "123e4567-e89b-12d3-a456-426614174001",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Welcome Message",
      description: "Send a welcome message to new customers",
      content: "Hello {{1}}, welcome to our service! We're excited to have you on board.",
      header_type: "text",
      header_content: "Welcome to Our Service",
      footer: "Reply with any questions you might have.",
      buttons: [
        { type: "url", text: "Visit Website", url: "https://example.com" },
        { type: "quick_reply", text: "Get Started" },
      ],
      category: "onboarding",
      status: "approved",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174002",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Order Confirmation",
      description: "Confirm a customer's order",
      content: "Hello {{1}}, your order #{{2}} has been confirmed and is being processed. Thank you for your purchase!",
      header_type: "image",
      header_content: "https://example.com/order-confirmation.jpg",
      footer: "For any issues, please contact our support team.",
      buttons: [
        { type: "url", text: "Track Order", url: "https://example.com/track" },
        { type: "quick_reply", text: "Contact Support" },
      ],
      category: "transactional",
      status: "approved",
      created_at: "2023-01-02T00:00:00Z",
      updated_at: "2023-01-02T00:00:00Z",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174003",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Appointment Reminder",
      description: "Remind customers of upcoming appointments",
      content:
        "Hello {{1}}, this is a reminder that you have an appointment scheduled for {{2}} at {{3}}. We look forward to seeing you!",
      header_type: "text",
      header_content: "Appointment Reminder",
      footer: "Need to reschedule? Reply to this message.",
      buttons: [
        { type: "quick_reply", text: "Confirm" },
        { type: "quick_reply", text: "Reschedule" },
        { type: "quick_reply", text: "Cancel" },
      ],
      category: "reminder",
      status: "approved",
      created_at: "2023-01-03T00:00:00Z",
      updated_at: "2023-01-03T00:00:00Z",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174004",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Special Offer",
      description: "Promotional message for special offers",
      content: "Hello {{1}}, we have a special offer just for you! Get {{2}}% off your next purchase with code {{3}}.",
      header_type: "video",
      header_content: "https://example.com/special-offer.mp4",
      footer: "Offer valid until the end of the month.",
      buttons: [{ type: "url", text: "Shop Now", url: "https://example.com/shop" }],
      category: "marketing",
      status: "pending",
      created_at: "2023-01-04T00:00:00Z",
      updated_at: "2023-01-04T00:00:00Z",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174005",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Feedback Request",
      description: "Request feedback from customers",
      content:
        "Hello {{1}}, we value your opinion! Could you please take a moment to provide feedback on your recent experience with us?",
      header_type: "text",
      header_content: "We Value Your Feedback",
      footer: "Your feedback helps us improve our service.",
      buttons: [{ type: "url", text: "Leave Feedback", url: "https://example.com/feedback" }],
      category: "customer_service",
      status: "approved",
      created_at: "2023-01-05T00:00:00Z",
      updated_at: "2023-01-05T00:00:00Z",
    },
  ]

  async getTemplates(filters: any = {}) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filteredTemplates = [...this.mockTemplates]

    if (filters.status) {
      filteredTemplates = filteredTemplates.filter((template) => template.status === filters.status)
    }

    if (filters.category) {
      filteredTemplates = filteredTemplates.filter((template) => template.category === filters.category)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredTemplates = filteredTemplates.filter(
        (template) =>
          template.name.toLowerCase().includes(searchLower) || template.description.toLowerCase().includes(searchLower),
      )
    }

    return filteredTemplates
  }

  async getTemplateById(id: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const template = this.mockTemplates.find((template) => template.id === id)

    if (!template) {
      throw new Error("Template not found")
    }

    return template
  }

  async createTemplate(templateData: any) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newTemplate = {
      id: `template-${Date.now()}`,
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: "draft",
      ...templateData,
    }

    this.mockTemplates.push(newTemplate)

    return newTemplate
  }

  async updateTemplate(id: string, templateData: any) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = this.mockTemplates.findIndex((template) => template.id === id)

    if (index === -1) {
      throw new Error("Template not found")
    }

    const updatedTemplate = {
      ...this.mockTemplates[index],
      ...templateData,
      updated_at: new Date().toISOString(),
    }

    this.mockTemplates[index] = updatedTemplate

    return updatedTemplate
  }

  async deleteTemplate(id: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = this.mockTemplates.findIndex((template) => template.id === id)

    if (index === -1) {
      throw new Error("Template not found")
    }

    this.mockTemplates.splice(index, 1)
  }
}
