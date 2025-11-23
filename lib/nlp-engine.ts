// Multi-language NLP engine for semantic search and emotion detection

export interface Book {
  id: string
  title: string
  author: string
  language: "English" | "Hindi" | "Marathi" | "Tamil" | "Kannada" | "Bengali"
  description: string
  emotion: EmotionType
  year: number
  category: string
  tags: string[]
  rating: number
}

export type EmotionType =
  | "joy"
  | "melancholy"
  | "peace"
  | "romance"
  | "adventure"
  | "mystery"
  | "inspiration"
  | "tragedy"

export const EMOTION_DESCRIPTIONS: Record<EmotionType, string> = {
  joy: "Uplifting and cheerful",
  melancholy: "Thoughtful and introspective",
  peace: "Calm and contemplative",
  romance: "Passionate and emotional",
  adventure: "Exciting and thrilling",
  mystery: "Intriguing and suspenseful",
  inspiration: "Motivating and empowering",
  tragedy: "Profound and moving",
}

export const EMOTION_COLORS: Record<EmotionType, string> = {
  joy: "#fbbf24",
  melancholy: "#7c3aed",
  peace: "#06b6d4",
  romance: "#ec4899",
  adventure: "#ef4444",
  mystery: "#8b5cf6",
  inspiration: "#10b981",
  tragedy: "#6b7280",
}

// Mock book database
export const mockBooks: Book[] = [
  {
    id: "1",
    title: "Devdas",
    author: "Sarat Chandra Chattopadhyay",
    language: "Bengali",
    description: "A tragic tale of unfulfilled love and social constraints",
    emotion: "tragedy",
    year: 1917,
    category: "Novel",
    tags: ["romance", "tragedy", "love", "Bengali literature"],
    rating: 4.5,
  },
  {
    id: "2",
    title: "Godan",
    author: "Munshi Premchand",
    language: "Hindi",
    description: "A powerful story of peasant life and social struggle",
    emotion: "melancholy",
    year: 1936,
    category: "Novel",
    tags: ["rural life", "social commentary", "Hindi literature"],
    rating: 4.6,
  },
  {
    id: "3",
    title: "Swami and Friends",
    author: "R.K. Narayan",
    language: "English",
    description: "Charming tales of school life and friendship",
    emotion: "joy",
    year: 1935,
    category: "Novel",
    tags: ["coming-of-age", "friendship", "humor"],
    rating: 4.4,
  },
  {
    id: "4",
    title: "Karpooramanjari",
    author: "Banabhatta",
    language: "Sanskrit",
    description: "An ancient Sanskrit drama of love and longing",
    emotion: "romance",
    year: 700,
    category: "Drama",
    tags: ["classical", "Sanskrit", "romance"],
    rating: 4.2,
  },
  {
    id: "5",
    title: "Kumarasambhava",
    author: "Kalidasa",
    language: "Sanskrit",
    description: "The birth of the war god - a masterpiece of classical literature",
    emotion: "inspiration",
    year: 400,
    category: "Epic Poetry",
    tags: ["classical", "epic", "mythology"],
    rating: 4.7,
  },
  {
    id: "6",
    title: "Jnaneshwari",
    author: "Jnaneshwar",
    language: "Marathi",
    description: "A philosophical commentary on the Bhagavad Gita",
    emotion: "peace",
    year: 1290,
    category: "Philosophy",
    tags: ["spirituality", "Marathi", "Bhagavad Gita"],
    rating: 4.8,
  },
  {
    id: "7",
    title: "Kaimaram",
    author: "Kumara Vyas",
    language: "Kannada",
    description: "An adventure tale of ancient Kannada literature",
    emotion: "adventure",
    year: 1500,
    category: "Epic",
    tags: ["Kannada", "adventure", "historical"],
    rating: 4.3,
  },
  {
    id: "8",
    title: "Silappatikaram",
    author: "Ilango Adigal",
    language: "Tamil",
    description: "An ancient Tamil epic of love, justice and fate",
    emotion: "mystery",
    year: 300,
    category: "Epic Poetry",
    tags: ["Tamil", "epic", "classical", "justice"],
    rating: 4.6,
  },
]

