"use client"

import { useState } from "react"
import { useSearch } from "@/hooks/use-search"
import { BookGrid } from "@/components/book-grid"
import { EMOTION_DESCRIPTIONS, EMOTION_COLORS, type EmotionType } from "@/lib/nlp-engine"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const EMOTIONS: EmotionType[] = [
  "joy",
  "melancholy",
  "peace",
  "romance",
  "adventure",
  "mystery",
  "inspiration",
  "tragedy",
]

export default function EmotionsPage() {
  const { results, loading, getByEmotion } = useSearch()
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>("peace")

  const handleEmotionClick = (emotion: EmotionType) => {
    setSelectedEmotion(emotion)
    getByEmotion(emotion)
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
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Discover by Emotion</h1>
            <p className="text-muted-foreground">Find the perfect book that matches your mood</p>
          </div>

          {/* Emotion Selection */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {EMOTIONS.map((emotion) => (
              <button
                key={emotion}
                onClick={() => handleEmotionClick(emotion)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedEmotion === emotion ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="text-center space-y-2">
                  <div
                    className="w-12 h-12 rounded-full mx-auto"
                    style={{ backgroundColor: EMOTION_COLORS[emotion] }}
                  />
                  <p className="font-semibold text-foreground text-sm capitalize">{emotion}</p>
                  <p className="text-xs text-muted-foreground">{EMOTION_DESCRIPTIONS[emotion]}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Emotion Details */}
          <div className="mb-8 bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full" style={{ backgroundColor: EMOTION_COLORS[selectedEmotion] }} />
              <div>
                <h2 className="text-2xl font-bold text-foreground capitalize">{selectedEmotion}</h2>
                <p className="text-muted-foreground">{EMOTION_DESCRIPTIONS[selectedEmotion]}</p>
              </div>
            </div>
          </div>

          {/* Book Results */}
          <BookGrid books={results} loading={loading} />
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
