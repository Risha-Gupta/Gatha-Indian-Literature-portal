from datetime import datetime

# Mock database with 12 books in INDIAN REGIONAL LANGUAGES ONLY
# Content types: prose, poetry, bhajan, doha, songs, folk_songs
MOCK_BOOKS = [
    # === 2 HINDI BOOKS ===
    {
        'id': 1,
        'title': 'गोदान',
        'romanized_title': 'godan',
        'author': 'मुंशी प्रेमचंद',
        'romanized_author': 'munshi premchand',
        'cover_image': '/covers/godan.jpg',
        'language': 'Hindi',
        'original_language': 'Hindi',
        'content_type': 'prose',
        'year': 1936,
        'excerpt': '''होरी महतो गाँव सेमरा का एक साधारण किसान था। उसके पास कुछ बीघे जमीन थी, जिस पर वह मेहनत करके अपने परिवार का पेट भरता था। लेकिन उसकी सबसे बड़ी इच्छा थी एक गाय रखने की। गाय उसके लिए सिर्फ एक जानवर नहीं थी, बल्कि समृद्धि और सम्मान का प्रतीक थी। उसकी पत्नी धनिया भी उसी तरह दिन-रात खेतों में काम करती थी, उसके हाथ फटे हुए थे और खून बहता था। दोनों मिलकर उस दिन का सपना देखते थे जब उनके घर आँगन में एक गाय होगी।''',
        'emotion': {'melancholy': 0.4, 'wisdom': 0.3, 'inspiration': 0.2, 'devotion': 0.1},
        'keywords': ['farmer', 'poverty', 'struggle', 'cow', 'rural life', 'pain', 'hope'],
        'characters': ['होरी', 'धनिया', 'भोला', 'दातादीन', 'गोबर'],
        'themes': ['rural poverty', 'farmers struggle', 'social inequality', 'human dignity', 'aspiration']
    },
    {
        'id': 2,
        'title': 'कामायनी',
        'romanized_title': 'kamayani',
        'author': 'जयशंकर प्रसाद',
        'romanized_author': 'jaishankar prasad',
        'cover_image': '/covers/kamayani.jpg',
        'language': 'Hindi',
        'original_language': 'Hindi',
        'content_type': 'poetry',
        'year': 1936,
        'excerpt': '''हिमगिरि के उतुंग शिखर पर, बैठ शिला की शीतल छाँह। एक पुरुष भीगे नयनों से, देख रहा था प्रलय प्रवाह॥ नीचे जल था ऊपर हिम था, एक तरल था एक सघन। एक तत्व की ही प्रधानता, कहो उसे जड़ या चेतन॥ हा! यह प्रलय! वह महाकाश, सब कुछ समाप्त, सब कुछ नाश। केवल मैं ही बच गया हूँ, इस विनाश के बीच एक आस।''',
        'emotion': {'wisdom': 0.4, 'devotion': 0.3, 'inspiration': 0.2, 'melancholy': 0.1},
        'keywords': ['epic', 'philosophy', 'manu', 'faith', 'deluge', 'joy', 'action'],
        'characters': ['मनु', 'श्रद्धा', 'इड़ा'],
        'themes': ['philosophy', 'rebirth', 'faith', 'human consciousness', 'cosmic cycle']
    },
    {
        'id': 3,
        'title': 'कबीर के दोहे',
        'romanized_title': 'kabir ke dohe',
        'author': 'संत कबीर',
        'romanized_author': 'sant kabir',
        'cover_image': '/covers/kabir.jpg',
        'language': 'Hindi',
        'original_language': 'Hindi',
        'content_type': 'doha',
        'year': 1500,
        'excerpt': '''बुरा जो देखन मैं चला, बुरा न मिलिया कोय। जो दिल खोजा आपना, मुझसे बुरा न कोय॥ माला फेरत जुग भया, फिरा न मन का फेर। कर का मनका डार दे, मन का मनका फेर॥ पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय। ढाई आखर प्रेम का, पढ़े सो पंडित होय॥''',
        'emotion': {'wisdom': 0.5, 'devotion': 0.25, 'inspiration': 0.15, 'peace': 0.1},
        'keywords': ['knowledge', 'truth', 'devotion', 'society', 'soul', 'love', 'religion'],
        'characters': ['कबीर'],
        'themes': ['spiritual wisdom', 'social criticism', 'simplicity', 'devotion', 'truth']
    },
    {
        'id': 4,
        'title': 'मीरा के भजन',
        'romanized_title': 'meera ke bhajan',
        'author': 'मीराबाई',
        'romanized_author': 'meerabai',
        'cover_image': '/covers/meera.jpg',
        'language': 'Hindi',
        'original_language': 'Hindi',
        'content_type': 'bhajan',
        'year': 1550,
        'excerpt': '''पायो जी मैंने राम रतन धन पायो। वस्तु अमोलक दी मेरे सतगुरु, कर किरपा अपनायो॥ जनम जनम की पूंजी पाई, जग में सभी खोवायो। खर्च न खूटै चोर न लूटै, दिन दिन बढ़त सवायो॥ सत की नाव खेवटिया सतगुरु, भवसागर तर आयो। मीरा के प्रभु गिरधर नागर, हरख हरख जस गायो॥''',
        'emotion': {'devotion': 0.5, 'joy': 0.25, 'romance': 0.15, 'peace': 0.1},
        'keywords': ['krishna', 'devotion', 'love', 'dedication', 'joy', 'giridhar'],
        'characters': ['मीरा', 'कृष्ण'],
        'themes': ['krishna devotion', 'divine love', 'surrender', 'spiritual bliss']
    },
    {
        'id': 5,
        'title': 'ಮಲೆಗಳಲ್ಲಿ ಮದುಮಗಳು',
        'romanized_title': 'malegalalali madhumagalu',
        'author': 'ಕುವೆಂಪು',
        'romanized_author': 'kuvempu',
        'cover_image': '/covers/malegallali.jpg',
        'language': 'Kannada',
        'original_language': 'Kannada',
        'content_type': 'poetry',
        'year': 1967,
        'excerpt': '''ಕಂಡೆನು ಮಲೆಯ ಮಗಳನು, ಚಂದದ ಕಣ್ಣುಳ್ಳವಳನು। ಅವಳ ಮೈಮರೆತೆನು, ಅವಳ ಸೊಗಸು ಕಂಡೆನು। ಪರ್ವತದ ಪುತ್ರಿಯು ನನ್ನ ಹೃದಯವನ್ನು ಕದ್ದುಕೊಂಡಳು। ಆ ದಿವ್ಯ ಮುಖವನ್ನು ನೋಡಿ ನಾನು ವಿಸ್ಮಿತನಾದೆ। ಹೂವಿನಂತೆ ಸೂಕ್ಷ್ಮ, ಚಂದ್ರನಂತೆ ಶೀತಲ, ಅವಳ ನಗುವು ನನ್ನ ಪ್ರಾಣಕ್ಕೆ ಹೊಸ ಜೀವ ತುಂಬಿತು।''',
        'emotion': {'romance': 0.5, 'peace': 0.25, 'joy': 0.15, 'devotion': 0.1},
        'keywords': ['love', 'mountain', 'beauty', 'poetry', 'heart', 'smile'],
        'characters': ['ಮಲೆಯ ಮಗಳು', 'ಕವಿ'],
        'themes': ['mountain beauty', 'romantic love', 'nature', 'divine feminine']
    },
    {
        'id': 6,
        'title': 'ವಚನಗಳು',
        'romanized_title': 'vachanagalu',
        'author': 'ಬಸವಣ್ಣ',
        'romanized_author': 'basavanna',
        'cover_image': '/covers/vachana.jpg',
        'language': 'Kannada',
        'original_language': 'Kannada',
        'content_type': 'poetry',
        'year': 1160,
        'excerpt': '''ಕೂಡಲಸಂಗಮದೇವಾ, ನಿನ್ನ ಪಾದ ನೋಡದೆ ಬಾಳುವುದೇನು? ಚಿನ್ನದ ಕೋಟೆ, ಬೆಳ್ಳಿಯ ಮನೆ, ನನಗೇನು ಬೇಕು? ನಿನ್ನ ಸಂಗವಿದ್ದರೆ ಸಾಕು, ನಿನ್ನ ನಾಮವಿದ್ದರೆ ಸಾಕು। ಧನಕ್ಕಾಗಿ, ಹೆಸರಿಗಾಗಿ ಓಡಾಡುವುದು ವ್ಯರ್ಥ, ನಿನ್ನ ಭಕ್ತಿಯೇ ನನ್ನ ಸಂಪತ್ತು, ಕೂಡಲಸಂಗಮದೇವಾ।''',
        'emotion': {'devotion': 0.5, 'wisdom': 0.25, 'peace': 0.15, 'inspiration': 0.1},
        'keywords': ['devotion', 'god', 'verse', 'renunciation', 'truth', 'spirituality'],
        'characters': ['ಬಸವಣ್ಣ', 'ಕೂಡಲಸಂಗಮದೇವ'],
        'themes': ['devotion to god', 'rejection of materialism', 'spiritual truth', 'equality']
    },
    {
        'id': 7,
        'title': 'ज्ञानेश्वरी',
        'romanized_title': 'dnyaneshwari',
        'author': 'संत ज्ञानेश्वर',
        'romanized_author': 'sant dnyaneshwar',
        'cover_image': '/covers/dnyaneshwari.jpg',
        'language': 'Marathi',
        'original_language': 'Marathi',
        'content_type': 'poetry',
        'year': 1290,
        'excerpt': '''अर्जुना, का तू शोक करीत आहेस? कर्म केल्यामुळे फळ मिळेल, पण त्या फळाची इच्छा ठेवू नकोस। तू तुझे कर्तव्य कर, पण फळाची अपेक्षा सोडून दे। जो माणूस आसक्ती सोडून देतो, तो मोक्षाला पावतो। हा मार्ग कठीण आहे, पण तोच खरा मार्ग आहे। हे श्रीकृष्णाचे वचन, मराठीत सुंदर रीतीने सांगितले आहे, यात भगवद्गीतेचे गूढ अर्थ सामावले आहेत।''',
        'emotion': {'wisdom': 0.45, 'devotion': 0.35, 'peace': 0.15, 'inspiration': 0.05},
        'keywords': ['spirituality', 'philosophy', 'devotion', 'knowledge', 'action', 'liberation'],
        'characters': ['ज्ञानेश्वर', 'कृष्ण', 'अर्जुन'],
        'themes': ['spiritual wisdom', 'devotion', 'liberation', 'divine knowledge', 'karma yoga']
    },
    {
        'id': 8,
        'title': 'मृत्युंजय',
        'romanized_title': 'mrutyunjay',
        'author': 'शिवाजी सावंत',
        'romanized_author': 'shivaji sawant',
        'cover_image': '/covers/mrutyunjay.jpg',
        'language': 'Marathi',
        'original_language': 'Marathi',
        'content_type': 'prose',
        'year': 1967,
        'excerpt': '''कर्ण, सूर्यपुत्र, पण तरीही अपमानित। जन्माला येताच त्याग केला गेला, राधा आणि अधिरथने वाढवले, पण समाजाने त्याला कधीच स्वीकारले नाही। तो महान योद्धा होता, दानवीर होता, पण नशीब त्याच्या विरुद्ध होते। दुर्योधनाची मैत्री हीच त्याची एकमेव ओळख होती। युद्धात तो अर्जुनाविरुद्ध उभा राहिला, आपल्याच भावाविरुद्ध, नशिबाच्या खेळात सापडलेला एक दुर्दैवी नायक।''',
        'emotion': {'tragedy': 0.4, 'melancholy': 0.3, 'inspiration': 0.2, 'wisdom': 0.1},
        'keywords': ['karna', 'mahabharata', 'misfortune', 'friendship', 'war', 'sacrifice'],
        'characters': ['कर्ण', 'दुर्योधन', 'अर्जुन', 'कुंती'],
        'themes': ['fate and destiny', 'friendship', 'tragic hero', 'social rejection', 'loyalty']
    },
    {
        'id': 9,
        'title': 'திருக்குறள்',
        'romanized_title': 'thirukkural',
        'author': 'திருவள்ளுவர்',
        'romanized_author': 'thiruvalluvar',
        'cover_image': '/covers/thirukkural.jpg',
        'language': 'Tamil',
        'original_language': 'Tamil',
        'content_type': 'poetry',
        'year': -100,
        'excerpt': '''அறத்தா றிதுவென வேண்டா சிவிகை பொறுத்தானோ ட்உ ம்பருதல் யானை. இனிய உளவா கவற மளவே வைய உளவே வையத்து. காமத்து ப்பால்: காதல் என்பது உயிரினும் மேலான ஒன்று, அது இல்லாத வாழ்க்கை வெறும் பாலை நிலம். அறத்துப்பால்: நன்மை செய்வது மனிதனுக்கு கடமை, அதுவே உண்மையான வெற்றி.''',
        'emotion': {'wisdom': 0.5, 'peace': 0.25, 'devotion': 0.15, 'inspiration': 0.1},
        'keywords': ['virtue', 'love', 'home', 'knowledge', 'justice', 'life'],
        'characters': ['திருவள்ளுவர்'],
        'themes': ['virtue', 'love', 'wealth', 'liberation', 'ethics', 'life wisdom']
    },
    {
        'id': 10,
        'title': 'சிலப்பதிகாரம்',
        'romanized_title': 'silapathikaram',
        'author': 'இளங்கோவடிகள்',
        'romanized_author': 'ilango adigal',
        'cover_image': '/covers/silapathikaram.jpg',
        'language': 'Tamil',
        'original_language': 'Tamil',
        'content_type': 'poetry',
        'year': 300,
        'excerpt': '''கண்ணகி, கோவலனின் மனைவி, தன் கணவனை இழந்த பின், கோபத்தால் எரிந்தாள். மதுரை நகரம் அவளுடைய சாபத்தால் தீக்கிரையானது। அவள் ஒரு பத்தினி, ஆனால் நீதியின்மையால் துன்பப்பட்டாள். அவளது கதை தமிழ் இலக்கியத்தின் மிகச்சிறந்த காவியங்களில் ஒன்று. அவளது சினம் நியாயமானது, அவளது தியாகம் என்றென்றும் நினைவுகூரப்படும்.''',
        'emotion': {'tragedy': 0.4, 'inspiration': 0.25, 'melancholy': 0.2, 'devotion': 0.15},
        'keywords': ['chastity', 'justice', 'curse', 'love', 'revenge', 'sacrifice'],
        'characters': ['கண்ணகி', 'கோவலன்', 'மாதவி'],
        'themes': ['justice', 'chastity', 'revenge', 'tragic love', 'societal injustice']
    },
    {
        'id': 11,
        'title': 'গীতাঞ্জলি',
        'romanized_title': 'gitanjali',
        'author': 'রবীন্দ্রনাথ ঠাকুর',
        'romanized_author': 'rabindranath tagore',
        'cover_image': '/covers/gitanjali.jpg',
        'language': 'Bengali',
        'original_language': 'Bengali',
        'content_type': 'poetry',
        'year': 1910,
        'excerpt': '''আমার সোনার বাংলা, আমি তোমায় ভালোবাসি। চিরদিন তোমার আকাশ, তোমার বাতাস, আমার প্রাণে বাজায় বাঁশি। ও মা, ফাগুনে তোর আমের বনে ঘ্রাণে পাগল করে, মরি হায়, হায় রে— ও মা, অঘ্রানে তোর ভরা ক্ষেতে আমি কী দেখেছি মধুর হাসি। প্রভুর কৃপা খুঁজে পাই প্রকৃতির প্রতিটি কোণে, প্রতিটি পাতায়, প্রতিটি ফুলে।''',
        'emotion': {'devotion': 0.4, 'joy': 0.25, 'peace': 0.2, 'romance': 0.15},
        'keywords': ['devotion', 'nature', 'love', 'god', 'bengal', 'beauty'],
        'characters': ['কবি', 'প্রভু'],
        'themes': ['devotion to god', 'love of nature', 'Bengal', 'spiritual beauty', 'divine connection']
    },
    {
        'id': 12,
        'title': 'পথের পাঁচালী',
        'romanized_title': 'pather panchali',
        'author': 'বিভূতিভূষণ বন্দ্যোপাধ্যায়',
        'romanized_author': 'bibhutibhushan bandyopadhyay',
        'cover_image': '/covers/pather_panchali.jpg',
        'language': 'Bengali',
        'original_language': 'Bengali',
        'content_type': 'prose',
        'year': 1929,
        'excerpt': '''অপু এবং দুর্গা, দুই ভাইবোন, গ্রামীণ বাংলার সরল জীবনে বড় হচ্ছিল। তাদের দারিদ্র্য ছিল, কিন্তু স্বপ্ন ছিল অসীম। বাঁশবনের ভেতর দিয়ে ট্রেন চলে যেত, এবং তারা স্বপ্ন দেখত দূরের শহরের, নতুন জীবনের। দুর্গার অকাল মৃত্যু সবাইকে শোকে ডুবিয়ে দিল, কিন্তু জীবন চলতে থাকল, যেমন বাংলার নদী চলে, থেমে থাকে না কখনো।''',
        'emotion': {'melancholy': 0.35, 'inspiration': 0.25, 'joy': 0.2, 'peace': 0.2},
        'keywords': ['poverty', 'village', 'childhood', 'dreams', 'death', 'family'],
        'characters': ['অপু', 'দুর্গা', 'সর্বজয়া', 'হরিহর'],
        'themes': ['rural childhood', 'poverty', 'dreams', 'family', 'loss', 'resilience']
    }
]

