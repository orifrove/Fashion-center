export type ClothingCategory =
  | 'tops'
  | 'bottoms'
  | 'dresses'
  | 'outerwear'
  | 'shoes'
  | 'accessories'
  | 'bags'
  | 'jewelry'

export type ClothingSeason = 'spring' | 'summer' | 'autumn' | 'winter' | 'all'

export type ClothingStyle =
  | 'casual'
  | 'formal'
  | 'business'
  | 'sporty'
  | 'bohemian'
  | 'minimalist'
  | 'streetwear'
  | 'elegant'

export interface ClothingItem {
  id: string
  userId: string
  name: string
  category: ClothingCategory
  colors: string[]
  season: ClothingSeason[]
  style: ClothingStyle[]
  imageUrl: string
  thumbnailUrl?: string
  isFavorite: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Outfit {
  id: string
  userId: string
  name: string
  items: ClothingItem[]
  occasion?: string
  season?: ClothingSeason
  isFavorite: boolean
  createdAt: Date
}

export type BodyType = 'hourglass' | 'pear' | 'apple' | 'rectangle' | 'inverted-triangle'
export type SkinTone = 'fair' | 'light' | 'medium' | 'olive' | 'tan' | 'deep'

export interface UserProfile {
  id: string
  userId: string
  bodyType?: BodyType
  skinTone?: SkinTone
  favoriteStyles: ClothingStyle[]
  preferredColors: string[]
  createdAt: Date
  updatedAt: Date
}

export interface WeatherData {
  temperature: number
  feelsLike: number
  condition: string
  description: string
  humidity: number
  windSpeed: number
  city: string
  icon: string
}

export interface OutfitRecommendation {
  outfit: ClothingItem[]
  reason: string
  occasion: string
  weatherSuitability: string
  styleScore: number
}

export interface WardrobeAnalysis {
  totalItems: number
  missingEssentials: string[]
  colorPalette: string[]
  dominantStyles: ClothingStyle[]
  suggestions: string[]
}
