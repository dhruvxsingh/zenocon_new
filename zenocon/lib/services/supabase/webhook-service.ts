import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { IWebhookService } from "../types"

export class SupabaseWebhookService implements IWebhookService {
  private supabase = createClientComponentClient()

  async getLogs(filters: any = {}) {
    let query = this.supabase.from("webhook_logs").select("*")

    if (filters.event_type) {
      query = query.eq("event_type", filters.event_type)
    }

    if (filters.status) {
      query = query.eq("status", filters.status)
    }

    if (filters.dateRange) {
      query = query
        .gte("created_at", filters.dateRange.start.toISOString())
        .lte("created_at", filters.dateRange.end.toISOString())
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return data || []
  }

  async processWebhook(payload: any) {
    // In a real implementation, this would be handled by a server-side function
    // For now, we'll just log the webhook
    const { data, error } = await this.supabase
      .from("webhook_logs")
      .insert({
        event_type: payload.type || "unknown",
        payload,
        status: "received",
        processed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }
}
