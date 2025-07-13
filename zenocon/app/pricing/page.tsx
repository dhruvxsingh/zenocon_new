"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { CheckCircle } from "lucide-react"
import { Animated } from "@/components/animated"
import { MeshBlob } from "@/components/mesh-blob"
import { PageWrapper } from "@/components/layout/page-wrapper"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  const toggleBilling = () => {
    setIsYearly(!isYearly)
  }

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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
              <p className="text-xl text-gray-600">Choose the plan that fits your business needs</p>

              <div className="flex items-center justify-center mt-8">
                <span className={`text-sm font-medium mr-2 ${!isYearly ? "text-teal-600" : "text-gray-600"}`}>
                  Monthly
                </span>
                <Switch checked={isYearly} onCheckedChange={toggleBilling} />
                <span className={`text-sm font-medium ml-2 ${isYearly ? "text-teal-600" : "text-gray-600"}`}>
                  Yearly <span className="text-teal-600">Save 20%</span>
                </span>
              </div>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: isYearly ? "Free" : "Free",
                period: "",
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
                price: isYearly ? "$39" : "$49",
                period: isYearly ? "/month, billed annually" : "/month",
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
                price: isYearly ? "$159" : "$199",
                period: isYearly ? "/month, billed annually" : "/month",
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
                  } mesh-gradient-card relative overflow-hidden h-full`}
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
                    } transition-all duration-300 transform hover:translate-y-[-2px] mt-auto`}
                  >
                    <Link href={plan.link}>{plan.cta}</Link>
                  </Button>
                </Card>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-2 opacity-30"></div>
        <div className="container relative z-10">
          <Animated animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Compare Plans</h2>
              <p className="text-xl text-gray-600">Find the perfect plan for your business needs</p>
            </div>
          </Animated>

          <Animated animation="fadeIn" delay={200}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-4 px-6 text-left font-medium text-gray-500">Features</th>
                    <th className="py-4 px-6 text-center font-medium text-gray-500">Starter</th>
                    <th className="py-4 px-6 text-center font-medium text-gray-500">Professional</th>
                    <th className="py-4 px-6 text-center font-medium text-gray-500">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Monthly messages", starter: "500", professional: "5,000", enterprise: "Unlimited" },
                    { feature: "Campaign templates", starter: "Basic", professional: "Advanced", enterprise: "Custom" },
                    { feature: "Automation flows", starter: "Simple", professional: "Complex", enterprise: "Advanced" },
                    { feature: "Team members", starter: "1", professional: "5", enterprise: "Unlimited" },
                    { feature: "Analytics", starter: "Basic", professional: "Advanced", enterprise: "Custom" },
                    { feature: "Support", starter: "Standard", professional: "Priority", enterprise: "Dedicated" },
                    { feature: "API access", starter: "❌", professional: "✅", enterprise: "✅" },
                    { feature: "Custom integrations", starter: "❌", professional: "✅", enterprise: "✅" },
                    { feature: "Dedicated account manager", starter: "❌", professional: "❌", enterprise: "✅" },
                    { feature: "Custom branding", starter: "❌", professional: "✅", enterprise: "✅" },
                    { feature: "Multi-language support", starter: "❌", professional: "✅", enterprise: "✅" },
                    { feature: "Advanced security", starter: "❌", professional: "✅", enterprise: "✅" },
                  ].map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6 text-left font-medium">{row.feature}</td>
                      <td className="py-4 px-6 text-center">{row.starter}</td>
                      <td className="py-4 px-6 text-center">{row.professional}</td>
                      <td className="py-4 px-6 text-center">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Animated>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-3 opacity-50"></div>
        <MeshBlob variant="blue" size="lg" className="-bottom-32 -right-32" opacity={0.05} />
        <MeshBlob variant="teal" size="md" className="top-1/3 -left-32" opacity={0.05} />

        <div className="container relative z-10">
          <Animated animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Find answers to common questions about our pricing and plans</p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "Can I switch plans at any time?",
                answer:
                  "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
              },
              {
                question: "What happens if I exceed my message limit?",
                answer:
                  "If you exceed your monthly message limit, you'll be charged a small fee per additional message. We'll notify you when you're approaching your limit.",
              },
              {
                question: "Do you offer a free trial?",
                answer: "Yes, we offer a 14-day free trial on all paid plans. No credit card required to start.",
              },
              {
                question: "Can I cancel my subscription anytime?",
                answer:
                  "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.",
              },
              {
                question: "Do you offer discounts for nonprofits?",
                answer:
                  "Yes, we offer special pricing for nonprofit organizations. Please contact our sales team for more information.",
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
              },
            ].map((faq, index) => (
              <Animated key={index} animation="fadeInUp" delay={index * 100}>
                <Card className="p-6 hover:shadow-md transition-all duration-300 border border-gray-100 bg-white/80 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Still have questions?</h2>
              <p className="text-xl mb-8 text-white/90">
                Our team is here to help you find the perfect plan for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-teal-50 transition-all duration-300"
                  asChild
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
              </div>
            </div>
          </Animated>
        </div>
      </section>
    </PageWrapper>
  )
}
