import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { ISettingsService } from "../types"

export class SupabaseSettingsService implements ISettingsService {
  private supabase = createClientComponentClient()

  async getSettings() {
    const { data: userData } = await this.supabase.auth.getUser()

    if (!userData.user) {
      throw new Error("User not authenticated")
    }

    const { data, error } = await this.supabase.from("settings").select("*").eq("user_id", userData.user.id).single()

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "no rows returned"
      throw error
    }

    // If no settings exist, create default settings
    if (!data) {
      const defaultSettings = {
        user_id: userData.user.id,
        theme: "light",
        notification_preferences: {
          email: {
            templates: true,
            campaigns: true,
            contacts: true,
            reports: true,
          },
          app: {
            templates: true,
            campaigns: true,
            contacts: true,
            messages: true,
          },
        },
        whatsapp_business_settings: {
          default_language: "en_US",
          read_receipts: true,
          typing_indicators: true,
        },
      }

      const { data: newSettings, error: insertError } = await this.supabase
        .from("settings")
        .insert(defaultSettings)
        .select()
        .single()

      if (insertError) {
        throw insertError
      }

      return newSettings
    }

    return data
  }

  async updateSettings(settingsData: any) {
    const { data: userData } = await this.supabase.auth.getUser()

    if (!userData.user) {
      throw new Error("User not authenticated")
    }

    const { data, error } = await this.supabase
      .from("settings")
      .update({
        ...settingsData,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userData.user.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }

  async updateTheme(theme: string) {
    const { data: userData } = await this.supabase.auth.getUser()

    if (!userData.user) {
      throw new Error("User not authenticated")
    }

    const { data, error } = await this.supabase
      .from("settings")
      .update({
        theme,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userData.user.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }

  async updateNotificationPreferences(preferences: any) {
    const { data: userData } = await this.supabase.auth.getUser()

    if (!userData.user) {
      throw new Error("User not authenticated")
    }

    const { data, error } = await this.supabase
      .from("settings")
      .update({
        notification_preferences: preferences,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userData.user.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }

  async updateWhatsAppBusinessSettings(settings: any) {
    const { data: userData } = await this.supabase.auth.getUser()

    if (!userData.user) {
      throw new Error("User not authenticated")
    }

    const { data, error } = await this.supabase
      .from("settings")
      .update({
        whatsapp_business_settings: settings,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userData.user.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }
}
