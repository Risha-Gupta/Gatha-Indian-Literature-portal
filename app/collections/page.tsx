"use client"

import { collections } from "@/lib/authors"
import { mockBooks } from "@/lib/nlp-engine"
import { BookGrid } from "@/components/book-grid"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export default function CollectionsPage() {
  const [selectedCollection, setSelectedCollection] = useState(collections[0])
  const books = mockBooks.filter((book) => selectedCollection.bookIds.includes(book.id))

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
            <h1 className="text-4xl font-bold text-foreground mb-2">Curated Collections</h1>
            <p className="text-muted-foreground">Discover carefully organized collections of Indian literature</p>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => setSelectedCollection(collection)}
                className={`text-left p-6 rounded-lg border-2 transition-all ${
                  selectedCollection.id === collection.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground text-lg">{collection.name}</h3>
                  <p className="text-sm text-muted-foreground">{collection.description}</p>
                  <p className="text-xs text-muted-foreground pt-2">
                    {collection.bookIds.length} {collection.bookIds.length === 1 ? "book" : "books"}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Collection Details */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-sm text-muted-foreground mb-2 capitalize">{selectedCollection.theme} theme</p>
                  <h2 className="text-3xl font-bold text-foreground">{selectedCollection.name}</h2>
                </div>
                <p className="text-muted-foreground">{selectedCollection.description}</p>
                <div className="flex gap-3">
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium capitalize">
                    {selectedCollection.theme}
                  </span>
                  <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
                    {selectedCollection.bookIds.length} Books
                  </span>
                </div>
              </div>
            </div>

            {/* Books in Collection */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Books in This Collection</h3>
              <BookGrid books={books} />
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
