import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Zap, BarChart3, Plane, Map, CheckCircle, Calendar } from "lucide-react"
import { Animated } from "@/components/animated"
import { MeshBlob } from "@/components/mesh-blob"

export default function TravelPage() {
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
                <span className="text-4xl">✈️</span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">WhatsApp Solutions for Travel</h1>
                <p className="text-xl text-gray-600">
                  Elevate travel experiences with booking confirmations, itinerary updates, and local recommendations
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
                    alt="Travel WhatsApp Solution"
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
                How Zenocon helps travel businesses enhance customer experience and operational efficiency
              </p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Plane className="h-8 w-8 text-teal-500" />,
                title: "Booking Confirmations",
                description: "Send instant booking confirmations with all travel details",
              },
              {
                icon: <Calendar className="h-8 w-8 text-teal-500" />,
                title: "Itinerary Management",
                description: "Share and update travel itineraries with real-time changes",
              },
              {
                icon: <Map className="h-8 w-8 text-teal-500" />,
                title: "Travel Recommendations",
                description: "Provide personalized local recommendations and travel tips",
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-teal-500" />,
                title: "Travel Support",
                description: "Offer 24/7 travel assistance and emergency support",
              },
              {
                icon: <Zap className="h-8 w-8 text-teal-500" />,
                title: "Check-in Reminders",
                description: "Send timely check-in reminders and boarding passes",
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-teal-500" />,
                title: "Customer Insights",
                description: "Gain valuable insights into traveler preferences and behavior",
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
                Explore how travel businesses use Zenocon to enhance customer experience
              </p>
            </div>
          </Animated>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="bookings" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="bookings">Booking Management</TabsTrigger>
                <TabsTrigger value="itineraries">Itinerary Updates</TabsTrigger>
                <TabsTrigger value="support">Travel Support</TabsTrigger>
              </TabsList>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <TabsContent value="bookings" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Streamlined Booking Management</h3>
                    <p className="text-gray-600 mb-4">
                      Simplify the booking process and keep travelers informed about their reservations.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Send instant booking confirmations with QR codes",
                        "Provide payment receipts and booking references",
                        "Send check-in reminders with links to online check-in",
                        "Deliver digital boarding passes and hotel vouchers",
                        "Notify travelers about booking changes or cancellations",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="itineraries" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Dynamic Itinerary Management</h3>
                    <p className="text-gray-600 mb-4">
                      Keep travelers informed with real-time updates to their travel plans.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Share comprehensive travel itineraries with all details",
                        "Send real-time flight status and gate change updates",
                        "Provide weather forecasts for destination cities",
                        "Notify about schedule changes and transportation options",
                        "Send timely reminders for activities and excursions",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="support" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Responsive Travel Support</h3>
                    <p className="text-gray-600 mb-4">
                      Provide immediate assistance to travelers whenever and wherever they need it.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Offer 24/7 travel assistance through WhatsApp",
                        "Provide local emergency contact information",
                        "Help with flight rebooking during disruptions",
                        "Assist with lost luggage and travel document issues",
                        "Share local transportation options and directions",
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
                  <TabsContent value="bookings" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Booking Management Interface"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="itineraries" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Itinerary Updates Interface"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="support" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Travel Support Interface"
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
              <p className="text-xl text-gray-600">See how travel businesses are transforming with Zenocon</p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Global Travels",
                type: "Travel Agency",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Our customer satisfaction scores increased by 47% after implementing Zenocon's WhatsApp travel support.",
                results: [
                  "47% increase in customer satisfaction",
                  "62% reduction in support call volume",
                  "38% improvement in booking conversion rates",
                ],
              },
              {
                name: "SkyHigh Airlines",
                type: "Regional Airline",
                image: "/placeholder.svg?height=300&width=300",
                quote: "Zenocon has transformed how we communicate flight updates and disruptions to our passengers.",
                results: [
                  "53% reduction in airport service desk queries",
                  "41% higher engagement with flight updates",
                  "4.8/5 communication satisfaction rating",
                ],
              },
              {
                name: "Luxury Stays",
                type: "Hotel Chain",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Our guests love receiving personalized recommendations and concierge services through WhatsApp.",
                results: [
                  "58% increase in ancillary service bookings",
                  "45% higher guest engagement",
                  "32% improvement in repeat booking rates",
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
                Ready to transform your travel business?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join hundreds of travel businesses already using Zenocon to enhance customer experience
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
