import type { IWebhookService } from "../types"

export class MockWebhookService implements IWebhookService {
  private mockLogs = [
    {
      id: "123e4567-e89b-12d3-a456-426614174070",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      event_type: "message",
      payload: {
        type: "message",
        from: "1234567890",
        to: "0987654321",
        id: "wamid.abcdefghijklmnopqrstuvwxyz",
        timestamp: "1643673600",
        text: {
          body: "Hello, I'm interested in your product.",
        },
      },
      status: "processed",
      processed_at: "2023-01-30T10:15:00Z",
      created_at: "2023-01-30T10:15:00Z",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174071",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      event_type: "status",
      payload: {
        type: "status",
        for: "wamid.abcdefghijklmnopqrstuvwxyz",
        status: "delivered",
        timestamp: "1643673700",
      },
      status: "processed",
      processed_at: "2023-01-30T10:16:40Z",
      created_at: "2023-01-30T10:16:40Z",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174072",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      event_type: "status",
      payload: {
        type: "status",
        for: "wamid.abcdefghijklmnopqrstuvwxyz",
        status: "read",
        timestamp: "1643673800",
      },
      status: "processed",
      processed_at: "2023-01-30T10:18:20Z",
      created_at: "2023-01-30T10:18:20Z",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174073",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      event_type: "message",
      payload: {
        type: "message",
        from: "1234567890",
        to: "0987654321",
        id: "wamid.zyxwvutsrqponmlkjihgfedcba",
        timestamp: "1643674000",
        text: {
          body: "Can you provide more information about pricing?",
        },
      },
      status: "processed",
      processed_at: "2023-01-30T10:20:00Z",
      created_at: "2023-01-30T10:20:00Z",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174074",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      event_type: "button",
      payload: {
        type: "button",
        from: "1234567890",
        to: "0987654321",
        id: "wamid.123456789abcdefghijklmnop",
        timestamp: "1643674200",
        button: {
          text: "Get Started",
          payload: "get_started",
        },
      },
      status: "processed",
      processed_at: "2023-01-30T10:23:20Z",
      created_at: "2023-01-30T10:23:20Z",
    },
  ]

  async getLogs(filters: any = {}) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filteredLogs = [...this.mockLogs]

    if (filters.event_type) {
      filteredLogs = filteredLogs.filter((log) => log.event_type === filters.event_type)
    }

    if (filters.status) {
      filteredLogs = filteredLogs.filter((log) => log.status === filters.status)
    }

    if (filters.dateRange) {
      const startDate = new Date(filters.dateRange.start).getTime()
      const endDate = new Date(filters.dateRange.end).getTime()

      filteredLogs = filteredLogs.filter((log) => {
        const logDate = new Date(log.created_at).getTime()
        return logDate >= startDate && logDate <= endDate
      })
    }

    return filteredLogs.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
  }

  async processWebhook(payload: any) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newLog = {
      id: `log-${Date.now()}`,
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      event_type: payload.type || "unknown",
      payload,
      status: "received",
      processed_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    }

    this.mockLogs.push(newLog)

    return newLog
  }
}
