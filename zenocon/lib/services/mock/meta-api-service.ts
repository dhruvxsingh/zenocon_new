import type { IMetaAPIService } from "../types"

export class MockMetaAPIService implements IMetaAPIService {
  async sendMessage(to: string, templateName: string, templateData: any) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simulate a successful response from the Meta API
    return {
      messaging_product: "whatsapp",
      contacts: [
        {
          input: to,
          wa_id: to.replace("+", ""),
        },
      ],
      messages: [
        {
          id: `wamid.${Math.random().toString(36).substring(2, 15)}`,
        },
      ],
    }
  }

  async getBusinessProfile() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simulate a response from the Meta API
    return {
      data: [
        {
          messaging_product: "whatsapp",
          about: "We provide WhatsApp Business API solutions for businesses of all sizes.",
          address: "123 Main St, Anytown, USA",
          description: "WhatsApp Business API Solutions",
          email: "contact@example.com",
          websites: ["https://example.com"],
          vertical: "PROFESSIONAL_SERVICES",
        },
      ],
    }
  }

  async updateBusinessProfile(profileData: any) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simulate a successful response from the Meta API
    return {
      success: true,
    }
  }

  async getPhoneNumbers() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simulate a response from the Meta API
    return [
      {
        id: "123456789012345",
        display_phone_number: "+1234567890",
        verified_name: "Example Business",
        quality_rating: "GREEN",
      },
    ]
  }

  async getTemplateAnalytics(templateName: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simulate a response from the Meta API
    return {
      name: templateName,
      status: "APPROVED",
      category: "MARKETING",
      language: "en_US",
      metrics: {
        sent: Math.floor(Math.random() * 1000) + 500,
        delivered: Math.floor(Math.random() * 900) + 400,
        read: Math.floor(Math.random() * 800) + 300,
        replied: Math.floor(Math.random() * 200) + 50,
      },
    }
  }
}
