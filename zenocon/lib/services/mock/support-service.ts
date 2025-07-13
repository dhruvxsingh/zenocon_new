import type { ISupportService } from "../types"

export class MockSupportService implements ISupportService {
  private mockTickets = [
    {
      id: "123e4567-e89b-12d3-a456-426614174040",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      subject: "Template Approval Issue",
      description: "My template has been pending approval for over 48 hours. Can you please check the status?",
      status: "open",
      priority: "high",
      created_at: "2023-01-30T10:15:00Z",
      updated_at: "2023-01-30T10:15:00Z",
      messages: [
        {
          id: "123e4567-e89b-12d3-a456-426614174050",
          ticket_id: "123e4567-e89b-12d3-a456-426614174040",
          user_id: "123e4567-e89b-12d3-a456-426614174000",
          is_support_agent: false,
          message: "My template has been pending approval for over 48 hours. Can you please check the status?",
          attachments: null,
          created_at: "2023-01-30T10:15:00Z",
        },
      ],
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174041",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      subject: "Campaign Not Sending",
      description: "I scheduled a campaign for yesterday but it hasn't started sending yet.",
      status: "in_progress",
      priority: "medium",
      created_at: "2023-01-29T15:30:00Z",
      updated_at: "2023-01-29T16:45:00Z",
      messages: [
        {
          id: "123e4567-e89b-12d3-a456-426614174051",
          ticket_id: "123e4567-e89b-12d3-a456-426614174041",
          user_id: "123e4567-e89b-12d3-a456-426614174000",
          is_support_agent: false,
          message: "I scheduled a campaign for yesterday but it hasn't started sending yet.",
          attachments: null,
          created_at: "2023-01-29T15:30:00Z",
        },
        {
          id: "123e4567-e89b-12d3-a456-426614174052",
          ticket_id: "123e4567-e89b-12d3-a456-426614174041",
          user_id: "support-agent-1",
          is_support_agent: true,
          message: "Thank you for reporting this issue. I'm looking into it now and will get back to you shortly.",
          attachments: null,
          created_at: "2023-01-29T16:45:00Z",
        },
      ],
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174042",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      subject: "Billing Question",
      description: "I have a question about my recent invoice. There seems to be an extra charge.",
      status: "closed",
      priority: "low",
      created_at: "2023-01-28T09:45:00Z",
      updated_at: "2023-01-28T14:30:00Z",
      messages: [
        {
          id: "123e4567-e89b-12d3-a456-426614174053",
          ticket_id: "123e4567-e89b-12d3-a456-426614174042",
          user_id: "123e4567-e89b-12d3-a456-426614174000",
          is_support_agent: false,
          message: "I have a question about my recent invoice. There seems to be an extra charge.",
          attachments: null,
          created_at: "2023-01-28T09:45:00Z",
        },
        {
          id: "123e4567-e89b-12d3-a456-426614174054",
          ticket_id: "123e4567-e89b-12d3-a456-426614174042",
          user_id: "support-agent-2",
          is_support_agent: true,
          message:
            "I've checked your invoice and the extra charge is for the additional contacts you added last month. Please let me know if you have any other questions.",
          attachments: null,
          created_at: "2023-01-28T11:20:00Z",
        },
        {
          id: "123e4567-e89b-12d3-a456-426614174055",
          ticket_id: "123e4567-e89b-12d3-a456-426614174042",
          user_id: "123e4567-e89b-12d3-a456-426614174000",
          is_support_agent: false,
          message: "Thank you for the clarification. That makes sense now.",
          attachments: null,
          created_at: "2023-01-28T13:45:00Z",
        },
        {
          id: "123e4567-e89b-12d3-a456-426614174056",
          ticket_id: "123e4567-e89b-12d3-a456-426614174042",
          user_id: "support-agent-2",
          is_support_agent: true,
          message: "You're welcome! I'm glad I could help. Is there anything else you need assistance with?",
          attachments: null,
          created_at: "2023-01-28T14:30:00Z",
        },
      ],
    },
  ]

  async getTickets(filters: any = {}) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filteredTickets = [...this.mockTickets]

    if (filters.status) {
      filteredTickets = filteredTickets.filter((ticket) => ticket.status === filters.status)
    }

    if (filters.priority) {
      filteredTickets = filteredTickets.filter((ticket) => ticket.priority === filters.priority)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredTickets = filteredTickets.filter(
        (ticket) =>
          ticket.subject.toLowerCase().includes(searchLower) || ticket.description.toLowerCase().includes(searchLower),
      )
    }

    return filteredTickets.map((ticket) => ({
      id: ticket.id,
      user_id: ticket.user_id,
      subject: ticket.subject,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
      created_at: ticket.created_at,
      updated_at: ticket.updated_at,
    }))
  }

  async getTicketById(id: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const ticket = this.mockTickets.find((ticket) => ticket.id === id)

    if (!ticket) {
      throw new Error("Ticket not found")
    }

    return ticket
  }

  async createTicket(ticketData: any) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newTicket = {
      id: `ticket-${Date.now()}`,
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      subject: ticketData.subject,
      description: ticketData.description,
      status: "open",
      priority: ticketData.priority || "medium",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      messages: [],
    }

    if (ticketData.message) {
      newTicket.messages.push({
        id: `message-${Date.now()}`,
        ticket_id: newTicket.id,
        user_id: "123e4567-e89b-12d3-a456-426614174000",
        is_support_agent: false,
        message: ticketData.message,
        attachments: null,
        created_at: new Date().toISOString(),
      })
    }

    this.mockTickets.push(newTicket)

    return {
      id: newTicket.id,
      user_id: newTicket.user_id,
      subject: newTicket.subject,
      description: newTicket.description,
      status: newTicket.status,
      priority: newTicket.priority,
      created_at: newTicket.created_at,
      updated_at: newTicket.updated_at,
    }
  }

  async updateTicket(id: string, ticketData: any) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = this.mockTickets.findIndex((ticket) => ticket.id === id)

    if (index === -1) {
      throw new Error("Ticket not found")
    }

    const updatedTicket = {
      ...this.mockTickets[index],
      ...ticketData,
      updated_at: new Date().toISOString(),
    }

    this.mockTickets[index] = updatedTicket

    return {
      id: updatedTicket.id,
      user_id: updatedTicket.user_id,
      subject: updatedTicket.subject,
      description: updatedTicket.description,
      status: updatedTicket.status,
      priority: updatedTicket.priority,
      created_at: updatedTicket.created_at,
      updated_at: updatedTicket.updated_at,
    }
  }

  async addMessage(ticketId: string, message: string, attachments: any[] = []) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = this.mockTickets.findIndex((ticket) => ticket.id === ticketId)

    if (index === -1) {
      throw new Error("Ticket not found")
    }

    const newMessage = {
      id: `message-${Date.now()}`,
      ticket_id: ticketId,
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      is_support_agent: false,
      message,
      attachments: attachments.length > 0 ? attachments : null,
      created_at: new Date().toISOString(),
    }

    this.mockTickets[index].messages.push(newMessage)
    this.mockTickets[index].updated_at = new Date().toISOString()

    return newMessage
  }
}
