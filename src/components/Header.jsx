"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./Header.css"

export default function Header({ selectedLanguage, setSelectedLanguage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const languages = ["English", "Hindi", "Marathi", "Tamil", "Kannada", "Bengali"]

  const isOnBrowsePage = location.pathname === "/browse"

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <Link to="/" className="logo-link" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/logo.png" 
              alt="Gatha Logo" 
              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
            />
            <h1 className="logo-text">Gatha</h1>
          </Link>
        </div>

        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/browse">Browse</Link>
          <Link to="/authors">Authors</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </div>
    </header>
  )
}
