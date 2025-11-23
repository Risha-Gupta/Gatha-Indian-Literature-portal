"use client"
import "./FilterSidebar.css"

export default function FilterSidebar({
  languages,
  emotions,
  contentTypes,
  selectedLanguage,
  selectedEmotion,
  selectedContentType,
  onLanguageClick,
  onEmotionClick,
  onContentTypeClick,
  onClearFilters,
}) {
  return (
    <aside className="filter-sidebar">
      <div className="filter-section">
        <h3>Filter Results</h3>
        <button className="clear-btn-small" onClick={onClearFilters}>
          Clear All
        </button>
      </div>

      {/* Language Filter */}
      <div className="filter-group">
        <h4>Language</h4>
        <div className="filter-options">
          {languages.map((lang) => (
            <button
              key={lang}
              className={`filter-btn ${selectedLanguage === lang ? "active" : ""}`}
              onClick={() => onLanguageClick(lang)}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Emotion Filter */}
      <div className="filter-group">
        <h4>Emotion</h4>
        <div className="filter-options">
          {emotions.map((emotion) => (
            <button
              key={emotion}
              className={`filter-btn emotion-btn ${selectedEmotion === emotion ? "active" : ""}`}
              onClick={() => onEmotionClick(emotion)}
              title={emotion}
            >
              {emotion}
            </button>
          ))}
        </div>
      </div>

      {/* Content Type Filter (NO GHAZALS!) */}
      <div className="filter-group">
        <h4>Content Type</h4>
        <div className="filter-options">
          {contentTypes.map((type) => (
            <button
              key={type}
              className={`filter-btn type-btn ${selectedContentType === type ? "active" : ""}`}
              onClick={() => onContentTypeClick(type)}
            >
              {type.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
