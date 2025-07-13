"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, CheckCircle, Clock, Filter, MoreHorizontal, Pause, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for campaigns
const initialCampaigns = [
  {
    id: "campaign-1",
    name: "Welcome Series",
    status: "active",
    template: "Welcome Message",
    audience: "New Customers",
    sent: 1250,
    delivered: 1200,
    read: 980,
    responded: 450,
    scheduled: "2023-05-15T10:00:00",
    created: "2023-05-10T14:30:00",
  },
  {
    id: "campaign-2",
    name: "May Promotion",
    status: "completed",
    template: "Promotional Offer",
    audience: "All Customers",
    sent: 5000,
    delivered: 4850,
    read: 3200,
    responded: 1500,
    scheduled: "2023-05-05T09:00:00",
    created: "2023-05-01T11:20:00",
  },
  {
    id: "campaign-3",
    name: "Feedback Request",
    status: "scheduled",
    template: "Feedback Request",
    audience: "Recent Purchasers",
    sent: 0,
    delivered: 0,
    read: 0,
    responded: 0,
    scheduled: "2023-05-25T15:00:00",
    created: "2023-05-18T13:45:00",
  },
  {
    id: "campaign-4",
    name: "Abandoned Cart Reminder",
    status: "paused",
    template: "Cart Reminder",
    audience: "Abandoned Carts",
    sent: 320,
    delivered: 310,
    read: 180,
    responded: 75,
    scheduled: "2023-05-12T11:30:00",
    created: "2023-05-10T09:15:00",
  },
  {
    id: "campaign-5",
    name: "Order Updates",
    status: "active",
    template: "Order Confirmation",
    audience: "Recent Orders",
    sent: 850,
    delivered: 840,
    read: 780,
    responded: 320,
    scheduled: "2023-05-08T10:00:00",
    created: "2023-05-07T16:30:00",
  },
  {
    id: "campaign-6",
    name: "Re-engagement",
    status: "draft",
    template: "We Miss You",
    audience: "Inactive Customers",
    sent: 0,
    delivered: 0,
    read: 0,
    responded: 0,
    scheduled: "",
    created: "2023-05-19T10:45:00",
  },
]

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null)
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    template: "",
    audience: "",
    message: "",
    scheduled: "",
  })

  // Filter campaigns
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "All" || campaign.status === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const handleCreateCampaign = () => {
    const campaign = {
      id: `campaign-${Date.now()}`,
      name: newCampaign.name,
      status: newCampaign.scheduled ? "scheduled" : "draft",
      template: newCampaign.template,
      audience: newCampaign.audience,
      sent: 0,
      delivered: 0,
      read: 0,
      responded: 0,
      scheduled: newCampaign.scheduled,
      created: new Date().toISOString(),
    }
    setCampaigns([...campaigns, campaign])
    setIsCreateDialogOpen(false)
    setNewCampaign({
      name: "",
      template: "",
      audience: "",
      message: "",
      scheduled: "",
    })
  }

  const handleDeleteCampaign = () => {
    if (campaignToDelete) {
      setCampaigns(campaigns.filter((campaign) => campaign.id !== campaignToDelete))
      setCampaignToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const handleStatusChange = (id: string, status: string) => {
    setCampaigns(campaigns.map((campaign) => (campaign.id === id ? { ...campaign, status } : campaign)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </div>
        )
      case "scheduled":
        return (
          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
            <Calendar className="mr-1 h-3 w-3" />
            Scheduled
          </div>
        )
      case "completed":
        return (
          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </div>
        )
      case "paused":
        return (
          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
            <Pause className="mr-1 h-3 w-3" />
            Paused
          </div>
        )
      case "draft":
        return (
          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800">
            <Clock className="mr-1 h-3 w-3" />
            Draft
          </div>
        )
      default:
        return (
          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        )
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Campaigns</h1>
            <p className="text-muted-foreground">Create and manage your WhatsApp messaging campaigns</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-500 hover:bg-teal-600 shadow-sm transition-all duration-300 hover:shadow-md">
                <Plus className="mr-2 h-4 w-4" /> New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>
                  Set up a new WhatsApp messaging campaign to engage with your audience
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                    placeholder="e.g., Summer Promotion"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="template">Template</Label>
                    <Select
                      value={newCampaign.template}
                      onValueChange={(value) => setNewCampaign({ ...newCampaign, template: value })}
                    >
                      <SelectTrigger id="template">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Welcome Message">Welcome Message</SelectItem>
                        <SelectItem value="Promotional Offer">Promotional Offer</SelectItem>
                        <SelectItem value="Order Confirmation">Order Confirmation</SelectItem>
                        <SelectItem value="Feedback Request">Feedback Request</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="audience">Audience</Label>
                    <Select
                      value={newCampaign.audience}
                      onValueChange={(value) => setNewCampaign({ ...newCampaign, audience: value })}
                    >
                      <SelectTrigger id="audience">
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Customers">All Customers</SelectItem>
                        <SelectItem value="New Customers">New Customers</SelectItem>
                        <SelectItem value="Recent Purchasers">Recent Purchasers</SelectItem>
                        <SelectItem value="Inactive Customers">Inactive Customers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Custom Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={newCampaign.message}
                    onChange={(e) => setNewCampaign({ ...newCampaign, message: e.target.value })}
                    placeholder="Add a custom message or leave blank to use the template as is"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduled">Schedule</Label>
                  <Input
                    id="scheduled"
                    type="datetime-local"
                    value={newCampaign.scheduled}
                    onChange={(e) => setNewCampaign({ ...newCampaign, scheduled: e.target.value })}
                  />
                  <div className="flex items-center space-x-2 mt-2">
                    <Checkbox id="save-draft" />
                    <label
                      htmlFor="save-draft"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save as draft (don't schedule yet)
                    </label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCampaign} className="bg-teal-500 hover:bg-teal-600">
                  Create Campaign
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList className="bg-background/60 backdrop-blur-sm">
                <TabsTrigger value="all">All Campaigns</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search campaigns..."
                    className="pl-8 w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {["All", "Active", "Scheduled", "Completed", "Paused", "Draft"].map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={statusFilter === status ? "bg-accent" : ""}
                      >
                        {status}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCampaigns.map((campaign) => (
                  <Card
                    key={campaign.id}
                    className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                  >
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{campaign.name}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            {campaign.status === "active" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(campaign.id, "paused")}>
                                Pause Campaign
                              </DropdownMenuItem>
                            )}
                            {campaign.status === "paused" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(campaign.id, "active")}>
                                Resume Campaign
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setCampaignToDelete(campaign.id)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              Delete Campaign
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <CardDescription>Template: {campaign.template}</CardDescription>
                        {getStatusBadge(campaign.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Audience:</span>
                          <span className="font-medium">{campaign.audience}</span>
                        </div>
                        {campaign.status !== "draft" && (
                          <>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Sent:</span>
                                <span>{campaign.sent.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Delivered:</span>
                                <span>{campaign.delivered.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Read:</span>
                                <span>{campaign.read.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Responded:</span>
                                <span>{campaign.responded.toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Open Rate:</span>
                                <span className="font-medium">
                                  {campaign.delivered > 0
                                    ? `${Math.round((campaign.read / campaign.delivered) * 100)}%`
                                    : "N/A"}
                                </span>
                              </div>
                              <Progress
                                value={campaign.delivered > 0 ? (campaign.read / campaign.delivered) * 100 : 0}
                                className="h-2"
                              />
                            </div>
                          </>
                        )}
                        {campaign.scheduled && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Scheduled:</span>
                            <span>{new Date(campaign.scheduled).toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {campaigns
                  .filter((campaign) => campaign.status === "active")
                  .map((campaign) => (
                    <Card
                      key={campaign.id}
                      className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                    >
                      {/* Same card content as above */}
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="scheduled" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {campaigns
                  .filter((campaign) => campaign.status === "scheduled")
                  .map((campaign) => (
                    <Card
                      key={campaign.id}
                      className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                    >
                      {/* Same card content as above */}
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {campaigns
                  .filter((campaign) => campaign.status === "completed")
                  .map((campaign) => (
                    <Card
                      key={campaign.id}
                      className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                    >
                      {/* Same card content as above */}
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="drafts" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {campaigns
                  .filter((campaign) => campaign.status === "draft")
                  .map((campaign) => (
                    <Card
                      key={campaign.id}
                      className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                    >
                      {/* Same card content as above */}
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the campaign and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCampaign} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  )
}
