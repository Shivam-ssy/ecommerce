"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useSearchParams } from "next/navigation"
import type { Product, SearchFilters } from "@/lib/types"
import ProductCard from "./components/ProductCard"
import SearchAndFilter from "./components/SearchAndFilter"
import { useToast } from "@/lib/toast"
import { Loader2 } from "lucide-react"

export default function ProductsClient() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentFilters, setCurrentFilters] = useState<Partial<SearchFilters>>({})
  const { toast } = useToast()
  const hasInitialized = useRef(false)

  const fetchProducts = useCallback(
    async (filters: Partial<SearchFilters>) => {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        if (filters.search) params.append("search", filters.search)
        if (filters.category && filters.category !== "all") params.append("category", filters.category)
        if (filters.minPrice !== undefined) params.append("minPrice", filters.minPrice.toString())
        if (filters.maxPrice !== undefined) params.append("maxPrice", filters.maxPrice.toString())

        const response = await fetch(`/api/products?${params.toString()}`)
        const data = await response.json()

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch products")
        }

        setProducts(data.data)
        setCurrentFilters(filters)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
        setError(errorMessage)
        toast({
          title: "Error",
          description: errorMessage,
          type: "error",
        })
      } finally {
        setLoading(false)
      }
    },
    [toast],
  )

  // Initialize once on mount with URL parameters
  useEffect(() => {
    if (!hasInitialized.current) {
      const initialFilters: Partial<SearchFilters> = {
        search: searchParams.get("search") || "",
        category: searchParams.get("category") || "all",
        minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
        maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      }

      fetchProducts(initialFilters)
      hasInitialized.current = true
    }
  }, [fetchProducts, searchParams])

  const handleSearch = useCallback(
    (filters: Partial<SearchFilters>) => {
      fetchProducts(filters)
    },
    [fetchProducts],
  )

  // Get initial filters for the SearchAndFilter component
  const getInitialFilters = (): Partial<SearchFilters> => {
    return {
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "all",
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading products...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <button
          onClick={() => fetchProducts(currentFilters)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <SearchAndFilter onSearch={handleSearch} initialFilters={getInitialFilters()} />

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Showing {products.length} product{products.length !== 1 ? "s" : ""}
              {currentFilters.category && currentFilters.category !== "all" && (
                <span className="ml-2">
                  in <strong>{currentFilters.category}</strong>
                </span>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
