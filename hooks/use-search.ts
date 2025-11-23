"use client"

import { useState, useCallback } from "react"
import type { Book, EmotionType } from "@/lib/nlp-engine"

export function useSearch() {
  const [results, setResults] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (query: string, language?: string, emotion?: EmotionType) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (query) params.append("q", query)
      if (language) params.append("language", language)
      if (emotion) params.append("emotion", emotion)
      params.append("type", "search")

      const response = await fetch(`/api/search?${params}`)
      if (!response.ok) throw new Error("Search failed")

      const data = await response.json()
      setResults(data.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed")
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const getTrending = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/search?type=trending")
      if (!response.ok) throw new Error("Failed to fetch trending")

      const data = await response.json()
      setResults(data.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch")
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const getByEmotion = useCallback(async (emotion: EmotionType) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/search?type=emotion&emotion=${emotion}`)
      if (!response.ok) throw new Error("Failed to fetch")

      const data = await response.json()
      setResults(data.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch")
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  return { results, loading, error, search, getTrending, getByEmotion }
}
