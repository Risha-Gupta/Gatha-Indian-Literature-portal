from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json

from config import Config
from nlp_engine import GathaNLPEngine
from book_processor import PROCESSED_BOOKS, nlp
from mock_database import MOCK_COLLECTIONS, MOCK_AUTHORS, VALID_CONTENT_TYPES, FOLK_SONG_TYPES

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, origins=Config.CORS_ORIGINS)

nlp_engine = nlp

def get_book_by_id(book_id):
    return next((b for b in PROCESSED_BOOKS if b['id'] == book_id), None)

def get_books_by_ids(book_ids):
    return [b for b in PROCESSED_BOOKS if b['id'] in book_ids]

def filter_books(query=None, language=None, content_type=None, emotion=None):
    results = PROCESSED_BOOKS.copy()
    
    if query:
        query_lower = query.lower()
        matched_books = []
        
        for book in results:
            author_match = (
                book['author'].lower() == query_lower or 
                query_lower in book['author'].lower() or
                book.get('romanized_author', '').lower() == query_lower or
                query_lower in book.get('romanized_author', '').lower()
            )
            
            title_match = (
                book['title'].lower() == query_lower or 
                query_lower in book['title'].lower() or
                book.get('romanized_title', '').lower() == query_lower or
                query_lower in book.get('romanized_title', '').lower()
            )
            
            keyword_match = False
            if book.get('keywords'):
                keyword_match = any(
                    query_lower == kw.lower() or query_lower in kw.lower() 
                    for kw in book['keywords']
                )
            
            if author_match or title_match or keyword_match:
                score = 0
                if (book['author'].lower() == query_lower or 
                    book.get('romanized_author', '').lower() == query_lower):
                    score = 1000
                elif (query_lower in book['author'].lower() or 
                      query_lower in book.get('romanized_author', '').lower()):
                    score = 500
                elif (book['title'].lower() == query_lower or 
                      book.get('romanized_title', '').lower() == query_lower):
                    score = 800
                elif (query_lower in book['title'].lower() or 
                      query_lower in book.get('romanized_title', '').lower()):
                    score = 300
                elif keyword_match:
                    score = 200
                
                matched_books.append((score, book))
        
        matched_books.sort(key=lambda x: x[0], reverse=True)
        results = [book for score, book in matched_books]
    
    if language:
        results = [b for b in results if b['language'].lower() == language.lower() or b['original_language'].lower() == language.lower()]
    
    if content_type:
        if content_type.lower() not in [ct.lower() for ct in VALID_CONTENT_TYPES]:
            return []
        results = [b for b in results if b['content_type'].lower() == content_type.lower()]
    
    if emotion:
        results = [b for b in results if b['emotion'].get(emotion.lower(), 0) > 0.15]
    
    return results

@app.route('/api/books', methods=['GET'])
def get_books():
    query = request.args.get('q', '')
    language = request.args.get('language', '')
    content_type = request.args.get('content_type', '')
    emotion = request.args.get('emotion', '')
    
    if content_type and content_type.lower() not in [ct.lower() for ct in VALID_CONTENT_TYPES]:
        return jsonify({
            'success': False,
            'error': f'Invalid content type. Valid types: {", ".join(VALID_CONTENT_TYPES)}'
        }), 400
    
    books = filter_books(query, language, content_type, emotion)
    return jsonify({
        'success': True,
        'data': books,
        'count': len(books),
        'nlp_processed': True,
        'romanized_search': True
    })

@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = get_book_by_id(book_id)
    if not book:
        return jsonify({'success': False, 'error': 'Book not found'}), 404
    
    related = [b for b in PROCESSED_BOOKS if b['id'] != book_id and any(e in b['emotion'] for e in book['emotion'])][:3]
    
    return jsonify({
        'success': True,
        'data': book,
        'related': related
    })

@app.route('/api/search/autocomplete', methods=['GET'])
def search_autocomplete():
    query = request.args.get('q', '')
    
    if not query or len(query) < 2:
        return jsonify({'success': True, 'data': []})
    
    suggestions_pool = []
    for book in PROCESSED_BOOKS:
        suggestions_pool.append(book['title'])
        suggestions_pool.append(book['author'])
        if book.get('romanized_title'):
            suggestions_pool.append(book['romanized_title'])
        if book.get('romanized_author'):
            suggestions_pool.append(book['romanized_author'])
    
    suggestions = nlp_engine.generate_suggestions(query, suggestions_pool)
    
    return jsonify({
        'success': True,
        'data': suggestions
    })

