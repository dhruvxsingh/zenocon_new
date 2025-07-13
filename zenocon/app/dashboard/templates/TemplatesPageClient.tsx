"use client"

import { useState } from "react"
import {
  ArrowUpDown,
  CheckCircle,
  Clock,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
  Edit,
  Copy,
  Eye,
  XCircle,
} from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { TemplateEditor } from "@/components/dashboard/template-editor"
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TemplatePreview } from "@/components/dashboard/template-preview"

// Mock data for templates
const initialTemplates = [
  {
    id: "template-1",
    name: "Welcome Message",
    category: "Utility",
    status: "approved",
    created: "2023-05-10T10:30:00",
    language: "English",
    content: "Hello {{1}}, welcome to our service! We're excited to have you on board.",
    headerType: "text",
    headerContent: "Welcome",
    bodyContent: "Hello {{1}}, welcome to our service! We're excited to have you on board.",
    footerContent: "Reply HELP for assistance",
    buttons: [
      { type: "quick_reply", text: "Get Started" },
      { type: "quick_reply", text: "Learn More" },
    ],
  },
  {
    id: "template-2",
    name: "Order Confirmation",
    category: "Utility",
    status: "approved",
    created: "2023-05-08T14:20:00",
    language: "English",
    content: "Hello {{1}}, your order #{{2}} has been confirmed and will be shipped soon.",
    headerType: "text",
    headerContent: "Order Confirmed",
    bodyContent: "Hello {{1}}, your order #{{2}} has been confirmed and will be shipped soon.",
    footerContent: "Thank you for shopping with us!",
    buttons: [
      { type: "quick_reply", text: "Track Order" },
      { type: "quick_reply", text: "View Details" },
    ],
  },
  {
    id: "template-3",
    name: "Shipping Update",
    category: "Utility",
    status: "pending",
    created: "2023-05-12T09:15:00",
    language: "English",
    content: "Hello {{1}}, your order #{{2}} has been shipped! Track your package with this link: {{3}}.",
    headerType: "text",
    headerContent: "Shipping Update",
    bodyContent: "Hello {{1}}, your order #{{2}} has been shipped! Track your package with this link: {{3}}.",
    footerContent: "Expected delivery: 3-5 business days",
    buttons: [{ type: "quick_reply", text: "Track Package" }],
  },
  {
    id: "template-4",
    name: "Feedback Request",
    category: "Utility",
    status: "approved",
    created: "2023-05-05T16:45:00",
    language: "English",
    content: "Hello {{1}}, thank you for your recent purchase! We'd love to hear your feedback.",
    headerType: "text",
    headerContent: "Your Feedback Matters",
    bodyContent: "Hello {{1}}, thank you for your recent purchase! We'd love to hear your feedback.",
    footerContent: "Your opinion helps us improve",
    buttons: [
      { type: "quick_reply", text: "Rate 1-5" },
      { type: "quick_reply", text: "Leave Comment" },
    ],
  },
  {
    id: "template-5",
    name: "Promotional Offer",
    category: "Marketing",
    status: "rejected",
    created: "2023-05-14T11:30:00",
    language: "English",
    content: "Hello {{1}}, enjoy 20% off your next purchase with code: {{2}}. Valid until {{3}}.",
    headerType: "text",
    headerContent: "Special Offer",
    bodyContent: "Hello {{1}}, enjoy 20% off your next purchase with code: {{2}}. Valid until {{3}}.",
    footerContent: "Limited time offer",
    buttons: [{ type: "quick_reply", text: "Shop Now" }],
  },
  {
    id: "template-6",
    name: "Appointment Reminder",
    category: "Utility",
    status: "approved",
    created: "2023-04-28T13:10:00",
    language: "English",
    content: "Hello {{1}}, this is a reminder about your appointment on {{2}} at {{3}}.",
    headerType: "text",
    headerContent: "Appointment Reminder",
    bodyContent: "Hello {{1}}, this is a reminder about your appointment on {{2}} at {{3}}.",
    footerContent: "Reply YES to confirm or NO to reschedule",
    buttons: [
      { type: "quick_reply", text: "Confirm" },
      { type: "quick_reply", text: "Reschedule" },
    ],
  },
  {
    id: "template-7",
    name: "Payment Confirmation",
    category: "Utility",
    status: "approved",
    created: "2023-05-02T10:20:00",
    language: "English",
    content: "Hello {{1}}, we've received your payment of {{2}} for invoice #{{3}}. Thank you!",
    headerType: "text",
    headerContent: "Payment Received",
    bodyContent: "Hello {{1}}, we've received your payment of {{2}} for invoice #{{3}}. Thank you!",
    footerContent: "A receipt has been emailed to you",
    buttons: [{ type: "quick_reply", text: "View Receipt" }],
  },
  {
    id: "template-8",
    name: "Account Verification",
    category: "Authentication",
    status: "approved",
    created: "2023-05-01T09:30:00",
    language: "English",
    content: "Your verification code is {{1}}. This code will expire in 10 minutes.",
    headerType: "text",
    headerContent: "Verification Code",
    bodyContent: "Your verification code is {{1}}. This code will expire in 10 minutes.",
    footerContent: "Do not share this code with anyone",
    buttons: [],
  },
]

