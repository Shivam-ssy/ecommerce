"use client"

import { useState, useEffect } from "react"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import type { SearchFilters } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

interface SearchAndFilterProps {
  onSearch: (filters: Partial<SearchFilters>) => void
  initialFilters?: Partial<SearchFilters>
}

export default function SearchAndFilter({ onSearch, initialFilters = {} }: SearchAndFilterProps) {
  const [filters, setFilters] = useState<Partial<SearchFilters>>({
    search: initialFilters.search || "",
    category: initialFilters.category || "all",
    minPrice: initialFilters.minPrice,
    maxPrice: initialFilters.maxPrice,
  })
  const [categories, setCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        const data = await response.json()
        if (data.success) {
          setCategories(data.data)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  // Initialize filters and show filter section if category is pre-selected
  useEffect(() => {
    const newFilters = {
      search: initialFilters.search || "",
      category: initialFilters.category || "all",
      minPrice: initialFilters.minPrice,
      maxPrice: initialFilters.maxPrice,
    }
    setFilters(newFilters)

    // Auto-expand filters if category is pre-selected
    if (initialFilters.category && initialFilters.category !== "all") {
      setShowFilters(true)
    }
  }, [initialFilters.search, initialFilters.category, initialFilters.minPrice, initialFilters.maxPrice])

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onSearch(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      category: "all",
      minPrice: undefined,
      maxPrice: undefined,
    }
    setFilters(clearedFilters)
    onSearch(clearedFilters)
  }

  const hasActiveFilters =
    filters.search ||
    (filters.category && filters.category !== "all") ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={filters.search || ""}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Toggle and Active Filters */}
          <div className="flex flex-wrap justify-between items-center gap-2">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">Active</span>
              )}
            </Button>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Active Filter Badges */}
              {filters.category && filters.category !== "all" && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Category: {filters.category}
                </Badge>
              )}
              {filters.search && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Search: "{filters.search}"
                </Badge>
              )}
              {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  Price: ${filters.minPrice || 0} - ${filters.maxPrice || "∞"}
                </Badge>
              )}

              {hasActiveFilters && (
                <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-2 text-gray-600">
                  <X className="h-4 w-4" />
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <Select
                  value={filters.category || "all"}
                  onValueChange={(value) => handleFilterChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Min Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Price ($)</label>
                <Input
                  type="number"
                  placeholder="0"
                  min="0"
                  step="0.01"
                  value={filters.minPrice !== undefined ? filters.minPrice : ""}
                  onChange={(e) => handleFilterChange("minPrice", e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>

              {/* Max Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price ($)</label>
                <Input
                  type="number"
                  placeholder="1000"
                  min="0"
                  step="0.01"
                  value={filters.maxPrice !== undefined ? filters.maxPrice : ""}
                  onChange={(e) => handleFilterChange("maxPrice", e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
