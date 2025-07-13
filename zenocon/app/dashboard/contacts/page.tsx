"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpDown, ChevronDown, Filter, MoreHorizontal, Plus, Search, Trash, Upload, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for contacts
const initialContacts = [
  {
    id: "contact-1",
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "john.smith@example.com",
    tags: ["Customer", "VIP"],
    groups: ["All Customers", "Recent Purchasers"],
    lastMessage: "2023-05-15T10:30:00",
    status: "active",
  },
  {
    id: "contact-2",
    name: "Sarah Johnson",
    phone: "+1 (555) 234-5678",
    email: "sarah.johnson@example.com",
    tags: ["Customer"],
    groups: ["All Customers", "New Customers"],
    lastMessage: "2023-05-10T14:20:00",
    status: "active",
  },
  {
    id: "contact-3",
    name: "Michael Brown",
    phone: "+1 (555) 345-6789",
    email: "michael.brown@example.com",
    tags: ["Customer", "Inactive"],
    groups: ["All Customers", "Inactive Customers"],
    lastMessage: "2023-04-25T09:15:00",
    status: "inactive",
  },
  {
    id: "contact-4",
    name: "Emily Davis",
    phone: "+1 (555) 456-7890",
    email: "emily.davis@example.com",
    tags: ["Customer", "VIP"],
    groups: ["All Customers", "VIP Customers"],
    lastMessage: "2023-05-18T16:45:00",
    status: "active",
  },
  {
    id: "contact-5",
    name: "David Wilson",
    phone: "+1 (555) 567-8901",
    email: "david.wilson@example.com",
    tags: ["Customer"],
    groups: ["All Customers", "Recent Purchasers"],
    lastMessage: "2023-05-16T11:30:00",
    status: "active",
  },
  {
    id: "contact-6",
    name: "Jennifer Taylor",
    phone: "+1 (555) 678-9012",
    email: "jennifer.taylor@example.com",
    tags: ["Customer", "Inactive"],
    groups: ["All Customers", "Inactive Customers"],
    lastMessage: "2023-04-10T13:10:00",
    status: "inactive",
  },
  {
    id: "contact-7",
    name: "Robert Martinez",
    phone: "+1 (555) 789-0123",
    email: "robert.martinez@example.com",
    tags: ["Customer"],
    groups: ["All Customers", "New Customers"],
    lastMessage: "2023-05-12T10:20:00",
    status: "active",
  },
  {
    id: "contact-8",
    name: "Lisa Anderson",
    phone: "+1 (555) 890-1234",
    email: "lisa.anderson@example.com",
    tags: ["Customer", "VIP"],
    groups: ["All Customers", "VIP Customers"],
    lastMessage: "2023-05-17T09:30:00",
    status: "active",
  },
]

// Mock data for groups
const initialGroups = [
  {
    id: "group-1",
    name: "All Customers",
    description: "All contacts in the system",
    count: 8,
    created: "2023-04-01T10:00:00",
  },
  {
    id: "group-2",
    name: "VIP Customers",
    description: "High-value customers",
    count: 3,
    created: "2023-04-05T11:30:00",
  },
  {
    id: "group-3",
    name: "New Customers",
    description: "Customers who joined in the last 30 days",
    count: 2,
    created: "2023-04-10T09:15:00",
  },
  {
    id: "group-4",
    name: "Recent Purchasers",
    description: "Customers who made a purchase in the last 7 days",
    count: 2,
    created: "2023-04-15T14:20:00",
  },
  {
    id: "group-5",
    name: "Inactive Customers",
    description: "Customers who haven't engaged in over 30 days",
    count: 2,
    created: "2023-04-20T16:45:00",
  },
]

