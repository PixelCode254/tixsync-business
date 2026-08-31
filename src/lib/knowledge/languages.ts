export type LangCode =
  | "en" | "sw" | "fr" | "es" | "pt" | "de" | "it" | "nl" | "ru" | "uk"
  | "zh" | "ja" | "ko" | "ar" | "hi" | "bn" | "ur" | "fa" | "he" | "tr"
  | "pl" | "cs" | "sk" | "ro" | "hu" | "bg" | "hr" | "sr" | "sl" | "lt"
  | "lv" | "et" | "fi" | "sv" | "no" | "da" | "is" | "ga" | "cy" | "mt"
  | "el" | "ka" | "hy" | "az" | "kk" | "uz" | "mn" | "ne" | "si" | "my"
  | "th" | "vi" | "id" | "ms" | "tl" | "am" | "ha" | "yo" | "ig"
  | "zu" | "xh" | "af" | "so" | "rw" | "mg" | "st" | "sn" | "eo" | "la"
  | "ca" | "eu" | "gl" | "br" | "co" | "fy" | "lb" | "mk" | "sq" | "bs"
  | "mi" | "haw" | "sm" | "to" | "fj" | "ny" | "wo" | "ff"
  | "bm" | "dy" | "lg" | "rn" | "sg" | "lo" | "km" | "bo" | "dz";

export const SUPPORTED_LANGUAGES: Record<LangCode, string> = {
  en: "English", sw: "Kiswahili", fr: "Francais", es: "Espanol", pt: "Portugues",
  de: "Deutsch", it: "Italiano", nl: "Nederlands", ru: "Russkij", uk: "Ukrainska",
  zh: "Zhongwen", ja: "Nihongo", ko: "Hangugeo", ar: "Alarabiya", hi: "Hindi",
  bn: "Bangla", ur: "Urdu", fa: "Farsi", he: "Ivrit", tr: "Turkce",
  pl: "Polski", cs: "Cestina", sk: "Slovencina", ro: "Romana", hu: "Magyar",
  bg: "Balgarski", hr: "Hrvatski", sr: "Srpski", sl: "Slovenscina", lt: "Lietuviu",
  lv: "Latvietsu", et: "Eesti", fi: "Suomi", sv: "Svenska", no: "Norsk",
  da: "Dansk", is: "Islenska", ga: "Gaeilge", cy: "Cymraeg", mt: "Malti",
  el: "Ellinika", ka: "Kartuli", hy: "Hayeren", az: "Azarbaycanca", kk: "Qazaqsha",
  uz: "Ozbekcha", mn: "Mongol", ne: "Nepali", si: "Sinhala", my: "Myanmasa",
  th: "Thai", vi: "Tieng Viet", id: "Bahasa Indonesia", ms: "Bahasa Melayu",
  tl: "Filipino", am: "Amharic", ha: "Hausa", yo: "Yoruba", ig: "Igbo",
  zu: "isiZulu", xh: "isiXhosa", af: "Afrikaans", so: "Soomaali", rw: "Kinyarwanda",
  mg: "Malagasy", st: "Sesotho", sn: "chiShona", eo: "Esperanto", la: "Latina",
  ca: "Catala", eu: "Euskara", gl: "Galego", br: "Brezhoneg", co: "Corsu",
  fy: "Frysk", lb: "Letzebuergesch", mk: "Makedonski", sq: "Shqip", bs: "Bosanski",
  mi: "Maori", haw: "Olelo Hawaiii", sm: "Gagana Samoa", to: "Lea faka-Tonga",
  fj: "Na Vosa Vakaviti", ny: "Chichewa", wo: "Wolof", ff: "Fulfulde",
  bm: "Bamanankan", dy: "Jula", lg: "Luganda", rn: "Kirundi", sg: "Sango",
  lo: "Lao", km: "Khmer", bo: "Tibetan", dz: "Dzongkha",
};

const GREETINGS: Record<string, string[]> = {
  en: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "howdy", "whats up"],
  sw: ["habari", "jambo", "hujambo", "mambo", "sawa", "karibu", "salama", "nihali gani"],
  fr: ["bonjour", "salut", "bonsoir", "bonne nuit", "coucou", "allo"],
  es: ["hola", "buenos dias", "buenas tardes", "buenas noches", "que tal", "como estas", "buenas"],
  pt: ["ola", "oi", "bom dia", "boa tarde", "boa noite", "e ai", "como vai"],
  de: ["hallo", "guten morgen", "guten tag", "guten abend", "gruss gott", "moin"],
  it: ["ciao", "buongiorno", "buonasera", "salve", "ehi"],
  nl: ["hallo", "goedemorgen", "goedemiddag", "hoi", "hey", "dag"],
  ru: ["privet", "zdravstvuyte", "dobroye utro", "dobryy den", "dobryy vecher"],
  uk: ["privit", "dobriy den", "dobroho ranku", "dobroho vechora", "vitayu"],
  zh: ["nihao", "nin hao", "zaoshang hao", "xiawu hao", "wanshang hao"],
  ja: ["konnichiwa", "ohayou", "konbanwa", "ya", "doumo", "hajimemashite"],
  ko: ["annyeonghaseyo", "annyeonghasimnikka", "bangapseumnida", "annyeong"],
  ar: ["marhaba", "ahlan", "sabah al-khayr", "masa al-khayr", "al-salamu alaykum"],
  hi: ["namaste", "namaskar", "shubh prabhat", "shubh sandhya", "hello"],
  bn: ["nomoshkar", "hello", "shubho sakal", "shubho dupur"],
  ur: ["assalam-o-alaikum", "hello", "subah bakhair", "shaam bakhair"],
  fa: ["salam", "sobh bokheir", "asr bokheir"],
  he: ["shalom", "boker tov", "erev tov", "hi"],
  tr: ["merhaba", "gunaydin", "iyi gunler", "iyi aksamlar", "selam", "hey", "naber"],
  pl: ["czesc", "witaj", "dzien dobry", "dobry wieczor", "siema"],
  cs: ["ahoj", "dobry den", "dobre rano", "dobry vecer", "cau"],
  sk: ["ahoj", "dobry den", "dobre rano", "dobry vecer", "cau"],
  ro: ["buna ziua", "salut", "buna dimineata", "buna seara", "ceau"],
  hu: ["szia", "jo napot", "jo reggelt", "jo estet", "hello"],
  bg: ["zdraveyte", "zdravey", "dobro utro", "dobar den", "dobur vecher"],
  hr: ["zdravo", "dobar dan", "dobro jutro", "dobra vecer", "cao", "bok"],
  sr: ["zdravo", "dobar dan", "dobro jutro", "dobro vece", "cao"],
  sl: ["zdravo", "dober dan", "dobro jutro", "dober vecer", "zivjo"],
  lt: ["labas", "laba diena", "labas rytas", "labas vakaras", "sveikas"],
  lv: ["sveiki", "labdien", "labrit", "labvakar", "sveiks"],
  et: ["tere", "tere hommikust", "head paeva", "tere ohtust", "tsau"],
  fi: ["hei", "hyvaa paivaa", "huomenta", "hyvaa iltaa", "moi"],
  sv: ["hej", "god dag", "god morgon", "god kvall", "tjena", "hallo"],
  no: ["hei", "god dag", "god morgen", "god kveld", "hallo"],
  da: ["hej", "god dag", "god morgen", "god aften", "hejsa"],
  is: ["hallo", "godan daginn", "godan dag"],
  ga: ["dia duit", "haigh", "maith an lae"],
  cy: ["heloshwmae", "bore da", "pryd nos"],
  mt: ["bonġu", "merhaba", "l-godwa"],
  el: ["geia sas", "geia sou", "kalimera", "kalispera", "ti kaneis"],
  ka: ["gamarjoba", "dila mshvidobisa", "magharloba"],
  hy: ["barev", "barev luis", "barev yereko"],
  az: ["salam", "sabahiniz xeyir", "gunortaniz xeyir"],
  kk: ["salem", "qayirly tan", "qayirly kun"],
  uz: ["salom", "xayrli kun", "xayrli ertalab"],
  mn: ["sain baina uu", "ugliin mend", "udriin mend"],
  ne: ["namaste", "namaskar", "shubh prabhat", "shubh sandhya"],
  si: ["ayubowan", "hello", "suba wewa", "suba sayin"],
  my: ["mingalaba", "hello", "mingalaba naychin"],
  th: ["sawatdee", "sawatdee kha", "sawatdee krub", "waddee"],
  vi: ["xin chao", "chao ban", "chao anh", "chao chi"],
  id: ["halo", "hai", "selamat pagi", "selamat siang", "selamat sore", "selamat malam"],
  ms: ["halo", "hai", "selamat pagi", "selamat petang", "apa khabar"],
  tl: ["kamusta", "hello", "magandang umaga", "magandang hapon"],
  am: ["selam", "indemen", "ere intsae", "ere malak"],
  ha: ["sannu", "barka", "inuwa", "sannu da zuwa"],
  yo: ["bawo ni", "kaaro", "kaasan", "e ku o"],
  ig: ["ndewo", "mba", "ututu oma", "ehihie oma"],
  zu: ["sawubona", "unjani", "sawubona kusasa", "sawubona ntambama"],
  xh: ["molo", "unjani", "molo kusasa", "molo ntambama"],
  af: ["hallo", "goedemore", "goedemiddag", "dag"],
  so: ["salama", "subax wanaagsan", "galab wanaagsan", "fiidnimo"],
  rw: ["muraho", "mwaramutse", "mwiriwe", "meza neza"],
  mg: ["manao ahoana", "salama"],
  st: ["lumela", "khotso", "khotso e le hantle"],
  sn: ["mhoro", "mangwanani", "masikati", "manheru"],
  eo: ["saluton", "bonan tagon", "bonan matenon"],
  la: ["salve", "ave", "salvete"],
  ca: ["hola", "bon dia", "bona tarda", "bona nit"],
  eu: ["kaixo", "egun on", "arratsalde on", "gabon"],
  gl: ["ola", "bos dias", "boa tarde", "boa noite"],
  br: ["demat", "mont", "greiz"],
  co: ["bonghjornu", "salute", "bona sera"],
  fy: ["hallo", "goedemorge", "goedemiddei"],
  lb: ["moien", "gudde Moien", "gudde Metteg"],
  mk: ["zdravo", "dobar den", "dobro utro"],
  sq: ["pershendetje", "mirerdita", "miremengjesi"],
  bs: ["zdravo", "dobar dan", "dobro jutro"],
  mi: ["kia ora", "tena koe"],
  haw: ["aloha"],
  sm: ["talofa", "malo"],
  to: ["malo e lelei"],
  fj: ["bula", "yadra"],
  ny: ["moni", "bwino"],
  wo: ["naam", "jam rekk", "assalamu alaikum"],
  ff: ["salamu", "jam noon"],
  bm: ["i ni ce", "ni ce"],
  dy: ["i ni ce", "nia mi"],
  lg: ["gyebale ko", "webale"],
  rn: ["amahoro", "uraho", "muraho"],
  sg: ["mba worou", "mba so"],
  lo: ["sabaidee", "sabaidee bor"],
  km: ["suo sdei", "choum reap suor"],
  bo: ["tashi delek", "kuzuzangpo la"],
  dz: ["kuzu zangpo la", "kuzuzangpo"],
};