export default function TemplatesPageClient() {
  const [templates, setTemplates] = useState(initialTemplates)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)

  // Filter and sort templates
  const filteredTemplates = templates
    .filter((template) => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "All" || template.status === statusFilter.toLowerCase()
      const matchesCategory = categoryFilter === "All" || template.category === categoryFilter
      return matchesSearch && matchesStatus && matchesCategory
    })
    .sort((a, b) => {
      if (sortField === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortField === "created") {
        return sortDirection === "asc"
          ? new Date(a.created).getTime() - new Date(b.created).getTime()
          : new Date(b.created).getTime() - new Date(a.created).getTime()
      } else if (sortField === "status") {
        return sortDirection === "asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
      } else if (sortField === "category") {
        return sortDirection === "asc" ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category)
      }
      return 0
    })

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleDeleteTemplate = () => {
    if (templateToDelete) {
      setTemplates(templates.filter((template) => template.id !== templateToDelete))
      setTemplateToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const handleDuplicateTemplate = (templateId: string) => {
    const templateToDuplicate = templates.find((template) => template.id === templateId)
    if (templateToDuplicate) {
      const newTemplate = {
        ...templateToDuplicate,
        id: `template-${Date.now()}`,
        name: `${templateToDuplicate.name} (Copy)`,
        created: new Date().toISOString(),
        status: "pending",
      }
      setTemplates([...templates, newTemplate])
    }
  }

  const handleSaveTemplate = (templateData: any) => {
    if (isEditMode && selectedTemplate) {
      // Update existing template
      setTemplates(
        templates.map((template) =>
          template.id === selectedTemplate.id ? { ...template, ...templateData, status: "pending" } : template,
        ),
      )
      setIsEditMode(false)
    } else {
      // Add new template
      const newTemplate = {
        id: `template-${Date.now()}`,
        created: new Date().toISOString(),
        status: "pending",
        language: "English",
        ...templateData,
      }
      setTemplates([...templates, newTemplate])
    }
    setSelectedTemplate(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Approved
          </div>
        )
      case "pending":
        return (
          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </div>
        )
      case "rejected":
        return (
          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="mr-1 h-3 w-3" />
            Rejected
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
            <h1 className="text-2xl font-bold tracking-tight">WhatsApp Templates</h1>
            <p className="text-muted-foreground">Create and manage your WhatsApp message templates</p>
          </div>
          <TemplateEditor
            onSave={handleSaveTemplate}
            initialData={isEditMode ? selectedTemplate : undefined}
            isEdit={isEditMode}
          >
            <Button className="bg-teal-500 hover:bg-teal-600 shadow-sm transition-all duration-300 hover:shadow-md">
              <Plus className="mr-2 h-4 w-4" /> New Template
            </Button>
          </TemplateEditor>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
            <CardHeader className="p-4">
              <CardTitle>Templates</CardTitle>
              <CardDescription>You have {templates.length} templates in your account</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search templates..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Status: {statusFilter}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {["All", "Approved", "Pending", "Rejected"].map((status) => (
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Category: {categoryFilter}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {["All", "Utility", "Marketing", "Authentication"].map((category) => (
                        <DropdownMenuItem
                          key={category}
                          onClick={() => setCategoryFilter(category)}
                          className={categoryFilter === category ? "bg-accent" : ""}
                        >
                          {category}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="border-t">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">
                        <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("name")}>
                          Name
                          <ArrowUpDown
                            className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                              sortField === "name" && sortDirection === "desc" ? "rotate-180" : ""
                            }`}
                          />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("category")}>
                          Category
                          <ArrowUpDown
                            className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                              sortField === "category" && sortDirection === "desc" ? "rotate-180" : ""
                            }`}
                          />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("status")}>
                          Status
                          <ArrowUpDown
                            className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                              sortField === "status" && sortDirection === "desc" ? "rotate-180" : ""
                            }`}
                          />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("created")}>
                          Created
                          <ArrowUpDown
                            className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                              sortField === "created" && sortDirection === "desc" ? "rotate-180" : ""
                            }`}
                          />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 font-medium">
                          Language
                        </Button>
                      </TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTemplates.map((template) => (
                      <TableRow key={template.id} className="group">
                        <TableCell className="font-medium">
                          <button
                            onClick={() => {
                              setSelectedTemplate(template)
                              setIsPreviewOpen(true)
                            }}
                            className="hover:underline text-left"
                          >
                            {template.name}
                          </button>
                        </TableCell>
                        <TableCell>{template.category}</TableCell>
                        <TableCell>{getStatusBadge(template.status)}</TableCell>
                        <TableCell>{new Date(template.created).toLocaleDateString()}</TableCell>
                        <TableCell>{template.language}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedTemplate(template)
                                  setIsPreviewOpen(true)
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedTemplate(template)
                                  setIsEditMode(true)
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDuplicateTemplate(template.id)}>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  setTemplateToDelete(template.id)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Template Preview</DialogTitle>
            <DialogDescription>Preview how your template will appear to recipients</DialogDescription>
          </DialogHeader>
          {selectedTemplate && <TemplatePreview template={selectedTemplate} />}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the template.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTemplate} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  )
}
