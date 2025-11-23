"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import BookGrid from "../components/BookGrid"
import apiClient from "../lib/api"
import "./Pages.css"

export default function Home({ selectedLanguage, setSelectedLanguage }) {
  const [featuredBooks, setFeaturedBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await apiClient.fetchBooks({ q: "" })
        if (response?.success && Array.isArray(response?.data) && response.data.length > 0) {
          setFeaturedBooks(response.data.slice(0, 4))
        } else if (Array.isArray(response?.data)) {
          setFeaturedBooks(response.data.slice(0, 4))
        } else {
          setFeaturedBooks([])
        }
      } catch (error) {
        console.error("Error fetching featured books:", error)
        setFeaturedBooks([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedBooks()
  }, [])

  const handleSearch = (query) => {
    navigate(`/browse?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Gatha</h1>
          <p className="hero-subtitle">
            Discover timeless Indian literature across 6 languages with intelligent search
          </p>

          <SearchBar onSearch={handleSearch} />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Gatha?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <img 
                src="/icons/smart-search.png" 
                alt="Smart Search"
                style={{ width: '80px', height: '80px', objectFit: 'contain' }}
              />
            </div>
            <h3>Smart Search</h3>
            <p>Find books by meaning, not just keywords</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <img 
                src="/icons/emotion-analysis.png" 
                alt="Emotion Analysis"
                style={{ width: '80px', height: '80px', objectFit: 'contain' }}
              />
            </div>
            <h3>Emotion Analysis</h3>
            <p>Discover books matching your mood</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <img 
                src="/icons/languages.png" 
                alt="6 Languages"
                style={{ width: '80px', height: '80px', objectFit: 'contain' }}
              />
            </div>
            <h3>6 Languages</h3>
            <p>Hindi, Marathi, Tamil, Kannada, Bengali & English</p>
          </div>
        </div>
      </section>
      
      {/* Featured Books Section */}
      <section className="featured-section">
        <h2>Featured Classics</h2>
        {loading ? <p>Loading...</p> : <BookGrid books={featuredBooks} />}
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Explore?</h2>
        <button className="cta-btn" onClick={() => navigate("/browse")}>
          Browse All Books
        </button>
      </section>
    </div>
  )
}
