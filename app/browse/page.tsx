"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearch } from "@/hooks/use-search"
import { BookGrid } from "@/components/book-grid"
import { FilterSidebar } from "@/components/filter-sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { EmotionType } from "@/lib/nlp-engine"

export default function BrowsePage() {
  const { results, loading, search, getTrending } = useSearch()
  const [query, setQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null)

  useEffect(() => {
    getTrending()
  }, [getTrending])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    search(query, selectedLanguage || undefined, selectedEmotion || undefined)
  }

  const handleLanguageChange = (language: string | null) => {
    setSelectedLanguage(language)
    if (query) {
      search(query, language || undefined, selectedEmotion || undefined)
    }
  }

  const handleEmotionChange = (emotion: EmotionType | null) => {
    setSelectedEmotion(emotion)
    if (query) {
      search(query, selectedLanguage || undefined, emotion || undefined)
    }
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
            <h1 className="text-4xl font-bold text-foreground mb-2">Explore Books</h1>
            <p className="text-muted-foreground">Discover Indian literature through language, emotion, and more</p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-12">
            <div className="flex gap-2 mb-6">
              <Input
                type="text"
                placeholder="Search books, authors, or topics..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 text-base bg-card border-border"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                Search
              </Button>
            </div>
          </form>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <FilterSidebar
                  selectedLanguage={selectedLanguage}
                  selectedEmotion={selectedEmotion}
                  onLanguageChange={handleLanguageChange}
                  onEmotionChange={handleEmotionChange}
                />
              </div>
            </div>

            {/* Book Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  {results.length} {results.length === 1 ? "Book" : "Books"} Found
                </h2>
              </div>
              <BookGrid books={results} loading={loading} />
            </div>
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
