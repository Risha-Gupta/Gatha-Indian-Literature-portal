"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import FilterSidebar from "../components/FilterSidebar"
import BookGrid from "../components/BookGrid"
import apiClient from "../lib/api"
import "./Pages.css"

const LANGUAGES = ["English", "Hindi", "Marathi", "Tamil", "Kannada", "Bengali"]
const EMOTIONS = ["romance", "melancholy", "peace", "joy", "inspiration", "wisdom", "devotion", "tragedy"]
const CONTENT_TYPES = ["prose", "poetry", "bhajan", "dohas", "songs", "folk_songs"]

export default function Browse({ selectedLanguage }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filteredBooks, setFilteredBooks] = useState([])
  
  // ✅ FIX: Decode URL params for display
  const [query, setQuery] = useState(decodeURIComponent(searchParams.get("q") || ""))
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState(decodeURIComponent(searchParams.get("language") || ""))
  const [selectedEmotion, setSelectedEmotion] = useState(decodeURIComponent(searchParams.get("emotion") || ""))
  const [selectedContentType, setSelectedContentType] = useState(decodeURIComponent(searchParams.get("type") || ""))
  const [loading, setLoading] = useState(false)

  const bookIdParam = searchParams.get("bookId")
  const authorIdParam = searchParams.get("authorId")

  // ✅ FIX: Sync state with URL params and decode them
  useEffect(() => {
    const urlQuery = searchParams.get("q")
    const urlLanguage = searchParams.get("language")
    const urlEmotion = searchParams.get("emotion")
    const urlType = searchParams.get("type")
    
    if (urlQuery) setQuery(decodeURIComponent(urlQuery))
    if (urlLanguage) setSelectedLanguageFilter(decodeURIComponent(urlLanguage))
    if (urlEmotion) setSelectedEmotion(decodeURIComponent(urlEmotion))
    if (urlType) setSelectedContentType(decodeURIComponent(urlType))
    
    applyFilters()
  }, [searchParams])

  const applyFilters = async () => {
    setLoading(true)
    try {
      // Get current params from URL (already encoded)
      const urlQuery = searchParams.get("q") || ""
      const urlEmotion = searchParams.get("emotion") || ""
      
      let response;
      
      if (urlQuery || urlEmotion) {
        // Simple search with semantic ranking
        const params = new URLSearchParams()
        if (urlQuery) params.set("q", urlQuery)
        if (urlEmotion) params.set("emotion", urlEmotion)
        if (selectedLanguageFilter) params.set("language", selectedLanguageFilter)
        if (selectedContentType) params.set("content_type", selectedContentType)
        
        response = await apiClient.searchBooks(params.toString())
      } else {
        // Advanced search for complex filters
        response = await apiClient.advancedSearch({
          language: selectedLanguageFilter,
          content_type: selectedContentType,
          bookId: bookIdParam,
          authorId: authorIdParam,
        })
      }

      let books = []
      if (response?.success && Array.isArray(response?.data)) {
        books = response.data
      } else if (Array.isArray(response?.data)) {
        books = response.data
      } else {
        books = []
      }

      setFilteredBooks(books)
    } catch (error) {
      console.error("Filter error:", error)
      setFilteredBooks([])
    } finally {
      setLoading(false)
    }
  }

  const handleLanguageClick = (lang) => {
    const newLang = lang === "All Languages" ? "" : lang
    setSelectedLanguageFilter(newLang)
    
    // Update URL
    const params = new URLSearchParams(searchParams)
    if (newLang) {
      params.set("language", newLang)
    } else {
      params.delete("language")
    }
    setSearchParams(params)
  }

  const handleEmotionClick = (emotion) => {
    const newEmotion = selectedEmotion === emotion ? "" : emotion
    setSelectedEmotion(newEmotion)
    
    // Update URL
    const params = new URLSearchParams(searchParams)
    if (newEmotion) {
      params.set("emotion", newEmotion)
    } else {
      params.delete("emotion")
    }
    setSearchParams(params)
  }

  const handleContentTypeClick = (type) => {
    const newType = selectedContentType === type ? "" : type
    setSelectedContentType(newType)
    
    // Update URL
    const params = new URLSearchParams(searchParams)
    if (newType) {
      params.set("type", newType)
    } else {
      params.delete("type")
    }
    setSearchParams(params)
  }

  const handleSearch = (q) => {
    setQuery(q)
    
    // Update URL
    const params = new URLSearchParams(searchParams)
    if (q) {
      params.set("q", q)
    } else {
      params.delete("q")
    }
    setSearchParams(params)
  }

  const clearFilters = () => {
    setQuery("")
    setSelectedLanguageFilter("")
    setSelectedEmotion("")
    setSelectedContentType("")
    setSearchParams(new URLSearchParams())
  }

  const isSearchFocused = query || selectedEmotion || bookIdParam || authorIdParam
  const searchLabel = selectedEmotion
    ? `emotion: ${selectedEmotion}`
    : query
      ? `"${query}"`
      : bookIdParam
        ? "selected book"
        : authorIdParam
          ? "selected author"
          : ""

  return (
    <div className="browse-page">
      <div className="browse-container">
        <div className="search-section">
          <SearchBar onSearch={handleSearch} initialValue={query} />
        </div>

        <div className="browse-content">
          <FilterSidebar
            languages={LANGUAGES}
            emotions={EMOTIONS}
            contentTypes={CONTENT_TYPES}
            selectedLanguage={selectedLanguageFilter}
            selectedEmotion={selectedEmotion}
            selectedContentType={selectedContentType}
            onLanguageClick={handleLanguageClick}
            onEmotionClick={handleEmotionClick}
            onContentTypeClick={handleContentTypeClick}
            onClearFilters={clearFilters}
          />

          <div className="books-section">
            <div className="results-header">
              <h2>
                {loading ? "Loading..." : `Results: ${filteredBooks.length} books found`}
                {isSearchFocused && searchLabel && (
                  <span style={{ marginLeft: "1rem", fontSize: "0.9em", color: "#666" }}>for {searchLabel}</span>
                )}
              </h2>
              {(query || selectedLanguageFilter || selectedEmotion || selectedContentType) && (
                <button className="clear-btn" onClick={clearFilters}>
                  Clear Filters
                </button>
              )}
            </div>
            <BookGrid books={filteredBooks} />
          </div>
        </div>
      </div>
    </div>
  )
}