function detectByCharRange(text: string): LangCode | null {
  if (/[\u4e00-\u9fff\u3400-\u4dbf]/.test(text)) return "zh";
  if (/[\u3040-\u309f\u30a0-\u30ff\u31f0-\u31ff]/.test(text)) return "ja";
  if (/[\uac00-\ud7af\u1100-\u11ff\u3130-\u318f]/.test(text)) return "ko";
  if (/[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\ufe70-\ufeff]/.test(text)) return "ar";
  if (/[\u0900-\u097f\ua8e0-\ua8ff]/.test(text)) return "hi";
  if (/[\u0980-\u09ff]/.test(text)) return "bn";
  if (/[\u0e00-\u0e7f]/.test(text)) return "th";
  if (/[\u0400-\u04ff\u0500-\u052f]/.test(text)) return "ru";
  if (/[\u0370-\u03ff\u1f00-\u1fff]/.test(text)) return "el";
  if (/[\u10a0-\u10ff\u2d00-\u2dff]/.test(text)) return "ka";
  if (/[\u0530-\u058f]/.test(text)) return "hy";
  if (/[\u0d80-\u0dff]/.test(text)) return "si";
  if (/[\u1000-\u109f\uaa60-\uaa7f]/.test(text)) return "my";
  if (/[\u0e80-\u0eff]/.test(text)) return "lo";
  if (/[\u1780-\u17ff]/.test(text)) return "km";
  if (/[\u0f00-\u0fff]/.test(text)) return "bo";
  if (/[\u1900-\u197f]/.test(text)) return "dz";
  return null;
}

export function detectLanguage(text: string): LangCode {
  const lower = text.toLowerCase().trim();
  for (const [lang, greetings] of Object.entries(GREETINGS)) {
    for (const g of greetings) {
      if (lower === g || lower.startsWith(g + " ") || lower.endsWith(" " + g) || lower.includes(" " + g + " ")) {
        return lang as LangCode;
      }
    }
  }
  const charDetected = detectByCharRange(text);
  if (charDetected) return charDetected;

  const wordPatterns: [LangCode, string[], number][] = [
    ["sw", ["ndio", "hapana", "asante", "samahani", "tafadhali", "kwa nini", "je", "wapi", "nini", "vipi", "sawa", "nzuri", "kazi", "kujua", "kuhusu", "huduma", "bei", "jinsi", "kampuni", "wasiliana", "namna", "chochote", "yake", "wake", "kwenye", "hapa", "pia", "bado", "haraka", "karibu", "tafuta", "omba", "soma", "jua", "elewa", "fanya", "leta", "peleka", "ona", "sikia", "heshimu", "penda", "chagua", "anza", "maliza", "simama", "kaa", "tembea", "run",  "uncia",  "kila",  "mara",  "siku",  "wiki",  "mwezi",  "mwaka",  "sasa",  "baada",  "mbele",  "nyuma",  "juu",  "chini",  "ndani",  "nje",  "karibu",  "mbali"], 2],
    ["es", ["que", "como", "donde", "cuando", "porque", "para", "con", "este", "esta", "puedo", "quiero", "necesito", "servicios", "puedes", "cuanto", "tienen", "informacion"], 2],
    ["fr", ["que", "comment", "pourquoi", "pour", "avec", "dans", "mais", "cette", "ceci", "je", "nous", "vous", "faire", "peux", "voulez", "avez", "services", "combien"], 2],
    ["pt", ["que", "como", "onde", "porque", "para", "com", "mas", "esta", "isso", "eu", "nos", "voce", "posso", "quero", "servicos", "quanto", "tem"], 2],
    ["de", ["wie", "was", "wo", "warum", "fur", "mit", "aber", "diese", "ich", "wir", "sie", "konnen", "mochten", "haben", "dienstleistungen", "wie viel", "bitte"], 2],
    ["it", ["che", "come", "dove", "perche", "per", "con", "senza", "ma", "questo", "io", "noi", "voi", "posso", "voglio", "servizi", "quanto", "avete"], 2],
    ["nl", ["wat", "hoe", "waar", "waarom", "voor", "met", "maar", "deze", "ik", "wij", "jij", "kunnen", "willen", "hebben", "diensten", "hoeveel", "graag"], 2],
    ["tr", ["ne", "nasil", "nerede", "neden", "icin", "ile", "ama", "bu", "ben", "biz", "siz", "yapabilirim", "istiyorum", "hizmetler", "kac", "var"], 2],
    ["pl", ["co", "jak", "gdzie", "dlaczego", "dla", "z", "ale", "ten", "ja", "my", "wy", "mogę", "chcę", "uslugi", "ile", "mają", "prosze"], 2],
    ["ru", ["chto", "kak", "gde", "pochemu", "dlya", "s", "no", "etot", "ya", "my", "vy", "mogu", "khotyu", "uslugi", "skolko", "est"], 2],
  ];

  for (const [lang, words, threshold] of wordPatterns) {
    let matchCount = 0;
    for (const word of words) {
      if (lower.includes(word)) matchCount++;
    }
    if (matchCount >= threshold) return lang as LangCode;
  }
  return "en";
}

