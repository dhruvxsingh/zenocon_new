import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { IProfileService } from "../types"

export class SupabaseProfileService implements IProfileService {
  private supabase = createClientComponentClient()

  async getProfile() {
    const { data: userData } = await this.supabase.auth.getUser()

    if (!userData.user) {
      throw new Error("User not authenticated")
    }

    const { data, error } = await this.supabase.from("profiles").select("*").eq("id", userData.user.id).single()

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "no rows returned"
      throw error
    }

    return {
      ...userData.user,
      profile: data || {},
    }
  }

  async updateProfile(profileData: any) {
    const { data: userData } = await this.supabase.auth.getUser()

    if (!userData.user) {
      throw new Error("User not authenticated")
    }

    const { data, error } = await this.supabase
      .from("profiles")
      .update({
        ...profileData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userData.user.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return {
      ...userData.user,
      profile: data,
    }
  }

  async updateAvatar(file: File) {
    const { data: userData } = await this.supabase.auth.getUser()

    if (!userData.user) {
      throw new Error("User not authenticated")
    }

    const fileExt = file.name.split(".").pop()
    const filePath = `avatars/${userData.user.id}.${fileExt}`

    const { error: uploadError } = await this.supabase.storage.from("avatars").upload(filePath, file, { upsert: true })

    if (uploadError) {
      throw uploadError
    }

    const { data: urlData } = this.supabase.storage.from("avatars").getPublicUrl(filePath)

    const { data, error } = await this.supabase
      .from("profiles")
      .update({
        avatar_url: urlData.publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userData.user.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return {
      ...userData.user,
      profile: data,
    }
  }
}
