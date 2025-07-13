import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Zap, BarChart3, ShoppingCart, TruckIcon, CheckCircle } from "lucide-react"
import { Animated } from "@/components/animated"
import { MeshBlob } from "@/components/mesh-blob"

export default function EcommercePage() {
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
                <span className="text-4xl">🛍️</span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">WhatsApp Solutions for E-commerce</h1>
                <p className="text-xl text-gray-600">
                  Boost sales and improve customer satisfaction with automated order updates and personalized marketing
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
                    alt="E-commerce WhatsApp Solution"
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
                How Zenocon helps e-commerce businesses enhance customer experience and boost sales
              </p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <ShoppingCart className="h-8 w-8 text-teal-500" />,
                title: "Order Confirmations",
                description: "Send instant order confirmations with all relevant details directly to customers",
              },
              {
                icon: <TruckIcon className="h-8 w-8 text-teal-500" />,
                title: "Shipping Updates",
                description: "Keep customers informed with real-time shipping and delivery updates",
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-teal-500" />,
                title: "Abandoned Cart Recovery",
                description: "Automatically remind customers about items left in their shopping cart",
              },
              {
                icon: <Zap className="h-8 w-8 text-teal-500" />,
                title: "Personalized Recommendations",
                description: "Send product recommendations based on browsing and purchase history",
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-teal-500" />,
                title: "Post-Purchase Engagement",
                description: "Follow up with customers to gather feedback and encourage reviews",
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-teal-500" />,
                title: "Instant Customer Support",
                description: "Provide quick responses to customer inquiries about products and orders",
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
                Explore how e-commerce businesses use Zenocon to enhance customer experience
              </p>
            </div>
          </Animated>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="orders">Order Management</TabsTrigger>
                <TabsTrigger value="marketing">Personalized Marketing</TabsTrigger>
                <TabsTrigger value="support">Customer Support</TabsTrigger>
              </TabsList>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <TabsContent value="orders" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Streamlined Order Management</h3>
                    <p className="text-gray-600 mb-4">
                      Keep customers informed throughout their purchase journey with automated updates.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Send instant order confirmations with details and tracking links",
                        "Provide real-time shipping and delivery updates",
                        "Notify customers about order status changes",
                        "Send delivery confirmation with product care instructions",
                        "Follow up for reviews and feedback after delivery",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="marketing" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Personalized Marketing</h3>
                    <p className="text-gray-600 mb-4">
                      Drive sales with targeted promotions and personalized product recommendations.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Recover abandoned carts with timely reminders",
                        "Send personalized product recommendations",
                        "Notify customers about price drops on wishlist items",
                        "Create targeted promotional campaigns",
                        "Run limited-time flash sales with countdown timers",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="support" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Responsive Customer Support</h3>
                    <p className="text-gray-600 mb-4">
                      Provide quick and helpful responses to customer inquiries to build trust and loyalty.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Answer product questions with rich media and links",
                        "Assist with order modifications and cancellations",
                        "Help with returns and exchanges through guided processes",
                        "Provide instant order status updates on request",
                        "Escalate complex issues to human agents seamlessly",
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
                  <TabsContent value="orders" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Order Management Interface"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="marketing" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Personalized Marketing Interface"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="support" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Customer Support Interface"
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
              <p className="text-xl text-gray-600">See how e-commerce businesses are transforming with Zenocon</p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "StyleHub",
                type: "Fashion Retailer",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Our abandoned cart recovery rate increased by 47% after implementing Zenocon's WhatsApp notifications.",
                results: [
                  "47% increase in cart recovery",
                  "32% higher customer satisfaction",
                  "28% increase in repeat purchases",
                ],
              },
              {
                name: "GadgetWorld",
                type: "Electronics Store",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Customers love our real-time shipping updates. Our support inquiries have decreased while our NPS score has increased.",
                results: [
                  "68% reduction in 'where's my order' inquiries",
                  "24% increase in NPS score",
                  "4.9/5 delivery experience rating",
                ],
              },
              {
                name: "HomeEssentials",
                type: "Home Goods Retailer",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Personalized product recommendations through WhatsApp have significantly increased our average order value.",
                results: [
                  "35% increase in average order value",
                  "42% higher click-through rate than email",
                  "3.2x ROI on marketing campaigns",
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
                Ready to transform your e-commerce business?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join hundreds of online retailers already using Zenocon to boost sales and customer satisfaction
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
