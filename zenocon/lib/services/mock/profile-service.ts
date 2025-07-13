import type { IProfileService } from "../types"

export class MockProfileService implements IProfileService {
  private mockUser = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    email: "user@example.com",
    profile: {
      full_name: "John Doe",
      company_name: "Acme Inc.",
      phone: "+1234567890",
      role: "admin",
      avatar_url: "https://i.pravatar.cc/150?u=user@example.com",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
    },
  }

  async getProfile() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return { ...this.mockUser }
  }

  async updateProfile(profileData: any) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    this.mockUser = {
      ...this.mockUser,
      profile: {
        ...this.mockUser.profile,
        ...profileData,
        updated_at: new Date().toISOString(),
      },
    }

    return { ...this.mockUser }
  }

  async updateAvatar(file: File) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // In a real implementation, this would upload the file to storage
    // For now, we'll just update the avatar URL with a random one
    const randomId = Math.floor(Math.random() * 1000)
    const avatarUrl = `https://i.pravatar.cc/150?img=${randomId}`

    this.mockUser = {
      ...this.mockUser,
      profile: {
        ...this.mockUser.profile,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      },
    }

    return { ...this.mockUser }
  }
}
