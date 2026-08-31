"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Bot, User, Minimize2, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const QUICK_ACTIONS = [
  { label: "Our Services", message: "What services do you offer?" },
  { label: "Pricing", message: "What are your pricing options?" },
  { label: "Contact", message: "How can I contact TIXSYNC?" },
  { label: "Careers", message: "Are there career opportunities?" },
];

const SUGGESTED_QUESTIONS: Record<string, string[]> = {
  en: ["What services do you offer?", "Tell me about cybersecurity", "How much does it cost?", "How can I contact you?"],
  es: ["¿Qué servicios ofrecen?", "Cuéntame sobre ciberseguridad", "¿Cuánto cuesta?", "¿Cómo puedo contactarlos?"],
  fr: ["Quels services offrez-vous ?", "Parlez-moi de la cybersécurité", "Combien ça coûte ?", "Comment puis-je vous contacter ?"],
  pt: ["Quais serviços vocês oferecem?", "Fale sobre cibersegurança", "Quanto custa?", "Como posso entrar em contato?"],
  de: ["Welche Dienstleistungen bieten Sie an?", "Erzählen Sie von Cybersicherheit", "Was kostet das?", "Wie kann ich Sie kontaktieren?"],
  ar: ["ما هي الخدمات التي تقدمونها؟", "أخبرني عن الأمن السيبراني", "كم التكلفة؟", "كيف يمكنني التواصل معكم؟"],
  zh: ["你们提供什么服务？", "告诉我关于网络安全", "费用是多少？", "我怎么联系你们？"],
  ja: ["どのようなサービスを提供していますか？", "サイバーセキュリティについて教えてください", "費用はいくらですか？", "どうすれば連絡できますか？"],
  ko: ["어떤 서비스를 제공하나요?", "사이버 보안에 대해 알려주세요", "비용은 얼마인가요?", "어떻게 연락할 수 있나요?"],
  hi: ["आप कौन सी सेवाएँ प्रदान करते हैं?", "साइबर सुरक्षा के बारे में बताएं", "कितनी लागत है?", "मैं आपसे कैसे संपर्क कर सकता हूँ?"],
};

