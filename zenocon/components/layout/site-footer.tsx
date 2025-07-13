import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"></div>
      <div className="container relative z-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-white">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-sm text-gray-300 hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-300 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-white">Industries</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/industries/food-beverage" className="text-sm text-gray-300 hover:text-white">
                  Food & Beverage
                </Link>
              </li>
              <li>
                <Link href="/industries/ecommerce" className="text-sm text-gray-300 hover:text-white">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href="/industries/logistics" className="text-sm text-gray-300 hover:text-white">
                  Logistics
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard/documentation" className="text-sm text-gray-300 hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/dashboard/help" className="text-sm text-gray-300 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-gray-300 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/data-deletion" className="text-sm text-gray-300 hover:text-white">
                  Data Deletion
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Zenocon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
