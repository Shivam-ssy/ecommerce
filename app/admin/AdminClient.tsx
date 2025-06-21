"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Package, TrendingUp, Users } from "lucide-react"
import ProductsTable from "./components/ProductsTable"
import AddProductDialog from "./components/AddProductDialog"
import { useToast } from "@/lib/toast"

export default function AdminClient() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const { toast } = useToast()

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/products")
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch products")
      }

      setProducts(data.data)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      toast({
        title: "Error",
        description: errorMessage,
        type: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleProductAdded = () => {
    fetchProducts()
    setShowAddDialog(false)
    toast({
      title: "Success",
      description: "Product added successfully",
      type: "success",
    })
  }

  const handleProductDeleted = () => {
    fetchProducts()
    toast({
      title: "Success",
      description: "Product deleted successfully",
      type: "success",
    })
  }

  // Calculate stats
  const totalProducts = products.length
  const totalValue = products.reduce((sum, product) => sum + product.price, 0)
  const categories = [...new Set(products.map((p) => p.category))].length

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">Active products in catalog</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Combined product value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories}</div>
            <p className="text-xs text-muted-foreground">Product categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Products Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Product Management</CardTitle>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ProductsTable products={products} loading={loading} onProductDeleted={handleProductDeleted} />
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <AddProductDialog open={showAddDialog} onOpenChange={setShowAddDialog} onProductAdded={handleProductAdded} />
    </div>
  )
}