const LANGGreetings: Record<string, string[]> = {
  en: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
  es: ["hola", "buenos días", "buenas tardes", "buenas noches"],
  fr: ["bonjour", "salut", "bonsoir", "bon matin"],
  pt: ["olá", "oi", "bom dia", "boa tarde", "boa noite"],
  de: ["hallo", "guten morgen", "guten tag", "guten abend"],
  it: ["ciao", "buongiorno", "buonasera", "salve"],
  nl: ["hallo", "goedemorgen", "goedemiddag", "goedenavond"],
  ru: ["привет", "здравствуйте", "доброе утро", "добрый день", "добрый вечер"],
  zh: ["你好", "您好", "早上好", "下午好", "晚上好"],
  ja: ["こんにちは", "おはよう", "こんばんは", "はじめまして"],
  ko: ["안녕하세요", "안녕하십니까", "좋은 아침"],
  ar: ["مرحبا", "أهلا", "صباح الخير", "مساء الخير"],
  hi: ["नमस्ते", "नमस्कार", "शुभ प्रभात", "शुभ संध्या"],
  tr: ["merhaba", "iyi günler", "günaydın", "iyi akşamlar"],
  pl: ["cześć", "witaj", "dzień dobry", "dobry wieczór"],
  th: ["สวัสดี", "สวัสดีครับ", "สวัสดีค่ะ"],
  vi: ["xin chào", "chào bạn", "xin chào buổi sáng"],
  id: ["halo", "hai", "selamat pagi", "selamat siang"],
  ms: ["halo", "hai", "selamat pagi", "selamat petang"],
  sw: ["habari", "jambo", "hujambo", "salaam"],
  tl: ["kamusta", "hello", "hi"],
  bn: ["নমস্কার", "হ্যালো", "শুভ সকাল"],
  ur: ["السلام علیکم", "ہیلو", "صبح بخیر"],
  fa: ["سلام", "درود", "صبح بخیر"],
  he: ["שלום", "בוקר טוב", "ערב טוב"],
  el: ["γεια σας", "γεια", "καλημέρα"],
  cs: ["ahoj", "dobrý den", "dobré odpoledne"],
  ro: ["bună ziua", "salut", "bună dimineața"],
  hu: ["szia", "jó napot", "jó reggelt"],
  sv: ["hej", "god dag", "god morgon"],
  no: ["hei", "god dag", "god morgon"],
  da: ["hej", "god dag", "god morgen"],
  fi: ["hei", "hyvää päivää", "huomenta"],
  uk: ["привіт", "добрий день", "доброго ранку"],
  bg: ["здравейте", "здравей", "добро утро"],
  hr: ["zdravo", "dobar dan", "dobro jutro"],
  sk: ["ahoj", "dobrý deň", "dobré ráno"],
  lt: ["labas", "laba diena", "labas rytas"],
  lv: ["sveiki", "labdien", "labrīt"],
  et: ["tere", "tere hommikust", "head päeva"],
  ka: ["გამარჯობა", "დილა მშვიდობისა"],
  hy: ["բարև", "բարի լույս"],
  az: ["salam", "sabahınız xeyir"],
  kk: ["сәлем", "қайырлы таң"],
  uz: ["salom", "xayrli kun"],
  mn: ["сайн байна уу", "мөнх тэнгэрийн хүчин дүүрэг"],
  ne: ["नमस्ते", "नमस्कार"],
  si: ["ආයුබෝවන්", "හලෝ"],
  my: ["မင်္ဂလာပါ"],
  km: ["សួស្តី"],
  lo: ["ສະບາຍດີ"],
  am: ["ሰላም", "እንኳን ደህና ነጋህ"],
  yo: ["bawo ni", "kaabo"],
  ig: ["ndewo", "kedu"],
  ha: ["sannu", "salama"],
  zu: ["sawubona", "unjani"],
  xh: ["molo", "unjani"],
  so: ["salama", "subax wanaagsan"],
  af: ["hallo", "goedendag"],
  sq: ["përshëndetje", "tungjatjeta"],
  mk: ["здраво", "добар ден"],
  mt: ["bonġu", "hello"],
  is: ["halló", "góðan daginn"],
  ga: ["dia duit", "haigh"],
  cy: ["helô", "bore da"],
  eu: ["kaixo", "egun on"],
  ca: ["hola", "bon dia"],
  gl: ["ola", "bos días"],
};

const KNOWN_LANGS = Object.keys(LANGGreetings);

