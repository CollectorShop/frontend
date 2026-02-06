// src/types/catalogue.ts
export interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  condition: 'new' | 'like_new' | 'good' | 'fair'
  images: string[]
  sellerId: string
  createdAt: string
  rarity?: 'common' | 'rare' | 'unique'
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
}

export type FilterState = {
  category: string | null
  minPrice: number | null
  maxPrice: number | null
  condition: string[]
  search: string
}
