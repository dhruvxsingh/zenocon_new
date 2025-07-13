import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Zap, BarChart3, TruckIcon, MapPin, CheckCircle, Clock } from "lucide-react"
import { Animated } from "@/components/animated"
import { MeshBlob } from "@/components/mesh-blob"

export default function LogisticsPage() {
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
                <span className="text-4xl">🚚</span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">WhatsApp Solutions for Logistics</h1>
                <p className="text-xl text-gray-600">
                  Optimize delivery operations and keep customers informed with real-time tracking and updates
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
                    alt="Logistics WhatsApp Solution"
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
                How Zenocon helps logistics companies streamline operations and enhance customer experience
              </p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <TruckIcon className="h-8 w-8 text-teal-500" />,
                title: "Real-time Tracking",
                description: "Provide customers with live tracking updates directly through WhatsApp",
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-teal-500" />,
                title: "Delivery Notifications",
                description: "Automate delivery status updates from dispatch to final delivery",
              },
              {
                icon: <MapPin className="h-8 w-8 text-teal-500" />,
                title: "Address Confirmation",
                description: "Verify delivery addresses and get customer confirmation before dispatch",
              },
              {
                icon: <Clock className="h-8 w-8 text-teal-500" />,
                title: "Delivery Scheduling",
                description: "Allow customers to select or reschedule preferred delivery times",
              },
              {
                icon: <Zap className="h-8 w-8 text-teal-500" />,
                title: "Driver Communication",
                description: "Enable secure communication between customers and delivery personnel",
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-teal-500" />,
                title: "Performance Analytics",
                description: "Track delivery metrics and customer satisfaction in real-time",
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
                Explore how logistics companies use Zenocon to optimize operations and enhance customer experience
              </p>
            </div>
          </Animated>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="tracking" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="tracking">Shipment Tracking</TabsTrigger>
                <TabsTrigger value="scheduling">Delivery Scheduling</TabsTrigger>
                <TabsTrigger value="communication">Customer Communication</TabsTrigger>
              </TabsList>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <TabsContent value="tracking" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Real-time Shipment Tracking</h3>
                    <p className="text-gray-600 mb-4">
                      Keep customers informed about their shipments with automated, real-time tracking updates.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Send automated shipment confirmation with tracking details",
                        "Provide real-time location updates with interactive maps",
                        "Notify customers of delivery status changes",
                        "Send estimated time of arrival updates",
                        "Confirm successful deliveries with proof of delivery",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="scheduling" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Flexible Delivery Scheduling</h3>
                    <p className="text-gray-600 mb-4">
                      Allow customers to schedule and reschedule deliveries at their convenience.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Send delivery time slot options via WhatsApp",
                        "Allow customers to select preferred delivery times",
                        "Enable easy rescheduling through simple responses",
                        "Send reminders before scheduled deliveries",
                        "Confirm schedule changes automatically",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="communication" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Seamless Customer Communication</h3>
                    <p className="text-gray-600 mb-4">
                      Enable direct, secure communication between customers and delivery personnel.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Connect customers with drivers for last-mile coordination",
                        "Provide delivery instructions through WhatsApp",
                        "Enable contactless delivery confirmation",
                        "Collect instant feedback after delivery",
                        "Resolve delivery issues in real-time",
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
                  <TabsContent value="tracking" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Shipment Tracking Interface"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="scheduling" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Delivery Scheduling Interface"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="communication" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Customer Communication Interface"
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
              <p className="text-xl text-gray-600">See how logistics companies are transforming with Zenocon</p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "FastTrack Logistics",
                type: "Last-mile Delivery Service",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Our delivery success rate improved by 28% after implementing Zenocon's WhatsApp tracking and communication system.",
                results: [
                  "28% improvement in delivery success rate",
                  "64% reduction in customer service calls",
                  "42% increase in customer satisfaction",
                ],
              },
              {
                name: "Global Shipping Co.",
                type: "International Freight Company",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Zenocon has revolutionized how we communicate with customers about international shipments, providing transparency at every step.",
                results: [
                  "53% increase in tracking engagement",
                  "37% fewer delivery exceptions",
                  "4.8/5 customer satisfaction rating",
                ],
              },
              {
                name: "Urban Express",
                type: "Same-day Courier Service",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "The ability to reschedule deliveries through WhatsApp has dramatically reduced our failed delivery attempts.",
                results: [
                  "68% reduction in failed delivery attempts",
                  "41% improvement in driver efficiency",
                  "32% increase in repeat business",
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
                Ready to transform your logistics operations?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join hundreds of logistics companies already using Zenocon to optimize deliveries
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