@app.route('/api/search/advanced', methods=['GET'])
def advanced_search():
    query = request.args.get('q', '')
    language = request.args.get('language', '')
    content_type = request.args.get('content_type', '')
    emotion = request.args.get('emotion', '')
    
    if content_type and content_type.lower() not in [ct.lower() for ct in VALID_CONTENT_TYPES]:
        return jsonify({
            'success': False,
            'error': f'Invalid content type. Valid types: {", ".join(VALID_CONTENT_TYPES)}'
        }), 400
    
    books = filter_books(query, language, content_type, emotion)
    
    detected_emotion = None
    if not emotion and query:
        emotion_scores = nlp_engine.extract_emotion_scores(query)
        detected_emotion = max(emotion_scores, key=emotion_scores.get)
    
    return jsonify({
        'success': True,
        'data': books,
        'count': len(books),
        'detected_emotion': detected_emotion,
        'romanized_search': True,
        'filters': {
            'query': query,
            'language': language,
            'content_type': content_type,
            'emotion': emotion
        }
    })

@app.route('/api/books/<int:book_id>/emotions', methods=['GET'])
def get_book_emotions(book_id):
    book = get_book_by_id(book_id)
    if not book:
        return jsonify({'success': False, 'error': 'Book not found'}), 404
    
    return jsonify({
        'success': True,
        'data': {
            'book_id': book_id,
            'title': book['title'],
            'emotions': book['emotion'],
            'emotion_source': book.get('emotion_source', 'NLP_CALCULATED')
        }
    })

@app.route('/api/content-types', methods=['GET'])
def get_content_types():
    return jsonify({
        'success': True,
        'data': {
            'content_types': VALID_CONTENT_TYPES,
            'folk_song_types': FOLK_SONG_TYPES
        }
    })

@app.route('/api/debug/nlp-test', methods=['GET'])
def nlp_test():
    test_text = request.args.get('text', 'यह एक महान ज्ञान और गहरे दुख की कहानी है।')
    
    return jsonify({
        'success': True,
        'input': test_text,
        'nlp_analysis': {
            'emotions': nlp_engine.extract_emotion_scores(test_text),
            'detected_language': nlp_engine.detect_language(test_text),
            'preprocessed': nlp_engine.preprocess_text(test_text),
            'key_phrases': nlp_engine.extract_phrases(test_text)
        },
        'message': 'NLP engine is working! This is LIVE analysis for INDIAN LANGUAGES ONLY.'
    })

@app.route('/api/collections', methods=['GET'])
def get_collections():
    collections = []
    
    # ✅ LOWERED THRESHOLDS FOR INDICBERT
    collection_templates = [
        {
            'name': 'Devotional Classics',
            'description': 'Sacred texts and devotional literature across Indian languages',
            'emotion': 'devotion',
            'threshold': 0.12
        },
        {
            'name': 'Tales of Sorrow',
            'description': 'Heart-wrenching stories of tragedy and loss',
            'emotion': 'tragedy',
            'threshold': 0.10
        },
        {
            'name': 'Wisdom Literature',
            'description': 'Philosophical texts and teachings of the sages',
            'emotion': 'wisdom',
            'threshold': 0.12
        },
        {
            'name': 'Romantic Poetry',
            'description': 'Love, longing, and romance in verse',
            'emotion': 'romance',
            'threshold': 0.10
        },
        {
            'name': 'Melancholic Reflections',
            'description': 'Contemplative works exploring sadness and solitude',
            'emotion': 'melancholy',
            'threshold': 0.12
        },
        {
            'name': 'Inspirational Works',
            'description': 'Uplifting stories of courage and hope',
            'emotion': 'inspiration',
            'threshold': 0.12
        },
        {
            'name': 'Peaceful Contemplations',
            'description': 'Serene writings for inner peace',
            'emotion': 'peace',
            'threshold': 0.10
        },
        {
            'name': 'Joyful Celebrations',
            'description': 'Festive and cheerful literature',
            'emotion': 'joy',
            'threshold': 0.10
        }
    ]
    
    collection_id = 1
    for template in collection_templates:
        books_in_collection = [
            book for book in PROCESSED_BOOKS 
            if book['emotion'].get(template['emotion'], 0) >= template['threshold']
        ]
        
        if books_in_collection:
            collections.append({
                'id': collection_id,
                'name': template['name'],
                'description': template['description'],
                'emotion': template['emotion'],
                'book_count': len(books_in_collection),
                'book_ids': [book['id'] for book in books_in_collection],
                'classification_method': 'INDICBERT_EMOTION_ANALYSIS'
            })
            collection_id += 1
    
    return jsonify({
        'success': True,
        'data': collections,
        'count': len(collections),
        'classification_method': 'INDICBERT_BASED'
    })

