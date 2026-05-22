# Gatha - Indian Literature Portal

**Gatha** is a website where you can discover, browse, and explore Indian literature from different languages, genres, and time periods. The name *Gatha* (गाथा) comes from Sanskrit and means "narrative" or "tale", which felt like a good fit for a platform trying to bring Indian literary works into one place.

The frontend is built with React and the backend runs on Flask with PyTorch handling the smart search features. I built this as a full-stack project to make Indian literature easier to find and explore.

***

## What it does

- **Browse and Search** - filter books by language, genre, time period, and author
- **Book Detail pages** - each book gets its own page with a summary, metadata, and related titles
- **Author profiles** - separate pages for authors with all their listed works
- **Curated Collections** - reading lists grouped by theme or genre
- **NLP-powered search** - you can search in plain English like "coming of age story set in rural Bengal" and actually get relevant results, instead of needing exact titles
- **Admin panel** - for managing the book catalogue
- **Dark and light mode** - both are supported

***

## Tech Stack

**Frontend**
- React 18 + React Router v6
- Tailwind CSS v4
- Radix UI (for accessible, ready-made components)
- Recharts (for data visualizations)
- TypeScript support

**Backend**
- Flask 3.0 (REST API)
- PyTorch + Hugging Face Transformers
- Sentence Transformers for semantic search
- `langdetect` for language detection
- Flask-CORS for handling cross-origin requests

***

## Project Structure

```
Gatha-Indian-Literature-portal/
├── src/
│   ├── pages/          # Route-level components (Home, Browse, BookDetail, Authors, Collections, Admin)
│   ├── components/     # Reusable UI components
│   └── lib/            # Utility functions
├── components/         # Top-level shared components
├── backend/
│   ├── app.py          # Flask API entry point and route definitions
│   ├── nlp_engine.py   # Semantic search and NLP logic
│   ├── book_processor.py  # Book data processing utilities
│   ├── mock_database.py   # In-memory data store (dev/demo mode)
│   ├── config.py          # App configuration
│   └── requirements.txt
├── public/
└── styles/
```

***

## Getting Started

### Prerequisites

- Node.js >= 18
- Python >= 3.9
- npm or pnpm

### Frontend Setup

```bash
# Clone the repo
git clone https://github.com/Risha-Gupta/Gatha-Indian-Literature-portal.git
cd Gatha-Indian-Literature-portal

# Install dependencies
npm install

# Start the dev server
npm start
```

App runs at `http://localhost:3000`

### Backend Setup

```bash
cd backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the Flask server
python app.py
```

API runs at `http://localhost:5000`

> **Note:** The backend will download transformer models the first time you run it, so it might take a few minutes depending on your internet speed. If the backend is not running, the app will fall back to the mock database and still work in demo mode.

***

## Pages

| Route | Page |
|-------|------|
| `/` | Home page with featured books and collections |
| `/browse` | Browse all books with filters |
| `/book/:id` | Book detail page |
| `/authors` | Authors directory |
| `/collections` | Curated collections |
| `/admin` | Admin dashboard |

***

## Notes

- `mock_database.py` is the current data source. It is a Python file with all the book data, so you do not need to set up an external database to run the project locally.
- The NLP search uses sentence-transformers to understand what you are looking for based on meaning, not just keywords.
- Vercel Analytics is set up on the frontend via `@vercel/analytics`.

***

## Contributing

Pull requests are welcome. If you want to add books, fix something, or improve the UI, open an issue first so we can talk about it, then go ahead with a PR.

***

## License

MIT

***

*Made with a lot of coffee and genuine love for Indian literature.*
