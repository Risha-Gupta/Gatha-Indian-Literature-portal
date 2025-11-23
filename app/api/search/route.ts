import {
  searchBooks,
  getBooksByLanguage,
  getBooksByEmotion,
  getTrendingBooks,
  getRecommendations,
} from "@/lib/nlp-engine"
import type { EmotionType } from "@/lib/nlp-engine"

// CORS headers configuration
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // or specify "http://localhost:3000"
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

// Handle OPTIONS preflight request
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const language = searchParams.get("language")
  const emotion = searchParams.get("emotion")
  const type = searchParams.get("type") || "search"

  try {
    let results

    if (type === "trending") {
      results = getTrendingBooks()
    } else if (type === "emotion" && emotion) {
      results = getBooksByEmotion(emotion as EmotionType)
    } else if (type === "language" && language) {
      results = getBooksByLanguage(language)
    } else if (type === "recommendations" && query) {
      results = getRecommendations(query)
    } else {
      results = searchBooks(query || "", language || undefined, emotion as EmotionType | undefined)
    }

    return new Response(JSON.stringify({
      success: true,
      data: results,
      count: results.length,
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: "Search failed",
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    })
  }
}
