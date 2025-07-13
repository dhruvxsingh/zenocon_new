import type { ICampaignService } from "../types"

export class MockCampaignService implements ICampaignService {
  private mockCampaigns = [
    {
      id: "123e4567-e89b-12d3-a456-426614174010",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Welcome Campaign",
      description: "Automated welcome messages for new subscribers",
      template_id: "123e4567-e89b-12d3-a456-426614174001",
      status: "active",
      scheduled_at: null,
      sent_at: "2023-01-10T00:00:00Z",
      target_audience: {
        tags: ["new_subscriber"],
        filters: {
          opt_in: true,
        },
      },
      metrics: {
        sent: 1250,
        delivered: 1200,
        read: 980,
        replied: 150,
      },
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
      templates: {
        id: "123e4567-e89b-12d3-a456-426614174001",
        name: "Welcome Message",
        header_type: "text",
        header_content: "Welcome to Our Service",
        content: "Hello {{1}}, welcome to our service! We're excited to have you on board.",
        footer: "Reply with any questions you might have.",
        buttons: [
          { type: "url", text: "Visit Website", url: "https://example.com" },
          { type: "quick_reply", text: "Get Started" },
        ],
      },
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174011",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Monthly Newsletter",
      description: "Monthly updates and offers for all subscribers",
      template_id: "123e4567-e89b-12d3-a456-426614174004",
      status: "scheduled",
      scheduled_at: "2023-02-01T10:00:00Z",
      sent_at: null,
      target_audience: {
        tags: ["subscriber"],
        filters: {
          opt_in: true,
        },
      },
      metrics: null,
      created_at: "2023-01-15T00:00:00Z",
      updated_at: "2023-01-15T00:00:00Z",
      templates: {
        id: "123e4567-e89b-12d3-a456-426614174004",
        name: "Special Offer",
        header_type: "video",
        header_content: "https://example.com/special-offer.mp4",
        content:
          "Hello {{1}}, we have a special offer just for you! Get {{2}}% off your next purchase with code {{3}}.",
        footer: "Offer valid until the end of the month.",
        buttons: [{ type: "url", text: "Shop Now", url: "https://example.com/shop" }],
      },
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174012",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Feedback Campaign",
      description: "Request feedback from customers after purchase",
      template_id: "123e4567-e89b-12d3-a456-426614174005",
      status: "draft",
      scheduled_at: null,
      sent_at: null,
      target_audience: {
        tags: ["recent_purchase"],
        filters: {
          opt_in: true,
        },
      },
      metrics: null,
      created_at: "2023-01-20T00:00:00Z",
      updated_at: "2023-01-20T00:00:00Z",
      templates: {
        id: "123e4567-e89b-12d3-a456-426614174005",
        name: "Feedback Request",
        header_type: "text",
        header_content: "We Value Your Feedback",
        content:
          "Hello {{1}}, we value your opinion! Could you please take a moment to provide feedback on your recent experience with us?",
        footer: "Your feedback helps us improve our service.",
        buttons: [{ type: "url", text: "Leave Feedback", url: "https://example.com/feedback" }],
      },
    },
  ]

  async getCampaigns(filters: any = {}) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filteredCampaigns = [...this.mockCampaigns]

    if (filters.status) {
      filteredCampaigns = filteredCampaigns.filter((campaign) => campaign.status === filters.status)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredCampaigns = filteredCampaigns.filter(
        (campaign) =>
          campaign.name.toLowerCase().includes(searchLower) || campaign.description.toLowerCase().includes(searchLower),
      )
    }

    return filteredCampaigns
  }

  async getCampaignById(id: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const campaign = this.mockCampaigns.find((campaign) => campaign.id === id)

    if (!campaign) {
      throw new Error("Campaign not found")
    }

    return campaign
  }

  async createCampaign(campaignData: any) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newCampaign = {
      id: `campaign-${Date.now()}`,
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: "draft",
      scheduled_at: null,
      sent_at: null,
      metrics: null,
      ...campaignData,
    }

    this.mockCampaigns.push(newCampaign)

    return newCampaign
  }

  async updateCampaign(id: string, campaignData: any) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = this.mockCampaigns.findIndex((campaign) => campaign.id === id)

    if (index === -1) {
      throw new Error("Campaign not found")
    }

    const updatedCampaign = {
      ...this.mockCampaigns[index],
      ...campaignData,
      updated_at: new Date().toISOString(),
    }

    this.mockCampaigns[index] = updatedCampaign

    return updatedCampaign
  }

  async deleteCampaign(id: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = this.mockCampaigns.findIndex((campaign) => campaign.id === id)

    if (index === -1) {
      throw new Error("Campaign not found")
    }

    this.mockCampaigns.splice(index, 1)
  }

  async scheduleCampaign(id: string, scheduledAt: Date) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = this.mockCampaigns.findIndex((campaign) => campaign.id === id)

    if (index === -1) {
      throw new Error("Campaign not found")
    }

    const updatedCampaign = {
      ...this.mockCampaigns[index],
      status: "scheduled",
      scheduled_at: scheduledAt.toISOString(),
      updated_at: new Date().toISOString(),
    }

    this.mockCampaigns[index] = updatedCampaign

    return updatedCampaign
  }

  async sendCampaignNow(id: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = this.mockCampaigns.findIndex((campaign) => campaign.id === id)

    if (index === -1) {
      throw new Error("Campaign not found")
    }

    const updatedCampaign = {
      ...this.mockCampaigns[index],
      status: "sending",
      scheduled_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    this.mockCampaigns[index] = updatedCampaign

    return updatedCampaign
  }
}
