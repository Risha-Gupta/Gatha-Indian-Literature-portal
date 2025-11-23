"use client"

import { useState, useEffect } from "react"
import apiClient from "../lib/api"
import "./Pages.css"

export default function Authors() {
  const [authors, setAuthors] = useState([])
  const [authorBooks, setAuthorBooks] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await apiClient.fetchAuthors()
        let authorsData = []

        if (response?.success && response?.data && Array.isArray(response.data)) {
          authorsData = response.data
        } else if (Array.isArray(response?.data)) {
          authorsData = response.data
        } else {
          authorsData = []
        }

        setAuthors(authorsData)

        const booksMap = {}
        for (const author of authorsData) {
          try {
            const booksResponse = await apiClient.fetchAuthorById(author?.id)
            if (booksResponse?.success && Array.isArray(booksResponse?.books)) {
              booksMap[author.id] = booksResponse.books
            } else if (Array.isArray(booksResponse?.data?.books)) {
              booksMap[author.id] = booksResponse.data.books
            } else {
              booksMap[author.id] = []
            }
          } catch (err) {
            console.error(`Error fetching books for author ${author?.id}:`, err)
            booksMap[author.id] = []
          }
        }
        setAuthorBooks(booksMap)
      } catch (error) {
        console.error("Error fetching authors:", error)
        setAuthors([])
      } finally {
        setLoading(false)
      }
    }

    fetchAuthors()
  }, [])

  if (loading) {
    return (
      <div className="authors-page">
        <p>Loading authors...</p>
      </div>
    )
  }

  return (
    <div className="authors-page">
      <h1>Indian Authors</h1>
      <div className="authors-grid">
        {Array.isArray(authors)
          ? authors.map((author) => {
              const notableWorksCount = authorBooks[author?.id]?.length || 0

              return (
                <div key={author?.id || Math.random()} className="author-card">
                  <div className="author-avatar">✍️</div>
                  <h3 className="author-name">{author?.nameEn || author?.name_en || author?.name || "Unknown"}</h3>
                  <p className="author-era">{author?.era || "N/A"}</p>
                  <p className="author-language">Language: {author?.language || "N/A"}</p>
                  {author?.bio && <p className="author-bio">{author.bio}</p>}
                  {author?.biography && <p className="author-bio">{author.biography}</p>}
                  <p className="author-influence">
                    <strong>{author?.literary_influence || author?.influence || "N/A"}</strong>
                  </p>
                  <p className="author-works">{notableWorksCount} Notable Works</p>
                </div>
              )
            })
          : null}
      </div>
    </div>
  )
}