function detectLanguage(text: string): string {
  const lower = text.toLowerCase().trim();
  for (const lang of KNOWN_LANGS) {
    const greetings = LANGGreetings[lang] || [];
    for (const g of greetings) {
      if (lower === g || lower.startsWith(g + " ") || lower.endsWith(" " + g) || lower.includes(g)) {
        return lang;
      }
    }
  }
  if (/[\u4e00-\u9fff]/.test(text)) return "zh";
  if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) return "ja";
  if (/[\uac00-\ud7af]/.test(text)) return "ko";
  if (/[\u0600-\u06ff]/.test(text)) return "ar";
  if (/[\u0900-\u097f]/.test(text)) return "hi";
  if (/[\u0e00-\u0e7f]/.test(text)) return "th";
  if (/[\u0400-\u04ff]/.test(text)) return "ru";
  if (/[\u0590-\u05ff]/.test(text)) return "he";
  if (/[\u0370-\u03ff]/.test(text)) return "el";
  if (/[\u1000-\u109f]/.test(text)) return "my";
  if (/[\u1780-\u17ff]/.test(text)) return "km";
  if (/[\u0e80-\u0eff]/.test(text)) return "lo";
  if (/[\u1200-\u137f]/.test(text)) return "am";
  if (/[\u10a0-\u10ff]/.test(text)) return "ka";
  if (/[\u0530-\u058f]/.test(text)) return "hy";
  const swWords = [
    "watu", "serikali", "kazi", "mwaka", "wakati", "mji", "rais", "mataifa",
    "uchaguzi", "kwenye", "amani", "usalama", "shirika", "mambo", "mpya",
    "viongozi", "kimataifa", "nje", "kiongozi", "kubwa", "dunia", "tangu",
    "wiki", "kabla", "polisi", "mashariki", "vita", "taifa", "mpango",
    "haki", "tena", "baraza", "mkono", "nafasi", "zamani", "raia",
    "kufanya", "wengine", "ndani", "taarifa", "wengi", "umoja", "magharibi",
    "chini", "bado", "fedha", "njia", "sana", "bila", "sababu", "sheria",
    "muhimu", "mbali", "mtu", "kuna", "maeneo", "kutoa", "anasema", "mwisho",
    "tayari", "alikuwa", "tatu", "matokeo", "mahakama", "utawala", "ripoti",
    "idadi", "nguvu", "vikosi", "sehemu", "masuala", "suala", "hakuna",
    "watoto", "maisha", "uchumi", "kiasi", "asilimia", "wenye", "mwenye",
    "wote", "mbele", "kupata", "biashara", "ulinzi", "kali", "mkataba",
    "kiuchumi", "huru", "nyumbani", "kampuni", "mafuta", "mapema", "kufikia",
    "sita", "ajili", "muungano", "tarehe", "misaada", "wanachama", "uhuru",
    "wanawake", "rasmi", "kutumia", "jambo", "yote", "nyingine", "sera",
    "maendeleo", "yenye", "kuanza", "katiba", "kituo", "hatari", "mabadiliko",
    "siasa", "miezi", "vikwazo", "mgogoro", "jamii", "wazi", "msaada",
    "nyingi", "mpaka", "binadamu", "uhusiano", "tume", "wananchi", "wizara",
    "msimu", "shughuli", "kutaka", "lengo", "kiwango", "kupitia", "michezo",
    "matumaini", "hapa", "kesi", "lazima", "mazingira", "vijana", "nini",
    "maji", "aina", "kupiga", "bora", "tofauti", "kwenda", "mbaya",
    "ushirikiano", "ujumbe", "matatizo", "kesho", "sawa", "usiku", "uongozi",
    "wafanyakazi", "maelfu", "wito", "wasiwasi", "mchezo", "basi", "nusu",
    "moto", "afya", "yoyote", "jinsi", "chakula", "mrefu", "uwezo",
    "haraka", "kawaida", "nyuma", "mengi", "ardhi", "maalum", "mwingine",
    "kuongeza", "changamoto", "dakika", "baadaye", "kifo", "mamlaka",
    "kutafuta", "kutokea", "jumla", "kuliko", "mtandao", "kuwepo", "kuweka",
    "jina", "maana", "bilioni", "ulimwengu", "kijamii", "mashabiki",
    "mafanikio", "mbalimbali", "maarufu", "ishara", "kujaribu", "taratibu",
    "kuomba", "kujenga", "ushahidi", "mipaka", "wataalamu", "tajiri",
    "utulivu", "visa", "hukumu", "rekodi", "kutetea", "wanafunzi", "kibiashara",
    "mawasiliano", "kujitoa", "mafunzo", "anaweza", "kupatikana", "ndogo",
    "mchakato", "sauti", "elimu", "kuunda", "kanisa", "picha",
    "nyumba", "jirani", "barabara", "bei", "vituo", "kitaifa", "ugonjwa",
    "kushiriki", "jiwe", "uhusiano", "mzunguko", "hatua", "safari", "simu",
    "mfano", "familia", "jengo", "hati", "mwananchi", "tuma", "tembea",
    "soma", "jua", "elewa", "leta", "peleka", "sikia", "heshimu", "penda",
    "chagua", "anza", "maliza", "simama", "kaa", "ndio", "hapana", "asante",
    "samahani", "tafadhali", "kwa nini", "je", "wapi", "vipi", "nzuri",
    "yake", "wake", "pia", "bado", "karibu", "tafuta", "omba", "kujua",
    "kuhusu", "huduma", "wasiliana", "namna", "chochote", "kila", "mara",
    "siku", "mwezi", "sasa", "baada", "juu", "ndani", "nje", "mbali",
  ];
  for (const w of swWords) { if (lower.includes(w)) return "sw"; }
  const enWords = ["the","is","are","was","were","have","has","had","do","does","did","will","would","could","should","may","might","can","what","how","when","where","who","which","why","this","that","and","but","or","not","so","if","too","very","just","about","also","here","there","then","now","all","each","every","both","few","more","most","other","some","my","your","his","her","our","their","me","him","us","them","from","with","into","through","during","before","after","i","you","he","she","it","we","they","want","need","know","think","look","find","give","tell","say","make","go","come","take","get","see","use","try","ask","work"];
  let enHits = 0;
  for (const w of enWords) { if (lower.includes(w)) enHits++; }
  if (enHits >= 2) return "en";
  const wordHits: [string, string[], number][] = [
    ["es", ["que", "como", "donde", "para", "con", "puedo", "quiero", "servicios", "cuanto", "tienen", "informacion"], 2],
    ["fr", ["comment", "pourquoi", "pour", "avec", "dans", "mais", "je", "nous", "faire", "services", "combien"], 2],
    ["pt", ["como", "onde", "para", "com", "mas", "eu", "nos", "posso", "quero", "servicos", "quanto"], 2],
    ["de", ["wie", "was", "wo", "warum", "fur", "mit", "aber", "ich", "wir", "konnen", "dienstleistungen", "bitte"], 2],
    ["it", ["come", "dove", "perche", "per", "con", "io", "noi", "posso", "voglio", "servizi", "quanto"], 2],
    ["nl", ["wat", "hoe", "waar", "waarom", "voor", "met", "maar", "ik", "wij", "kunnen", "diensten"], 2],
    ["tr", ["ne", "nasil", "nerede", "neden", "icin", "ile", "ama", "ben", "biz", "hizmetler", "var"], 2],
  ];
  for (const [lang, words, threshold] of wordHits) {
    let hits = 0;
    for (const w of words) { if (lower.includes(w)) hits++; }
    if (hits >= threshold) return lang;
  }
  return "en";
}

