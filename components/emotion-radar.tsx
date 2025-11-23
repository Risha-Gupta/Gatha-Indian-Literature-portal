"use client"

import type { EmotionType } from "@/lib/nlp-engine"
import { EMOTION_COLORS, EMOTION_DESCRIPTIONS } from "@/lib/nlp-engine"

interface EmotionRadarProps {
  primaryEmotion: EmotionType
  allEmotions: Record<EmotionType, number>
}

export function EmotionRadar({ primaryEmotion, allEmotions }: EmotionRadarProps) {
  const emotions = Object.entries(allEmotions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)

  const maxValue = Math.max(...Object.values(allEmotions))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Emotion Analysis</h3>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem', 
          background: 'white', 
          border: '1px solid #e5e7eb', 
          borderRadius: '0.5rem', 
          padding: '1rem' 
        }}>
          <div
            style={{
              width: '5rem',
              height: '5rem',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: EMOTION_COLORS[primaryEmotion] + "20",
              border: `2px solid ${EMOTION_COLORS[primaryEmotion]}`,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: EMOTION_COLORS[primaryEmotion] }}>
                {Math.round((allEmotions[primaryEmotion] / maxValue) * 100)}%
              </div>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Primary Emotion</p>
            <p style={{ fontSize: '1.25rem', fontWeight: '600', textTransform: 'capitalize' }}>{primaryEmotion}</p>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>{EMOTION_DESCRIPTIONS[primaryEmotion]}</p>
          </div>
        </div>
      </div>

      {/* Emotion Breakdown - BOXED WITH THIN BARS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', marginBottom: '0.75rem' }}>
          Emotional Composition
        </p>
        {emotions.map(([emotion, value]) => {
          const percentage = Math.round((value / maxValue) * 100)
          return (
            <div 
              key={emotion} 
              style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                transition: 'box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              {/* Emotion Name and Percentage */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '0.75rem',
                      height: '0.75rem',
                      borderRadius: '9999px',
                      backgroundColor: EMOTION_COLORS[emotion as EmotionType]
                    }}
                  />
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', textTransform: 'capitalize' }}>
                    {emotion}
                  </span>
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{percentage}%</span>
              </div>
              
              {/* THIN Progress Bar */}
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
                    backgroundColor: EMOTION_COLORS[emotion as EmotionType],
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
  )
}