# Valid content types (NO GHAZALS - removed as per requirement)
VALID_CONTENT_TYPES = ['prose', 'poetry', 'bhajan', 'doha', 'songs', 'folk_songs']

# Folk song subcategories
FOLK_SONG_TYPES = ['dadra', 'tappa', 'thumri', 'kajri', 'chaiti', 'hori', 'lavani', 'powada']

MOCK_COLLECTIONS = [
    {
        'id': 1,
        'name': 'Classics',
        'description': 'Timeless classics that have shaped Indian literature',
        'book_ids': [2, 7, 9, 11],
        'created_at': datetime.now().isoformat()
    },
    {
        'id': 2,
        'name': 'Modern Realism',
        'description': 'Contemporary voices exploring social reality',
        'book_ids': [1, 8, 12],
        'created_at': datetime.now().isoformat()
    },
    {
        'id': 3,
        'name': 'Romantic Tales',
        'description': 'Stories of love, passion, and devotion',
        'book_ids': [5, 10],
        'created_at': datetime.now().isoformat()
    },
    {
        'id': 4,
        'name': 'Spiritual Wisdom',
        'description': 'Works exploring philosophy, spirituality, and enlightenment',
        'book_ids': [2, 3, 4, 6, 7, 9, 11],
        'created_at': datetime.now().isoformat()
    },
    {
        'id': 5,
        'name': 'Devotional Literature',
        'description': 'Bhajans, dohas, and devotional poetry',
        'book_ids': [3, 4, 6, 7, 11],
        'created_at': datetime.now().isoformat()
    }
]

