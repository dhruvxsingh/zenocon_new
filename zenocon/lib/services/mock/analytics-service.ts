import type { IAnalyticsService } from "../types"

export class MockAnalyticsService implements IAnalyticsService {
  private generateDailyData(startDate: Date, days: number) {
    const data = []
    const currentDate = new Date(startDate)

    for (let i = 0; i < days; i++) {
      const date = new Date(currentDate)
      date.setDate(date.getDate() - i)

      // Generate random metrics with a slight downward trend for older dates
      const factor = Math.max(0.5, 1 - i / (days * 2))
      const messagesSent = Math.floor(Math.random() * 100 * factor) + 50
      const messagesDelivered = Math.floor(messagesSent * (0.9 + Math.random() * 0.1))
      const messagesRead = Math.floor(messagesDelivered * (0.7 + Math.random() * 0.3))
      const activeContacts = Math.floor(Math.random() * 50 * factor) + 100
      const newContacts = Math.floor(Math.random() * 10 * factor)

      data.push({
        id: `analytics-${date.toISOString().split("T")[0]}`,
        user_id: "123e4567-e89b-12d3-a456-426614174000",
        date: date.toISOString().split("T")[0],
        messages_sent: messagesSent,
        messages_delivered: messagesDelivered,
        messages_read: messagesRead,
        active_contacts: activeContacts,
        new_contacts: newContacts,
        campaign_metrics: this.generateCampaignMetrics(),
        template_metrics: this.generateTemplateMetrics(),
        created_at: date.toISOString(),
        updated_at: date.toISOString(),
      })
    }

    return data
  }

  private generateCampaignMetrics() {
    const campaigns = {
      "123e4567-e89b-12d3-a456-426614174010": {
        sent: Math.floor(Math.random() * 100) + 50,
        delivered: Math.floor(Math.random() * 90) + 40,
        read: Math.floor(Math.random() * 80) + 30,
        responses: Math.floor(Math.random() * 20) + 5,
      },
      "123e4567-e89b-12d3-a456-426614174011": {
        sent: Math.floor(Math.random() * 80) + 40,
        delivered: Math.floor(Math.random() * 70) + 30,
        read: Math.floor(Math.random() * 60) + 20,
        responses: Math.floor(Math.random() * 15) + 3,
      },
      "123e4567-e89b-12d3-a456-426614174012": {
        sent: Math.floor(Math.random() * 60) + 30,
        delivered: Math.floor(Math.random() * 50) + 20,
        read: Math.floor(Math.random() * 40) + 10,
        responses: Math.floor(Math.random() * 10) + 2,
      },
    }

    return campaigns
  }

  private generateTemplateMetrics() {
    const templates = {
      "123e4567-e89b-12d3-a456-426614174001": {
        sent: Math.floor(Math.random() * 100) + 50,
        delivered: Math.floor(Math.random() * 90) + 40,
        read: Math.floor(Math.random() * 80) + 30,
      },
      "123e4567-e89b-12d3-a456-426614174002": {
        sent: Math.floor(Math.random() * 80) + 40,
        delivered: Math.floor(Math.random() * 70) + 30,
        read: Math.floor(Math.random() * 60) + 20,
      },
      "123e4567-e89b-12d3-a456-426614174003": {
        sent: Math.floor(Math.random() * 60) + 30,
        delivered: Math.floor(Math.random() * 50) + 20,
        read: Math.floor(Math.random() * 40) + 10,
      },
      "123e4567-e89b-12d3-a456-426614174004": {
        sent: Math.floor(Math.random() * 40) + 20,
        delivered: Math.floor(Math.random() * 30) + 15,
        read: Math.floor(Math.random() * 20) + 10,
      },
      "123e4567-e89b-12d3-a456-426614174005": {
        sent: Math.floor(Math.random() * 30) + 15,
        delivered: Math.floor(Math.random() * 25) + 10,
        read: Math.floor(Math.random() * 20) + 5,
      },
    }

    return templates
  }

