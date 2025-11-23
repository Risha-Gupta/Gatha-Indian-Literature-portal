// Author profiles database

export interface Author {
  id: string
  name: string
  language: string
  era: string
  biography: string
  notableBooksCount: number
  influence: string
  booksIds: string[]
}

export interface Collection {
  id: string
  name: string
  description: string
  bookIds: string[]
  theme: string
}

export const authors: Author[] = [
  {
    id: "author-1",
    name: "Sarat Chandra Chattopadhyay",
    language: "Bengali",
    era: "1876 - 1938",
    biography:
      "Sarat Chandra Chattopadhyay was one of the most celebrated Bengali novelists of the 20th century. His works explored themes of social reform, romance, and the human condition with remarkable sensitivity. His novels have been translated into multiple languages and adapted for film and theater worldwide.",
    notableBooksCount: 3,
    influence: "Pioneer of modern Bengali fiction, deeply influenced Indian literature and social thought",
    booksIds: ["1"],
  },
  {
    id: "author-2",
    name: "Munshi Premchand",
    language: "Hindi",
    era: "1880 - 1936",
    biography:
      "Munshi Premchand is considered the father of modern Hindi literature. He wrote extensively about rural life and social issues, bringing realism and empathy to his storytelling. His works remain classics in Hindi and Urdu literature.",
    notableBooksCount: 4,
    influence: "Founder of modern Hindi and Urdu fiction, pioneer of social realism in Indian literature",
    booksIds: ["2"],
  },
  {
    id: "author-3",
    name: "R.K. Narayan",
    language: "English",
    era: "1906 - 2001",
    biography:
      "Rasipuram Krishnaswamy Iyer Narayanaswami, known as R.K. Narayan, was an acclaimed Indian writer known for his unique narrative style and charming depictions of South Indian life. His works have been translated into numerous languages.",
    notableBooksCount: 5,
    influence: "Master of English fiction in Indian context, brought South Indian culture to global audience",
    booksIds: ["3"],
  },
  {
    id: "author-4",
    name: "Kalidasa",
    language: "Sanskrit",
    era: "4th - 5th Century",
    biography:
      "Kalidasa is considered one of the greatest Sanskrit poets and playwrights in history. His works epitomize classical Indian literature at its finest, blending sophistication with accessibility. His plays and poems have influenced literature across Asia.",
    notableBooksCount: 6,
    influence: "Greatest of Sanskrit poets, shaped classical aesthetics of Indian literature",
    booksIds: ["5"],
  },
  {
    id: "author-5",
    name: "Jnaneshwar",
    language: "Marathi",
    era: "1275 - 1296",
    biography:
      "Jnaneshwar was a renowned philosopher and poet who wrote the Jnaneshwari, a profound commentary on the Bhagavad Gita. At just 21 years old, he composed this masterpiece that remains influential in Marathi and Hindu philosophy.",
    notableBooksCount: 2,
    influence: "Spiritual philosopher whose works bridge knowledge and devotion in Marathi literature",
    booksIds: ["6"],
  },
  {
    id: "author-6",
    name: "Ilango Adigal",
    language: "Tamil",
    era: "2nd - 3rd Century",
    biography:
      "Ilango Adigal is the author of Silappatikaram, one of the five great epics of Tamil literature. This ancient work is a masterpiece of Tamil poetic and narrative tradition, blending love, justice, and fate.",
    notableBooksCount: 3,
    influence: "Pioneer of Tamil epic literature, creator of one of the oldest surviving Tamil texts",
    booksIds: ["8"],
  },
]

export const collections: Collection[] = [
  {
    id: "collection-1",
    name: "Indian Classics",
    description: "The most celebrated works of Indian literature spanning centuries and languages",
    bookIds: ["1", "2", "5", "6", "8"],
    theme: "timeless",
  },
  {
    id: "collection-2",
    name: "Modern Realism",
    description: "Groundbreaking works that brought realism and social consciousness to Indian fiction",
    bookIds: ["1", "2", "3"],
    theme: "realistic",
  },
  {
    id: "collection-3",
    name: "Romantic Tales",
    description: "Stories of passion, devotion, and the complexities of human relationships",
    bookIds: ["1", "4", "5"],
    theme: "romantic",
  },
  {
    id: "collection-4",
    name: "Spiritual Wisdom",
    description: "Works exploring philosophy, spirituality, and the deeper meaning of existence",
    bookIds: ["5", "6", "4"],
    theme: "spiritual",
  },
  {
    id: "collection-5",
    name: "Multilingual Heritage",
    description: "Literature celebrating the diversity of Indian languages and cultures",
    bookIds: ["1", "2", "3", "6", "8"],
    theme: "diverse",
  },
]
