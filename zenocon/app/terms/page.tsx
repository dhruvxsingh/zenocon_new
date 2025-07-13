import Link from "next/link"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export const metadata: Metadata = {
  title: "Terms of Service | Zenocon",
  description: "Terms of Service for Zenocon WhatsApp Business Platform",
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container max-w-4xl py-12">
          <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>

          <div className="prose prose-gray max-w-none dark:prose-invert">
            <p className="text-lg text-muted-foreground">Last updated: May 14, 2025</p>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">1. Introduction</h2>
            <p>
              Welcome to Zenocon, a brand owned and operated by Coyesco7 Private Limited ("Company", "we", "our", "us")! These Terms of Service ("Terms", "Terms of Service")
              govern your use of our website located at
              {" "}
              <Link
                href="/"
                className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
              >
                zenocon.com
              </Link>
              {" "}
              and our WhatsApp Business Platform integration
              services (together or individually "Service") operated by Zenocon.
            </p>
            <p>
              Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and
              disclose information that results from your use of our web pages. Please read it here:{" "}
              <Link
                href="/privacy"
                className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <p>
              By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of
              the terms then you may not access the Service.
            </p>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">2. Communications</h2>
            <p>
              By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other
              information we may send. However, you may opt out of receiving any, or all, of these communications from
              us by following the unsubscribe link or by emailing {" "}
              <a href="mailto:support@zenocon.com" className="text-blue-600 hover:underline">
                support@zenocon.com
              </a>.
            </p>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">3. Purchases</h2>
            <p>
              If you wish to purchase any product or service made available through the Service ("Purchase"), you may be
              asked to supply certain information relevant to your Purchase including your credit card number, the
              expiration date of your credit card, your billing address, and your shipping information.
            </p>
            <p>
              You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment
              method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct
              and complete.
            </p>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              4. Meta WhatsApp Business Platform
            </h2>
            <p>
              Our Service integrates with Meta's WhatsApp Business Platform. By using our Service, you agree to comply
              with all applicable Meta and WhatsApp terms, policies, and guidelines, including but not limited to:
            </p>
            <ul className="list-disc pl-6">
              <li>WhatsApp Business Solution Terms</li>
              <li>WhatsApp Business Policy</li>
              <li>WhatsApp Commerce Policy</li>
              <li>Meta Platform Terms</li>
            </ul>
            <p>
              You acknowledge that your access to WhatsApp Business Platform features through our Service is contingent
              upon your compliance with these terms and policies.
            </p>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">5. Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise make available certain information, text,
              graphics, videos, or other material ("Content"). You are responsible for ensuring that all Content you
              provide complies with applicable laws and regulations, including WhatsApp's policies regarding acceptable
              content.
            </p>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              6. Prohibited Uses
            </h2>
            <p>
              You may use our Service only for lawful purposes and in accordance with these Terms. You agree not to use
              our Service:
            </p>
            <ul className="list-disc pl-6">
              <li>In any way that violates any applicable national or international law or regulation.</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
              <li>
                To send, knowingly receive, upload, download, use, or re-use any material that does not comply with the
                Content Standards set out in these Terms.
              </li>
              <li>
                To transmit, or procure the sending of, any advertising or promotional material, including any "junk
                mail", "chain letter", "spam", or any other similar solicitation.
              </li>
              <li>
                To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other
                person or entity.
              </li>
            </ul>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">7. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice
              or liability, under our sole discretion, for any reason whatsoever and without limitation, including but
              not limited to a breach of the Terms.
            </p>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">8. Governing Law</h2>
            <p>
                These Terms shall be governed and construed in accordance with the laws of India, and any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Delhi, India
            </p>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              9. Changes to Terms
            </h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material we will provide at least 30 days' notice prior to any new terms taking effect. What
              constitutes a material change will be determined at our sole discretion.
            </p>

            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">10. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at 
              {" "}
              <a href="mailto:support@zenocon.com" className="text-blue-600 hover:underline">
                support@zenocon.com
              </a>.</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
