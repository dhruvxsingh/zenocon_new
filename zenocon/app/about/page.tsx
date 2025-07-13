import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Animated } from "@/components/animated"
import { MeshBlob } from "@/components/mesh-blob"
import { PageWrapper } from "@/components/layout/page-wrapper"

export default function AboutPage() {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Zenocon</h1>
              <p className="text-xl text-gray-600">
                We're on a mission to transform how businesses communicate with their customers
              </p>
            </div>
          </Animated>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-2 opacity-30"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Animated animation="fadeInLeft">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Our Story</h2>
                <p className="text-lg text-gray-600">
                  Zenocon was founded in 2025 with a simple but powerful vision: to make WhatsApp messaging accessible,
                  effective, and scalable for businesses of all sizes.
                </p>
                <p className="text-lg text-gray-600">
                  Our founders, experienced in both messaging platforms and business operations, recognized that while
                  WhatsApp had become the world's most popular messaging app, businesses lacked the tools to effectively
                  leverage it for customer communication.
                </p>
                <p className="text-lg text-gray-600">
                  Today, Zenocon powers WhatsApp messaging for over 1,000 businesses worldwide, from small local shops
                  to global enterprises, helping them build stronger relationships with their customers.
                </p>
              </div>
            </Animated>
            <Animated animation="fadeInRight">
              <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-blue-500/10 mix-blend-overlay"></div>
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Zenocon Team"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </Animated>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-3 opacity-50"></div>
        <MeshBlob variant="blue" size="lg" className="-bottom-32 -right-32" opacity={0.05} />
        <MeshBlob variant="teal" size="md" className="top-1/3 -left-32" opacity={0.05} />

        <div className="container relative z-10">
          <Animated animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-gray-600">The principles that guide everything we do</p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Customer First",
                description:
                  "We believe that our success is directly tied to the success of our customers. Everything we do is focused on helping them achieve their goals.",
              },
              {
                title: "Innovation",
                description:
                  "We're constantly pushing the boundaries of what's possible with messaging technology, always looking for new ways to solve problems.",
              },
              {
                title: "Simplicity",
                description:
                  "We believe powerful technology should be easy to use. We strive to make complex processes simple and intuitive.",
              },
              {
                title: "Transparency",
                description:
                  "We believe in being open and honest with our customers, partners, and each other. No hidden fees, no surprises.",
              },
              {
                title: "Quality",
                description:
                  "We're committed to delivering the highest quality products and services. We take pride in our work and it shows.",
              },
              {
                title: "Diversity",
                description:
                  "We believe that diverse teams build better products. We celebrate and embrace our differences.",
              },
            ].map((value, index) => (
              <Animated key={index} animation="fadeInUp" delay={index * 100}>
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-full">
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </Animated>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-2 opacity-30"></div>
        <div className="container relative z-10">
          <Animated animation="fadeInUp">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Leadership Team</h2>
              <p className="text-xl text-gray-600">Meet the people driving Zenocon forward</p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "CEO & Co-founder",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Alex has over 15 years of experience in messaging platforms and enterprise software.",
              },
              {
                name: "Sarah Chen",
                role: "CTO & Co-founder",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Sarah is a technology leader with expertise in building scalable messaging systems.",
              },
              {
                name: "Michael Rodriguez",
                role: "Chief Product Officer",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Michael leads our product strategy with a focus on creating intuitive user experiences.",
              },
              {
                name: "Priya Patel",
                role: "Chief Customer Officer",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Priya ensures our customers receive exceptional support and achieve their goals.",
              },
            ].map((member, index) => (
              <Animated key={index} animation="fadeInUp" delay={index * 100}>
                <div className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="aspect-square relative overflow-hidden">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-teal-600 mb-2">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Join us on our mission</h2>
              <p className="text-xl mb-8 text-white/90">We're always looking for talented people to join our team</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-teal-50 transition-all duration-300"
                  asChild
                >
                  <Link href="/careers">View Open Positions</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </Animated>
        </div>
      </section>
    </PageWrapper>
  )
}