MOCK_AUTHORS = [
    {'id': 1, 'name': 'मुंशी प्रेमचंद', 'language': 'Hindi', 'era': 'Modern'},
    {'id': 2, 'name': 'जयशंकर प्रसाद', 'language': 'Hindi', 'era': 'Modern'},
    {'id': 3, 'name': 'संत कबीर', 'language': 'Hindi', 'era': 'Medieval'},
    {'id': 4, 'name': 'मीराबाई', 'language': 'Hindi', 'era': 'Medieval'},
    {'id': 5, 'name': 'ಕುವೆಂಪು', 'language': 'Kannada', 'era': 'Modern'},
    {'id': 6, 'name': 'ಬಸವಣ್ಣ', 'language': 'Kannada', 'era': 'Medieval'},
    {'id': 7, 'name': 'संत ज्ञानेश्वर', 'language': 'Marathi', 'era': 'Medieval'},
    {'id': 8, 'name': 'शिवाजी सावंत', 'language': 'Marathi', 'era': 'Modern'},
    {'id': 9, 'name': 'திருவள்ளுவர்', 'language': 'Tamil', 'era': 'Ancient'},
    {'id': 10, 'name': 'இளங்கோவடிகள்', 'language': 'Tamil', 'era': 'Ancient'},
    {'id': 11, 'name': 'রবীন্দ্রনাথ ঠাকুর', 'language': 'Bengali', 'era': 'Modern'},
    {'id': 12, 'name': 'বিভূতিভূষণ বন্দ্যোপাধ্যায়', 'language': 'Bengali', 'era': 'Modern'}
]
