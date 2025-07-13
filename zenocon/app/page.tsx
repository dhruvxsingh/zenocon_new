import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Zap, BarChart3, Gift, Star, Play, CheckCircle } from "lucide-react"
import { Animated } from "@/components/animated"
import { MeshBlob } from "@/components/mesh-blob"
import { PageWrapper } from "@/components/layout/page-wrapper"

export default function Home() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 mesh-gradient-1"></div>
        <MeshBlob variant="teal" size="lg" className="-top-32 -left-32" opacity={0.05} />
        <MeshBlob variant="blue" size="lg" className="top-1/2 -right-32" opacity={0.05} />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 max-w-xl">
              <Animated animation="fadeInUp">
                <Badge className="w-fit bg-teal-100 text-teal-700 hover:bg-teal-200 border-none">
                  Next-Gen Messaging Platform
                </Badge>
              </Animated>
              <Animated animation="fadeInUp" delay={100}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Power Smarter Customer Conversations
                </h1>
              </Animated>
              <Animated animation="fadeInUp" delay={200}>
                <p className="text-xl text-gray-600">
                  Automate campaigns, manage support, and grow loyalty – all through WhatsApp
                </p>
              </Animated>
              <Animated animation="fadeInUp" delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button size="lg" className="bg-teal-500 hover:bg-teal-600" asChild>
                    <Link href="/signup">Get Started Free</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2" asChild>
                    <Link href="/demo">
                      <Play className="h-4 w-4" /> Watch Demo
                    </Link>
                  </Button>
                </div>
              </Animated>
            </div>
            <Animated animation="fadeIn" delay={400}>
              <div className="relative">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-blue-500/10 mix-blend-overlay"></div>
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Zenocon Dashboard"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
                {/* Animated chat bubbles */}
                <div className="absolute -top-6 -left-6 animate-float">
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <MessageSquare className="h-6 w-6 text-teal-500" />
                  </div>
                </div>
                <div className="absolute top-1/4 -right-4 animate-float" style={{ animationDelay: "1s" }}>
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <Zap className="h-6 w-6 text-teal-500" />
                  </div>
                </div>
                <div className="absolute bottom-10 left-10 animate-float" style={{ animationDelay: "1.5s" }}>
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <BarChart3 className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </div>
            </Animated>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-2 opacity-50"></div>
        <div className="container relative z-10">
          <Animated animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features, Simple Interface</h2>
              <p className="text-xl text-gray-600">Everything you need to manage customer conversations at scale</p>
            </div>
          </Animated>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <MessageSquare className="h-8 w-8 text-teal-500" />,
                title: "Campaign Automation",
                description: "Schedule and send personalized messages to segmented customer groups",
                link: "/features/campaign-automation",
              },
              {
                icon: <Zap className="h-8 w-8 text-teal-500" />,
                title: "No-Code Flow Builder",
                description: "Create complex conversation flows without writing a single line of code",
                link: "/features/flow-builder",
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-teal-500" />,
                title: "Live Analytics",
                description: "Track engagement, conversion rates, and customer satisfaction in real-time",
                link: "/features/analytics",
              },
              {
                icon: <Gift className="h-8 w-8 text-teal-500" />,
                title: "Referral & Loyalty Tools",
                description: "Reward customers for referrals and repeat business through WhatsApp",
                link: "/features/loyalty",
              },
            ].map((feature, index) => (
              <Animated key={index} animation="fadeInUp" delay={index * 100}>
                <Link href={feature.link}>
                  <Card className="p-6 hover:shadow-md transition-all duration-300 border border-gray-100 mesh-gradient-card group h-full">
                    <div className="mb-4 p-3 bg-teal-50 rounded-lg w-fit group-hover:bg-teal-100 transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </Card>
                </Link>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-3 opacity-70"></div>
        <MeshBlob variant="blue" size="lg" className="-bottom-32 -right-32" opacity={0.05} />
        <MeshBlob variant="teal" size="md" className="top-1/3 -left-32" opacity={0.05} />

        <div className="container relative z-10">
          <Animated animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect For Every Industry</h2>
              <p className="text-xl text-gray-600 mb-6">
                See how businesses like yours are transforming customer communication
              </p>
              <Button variant="outline" className="mx-auto mt-4" asChild>
                <Link href="/industries">View All Industries</Link>
              </Button>
            </div>
          </Animated>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🍔",
                title: "Food & Beverage",
                description: "Send menu links & order updates via WhatsApp",
                link: "/industries/food-beverage",
              },
              {
                icon: "🛍️",
                title: "E-commerce",
                description: "Automate order confirmations and shipping updates",
                link: "/industries/ecommerce",
              },
              {
                icon: "🚚",
                title: "Logistics",
                description: "Real-time delivery tracking and notifications",
                link: "/industries/logistics",
              },
              {
                icon: "🎓",
                title: "Education",
                description: "Course reminders and personalized learning paths",
                link: "/industries/education",
              },
              {
                icon: "💼",
                title: "Professional Services",
                description: "Appointment scheduling and follow-ups",
                link: "/industries/professional-services",
              },
              {
                icon: "🏥",
                title: "Healthcare",
                description: "Medication reminders and appointment confirmations",
                link: "/industries/healthcare",
              },
              {
                icon: "🏦",
                title: "Finance",
                description: "Transaction alerts and account updates",
                link: "/industries/finance",
              },
              {
                icon: "✈️",
                title: "Travel",
                description: "Booking confirmations and travel itineraries",
                link: "/industries/travel",
              },
            ].map((useCase, index) => (
              <Animated key={index} animation="fadeInUp" delay={Math.min(index * 50, 400)}>
                <Link href={useCase.link}>
                  <Card className="p-6 hover:shadow-md transition-all duration-300 border border-gray-100 bg-white/80 backdrop-blur-sm mesh-gradient-card group h-full">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {useCase.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-gray-600">{useCase.description}</p>
                  </Card>
                </Link>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-1 opacity-50"></div>
        <div className="container relative z-10">
          <Animated animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">See Zenocon in Action</h2>
              <p className="text-xl text-gray-600">Explore our intuitive interface and powerful features</p>
            </div>
          </Animated>
          <Animated animation="fadeIn" delay={200}>
            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue="campaigns" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="campaigns">Campaign Builder</TabsTrigger>
                  <TabsTrigger value="automation">Flow Automation</TabsTrigger>
                  <TabsTrigger value="analytics">Customer Analytics</TabsTrigger>
                </TabsList>
                <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 to-blue-500/5 mix-blend-overlay"></div>
                  <TabsContent value="campaigns" className="mt-0">
                    <Image
                      src="/placeholder.svg?height=600&width=1000"
                      alt="Campaign Builder Interface"
                      width={1000}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="automation" className="mt-0">
                    <Image
                      src="/placeholder.svg?height=600&width=1000"
                      alt="Flow Automation Interface"
                      width={1000}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="analytics" className="mt-0">
                    <Image
                      src="/placeholder.svg?height=600&width=1000"
                      alt="Customer Analytics Dashboard"
                      width={1000}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </Animated>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-2 opacity-50"></div>
        <MeshBlob variant="teal" size="lg" className="-top-32 -right-32" opacity={0.05} />

        <div className="container relative z-10">
          <Animated animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Businesses Worldwide</h2>
              <p className="text-xl text-gray-600">See what our customers have to say about Zenocon</p>
            </div>
          </Animated>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Marketing Director, FreshEats",
                image: "/placeholder.svg?height=100&width=100",
                quote:
                  "Zenocon has transformed how we communicate with our customers. Our order confirmations and updates now have a 98% open rate!",
                stars: 5,
              },
              {
                name: "Michael Chen",
                role: "CEO, TechGear",
                image: "/placeholder.svg?height=100&width=100",
                quote:
                  "The automation flows have saved us countless hours. We've increased customer satisfaction by 35% while reducing support costs.",
                stars: 5,
              },
              {
                name: "Priya Patel",
                role: "Operations Lead, QuickShip",
                image: "/placeholder.svg?height=100&width=100",
                quote:
                  "Our customers love getting shipping updates via WhatsApp. The platform is intuitive and the analytics help us optimize our messaging.",
                stars: 4,
              },
            ].map((testimonial, index) => (
              <Animated key={index} animation="fadeInUp" delay={index * 100}>
                <Card className="p-8 hover:shadow-md transition-all duration-300 border border-gray-100 bg-white/80 backdrop-blur-sm mesh-gradient-card">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative overflow-hidden rounded-full border-2 border-teal-100">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {Array(testimonial.stars)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </Card>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-3 opacity-30"></div>
        <MeshBlob variant="blue" size="md" className="top-1/4 -left-32" opacity={0.05} />
        <MeshBlob variant="teal" size="lg" className="bottom-0 right-0" opacity={0.05} />

        <div className="container relative z-10">
          <Animated animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600">Choose the plan that fits your business needs</p>
              <div className="flex items-center justify-center mt-8">
                <span className="text-sm font-medium mr-2">Monthly</span>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 px-0.5 transition-colors">
                  <div className="h-5 w-5 rounded-full bg-white shadow-md transform translate-x-5 transition-transform"></div>
                </div>
                <span className="text-sm font-medium ml-2">
                  Yearly <span className="text-teal-600">Save 20%</span>
                </span>
              </div>
            </div>
          </Animated>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "Free",
                description: "Perfect for small businesses just getting started",
                features: [
                  "Up to 500 messages/month",
                  "Basic campaign templates",
                  "Simple automation flows",
                  "Standard support",
                  "1 team member",
                ],
                cta: "Start Free",
                link: "/signup?plan=starter",
              },
              {
                name: "Professional",
                price: "$49",
                period: "/month",
                description: "Ideal for growing businesses with active customer bases",
                features: [
                  "Up to 5,000 messages/month",
                  "Advanced campaign builder",
                  "Complex automation flows",
                  "Priority support",
                  "5 team members",
                  "Custom integrations",
                ],
                cta: "Get Started",
                popular: true,
                link: "/signup?plan=professional",
              },
              {
                name: "Enterprise",
                price: "$199",
                period: "/month",
                description: "For businesses with high-volume messaging needs",
                features: [
                  "Unlimited messages",
                  "Custom templates",
                  "Advanced analytics",
                  "Dedicated account manager",
                  "Unlimited team members",
                  "API access",
                  "Custom integrations",
                ],
                cta: "Contact Sales",
                link: "/contact?inquiry=enterprise",
              },
            ].map((plan, index) => (
              <Animated key={index} animation="fadeInUp" delay={index * 100}>
                <Card
                  className={`p-8 hover:shadow-lg transition-all duration-300 border ${
                    plan.popular ? "border-teal-500 shadow-md" : "border-gray-100"
                  } mesh-gradient-card relative overflow-hidden`}
                >
                  {plan.popular && <Badge className="absolute top-4 right-4 bg-teal-500">Popular</Badge>}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-gray-600 ml-1">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full ${
                      plan.popular ? "bg-teal-500 hover:bg-teal-600" : "bg-gray-900 hover:bg-gray-800"
                    } transition-all duration-300 transform hover:translate-y-[-2px]`}
                  >
                    <Link href={plan.link}>{plan.cta}</Link>
                  </Button>
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
                Join 1,000+ businesses simplifying their customer messaging
              </h2>
              <p className="text-xl mb-8 text-white/90">Start building better customer relationships today</p>
              <Button
                size="lg"
                className="bg-white text-teal-600 hover:bg-teal-50 transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/signup">Start Building Now</Link>
              </Button>
            </div>
          </Animated>
        </div>
      </section>
    </PageWrapper>
  )
}
