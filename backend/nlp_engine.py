import re
from collections import Counter
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from typing import List, Dict, Tuple
import warnings
warnings.filterwarnings('ignore')

# PRE-TRAINED MODEL IMPORTS
try:
    import torch
    from transformers import AutoTokenizer, AutoModel
    TRANSFORMERS_AVAILABLE = True
except ImportError:
    TRANSFORMERS_AVAILABLE = False
    print("⚠️ transformers not installed. Install with: pip install transformers torch")


class GathaNLPEngine:
    """
    ✅ ADVANCED NLP Engine for Indian Regional Languages
    ✅ Pre-trained IndicBERT model for contextual understanding (PRIMARY)
    ✅ Multi-strategy emotion detection with context awareness (SECONDARY)
    """

    def __init__(self):
        print("="*60)
        print("🚀 Initializing Advanced NLP Engine with Pre-trained Model")
        print("="*60)
        
        # Load PRE-TRAINED MODEL for Indian Languages
        self.model = None
        self.tokenizer = None
        
        if TRANSFORMERS_AVAILABLE:
            try:
                print("📥 Loading IndicBERT (ai4bharat/indic-bert)...")
                print("   (First time will download ~500MB model)")
                self.tokenizer = AutoTokenizer.from_pretrained("ai4bharat/indic-bert")
                self.model = AutoModel.from_pretrained("ai4bharat/indic-bert")
                self.model.eval()  # Set to evaluation mode
                print("✅ IndicBERT loaded successfully!")
                print("   Model: ai4bharat/indic-bert (12 Indian languages)")
            except Exception as e:
                print(f"⚠️ Could not load IndicBERT: {e}")
                print("   Falling back to keyword-based NLP")
        else:
            print("⚠️ transformers library not installed")
            print("   Install with: pip install transformers torch")
        
        # Load keyword dictionaries
        print("📚 Loading emotion lexicons...")
        self.stop_words = self._load_stop_words()
        self.vectorizer = TfidfVectorizer(
            lowercase=False,
            stop_words=None,
            max_features=1000,
            ngram_range=(1, 3)
        )
        self.emotion_keywords = self._load_emotion_keywords()
        self.emotion_word_roots = self._load_emotion_word_roots()
        self.contextual_boosters = self._load_contextual_boosters()
        self.language_indicators = self._load_language_indicators()
        
        print("✅ NLP Engine is ready!")
        if self.model is not None:
            print("🎯 Using MODEL-FIRST approach: IndicBERT (70%) + Keywords (30%)")
        else:
            print("🎯 Using keyword-based approach")
        print("="*60 + "\n")

    def _load_stop_words(self) -> set:
        """Indian language stop words"""
        return {
            # Hindi
            'और', 'या', 'में', 'की', 'का', 'से', 'है', 'हैं', 'था', 'थे',
            'ही', 'नहीं', 'के', 'को', 'जो', 'कि', 'भी', 'तो', 'पर', 'इस',
            'एक', 'वह', 'यह', 'उस', 'ने', 'थी', 'हो', 'पे', 'बस', 'ऐसे',
            # Marathi
            'आणि', 'किंवा', 'मध्ये', 'चे', 'च', 'आहे', 'होते', 'हो', 'आहेत',
            'या', 'नाही', 'ला', 'हून', 'करून', 'शी', 'तर', 'ते', 'ती', 'मी',
            # Tamil
            'மற்றும்', 'அல்லது', 'இல்', 'கு', 'ஆக', 'உள்ள', 'என்', 'என்று',
            'என்ற', 'உண்டு', 'இருந்தது', 'இருக்கிறது', 'இல்லை', 'உள்ளது',
            # Kannada
            'ಮತ್ತು', 'ಅಥವಾ', 'ಇದರ', 'ಆ', 'ಈ', 'ಆಗಿದೆ', 'ಆಗಿದ್ದು', 'ಆಗಿರುತ್ತೆ',
            'ಇಲ್ಲ', 'ಮಧ್ಯೆ', 'ಮೂಲಕ', 'ತನಕ', 'ವರೆಗೆ', 'ಇದು', 'ಅದು',
            # Bengali
            'এবং', 'বা', 'যে', 'যা', 'এর', 'এই', 'সেই', 'হয়', 'হয়েছে', 'ছিল',
            'হবে', 'করে', 'করেছে', 'নেই', 'আছে', 'থাকে', 'দ্বারা', 'থেকে'
        }

    def _load_emotion_keywords(self) -> Dict[str, List[str]]:
        """MASSIVELY EXPANDED emotion keywords"""
        return {
            'romance': [
                'প্রেম', 'प्यার', 'दिल', 'हृदय', 'प्रिय', 'मोहब्बत', 'इश्क', 'प्रेमी', 'प्रेमिका',
                'चुंबन', 'आलिंगन', 'रोमांस', 'प्रणय', 'स्नेह', 'मुहब्बत', 'रति', 'कामदेव',
                'காதல்', 'இதயம்', 'அன்பு', 'ஆசை', 'காதலன்', 'காதலி', 'நேசம்', 'முத்தம்', 'அணைப்பு',
                'ಪ್ರೇಮ', 'ಹೃದಯ', 'ರಾಗ', 'ಪ್ರಿಯ', 'ಪ್ರೇಮಿ', 'ಪ್ರೀತಿ', 'ಮದುವೆ',
                'प्रेम', 'हृदय', 'प्रिय', 'मैत्री', 'प्रेमळ', 'प्रेमात',
                'ভালোবাসা', 'হৃদয়', 'প্রিয়', 'প্রেম', 'প্রেমিক', 'ভালবাসা', 'চুম্বন'
            ],
            'melancholy': [
                'दर्द', 'पीड़ा', 'दुख', 'शोक', 'वियोग', 'खेद', 'वेदना', 'उदासी', 'आंसू', 'रोना',
                'गम', 'उदास', 'दुखी', 'अकेला', 'तन्हा', 'करुण', 'विषाद', 'गरीबी', 'संघर्ष',
                'रुदन', 'क्रंदन', 'विलाप', 'करुणा', 'अश्रु', 'रुग्ण', 'निराश',
                'வருத்தம்', 'துன்பம்', 'வேதனை', 'சோகம்', 'கண்ணீர்', 'தனிமை', 'வலி', 'துக்கம்', 'அழுகை',
                'ವಿಷಾದ', 'ದುಃಖ', 'ನೋವು', 'ಬೋಧ', 'ಕಣ್ಣೀರು', 'ವೇದನೆ', 'ದುಃಖಿತ', 'ಅಳು',
                'दुःख', 'वेदना', 'शोक', 'आंसू', 'दुखणे', 'दुःखी', 'रडणे',
                'দুঃখ', 'বেদনা', 'ব্যথা', 'শোক', 'কান্না', 'একাকীত্ব', 'বিষাদ', 'দরিদ্রতা', 'রোনা'
            ],
            'peace': [
                'शांति', 'शान्ति', 'सुख', 'आनंद', 'समाधि', 'शांतता', 'निर्विकार', 'चैन', 'सुकून',
                'शांत', 'मौन', 'निर्मल', 'स्थिर', 'प्रशांत', 'विश्राम', 'सुखद',
                'அமைதி', 'சமாதி', 'இசை', 'நிலை', 'அமைதியான', 'சாந்தம்', 'நிம்மதி', 'மௌனம்',
                'ಸಮಾಧಿ', 'ಶಾಂತಿ', 'ಸುಖ', 'ಚಿತ್ತಸ್ಥಿರತೆ', 'ಶಾಂತ', 'ನಿಮ್ಮದಿ', 'ಮೌನ',
                'शांति', 'शांतता', 'सुख', 'समाधान', 'शांत', 'स्वस्थ',
                'শান্তি', 'আনন্দ', 'সমাধি', 'নীরবতা', 'প্রশান্তি', 'শান্ত', 'মৌন'
            ],
            'joy': [
                'आनंद', 'खुशी', 'हर्ष', 'प्रसन्न', 'उल्लास', 'प्रमोद', 'मुस्कान', 'हँसी', 'खुश',
                'प्रसन्नता', 'आनन्द', 'मुस्कुराहट', 'हर्षित', 'प्रफुल्ल', 'प्रफुल्लित', 'हास्य',
                'சந்தோஷம்', 'ஆனந்தம்', 'மகிழ்ச்சி', 'உள்ளம்', 'சிரிப்பு', 'மகிழ்வு', 'சந்தோஷ', 'நகை',
                'ಆನಂದ', 'ಸಂತೋಷ', 'ಹರ್ಷ', 'ಪ್ರಫುಲ್ಲತೆ', 'ನಗು', 'ಸಂತಸ', 'ಖುಷಿ', 'ನಗೆ',
                'आनंद', 'खुशी', 'हर्ष', 'प्रसन्नता', 'आनंदी', 'हसणे',
                'আনন্দ', 'খুশি', 'হৃষ্ট', 'হাসি', 'সুখ', 'আনন্দিত', 'উল্লাস'
            ],
            'inspiration': [
                'साहस', 'शक्ति', 'संकल्प', 'आशा', 'प्रेरणा', 'उत्साह', 'दृढ़ता', 'वीर', 'हिम्मत', 'बल',
                'बहादुर', 'वीरता', 'निर्भय', 'साहसी', 'ताकत', 'उम्मीद', 'पराक्रम', 'तेज',
                'தைரியம்', 'சக்தி', 'நம்பிக்கை', 'சுதந்திரம்', 'வீரம்', 'உத்வேகம்', 'பலம்', 'தைரியமான',
                'ಹಿಮ್ಮತ್ತು', 'ಶಕ್ತಿ', 'ಆಶೆ', 'ಪ್ರೇರಣೆ', 'ಧೈರ್ಯ', 'ಉತ್ಸಾಹ', 'ಬಲ', 'ವೀರತೆ',
                'धैर्य', 'शक्ती', 'प्रेरणा', 'उत्साह', 'साहस', 'वीर',
                'সাহস', 'শক্তি', 'আশা', 'উদ্দীপনা', 'বীরত্ব', 'প্রেরণা', 'সাহসী', 'বল'
            ],
            'wisdom': [
                'ज्ञान', 'सत्य', 'बुद्धि', 'विवेक', 'दर्शन', 'तत्त्व', 'ज्ञानी', 'विद्या', 'समझ', 'प्रज्ञा',
                'बुद्धिमान', 'विद्वान', 'तत्व', 'वेद', 'शास्त्र', 'मंत्र', 'योग', 'ध्यान', 'चिंतन',
                'அறிவு', 'உண்மை', 'தத்துவம்', 'ஞானம்', 'அறிவுரை', 'ஞானி', 'அறிவாளி', 'தியானம்',
                'ಜ್ಞಾನ', 'ಸತ್ಯ', 'ತತ್ವ', 'ಬುದ್ಧಿ', 'ಜ್ಞಾನಿ', 'ವಿದ್ಯೆ', 'ಬುದ್ಧಿವಂತ', 'ಧ್ಯಾನ',
                'ज्ञान', 'सत्य', 'तत्त्वज्ञान', 'बुद्धी', 'ज्ञानी', 'विद्वान',
                'জ্ঞান', 'সত্য', 'প্রজ্ঞা', 'বোধ', 'জ্ঞানী', 'বিদ্যা', 'জ্ঞানবান', 'ধ্যান'
            ],
            'devotion': [
                'भक्ति', 'विश्वास', 'पूजा', 'ईश्वर', 'पवित्र', 'ध्यान', 'समर्पण', 'देवता', 'प्रार्थना', 'भगवान',
                'आराधना', 'भजन', 'मंदिर', 'धर्म', 'भक्त', 'पूज्य', 'दैवीय', 'आस्था', 'श्रद्धा',
                'பக்தி', 'விசுவாசம்', 'பூஜை', 'ஆன்மீக', 'தெய்வம்', 'தெய்வீக', 'வழிபாடு', 'கோயில்',
                'ಭಕ್ತಿ', 'ಧ್ಯಾನ', 'ಸಾಧನೆ', 'ದೈವಿಕತೆ', 'ದೇವರು', 'ಪೂಜೆ', 'ಆರಾಧನೆ', 'ದೇವಾಲಯ',
                'भक्ती', 'पूजा', 'देव', 'ध्यान', 'भक्त', 'श्रद्धा',
                'ভক্তি', 'আস্থা', 'আধ্যাত্মিক', 'পূজা', 'ঈশ্বর', 'প্রার্থনা', 'ভক্ত', 'মন্দির'
            ],
            'tragedy': [
                'मृत्यु', 'विनाश', 'दुर्भाग्य', 'कष्ट', 'आपत्ति', 'नाश', 'विपत्ति', 'हत्या', 'युद्ध',
                'खून', 'दुर्घटना', 'त्रासदी', 'मौत', 'लाश', 'हिंसा', 'दंगा', 'प्रलय', 'संहार', 'भयानक',
                'मरण', 'विपदा', 'आपदा', 'भयंकर', 'क्रूर', 'क्रूरता', 'मार', 'तबाही',
                'இறப்பு', 'நாசம்', 'விலக்கம்', 'சோகம்', 'கொலை', 'போர்', 'அழிவு', 'பேரழிவு', 'மரணம்', 'படுகொலை',
                'ಮೃತ್ಯು', 'ನಾಶ', 'ದುರಂತ', 'ಆಪತ್ತು', 'ಯುದ್ಧ', 'ಕೊಲೆ', 'ನಾಶನ', 'ಸಾವು', 'ಹತ್ಯೆ',
                'मृत्यू', 'नाश', 'दुर्घटना', 'युद्ध', 'हत्या', 'मरण', 'संहार',
                'মৃত্যু', 'ধ্বংস', 'দুর্ভাগ্য', 'যুদ্ধ', 'হত্যা', 'বিপর্যয়', 'রক্ত', 'মৃতদেহ', 'মরণ', 'হত্যাকাণ্ড'
            ]
        }

    def _load_emotion_word_roots(self) -> Dict[str, List[str]]:
        return {
            'romance': ['प्रेम', 'प्यार', 'காதல்', 'ಪ್ರೇಮ', 'ভালোবাস'],
            'melancholy': ['दुख', 'துன்', 'ದುಃಖ', 'দুঃখ'],
            'peace': ['शांत', 'சாந்த', 'ಶಾಂತ', 'শান্ত'],
            'joy': ['खुश', 'हर्ष', 'சந்த', 'ಸಂತೋಷ', 'আনন্দ'],
            'inspiration': ['साहस', 'वीर', 'வீர', 'ಧೈರ್ಯ', 'সাহস'],
            'wisdom': ['ज्ञान', 'बुद्धि', 'ஞான', 'ಜ್ಞಾನ', 'জ্ঞান'],
            'devotion': ['भक्त', 'पूजा', 'பக்த', 'ಭಕ್ತ', 'ভক্ত'],
            'tragedy': ['मृत्', 'नाश', 'மரண', 'ಮೃತ್ಯು', 'মৃত্']
        }

    def _load_contextual_boosters(self) -> Dict[str, List[str]]:
        return {
            'wisdom': ['महाकाव्य', 'दर्शन', 'तत्त्व', 'वेद', 'उपनिषद', 'गीता', 'தத்துவம', 'ತತ್ವ'],
            'devotion': ['भगवान', 'ईश्वर', 'कृष्ण', 'राम', 'தெய்வம', 'ದೇವ'],
            'tragedy': ['युद्ध', 'प्रलय', 'विनाश', 'போர்', 'ಯುದ್ಧ'],
            'inspiration': ['वीर', 'महान', 'বীর', 'வீர', 'ವೀರ']
        }

    def _load_language_indicators(self) -> Dict[str, List[str]]:
        return {
            'Hindi':   ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः'],
            'Marathi': ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः'],
            'Tamil':   ['்', 'ா', 'ி', 'ீ', 'ு', 'ூ', 'ெ', 'ே', 'ை', 'ோ', 'ௌ', 'ஂ'],
            'Kannada': ['್', 'ಾ', 'ಿ', 'ೀ', 'ು', 'ೂ', 'ೃ', 'ೆ', 'ೇ', 'ೈ', 'ೊ', 'ೋ', 'ೌ', 'ಂ'],
            'Bengali': ['া', 'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ে', 'ৈ', 'ো', 'ৌ', 'ং', 'ঃ']
        }

    def preprocess_text(self, text: str) -> str:
        text = re.sub(r'[।॥,.\-!?;:\'\"()\[\]{}]', ' ', text)
        words = [w for w in text.split() if w not in self.stop_words and len(w) > 1]
        return ' '.join(words)

    def get_text_embedding(self, text: str):
        """✅ PRE-TRAINED MODEL: Get contextualized embedding using IndicBERT"""
        if self.tokenizer is None or self.model is None:
            return None
        
        try:
            inputs = self.tokenizer(text, return_tensors="pt", 
                                   truncation=True, max_length=512, padding=True)
            
            with torch.no_grad():
                outputs = self.model(**inputs)
                embedding = outputs.last_hidden_state[:, 0, :].squeeze()
            
            return embedding.numpy()
        except Exception as e:
            return None

    def extract_emotion_scores(self, text: str) -> Dict[str, float]:
        """
        ✅ MODEL-FIRST EMOTION DETECTION
        
        Priority:
        1. IndicBERT embeddings (70% weight) - PRIMARY
        2. Keyword matching (20% weight) - SECONDARY
        3. Context boosters (10% weight) - TERTIARY
        """
        
        keyword_scores = {e: 0.0 for e in self.emotion_keywords.keys()}
        model_scores = {e: 0.0 for e in self.emotion_keywords.keys()}
        
        # ================== STRATEGY 1: IndicBERT (70%) ==================
        if self.model is not None and self.tokenizer is not None:
            embedding = self.get_text_embedding(text[:512])
            
            if embedding is not None:
                emotion_embeddings = {}
                
                for emotion, keywords in self.emotion_keywords.items():
                    sample_keywords = ' '.join(keywords[:10])
                    emotion_emb = self.get_text_embedding(sample_keywords)
                    
                    if emotion_emb is not None:
                        emotion_embeddings[emotion] = emotion_emb
                
                for emotion, emotion_emb in emotion_embeddings.items():
                    try:
                        similarity = np.dot(embedding, emotion_emb) / (
                            np.linalg.norm(embedding) * np.linalg.norm(emotion_emb)
                        )
                        model_scores[emotion] = max(0, (similarity + 1) / 2) * 10.0
                    except:
                        model_scores[emotion] = 0.5
        
        # ================== STRATEGY 2: Keywords (20%) ==================
        for emotion, keywords in self.emotion_keywords.items():
            for keyword in keywords:
                count = text.count(keyword)
                if count > 0:
                    keyword_scores[emotion] += count * 0.5
        
        for emotion, roots in self.emotion_word_roots.items():
            for root in roots:
                for word in text.split():
                    if root in word and len(root) >= 3:
                        keyword_scores[emotion] += 0.3
        
        # ================== STRATEGY 3: Boosters (10%) ==================
        booster_scores = {e: 0.0 for e in self.emotion_keywords.keys()}
        for emotion, boosters in self.contextual_boosters.items():
            for booster in boosters:
                if booster in text:
                    booster_scores[emotion] += 0.5
        
        # ================== WEIGHTED COMBINATION ==================
        if self.model is not None and sum(model_scores.values()) > 0:
            final_scores = {}
            for emotion in self.emotion_keywords.keys():
                final_scores[emotion] = (
                    model_scores[emotion] * 0.70 +
                    keyword_scores[emotion] * 0.20 +
                    booster_scores[emotion] * 0.10
                )
        else:
            final_scores = {}
            for emotion in self.emotion_keywords.keys():
                final_scores[emotion] = (
                    keyword_scores[emotion] * 0.70 +
                    booster_scores[emotion] * 0.30 +
                    0.5
                )
        
        # Normalize
        total = sum(final_scores.values())
        if total == 0:
            return {e: 1/len(final_scores) for e in final_scores.keys()}
        
        return {e: s / total for e, s in final_scores.items()}

    def detect_language(self, text: str) -> str:
        text_sample = text[:200]
        lang_scores = {}
        
        for language, indicators in self.language_indicators.items():
            count = sum(text_sample.count(ind) for ind in indicators)
            lang_scores[language] = count
        
        detected = max(lang_scores, key=lang_scores.get)
        return detected if lang_scores[detected] > 0 else 'Hindi'

    def semantic_search(self, query: str, texts: List[str], top_k: int = 5) -> List[Tuple[int, float]]:
        try:
            all_texts = [query] + texts
            tfidf_matrix = self.vectorizer.fit_transform(all_texts)
            similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])[0]
            
            top_indices = np.argsort(similarities)[::-1][:top_k]
            return [(int(idx), float(similarities[idx])) for idx in top_indices]
        except Exception as e:
            return []

    def generate_suggestions(self, query: str, book_titles: List[str]) -> List[str]:
        matches = [t for t in book_titles if query.lower() in t.lower()]
        return matches[:5]

    def extract_phrases(self, text: str) -> List[str]:
        words = text.split()
        phrases = []
        
        for i in range(len(words) - 1):
            phrases.append(' '.join(words[i:i+2]))
            if i < len(words) - 2:
                phrases.append(' '.join(words[i:i+3]))
        
        phrase_counts = Counter(phrases)
        return [p for p, _ in phrase_counts.most_common(10)]
