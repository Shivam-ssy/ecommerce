import { type NextRequest, NextResponse } from "next/server"
import { ProductsStore } from "@/lib/products-store"
import type { ProductFormData } from "@/lib/types"

// GET /api/products - Fetch all products with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = {
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "",
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    }

    // Remove empty filters
    Object.keys(filters).forEach((key) => {
      if (filters[key as keyof typeof filters] === "" || filters[key as keyof typeof filters] === undefined) {
        delete filters[key as keyof typeof filters]
      }
    })

    const products =
      Object.keys(filters).length > 0 ? ProductsStore.searchProducts(filters) : ProductsStore.getAllProducts()

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

// POST /api/products - Add a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "price", "imageUrl", "category", "description"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Validate price is a positive number
    if (typeof body.price !== "number" || body.price <= 0) {
      return NextResponse.json({ success: false, error: "Price must be a positive number" }, { status: 400 })
    }

    const productData: ProductFormData = {
      name: body.name.trim(),
      price: Number(body.price),
      imageUrl: body.imageUrl.trim(),
      category: body.category.trim(),
      description: body.description.trim(),
    }

    const newProduct = ProductsStore.addProduct(productData)

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
        message: "Product created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 })
  }
}
