import { Link } from "react-router-dom"
import "./Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Browse</h4>
          <ul>
            <li>
              <Link to="/browse">All Books</Link>
            </li>
            <li>
              <Link to="/authors">Authors</Link>
            </li>
            <li>
              <Link to="/collections">Collections</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/browse">Discover</Link>
            </li>
            <li>
              <Link to="/collections">Featured</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>About</h4>
          <ul>
            <li>
              <a href="#about">About Gatha</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#contribute">Contribute</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="#blog">Blog</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#api">API Docs</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Gatha. Celebrating the written heritage of India.</p>
      </div>
    </footer>
  )
}
