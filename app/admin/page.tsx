"use client"

import { useState } from "react"
import { mockBooks } from "@/lib/nlp-engine"
import { authors } from "@/lib/authors"
import { StatsCard } from "@/components/stats-card"
import { ViewsChart, LanguageChart, EmotionChart } from "@/components/chart-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock analytics data
const viewsData = [
  { month: "Jan", views: 2400 },
  { month: "Feb", views: 1398 },
  { month: "Mar", views: 9800 },
  { month: "Apr", views: 3908 },
  { month: "May", views: 4800 },
  { month: "Jun", views: 3800 },
]

const languageData = [
  { language: "English", count: 2400 },
  { language: "Hindi", count: 1398 },
  { language: "Tamil", count: 1800 },
  { language: "Marathi", count: 1200 },
  { language: "Kannada", count: 980 },
  { language: "Bengali", count: 890 },
]

const emotionData = [
  { emotion: "Joy", books: 12 },
  { emotion: "Romance", books: 28 },
  { emotion: "Melancholy", books: 35 },
  { emotion: "Inspiration", books: 18 },
  { emotion: "Mystery", books: 22 },
  { emotion: "Peace", books: 31 },
  { emotion: "Adventure", books: 15 },
  { emotion: "Tragedy", books: 19 },
]

export default function AdminDashboard() {
  const [tab, setTab] = useState<"overview" | "books" | "users" | "analytics">("overview")

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
          <Button variant="ghost" className="text-foreground hover:bg-primary/10">
            Logout
          </Button>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Admin Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage and monitor your literature portal</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {(["overview", "books", "users", "analytics"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  tab === t
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground border border-border hover:border-primary/50"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {tab === "overview" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard label="Total Books" value={mockBooks.length} icon="📚" change="+2 this month" />
                <StatsCard label="Authors" value={authors.length} icon="✍️" change="+1 this month" />
                <StatsCard label="Total Views" value="28,456" icon="👁️" change="+12% from last month" />
                <StatsCard label="Avg. Rating" value="4.5" icon="⭐" change="Stable" />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Views</h3>
                  <ViewsChart data={viewsData} />
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Books by Language</h3>
                  <LanguageChart data={languageData} />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                    Add New Book
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10 w-full bg-transparent"
                  >
                    Add Author
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10 w-full bg-transparent"
                  >
                    Create Collection
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Books Tab */}
          {tab === "books" && (
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Manage Books</h2>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Add Book</Button>
                </div>

                {/* Books Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Title</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Author</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Language</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Emotion</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Rating</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockBooks.map((book) => (
                        <tr key={book.id} className="border-b border-border hover:bg-muted/30 transition">
                          <td className="py-3 px-4 text-foreground">{book.title}</td>
                          <td className="py-3 px-4 text-muted-foreground">{book.author}</td>
                          <td className="py-3 px-4">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                              {book.language}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="capitalize text-muted-foreground">{book.emotion}</span>
                          </td>
                          <td className="py-3 px-4 font-medium text-accent">★ {book.rating}</td>
                          <td className="py-3 px-4">
                            <button className="text-primary hover:text-primary/80 text-xs font-medium">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {tab === "users" && (
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">User Statistics</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <StatsCard label="Active Users" value="1,234" icon="👥" change="+15% this month" />
                  <StatsCard label="New Signups" value="187" icon="🆕" change="+22% this month" />
                  <StatsCard label="Avg. Session" value="8m 24s" icon="⏱️" change="-2m from last week" />
                </div>

                {/* Recent Activities */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Recent User Activity</h3>
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">User Activity</p>
                          <p className="text-xs text-muted-foreground">{i + 1} hour ago</p>
                        </div>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Active</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {tab === "analytics" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Books by Emotion</h3>
                  <EmotionChart data={emotionData} />
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Popular Searches</h3>
                  <div className="space-y-3">
                    {[
                      { term: "love stories", count: 2345, trend: "↑ +12%" },
                      { term: "Indian classics", count: 1876, trend: "↑ +8%" },
                      { term: "peaceful reads", count: 1234, trend: "↑ +5%" },
                      { term: "Hindi literature", count: 987, trend: "↓ -3%" },
                      { term: "author profiles", count: 654, trend: "↑ +2%" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium text-foreground capitalize">{item.term}</p>
                          <p className="text-xs text-muted-foreground">{item.count} searches</p>
                        </div>
                        <span
                          className={`text-sm font-medium ${item.trend.includes("↑") ? "text-green-600" : "text-red-600"}`}
                        >
                          {item.trend}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Statistics */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Content Statistics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Total Collections</p>
                    <p className="text-3xl font-bold text-primary">5</p>
                    <p className="text-xs text-green-600">All active</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Languages Covered</p>
                    <p className="text-3xl font-bold text-accent">6</p>
                    <p className="text-xs text-green-600">All populated</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Avg. Rating</p>
                    <p className="text-3xl font-bold text-secondary">4.5</p>
                    <p className="text-xs text-green-600">Above target</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>© 2025 Indian Literature Portal Admin. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
