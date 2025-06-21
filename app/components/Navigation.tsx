import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">E-Commerce</span>
          </Link>

          <div className="flex space-x-6">
            <Link href="/products" className="text-gray-600 hover:text-blue-600 transition-colors">
              Products
            </Link>
            <Link href="/admin" className="text-gray-600 hover:text-blue-600 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
