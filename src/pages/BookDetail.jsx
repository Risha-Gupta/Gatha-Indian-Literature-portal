"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import apiClient from "../lib/api"
import "./Pages.css"

export default function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [emotions, setEmotions] = useState({})

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookResponse = await apiClient.fetchBookById(Number.parseInt(id))
        if (bookResponse?.success && bookResponse?.data && typeof bookResponse.data === "object") {
          setBook(bookResponse.data)
          setRelated(Array.isArray(bookResponse?.related) ? bookResponse.related : [])

          // Get emotion analysis with safety check
          const emotionResponse = await apiClient.fetchBookEmotions(Number.parseInt(id))
          if (
            emotionResponse?.success &&
            emotionResponse?.data?.emotions &&
            typeof emotionResponse.data.emotions === "object"
          ) {
            setEmotions(emotionResponse.data.emotions)
          } else {
            setEmotions({})
          }
        }
      } catch (error) {
        console.error("Error fetching book:", error)
        setBook(null)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  if (loading) {
    return (
      <div className="book-detail-page">
        <p>Loading book details...</p>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="book-detail-page">
        <p>Book not found</p>
      </div>
    )
  }

  return (
    <div className="book-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="book-detail-container">
        <div className="book-header">
          <div className="book-cover-placeholder">
            {book?.cover_image ? (
              <img 
                src={book.cover_image} 
                alt={book.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '📖'
                }}
              />
            ) : (
              <span style={{ fontSize: '80px' }}>📖</span>
            )}
          </div>

          <div className="book-info">
            <h1 className="book-title">{book?.title || "Unknown"}</h1>
            <p className="book-author">{book?.author || "Unknown"}</p>

            <div className="book-meta">
              <span className="meta-item">
                <strong>Language:</strong> {book?.language || "N/A"}
              </span>
              <span className="meta-item">
                <strong>Type:</strong> {book?.content_type || book?.contentType || "N/A"}
              </span>
              <span className="meta-item">
                <strong>Year:</strong> {book?.year || "N/A"}
              </span>
              <span className="meta-item">
                <strong>Original Language:</strong> {book?.original_language || "N/A"}
              </span>
            </div>

            {emotions && Object.keys(emotions).length > 0 && (
              <div className="emotion-analysis">
                <h3>Emotional Composition</h3>
                <div className="emotion-bars">
                  {Object.entries(emotions).map(([emotion, score]) => {
                    const percentage = Math.round((score || 0) * 100)
                    return (
                      <div 
                        key={emotion} 
                        style={{
                          background: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          padding: '12px',
                          marginBottom: '8px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                      >
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          marginBottom: '8px'
                        }}>
                          <span style={{ 
                            fontSize: '14px', 
                            fontWeight: '500',
                            textTransform: 'capitalize',
                            color: '#1f2937'
                          }}>
                            {emotion}
                          </span>
                          <span style={{ 
                            fontSize: '14px', 
                            fontWeight: '600',
                            color: '#1f2937'
                          }}>
                            {percentage}%
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '6px',
                          backgroundColor: '#f3f4f6',
                          borderRadius: '9999px',
                          overflow: 'hidden'
                        }}>
                          <div 
                            style={{
                              height: '100%',
                              width: `${percentage}%`,
                              backgroundColor: '#d97706',
                              borderRadius: '9999px',
                              transition: 'width 0.5s ease-out'
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="book-tags">
              {book?.keywords && Array.isArray(book.keywords) && book.keywords.length > 0
                ? book.keywords.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))
                : null}
            </div>
          </div>
        </div>

        <div className="book-content">
          <section className="excerpt-section">
            <h3>Excerpt</h3>
            <p className="excerpt-text">{book?.excerpt || "No excerpt available"}</p>
          </section>

          {book?.themes && Array.isArray(book.themes) && book.themes.length > 0 && (
            <section className="themes-section">
              <h3>Themes</h3>
              <ul>
                {book.themes.map((theme, idx) => (
                  <li key={idx}>{theme || "N/A"}</li>
                ))}
              </ul>
            </section>
          )}

          {book?.characters && Array.isArray(book.characters) && book.characters.length > 0 && (
            <section className="characters-section">
              <h3>Key Characters</h3>
              <ul>
                {book.characters.map((char, idx) => (
                  <li key={idx}>{char || "N/A"}</li>
                ))}
              </ul>
            </section>
          )}

          {related && Array.isArray(related) && related.length > 0 && (
            <section className="related-section">
              <h3>Related Books</h3>
              <div className="related-grid">
                {related.map((r_book) => (
                  <div
                    key={r_book?.id || Math.random()}
                    className="related-card"
                    onClick={() => navigate(`/books/${r_book?.id}`)}
                  >
                    <div className="related-cover">
                      {r_book?.cover_image ? (
                        <img 
                          src={r_book.cover_image} 
                          alt={r_book.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '4px'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.parentElement.innerHTML = '📖'
                          }}
                        />
                      ) : (
                        '📖'
                      )}
                    </div>
                    <p className="related-title">{r_book?.title || "Unknown"}</p>
                    <p className="related-author">{r_book?.author || "Unknown"}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
