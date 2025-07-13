import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { IContactService } from "../types"

export class SupabaseContactService implements IContactService {
  private supabase = createClientComponentClient()

  async getContacts(filters: any = {}) {
    let query = this.supabase.from("contacts").select("*")

    if (filters.opt_in !== undefined) {
      query = query.eq("opt_in", filters.opt_in)
    }

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,phone.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
    }

    if (filters.tags) {
      // This is a simplified approach - in a real app, you'd need more complex JSONB filtering
      query = query.contains("tags", filters.tags)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return data || []
  }

  async getContactById(id: string) {
    const { data, error } = await this.supabase.from("contacts").select("*").eq("id", id).single()

    if (error) {
      throw error
    }

    return data
  }

  async createContact(contactData: any) {
    const { data, error } = await this.supabase.from("contacts").insert(contactData).select().single()

    if (error) {
      throw error
    }

    return data
  }

  async updateContact(id: string, contactData: any) {
    const { data, error } = await this.supabase
      .from("contacts")
      .update({
        ...contactData,
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

  async deleteContact(id: string) {
    const { error } = await this.supabase.from("contacts").delete().eq("id", id)

    if (error) {
      throw error
    }
  }

  async importContacts(contacts: any[]) {
    const { data, error } = await this.supabase.from("contacts").insert(contacts).select()

    if (error) {
      throw error
    }

    return data
  }
}
