"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "../lib/api"
import "./SearchBar.css"

const VALID_EMOTIONS = ["devotion", "wisdom", "tragedy", "melancholy", "inspiration", "joy", "peace", "romance"]

export default function SearchBar({ onSearch, initialValue = "" }) {
  const [input, setInput] = useState(initialValue)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Detect if input is an emotion
  const detectEmotion = (query) => {
    const lowerQuery = query.toLowerCase().trim()
    return VALID_EMOTIONS.find(emotion => lowerQuery === emotion)
  }

  useEffect(() => {
    if (input.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const response = await apiClient.getAutocomplete(input)
        if (response?.success && Array.isArray(response?.data)) {
          const suggestions = response.data.map((item) => {
            const lowerItem = item?.toLowerCase?.() || ""
            const isEmotion = VALID_EMOTIONS.some((emotion) => lowerItem === emotion)
            return {
              value: item || "",
              type: isEmotion ? "emotion" : "result", // Changed from "book" to "result"
            }
          })
          setSuggestions(suggestions)
          setShowSuggestions(true)
        } else if (Array.isArray(response?.data)) {
          setSuggestions(response.data.map((title) => ({ value: title || "", type: "result" })))
          setShowSuggestions(true)
        } else {
          setSuggestions([])
        }
      } catch (error) {
        console.error("Autocomplete error:", error)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [input])

  const handleSearch = () => {
    if (input.trim()) {
      const params = new URLSearchParams()
      
      // Check if input is an emotion FIRST
      const detectedEmotion = detectEmotion(input)
      
      if (detectedEmotion) {
        // If it's an emotion, use emotion filter
        params.set("emotion", detectedEmotion)
      } else {
        // Otherwise, regular search query
        params.set("q", input)
      }
      
      params.set("source", "manual")

      onSearch?.(input)
      navigate(`/browse?${params.toString()}`)
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    const value = suggestion?.value || ""
    const params = new URLSearchParams()
    
    if (suggestion?.type === "emotion") {
      // Emotion suggestion clicked
      params.set("emotion", value)
    } else {
      // Book/author suggestion clicked
      params.set("q", encodeURIComponent(value))
    }
    
    params.set("source", "autocomplete")

    navigate(`/browse?${params.toString()}`)
    setInput(value)
    setShowSuggestions(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search books, authors, or browse by emotion..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="search-btn" onClick={handleSearch}>
          {loading ? "..." : "Search"}
        </button>
      </div>

      {showSuggestions && Array.isArray(suggestions) && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((sugg, idx) => (
            <div key={idx} className="suggestion-item" onClick={() => handleSuggestionClick(sugg)}>
              <span className="sugg-type">{sugg?.type || "result"}</span>
              <span className="sugg-value">{sugg?.value || "N/A"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
