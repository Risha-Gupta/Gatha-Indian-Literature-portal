"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Browse from "./pages/Browse"
import BookDetail from "./pages/BookDetail"
import Authors from "./pages/Authors"
import Collections from "./pages/Collections"
import Admin from "./pages/Admin"
import "./App.css"

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("English")

  return (
    <Router>
      <div className="app">
        <Header selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Home selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />}
            />
            <Route path="/browse" element={<Browse selectedLanguage={selectedLanguage} />} />
            <Route path="/books/:id" element={<BookDetail selectedLanguage={selectedLanguage} />} />
            <Route path="/authors" element={<Authors selectedLanguage={selectedLanguage} />} />
            <Route path="/collections" element={<Collections selectedLanguage={selectedLanguage} />} />
            <Route path="/admin" element={<Admin selectedLanguage={selectedLanguage} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
