"use client"

import { useNavigate } from "react-router-dom"
import "./BookGrid.css"

export default function BookGrid({ books }) {
  const navigate = useNavigate()

  if (!Array.isArray(books) || books.length === 0) {
    return <div className="empty-state">No books found. Try adjusting your filters.</div>
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <div
          key={book?.id || Math.random()}
          className="book-card"
          onClick={() => navigate(`/books/${book?.id}`)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate(`/books/${book?.id}`)
            }
          }}
        >
          <div className="book-cover">
            {book?.cover_image ? (
              <img 
                src={book.cover_image} 
                alt={book.title}
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
          <div className="book-card-content">
            <h3 className="book-card-title">{book?.title || "Unknown Title"}</h3>
            <p className="book-card-author">{book?.author || "Unknown Author"}</p>
            <div className="book-card-meta">
              <span className="meta-lang">{book?.language || "N/A"}</span>
              <span className="meta-type">{book?.content_type || book?.contentType || "N/A"}</span>
            </div>
            {book?.year && (
              <div className="book-card-year">
                <span>{book.year}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
