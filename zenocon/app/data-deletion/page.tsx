import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Data Deletion Instructions | Zenocon",
  description: "Learn how to request deletion of your data from our platform.",
}

export default function DataDeletionPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Data Deletion Instructions</h1>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mt-8 mb-4">How to Delete Your Data</h2>
        <p className="mb-4">
          At Zenocon, we respect your privacy and your right to control your personal data. We provide multiple ways for
          you to delete your data from our systems:
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">Option 1: Self-Service Deletion</h3>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Log in to your Zenocon account</li>
          <li>Navigate to Settings &gt; Privacy</li>
          <li>Click on "Delete My Data"</li>
          <li>Follow the confirmation steps to complete the process</li>
        </ol>

        <h3 className="text-xl font-medium mt-6 mb-3">Option 2: Email Request</h3>
        <p className="mb-4">
          Send an email to
          {" "}
          <a href="mailto:privacy@zenocon.com" className="text-blue-600 hover:underline">
            privacy@zenocon.com
          </a>
          {" "}
          with the subject line "Data Deletion Request" and include:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Your full name</li>
          <li>Email address associated with your account</li>
          <li>Phone number (if applicable)</li>
          <li>A clear statement requesting the deletion of your data</li>
        </ul>

        {/* <h3 className="text-xl font-medium mt-6 mb-3">Option 3: Contact Form</h3>
        <p className="mb-6">
          Fill out our{" "}
          <a href="/contact" className="text-blue-600 hover:underline">
            contact form
          </a>{" "}
          and select "Data Deletion Request" from the dropdown menu.
        </p> */}

        <h2 className="text-2xl font-semibold mt-8 mb-4">WhatsApp Data Deletion</h2>
        <p className="mb-4">
          If you've used our WhatsApp Business API integration, your request will also cover data stored in connection
          with WhatsApp services. This includes:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Message history and content</li>
          <li>Phone numbers and contact information</li>
          <li>Template message usage data</li>
          <li>Conversation analytics</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What Happens After Your Request</h2>
        <p className="mb-4">Once we receive your deletion request:</p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>We'll confirm receipt of your request within 2 business days</li>
          <li>Your data will be scheduled for deletion within 30 days</li>
          <li>You'll receive a confirmation email once the deletion is complete</li>
          <li>
            Any data shared with third-party services (including Meta) will be deleted according to their respective
            data retention policies
          </li>
        </ol>

        <div className="bg-gray-100 p-6 rounded-lg mt-8 mb-8">
          <h3 className="text-xl font-medium mb-3">Important Note</h3>
          <p className="mb-0">
            Some information may be retained for legal, regulatory, or legitimate business purposes as outlined in our
            <a href="/privacy" className="text-blue-600 hover:underline">
              {" "}
              Privacy Policy
            </a>
            . This may include transaction records, audit logs, and other data required by law.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Questions About Data Deletion</h2>
        <p className="mb-4">
          If you have any questions about the data deletion process, please contact our Support team at
          <a href="mailto:support@zenocon.com" className="text-blue-600 hover:underline">
            {" "}
            support@zenocon.com
          </a>
          .
        </p>
      </div>
    </div>
  )
}
