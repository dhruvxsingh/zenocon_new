import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Zap, BarChart3, GraduationCap, Calendar, CheckCircle, BookOpen } from "lucide-react"
import { Animated } from "@/components/animated"
import { MeshBlob } from "@/components/mesh-blob"

export default function EducationPage() {
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
                <span className="text-4xl">🎓</span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">WhatsApp Solutions for Education</h1>
                <p className="text-xl text-gray-600">
                  Enhance learning experiences with automated reminders, personalized content, and easy communication
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
                    alt="Education WhatsApp Solution"
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
                How Zenocon helps educational institutions enhance student engagement and learning outcomes
              </p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="h-8 w-8 text-teal-500" />,
                title: "Class Reminders",
                description: "Send automated reminders for classes, assignments, and exams",
              },
              {
                icon: <BookOpen className="h-8 w-8 text-teal-500" />,
                title: "Learning Materials",
                description: "Distribute course materials, readings, and resources directly to students",
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-teal-500" />,
                title: "Student Support",
                description: "Provide instant answers to common questions and connect with advisors",
              },
              {
                icon: <Zap className="h-8 w-8 text-teal-500" />,
                title: "Personalized Learning",
                description: "Deliver customized content based on student progress and preferences",
              },
              {
                icon: <GraduationCap className="h-8 w-8 text-teal-500" />,
                title: "Progress Tracking",
                description: "Keep students informed about their academic progress and achievements",
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-teal-500" />,
                title: "Engagement Analytics",
                description: "Track student engagement and identify areas for improvement",
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
                Explore how educational institutions use Zenocon to enhance student engagement and learning
              </p>
            </div>
          </Animated>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="reminders" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="reminders">Course Management</TabsTrigger>
                <TabsTrigger value="materials">Learning Materials</TabsTrigger>
                <TabsTrigger value="support">Student Support</TabsTrigger>
              </TabsList>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <TabsContent value="reminders" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Streamlined Course Management</h3>
                    <p className="text-gray-600 mb-4">
                      Keep students on track with automated reminders and updates about their courses.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Send class schedule reminders with location details",
                        "Notify students about assignment deadlines",
                        "Provide exam reminders with study resources",
                        "Update students on schedule changes or cancellations",
                        "Send grade notifications and feedback",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="materials" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Accessible Learning Materials</h3>
                    <p className="text-gray-600 mb-4">
                      Distribute course materials and resources directly to students through WhatsApp.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Share lecture notes, slides, and handouts",
                        "Distribute reading materials and resources",
                        "Send video tutorials and educational content",
                        "Provide practice quizzes and exercises",
                        "Deliver personalized learning recommendations",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="support" className="mt-0">
                    <h3 className="text-2xl font-bold mb-4">Responsive Student Support</h3>
                    <p className="text-gray-600 mb-4">
                      Provide instant assistance and connect students with the resources they need.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Answer common questions with automated responses",
                        "Connect students with academic advisors",
                        "Provide technical support for learning platforms",
                        "Offer mental health resources and support",
                        "Facilitate peer-to-peer study groups",
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
                  <TabsContent value="reminders" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Course Management Interface"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="materials" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Learning Materials Interface"
                      width={600}
                      height={600}
                      className="w-full h-auto"
                    />
                  </TabsContent>
                  <TabsContent value="support" className="mt-0 p-0">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Student Support Interface"
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
              <p className="text-xl text-gray-600">See how educational institutions are transforming with Zenocon</p>
            </div>
          </Animated>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Global Academy",
                type: "Online Learning Platform",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Our course completion rates increased by 42% after implementing Zenocon's automated reminders and personalized content delivery.",
                results: [
                  "42% increase in course completion",
                  "68% higher student engagement",
                  "37% reduction in support tickets",
                ],
              },
              {
                name: "City University",
                type: "Higher Education Institution",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "Zenocon has transformed how we communicate with students, making information more accessible and reducing administrative workload.",
                results: [
                  "53% reduction in missed classes",
                  "41% improvement in assignment submission rates",
                  "4.7/5 student satisfaction rating",
                ],
              },
              {
                name: "Tech Skills Institute",
                type: "Vocational Training Center",
                image: "/placeholder.svg?height=300&width=300",
                quote:
                  "The ability to deliver learning materials through WhatsApp has been a game-changer for our students who are often on the go.",
                results: [
                  "62% increase in learning material engagement",
                  "45% higher practical skills assessment scores",
                  "38% increase in course enrollments",
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
                Ready to transform your educational institution?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join hundreds of educational institutions already using Zenocon to enhance learning
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