const WELCOME_MESSAGES: Record<string, string> = {
  en: "Hello! I'm the TIXSYNC AI Assistant. I can help you learn about our services, pricing, and how we can help your business. How can I assist you today?",
  es: "¡Hola! Soy el asistente de IA de TIXSYNC. Puedo ayudarte a conocer nuestros servicios, precios y cómo podemos ayudar a tu negocio. ¿Cómo puedo asistirte hoy?",
  fr: "Bonjour ! Je suis l'assistant IA de TIXSYNC. Je peux vous aider à découvrir nos services, nos tarifs et comment nous pouvons aider votre entreprise. Comment puis-je vous aider aujourd'hui ?",
  pt: "Olá! Sou o assistente de IA da TIXSYNC. Posso ajudá-lo a conhecer nossos serviços, preços e como podemos ajudar seu negócio. Como posso ajudá-lo hoje?",
  de: "Hallo! Ich bin der TIXSYNC KI-Assistent. Ich kann Ihnen helfen, unsere Dienstleistungen, Preise und wie wir Ihrem Unternehmen helfen können kennenzulernen. Wie kann ich Ihnen heute helfen?",
  ar: "مرحبا! أنا مساعد الذكاء الاصطناعي من TIXSYNC. يمكنني مساعدتك في التعرف على خدماتنا وأسعارنا وكيف يمكننا مساعدة عملك. كيف يمكنني مساعدتك اليوم؟",
  zh: "你好！我是TIXSYNC AI助手。我可以帮助您了解我们的服务、价格以及我们如何帮助您的企业。今天我能为您提供什么帮助？",
  ja: "こんにちは！TIXSYNC AIアシスタントです。サービス、料金、お客様のビジネスをどのようにサポートできるかについてお手伝いします。本日はどのようなご用件でしょうか？",
  ko: "안녕하세요! TIXSYNC AI 어시스턴트입니다. 서비스, 가격, 그리고 귀하의 비즈니스를 어떻게 도울 수 있는지 알아보는 데 도움을 드릴 수 있습니다. 오늘 무엇을 도와드릴까요?",
  hi: "नमस्ते! मैं TIXSYNC AI सहायक हूँ। मैं आपको हमारी सेवाओं, कीमतों और हम आपके व्यवसाय की कैसे मदद कर सकते हैं, इसके बारे में जानने में मदद कर सकता हूँ। आज मैं आपकी कैसे सहायता कर सकता हूँ?",
  tr: "Merhaba! Ben TIXSYNC AI asistanıyız. Hizmetlerimiz, fiyatlandırma ve işletmenize nasıl yardımcı olabileceğimiz hakkında bilgi almanıza yardımcı olabilirim. Bugün size nasıl yardımcı olabilirim?",
  ru: "Привет! Я ИИ-ассистент TIXSYNC. Я могу помочь вам узнать о наших услугах, ценах и о том, как мы можем помочь вашему бизнесу. Чем я могу вам помочь сегодня?",
  it: "Ciao! Sono l'assistente IA di TIXSYNC. Posso aiutarti a scoprire i nostri servizi, i prezzi e come possiamo aiutare la tua attività. Come posso aiutarti oggi?",
  nl: "Hallo! Ik ben de TIXSYNC AI-assistent. Ik kan u helpen onze diensten, prijzen en hoe we uw bedrijf kunnen helpen te leren kennen. Hoe kan ik u vandaag helpen?",
  pl: "Cześć! Jestem asystentem AI TIXSYNC. Mogę pomóc Ci poznać nasze usługi, ceny i jak możemy pomóc Twojej firmie. Jak mogę Ci dzisiaj pomóc?",
  th: "สวัสดี! ฉันเป็นผู้ช่วย AI ของ TIXSYNC ฉันสามารถช่วยคุณเรียนรู้เกี่ยวกับบริการ ราคา และวิธีที่เราสามารถช่วยธุรกิจของคุณได้ วันนี้ฉันจะช่วยคุณได้อย่างไร?",
  vi: "Xin chào! Tôi là trợ lý AI của TIXSYNC. Tôi có thể giúp bạn tìm hiểu về dịch vụ, giá cả và cách chúng tôi có thể giúp doanh nghiệp của bạn. Hôm nay tôi có thể giúp gì cho bạn?",
  id: "Halo! Saya asisten AI TIXSYNC. Saya dapat membantu Anda mempelajari layanan, harga, dan bagaimana kami dapat membantu bisnis Anda. Apa yang bisa saya bantu hari ini?",
  sw: "Habari! Mimi ni msaidizi wa AI wa TIXSYNC. Ninaweza kukusaidia kujifunza kuhusu huduma zetu, bei, na jinsi tunavyoweza kusaidia biashara yako. Nikisaidiaje leo?",
  tl: "Kamusta! Ako ang TIXSYNC AI assistant. Matutulungan kita na malaman ang aming mga serbisyo, presyo, at kung paano namin matutulungan ang iyong negosyo. Paano kita matutulungan ngayon?",
  bn: "নমস্কার! আমি TIXSYNC AI সহকারী। আমি আপনাকে আমাদের সেবা, মূল্য এবং আমরা কীভাবে আপনার ব্যবসাকে সাহায্য করতে পারি তা জানতে সাহায্য করতে পারি। আজ আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
  ur: "السلام علیکم! میں TIXSYNC AI معاون ہوں۔ میں آپ کو ہماری خدمات، قیمتوں اور ہم آپ کے کاروبار کی کیسے مدد کر سکتے ہیں کے بارے میں جاننے میں مدد کر سکتا ہوں۔ آج میں آپ کی کیسے مدد کر سکتا ہوں?",
  fa: "سلام! من دستیار هوش مصنوعی TIXSYNC هستم. می‌توانم به شما در شناخت خدمات، قیمت‌ها و نحوه کمک به کسب‌وکارتان کمک کنم. امروز چگونه می‌توانم کمکتان کنم?",
  he: "שלום! אני עוזר ה-AI של TIXSYNC. אני יכול לעזור לך ללמוד על השירותים, המחירים וכיצד נוכל לעזור לעסק שלך. איך אני יכול לעזור לך היום?",
  el: "Γεια σας! Είμαι ο βοηθός AI της TIXSYNC. Μπορώ να σας βοηθήσω να μάθετε για τις υπηρεσίες, τις τιμές και πώς μπορούμε να βοηθήσουμε την επιχείρησή σας. Πώς μπορώ να σας βοηθήσω σήμερα;",
  cs: "Ahoj! Jsem AI asistent TIXSYNC. Můžu vám pomoci dozvědět se o našich službách, cenách a jak můžeme pomoci vašemu podnikání. Jak vám mohu dnes pomoci?",
  ro: "Bună ziua! Sunt asistentul AI TIXSYNC. Vă pot ajuta să aflați despre serviciile, prețurile și cum vă putem ajuta afacerea. Cum vă pot ajuta astăzi?",
  hu: "Szia! A TIXSYNC AI asszisztense vagyok. Segíthetek megismerni szolgáltatásainkat, árainkat és hogyan segíthetünk vállalkozásának. Hogyan segíthetek ma?",
  sv: "Hej! Jag är TIXSYNC AI-assistent. Jag kan hjälpa dig lära dig om våra tjänster, priser och hur vi kan hjälpa din verksamhet. Hur kan jag hjälpa dig idag?",
  no: "Hei! Jeg er TIXSYNC AI-assistent. Jeg kan hjelpe deg å lære om våre tjenester, priser og hvordan vi kan hjelpe bedriften din. Hvordan kan jeg hjelpe deg i dag?",
  da: "Hej! Jeg er TIXSYNC AI-assistent. Jeg kan hjælpe dig med at lære om vores tjenester, priser og hvordan vi kan hjælpe din virksomhed. Hvordan kan jeg hjælpe dig i dag?",
  fi: "Hei! Olen TIXSYNC AI-avustaja. Voin auttaa sinua oppimaan palveluistaamme, hinnoistamme ja miten voimme auttaa liiketoimintaasi. Mitä voin auttaa sinua tänään?",
  uk: "Привіт! Я AI-ассистент TIXSYNC. Я можу допомогти вам дізнатися про наші послуги, ціни та як ми можемо допомогти вашому бізнесу. Чим я можу вам допомогти сьогодні?",
  bg: "Здравейте! Аз съм AI асистентът на TIXSYNC. Мога да ви помогна да научите за нашите услуги, цени и как можем да помогнем на вашия бизнес. Как мога да ви помогна днес?",
  hr: "Zdravo! Ja sam TIXSYNC AI asistent. Mogu vam pomoći da saznate o našim uslugama, cijenama i kako vam možemo pomoći u poslovanju. Kako vam mogu pomoći danas?",
  sk: "Ahoj! Som AI asistent TIXSYNC. Môžem vám pomôcť dozvedieť sa o našich službách, cenách a ako môžeme pomôcť vášmu podnikaniu. Ako vám môžem dnes pomôcť?",
  lt: "Laba diena! Aš esu TIXSYNC AI asistentas. Galiu padėti sužinoti apie mūsų paslaugas, kainas ir kaip galime padėti jūsų verslui. Kaip galiu jums padėti šiandien?",
  lv: "Sveiki! Esmu TIXSYNC AI asistents. Varu jums palīdzēt uzzināt par mūsu pakalpojumiem, cenām un kā mēs varam palīdzēt jūsu uzņēmumam. Kā es varu jums palīdzēt šodien?",
  et: "Tere! Olen TIXSYNC AI assistent. Saan aidata teil teada saada meie teenustest, hindadest ja kuidas saame teie ettevõtet aidata. Kuidas saan teid täna aidata?",
  ka: "გამარჯობა! მე ვარ TIXSYNC AI ასისტენტი. მე შემიძლია დაგეხმაროთ ჩვენი სერვისების, ფასების და როგორ შეგვიძლია დაგეხმაროთ თქვენს ბიზნესში გაცნობაში. როგორ შემიძლია დაგეხმაროთ დღეს?",
  hy: "Բարև Ձեզ! Ես TIXSYNC AI օգնականն եմ: Կարող եմ օգնել Ձեզ ծանոթանալ մեր ծառայություններին, գներին և թե ինչպես կարող ենք օգնել Ձեր բիզնեսին: Ինչպե՞ս կարող եմ օգնել Ձեզ այսօր:",
  az: "Salam! Mən TIXSYNC AI köməkçisiyəm. Xidmətlərimiz, qiymətlərimiz və işinizə necə kömək edə biləcəyimiz haqqında məlumat əldə etməyinizə kömək edə bilərəm. Bu gün sizə necə kömək edə bilərəm?",
  kk: "Сәлем! Мен TIXSYNC AI көмекшісімін. Сізге біздің қызметтеріміз, бағаларымыз және бизнесіңізге қалай көмектесе алатынымыз туралы білуге көмектесе аламын. Бүгін сізге қалай көмектесе аламын?",
  uz: "Salom! Men TIXSYNC AI yordamchisiman. Xizmatlarimiz, narxlarimiz va biz sizning biznesingizga qanday yordam bera olishimiz haqida bilib olishingizga yordam bera olaman. Bugun sizga qanday yordam bera olaman?",
  mn: "Сайн байна уу! Би TIXSYNC AI туслах юм. Бидний үйлчилгээ, үнэ болон бид танай бизнесийг хэрхэн тусалж чадах талаар мэдэхэд тусалж чадна. Өнөөдөр танд хэрхэн тусалж чадах вэ?",
  ne: "नमस्ते! म TIXSYNC AI सहायक हुँ। म तपाईंलाई हाम्रा सेवाहरू, मूल्यहरू र हामी तपाईंको व्यवसायलाई कसरी सहयोग गर्न सक्छौं भनेर जान्न मद्दत गर्न सक्छु। आज म तपाईंलाई कसरी सहयोग गर्न सक्छु?",
  am: "ሰላም! እኔ TIXSYNC AI ረዳት ነኝ። አገልግሎቶቻችን፣ ዋጋዎቻችን እና ንግዶዎን እንዴት ልንረዳ እንደምንችል ለመ营知道 ልረዳዎት እችላለሁ። ዛሬ እንዴት ልረዳዎት እችላለሁ?",
  yo: "Bawo ni! Mo ni TIXSYNC AI olud帮忙. Mo le ran yin lọwọ lati mọ siwa services wa, awọn owe ati bi a se le ran iṣẹ yin lọwọ. Bawo ni mo le ran yin lọwọ lọla?",
  ig: "Ndewo! Abụ m TIXSYNC AI onye enyemaka. Enwere m ike inyere gị aka ịmata ngwaahịa anyị, ọnụ ahịa na otu anyị nwere ike inyere azụmahịa gị aka. Kedụ ka m nwere ike inyere gị aka taa?",
  ha: "Sannu! Ni ne mai taimako na TIXSYNC AI. Zan iya taimaka wajen sanannen ayyukanmu, farashi, kuma yadda za mu taimaka wa kasuwancinku. Yadda zan iya taimaka muku yau?",
  zu: "Sawubona! NginguTIXSYNC AI usizo. Nginokusiza ukufunda ngolwazi lwethu, intengo, kanye nendlela esingakusiza ngayo ibhizinisi lakho. Ngingakusiza kanjani namuhla?",
  xh: "Molo! NdiyiTIXSYNC AI uncedo. Ndinokukunceda ufunde ngabaxhasi bethu, iindleko, kubahe ndlela esinokukunceda ngayo ubunikazi bakho. Ndinokunceda njani namhlanje?",
  so: "Salama! Anaa ah gacaliyaha AI ee TIXSYNC. Waxaan ku caawin karaa inaad ku barato adeegyadayada, qiimaha iyo sida aan ku caawin karno ganacsigaada. Sidee aan ku caawin karaa maanta?",
  af: "Hallo! Ek is die TIXSYNC AI-assistent. Ek kan jou help om ons dienste, pryse en hoe ons jou besigheid kan help, te leer ken. Hoe kan ek jou vandag help?",
  sq: "Përshëndetje! Unë jam asistenti AI i TIXSYNC. Unë mund t'ju ndihmoj të mësoni për shërbimet, çmimet dhe se si mund t'ju ndihmojmë biznesit tuaj. Si mund t'ju ndihmoj sot?",
  mk: "Здраво! Јас сум AI асистентот на TIXSYNC. Можам да ви помогнам да дознаете за нашите услуги, цени и како можеме да помогнеме во вашиот бизнис. Како можам да ви помогнам денес?",
  mt: "Bonġu! Jien l-għajnuna AI tal-TIXSYNC. Nista' ngħinek titgħallem dwar is-servizzi tagħna, il-prezzijiet u kif nistgħu ngħinu l-business tiegħek. Kif nista' ngħinek illum?",
  is: "Halló! Ég er TIXSYNC AI aðstoðarmaður. Ég get aðstoðað þig við að kynnast þjónustu okkar, verði og hvernig við getum hjálpað fyrirtæki þínu. Hvernig get ég hjálpað þér í dag?",
  ga: "Dia duit! Is é mo ainm TIXSYNC AI cúntóir. Is féidir liom cabhrú leat foghlaim faoina seirbhísí, praghsanna agus conas is féidir linn cabhrú le do ghnó. Conas is féidir liom cabhrú leat inniu?",
  cy: "Helô! Yr ydw i'n gynorthwyydd AI TIXSYNC. Galla'ch helpu chi ddysgu am ein gwasanaethau, prisiau a sut y gallwn helpu eich busnes. Sut galla'ch helpu chi heddiw?",
  eu: "Kaixo! TIXSYNC AI laguntzailea naiz. Zure negozioari nola lagundu ahal diegun, gure zerbitzuak, prezioak eta ezagutzen lagundu zaitzakedake. Nola lagun zaitzake gaur?",
  ca: "Hola! Sóc l'assistent IA de TIXSYNC. Puc ajudar-te a conèixer els nostres serveis, preus i com podem ajudar el teu negoci. Com et puc ajudar avui?",
  gl: "Ola! Son o asistente IA de TIXSYNC. Podo axudarte a coñecer os nosos servizos, prezos e como podemos axudar ao teu negocio. Como che podo axudar hoxe?",
};

