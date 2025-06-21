import { NextResponse } from "next/server"
import { ProductsStore } from "@/lib/products-store"

// GET /api/categories - Fetch all product categories
export async function GET() {
  try {
    const categories = ProductsStore.getCategories()

    return NextResponse.json({
      success: true,
      data: categories,
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch categories" }, { status: 500 })
  }
}
