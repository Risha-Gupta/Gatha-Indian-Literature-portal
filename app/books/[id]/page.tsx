"use client"

import { useState } from "react"
import { mockBooks, type EmotionType, EMOTION_COLORS } from "@/lib/nlp-engine"
import { EmotionRadar } from "@/components/emotion-radar"
import { BookRecommendations } from "@/components/book-recommendations"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function BookDetailPage() {
  const params = useParams()
  const bookId = params.id as string
  const [book, setBook] = useState(mockBooks.find((b) => b.id === bookId))

  // Mock emotion analysis data
  const emotionAnalysis: Record<EmotionType, number> = {
    joy: 15,
    melancholy: 65,
    peace: 45,
    romance: 75,
    adventure: 20,
    mystery: 35,
    inspiration: 55,
    tragedy: 80,
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Book Not Found</h1>
          <Link href="/browse">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Back to Browse</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              आ
            </div>
            <span className="text-xl font-bold text-foreground">Indian Literature</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/browse">
              <Button variant="ghost" className="text-foreground hover:bg-primary/10">
                Browse
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="ghost" className="text-foreground hover:bg-primary/10">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link href="/browse" className="text-primary hover:text-primary/80 mb-8 inline-block">
            ← Back to Browse
          </Link>

          {/* Book Hero */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Book Cover */}
            <div className="md:col-span-1">
              <div
                className="aspect-square rounded-lg flex items-center justify-center text-9xl mb-6"
                style={{ backgroundColor: EMOTION_COLORS[book.emotion] + "20" }}
              >
                📖
              </div>
              <div className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                  View Full Details
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
                  size="lg"
                >
                  Add to Favorites
                </Button>
              </div>
            </div>

            {/* Book Info */}
            <div className="md:col-span-2 space-y-6">
              {/* Title and Author */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-foreground">{book.title}</h1>
                    <p className="text-xl text-muted-foreground">by {book.author}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg">
                    <span className="text-2xl">★</span>
                    <span className="text-xl font-bold text-accent">{book.rating}</span>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-3">
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  {book.language}
                </div>
                <div
                  className="px-4 py-2 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: EMOTION_COLORS[book.emotion] }}
                >
                  {book.emotion.charAt(0).toUpperCase() + book.emotion.slice(1)}
                </div>
                <div className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
                  {book.year}
                </div>
                <div className="bg-muted/50 text-muted-foreground px-4 py-2 rounded-full text-sm font-medium">
                  {book.category}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">About this Book</h2>
                <p className="text-muted-foreground leading-relaxed">{book.description}</p>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span key={tag} className="bg-muted text-muted-foreground px-3 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Emotion Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <EmotionRadar primaryEmotion={book.emotion} allEmotions={emotionAnalysis} />
              </div>
            </div>

            {/* Additional Info */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Key Characteristics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Primary Emotion</p>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: EMOTION_COLORS[book.emotion] }} />
                      <p className="font-semibold text-foreground capitalize">{book.emotion}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Language</p>
                    <p className="font-semibold text-foreground">{book.language}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Publication Year</p>
                    <p className="font-semibold text-foreground">{book.year}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-semibold text-foreground">{book.category}</p>
                  </div>
                </div>
              </div>

              {/* Reader Insights */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Why Readers Love This Book</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-muted-foreground">Rich emotional depth and character development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-muted-foreground">
                      Authentic representation of Indian culture and society
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-muted-foreground">Timeless themes that resonate across generations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-card border border-border rounded-lg p-8 mb-12">
            <BookRecommendations bookId={book.id} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2025 Indian Literature Portal. Celebrating the written heritage of India.</p>
        </div>
      </footer>
    </main>
  )
}
