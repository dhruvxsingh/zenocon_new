"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Globe, Lock, MessageSquare, Moon, Save, Sun, User } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 md:p-8">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your account and application preferences</p>
          </div>
        </motion.div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="bg-background/60 backdrop-blur-sm">
            <TabsTrigger value="account">
              <User className="mr-2 h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Sun className="mr-2 h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="whatsapp">
              <MessageSquare className="mr-2 h-4 w-4" />
              WhatsApp
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your account details and profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" defaultValue="Acme Inc." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        defaultValue="Marketing professional with 5+ years of experience in digital marketing and customer engagement."
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span> Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Timezone & Language</CardTitle>
                  <CardDescription>Set your preferred timezone and language</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="America/New_York">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                          <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                          <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en-US">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="en-GB">English (UK)</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="pt">Portuguese</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue="MM/DD/YYYY">
                        <SelectTrigger id="date-format">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span> Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>Customize the appearance of the application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Color Theme</Label>
                      <RadioGroup defaultValue={theme} onValueChange={setTheme} className="flex gap-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="light" id="light" />
                          <Label htmlFor="light" className="flex items-center gap-2">
                            <Sun className="h-4 w-4" /> Light
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="dark" id="dark" />
                          <Label htmlFor="dark" className="flex items-center gap-2">
                            <Moon className="h-4 w-4" /> Dark
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="system" id="system" />
                          <Label htmlFor="system" className="flex items-center gap-2">
                            <Globe className="h-4 w-4" /> System
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label>Animations</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="animations" defaultChecked />
                        <Label htmlFor="animations">Enable animations</Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Reduced Motion</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="reduced-motion" />
                        <Label htmlFor="reduced-motion">Prefer reduced motion</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span> Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Email Notifications</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-templates" className="flex-1">
                            Template approvals and rejections
                          </Label>
                          <Switch id="email-templates" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-campaigns" className="flex-1">
                            Campaign status updates
                          </Label>
                          <Switch id="email-campaigns" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-contacts" className="flex-1">
                            New contact subscriptions
                          </Label>
                          <Switch id="email-contacts" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-reports" className="flex-1">
                            Weekly performance reports
                          </Label>
                          <Switch id="email-reports" defaultChecked />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>In-App Notifications</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="app-templates" className="flex-1">
                            Template approvals and rejections
                          </Label>
                          <Switch id="app-templates" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="app-campaigns" className="flex-1">
                            Campaign status updates
                          </Label>
                          <Switch id="app-campaigns" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="app-contacts" className="flex-1">
                            New contact subscriptions
                          </Label>
                          <Switch id="app-contacts" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="app-messages" className="flex-1">
                            Incoming messages
                          </Label>
                          <Switch id="app-messages" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span> Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="whatsapp" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>WhatsApp Business API Settings</CardTitle>
                  <CardDescription>Configure your WhatsApp Business API connection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="waba-id">WhatsApp Business Account ID</Label>
                      <Input id="waba-id" defaultValue="123456789012345" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone-number">Connected Phone Number</Label>
                      <Input id="phone-number" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <div className="flex space-x-2">
                        <Input id="webhook-url" defaultValue="https://api.yourdomain.com/whatsapp/webhook" readOnly />
                        <Button variant="outline" size="sm">
                          Copy
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="verify-token">Verify Token</Label>
                      <div className="flex space-x-2">
                        <Input id="verify-token" type="password" defaultValue="your-secret-verify-token" />
                        <Button variant="outline" size="sm">
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Test Connection</Button>
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span> Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Default Message Settings</CardTitle>
                  <CardDescription>Configure default settings for your WhatsApp messages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="default-language">Default Language</Label>
                      <Select defaultValue="en_US">
                        <SelectTrigger id="default-language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en_US">English (US)</SelectItem>
                          <SelectItem value="en_GB">English (UK)</SelectItem>
                          <SelectItem value="es_ES">Spanish</SelectItem>
                          <SelectItem value="fr_FR">French</SelectItem>
                          <SelectItem value="de_DE">German</SelectItem>
                          <SelectItem value="pt_BR">Portuguese (Brazil)</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Message Preferences</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="read-receipts" className="flex-1">
                            Enable read receipts
                          </Label>
                          <Switch id="read-receipts" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="typing-indicators" className="flex-1">
                            Show typing indicators
                          </Label>
                          <Switch id="typing-indicators" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span> Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-start space-x-2">
                <div>
                  <h3 className="font-medium">Data Deletion</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    We provide clear instructions on how to delete your data from our platform and WhatsApp Business
                    API.
                  </p>
                  <Link href="/data-deletion" className="text-sm text-primary hover:underline mt-2 inline-block">
                    View Data Deletion Instructions
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Update your password and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span> Updating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Update Password
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">
                          Protect your account with an additional security layer
                        </p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Login Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications for new logins to your account
                        </p>
                      </div>
                      <Switch id="login-notifications" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span> Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
