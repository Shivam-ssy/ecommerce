import type { Product, ProductFormData, SearchFilters } from "./types"

// In-memory store for products (in production, use a database)
const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    imageUrl: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    imageUrl: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
    description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    price: 199.99,
    imageUrl: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    description: "Advanced fitness tracking with heart rate monitoring and GPS functionality.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Ceramic Coffee Mug",
    price: 15.99,
    imageUrl: "/placeholder.svg?height=300&width=300",
    category: "Home",
    description: "Handcrafted ceramic mug perfect for your morning coffee or tea.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Leather Wallet",
    price: 49.99,
    imageUrl: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    description: "Premium leather wallet with RFID protection and multiple card slots.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Yoga Mat",
    price: 39.99,
    imageUrl: "/placeholder.svg?height=300&width=300",
    category: "Sports",
    description: "Non-slip yoga mat made from eco-friendly materials, perfect for all yoga practices.",
    createdAt: new Date().toISOString(),
  },
]

export class ProductsStore {
  static getAllProducts(): Product[] {
    return [...products]
  }

  static getProductById(id: string): Product | undefined {
    return products.find((product) => product.id === id)
  }

  static addProduct(productData: ProductFormData): Product {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...productData,
      createdAt: new Date().toISOString(),
    }
    products.push(newProduct)
    return newProduct
  }

  static updateProduct(id: string, productData: Partial<ProductFormData>): Product | null {
    const index = products.findIndex((product) => product.id === id)
    if (index === -1) return null

    products[index] = { ...products[index], ...productData }
    return products[index]
  }

  static deleteProduct(id: string): boolean {
    const index = products.findIndex((product) => product.id === id)
    if (index === -1) return false

    products.splice(index, 1)
    return true
  }

  static searchProducts(filters: Partial<SearchFilters>): Product[] {
    let filteredProducts = [...products]

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm),
      )
    }

    if (filters.category && filters.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.toLowerCase() === filters.category?.toLowerCase(),
      )
    }

    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product) => product.price >= filters.minPrice!)
    }

    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product) => product.price <= filters.maxPrice!)
    }

    return filteredProducts
  }

  static getCategories(): string[] {
    const categories = [...new Set(products.map((product) => product.category))]
    return categories.sort()
  }
}