// Tokenize text into words
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
}

// Calculate semantic similarity between two strings (simple implementation)
function calculateSimilarity(query: string, text: string): number {
  const queryTokens = new Set(tokenize(query))
  const textTokens = tokenize(text)

  let matches = 0
  for (const token of textTokens) {
    if (queryTokens.has(token)) {
      matches++
    }
  }

  return textTokens.length > 0 ? matches / textTokens.length : 0
}

// Search books by query and language
export function searchBooks(query: string, language?: string, emotion?: EmotionType): Book[] {
  if (!query.trim()) {
    return mockBooks
      .filter((book) => !language || book.language === language)
      .filter((book) => !emotion || book.emotion === emotion)
  }

  let results = mockBooks
    .map((book) => {
      // Calculate similarity score
      const titleSimilarity = calculateSimilarity(query, book.title)
      const authorSimilarity = calculateSimilarity(query, book.author)
      const descriptionSimilarity = calculateSimilarity(query, book.description)
      const tagsSimilarity = book.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ? 0.8 : 0

      const totalScore = titleSimilarity * 3 + authorSimilarity * 2 + descriptionSimilarity + tagsSimilarity

      return { book, score: totalScore }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ book }) => book)

  // Filter by language if specified
  if (language) {
    results = results.filter((book) => book.language === language)
  }

  // Filter by emotion if specified
  if (emotion) {
    results = results.filter((book) => book.emotion === emotion)
  }

  return results
}

// Get books by emotion
export function getBooksByEmotion(emotion: EmotionType): Book[] {
  return mockBooks.filter((book) => book.emotion === emotion)
}

// Get books by language
export function getBooksByLanguage(language: string): Book[] {
  return mockBooks.filter((book) => book.language === language)
}

// Get trending books (mock implementation - top rated)
export function getTrendingBooks(): Book[] {
  return [...mockBooks].sort((a, b) => b.rating - a.rating).slice(0, 6)
}

// Get recommendations based on book
export function getRecommendations(bookId: string): Book[] {
  const book = mockBooks.find((b) => b.id === bookId)
  if (!book) return []

  return mockBooks
    .filter((b) => b.id !== bookId)
    .map((b) => {
      let score = 0
      // Same emotion
      if (b.emotion === book.emotion) score += 3
      // Same language
      if (b.language === book.language) score += 2
      // Same category
      if (b.category === book.category) score += 1
      // Similar tags
      const commonTags = b.tags.filter((tag) => book.tags.includes(tag)).length
      score += commonTags * 2
      return { book: b, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ book: b }) => b)
}

// Detect emotion from text (simple keyword matching)
export function detectEmotion(text: string): EmotionType {
  const lowerText = text.toLowerCase()

  const emotionKeywords: Record<EmotionType, string[]> = {
    joy: ["happy", "joy", "celebration", "cheerful", "delighted", "blessed"],
    melancholy: ["sad", "sorrow", "melancholy", "reflective", "nostalgic", "wistful"],
    peace: ["peace", "calm", "serene", "tranquil", "meditative", "quiet"],
    romance: ["love", "romance", "passion", "affection", "devotion", "tender"],
    adventure: ["adventure", "thrilling", "exciting", "daring", "bold", "quest"],
    mystery: ["mystery", "enigma", "secret", "puzzling", "intrigue", "suspense"],
    inspiration: ["inspire", "motivation", "courage", "strength", "hope", "persevere"],
    tragedy: ["tragedy", "loss", "despair", "fatal", "doom", "heartbreak"],
  }

  const emotionScores: Record<EmotionType, number> = {} as Record<EmotionType, number>

  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    emotionScores[emotion as EmotionType] = keywords.reduce((score, keyword) => {
      return score + (lowerText.includes(keyword) ? 1 : 0)
    }, 0)
  }

  return (Object.entries(emotionScores).sort(([, a], [, b]) => b - a)[0][0] as EmotionType) || "peace"
}
