"use client"

import type React from "react"
import { createContext, useContext } from "react"
import type {
  IAuthService,
  ITemplateService,
  ICampaignService,
  IContactService,
  IAnalyticsService,
  INotificationService,
  ISupportService,
  ISettingsService,
  IWebhookService,
  IMetaAPIService,
  IProfileService,
} from "./types"
import { SupabaseAuthService } from "./supabase/auth-service"
import { SupabaseTemplateService } from "./supabase/template-service"
import { SupabaseCampaignService } from "./supabase/campaign-service"
import { SupabaseContactService } from "./supabase/contact-service"
import { SupabaseAnalyticsService } from "./supabase/analytics-service"
import { SupabaseNotificationService } from "./supabase/notification-service"
import { SupabaseSupportService } from "./supabase/support-service"
import { SupabaseSettingsService } from "./supabase/settings-service"
import { SupabaseWebhookService } from "./supabase/webhook-service"
import { MetaAPIService } from "./meta/meta-api-service"
import { SupabaseProfileService } from "./supabase/profile-service"

// Mock services for development/testing
import { MockAuthService } from "./mock/auth-service"
import { MockTemplateService } from "./mock/template-service"
import { MockCampaignService } from "./mock/campaign-service"
import { MockContactService } from "./mock/contact-service"
import { MockAnalyticsService } from "./mock/analytics-service"
import { MockNotificationService } from "./mock/notification-service"
import { MockSupportService } from "./mock/support-service"
import { MockSettingsService } from "./mock/settings-service"
import { MockWebhookService } from "./mock/webhook-service"
import { MockMetaAPIService } from "./mock/meta-api-service"
import { MockProfileService } from "./mock/profile-service"

interface ServiceContextType {
  authService: IAuthService
  templateService: ITemplateService
  campaignService: ICampaignService
  contactService: IContactService
  analyticsService: IAnalyticsService
  notificationService: INotificationService
  supportService: ISupportService
  settingsService: ISettingsService
  webhookService: IWebhookService
  metaAPIService: IMetaAPIService
  profileService: IProfileService
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined)

export const useServices = () => {
  const context = useContext(ServiceContext)
  if (!context) {
    throw new Error("useServices must be used within a ServiceProvider")
  }
  return context
}

interface ServiceProviderProps {
  children: React.ReactNode
  useMocks?: boolean
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children, useMocks = false }) => {
  // Choose between real and mock services based on the useMocks prop
  const services: ServiceContextType = {
    authService: useMocks ? new MockAuthService() : new SupabaseAuthService(),
    templateService: useMocks ? new MockTemplateService() : new SupabaseTemplateService(),
    campaignService: useMocks ? new MockCampaignService() : new SupabaseCampaignService(),
    contactService: useMocks ? new MockContactService() : new SupabaseContactService(),
    analyticsService: useMocks ? new MockAnalyticsService() : new SupabaseAnalyticsService(),
    notificationService: useMocks ? new MockNotificationService() : new SupabaseNotificationService(),
    supportService: useMocks ? new MockSupportService() : new SupabaseSupportService(),
    settingsService: useMocks ? new MockSettingsService() : new SupabaseSettingsService(),
    webhookService: useMocks ? new MockWebhookService() : new SupabaseWebhookService(),
    metaAPIService: useMocks ? new MockMetaAPIService() : new MetaAPIService(),
    profileService: useMocks ? new MockProfileService() : new SupabaseProfileService(),
  }

  return <ServiceContext.Provider value={services}>{children}</ServiceContext.Provider>
}
