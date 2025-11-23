import os
from datetime import timedelta

class Config:
    """Flask configuration"""
    DEBUG = True
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'gatha-secret-key-2024'
    
    # NLP Configuration
    LANGUAGES = ['Hindi', 'Marathi', 'Tamil', 'Kannada', 'Bengali', 'English', 'Urdu']
    CONTENT_TYPES = ['prose', 'poetry', 'bhajan', 'dohas', 'songs', 'folk_songs', 'ghazals']
    EMOTIONS = ['romance', 'melancholy', 'peace', 'joy', 'inspiration', 'wisdom', 'devotion', 'tragedy']
    
    # CORS Configuration
    CORS_ORIGINS = ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5000']
    
    # Cache settings
    CACHE_TIMEOUT = 300
    
    # NLP Model settings
    USE_LOCAL_MODELS = True  # Use transformers library locally
    EMBEDDING_MODEL = 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2'
    SIMILARITY_THRESHOLD = 0.3
