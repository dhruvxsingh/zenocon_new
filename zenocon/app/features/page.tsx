import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageSquare, Zap, BarChart3, Gift, Users, Globe, Lock, Headphones } from "lucide-react"
import { Animated } from "@/components/animated"
import { MeshBlob } from "@/components/mesh-blob"
import { PageWrapper } from "@/components/layout/page-wrapper"

export default function FeaturesPage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 mesh-gradient-1"></div>
        <MeshBlob variant="teal" size="lg" className="-top-32 -left-32" opacity={0.05} />
        <MeshBlob variant="blue" size="lg" className="top-1/2 -right-32" opacity={0.05} />

        <div className="container relative z-10">
          <Animated animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h1>
              <p className="text-xl text-gray-600">
                Everything you need to create exceptional WhatsApp experiences for your customers
              </p>
            </div>
          </Animated>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-2 opacity-30"></div>
        <div className="container relative z-10">
          {[
            {
              title: "Campaign Automation",
              description: "Create and schedule personalized WhatsApp campaigns that drive engagement and conversions.",
              icon: <MessageSquare className="h-10 w-10 text-teal-500" />,
              image: "/placeholder.svg?height=600&width=800",
              features: [
                "Segment your audience for targeted messaging",
                "Schedule campaigns in advance",
                "Personalize messages with customer data",
                "Track delivery, open rates, and responses",
                "A/B test different message variations",
              ],
              reverse: false,
            },
            {
              title: "No-Code Flow Builder",
              description: "Design complex conversation flows without writing a single line of code.",
              icon: <Zap className="h-10 w-10 text-teal-500" />,
              image: "/placeholder.svg?height=600&width=800",
              features: [
                "Drag-and-drop interface for building flows",
                "Conditional logic based on user responses",
                "Integrate with your CRM and other tools",
                "Save and reuse flow templates",
                "Test flows before deploying",
              ],
              reverse: true,
            },
            {
              title: "Live Analytics",
              description: "Get real-time insights into your WhatsApp messaging performance.",
              icon: <BarChart3 className="h-10 w-10 text-teal-500" />,
              image: "/placeholder.svg?height=600&width=800",
              features: [
                "Real-time dashboard with key metrics",
                "Conversion tracking and attribution",
                "Customer engagement analytics",
                "Campaign performance comparison",
                "Custom reports and exports",
              ],
              reverse: false,
            },
            {
              title: "Referral & Loyalty Tools",
              description: "Build customer loyalty and drive referrals through WhatsApp.",
              icon: <Gift className="h-10 w-10 text-teal-500" />,
              image: "/placeholder.svg?height=600&width=800",
              features: [
                "Create referral programs with unique codes",
                "Design loyalty point systems",
                "Automate reward distribution",
                "Track program performance",
                "Integrate with e-commerce platforms",
              ],
              reverse: true,
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index !== 0 ? "mt-32" : ""}`}
            >
              <Animated animation="fadeInLeft" className={feature.reverse ? "order-2" : ""}>
                <div className="space-y-6">
                  <div className="p-3 bg-teal-50 rounded-lg w-fit">{feature.icon}</div>
                  <h2 className="text-3xl font-bold">{feature.title}</h2>
                  <p className="text-xl text-gray-600">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                          <svg className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="bg-teal-500 hover:bg-teal-600 mt-4" asChild>
                    <Link href="/signup">Try It Free</Link>
                  </Button>
                </div>
              </Animated>
              <Animated animation="fadeInRight" className={feature.reverse ? "order-1" : ""}>
                <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-blue-500/10 mix-blend-overlay"></div>
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </Animated>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-3 opacity-50"></div>
        <MeshBlob variant="blue" size="lg" className="-bottom-32 -right-32" opacity={0.05} />
        <MeshBlob variant="teal" size="md" className="top-1/3 -left-32" opacity={0.05} />

        <div className="container relative z-10">
          <Animated animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">More Powerful Features</h2>
              <p className="text-xl text-gray-600">
                Discover all the tools you need to create exceptional customer experiences
              </p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8 text-teal-500" />,
                title: "Team Collaboration",
                description: "Work together with your team to manage conversations and campaigns.",
              },
              {
                icon: <Globe className="h-8 w-8 text-teal-500" />,
                title: "Multi-language Support",
                description: "Communicate with customers in their preferred language with automatic translation.",
              },
              {
                icon: <Lock className="h-8 w-8 text-teal-500" />,
                title: "Enterprise Security",
                description: "Keep your data safe with enterprise-grade security and compliance features.",
              },
              {
                icon: <Headphones className="h-8 w-8 text-teal-500" />,
                title: "24/7 Support",
                description: "Get help whenever you need it with our dedicated support team.",
              },
            ].map((feature, index) => (
              <Animated key={index} animation="fadeInUp" delay={index * 100}>
                <Card className="p-6 hover:shadow-md transition-all duration-300 border border-gray-100 bg-white/80 backdrop-blur-sm mesh-gradient-card group h-full">
                  <div className="mb-4 p-3 bg-teal-50 rounded-lg w-fit group-hover:bg-teal-100 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
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
                Ready to transform your WhatsApp messaging?
              </h2>
              <p className="text-xl mb-8 text-white/90">Start your free trial today. No credit card required.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-teal-50 transition-all duration-300"
                  asChild
                >
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </Animated>
        </div>
      </section>
    </PageWrapper>
  )
}
