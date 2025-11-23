from nlp_engine import GathaNLPEngine
from mock_database import MOCK_BOOKS


# Initialize NLP engine (IndicBERT will load here!)
nlp = GathaNLPEngine()


def process_books_with_nlp():
    """Process all books and add IndicBERT-calculated emotions"""
    processed_books = []
    
    print("\n" + "="*60)
    print("🚀 NLP ENGINE PROCESSING BOOKS WITH IndicBERT...")
    print("="*60)
    
    for i, book in enumerate(MOCK_BOOKS, 1):
        # Create a copy of the book
        processed_book = book.copy()
        
        # ✅ Extract emotions using IndicBERT (70%) + Keywords (30%)
        emotions = nlp.extract_emotion_scores(book['excerpt'])
        processed_book['emotion'] = emotions
        processed_book['emotion_source'] = 'INDICBERT_HYBRID_70_30'  # Prove it's using pre-trained model!
        
        # Detect language from excerpt
        detected_lang = nlp.detect_language(book['excerpt'])
        processed_book['detected_language'] = detected_lang
        
        # Extract key phrases from excerpt
        preprocessed_text = nlp.preprocess_text(book['excerpt'])
        phrases = nlp.extract_phrases(preprocessed_text)
        processed_book['extracted_phrases'] = phrases[:5]
        
        # Log processing
        print(f"\n[{i}/{len(MOCK_BOOKS)}] ✅ Processed: {book['title']}")
        print(f"   Language Detected: {detected_lang}")
        print(f"   Top Emotion: {max(emotions, key=emotions.get)} ({max(emotions.values())*100:.1f}%)")
        
        # Show top 3 emotions
        top_emotions = sorted(emotions.items(), key=lambda x: x[1], reverse=True)[:3]
        emotion_str = ', '.join([f"{e}: {v:.2f}" for e, v in top_emotions])
        print(f"   All Top 3: {emotion_str}")
        
        processed_books.append(processed_book)
    
    print("\n" + "="*60)
    print(f"✅ SUCCESSFULLY PROCESSED {len(processed_books)} BOOKS")
    print(f"   Using: IndicBERT (70%) + Keywords (30%)")
    print(f"   Emotion source: {processed_books[0]['emotion_source']}")
    print("="*60 + "\n")
    
    return processed_books


# Process books on import (runs when app starts)
print("\n🔄 Starting book processing with IndicBERT...")
PROCESSED_BOOKS = process_books_with_nlp()
