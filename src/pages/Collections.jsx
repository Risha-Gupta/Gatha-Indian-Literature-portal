"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BookGrid from "../components/BookGrid"
import apiClient from "../lib/api"
import "./Pages.css"

export default function Collections() {
  const navigate = useNavigate()
  const [collections, setCollections] = useState([])
  const [collectionBooks, setCollectionBooks] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await apiClient.fetchCollections()
        if (response?.success && Array.isArray(response?.data)) {
          setCollections(response.data)

          // Fetch books for each collection with error handling
          const booksMap = {}
          for (const collection of response.data) {
            try {
              const collResponse = await apiClient.fetchCollectionById(collection?.id)
              if (collResponse?.success && collResponse?.data?.books && Array.isArray(collResponse.data.books)) {
                booksMap[collection.id] = collResponse.data.books
              } else if (Array.isArray(collResponse?.data?.books)) {
                booksMap[collection.id] = collResponse.data.books
              } else {
                booksMap[collection.id] = []
              }
            } catch (err) {
              console.error(`Error fetching collection ${collection?.id}:`, err)
              booksMap[collection.id] = []
            }
          }
          setCollectionBooks(booksMap)
        } else {
          setCollections([])
        }
      } catch (error) {
        console.error("Error fetching collections:", error)
        setCollections([])
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  if (loading) {
    return (
      <div className="collections-page">
        <p>Loading collections...</p>
      </div>
    )
  }

  return (
    <div className="collections-page">
      <h1>Curated Collections</h1>
      <p className="collections-intro">Explore handpicked collections of Indian literature</p>

      {Array.isArray(collections)
        ? collections.map((collection) => (
            <section key={collection?.id || Math.random()} className="collection-section">
              <div className="collection-header">
                <div>
                  <h2>{collection?.name || "Unknown Collection"}</h2>
                  <p className="collection-desc">{collection?.description || "No description available"}</p>
                </div>
                <button className="view-all-btn" onClick={() => navigate(`/browse?collection=${collection?.id}`)}>
                  View All →
                </button>
              </div>
              <BookGrid books={collectionBooks[collection?.id] || []} />
            </section>
          ))
        : null}
    </div>
  )
}
