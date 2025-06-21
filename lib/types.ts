export interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  category: string
  description: string
  createdAt: string
}

export interface ProductFormData {
  name: string
  price: number
  imageUrl: string
  category: string
  description: string
}

export interface SearchFilters {
  search: string
  category: string
  minPrice: number
  maxPrice: number
}