export function getNativeGreeting(lang: LangCode): string {
  const greetings: Record<string, string> = {
    en: "Hello! Welcome to TIXSYNC SOLUTIONS. I'm your AI assistant for cybersecurity, web development, cloud infrastructure, and digital transformation. How can I help you today?",
    sw: "Karibu TIXSYNC SOLUTIONS! Mimi ni msaidizi wako wa AI kwa ajili ya ulinzi wa mtandao, uundaji wa wavuti, miundombinu ya wingu, na mabadiliko ya kidijitali. Nikisaidiaje leo?",
    fr: "Bienvenue chez TIXSYNC SOLUTIONS ! Je suis votre assistant IA pour la cybersecurite, le developpement web, l'infrastructure cloud et la transformation numerique. Comment puis-je vous aider aujourd'hui ?",
    es: "Bienvenido a TIXSYNC SOLUTIONS! Soy tu asistente de IA para ciberseguridad, desarrollo web, infraestructura en la nube y transformacion digital. Como puedo ayudarte hoy?",
    pt: "Bem-vindo a TIXSYNC SOLUTIONS! Sou seu assistente de IA para ciberseguranca, desenvolvimento web, infraestrutura em nuvem e transformacao digital. Como posso ajuda-lo hoje?",
    de: "Willkommen bei TIXSYNC SOLUTIONS! Ich bin Ihr KI-Assistent fur Cybersicherheit, Webentwicklung, Cloud-Infrastruktur und digitale Transformation. Wie kann ich Ihnen heute helfen?",
    it: "Benvenuto da TIXSYNC SOLUTIONS! Sono il tuo assistente IA per sicurezza informatica, sviluppo web, infrastruttura cloud e trasformazione digitale. Come posso aiutarti oggi?",
    nl: "Welkom bij TIXSYNC SOLUTIONS! Ik ben uw AI-assistent voor cybersecurity, webontwikkeling, cloudinfrastructuur en digitale transformatie. Hoe kan ik u vandaag helpen?",
    ru: "Dobro pozhalovat v TIXSYNC SOLUTIONS! Ya vash pomoshchnik AI po kiberbezopasnosti, veb-razrabotke, oblachnoy infrastrukture i cifrovoj transformacii. Chem ya mogu vam pomoch segodnya?",
    uk: "Laskavo prosymo do TIXSYNC SOLUTIONS! Ya vash pomichnik AI z kyberbezpeky, web-rozrobky, khmarnoyi infrastruktury ta cyfrovoyi transformatsiyi. Chym ya mozhu vam dopomohty sohnodni?",
    zh: "Huanying laidao TIXSYNC SOLUTIONS! Wo shi nin de AI zhushou, bangzhu nin liaojie wangluo anquan, kaifa, yun jichu shuhua he shuzi zhuanxing. Jintian wo neng wei nin zuo xie shenme?",
    ja: "TIXSYNC SOLUTIONS e youkoso! Watashi wa AI purezetto desu. Saibaeru sekyuriti, web kaihatsu, kuraudo shisetsu, dejitaru toransufoomeshon ni tsuite otetsudai shimasu. Kyou wa donna goyou deshou?",
    ko: "TIXSYNC SOLUTIONS-e osin geul hwanyeonghamnida! Naeneun saibeo boan, web gaebal, keulaeu inpeura mit dijiteol jeonhwan-eul wonhae doeen AI bugeo-ibnida. Oneul museun dowadeurilkkayo?",
    ar: "Marhaban bikum fi TIXSYNC SOLUTIONS! Ana musa'idukum bi-istikhdam al-istina'i li-amn al-saybari, tatawwur al-waib, al-bina' al-tahitiyah al-sahabiyah, wa al-tahawwul al-raqami. Kayfa yumkinuni musa'adatukum alyawm?",
    hi: "TIXSYNC SOLUTIONS mein aapka swagat hai! Main aapka AI sahayak hun, jo cyber suraksha, web vikas, cloud infrastructure aur digital transformation mein aapki sahayata karta hun. Aaj main aapki kaise sahayata kar sakta hun?",
    bn: "TIXSYNC SOLUTIONS-e swagatom! Ami apnar AI sahajyakar kori, cyber nirokhottha, web unnayan, cloud altya, ebong digital rupantor-e apnake sahajya korbo. Aji ami apnake kibhabe sahajya korte pari?",
    ur: "TIXSYNC SOLUTIONS mein khush amdeed! Main aapka AI madadgar hun jo siber security, web development, cloud infrastructure aur digital transformation mein aapki madad karta hun. Aaj main aapki kaise madad kar sakta hun?",
    fa: "Be TIXSYNC SOLUTIONS khosh amadeid! Man yorideghire AI shoma hastam baraye amniat saiberi, towse'e web, zirsaht abri va tahavole digital. Emrouz chetori mitunam komaketun konam?",
    he: "Bruchim habaim le-TIXSYNC SOLUTIONS! Ani madrich ha-AI shelachem le-amplei cybor, pituach ashrai, tiknologia anan u-teransformatsia digital. Ech yachol ani le'ezrachem hayom?",
    tr: "TIXSYNC SOLUTIONS'a hos geldiniz! Siber guvenlik, web gelistirme, bulut altyapisi ve donusum konularinda yardimci AI asistaninizim. Bugun size nasil yardimci olabilirim?",
    pl: "Witamy w TIXSYNC SOLUTIONS! Jestem Twoim asystentem AI ds. cyberbezpieczenstwa, tworzenia stron, infrastruktury chmurowej i transformacji cyfrowej. Jak moge Ci dzis pomoc?",
    cs: "Vitejte v TIXSYNC SOLUTIONS! Jsem vas AI asistent pro kybernetickou bezpecnost, vyvoj webu, cloudovou infrastrukturu a digitalni transformaci. Jak vam mohu dnes pomoci?",
    sk: "Vitajte v TIXSYNC SOLUTIONS! Som vas AI asistent pre kyberneticku bezpecnost, vyvoj webu, cloudovu infrastrukturu a digitalnu transformaciu. Ako vam mozem dnes pomoct?",
    ro: "Bine ati venit la TIXSYNC SOLUTIONS! Sunt asistentul dvs. AI pentru securitate cibernetica, dezvoltare web, infrastructura cloud si transformare digitala. Cum va pot ajuta astazi?",
    hy: "Barev galust TIXSYNC SOLUTIONS! Yes stegh tsank AI ognichun kiberanvuteny, vev macman, ambain yntakarutsyun yev tsvayin paterutsyun masin. Aysor inchpes karogh em ognel dust?",
    az: "TIXSYNC SOLUTIONS-a xosh geldiniz! Men kibertehlukesizlik, web gelistirme, bulud altyapisi ve reqemsal transformasiya sahesinde komekchi AI asistaninizim. Bu gun size neme komek ede bilerem?",
    kk: "TIXSYNC SOLUTIONS-q qos kelldiniz! Men kiberqauepsizdik, web aparw, buluttwq infraqurwlm wndiqw transformatziya boyinsha komekshi AI asistanwngwz. Bugun sizge qalay komek ete alamwn?",
    uz: "TIXSYNC SOLUTIONS ga xush kelibsiz! Men kiberxavfsizlik, veb dasturlash, bulut infratuzilmasi va raqamli transformatsiya bo'yicha yordamchi AI yordamchingizman. Bugun sizga qanday yordam bera olaman?",
    mn: "TIXSYNC SOLUTIONS-d tutaig morilno uu! Bi kiber ariigvi baidal, web huuheel, uulen deed buets toon huuruulaltin tuhai tustaltsakh AI turulch. uurduu taand helcee tuslaaj chadakh ve?",
    ne: "TIXSYNC SOLUTIONS ma swagat cha! Ma tapailako AI sahayak hun, jo cyber suraksha, web vikas, cloud infrastructure ra digital transformation ma tapailai sahayata garchu. Aaja ma tapailai kasari sahayata garna sakchu?",
    th: "Yin dee ton rub TIXSYNC SOLUTIONS! Chan pen AI chuai khun rueang ngeun park cyber, development web, infrastructure cloud, lae kan plian plaeng digital. Wan nee chan chuai arai dai?",
    vi: "Chao mung den voi TIXSYNC SOLUTIONS! Toi la tro ly AI cua ban ve an mang mang, phat trien web, ha tang may tinh va chuyen doi so. Hom nay toi co the giup ban dieu gi?",
    id: "Selamat datang di TIXSYNC SOLUTIONS! Saya adalah asisten AI Anda untuk keamanan siber, pengembangan web, infrastruktur cloud, dan transformasi digital. Apa yang bisa saya bantu hari ini?",
    ms: "Selamat datang ke TIXSYNC SOLUTIONS! Saya adalah pembantu AI anda untuk keselamatan siber, pembangunan web, infrastruktur awan, dan transformasi digital. Apa yang boleh saya bantu hari ini?",
    tl: "Maligayang pagdating sa TIXSYNC SOLUTIONS! Ako ang iyong AI assistant para sa cybersecurity, web development, cloud infrastructure, at digital transformation. Paano kita matutulungan ngayon?",
    am: "Eyakabarew wed TIXSYNC SOLUTIONS! Ezey honAy AI makedasqwe sir sayerbar medhanit, web litmariyet, klayod infrasturukcher, akilk digital metekeliyalew. Qen new eyayhon le metekeliyalew addis ale?",
    ha: "Barka da zuwa TIXSYNC SOLUTIONS! Ni ne mataimakin AI don amincin cybersecurity, ci gaban yanar gizo, injin gogashiya, da canza-dijital. Yadda za a taimaka muku yau?",
    yo: "E ku abo si TIXSYNC SOLUTIONS! Mo ni AI oluranlowo fun aabo ayelujara, development eyan-ayan, infrastruti aabo, ati atunto digital. Bawo ni mo le ran yin lowo lola?",
    ig: "Nnọọ na TIXSYNC SOLUTIONS! Abụ m gosi AI gị maka nchekwa ndọ, mmepe webụsaịtị, infrastructure egwuregwu, na mgbanwe ngwa ngwa ọgụgụ. Kedụ ka m nwere ike inyere gị aka taa?",
    zu: "Sawubona ku-TIXSYNC SOLUTIONS! Ngingu-assisitanti ye-AI ngokuphepha kwe-cyber, ukuthuthukisa i-web, ukuhlinzekwa kwamakhulu, nokuguqulwa kwedijithali. Ngingakusiza kanjani namuhla?",
    xh: "Molo ku-TIXSYNC SOLUTIONS! Ndiyingcali ye-AI yakho ngokhuseleko lwe-cyber, ukuphucula iwebhu, uncedo lwekhowudi, kunye nokuguqulwa kobuchwephesha. Ndinokunceda njani namhlanje?",
    af: "Welkom by TIXSYNC SOLUTIONS! Ek is jou AI-assistent vir kubersekuriteit, webontwikkeling, wolkinfrastruktuur en digitale transformasie. Hoe kan ek jou vandag help?",
    so: "Ku soo dhawoow TIXSYNC SOLUTIONS! Waxaan ahay caawiyaha AI ee amniga internetka, horumarinta web-ka, kaabayaasha darawalada, iyo bedelka dhijitaalka. Sidee aan kuu caawin karaa maanta?",
    rw: "Murakaza neza mu TIXSYNC SOLUTIONS! Ndi AI assistanti yawe ku bushyingo bwikoresha rya interineti, iterambere rya urubuga, ubufatanye bwamabwiriza, no guhinduranya kwadijitali. Dukorera iki uyu munsi?",
    mg: "Tonga soa eto aminny TIXSYNC SOLUTIONS! Izaho no AI mpampifanangianana anao aminny fiarovana aminny Internet, fanambadiana tranonkala, rafitra aminny alavan-kabary, ary fanovana avidy. Ahoana no afaka manampy anao androany?",
    st: "Re a leboha mo TIXSYNC SOLUTIONS! Ke assistante ya hao ya AI bakeng sa polokeho ya cyber, nts'etsopele ya web, rafsterya ya di-cloud, le phetoho ya di-digital. Ke u thusa jwang kajeno?",
    sn: "Mhoro ku-TIXSYNC SOLUTIONS! Ndiripo mudzidzisi wa AI wezve security ye-cyber, kugadzirisa web, infrastructure ye-cloud, uye shanduko ye-digital. Ndingakubatsira sei nhasi?",
    eo: "Bonvenon en TIXSYNC SOLUTIONS! Mi estas via AI-asistanto por cifereca sekureco, retejprogramado, nuboinfrastrukturo, kaj cifereca transformigo. Kiel mi povas helpi vin hodiau?",
    la: "Salve apud TIXSYNC SOLUTIONS! Ego sum AI adiutor tuus pro securitate cyber, evolutione retis, infrastruktura nubium, et transformatione digitali. Quomodo te hodie adiuvare possum?",
    ca: "Benvingut a TIXSYNC SOLUTIONS! Soc el teu assistent IA per a ciberseguretat, desenvolupament web, infraestructura al vol i transformacio digital. Com et puc ajudar avui?",
    eu: "Ongi etorri TIXSYNC SOLUTIONS-era! Zure AI laguntzailea naiz zibersegurtasunerako, web garapenerako, hodei azpiegiturarako eta eraldaketa digitaleko. Nola lagun zaitzake gaur?",
    gl: "Benvido a TIXSYNC SOLUTIONS! Son o teu asistente IA para ciberseguridade, desenvolvemento web, infraestrutura na nube e transformacion dixital. Como che podo axudar hoxe?",
    co: "Bonghjornu a TIXSYNC SOLUTIONS! Songhj l'assistentu IA per sicurezza cyber, sviluppu web, infrastruttura cloud e trasformazione digitale. Cemu posso aiutavvi assai?",
    fy: "Wolkom by TIXSYNC SOLUTIONS! Ik bin jo AI-assistent foar cybersecurity, webûntwikkeling, inkelyd en digitalearmsjoch. Hoe kin ik jo hielpe?",
    lb: "Wëllkomm bei TIXSYNC SOLUTIONS! Ech sinn Ären AI-Assistent fir Cybersécherheet, Webentwécklung, Cloud-Infrastruktur an digitaler Transformatioun. Wéi kann ech Iech haut hëllefen?",
    mk: "Dobredojdovte vo TIXSYNC SOLUTIONS! Sum vashiot AI asistent za sajber bezbednost, web razvoj, oblak infrastruktura i digitalna transformacija. Kakov moze da vam pomognam denes?",
    sq: "Mirë se vini në TIXSYNC SOLUTIONS! Jam asistenti juaj AI për sigurinë kibernetike, zhvillimin e uebit, infrastrukturën e resë dhe transformimin dixhital. Si mund t'ju ndihmoj sot?",
    bs: "Dobrodosli u TIXSYNC SOLUTIONS! Vas sam AI asistent za kiber sigurnost, web razvoj, cloud infrastrukturu i digitalnu transformaciju. Kako vam mogu pomoci danas?",
    mi: "Nau mai ki TIXSYNC SOLUTIONS! He AI assistent ahau mo to haumarotanga tukutuku, te whanake tukutuku, te hanganga aputi, me te huringa turuki. Me pehea taku awina i a koe i tenei ra?",
    haw: "E komo mai i TIXSYNC SOLUTIONS! He koku AI koko ia oe no ka paleka eleu, ka hoohana punaewele, ka hookele wiwi, a me ka loli eleu. Pehea au e hiki ke koku i oe i kela la?",
    sm: "Fakatalofa atu i TIXSYNC SOLUTIONS! Ou te iinei ona fesoasoani AI mo lou siosiomaga, fausiga tuku i luga o le atinae, faiga polokalame, ma le suesuega. O le a fesoasoani atu au i le aso nei?",
    to: "Talofa mai ki TIXSYNC SOLUTIONS! Ko e kou tautai AI mo he polokalame, fakaola tuku, fakaola fakamatala, ma fakafofounga digitaalu. Ko e hou fakaaoga ki a koe he aho ni?",
    fj: "Ni sa bula vinaka e TIXSYNC SOLUTIONS! Au na vakayagataka kina i na dina na cuuna, na veitaroiti, na dina ni tabu, kei na vakayagataki na wauciwuci. Au na yawa vakacava e na rai tuccea?",
    ny: "Moni bwanji ku TIXSYNC SOLUTIONS! Ndili pano kuti ndikuthandize AI chitetezo cha cyber, kupanga masamba, thupi la pansi, ndi kusintha digito. Ndingakuthandizeni bwanji lero?",
    wo: "Dalal jamm ci TIXSYNC SOLUTIONS! Maa ngi ci biir taim yi ngir AI dimbal la wir al cybersecurity, al development web, al infrastructure cloud, al transformation digitale. Nan leen maangi def tey?",
    ff: "Jam ngir TIXSYNC SOLUTIONS! Mi dulaani AI balla al security, al development web, al infrastructure cloud, al transformation digitale. Nano mi maa ballaano bissaa?",
    bm: "I ni ce TIXSYNC SOLUTIONS! Ne na AI dafa na ti taa nafa ye cybersecurity, web development, cloud infrastructure, ne digital transformation. N be ke fene nafa den ke na?",
    lg: "Nkulamusaniddde ku TIXSYNC SOLUTIONS! Njagala okukuyamba AI ku kibuzibuzi, okusinziira ku webu, ne ku ngeri yobuyinza, ne mu kisoolizo kyadigital. Nze nolaba ki nnyini leero?",
    rn: "Murakaza neza mu TIXSYNC SOLUTIONS! Ndi AI assistanti yawe mu ubwigunge bwikoresha rya interineti, iterambere rya urubuga, ubufatanye bwamabwiriza, no guhinduranya kwadijitali. Dukorera iki uyu munsi?",
    lo: "Sabaidee bon TIXSYNC SOLUTIONS! Khoi pen AI chuai khun rueang ngeun park cyber, development web, infrastructure cloud, lae kan plian plaeng digital. Wan nee khoi chuai arai dai?",
    km: "Suosdei nak TIXSYNC SOLUTIONS! Knyom pen AI assistant knong paal-paal-baat security cyber, development web, infrastructure cloud, neTransformation digital. Knyom chhouy banhch hear tae mok mok leey?",
    bo: "TIXSYNC SOLUTIONS la tashi delek! Nga de re AI assistant nyi cyber bde ba, web gsar bpa, sa bon rtsa, dang po rgyu bsgyur bde ba nyi madod par grol dgos na ga?",
    dz: "TIXSYNC SOLUTIONS la kuzu zangpo! Nga kyi AI assistant ni cyber ngelwa, web jikgang, cloud zungphuk, dang kyi digital rnam bsgyur du khyed rang la gral gyed nus na ga?",
  };
  return greetings[lang] || greetings.en;
}

