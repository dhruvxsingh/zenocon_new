import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { INotificationService } from "../types"

export class SupabaseNotificationService implements INotificationService {
  private supabase = createClientComponentClient()

  async getNotifications() {
    const { data, error } = await this.supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return data || []
  }

  async markAsRead(id: string) {
    const { error } = await this.supabase.from("notifications").update({ read: true }).eq("id", id)

    if (error) {
      throw error
    }
  }

  async markAllAsRead() {
    const { error } = await this.supabase.from("notifications").update({ read: true }).eq("read", false)

    if (error) {
      throw error
    }
  }

  async deleteNotification(id: string) {
    const { error } = await this.supabase.from("notifications").delete().eq("id", id)

    if (error) {
      throw error
    }
  }
}
