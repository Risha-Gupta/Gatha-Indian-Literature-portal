"use client"

import { useState, useEffect } from "react"
import type { Book } from "@/lib/nlp-engine"
import { BookGrid } from "./book-grid"

interface BookRecommendationsProps {
  bookId: string
}

export function BookRecommendations({ bookId }: BookRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`/api/search?type=recommendations&q=${bookId}`)
        if (response.ok) {
          const data = await response.json()
          setRecommendations(data.data || [])
        }
      } catch (error) {
        console.error("Failed to fetch recommendations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [bookId])

  if (loading) {
    return <div className="h-96 bg-muted animate-pulse rounded-lg" />
  }

  if (recommendations.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-foreground">You Might Also Like</h3>
      <BookGrid books={recommendations} />
    </div>
  )
}
