import type { INotificationService } from "../types"

export class MockNotificationService implements INotificationService {
  private mockNotifications = [
    {
      id: "123e4567-e89b-12d3-a456-426614174030",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      title: "Template Approved",
      message: "Your template 'Welcome Message' has been approved and is now ready to use.",
      type: "template",
      read: false,
      action_url: "/dashboard/templates/123e4567-e89b-12d3-a456-426614174001",
      created_at: "2023-01-30T10:15:00Z",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174031",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      title: "Campaign Completed",
      message: "Your campaign 'Welcome Campaign' has completed successfully.",
      type: "campaign",
      read: false,
      action_url: "/dashboard/campaigns/123e4567-e89b-12d3-a456-426614174010",
      created_at: "2023-01-29T15:30:00Z",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174032",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      title: "New Contact Added",
      message: "A new contact 'Sarah Williams' has been added to your contacts.",
      type: "contact",
      read: true,
      action_url: "/dashboard/contacts/123e4567-e89b-12d3-a456-426614174023",
      created_at: "2023-01-28T09:45:00Z",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174033",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      title: "Support Ticket Updated",
      message: "Your support ticket #12345 has been updated with a new response.",
      type: "support",
      read: true,
      action_url: "/dashboard/help/12345",
      created_at: "2023-01-27T14:20:00Z",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174034",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      title: "Billing Update",
      message: "Your subscription has been renewed for the next month.",
      type: "billing",
      read: true,
      action_url: "/dashboard/settings/billing",
      created_at: "2023-01-26T11:10:00Z",
    },
  ]

  async getNotifications() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return [...this.mockNotifications].sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
  }

  async markAsRead(id: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = this.mockNotifications.findIndex((notification) => notification.id === id)

    if (index === -1) {
      throw new Error("Notification not found")
    }

    this.mockNotifications[index].read = true
  }

  async markAllAsRead() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    this.mockNotifications.forEach((notification) => {
      notification.read = true
    })
  }

  async deleteNotification(id: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = this.mockNotifications.findIndex((notification) => notification.id === id)

    if (index === -1) {
      throw new Error("Notification not found")
    }

    this.mockNotifications.splice(index, 1)
  }
}
