import { Suspense } from "react"
import AdminClient from "./AdminClient"
import AdminLoading from "./loading"

export const metadata = {
  title: "Admin Panel - E-Commerce Platform",
  description: "Manage products, view analytics, and control your e-commerce platform.",
}

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Manage your products, view analytics, and control your e-commerce platform.</p>
      </div>

      <Suspense fallback={<AdminLoading />}>
        <AdminClient />
      </Suspense>
    </div>
  )
}
