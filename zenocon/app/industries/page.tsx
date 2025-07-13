import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Animated } from "@/components/animated"
import { MeshBlob } from "@/components/mesh-blob"

export default function IndustriesPage() {
  const industries = [
    {
      icon: "🍔",
      title: "Food & Beverage",
      description: "Enhance customer experience and streamline operations for restaurants and food delivery services.",
      slug: "food-beverage",
    },
    {
      icon: "🛍️",
      title: "E-commerce",
      description:
        "Boost sales and improve customer satisfaction with automated order updates and personalized marketing.",
      slug: "ecommerce",
    },
    {
      icon: "🚚",
      title: "Logistics",
      description: "Optimize delivery operations and keep customers informed with real-time tracking and updates.",
      slug: "logistics",
    },
    {
      icon: "🎓",
      title: "Education",
      description:
        "Enhance learning experiences with automated reminders, personalized content, and easy communication.",
      slug: "education",
    },
    {
      icon: "💼",
      title: "Professional Services",
      description: "Streamline client communication and appointment scheduling for consulting and service businesses.",
      slug: "professional-services",
    },
    {
      icon: "🏥",
      title: "Healthcare",
      description: "Improve patient care with appointment reminders, medication alerts, and health tips.",
      slug: "healthcare",
    },
    {
      icon: "🏦",
      title: "Finance",
      description: "Enhance customer service with secure transaction alerts, account updates, and financial advice.",
      slug: "finance",
    },
    {
      icon: "✈️",
      title: "Travel",
      description:
        "Elevate travel experiences with booking confirmations, itinerary updates, and local recommendations.",
      slug: "travel",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 mesh-gradient-1"></div>
        <MeshBlob variant="teal" size="lg" className="-top-32 -left-32" opacity={0.05} />
        <MeshBlob variant="blue" size="lg" className="top-1/2 -right-32" opacity={0.05} />

        <div className="container relative z-10">
          <Animated animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Industry Solutions</h1>
              <p className="text-xl text-gray-600">
                Discover how Zenocon helps businesses across different industries transform their customer communication
              </p>
            </div>
          </Animated>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-2 opacity-30"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <Animated key={industry.slug} animation="fadeInUp" delay={index * 100}>
                <Link href={`/industries/${industry.slug}`} className="block h-full">
                  <Card className="p-6 hover:shadow-md transition-all duration-300 border border-gray-100 bg-white/80 backdrop-blur-sm mesh-gradient-card group h-full">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {industry.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{industry.title}</h3>
                    <p className="text-gray-600 mb-4">{industry.description}</p>
                    <Button variant="link" className="p-0 text-teal-500 hover:text-teal-600">
                      Learn more →
                    </Button>
                  </Card>
                </Link>
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
                Not sure which solution is right for you?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Our team can help you find the perfect solution for your business needs.
              </p>
              <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50 transition-all duration-300" asChild>
                <Link href="/contact">Talk to an Expert</Link>
              </Button>
            </div>
          </Animated>
        </div>
      </section>
    </>
  )
}
