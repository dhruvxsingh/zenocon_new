import type { ISettingsService } from "../types"

export class MockSettingsService implements ISettingsService {
  private mockSettings = {
    id: "123e4567-e89b-12d3-a456-426614174060",
    user_id: "123e4567-e89b-12d3-a456-426614174000",
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
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  }

  async getSettings() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return { ...this.mockSettings }
  }

  async updateSettings(settingsData: any) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    this.mockSettings = {
      ...this.mockSettings,
      ...settingsData,
      updated_at: new Date().toISOString(),
    }

    return { ...this.mockSettings }
  }

  async updateTheme(theme: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    this.mockSettings = {
      ...this.mockSettings,
      theme,
      updated_at: new Date().toISOString(),
    }

    return { ...this.mockSettings }
  }

  async updateNotificationPreferences(preferences: any) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    this.mockSettings = {
      ...this.mockSettings,
      notification_preferences: preferences,
      updated_at: new Date().toISOString(),
    }

    return { ...this.mockSettings }
  }

  async updateWhatsAppBusinessSettings(settings: any) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    this.mockSettings = {
      ...this.mockSettings,
      whatsapp_business_settings: settings,
      updated_at: new Date().toISOString(),
    }

    return { ...this.mockSettings }
  }
}
