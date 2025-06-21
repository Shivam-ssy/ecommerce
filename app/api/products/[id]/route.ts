import { type NextRequest, NextResponse } from "next/server"
import { ProductsStore } from "@/lib/products-store"

// GET /api/products/[id] - Fetch a single product
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const product = ProductsStore.getProductById(id)

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch product" }, { status: 500 })
  }
}

// DELETE /api/products/[id] - Remove a product by ID
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const deleted = ProductsStore.deleteProduct(id)

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 })
  }
}

// PUT /api/products/[id] - Update a product
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    // Validate price if provided
    if (body.price !== undefined && (typeof body.price !== "number" || body.price <= 0)) {
      return NextResponse.json({ success: false, error: "Price must be a positive number" }, { status: 400 })
    }

    const updatedProduct = ProductsStore.updateProduct(id, body)

    if (!updatedProduct) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 })
  }
}