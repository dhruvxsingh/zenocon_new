import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { IAuthService } from "../types"

export class SupabaseAuthService implements IAuthService {
  private supabase = createClientComponentClient()

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }

    return data
  }

  async signUp(email: string, password: string, userData: any) {
    const { data: authData, error: authError } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.fullName,
          company_name: userData.companyName,
        },
      },
    })

    if (authError) {
      throw authError
    }

    // Create profile record
    if (authData.user) {
      const { error: profileError } = await this.supabase.from("profiles").insert({
        id: authData.user.id,
        full_name: userData.fullName,
        company_name: userData.companyName,
        phone: userData.phone,
        role: userData.role || "user",
      })

      if (profileError) {
        throw profileError
      }
    }

    return authData
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut()
    if (error) {
      throw error
    }
  }

  async getCurrentUser() {
    const { data, error } = await this.supabase.auth.getUser()
    if (error) {
      throw error
    }

    if (data.user) {
      // Get profile data
      const { data: profileData, error: profileError } = await this.supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single()

      if (profileError && profileError.code !== "PGRST116") {
        // PGRST116 is "no rows returned" which is fine for new users
        throw profileError
      }

      return {
        ...data.user,
        profile: profileData || {},
      }
    }

    return null
  }

  async resetPassword(email: string) {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email)
    if (error) {
      throw error
    }
  }
}
