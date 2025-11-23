"use client"

import { useState } from "react"
import apiClient from "../lib/api"
import "./AdvancedSearchModal.css"

const LANGUAGES = ["English", "Hindi", "Marathi", "Tamil", "Kannada", "Bengali"]
const EMOTIONS = ["romance", "melancholy", "peace", "joy", "inspiration", "wisdom", "devotion", "tragedy"]
const CONTENT_TYPES = ["prose", "poetry", "bhajan", "dohas", "songs", "folk_songs", "ghazals"]

export default function AdvancedSearchModal({ isOpen, onClose, onResults }) {
  const [query, setQuery] = useState("")
  const [language, setLanguage] = useState("")
  const [emotion, setEmotion] = useState("")
  const [contentType, setContentType] = useState("")
  const [loading, setLoading] = useState(false)
  const [detectedEmotion, setDetectedEmotion] = useState(null)

  const handleSearch = async () => {
    setLoading(true)
    try {
      const response = await apiClient.advancedSearch({
        q: query,
        language,
        emotion,
        content_type: contentType,
      })

      if (response?.success && Array.isArray(response?.data)) {
        setDetectedEmotion(response?.detected_emotion || null)
        onResults({
          books: response.data,
          filters: response?.filters || {},
          detectedEmotion: response?.detected_emotion || null,
        })
      } else if (Array.isArray(response?.data)) {
        setDetectedEmotion(response?.detected_emotion || null)
        onResults({
          books: response.data,
          filters: response?.filters || {},
          detectedEmotion: response?.detected_emotion || null,
        })
      } else {
        onResults({
          books: [],
          filters: {},
          detectedEmotion: null,
        })
      }
    } catch (error) {
      console.error("Advanced search error:", error)
      onResults({
        books: [],
        filters: {},
        detectedEmotion: null,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setQuery("")
    setLanguage("")
    setEmotion("")
    setContentType("")
    setDetectedEmotion(null)
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Advanced Search</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Search Query</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter keywords or author name..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="">All Languages</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Content Type</label>
              <select value={contentType} onChange={(e) => setContentType(e.target.value)}>
                <option value="">All Types</option>
                {CONTENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Emotion</label>
            <div className="emotion-grid">
              {EMOTIONS.map((emo) => (
                <button
                  key={emo}
                  className={`emotion-chip ${emotion === emo ? "active" : ""}`}
                  onClick={() => setEmotion(emotion === emo ? "" : emo)}
                >
                  {emo}
                </button>
              ))}
            </div>
          </div>

          {detectedEmotion && (
            <div className="detected-emotion">
              <p>
                Detected emotion in query: <strong>{detectedEmotion}</strong>
              </p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={handleReset}>
            Reset
          </button>
          <button className="btn-primary" onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </div>
  )
}
