import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { ITemplateService } from "../types"

export class SupabaseTemplateService implements ITemplateService {
  private supabase = createClientComponentClient()

  async getTemplates(filters: any = {}) {
    let query = this.supabase.from("templates").select("*")

    if (filters.status) {
      query = query.eq("status", filters.status)
    }

    if (filters.category) {
      query = query.eq("category", filters.category)
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

  async getTemplateById(id: string) {
    const { data, error } = await this.supabase.from("templates").select("*").eq("id", id).single()

    if (error) {
      throw error
    }

    return data
  }

  async createTemplate(templateData: any) {
    const { data, error } = await this.supabase.from("templates").insert(templateData).select().single()

    if (error) {
      throw error
    }

    return data
  }

  async updateTemplate(id: string, templateData: any) {
    const { data, error } = await this.supabase
      .from("templates")
      .update({
        ...templateData,
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

  async deleteTemplate(id: string) {
    const { error } = await this.supabase.from("templates").delete().eq("id", id)

    if (error) {
      throw error
    }
  }
}