  async getDashboardMetrics(dateRange?: { start: Date; end: Date }) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const endDate = dateRange?.end || new Date()
    const startDate = dateRange?.start || new Date(endDate)
    startDate.setDate(startDate.getDate() - 30) // Default to 30 days if no start date

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const data = this.generateDailyData(endDate, days)

    // Aggregate metrics
    const aggregatedMetrics = {
      messagesSent: data.reduce((sum, item) => sum + item.messages_sent, 0),
      messagesDelivered: data.reduce((sum, item) => sum + item.messages_delivered, 0),
      messagesRead: data.reduce((sum, item) => sum + item.messages_read, 0),
      activeContacts: data[0].active_contacts,
      newContacts: data.reduce((sum, item) => sum + item.new_contacts, 0),
      dailyData: data,
    }

    return aggregatedMetrics
  }

  async getTemplateMetrics(templateId?: string, dateRange?: { start: Date; end: Date }) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const endDate = dateRange?.end || new Date()
    const startDate = dateRange?.start || new Date(endDate)
    startDate.setDate(startDate.getDate() - 30) // Default to 30 days if no start date

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const data = this.generateDailyData(endDate, days)

    // Extract template metrics
    const templateMetrics = data.reduce((metrics, item) => {
      const templates = item.template_metrics || {}

      // If templateId is provided, only return metrics for that template
      if (templateId) {
        return {
          ...metrics,
          [templateId]: templates[templateId] || { sent: 0, delivered: 0, read: 0 },
        }
      }

      // Otherwise, aggregate all template metrics
      Object.keys(templates).forEach((id) => {
        if (!metrics[id]) {
          metrics[id] = { sent: 0, delivered: 0, read: 0 }
        }

        metrics[id].sent += templates[id].sent || 0
        metrics[id].delivered += templates[id].delivered || 0
        metrics[id].read += templates[id].read || 0
      })

      return metrics
    }, {})

    return templateMetrics
  }

  async getCampaignMetrics(campaignId?: string, dateRange?: { start: Date; end: Date }) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const endDate = dateRange?.end || new Date()
    const startDate = dateRange?.start || new Date(endDate)
    startDate.setDate(startDate.getDate() - 30) // Default to 30 days if no start date

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const data = this.generateDailyData(endDate, days)

    // Extract campaign metrics
    const campaignMetrics = data.reduce((metrics, item) => {
      const campaigns = item.campaign_metrics || {}

      // If campaignId is provided, only return metrics for that campaign
      if (campaignId) {
        return {
          ...metrics,
          [campaignId]: campaigns[campaignId] || { sent: 0, delivered: 0, read: 0, responses: 0 },
        }
      }

      // Otherwise, aggregate all campaign metrics
      Object.keys(campaigns).forEach((id) => {
        if (!metrics[id]) {
          metrics[id] = { sent: 0, delivered: 0, read: 0, responses: 0 }
        }

        metrics[id].sent += campaigns[id].sent || 0
        metrics[id].delivered += campaigns[id].delivered || 0
        metrics[id].read += campaigns[id].read || 0
        metrics[id].responses += campaigns[id].responses || 0
      })

      return metrics
    }, {})

    return campaignMetrics
  }

  async getContactGrowth(dateRange?: { start: Date; end: Date }) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const endDate = dateRange?.end || new Date()
    const startDate = dateRange?.start || new Date(endDate)
    startDate.setDate(startDate.getDate() - 30) // Default to 30 days if no start date

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const data = this.generateDailyData(endDate, days)

    return data.map((item) => ({
      date: item.date,
      new_contacts: item.new_contacts,
      active_contacts: item.active_contacts,
    }))
  }

  async getMessageMetrics(dateRange?: { start: Date; end: Date }) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const endDate = dateRange?.end || new Date()
    const startDate = dateRange?.start || new Date(endDate)
    startDate.setDate(startDate.getDate() - 30) // Default to 30 days if no start date

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const data = this.generateDailyData(endDate, days)

    return data.map((item) => ({
      date: item.date,
      messages_sent: item.messages_sent,
      messages_delivered: item.messages_delivered,
      messages_read: item.messages_read,
    }))
  }
}
