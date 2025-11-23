import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              आ
            </div>
            <span className="text-xl font-bold text-foreground">Indian Literature</span>
          </div>
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

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground text-balance">
              Explore the Rich <span className="text-primary">World of Indian Literature</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Discover timeless classics and contemporary works across 6 languages with AI-powered semantic search and
              emotion analysis
            </p>
          </div>

          {/* Language Selector and Search */}
          <div className="space-y-4 mt-12">
            <LanguageSelector />
            <SearchBar />
          </div>

          {/* Featured Sections */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FeatureCard icon="🔍" title="Semantic Search" description="Find books by meaning, not just keywords" />
            <FeatureCard icon="💫" title="Emotion Detection" description="Discover books matching your mood" />
            <FeatureCard
              icon="🌍"
              title="6 Languages"
              description="Hindi, Marathi, Tamil, Kannada, Bengali & English"
            />
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link href="/browse">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Browse All Books
              </Button>
            </Link>
            <Link href="/collections">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                Explore Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Featured Classics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <BookCard key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Browse</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/browse">All Books</Link>
              </li>
              <li>
                <Link href="/authors">Authors</Link>
              </li>
              <li>
                <Link href="/collections">Collections</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Discover</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/trending">Trending</Link>
              </li>
              <li>
                <Link href="/emotions">By Emotion</Link>
              </li>
              <li>
                <Link href="/languages">By Language</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">About</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/contribute">Contribute</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/api">API Docs</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-secondary/30 mt-8 pt-8 text-sm opacity-75 text-center">
          <p>© 2025 Indian Literature Portal. Celebrating the written heritage of India.</p>
        </div>
      </footer>
    </main>
  )
}

function LanguageSelector() {
  const languages = ["English", "Hindi", "Marathi", "Tamil", "Kannada", "Bengali"]

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {languages.map((lang) => (
        <button
          key={lang}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            lang === "English"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  )
}

function SearchBar() {
  return (
    <div className="flex gap-2 max-w-2xl mx-auto">
      <Input
        type="text"
        placeholder="Search books, authors, or browse by emotion..."
        className="h-12 text-base bg-card border-border placeholder:text-muted-foreground"
      />
      <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
        Search
      </Button>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function BookCard() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <span className="text-4xl">📖</span>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-foreground line-clamp-2">Book Title Here</h3>
        <p className="text-sm text-muted-foreground">Author Name</p>
        <div className="flex gap-1 flex-wrap">
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Hindi</span>
          <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">Classic</span>
        </div>
      </div>
    </div>
  )
}
