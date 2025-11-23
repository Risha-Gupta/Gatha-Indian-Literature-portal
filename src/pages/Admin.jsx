"use client"

import { useState, useEffect } from "react"
import apiClient from "../lib/api"
import "./Pages.css"

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [books, setBooks] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await apiClient.fetchStatistics()
        if (statsResponse?.success && statsResponse?.data && typeof statsResponse.data === "object") {
          setStats(statsResponse.data)
        } else {
          setStats({})
        }

        const booksResponse = await apiClient.fetchBooks()
        if (booksResponse?.success && Array.isArray(booksResponse?.data)) {
          setBooks(booksResponse.data)
        } else {
          setBooks([])
        }
      } catch (error) {
        console.error("Error fetching admin data:", error)
        setStats({})
        setBooks([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filtered_books = Array.isArray(books)
    ? books.filter(
        (b) =>
          (b?.title?.toLowerCase?.() || "").includes(searchTerm.toLowerCase()) ||
          (b?.author?.toLowerCase?.() || "").includes(searchTerm.toLowerCase()),
      )
    : []

  if (loading) {
    return (
      <div className="admin-page">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats?.total_books || 0}</div>
          <div className="stat-label">Total Books</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats?.total_languages || 0}</div>
          <div className="stat-label">Languages</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{Object.keys(stats?.emotions || {}).length}</div>
          <div className="stat-label">Emotions Tracked</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats?.total_authors || 0}</div>
          <div className="stat-label">Authors</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button className={`tab-btn ${activeTab === "books" ? "active" : ""}`} onClick={() => setActiveTab("books")}>
          Books
        </button>
        <button
          className={`tab-btn ${activeTab === "analytics" ? "active" : ""}`}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="tab-content">
          <h2>Quick Stats</h2>
          <p>Total books in database: {stats?.total_books || 0}</p>
          <p>
            Supported languages:{" "}
            {stats?.languages && Array.isArray(stats.languages) ? stats.languages.join(", ") : "N/A"}
          </p>
          <p>
            Content types:{" "}
            {stats?.content_types && Array.isArray(stats.content_types) ? stats.content_types.join(", ") : "N/A"}
          </p>
        </div>
      )}

      {activeTab === "books" && (
        <div className="tab-content">
          <input
            type="text"
            className="search-input"
            placeholder="Search books or authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className="books-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Language</th>
                <th>Type</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {filtered_books.map((book) => (
                <tr key={book?.id || Math.random()}>
                  <td>{book?.title || "Unknown"}</td>
                  <td>{book?.author || "Unknown"}</td>
                  <td>{book?.language || "N/A"}</td>
                  <td>{book?.content_type || book?.contentType || "N/A"}</td>
                  <td>{book?.year || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="tab-content">
          <h3>Emotion Distribution</h3>
          {stats?.emotions && typeof stats.emotions === "object" ? (
            Object.entries(stats.emotions).map(([emotion, count]) => (
              <div key={emotion} className="bar-chart">
                <span className="bar-label">{emotion}</span>
                <div className="bar" style={{ width: `${((count || 0) / (stats?.total_books || 1)) * 100}%` }}>
                  {count}
                </div>
              </div>
            ))
          ) : (
            <p>No emotion data available</p>
          )}

          <h3 style={{ marginTop: "2rem" }}>Language Distribution</h3>
          {stats?.languages && Array.isArray(stats.languages) ? (
            stats.languages.map((lang) => {
              const count = Array.isArray(books) ? books.filter((b) => b?.language === lang).length : 0
              return (
                <div key={lang} className="bar-chart">
                  <span className="bar-label">{lang}</span>
                  <div className="bar" style={{ width: `${(count / (stats?.total_books || 1)) * 100}%` }}>
                    {count}
                  </div>
                </div>
              )
            })
          ) : (
            <p>No language data available</p>
          )}
        </div>
      )}
    </div>
  )
}
