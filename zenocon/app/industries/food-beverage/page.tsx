import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Zap, BarChart3, Star, CheckCircle } from "lucide-react"
import { Animated } from "@/components/animated"
import { MeshBlob } from "@/components/mesh-blob"

export default function FoodBeveragePage() {
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
                <span className="text-4xl">🍔</span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  WhatsApp Solutions for Food & Beverage
                </h1>
                <p className="text-xl text-gray-600">
                  Enhance customer experience and streamline operations for restaurants and food delivery services
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
                    alt="Food & Beverage WhatsApp Solution"
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
                How Zenocon helps food & beverage businesses enhance customer experience
              </p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="h-8 w-8 text-teal-500" />,
                title: "Automated Order Updates",
                description: "Keep customers informed about their order status from confirmation to delivery",
              },
              {
                icon: <Zap className="h-8 w-8 text-teal-500" />,
                title: "Menu & Promotions",
                description: "Share digital menus and special promotions directly through WhatsApp",
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-teal-500" />,
                title: "Reservation Management",
                description: "Streamline table bookings with automated confirmations and reminders",
              },
              {
                icon: <Star className="h-8 w-8 text-teal-500" />,
                title: "Loyalty Programs",
                description: "Reward repeat customers with personalized offers and points tracking",
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-teal-500" />,
                title: "Feedback Collection",
                description: "Gather customer feedback and reviews to improve service quality",
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-teal-500" />,
                title: "Personalized Recommendations",
                description: "Suggest menu items based on previous orders and preferences",
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
                Explore how food & beverage businesses use Zenocon to enhance customer experience
              </p>
            </div>
          </Animated>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="ordering" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="ordering">Online Ordering</TabsTrigger>
                <TabsTrigger value="loyalty">Loyalty Programs</TabsTrigger>
                <TabsTrigger value="feedback">Customer Feedback</TabsTrigger>
              </TabsList>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <TabsContent value="ordering" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Streamlined Online Ordering</h3>
                    <p className="text-gray-600 mb-4">
                      Enable customers to place orders directly through WhatsApp with an intuitive, conversational
                      interface.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Send digital menus with images and descriptions",
                        "Process orders with automated confirmation",
                        "Provide real-time delivery tracking",
                        "Send order status updates automatically",
                        "Allow for easy reordering of favorite items",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="loyalty" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Engaging Loyalty Programs</h3>
                    <p className="text-gray-600 mb-4">
                      Build customer loyalty with personalized rewards and incentives delivered through WhatsApp.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Track customer points and rewards automatically",
                        "Send personalized offers based on order history",
                        "Notify customers when they're eligible for rewards",
                        "Enable referral programs with unique codes",
                        "Celebrate customer milestones with special offers",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="feedback" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Actionable Customer Feedback</h3>
                    <p className="text-gray-600 mb-4">
                      Gather valuable insights from customers to improve your offerings and service quality.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Send automated post-order feedback requests",
                        "Create simple rating systems for quick responses",
                        "Collect detailed feedback with custom forms",
                        "Respond to negative feedback promptly",
                        "Analyze feedback trends with built-in analytics",
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
                  <TabsContent value="ordering" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Online Ordering Interface"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="loyalty" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Loyalty Program Interface"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="feedback" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Customer Feedback Interface"
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
              <p className="text-xl text-gray-600">See how food & beverage businesses are transforming with Zenocon</p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Fresh Bites",
                type: "Fast Casual Restaurant Chain",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Since implementing Zenocon, we've seen a 35% increase in repeat orders and our customer satisfaction scores have improved by 28%.",
                results: [
                  "35% increase in repeat orders",
                  "28% improvement in satisfaction",
                  "42% reduction in no-shows",
                ],
              },
              {
                name: "Pizza Express",
                type: "Delivery-Focused Pizzeria",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Our delivery tracking updates through WhatsApp have dramatically reduced customer service calls and improved our efficiency.",
                results: [
                  "65% reduction in 'where's my order' calls",
                  "22% increase in delivery efficiency",
                  "4.8/5 customer rating",
                ],
              },
              {
                name: "Café Delight",
                type: "Coffee Shop Chain",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Our loyalty program through Zenocon has transformed how we engage with customers. It's simple to manage and customers love it.",
                results: [
                  "40% increase in loyalty program participation",
                  "3x higher redemption rate",
                  "27% increase in average order value",
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
                Ready to transform your food & beverage business?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join hundreds of restaurants and food delivery services already using Zenocon
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