function getWelcome(lang: string): string {
  return WELCOME_MESSAGES[lang] || WELCOME_MESSAGES.en;
}

function getSuggested(lang: string): string[] {
  return SUGGESTED_QUESTIONS[lang] || SUGGESTED_QUESTIONS.en;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const browserLang = navigator.language?.split("-")[0] || "en";
    const lang = KNOWN_LANGS.includes(browserLang) ? browserLang : "en";
    setLanguage(lang);
    setMessages([{ role: "assistant", content: getWelcome(lang), timestamp: Date.now() }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const detectedLang = detectLanguage(trimmed);
    if (detectedLang !== language) setLanguage(detectedLang);

    const userMsg: Message = { role: "user", content: trimmed, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg], language: detectedLang }),
      });
      const data = await res.json();
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply, timestamp: Date.now() }]);
        setIsTyping(false);
      }, 600 + Math.random() * 800);
    } catch {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again.", timestamp: Date.now() }]);
        setIsTyping(false);
      }, 500);
    }
  }, [messages, language]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    sendMessage(input);
  }

  function formatTime(ts: number): string {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-5 z-50 w-[380px] h-[560px] rounded-2xl border border-white/10 bg-surface-900/95 backdrop-blur-xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-surface-800/80 to-surface-800/60">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-600/20 text-brand-400">
                    <Bot size={20} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-surface-800" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">TIXSYNC AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <p className="text-[10px] text-emerald-400">Online</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-surface-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Minimize2 size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-surface-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 px-4 py-2.5 border-b border-white/5 overflow-x-auto scrollbar-none">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  onClick={() => sendMessage(action.message)}
                  className="shrink-0 px-3 py-1.5 text-[11px] font-medium rounded-full bg-brand-600/10 text-brand-400 border border-brand-500/20 hover:bg-brand-600/20 hover:border-brand-500/40 transition-all"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-600/20 text-brand-400 shrink-0 mr-2 mt-1">
                      <Bot size={14} />
                    </div>
                  )}
                  <div className="max-w-[75%]">
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-brand-600 text-white rounded-br-md"
                          : "bg-surface-800 text-surface-100 border border-white/5 rounded-bl-md"
                      }`}
                    >
                      <span className="whitespace-pre-wrap">{msg.content}</span>
                    </div>
                    <p className={`text-[10px] text-surface-500 mt-1 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                  {msg.role === "user" && (
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-600/20 text-brand-400 shrink-0 ml-2 mt-1">
                      <User size={14} />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-600/20 text-brand-400 shrink-0 mr-2">
                    <Bot size={14} />
                  </div>
                  <div className="bg-surface-800 border border-white/5 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" />
                    </div>
                  </div>
                </motion.div>
              )}

              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {getSuggested(language).map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="px-3 py-1.5 text-[11px] rounded-full bg-surface-800 text-surface-300 border border-white/10 hover:bg-surface-700 hover:text-white transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-3 py-3 border-t border-white/10 bg-surface-800/40">
              <div className="flex items-center gap-2 bg-surface-900/80 rounded-xl border border-white/10 px-3 py-1.5 focus-within:border-brand-500/50 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  disabled={isTyping}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-surface-500 outline-none py-1.5"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2 rounded-lg bg-brand-600 text-white hover:bg-brand-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-white/5 bg-surface-900/60">
              <p className="text-[9px] text-center text-surface-500 flex items-center justify-center gap-1">
                <Sparkles size={10} className="text-brand-400" />
                Powered by TIXSYNC AI • Available 24/7
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 bg-brand-600 text-white hover:bg-brand-500 hover:shadow-brand-500/30"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
          </span>
        )}
      </motion.button>
    </>
  );
}
