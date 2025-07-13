import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Zap, BarChart3, Heart, Calendar, CheckCircle, Pill } from "lucide-react"
import { Animated } from "@/components/animated"
import { MeshBlob } from "@/components/mesh-blob"

export default function HealthcarePage() {
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
                <span className="text-4xl">🏥</span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">WhatsApp Solutions for Healthcare</h1>
                <p className="text-xl text-gray-600">
                  Improve patient care with appointment reminders, medication alerts, and health tips
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
                    alt="Healthcare WhatsApp Solution"
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
                How Zenocon helps healthcare providers improve patient care and operational efficiency
              </p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="h-8 w-8 text-teal-500" />,
                title: "Appointment Reminders",
                description: "Reduce no-shows with automated appointment reminders and confirmations",
              },
              {
                icon: <Pill className="h-8 w-8 text-teal-500" />,
                title: "Medication Alerts",
                description: "Help patients adhere to medication schedules with timely reminders",
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-teal-500" />,
                title: "Patient Education",
                description: "Share health tips, post-care instructions, and educational content",
              },
              {
                icon: <Heart className="h-8 w-8 text-teal-500" />,
                title: "Health Monitoring",
                description: "Collect patient-reported outcomes and health data through simple forms",
              },
              {
                icon: <Zap className="h-8 w-8 text-teal-500" />,
                title: "Quick Consultations",
                description: "Enable preliminary consultations and triage through WhatsApp",
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-teal-500" />,
                title: "Patient Engagement",
                description: "Track patient engagement and identify opportunities for improved care",
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
                Explore how healthcare providers use Zenocon to enhance patient care and engagement
              </p>
            </div>
          </Animated>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="appointments" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="appointments">Appointment Management</TabsTrigger>
                <TabsTrigger value="medication">Medication Adherence</TabsTrigger>
                <TabsTrigger value="education">Patient Education</TabsTrigger>
              </TabsList>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <TabsContent value="appointments" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Streamlined Appointment Management</h3>
                    <p className="text-gray-600 mb-4">
                      Reduce no-shows and improve patient experience with automated appointment communications.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Send appointment confirmations with all relevant details",
                        "Provide automated reminders 24 hours before appointments",
                        "Allow patients to confirm, reschedule, or cancel via WhatsApp",
                        "Send pre-appointment instructions and preparation guidelines",
                        "Follow up after appointments with care instructions",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="medication" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Improved Medication Adherence</h3>
                    <p className="text-gray-600 mb-4">
                      Help patients stay on track with their medication schedules through timely reminders.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Send personalized medication reminders at scheduled times",
                        "Track medication adherence through patient responses",
                        "Provide information about medication side effects and interactions",
                        "Alert caregivers when medications are missed",
                        "Send refill reminders when prescriptions are running low",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="education" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Effective Patient Education</h3>
                    <p className="text-gray-600 mb-4">
                      Deliver personalized health information and educational content to improve health outcomes.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Share condition-specific educational materials",
                        "Send post-procedure care instructions and reminders",
                        "Provide preventive health tips and seasonal advice",
                        "Deliver personalized health recommendations",
                        "Answer common health questions with automated responses",
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
                  <TabsContent value="appointments" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Appointment Management Interface"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="medication" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Medication Adherence Interface"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="education" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Patient Education Interface"
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
              <p className="text-xl text-gray-600">See how healthcare providers are transforming with Zenocon</p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "City Medical Center",
                type: "Multi-specialty Hospital",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Our appointment no-show rate decreased by 62% after implementing Zenocon's automated reminder system.",
                results: [
                  "62% reduction in appointment no-shows",
                  "47% improvement in patient preparation compliance",
                  "38% increase in patient satisfaction scores",
                ],
              },
              {
                name: "Wellness Clinic",
                type: "Primary Care Practice",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Medication adherence among our chronic disease patients improved significantly with Zenocon's reminder system.",
                results: [
                  "53% increase in medication adherence",
                  "41% reduction in preventable complications",
                  "4.8/5 patient communication rating",
                ],
              },
              {
                name: "HealthFirst Network",
                type: "Healthcare Provider Group",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Zenocon has transformed how we educate and engage with patients, leading to better health outcomes.",
                results: [
                  "58% improvement in patient knowledge scores",
                  "45% increase in preventive care compliance",
                  "32% reduction in readmission rates",
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
                Ready to transform your healthcare practice?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join hundreds of healthcare providers already using Zenocon to improve patient care
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
