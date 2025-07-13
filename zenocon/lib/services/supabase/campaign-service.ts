import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { ICampaignService } from "../types"

export class SupabaseCampaignService implements ICampaignService {
  private supabase = createClientComponentClient()

  async getCampaigns(filters: any = {}) {
    let query = this.supabase.from("campaigns").select(`
        *,
        templates:template_id (
          id,
          name,
          header_type,
          header_content
        )
      `)

    if (filters.status) {
      query = query.eq("status", filters.status)
    }

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return data || []
  }

  async getCampaignById(id: string) {
    const { data, error } = await this.supabase
      .from("campaigns")
      .select(`
        *,
        templates:template_id (
          id,
          name,
          content,
          header_type,
          header_content,
          footer,
          buttons
        )
      `)
      .eq("id", id)
      .single()

    if (error) {
      throw error
    }

    return data
  }

  async createCampaign(campaignData: any) {
    const { data, error } = await this.supabase.from("campaigns").insert(campaignData).select().single()

    if (error) {
      throw error
    }

    return data
  }

  async updateCampaign(id: string, campaignData: any) {
    const { data, error } = await this.supabase
      .from("campaigns")
      .update({
        ...campaignData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }

  async deleteCampaign(id: string) {
    const { error } = await this.supabase.from("campaigns").delete().eq("id", id)

    if (error) {
      throw error
    }
  }

  async scheduleCampaign(id: string, scheduledAt: Date) {
    const { data, error } = await this.supabase
      .from("campaigns")
      .update({
        status: "scheduled",
        scheduled_at: scheduledAt.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }

  async sendCampaignNow(id: string) {
    const { data, error } = await this.supabase
      .from("campaigns")
      .update({
        status: "sending",
        scheduled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    // In a real implementation, you would trigger a server function to start sending the campaign
    // For now, we'll just update the status

    return data
  }
}