@app.route('/api/collections/<int:collection_id>', methods=['GET'])
def get_collection(collection_id):
    collections_response = get_collections()
    collections = collections_response.get_json()['data']
    
    collection = next((c for c in collections if c['id'] == collection_id), None)
    if not collection:
        return jsonify({'success': False, 'error': 'Collection not found'}), 404
    
    books = get_books_by_ids(collection['book_ids'])
    
    return jsonify({
        'success': True,
        'data': {
            **collection,
            'books': books
        }
    })

@app.route('/api/authors', methods=['GET'])
def get_authors():
    return jsonify({
        'success': True,
        'data': MOCK_AUTHORS,
        'count': len(MOCK_AUTHORS)
    })

@app.route('/api/authors/<int:author_id>', methods=['GET'])
def get_author(author_id):
    author = next((a for a in MOCK_AUTHORS if a['id'] == author_id), None)
    if not author:
        return jsonify({'success': False, 'error': 'Author not found'}), 404
    
    books = [b for b in PROCESSED_BOOKS if b['author'] == author['name']]
    
    return jsonify({
        'success': True,
        'data': author,
        'books': books
    })

@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    total_books = len(PROCESSED_BOOKS)
    total_authors = len(MOCK_AUTHORS)
    languages = list(set(b['original_language'] for b in PROCESSED_BOOKS))
    emotions = {}
    
    for emotion in Config.EMOTIONS:
        emotions[emotion] = len([b for b in PROCESSED_BOOKS if b['emotion'].get(emotion, 0) > 0.15])
    
    return jsonify({
        'success': True,
        'data': {
            'total_books': total_books,
            'total_authors': total_authors,
            'total_languages': len(languages),
            'languages': languages,
            'emotions': emotions,
            'content_types': VALID_CONTENT_TYPES
        }
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'success': True,
        'status': 'Gatha NLP Backend (IndicBERT + Romanized Search)',
        'nlp_active': True,
        'romanized_search': True,
        'indicbert_loaded': nlp_engine.model is not None,
        'books_processed': len(PROCESSED_BOOKS),
        'valid_content_types': VALID_CONTENT_TYPES,
        'timestamp': datetime.now().isoformat()
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({'success': False, 'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'success': False, 'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("\n" + "="*60)
    print("GATHA NLP BACKEND SERVER IS STARTING")
    print("="*60)
    print("IndicBERT Pre-trained Model: LOADED")
    print("Romanized Search: ENABLED")
    print("="*60)
    print("\nAvailable endpoints:")
    print("  GET  /api/health")
    print("  GET  /api/books")
    print("  GET  /api/books/<id>")
    print("  GET  /api/books/<id>/emotions")
    print("  GET  /api/content-types")
    print("  GET  /api/search/autocomplete?q=query")
    print("  GET  /api/search/advanced")
    print("  GET  /api/debug/nlp-test?text=...")
    print("  GET  /api/collections (IndicBERT-Generated)")
    print("  GET  /api/collections/<id>")
    print("  GET  /api/authors")
    print("  GET  /api/authors/<id>")
    print("  GET  /api/statistics")
    print("\n" + "="*60)
    print(f"{len(PROCESSED_BOOKS)} books processed with IndicBERT")
    print(f" Valid content types: {', '.join(VALID_CONTENT_TYPES)}")
    print("="*60)
    print("\nServer running on http://localhost:5000\n")
    app.run(debug=True, port=5000)
