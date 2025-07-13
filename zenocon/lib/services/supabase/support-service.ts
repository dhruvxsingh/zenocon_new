import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { ISupportService } from "../types"

export class SupabaseSupportService implements ISupportService {
  private supabase = createClientComponentClient()

  async getTickets(filters: any = {}) {
    let query = this.supabase.from("support_tickets").select("*")

    if (filters.status) {
      query = query.eq("status", filters.status)
    }

    if (filters.priority) {
      query = query.eq("priority", filters.priority)
    }

    if (filters.search) {
      query = query.or(`subject.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return data || []
  }

  async getTicketById(id: string) {
    const { data: ticket, error: ticketError } = await this.supabase
      .from("support_tickets")
      .select("*")
      .eq("id", id)
      .single()

    if (ticketError) {
      throw ticketError
    }

    const { data: messages, error: messagesError } = await this.supabase
      .from("ticket_messages")
      .select("*")
      .eq("ticket_id", id)
      .order("created_at", { ascending: true })

    if (messagesError) {
      throw messagesError
    }

    return {
      ...ticket,
      messages: messages || [],
    }
  }

  async createTicket(ticketData: any) {
    const { data, error } = await this.supabase
      .from("support_tickets")
      .insert({
        subject: ticketData.subject,
        description: ticketData.description,
        priority: ticketData.priority || "medium",
        status: "open",
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    // Add initial message if provided
    if (ticketData.message) {
      await this.addMessage(data.id, ticketData.message)
    }

    return data
  }

  async updateTicket(id: string, ticketData: any) {
    const { data, error } = await this.supabase
      .from("support_tickets")
      .update({
        ...ticketData,
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

  async addMessage(ticketId: string, message: string, attachments: any[] = []) {
    const { data, error } = await this.supabase
      .from("ticket_messages")
      .insert({
        ticket_id: ticketId,
        message,
        attachments: attachments.length > 0 ? attachments : null,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    // Update the ticket's updated_at timestamp
    await this.supabase
      .from("support_tickets")
      .update({
        updated_at: new Date().toISOString(),
      })
      .eq("id", ticketId)

    return data
  }
}
