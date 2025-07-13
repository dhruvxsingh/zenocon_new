import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Zap, BarChart3, Building, CreditCard, CheckCircle, Lock } from "lucide-react"
import { Animated } from "@/components/animated"
import { MeshBlob } from "@/components/mesh-blob"

export default function FinancePage() {
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
                <span className="text-4xl">🏦</span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">WhatsApp Solutions for Finance</h1>
                <p className="text-xl text-gray-600">
                  Enhance customer service with secure transaction alerts, account updates, and financial advice
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
                    alt="Finance WhatsApp Solution"
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
                How Zenocon helps financial institutions enhance customer service and security
              </p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CreditCard className="h-8 w-8 text-teal-500" />,
                title: "Transaction Alerts",
                description: "Send real-time notifications for account transactions and activities",
              },
              {
                icon: <Lock className="h-8 w-8 text-teal-500" />,
                title: "Secure Authentication",
                description: "Enable two-factor authentication and secure identity verification",
              },
              {
                icon: <Building className="h-8 w-8 text-teal-500" />,
                title: "Account Updates",
                description: "Keep customers informed about account status, balances, and statements",
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-teal-500" />,
                title: "Financial Advice",
                description: "Provide personalized financial tips and product recommendations",
              },
              {
                icon: <Zap className="h-8 w-8 text-teal-500" />,
                title: "Quick Service Requests",
                description: "Process common service requests through WhatsApp without branch visits",
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-teal-500" />,
                title: "Customer Insights",
                description: "Gain valuable insights into customer needs and behavior patterns",
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
                Explore how financial institutions use Zenocon to enhance customer service and security
              </p>
            </div>
          </Animated>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="alerts" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="alerts">Transaction Alerts</TabsTrigger>
                <TabsTrigger value="services">Service Requests</TabsTrigger>
                <TabsTrigger value="advice">Financial Advice</TabsTrigger>
              </TabsList>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <TabsContent value="alerts" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Real-time Transaction Alerts</h3>
                    <p className="text-gray-600 mb-4">
                      Keep customers informed about their account activity with instant notifications.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Send instant alerts for debit and credit card transactions",
                        "Notify customers about account deposits and withdrawals",
                        "Alert customers to suspicious activity and potential fraud",
                        "Provide balance updates after significant transactions",
                        "Send payment due reminders and confirmation of payments",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="services" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Streamlined Service Requests</h3>
                    <p className="text-gray-600 mb-4">
                      Process common banking requests through WhatsApp without requiring branch visits.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Enable check book and card requests through WhatsApp",
                        "Process address and contact information updates",
                        "Allow customers to temporarily block/unblock cards",
                        "Facilitate fund transfers between accounts",
                        "Process standing instruction setup and modifications",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="advice" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Personalized Financial Advice</h3>
                    <p className="text-gray-600 mb-4">
                      Provide tailored financial guidance and product recommendations to customers.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Share personalized investment opportunities",
                        "Provide spending insights and budgeting tips",
                        "Offer tailored loan and credit card recommendations",
                        "Send market updates relevant to customer portfolios",
                        "Provide tax-saving advice based on customer profiles",
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
                  <TabsContent value="alerts" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Transaction Alerts Interface"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="services" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Service Requests Interface"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="advice" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Financial Advice Interface"
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
              <p className="text-xl text-gray-600">See how financial institutions are transforming with Zenocon</p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Global Bank",
                type: "Retail Banking",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Our customer service call volume decreased by 42% after implementing Zenocon's WhatsApp banking services.",
                results: [
                  "42% reduction in customer service calls",
                  "68% increase in digital service adoption",
                  "37% improvement in customer satisfaction scores",
                ],
              },
              {
                name: "Wealth Advisors",
                type: "Investment Management Firm",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Zenocon has transformed how we communicate investment opportunities and market updates to our clients.",
                results: [
                  "53% increase in client engagement with market updates",
                  "41% higher response rate to investment opportunities",
                  "4.8/5 client communication rating",
                ],
              },
              {
                name: "Credit Union Plus",
                type: "Community Credit Union",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Our members love receiving transaction alerts and account updates through WhatsApp. It's made banking more accessible.",
                results: [
                  "62% reduction in fraud-related losses",
                  "45% increase in mobile banking adoption",
                  "38% improvement in member retention",
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
                Ready to transform your financial institution?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join hundreds of financial institutions already using Zenocon to enhance customer service
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
