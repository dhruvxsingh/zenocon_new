import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Zap, BarChart3, Briefcase, Calendar, CheckCircle, Users } from "lucide-react"
import { Animated } from "@/components/animated"
import { MeshBlob } from "@/components/mesh-blob"

export default function ProfessionalServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 mesh-gradient-1"></div>
        <MeshBlob variant="teal" size="lg" className="-top-32 -left-32" opacity={0.05} />
        <MeshBlob variant="blue" size="lg" className="top-1/2 -right-32" opacity={0.05} />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Animated animation="fadeInUp">
              <div className="flex flex-col gap-6 max-w-xl">
                <span className="text-4xl">💼</span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  WhatsApp Solutions for Professional Services
                </h1>
                <p className="text-xl text-gray-600">
                  Streamline client communication and appointment scheduling for consulting and service businesses
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button size="lg" className="bg-teal-500 hover:bg-teal-600" asChild>
                    <Link href="/signup">Get Started Free</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2" asChild>
                    <Link href="/contact">Request Demo</Link>
                  </Button>
                </div>
              </div>
            </Animated>
            <Animated animation="fadeIn" delay={400}>
              <div className="relative">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-blue-500/10 mix-blend-overlay"></div>
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Professional Services WhatsApp Solution"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </Animated>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-2 opacity-30"></div>
        <div className="container relative z-10">
          <Animated animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Benefits</h2>
              <p className="text-xl text-gray-600">
                How Zenocon helps professional service firms enhance client relationships and streamline operations
              </p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="h-8 w-8 text-teal-500" />,
                title: "Appointment Scheduling",
                description: "Streamline booking and confirmation of client appointments",
              },
              {
                icon: <Briefcase className="h-8 w-8 text-teal-500" />,
                title: "Document Exchange",
                description: "Securely share and receive documents through WhatsApp",
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-teal-500" />,
                title: "Client Updates",
                description: "Keep clients informed about project status and milestones",
              },
              {
                icon: <Users className="h-8 w-8 text-teal-500" />,
                title: "Client Onboarding",
                description: "Streamline the client intake process with guided workflows",
              },
              {
                icon: <Zap className="h-8 w-8 text-teal-500" />,
                title: "Quick Consultations",
                description: "Provide preliminary advice and consultations via WhatsApp",
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-teal-500" />,
                title: "Client Engagement",
                description: "Track client interactions and identify opportunities for improvement",
              },
            ].map((benefit, index) => (
              <Animated key={index} animation="fadeInUp" delay={index * 100}>
                <Card className="p-6 hover:shadow-md transition-all duration-300 border border-gray-100 mesh-gradient-card group h-full">
                  <div className="mb-4 p-3 bg-teal-50 rounded-lg w-fit group-hover:bg-teal-100 transition-colors duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </Card>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-3 opacity-50"></div>
        <MeshBlob variant="blue" size="lg" className="-bottom-32 -right-32" opacity={0.05} />
        <MeshBlob variant="teal" size="md" className="top-1/3 -left-32" opacity={0.05} />

        <div className="container relative z-10">
          <Animated animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">
                Explore how professional service firms use Zenocon to enhance client relationships
              </p>
            </div>
          </Animated>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="scheduling" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="scheduling">Appointment Management</TabsTrigger>
                <TabsTrigger value="documents">Document Exchange</TabsTrigger>
                <TabsTrigger value="updates">Client Communication</TabsTrigger>
              </TabsList>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <TabsContent value="scheduling" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Efficient Appointment Management</h3>
                    <p className="text-gray-600 mb-4">
                      Streamline the scheduling process and reduce no-shows with automated reminders.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Send available time slots for clients to select",
                        "Confirm appointments with calendar invites",
                        "Send automated reminders before appointments",
                        "Allow easy rescheduling through WhatsApp",
                        "Follow up after appointments with next steps",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="documents" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Secure Document Exchange</h3>
                    <p className="text-gray-600 mb-4">
                      Share and receive documents securely through WhatsApp with tracking and organization.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Send contracts, proposals, and agreements",
                        "Request specific documents from clients",
                        "Track document receipt and review status",
                        "Send secure links to larger files",
                        "Organize documents by client and project",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="updates" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Proactive Client Communication</h3>
                    <p className="text-gray-600 mb-4">
                      Keep clients informed and engaged throughout their journey with your firm.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Send regular project status updates",
                        "Notify clients of important milestones",
                        "Share relevant industry news and insights",
                        "Collect feedback at key project stages",
                        "Provide quick responses to client inquiries",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </div>
                <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-blue-500/10 mix-blend-overlay"></div>
                  <TabsContent value="scheduling" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Appointment Management Interface"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="documents" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Document Exchange Interface"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="updates" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Client Communication Interface"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-2 opacity-30"></div>
        <div className="container relative z-10">
          <Animated animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
              <p className="text-xl text-gray-600">See how professional service firms are transforming with Zenocon</p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Smith & Partners",
                type: "Law Firm",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Zenocon has transformed our client communication. Our appointment no-show rate decreased by 65% and client satisfaction increased significantly.",
                results: [
                  "65% reduction in appointment no-shows",
                  "42% faster document turnaround time",
                  "38% increase in client satisfaction scores",
                ],
              },
              {
                name: "Financial Advisors Inc.",
                type: "Financial Services Firm",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "The ability to securely share financial documents and updates through WhatsApp has made our client interactions much more efficient.",
                results: [
                  "53% increase in client engagement",
                  "47% reduction in administrative tasks",
                  "4.9/5 client communication rating",
                ],
              },
              {
                name: "Consulting Group",
                type: "Management Consultancy",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Our project updates and milestone notifications through Zenocon have dramatically improved client visibility and satisfaction.",
                results: [
                  "58% improvement in project transparency ratings",
                  "41% increase in client retention",
                  "35% growth in referral business",
                ],
              },
            ].map((story, index) => (
              <Animated key={index} animation="fadeInUp" delay={index * 100}>
                <Card className="p-6 hover:shadow-md transition-all duration-300 border border-gray-100 bg-white/80 backdrop-blur-sm mesh-gradient-card h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative overflow-hidden rounded-full border-2 border-teal-100">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt={story.name}
                        width={60}
                        height={60}
                        className="rounded-full transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{story.name}</h3>
                      <p className="text-sm text-gray-600">{story.type}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-4">"{story.quote}"</p>
                  <div className="border-t pt-4">
                    <p className="font-medium mb-2">Results:</p>
                    <ul className="space-y-1">
                      {story.results.map((result, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500"></div>
        <MeshBlob variant="blue" size="lg" className="-top-32 -right-32" opacity={0.2} />
        <MeshBlob variant="teal" size="lg" className="bottom-0 -left-32" opacity={0.2} />

        <div className="container relative z-10">
          <Animated animation="fadeIn">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to transform your professional services firm?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join hundreds of professional service firms already using Zenocon to enhance client relationships
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-teal-50 transition-all duration-300"
                  asChild
                >
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                  <Link href="/contact">Schedule Demo</Link>
                </Button>
              </div>
            </div>
          </Animated>
        </div>
      </section>
    </>
  )
}
