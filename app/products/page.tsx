"use client"

import { Suspense } from "react"
import ProductsClient from "./ProductsClient"
import ProductsLoading from "./loading"

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">
          Discover our curated collection of products. Use the search and filters to find exactly what you're looking
          for.
        </p>
      </div>

      <Suspense fallback={<ProductsLoading />}>
        <ProductsClient />
      </Suspense>
    </div>
  )
}
