"use client"

import { EMOTION_COLORS } from "@/lib/nlp-engine"
import type { EmotionType } from "@/lib/nlp-engine"

interface FilterSidebarProps {
  selectedLanguage: string | null
  selectedEmotion: EmotionType | null
  onLanguageChange: (language: string | null) => void
  onEmotionChange: (emotion: EmotionType | null) => void
}

const LANGUAGES = ["English", "Hindi", "Marathi", "Tamil", "Kannada", "Bengali"]
const EMOTIONS: EmotionType[] = [
  "joy",
  "melancholy",
  "peace",
  "romance",
  "adventure",
  "mystery",
  "inspiration",
  "tragedy",
]

export function FilterSidebar({
  selectedLanguage,
  selectedEmotion,
  onLanguageChange,
  onEmotionChange,
}: FilterSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Language Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Language</h3>
        <div className="space-y-2">
          <button
            onClick={() => onLanguageChange(null)}
            className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
              selectedLanguage === null
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted/50"
            }`}
          >
            All Languages
          </button>
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(selectedLanguage === lang ? null : lang)}
              className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                selectedLanguage === lang
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Emotion Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Emotion</h3>
        <div className="space-y-2">
          <button
            onClick={() => onEmotionChange(null)}
            className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
              selectedEmotion === null
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted/50"
            }`}
          >
            All Emotions
          </button>
          {EMOTIONS.map((emotion) => (
            <button
              key={emotion}
              onClick={() => onEmotionChange(selectedEmotion === emotion ? null : emotion)}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded text-sm transition-colors ${
                selectedEmotion === emotion
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: EMOTION_COLORS[emotion] }} />
              <span className="capitalize">{emotion}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
