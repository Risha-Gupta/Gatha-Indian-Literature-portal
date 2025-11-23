const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

const apiClient = {
  // ✅ NEW: Simple search function (uses /books endpoint with semantic search)
  async searchBooks(queryString) {
    try {
      const response = await fetch(`${API_BASE_URL}/books?${queryString}`)
      if (!response.ok) throw new Error(`API returned ${response.status}`)
      return response.json()
    } catch (error) {
      console.warn("[v0] Search API unavailable:", error.message)
      return { success: true, data: [], count: 0 }
    }
  },

  async fetchBooks(filters = {}) {
    const params = new URLSearchParams()
    if (filters.q) params.append("q", filters.q)
    if (filters.language) params.append("language", filters.language)
    if (filters.content_type) params.append("content_type", filters.content_type)
    if (filters.emotion) params.append("emotion", filters.emotion)
    if (filters.bookId) params.append("bookId", filters.bookId)
    if (filters.authorId) params.append("authorId", filters.authorId)

    try {
      const response = await fetch(`${API_BASE_URL}/books?${params.toString()}`)
      if (!response.ok) throw new Error(`API returned ${response.status}`)
      return response.json()
    } catch (error) {
      console.warn("[v0] API unavailable, returning empty data:", error.message)
      return { success: true, data: [], count: 0 }
    }
  },

  async fetchBookById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`)
      if (!response.ok) throw new Error(`API returned ${response.status}`)
      return response.json()
    } catch (error) {
      console.warn("[v0] API unavailable:", error.message)
      return { success: false, error: "Book not found" }
    }
  },

  async fetchBookEmotions(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}/emotions`)
      if (!response.ok) throw new Error(`API returned ${response.status}`)
      return response.json()
    } catch (error) {
      console.warn("[v0] API unavailable:", error.message)
      return { success: true, data: { book_id: id, emotions: {} } }
    }
  },

  // ✅ FIXED: Removed encodeURIComponent (URLSearchParams handles it)
  async getAutocomplete(query) {
    if (!query || query.length < 2) return { data: [] }
    try {
      const params = new URLSearchParams()
      params.append("q", query) // Let URLSearchParams handle encoding
      const response = await fetch(`${API_BASE_URL}/search/autocomplete?${params.toString()}`)
      if (!response.ok) throw new Error(`API returned ${response.status}`)
      return response.json()
    } catch (error) {
      console.warn("[v0] Autocomplete API unavailable:", error.message)
      return { success: true, data: [] }
    }
  },

  async advancedSearch(filters = {}) {
    const params = new URLSearchParams()
    if (filters.q) params.append("q", filters.q)
    if (filters.language) params.append("language", filters.language)
    if (filters.content_type) params.append("content_type", filters.content_type)
    if (filters.emotion) params.append("emotion", filters.emotion)
    if (filters.bookId) params.append("bookId", filters.bookId)
    if (filters.authorId) params.append("authorId", filters.authorId)

    try {
      // Try advanced search endpoint first
      const response = await fetch(`${API_BASE_URL}/search/advanced?${params.toString()}`)
      if (!response.ok) {
        // Fallback to regular /books endpoint
        const fallbackResponse = await fetch(`${API_BASE_URL}/books?${params.toString()}`)
        if (!fallbackResponse.ok) throw new Error(`API returned ${fallbackResponse.status}`)
        return fallbackResponse.json()
      }
      return response.json()
    } catch (error) {
      console.warn("[v0] Advanced search API unavailable:", error.message)
      return { success: true, data: [], count: 0 }
    }
  },

  async fetchCollections() {
    try {
      const response = await fetch(`${API_BASE_URL}/collections`)
      if (!response.ok) throw new Error(`API returned ${response.status}`)
      return response.json()
    } catch (error) {
      console.warn("[v0] Collections API unavailable:", error.message)
      return { success: true, data: [], count: 0 }
    }
  },

  async fetchCollectionById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/collections/${id}`)
      if (!response.ok) throw new Error(`API returned ${response.status}`)
      return response.json()
    } catch (error) {
      console.warn("[v0] Collection API unavailable:", error.message)
      return { success: false, error: "Collection not found" }
    }
  },

  async fetchAuthors() {
    try {
      const response = await fetch(`${API_BASE_URL}/authors`)
      if (!response.ok) throw new Error(`API returned ${response.status}`)
      return response.json()
    } catch (error) {
      console.warn("[v0] Authors API unavailable:", error.message)
      return { success: true, data: [], count: 0 }
    }
  },

  async fetchAuthorById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/authors/${id}`)
      if (!response.ok) throw new Error(`API returned ${response.status}`)
      return response.json()
    } catch (error) {
      console.warn("[v0] Author API unavailable:", error.message)
      return { success: false, error: "Author not found" }
    }
  },

  async fetchStatistics() {
    try {
      const response = await fetch(`${API_BASE_URL}/statistics`)
      if (!response.ok) throw new Error(`API returned ${response.status}`)
      return response.json()
    } catch (error) {
      console.warn("[v0] Statistics API unavailable:", error.message)
      return {
        success: true,
        data: {
          total_books: 0,
          total_authors: 0,
          total_languages: 0,
          languages: [],
          emotions: {},
          content_types: [],
        },
      }
    }
  },

  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`)
      if (!response.ok) throw new Error(`API returned ${response.status}`)
      return response.json()
    } catch (error) {
      console.warn("[v0] Health check failed:", error.message)
      return { success: false, status: "API unavailable" }
    }
  },
}

export default apiClient
