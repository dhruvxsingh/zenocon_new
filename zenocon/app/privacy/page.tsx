import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export const metadata: Metadata = {
  title: "Privacy Policy | Zenocon",
  description: "Privacy Policy for Zenocon WhatsApp Business Platform",
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container max-w-4xl py-12">
          <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>

          <div className="prose prose-gray max-w-none dark:prose-invert">
            <p className="text-lg text-muted-foreground">Last updated: May 14, 2025</p>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">1. Introduction</h2>
            <p>
              Zenocon, a brand owned and operated by Coyesco7 Private Limited ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how
              we collect, use, disclose, and safeguard your information when you use our website and WhatsApp Business
              Platform integration services (the "Service").
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
              please do not access the Service. By accessing or using our Service, you consent to the collection, use,
              and disclosure of information in accordance with this Privacy Policy.
            </p>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              2. Information We Collect
            </h2>
            <p>We collect information that you provide directly to us when you:</p>
            <ul className="list-disc pl-6">
              <li>Register for an account</li>
              <li>Use our Service</li>
              <li>Subscribe to our newsletter</li>
              <li>Request customer support</li>
              <li>Communicate with us in any way</li>
            </ul>
            <p>The types of information we may collect include:</p>
            <ul className="list-disc pl-6">
              <li>Contact information (such as name, email address, phone number)</li>
              <li>Billing information (such as credit card details, billing address)</li>
              <li>Account credentials</li>
              <li>WhatsApp Business Account information</li>
              <li>Message templates and content</li>
              <li>Contact lists and customer information</li>
              <li>Usage data and analytics</li>
            </ul>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              3. How We Use Your Information
            </h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul className="list-disc pl-6">
              <li>Provide, maintain, and improve our Service</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative information, such as updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Provide customer service and support</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Personalize and improve your experience</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              4. WhatsApp Data and Meta Integration
            </h2>
            <p>
              Our Service integrates with Meta's WhatsApp Business Platform. When you connect your WhatsApp Business
              Account to our Service:
            </p>
            <ul className="list-disc pl-6">
              <li>We access and process WhatsApp message data as your data processor</li>
              <li>We store message templates, contact information, and messaging history</li>
              <li>We collect analytics related to message delivery and engagement</li>
            </ul>
            <p>
              All WhatsApp data is processed in accordance with Meta's data policies and your agreements with Meta. We
              do not use WhatsApp data for purposes beyond providing our Service to you.
            </p>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              5. Data Sharing and Disclosure
            </h2>
            <p>We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6">
              <li>With service providers who perform services on our behalf</li>
              <li>To comply with legal obligations</li>
              <li>To protect and defend our rights and property</li>
              <li>With your consent or at your direction</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal
              information. However, please be aware that no method of transmission over the Internet or method of
              electronic storage is 100% secure.
            </p>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              7. Your Data Protection Rights
            </h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, such as:</p>
            <ul className="list-disc pl-6">
              <li>The right to access your personal information</li>
              <li>The right to rectify inaccurate information</li>
              <li>The right to erasure of your information</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
            </ul>
            <p>To exercise these rights, please contact us at privacy@zenocon.com.</p>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              8. Children's Privacy
            </h2>
            <p>
              Our Service is not directed to children under the age of 18. We do not knowingly collect personal
              information from children under 18. If you are a parent or guardian and you are aware that your child has
              provided us with personal information, please contact us.
            </p>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              9. Changes to This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at 
              {" "}
              <a href="mailto:privacy@zenocon.com" className="text-blue-600 hover:underline">
              privacy@zenocon.com
              </a>
              {" "}
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
