import type { IAuthService } from "../types"

export class MockAuthService implements IAuthService {
  private mockUser = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    email: "user@example.com",
    profile: {
      full_name: "John Doe",
      company_name: "Acme Inc.",
      phone: "+1234567890",
      role: "admin",
      avatar_url: "https://i.pravatar.cc/150?u=user@example.com",
    },
  }

  async signIn(email: string, password: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (email === "error@example.com") {
      throw new Error("Invalid credentials")
    }

    return { user: this.mockUser }
  }

  async signUp(email: string, password: string, userData: any) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (email === "error@example.com") {
      throw new Error("Email already in use")
    }

    return {
      user: {
        ...this.mockUser,
        email,
        profile: {
          ...this.mockUser.profile,
          full_name: userData.fullName,
          company_name: userData.companyName,
          phone: userData.phone,
          role: userData.role || "user",
        },
      },
    }
  }

  async signOut() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  async getCurrentUser() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return this.mockUser
  }

  async resetPassword(email: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (email === "error@example.com") {
      throw new Error("User not found")
    }
  }
}
