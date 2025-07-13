import type { IContactService } from "../types"

export class MockContactService implements IContactService {
  private mockContacts = [
    {
      id: "123e4567-e89b-12d3-a456-426614174020",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      phone: "+1234567890",
      name: "John Smith",
      email: "john.smith@example.com",
      tags: ["customer", "premium"],
      custom_fields: {
        last_purchase: "2023-01-15",
        loyalty_points: 250,
        preferred_language: "en",
      },
      opt_in: true,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174021",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      phone: "+1987654321",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      tags: ["prospect", "newsletter"],
      custom_fields: {
        source: "website",
        interest: "product_demo",
      },
      opt_in: true,
      created_at: "2023-01-05T00:00:00Z",
      updated_at: "2023-01-05T00:00:00Z",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174022",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      phone: "+1122334455",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      tags: ["customer", "inactive"],
      custom_fields: {
        last_purchase: "2022-10-20",
        loyalty_points: 50,
      },
      opt_in: false,
      created_at: "2023-01-10T00:00:00Z",
      updated_at: "2023-01-10T00:00:00Z",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174023",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      phone: "+1567891234",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      tags: ["customer", "premium", "newsletter"],
      custom_fields: {
        last_purchase: "2023-01-25",
        loyalty_points: 500,
        preferred_language: "es",
      },
      opt_in: true,
      created_at: "2023-01-15T00:00:00Z",
      updated_at: "2023-01-15T00:00:00Z",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174024",
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      phone: "+1654987321",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      tags: ["prospect"],
      custom_fields: {
        source: "referral",
        interest: "pricing",
      },
      opt_in: true,
      created_at: "2023-01-20T00:00:00Z",
      updated_at: "2023-01-20T00:00:00Z",
    },
  ]

  async getContacts(filters: any = {}) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filteredContacts = [...this.mockContacts]

    if (filters.opt_in !== undefined) {
      filteredContacts = filteredContacts.filter((contact) => contact.opt_in === filters.opt_in)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredContacts = filteredContacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchLower) ||
          contact.phone.includes(filters.search) ||
          contact.email.toLowerCase().includes(searchLower),
      )
    }

    if (filters.tags) {
      filteredContacts = filteredContacts.filter((contact) =>
        filters.tags.every((tag: string) => contact.tags.includes(tag)),
      )
    }

    return filteredContacts
  }

  async getContactById(id: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const contact = this.mockContacts.find((contact) => contact.id === id)

    if (!contact) {
      throw new Error("Contact not found")
    }

    return contact
  }

  async createContact(contactData: any) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newContact = {
      id: `contact-${Date.now()}`,
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      opt_in: true,
      tags: [],
      custom_fields: {},
      ...contactData,
    }

    this.mockContacts.push(newContact)

    return newContact
  }

  async updateContact(id: string, contactData: any) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = this.mockContacts.findIndex((contact) => contact.id === id)

    if (index === -1) {
      throw new Error("Contact not found")
    }

    const updatedContact = {
      ...this.mockContacts[index],
      ...contactData,
      updated_at: new Date().toISOString(),
    }

    this.mockContacts[index] = updatedContact

    return updatedContact
  }

  async deleteContact(id: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const index = this.mockContacts.findIndex((contact) => contact.id === id)

    if (index === -1) {
      throw new Error("Contact not found")
    }

    this.mockContacts.splice(index, 1)
  }

  async importContacts(contacts: any[]) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newContacts = contacts.map((contact) => ({
      id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      opt_in: true,
      tags: [],
      custom_fields: {},
      ...contact,
    }))

    this.mockContacts.push(...newContacts)

    return newContacts
  }
}