export function getNativePhrase(lang: LangCode, key: string): string {
  const phrases: Record<string, Record<string, string>> = {
    here: {
      en: "Here's what I know:", sw: "Hii ndiyo ninachojua:", fr: "Voici ce que je sais:", es: "Esto es lo que se:", pt: "Aqui esta o que sei:", de: "Hier ist was ich weiss:", it: "Ecco cosa so:", nl: "Dit is wat ik weet:", ru: "Vot chto ya znayu:", uk: "Ots scho ya znayu:", zh: "Yixia shi wo suo zhidao de:", ja: "Kore ga watashi ga shitteiru koto desu:", ko: "Igeoseo naega aineun geosimnida:", ar: "Hatha ma a'lamu:", hi: "Yaha meri jaankari hai:", bn: "Ekhane ami jeeta jani:", ur: "Yeh hai jo main janta hun:", fa: "Inchizee ke man midanam:", he: "Hena ma ani yodea:", tr: "Bildiklerim bunlar:", pl: "Oto co wiem:", cs: "Toto je to co vim:", sk: "Toto je to co viem:", ro: "Iata ce stiu:", hu: "Ez az amit tudok:", bg: "Eto kakvo znam:", hr: "Evo sto znam:", sr: "Evo sto znam:", sl: "Tukaj je kar vem:", lt: "Sita zinau:", lv: "Lot ka es zinu:", et: "Siin on mida ma tean:", fi: "Tassa on mita tietan:", sv: "Har ar vad jag vet:", no: "Her er hva jeg vet:", da: "Her er hvad jeg ved:", is: "Hér er þad sem ég veit:", ga: "Seo a bhfuil ar eolas agam:", cy: "Dyma beth rwy'n ei wybod:", mt: "Dan huwa dak li naf:", el: "Autó einai aftó pou xéro:", ka: "Ae ra vitsi:", hy: "Aha te inch em imanum:", az: "Bilirik budur:", kk: "Men bilgen narse:", uz: "Bilganim budir:", mn: "Ene bol bi meddeg zuil:", ne: "Yo ho jun ma chanchu:", si: "Me nisa mama danne kiyada:", my: "Da ka kyi ka tha nat par:", th: "Ni khong pen sing tee phom roo:", vi: "Day la nhung gi toi biet:", id: "Berikut yang saya tahu:", ms: "Berikut yang saya tahu:", tl: "Narito ang alam ko:", am: "Yih yihun eman yih wed new:", ha: "Wannan ne na na sani:", yo: "Eyi ni ohun ti mo mo:", ig: "Nke a bu ihe m maara:", zu: "Le yinto engiyaziyo:", xh: "Le yinto endiyaziyo:", af: "Hier is wat ek weet:", so: "Waa kii aan ka warqabo:", rw: "Ibi ni ibyo nda:", mg: "Ilay zavatra fantatra:", st: "Ke hele ke tseba:", sn: "Iyi ndinayo yandinayo:", eo: "Jen estas kio mi scias:", la: "Haec est quae scio:", ca: "Aixo es el que se:", eu: "Hona hemen dakidana:", gl: "Isto e o que sei:", br: "Hoc eus ar peur a zen:", co: "Quessu chì sò chì sò:", fy: "Dit is wat ik wit:", lb: "Hei ass wat ech weess:", mk: "Ova e toa shto znam:", sq: "Ja eshte ajo qe une di:", bs: "Evo sto znam:", mi: "Ko ena te mea e mohio ana:", haw: "Oiau kekahi mea au ike:", sm: "O le a ou fai atu:", to: "Ko e hoku fakaaoga:", fj: "Kina na yaya na:", ny: "Ndi zimene ndimadzi:", wo: "Li ci tanee la ci:", ff: "Ko woni won:", bm: "Ni ye ke:", dy: "Ko ye ke:", lg: "Kino kye:", rn: "Ibi ni ibyo:", sg: "Kiye ti ma ti:", lo: "Ni khong pen sing tee khoi hoojai:", km: "Knyom chea key na:", bo: "Di red la nga shesheb:", dz: "Nga kyi re kyi red:",
    },
    contact: {
      en: "Reach us at tixsyncsolutions@gmail.com or call +254704440164.", sw: "Fikia kupitia tixsyncsolutions@gmail.com au piga +254704440164.", fr: "Contactez-nous a tixsyncsolutions@gmail.com ou appelez le +254704440164.", es: "Contactanos en tixsyncsolutions@gmail.com o llama al +254704440164.", pt: "Contacte-nos em tixsyncsolutions@gmail.com ou ligue para +254704440164.", de: "Erreichen Sie uns unter tixsyncsolutions@gmail.com oder rufen Sie +254704440164 an.", it: "Contattaci a tixsyncsolutions@gmail.com o chiama +254704440164.", nl: "Neem contact op via tixsyncsolutions@gmail.com of bel +254704440164.", ru: "Svyazites s nami: tixsyncsolutions@gmail.com ili +254704440164.", uk: "Zvyazhites z namy: tixsyncsolutions@gmail.com abo +254704440164.", zh: "Tongguo tixsyncsolutions@gmail.com lianxi women, huo zhi dian +254704440164.", ja: "tixsyncsolutions@gmail.com matawa +254704440164 de gorenraku kudasai.", ko: "tixsyncsolutions@gmail.com-ilo yeollak hagesio ilen +254704440164-ro jeonhwa haseyo.", ar: "Tawasal maana ala tixsyncsolutions@gmail.com aw ittisal ala +254704440164.", hi: "Humein sampark karein: tixsyncsolutions@gmail.com ya +254704440164 par call karein.", bn: "Amader sathe joga juk: tixsyncsolutions@gmail.com ba +254704440164.", ur: "Humein rabta karein: tixsyncsolutions@gmail.com ya +254704440164 par call karein.", fa: "Ba ma tamas begirid: tixsyncsolutions@gmail.com ya +254704440164.", he: "Pnenu eleinu: tixsyncsolutions@gmail.com o hitakre +254704440164.", tr: "Bize ulasin: tixsyncsolutions@gmail.com veya +254704440164.", pl: "Skontaktuj sie z nami: tixsyncsolutions@gmail.com lub +254704440164.", cs: "Kontaktujte nas: tixsyncsolutions@gmail.com nebo +254704440164.", sk: "Kontaktujte nas: tixsyncsolutions@gmail.com alebo +254704440164.", ro: "Contactati-ne: tixsyncsolutions@gmail.com sau +254704440164.", hu: "Lepjen kapcsolatba velunk: tixsyncsolutions@gmail.com vagy +254704440164.", bg: "Svarzhete se s nas: tixsyncsolutions@gmail.com ili +254704440164.", hr: "Kontaktirajte nas: tixsyncsolutions@gmail.com ili +254704440164.", sr: "Kontaktirajte nas: tixsyncsolutions@gmail.com ili +254704440164.", sl: "Kontaktirajte nas: tixsyncsolutions@gmail.com ali poklicite +254704440164.", lt: "Susisiekite: tixsyncsolutions@gmail.com arba +254704440164.", lv: "Sazinieties: tixsyncsolutions@gmail.com vai +254704440164.", et: "Votke uhendust: tixsyncsolutions@gmail.com voi +254704440164.", fi: "Ota yhteytta: tixsyncsolutions@gmail.com tai +254704440164.", sv: "Kontakta oss: tixsyncsolutions@gmail.com eller +254704440164.", no: "Kontakt oss: tixsyncsolutions@gmail.com eller +254704440164.", da: "Kontakt os: tixsyncsolutions@gmail.com eller +254704440164.", is: "Hafdu samband: tixsyncsolutions@gmail.com eda +254704440164.", ga: "Dean teagmhail: tixsyncsolutions@gmail.com no +254704440164.", cy: "Cysylltwch: tixsyncsolutions@gmail.com neu +254704440164.", mt: "Ikkuntattjana: tixsyncsolutions@gmail.com jew +254704440164.", el: "Epikeinonise: tixsyncsolutions@gmail.com i +254704440164.", ka: "Dagvikvabrdit: tixsyncsolutions@gmail.com an +254704440164.", hy: "Kapvek mez het: tixsyncsolutions@gmail kam +254704440164.", az: "Bizimle elaqe saxlayin: tixsyncsolutions@gmail.com ve ya +254704440164.", kk: "Bizben habarlasyngyz: tixsyncsolutions@gmail.com nemese +254704440164.", uz: "Biz bilan bog'laning: tixsyncsolutions@gmail.com yoki +254704440164.", mn: "Bidend холбогдоно uu: tixsyncsolutions@gmail.com esvel +254704440164.", ne: "Hami sang sampark garnuhos: tixsyncsolutions@gmail.com wa +254704440164.", th: "Tok-tam kap rao: tixsyncsolutions@gmail.com rue +254704440164.", vi: "Lien he voi chung toi: tixsyncsolutions@gmail.com hoac +254704440164.", id: "Hubungi kami: tixsyncsolutions@gmail.com atau +254704440164.", ms: "Hubungi kami: tixsyncsolutions@gmail.com atau +254704440164.", tl: "Makipag-ugnayan: tixsyncsolutions@gmail.com o tumawag sa +254704440164.", am: "Yegnalew: tixsyncsolutions@gmail.com new +254704440164.", ha: "Tuntuɓi mu: tixsyncsolutions@gmail.com ko kira +254704440164.", yo: "Fi raina lọwa: tixsyncsolutions@gmail.com tabi pe +254704440164.", ig: "Jikoo anyi: tixsyncsolutions@gmail.com ma obu kpoo +254704440164.", zu: "Xhumana nathi: tixsyncsolutions@gmail.com noma +254704440164.", xh: "Qhagamshelana: tixsyncsolutions@gmail.com okanye +254704440164.", af: "Kontak ons: tixsyncsolutions@gmail.com of +254704440164.", so: "Nala soo xiriir: tixsyncsolutions@gmail.com ama +254704440164.", rw: "Twandikire: tixsyncsolutions@gmail.com cyangwa +254704440164.", mg: "Mifandray: tixsyncsolutions@gmail.com na +254704440164.", st: "Iteanye le rona: tixsyncsolutions@gmail.com kapa +254704440164.", sn: "Bata nanhasi: tixsyncsolutions@gmail.com kana +254704440164.", eo: "Kontaktu nin: tixsyncsolutions@gmail.com au +254704440164.", la: "Continge nos: tixsyncsolutions@gmail.com aut +254704440164.", ca: "Contacta'ns: tixsyncsolutions@gmail.com o +254704440164.", eu: "Gurekin harremanetan jarri: tixsyncsolutions@gmail.com edo +254704440164.", gl: "Contacta connosco: tixsyncsolutions@gmail.com ou +254704440164.", br: "Kit a-wech保记: tixsyncsolutions@gmail.com pe +254704440164.", co: "Contattateci: tixsyncsolutions@gmail.com o +254704440164.", fy: "Kontakt: tixsyncsolutions@gmail.com of +254704440164.", lb: "Kontakt: tixsyncsolutions@gmail.com oder +254704440164.", mk: "Kontaktirajte: tixsyncsolutions@gmail.com ili +254704440164.", sq: "Na kontaktoni: tixsyncsolutions@gmail.com ose +254704440164.", bs: "Kontaktirajte: tixsyncsolutions@gmail.com ili +254704440164.", mi: "Whakapā mai: tixsyncsolutions@gmail.com i te +254704440164.", haw: "E kipa: tixsyncsolutions@gmail.com a i +254704440164.", sm: "Faafesootai: tixsyncsolutions@gmail.com pe +254704440164.", to: "Fakaaoga: tixsyncsolutions@gmail.com pe +254704440164.", fj: "Keregata kina: tixsyncsolutions@gmail.com pe +254704440164.", ny: "Lankhulani: tixsyncsolutions@gmail.com kapena +254704440164.", wo: "Jokko: tixsyncsolutions@gmail.com waa +254704440164.", ff: "Jokko: tixsyncsolutions@gmail.com walla +254704440164.", bm: "Joni: tixsyncsolutions@gmail.com wale +254704440164.", dy: "Joni: tixsyncsolutions@gmail.com wale +254704440164.", lg: "Tegereza: tixsyncsolutions@gmail.com oba +254704440164.", rn: "Twandikire: tixsyncsolutions@gmail.com cyangwa +254704440164.", sg: "Zwini tanda: tixsyncsolutions@gmail.com nda +254704440164.", lo: "Kham phos: tixsyncsolutions@gmail.com sakk +254704440164.", km: "ទំនាក់ទំនង: tixsyncsolutions@gmail.com or +254704440164.", bo: "Dsong sbyor: tixsyncsolutions@gmail.com dam kyang +254704440164.", dz: "Webelwa: tixsyncsolutions@gmail.com dang kyi +254704440164.",
    },
    pricing: {
      en: "Pricing starts from KES 50,000. Contact us for a custom quote.", sw: "Bei inaanzia KES 50,000. Tuandikie kwa nukta maalum.", fr: "Les tarifs commencent a 50 000 KES. Contactez-nous pour un devis.", es: "Los precios comienzan desde KES 50,000. Contactanos para una cotizacion.", pt: "Os precos comecam a partir de KES 50,000. Contacte-nos para um orcamento.", de: "Preise beginnen ab KES 50.000. Kontaktieren Sie uns fur ein Angebot.", it: "I prezzi iniziano da KES 50.000. Contattaci per un preventivo.", nl: "Prijzen beginnen vanaf KES 50,000. Neem contact op voor een offerte.", ru: "Ceny nachinayutsya ot 50 000 KES. Svyazites s nami dlya raschyota.", uk: "Tsiny pochynayutsya vid 50 000 KES. Zvyazhites z namy dlya rozrakhunku.", zh: "Jiage KES 50,000 qi. Lianxi women huoqu dingzhi baojia.", ja: "Ryokin wa KES 50,000 kara. Kasutamu konsaruto wa go toiawase kudasai.", ko: "Gagyeok-eun KES 50,000-eseo sijak. Modu gyeolje-neun yeollak haseyo.", ar: "Al-as'ar tabda' min 50,000 KES. Tawasal maana li-munhadha masruf.", hi: "Keematen KES 50,000 se shuru. Custom quote ke liye sampark karein.", bn: "Mulya KES 50,000 theke shuru. Custom quote-er jonno jogajog koreen.", ur: "Qeematein KES 50,000 se shuru. Custom quote ke liye rabta karein.", fa: "Gheymatha az 50,000 KES shoru mishehad. Baraye gheymat sفارshi ba ma tamas begirid.", he: "Ha-mechirim matchilim me-50,000 KES. Pnu eleinu le-hechat schema.", tr: "Fiyatlar KES 50,000'den basliyor. Ozel fiyat icin bize ulasin.", pl: "Ceny zaczynaja sie od KES 50,000. Skontaktuj sie wycene.", cs: "Ceny zacinaji od KES 50,000. Kontaktujte nas pro nabidku.", sk: "Ceny zacinaju od KES 50,000. Kontaktujte nas pre cenovu ponuku.", ro: "Preturile incep de la KES 50,000. Contactati-ne pentru o oferta.", hu: "Arak KES 50,000-tol indulnak. Egyedi ajanlatert keresse felunket.", bg: "Cenite zapochvat ot 50 000 KES. Svarzhete se s nas za ofertata.", hr: "Cijene pocinju od 50.000 KES. Kontaktirajte nas za ponudu.", sr: "Cene pocinju od 50.000 KES. Kontaktirajte nas za ponudu.", sl: "Cene se zacnejo pri 50.000 KES. Kontaktirajte nas za ponudbo.", lt: "Kainos prasideda nuo 50 000 KES. Susisiekite del pasiulymo.", lv: "Cenas sakas no 50 000 KES. Sazinieties par piedavajumu.", et: "Hinnad algavad 50 000 KES-st. Votke uhendust pakkumise saamiseks.", fi: "Hinnat alkavat 50 000 KES:sta. Ota yhteytta tarjoukseen.", sv: "Priserna borjar fran 50 000 KES. Kontakta oss for offert.", no: "Prisene starter fra 50 000 KES. Kontakt oss for tilbud.", da: "Priserne starter fra 50.000 KES. Kontakt os for tilbud.", is: " verd byrja fra 50.000 KES. Hafdu samband fyrir tilbud.", ga: "Tosionn praghsanna ag KES 50,000. Dean teagmhail le haghaidh luachain.", cy: "Mae prisiau'n dechrau ar KES 50,000. Cysylltwch am ddyfynbris.", mt: "Il-prezzijiet jibdew minn KES 50,000. Ikkuntattjana ghal kwotazzjoni.", el: "Oi times xekinoun apo 50.000 KES. Epikoinonise gia prosfora.", ka: "Fasebi iwyeba 50,000 KES-dan. Dagvikvabrdit phasakhebis.", hy: "Gnyerery sirrvum en 50,000 KES-its. Kapvek mez het ankhatapokharits ma'lum.", az: "Qiymetler 50,000 KES-den bashlayir. Qiymet ucun bizimle elaqe saxlayin.", kk: "Baqalar 50,000 KES-ten bastaladi. Baqa alu ubsiz bizben habarlasyngyz.", uz: "Narxlar 50,000 KES dan boshlanadi. Narx uchun biz bilan bog'laning.", mn: "Une 50,000 KES ees ehhelne.Une avahin tuld bidend холбогдоно uu.", ne: "Mulyaharu KES 50,000 dekhi suru hunchan. Custom mulyankan lagi hami sang sampark garnuhos.", th: "Khaa raekjak tee KES 50,000. Tok-tam kap rao puer ran kaan baap.", vi: "Gia bat dau tu KES 50,000. Lien he de nhan bao gia.", id: "Harga mulai dari KES 50,000. Hubungi kami untuk penawaran.", ms: "Harga bermula dari KES 50,000. Hubungi kami untuk sebut harga.", tl: "Ang mga presyo ay nagsisimula sa KES 50,000. Makipag-ugnayan para sa quote.", am: "Wigagabew KES 50,000 yizihonal. Yegnalew amenu kelete hitiw.", ha: "Farashi yana daga KES 50,000. Tuntuɓi mu don farashi.", yo: "Iye ynqymn jykqyb kyn tynjyn KES 50,000. Fi raina lowa fun iye aso.", ig: "Ego na-ebido site na KES 50,000. Jikoo anyi maka ego ozu.", zu: "Intengo iqala ku-KES 50,000. Xhumana nathi uku uthole intengo.", xh: "Iindleko ziqala ngo-KES 50,000. Qhagamshelana nathi uku uthole ixabiso.", af: "Pryse begin by KES 50,000. Kontak ons vir n kwotasie.", so: "Qiimuhu wuxuu ka bilowdaa KES 50,000. Nala soo xiriir si aad u hesho qiime.", rw: "Ibiciro bitangira ku KES 50,000. Twandikire kugira ngo urebe amasezerano.", mg: "Ny vidiny dia manomboka aminny KES 50,000. Mifandray aminny hanasiana vidiny.", st: "Ditheko di tswela pele ho KES 50,000. Iteanye le rona bakeng sa theko.", sn: "Makadhi anotangira pa KES 50,000. Bata nanhasi kuti muwane makadhi.", eo: "Prezoj komencigxas de 50 000 KES. Kontaktu nin por devizo.", la: "Pretia incipiunt a KES 50,000. Continge nos pro aestimatione.", ca: "Els preus comencen des de KES 50,000. Contacta'ns per a un presupost.", eu: "Prezioak KES 50,000-tik hasita. Gurekin harremanetan jarri aurrekontu bat.", gl: "Os prezos comeczan dende KES 50,000. Contacta connosco para un orzamento.", br: "Gwiadozh a gomeur a KES 50,000. Kit a-wech保记.", co: "I prezzi incuminzanu da KES 50,000. Contattateci per un preventivu.", fy: "Prijzen begjinne fan KES 50,000. Kontaktsje foar in offerte.", lb: "Prisser ufank ab KES 50,000. Kontakt eis fir en Offert.", mk: "Cenite pocnuvaat od 50.000 KES. Kontaktirajte nas za ponuda.", sq: "Cmimet fillojne nga KES 50,000. Na kontaktoni per nje oferte.", bs: "Cijene pocinju od 50.000 KES. Kontaktirajte nas za ponudu.", mi: "Kua ana te utu mai KES 50,000. Whakapaa mai mo te utu.", haw: "O ka uku he KES 50,000 mai. E kipa no ka helu.", sm: "O le totogi ausia mai KES 50,000. Faafesootai mo le totogi.", to: "Ko e mita fakataha mai KES 50,000. Fakaaoga mo he fakataha.", fj: "Kena na iya ra ra mai KES 50,000. Keregata kina na veitarogi.", ny: "Mtengo umayambirira pa KES 50,000. Lankhulani ndipo mudziwe mtengo.", wo: "Njey yi damoo KES 50,000. Jokko ngir njey.", ff: "Njey yi damuu KES 50,000. Jokko ngir njey.", bm: "Ferwen ye furu KES 50,000. Joni ngir ferwen.", dy: "Ferwen ye furu KES 50,000. Joni ngir ferwen.", lg: "Nnyungu tandika ku KES 50,000. Tegereza for amanya nnyungu.", rn: "Ibiciro bitangira ku KES 50,000. Twandikire kugira ngo urebe amasezerano.", sg: "Yanda tara a KES 50,000. Zwini tanda na nda yanda.", lo: "Kha raekjak tee KES 50,000. Kham phos puer ran kaan.", km: "Tiy khan mok nis KES 50,000. ទំនាក់ទំនង knong paal khae tiy.", bo: "Gongyed re KES 50,000 nas. Dsong sbyor nas gongyed btags.", dz: "Rin po kha re KES 50,000 nas. Webelwa nas rin po btags.",
    },
    services: {
      en: "We offer Cybersecurity, Web Development, Cloud Infrastructure, Digital Transformation, Compliance, DevOps, and Mobile Development.", sw: "Tutoa Ulinzi wa Mtandao, Uundaji wa Wavuti, Miundombinu ya Wingu, Mabadiliko ya Dijitali, Uzingatiaji, DevOps, na Uundaji wa Simu.", fr: "Nous offrons la Cybersecurite, le Developpement Web, l'Infrastructure Cloud, la Transformation Numerique, la Conformite, le DevOps et le Developpement Mobile.", es: "Ofrecemos Ciberseguridad, Desarrollo Web, Infraestructura en la Nube, Transformacion Digital, Cumplimiento, DevOps y Desarrollo Movil.", pt: "Oferecemos Ciberseguranca, Desenvolvimento Web, Infraestrutura em Nuvem, Transformacao Digital, Conformidade, DevOps e Desenvolvimento Movil.", de: "Wir bieten Cybersicherheit, Webentwicklung, Cloud-Infrastruktur, Digitale Transformation, Compliance, DevOps und Mobile Entwicklung.", it: "Offriamo Sicurezza Informatica, Sviluppo Web, Infrastruttura Cloud, Trasformazione Digitale, Conformita, DevOps e Sviluppo Mobile.", nl: "We bieden Cybersecurity, Webontwikkeling, Cloudinfrastructuur, Digitale Transformatie, Compliance, DevOps en Mobiele Ontwikkeling.", ru: "My predlagayem kiberbezopasnost, veb-razrabotku, oblachnuyu infrastrukturu, cifrovuyu transformaciyu, compliance, DevOps i mobilnuyu razrabotku.", uk: "Mi propynuyemo kyberbezpeku, web-rozrobku, khmarnu infrastrukturu, cyfrovu transformaciyu, compliance, DevOps ta mobilnu rozrobku.", zh: "Women tigong wangluo anquan, web kaifa, yun jichu shuhua, shuzi zhuanxing, hegui, DevOps he yidong kaifa.", ja: "Saibaeru sekyuriti, web kaihatsu, kuraudo shisetsu, dejitaru toransufoomeshon, kompuraiansu, DevOps, mobairu kaihatsu wo teikyou shimasu.", ko: "Saibeo boan, web gaebal, keulaeu inpeura, dijiteol jeonhwan, compliance, DevOps, mobeol gaebal-eul gongjin.", ar: "Nuda' amn al-saybari, tatawwur al-waib, al-bina' al-tahitiyah al-sahabiyah, al-tahawwul al-raqami, al-iqtida', DevOps, wa tatawwur al-mutaharrik.", hi: "Hum cyber suraksha, web vikas, cloud infrastructure, digital transformation, anupalan, DevOps aur mobile vikas pradan karta hai.", bn: "Amra cyber nirokhottha, web unnayan, cloud altya, digital rupantor, sonorupata, DevOps ebong mobile unnayan prodan kori.", ur: "Hum siber security, web development, cloud infrastructure, digital transformation, ittisal, DevOps aur mobile development faraham karte hain.", fa: "Ma amniat saiberi, towse'e web, zirsaht abri, tahavole digital, tafoghir, DevOps va towse'e mobail ra pishnehad midehim.", he: "Anachnu machirim amplei cybor, pituach ashrai, tiknologia anan, teransformatsia digital, tnuah, DevOps ve-pituach mobile.", tr: "Siber guvenlik, web gelistirme, bulut altyapisi, donusum, uyumluluk, DevOps ve mobil gelistirme sunuyoruz.", pl: "Oferujemy cyberbezpieczenstwo, tworzenie stron, infrastrukture chmurowa, transformacje cyfrowa, zgodnosc, DevOps i rozwijanie mobilny.", cs: "Nabizime kybernetickou bezpecnost, vyvoj webu, cloudovou infrastrukturu, digitalni transformaci, shodu, DevOps a mobilni vyvoj.", sk: "Ponukame kyberneticku bezpecnost, vyvoj webu, cloudovu infrastrukturu, digitalnu transformaciu, suladnost, DevOps a mobilny vyvoj.", ro: "Oferim securitate cibernetica, dezvoltare web, infrastructura cloud, transformare digitala, conformitate, DevOps si dezvoltare mobila.", hu: "Kiberbiztonsagot, webfejlesztest, felhoinfrastrukturat, digitalis atalakitast, megfelelost, DevOpsot es mobilfejlesztest kinalunk.", bg: "Predlagame kibersebirenost, ueb razrabotka, oblachna infrastruktura, digitalna transformatsiya, saotvetstvenost, DevOps i mobilna razrabotka.", hr: "Nudimo kiberneticku sigurnost, web razvoj, cloud infrastrukturu, digitalnu transformaciju, uskladenost, DevOps i mobilni razvoj.", sr: "Nudimo sajber bezbednost, veb razvoj, cloud infrastrukturu, digitalnu transformaciju, uskladjenost, DevOps i mobilni razvoj.", sl: "Ponujamo kibernetsko varnost, razvoj spleta, oblak infrastrukturo, digitalno preobrazbo, skladnost, DevOps in mobilni razvoj.", lt: "Siulome kibernetinio saugumo, ziniatinklio kurimo, debesijos infrastrukturos, skaitmenines transformacijos, atitikties, DevOps ir mobiliosios pletros paslaugas.", lv: "Mees piedavajam kiberdrosibu, tmekla izstradi, makonu infrastrukturu, digitalo parveidosanu, atbilstibu, DevOps un mobilo izstradi.", et: "Pakume uberaitset, veebiarendust, pilveinfrastruktuuri, digitaalse transformatsiooni, vastavuse, DevOps ja mobiilarendust.", fi: "Tarjoamme kyberturvallisuutta, verkkokehistaa, pilvi-infrastruktuuria, digitaalista muutosta, saavutettavuutta, DevOpsia ja mobiilikehitysta.", sv: "Vi erbjuder cybersakerhet, webbutveckling, molninfrastruktur, digital omstallning, compliance, DevOps och mobilutveckling.", no: "Vi tilbyr cybersikkerhet, webutvikling, skyinfrastruktur, digital transformasjon, compliance, DevOps og mobilutvikling.", da: "Vi tilbyder cybersikkerhed, webudvikling, cloud-infrastruktur, digital transformation, compliance, DevOps og mobiludvikling.", is: "Vid bjodum upp a netoryggi, vefthroun, skyrjathoustu, stafraena umbreytingu, samemi, DevOps og farsimathroun.", ga: "Solathraimid Sabhailteacht Idirlin, Forbairt Greasanai, Bonneagar Scamall, Claochlu Digiteach, Comhréireacht, DevOps agus Forbairt Soghluaiste.", cy: "Rydyn ni cynnig Diogelwch Rhwydwaith, Datblygu Gwe, Seilwaith Cwmwl, Trawsffurmiad Digidol, Cymhelliad, DevOps a Datblygu Symudol.", mt: "Noffru Sigurta Kibernetika, Zvilupp tal-Web, Infrastruttura Cloud, Trasformazzjoni Digitali, Konformita, DevOps u Zvilupp Mobili.", el: "Prosfepoume Kybernofasfaleia, Anaptyxi Isto, Ypodomi Synnefou, Psifikio Metaschimatio, Sympatheia, DevOps kai Kinhto Programmatismo.", ka: "Gvtavazobt kiberusepnoebebas, web ganvitarebas, vrulobis infrastruqturn, cifrul transformacias, shesabamisobas, DevOps da mobili ganvitarebas.", hy: "My arrorank kiberanvutin, vev macman, ambain yntakarutsyun, tsvayin paterutsyun, hamatarelutyun, DevOps yev bnagrayin macum.", az: "Biz kibertehlukesizlik, web inkiyaf, bulud altyapisi, reqemsal transformasiya, uygunluq, DevOps ve mobil inkiyaf teklif edirik.", kk: "Biz kiberqauepsizdik, web aparw, buluttwq infraqurwlm, diqyzwq transformatziya, soiktyq, DevOps wndiqw mobildi aparw usinburamwz.", uz: "Biz kiberxavfsizlik, veb dasturlash, bulut infratuzilmasi, raqamli transformatsiya, muvofiqlik, DevOps va mobil dasturlashni taklif etamiz.", mn: "Bid kiber ariigvi baidal, web huuhel, uulen deed buets toon huuruulalt, tohirtoltsol, DevOps bolon gar utasnii huuheel sanal bolgono.", ne: "Hami cyber suraksha, web vikas, cloud infrastructure, digital transformation, anupalan, DevOps ra mobile vikas pradan garchau.", th: "Rao mee borikan ngeun park cyber, development web, infrastructure cloud, kan plian plaeng digital, kan tam rustub, DevOps lae kan phattith mobile.", vi: "Chung toi cung cap an ninh mang, phat trien web, ha tang may tinh, chuyen doi so, tuan thu, DevOps va phat trien di dong.", id: "Kami menawarkan Keamanan Siber, Pengembangan Web, Infrastruktur Cloud, Transformasi Digital, Kepatuhan, DevOps, dan Pengembangan Mobile.", ms: "Kami menawarkan Keselamatan Siber, Pembangunan Web, Infrastruktur Awan, Transformasi Digital, Pematuhan, DevOps, dan Pembangunan Mobile.", tl: "Nag-aalok kami ng Cybersecurity, Web Development, Cloud Infrastructure, Digital Transformation, Compliance, DevOps, at Mobile Development.", am: "Sayerbar medhanit, web litmariyet, klayod infrasturukcher, digital metekeliyalew, lemet metekeliyalew, DevOps akilk mobile litmariyet yinehal.", ha: "Muna ba da amincin cybersecurity, ci gaban yanar gizo, injin gogashiya, canza-dijital, bi da bi, DevOps, da ci gaban wayar salula.", yo: "A n pese aabo ayelujara, development eyan-ayan, infrastruti aabo, atunto digital, itosona, DevOps, ati development alagbara.", ig: "Anyi na-enye nchekwa ndo, mmepe webusaiti, infrastructure egwuregwu, mgbanwe ngwa ngwa ojugha, mmefo ime, DevOps, na mmepe ekwenti.", zu: "Sinikeza ukuphepha kwe-cyber, ukuthuthukisa i-web, ukuhlinzekwa kwamakhulu, nokuguqulwa kwedijithali, ukulandela, DevOps nokuthuthukisa amaseli.", xh: "Sinikeza ukhuseleko lwe-cyber, ukuphucula iwebhu, uncedo lwekhowudi, nokuguqulwa kobuchwephesha, ukulandela, DevOps kunye nokuphucula imfceba.", af: "Ons bied kubersekuriteit, webontwikkeling, wolkinfrastruktuur, digitale transformasie, nakoming, DevOps en mobiele ontwikkeling.", so: "Waxaan bixinaa amniga cyber-ka, horumarinta web-ka, kaabayaasha darawalada, bedelka dhijitaalka, raacitaanka, DevOps iyo horumarinta moobaylka.", rw: "Tugabanya ubwigunge bwo gukoresha interineti, iterambere ryurubuga, ubufatanye bwamabwiriza, guhinduranya kwadijitali, guhitamo, DevOps no gukora telephone.", mg: "Manome fiarovana aminny Internet, fanambadiana tranonkala, rafitra aminny alavan-kabary, fanovana avidy, fitoviana, DevOps sy fanambadiana aminny finda.", st: "Re fana ka polokeho ya cyber, nts'etsopele ya web, rafsterya ya di-cloud, phetoho ya di-digital, tumellano, DevOps le nts'etsopele ya mobile.", sn: "Tinopa security ye-cyber, kugadzirisa web, infrastructure ye-cloud, shanduko ye-digital, kutevedzera, DevOps nekugadzirisa mobile.", eo: "Ni ofertas ciferecan sekurecon, retejprogramadon, nuboinfrastrukturon, ciferecan transformigon, konformon, DevOps kaj programsisteman evoluigon.", la: "Offerimus securitatem cyber, evolutionem retis, infrastrukturam nubium, transformationem digitalem, obedientiam, DevOps et evolutionem mobilem.", ca: "Oferim Ciberseguretat, Desenvolupament Web, Infraestructura al Vol, Transformacio Digital, Compliment, DevOps i Desenvolupament Mobil.", eu: "Zibersegurtasuna, Web Garapena, Hodei Azpiegitura, Eraldaketa Digitala, Konpliantza, DevOps eta Mugikor Garapena eskaintzen ditugu.", gl: "Ofrecemos Ciberseguridade, Desenvolvemento Web, Infraestrutura na Nube, Transformacion Dixital, Conformidade, DevOps e Desenvolvemento Mobil.", br: "Oberenn a raomp evit a surentez cyber, treserien diouzh, ar benn底er cloud, trezalc'h digidell, keverezed, DevOps hag embann telefoun.", co: "Offriamu sicurezza cyber, sviluppu web, infrastruttura cloud, trasformazione digitale, conformita, DevOps e sviluppu mobile.", fy: "Wy biede cybersecurity, webûntwikkeling, wolkynfrastruktuer, folsleine transformatie, feithlikheid, DevOps en mobiele ûntwikkeling.", lb: "Mir bidden Cybersécherheet, Webentwécklung, Cloud-Infrastruktur, digital Transformatioun, Konformitéit, DevOps an mobil Entwécklung.", mk: "Nudime sajber bezbednost, web razvoj, oblak infrastruktura i digitalna transformacija, usoglasenost, DevOps i mobilni razvoj.", sq: "Oferojme Sigurine Kibernetike, Zhvillim Web, Infrastrukture Rre, Transformim Dijital, Perputhje, DevOps dhe Zhvillim Mobil.", bs: "Nudimo kiber sigurnost, web razvoj, cloud infrastrukturu i digitalnu transformaciju, uskladjenost, DevOps i mobilni razvoj.", mi: "Ka mahi tukutuku haumarotanga, te whanake tukutuku, te hanganga aputi, te huringa turuki, te whakaritenga, DevOps me te whanake purere.", haw: "Ku maopo mākou i ka paleka eleu, ka hoohana punaewele, ka hookele wiwi, ka loli eleu, ka hoohiki, DevOps a me ka loli paleka eleu.", sm: "Sa ofo mai le fa'afetaioga siosiomaga, fausiga tuku, faiga polokalame, suesuega, fa'atagaina, DevOps ma le atinae mobile.", to: "Ko e kau tautai mo he polokalame, fakaola tuku, fakaola fakamatala, fakafofounga, fakafetaui, DevOps mo he fakafofounga mobile.", fj: "Kina na kila na veitarogi, na veitarogi na yabaki, na veitarogi na tabu, na veitarogi na wauciwuci, na veitarogi na veika, DevOps kei na veitarogi na telefoni.", ny: "Tikuza chitetezo cha cyber, kupanga masamba, thupi la pansi, kusintha digito, kutsatira, DevOps ndi kupanga foni.", wo: "Da nuy dimbal cybersecurity, development web, infrastructure cloud, transformation digitale, compliance, DevOps ak development mobile.", ff: "Da nuy dimbal security, development web, infrastructure cloud, transformation digitale, compliance, DevOps ak development mobile.", bm: "A de fe se ye cybersecurity, web development, cloud infrastructure, digital transformation, compliance, DevOps ak development mobile.", dy: "A de fe se ye cybersecurity, web development, cloud infrastructure, digital transformation, compliance, DevOps ak development mobile.", lg: "Tuwa abo cybersecurity, web development, cloud infrastructure, digital transformation, compliance, DevOps ne mobile development.", rn: "Tugabanya ubwigunge bwo gukoresha interineti, iterambere ryurubuga, ubufatanye bwamabwiriza, guhinduranya kwadijitali, guhitamo, DevOps no gukora telephone.", sg: "A de fe se ye cybersecurity, web development, cloud infrastructure, digital transformation, compliance, DevOps ak development mobile.", lo: "Rao mee borikan ngeun park cyber, development web, infrastructure cloud, kan plian plaeng digital, kan tam rustub, DevOps lae kan phattith mobile.", km: "Knyom yok tve security cyber, development web, infrastructure cloud, neTransformation digital, compliance, DevOps ne mobile development.", bo: "Nga sdod pa cyber bde ba, web gsar bpa, sa bon rtsa, dang po rgyu bsgyur, mthun pa, DevOps dang po mobile gsar bpa.", dz: "Nga kyi par cybersecurity, web development, cloud infrastructure, digital transformation, compliance, DevOps dang kyi mobile development.",
    },
  };
  return phrases[key]?.[lang] || phrases[key]?.en || "";
}
