"use client"

import Link from "next/link"
import type { Book } from "@/lib/nlp-engine"
import { EMOTION_COLORS } from "@/lib/nlp-engine"

interface BookGridProps {
  books: Book[]
  loading?: boolean
}

export function BookGrid({ books, loading }: BookGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-video bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No books found. Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <Link key={book.id} href={`/books/${book.id}`}>
          <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300 h-full cursor-pointer">
            <div
              className="aspect-video flex items-center justify-center text-6xl font-bold"
              style={{ backgroundColor: EMOTION_COLORS[book.emotion] + "20" }}
            >
              📖
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-foreground line-clamp-2 text-sm">{book.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-1">{book.author}</p>
              <div className="flex gap-1 flex-wrap">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{book.language}</span>
                <span
                  className="text-xs px-2 py-1 rounded text-white"
                  style={{ backgroundColor: EMOTION_COLORS[book.emotion] }}
                >
                  {book.emotion}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground">{book.year}</span>
                <span className="text-sm font-medium text-accent">★ {book.rating}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
