"use client"

import { useState } from "react"
import { authors } from "@/lib/authors"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AuthorsPage() {
  const [selectedAuthor, setSelectedAuthor] = useState(authors[0])

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
            <h1 className="text-4xl font-bold text-foreground mb-2">Meet the Authors</h1>
            <p className="text-muted-foreground">Explore the brilliant minds behind Indian literature</p>
          </div>

          {/* Authors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Author List */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-4 sticky top-24 space-y-2 max-h-[calc(100vh-100px)] overflow-y-auto">
                {authors.map((author) => (
                  <button
                    key={author.id}
                    onClick={() => setSelectedAuthor(author)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedAuthor.id === author.id
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <p className="font-semibold text-sm">{author.name}</p>
                    <p className="text-xs opacity-75">{author.language}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Author Details */}
            <div className="lg:col-span-3 space-y-8">
              <div className="bg-card border border-border rounded-lg p-8">
                {/* Header */}
                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{selectedAuthor.era}</p>
                    <h2 className="text-4xl font-bold text-foreground">{selectedAuthor.name}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                      {selectedAuthor.language}
                    </span>
                    <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
                      {selectedAuthor.notableBooksCount} Notable Works
                    </span>
                  </div>
                </div>

                {/* Biography */}
                <div className="space-y-6 mb-8 pb-8 border-b border-border">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Biography</h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedAuthor.biography}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Literary Influence</h3>
                    <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                      <p className="text-foreground">{selectedAuthor.influence}</p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <Link href="/browse">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Explore {selectedAuthor.name.split(" ")[0]}'s Works
                  </Button>
                </Link>
              </div>

              {/* Timeline or Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-primary mb-1">{selectedAuthor.notableBooksCount}</p>
                  <p className="text-sm text-muted-foreground">Notable Works</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-accent mb-1">{selectedAuthor.language}</p>
                  <p className="text-sm text-muted-foreground">Primary Language</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-secondary mb-1">Classic</p>
                  <p className="text-sm text-muted-foreground">Status</p>
                </div>
              </div>
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
