import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { IAnalyticsService } from "../types"

export class SupabaseAnalyticsService implements IAnalyticsService {
  private supabase = createClientComponentClient()

  async getDashboardMetrics(dateRange?: { start: Date; end: Date }) {
    let query = this.supabase.from("analytics").select("*")

    if (dateRange) {
      query = query
        .gte("date", dateRange.start.toISOString().split("T")[0])
        .lte("date", dateRange.end.toISOString().split("T")[0])
    }

    const { data, error } = await query.order("date", { ascending: false })

    if (error) {
      throw error
    }

    // Aggregate metrics
    const aggregatedMetrics = {
      messagesSent: data?.reduce((sum, item) => sum + (item.messages_sent || 0), 0) || 0,
      messagesDelivered: data?.reduce((sum, item) => sum + (item.messages_delivered || 0), 0) || 0,
      messagesRead: data?.reduce((sum, item) => sum + (item.messages_read || 0), 0) || 0,
      activeContacts: data?.[0]?.active_contacts || 0,
      newContacts: data?.reduce((sum, item) => sum + (item.new_contacts || 0), 0) || 0,
      dailyData: data || [],
    }

    return aggregatedMetrics
  }

  async getTemplateMetrics(templateId?: string, dateRange?: { start: Date; end: Date }) {
    let query = this.supabase.from("analytics").select("template_metrics")

    if (dateRange) {
      query = query
        .gte("date", dateRange.start.toISOString().split("T")[0])
        .lte("date", dateRange.end.toISOString().split("T")[0])
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    // Extract template metrics
    const templateMetrics = data?.reduce((metrics, item) => {
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
    let query = this.supabase.from("analytics").select("campaign_metrics")

    if (dateRange) {
      query = query
        .gte("date", dateRange.start.toISOString().split("T")[0])
        .lte("date", dateRange.end.toISOString().split("T")[0])
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    // Extract campaign metrics
    const campaignMetrics = data?.reduce((metrics, item) => {
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
    let query = this.supabase.from("analytics").select("date, new_contacts, active_contacts")

    if (dateRange) {
      query = query
        .gte("date", dateRange.start.toISOString().split("T")[0])
        .lte("date", dateRange.end.toISOString().split("T")[0])
    }

    const { data, error } = await query.order("date", { ascending: true })

    if (error) {
      throw error
    }

    return data || []
  }

  async getMessageMetrics(dateRange?: { start: Date; end: Date }) {
    let query = this.supabase.from("analytics").select("date, messages_sent, messages_delivered, messages_read")

    if (dateRange) {
      query = query
        .gte("date", dateRange.start.toISOString().split("T")[0])
        .lte("date", dateRange.end.toISOString().split("T")[0])
    }

    const { data, error } = await query.order("date", { ascending: true })

    if (error) {
      throw error
    }

    return data || []
  }
}
