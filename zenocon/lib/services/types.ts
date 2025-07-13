// Service interfaces for dependency injection
export interface IAuthService {
  signIn(email: string, password: string): Promise<any>
  signUp(email: string, password: string, userData: any): Promise<any>
  signOut(): Promise<void>
  getCurrentUser(): Promise<any>
  resetPassword(email: string): Promise<void>
}

export interface ITemplateService {
  getTemplates(filters?: any): Promise<any[]>
  getTemplateById(id: string): Promise<any>
  createTemplate(templateData: any): Promise<any>
  updateTemplate(id: string, templateData: any): Promise<any>
  deleteTemplate(id: string): Promise<void>
}

export interface ICampaignService {
  getCampaigns(filters?: any): Promise<any[]>
  getCampaignById(id: string): Promise<any>
  createCampaign(campaignData: any): Promise<any>
  updateCampaign(id: string, campaignData: any): Promise<any>
  deleteCampaign(id: string): Promise<void>
  scheduleCampaign(id: string, scheduledAt: Date): Promise<any>
  sendCampaignNow(id: string): Promise<any>
}

export interface IContactService {
  getContacts(filters?: any): Promise<any[]>
  getContactById(id: string): Promise<any>
  createContact(contactData: any): Promise<any>
  updateContact(id: string, contactData: any): Promise<any>
  deleteContact(id: string): Promise<void>
  importContacts(contacts: any[]): Promise<any>
}

export interface IAnalyticsService {
  getDashboardMetrics(dateRange?: { start: Date; end: Date }): Promise<any>
  getTemplateMetrics(templateId?: string, dateRange?: { start: Date; end: Date }): Promise<any>
  getCampaignMetrics(campaignId?: string, dateRange?: { start: Date; end: Date }): Promise<any>
  getContactGrowth(dateRange?: { start: Date; end: Date }): Promise<any>
  getMessageMetrics(dateRange?: { start: Date; end: Date }): Promise<any>
}

export interface INotificationService {
  getNotifications(): Promise<any[]>
  markAsRead(id: string): Promise<void>
  markAllAsRead(): Promise<void>
  deleteNotification(id: string): Promise<void>
}

export interface ISupportService {
  getTickets(filters?: any): Promise<any[]>
  getTicketById(id: string): Promise<any>
  createTicket(ticketData: any): Promise<any>
  updateTicket(id: string, ticketData: any): Promise<any>
  addMessage(ticketId: string, message: string, attachments?: any[]): Promise<any>
}

export interface ISettingsService {
  getSettings(): Promise<any>
  updateSettings(settingsData: any): Promise<any>
  updateTheme(theme: string): Promise<any>
  updateNotificationPreferences(preferences: any): Promise<any>
  updateWhatsAppBusinessSettings(settings: any): Promise<any>
}

export interface IWebhookService {
  getLogs(filters?: any): Promise<any[]>
  processWebhook(payload: any): Promise<void>
}

export interface IMetaAPIService {
  sendMessage(to: string, templateName: string, templateData: any): Promise<any>
  getBusinessProfile(): Promise<any>
  updateBusinessProfile(profileData: any): Promise<any>
  getPhoneNumbers(): Promise<any[]>
  getTemplateAnalytics(templateName: string): Promise<any>
}

export interface IProfileService {
  getProfile(): Promise<any>
  updateProfile(profileData: any): Promise<any>
  updateAvatar(file: File): Promise<any>
}
