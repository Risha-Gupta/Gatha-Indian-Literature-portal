export function searchBooks(q, books_list) {
  if (!q || q.trim() === "" || !Array.isArray(books_list)) {
    return books_list || []
  }

  const results = []
  const q_lower = q.toLowerCase()

  books_list.forEach((book) => {
    if (!book || typeof book !== "object") return // Skip invalid books

    let score = 0

    if (book?.title?.toLowerCase?.().includes(q_lower)) score += 5
    if (book?.titleEn?.toLowerCase?.().includes(q_lower)) score += 5
    if (book?.author?.toLowerCase?.().includes(q_lower)) score += 3
    if (book?.authorEn?.toLowerCase?.().includes(q_lower)) score += 3
    if (book?.excerpt?.toLowerCase?.().includes(q_lower)) score += 2

    if (score > 0) {
      results.push({ book, score })
    }
  })

  results.sort((a, b) => b.score - a.score)
  return results.map((r) => r.book)
}

export function filterBooks(books_list, lang, emotion, contentType) {
  if (!Array.isArray(books_list)) return []

  let filtered = books_list

  if (lang && lang !== "All Languages") {
    filtered = filtered.filter((b) => b?.language === lang)
  }

  if (emotion && emotion !== "all") {
    filtered = filtered.filter((b) => {
      if (!b?.emotion || typeof b.emotion !== "object") return false
      return Object.keys(b.emotion).some((key) => key.toLowerCase() === emotion.toLowerCase())
    })
  }

  if (contentType && contentType !== "All Types") {
    filtered = filtered.filter((b) => b?.contentType === contentType || b?.content_type === contentType)
  }

  return filtered
}

export function getAutocomplete(q, books_list) {
  if (!q || q.length < 2 || !Array.isArray(books_list)) return []

  const q_lower = q.toLowerCase()
  const suggestions = []

  books_list.forEach((book) => {
    if (!book || typeof book !== "object") return // Skip invalid books

    if (book?.title?.toLowerCase?.().includes(q_lower)) {
      suggestions.push({ type: "title", value: book.title })
    }
    if (book?.titleEn?.toLowerCase?.().includes(q_lower)) {
      suggestions.push({ type: "title", value: book.titleEn })
    }
    if (book?.author?.toLowerCase?.().includes(q_lower)) {
      suggestions.push({ type: "author", value: book.author })
    }
    if (book?.authorEn?.toLowerCase?.().includes(q_lower)) {
      suggestions.push({ type: "author", value: book.authorEn })
    }
  })

  // remove duplicates
  const unique = []
  const seen = new Set()
  suggestions.forEach((s) => {
    const key = (s?.value || "").toLowerCase()
    if (!seen.has(key)) {
      unique.push(s)
      seen.add(key)
    }
  })

  return unique.slice(0, 8)
}

export function detectEmotion(text) {
  if (!text || typeof text !== "string") return "peace" // Handle non-string input

  const txt_lower = text.toLowerCase()

  if (txt_lower.includes("love") || txt_lower.includes("प्रेम")) return "romance"
  if (txt_lower.includes("sad") || txt_lower.includes("दुःख")) return "melancholy"
  if (txt_lower.includes("happy")) return "joy"
  if (txt_lower.includes("peace") || txt_lower.includes("शांति")) return "peace"
  if (txt_lower.includes("inspire") || txt_lower.includes("प्रेरणा")) return "inspiration"

  return "peace"
}