export default function ContactsPage() {
  const [contacts, setContacts] = useState(initialContacts)
  const [groups, setGroups] = useState(initialGroups)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [groupFilter, setGroupFilter] = useState("All")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [isAddContactDialogOpen, setIsAddContactDialogOpen] = useState(false)
  const [isAddGroupDialogOpen, setIsAddGroupDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [contactToDelete, setContactToDelete] = useState<string | null>(null)
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    tags: "",
    groups: [],
  })
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
  })

  // Filter and sort contacts
  const filteredContacts = contacts
    .filter((contact) => {
      const matchesSearch =
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "All" || contact.status === statusFilter.toLowerCase()
      const matchesGroup = groupFilter === "All" || contact.groups.includes(groupFilter)
      return matchesSearch && matchesStatus && matchesGroup
    })
    .sort((a, b) => {
      if (sortField === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortField === "lastMessage") {
        return sortDirection === "asc"
          ? new Date(a.lastMessage).getTime() - new Date(b.lastMessage).getTime()
          : new Date(b.lastMessage).getTime() - new Date(a.lastMessage).getTime()
      } else if (sortField === "status") {
        return sortDirection === "asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
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

  const handleSelectContact = (id: string) => {
    setSelectedContacts((prev) => (prev.includes(id) ? prev.filter((contactId) => contactId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(filteredContacts.map((contact) => contact.id))
    }
  }

  const handleAddContact = () => {
    const contact = {
      id: `contact-${Date.now()}`,
      name: newContact.name,
      phone: newContact.phone,
      email: newContact.email,
      tags: newContact.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      groups: newContact.groups,
      lastMessage: "",
      status: "active",
    }
    setContacts([...contacts, contact])
    setIsAddContactDialogOpen(false)
    setNewContact({
      name: "",
      phone: "",
      email: "",
      tags: "",
      groups: [],
    })
  }

  const handleAddGroup = () => {
    const group = {
      id: `group-${Date.now()}`,
      name: newGroup.name,
      description: newGroup.description,
      count: 0,
      created: new Date().toISOString(),
    }
    setGroups([...groups, group])
    setIsAddGroupDialogOpen(false)
    setNewGroup({
      name: "",
      description: "",
    })
  }

  const handleDeleteContact = () => {
    if (contactToDelete) {
      setContacts(contacts.filter((contact) => contact.id !== contactToDelete))
      setContactToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const handleDeleteSelected = () => {
    setContacts(contacts.filter((contact) => !selectedContacts.includes(contact.id)))
    setSelectedContacts([])
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
            <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
            <p className="text-muted-foreground">Manage your WhatsApp contacts and groups</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAddContactDialogOpen} onOpenChange={setIsAddContactDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-teal-500 hover:bg-teal-600 shadow-sm transition-all duration-300 hover:shadow-md">
                  <Plus className="mr-2 h-4 w-4" /> Add Contact
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Contact</DialogTitle>
                  <DialogDescription>Add a new contact to your WhatsApp Business account</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newContact.email}
                      onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (Comma separated)</Label>
                    <Input
                      id="tags"
                      value={newContact.tags}
                      onChange={(e) => setNewContact({ ...newContact, tags: e.target.value })}
                      placeholder="Customer, VIP, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="groups">Groups</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select groups" />
                      </SelectTrigger>
                      <SelectContent>
                        {groups.map((group) => (
                          <SelectItem key={group.id} value={group.name}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddContactDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddContact} className="bg-teal-500 hover:bg-teal-600">
                    Add Contact
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  More Actions <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsAddGroupDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Group
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Upload className="mr-2 h-4 w-4" />
                  Import Contacts
                </DropdownMenuItem>
                {selectedContacts.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleDeleteSelected} className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Selected ({selectedContacts.length})
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Tabs defaultValue="contacts" className="space-y-4">
            <TabsList className="bg-background/60 backdrop-blur-sm">
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
            </TabsList>

            <TabsContent value="contacts" className="space-y-4">
              <Card className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm">
                <CardHeader className="p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search contacts..."
                          className="pl-8 w-[250px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
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
                          {["All", "Active", "Inactive"].map((status) => (
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
                            Group: {groupFilter}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                          <DropdownMenuLabel>Filter by Group</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setGroupFilter("All")}
                            className={groupFilter === "All" ? "bg-accent" : ""}
                          >
                            All
                          </DropdownMenuItem>
                          {groups.map((group) => (
                            <DropdownMenuItem
                              key={group.id}
                              onClick={() => setGroupFilter(group.name)}
                              className={groupFilter === group.name ? "bg-accent" : ""}
                            >
                              {group.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="border-t">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[40px]">
                            <Checkbox
                              checked={
                                filteredContacts.length > 0 && selectedContacts.length === filteredContacts.length
                              }
                              onCheckedChange={handleSelectAll}
                              aria-label="Select all"
                            />
                          </TableHead>
                          <TableHead className="w-[250px]">
                            <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("name")}>
                              Name
                              <ArrowUpDown
                                className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                                  sortField === "name" && sortDirection === "desc" ? "rotate-180" : ""
                                }`}
                              />
                            </Button>
                          </TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Tags</TableHead>
                          <TableHead>
                            <Button
                              variant="ghost"
                              className="p-0 font-medium"
                              onClick={() => handleSort("lastMessage")}
                            >
                              Last Message
                              <ArrowUpDown
                                className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                                  sortField === "lastMessage" && sortDirection === "desc" ? "rotate-180" : ""
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
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredContacts.map((contact) => (
                          <TableRow key={contact.id} className="group">
                            <TableCell>
                              <Checkbox
                                checked={selectedContacts.includes(contact.id)}
                                onCheckedChange={() => handleSelectContact(contact.id)}
                                aria-label={`Select ${contact.name}`}
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={contact.name} />
                                  <AvatarFallback>
                                    {contact.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                {contact.name}
                              </div>
                            </TableCell>
                            <TableCell>{contact.phone}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {contact.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="bg-background/60 backdrop-blur-sm">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              {contact.lastMessage ? new Date(contact.lastMessage).toLocaleDateString() : "Never"}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${
                                  contact.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {contact.status === "active" ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
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
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                                  <DropdownMenuItem>Send Message</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => {
                                      setContactToDelete(contact.id)
                                      setIsDeleteDialogOpen(true)
                                    }}
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete Contact
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
            </TabsContent>

            <TabsContent value="groups" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {groups.map((group) => (
                  <Card
                    key={group.id}
                    className="overflow-hidden border-border/40 bg-background/60 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                  >
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Members</DropdownMenuItem>
                            <DropdownMenuItem>Edit Group</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Group
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{group.count} contacts</span>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        Created: {new Date(group.created).toLocaleDateString()}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        View Members
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                <Card className="overflow-hidden border-border/40 border-dashed bg-background/30 backdrop-blur-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center p-6">
                  <Button
                    variant="outline"
                    className="h-12 w-12 rounded-full mb-4"
                    onClick={() => setIsAddGroupDialogOpen(true)}
                  >
                    <Plus className="h-6 w-6" />
                  </Button>
                  <h3 className="text-lg font-medium">Create New Group</h3>
                  <p className="text-sm text-muted-foreground text-center mt-1">
                    Organize your contacts into groups for targeted messaging
                  </p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Add Group Dialog */}
      <Dialog open={isAddGroupDialogOpen} onOpenChange={setIsAddGroupDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
            <DialogDescription>Create a new contact group for targeted messaging</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                placeholder="e.g., VIP Customers"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-description">Description</Label>
              <Input
                id="group-description"
                value={newGroup.description}
                onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                placeholder="e.g., High-value customers who spend over $500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddGroupDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddGroup} className="bg-teal-500 hover:bg-teal-600">
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the contact and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteContact} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  )
}
