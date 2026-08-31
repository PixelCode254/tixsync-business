import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the TIXSYNC SOLUTIONS AI assistant. You help visitors learn about our services:
- Cybersecurity (Penetration Testing, SOC Operations, Security Audits, Incident Response, SIEM, Firewalls)
- Web Development (React, Next.js, Node.js, TypeScript, Python, full-stack)
- Cloud Infrastructure (AWS, Azure, GCP, migration, serverless, Docker, Kubernetes)
- Digital Transformation, Compliance (ISO 27001, GDPR), DevOps, Mobile Development (React Native, Flutter), AI/ML

Company info:
- Founded by Cornelius Maina Nyaga, based in Kenya, serving Africa
- Contact: tixsyncsolutions@gmail.com, +254704440164
- Pricing: Custom quotes, starting from KES 50,000
- Careers: Email resume to tixsyncsolutions@gmail.com

Be helpful, professional, and concise. Respond in the same language the user writes in. Keep responses to 2-4 sentences max.`;

const REPLIES: Record<string, Record<string, string>> = {
  greeting: {
    en: "Hello! Welcome to TIXSYNC SOLUTIONS. I can help you learn about our cybersecurity, web development, cloud infrastructure, and digital transformation services. How can I assist you today?",
    es: "Hola! Bienvenido a TIXSYNC SOLUTIONS. Puedo ayudarte a conocer nuestros servicios de ciberseguridad, desarrollo web, infraestructura en la nube y transformacion digital. Como puedo asistirte hoy?",
    fr: "Bonjour! Bienvenue chez TIXSYNC SOLUTIONS. Je peux vous aider a decouvrir nos services de cybersecurite, developpement web, infrastructure cloud et transformation numerique. Comment puis-je vous aider aujourd'hui?",
    de: "Hallo! Willkommen bei TIXSYNC SOLUTIONS. Ich kann Ihnen helfen, unsere Dienstleistungen kennenzulernen. Wie kann ich Ihnen heute helfen?",
    ar: "Marhaba! Ahlan bikum fi TIXSYNC SOLUTIONS. yumkinuni musa'adatukum fi al-ta'aruf 'ala khidmatina. Kayfa yumkinuni musa'adatukum alyawm?",
    zh: "Ni hao! Huanying laidao TIXSYNC SOLUTIONS. Wo keyi bangzhu nin liaojie women de fuwu. Jintian wo neng wei nin tigong shenme bangzhu?",
    ja: "Konnichiwa! TIXSYNC SOLUTIONS e youkoso. Service ni tsuite oteshutsu shimasu. Kyou wa donna goyou deshou?",
    ko: "Annyeonghaseyo! TIXSYNC SOLUTIONS-e osin geul hwanyeonghamnida. Oneul museun dowadeurilkkayo?",
    hi: "Namaste! TIXSYNC SOLUTIONS mein aapka swagat hai. Aaj main aapki kaise sahayata kar sakta hoon?",
    ru: "Privet! Dobro pozhalovat v TIXSYNC SOLUTIONS. Chem ya mogu vam pomoch' segodnya?",
  },
  services: {
    en: "TIXSYNC SOLUTIONS offers Cybersecurity, Web Development, Cloud Infrastructure, Digital Transformation, Compliance, DevOps, and Mobile Development. We serve clients across Africa from Kenya. What specific service interests you?",
    es: "TIXSYNC SOLUTIONS ofrece Ciberseguridad, Desarrollo Web, Infraestructura en la Nube, Transformacion Digital, Cumplimiento, DevOps y Desarrollo Movil. Atendemos clientes en toda Africa desde Kenia.",
    fr: "TIXSYNC SOLUTIONS propose Cybersecurite, Developpement Web, Infrastructure Cloud, Transformation Numerique, Conformite, DevOps et Developpement Mobile. Nous servons des clients a travers l'Afrique depuis le Kenya.",
    de: "TIXSYNC SOLUTIONS bietet Cybersicherheit, Webentwicklung, Cloud-Infrastruktur, Digitale Transformation, Compliance, DevOps und Mobile Entwicklung. Wir bedienen Kunden in ganz Afrika aus Kenia.",
    ar: "TIXSYNC SOLUTIONS tudaqudim amnan saibaran, tatawwur al-waib, al-bina' al-tahitiyah al-sahabiyah, al-tahawwul al-raqami, al-iqtida', DevOps, wa tatawwur al-mutaharrik. Nakhdum 'umala' fi jami' afriqia min al-keniya.",
    zh: "TIXSYNC SOLUTIONS tigongwangluo anquan, Web kaifa, yun jichu shuhua, shuzi zhuanxing, hegui, DevOps he yidong kaifa. Women congKenniya fuwu Feizhou gedi kehu.",
    ja: "TIXSYNC SOLUTIONS wa saibaeru sekyuriti, web kaihatsu, kuraudo shisetsu, dejitaru toransufoomeshon, kompuraiansu, DevOps, mobairu kaihatsu wo teikyou shimasu.",
    ko: "TIXSYNC SOLUTIONS-neun saibeo boan, web gaebal, keulaeu inpeura, dijiteol jeonhwan, compliance, DevOps-reul gongjin. Kenia-eseo apeurika jeonyeoge gogaek-ege seobiseu-reul jeongin.",
    hi: "TIXSYNC SOLUTIONS cyber suraksha, web vikas, cloud infrastructure, digital transformation, anupalan, DevOps aur mobile vikas pradan karta hai.",
    ru: "TIXSYNC SOLUTIONS predlagayet kiberbezopasnost', veb-razrabotku, oblachnuyu infrastrukturu, tsifrovuyu transformatsiyu, compliance, DevOps i mobil'nuyu razrabotku.",
  },
  cybersecurity: {
    en: "Our cybersecurity services include Penetration Testing, SOC Operations, Security Audits, Incident Response, SIEM implementation, and Firewall management. We help organizations identify and mitigate security vulnerabilities across Africa.",
    es: "Nuestros servicios de ciberseguridad incluyen Pruebas de Penetracion, Operaciones SOC, Auditorias de Seguridad, Respuesta a Incidentes, SIEM y Gestion de Firewalls.",
    fr: "Nos services de cybersecurite comprennent Tests de Penetration, Operations SOC, Audits de Securite, Reponse aux Incidents, implementation SIEM et Gestion des Pare-feu.",
    de: "Unsere Cybersicherheitsdienste umfassen Penetrationstests, SOC-Operationen, Sicherheitsaudits, Incident-Response, SIEM-Implementierung und Firewall-Management.",
    zh: "Women de wangluo anquan fuwu baokuo shentou ceshi, SOC yunying, anquan shenji, shijian xiangying, SIEM shishi he fanghuoqiang guanli.",
    ja: "Saibaeru sekyuriti saabisu niwa penetreesyon tesuto, SOC un'ei, sekyuriti kanji, incindent taiou, SIEM jisshi, faiamuoru kanri ga fukumaremasu.",
    ko: "Saibeo boan seobiseu-eneun chinto teseuteu, SOC unyeong, boan gamsa, sagu daeeung, SIEM sigi mit banghwaikwalli-ga pohamdoemnida.",
    hi: "Hamari cyber suraksha sevaon mein penetration testing, SOC operations, security audits, incident response, SIEM karyanvayan aur firewall prabandhan shamil hain.",
    ru: "Nashi uslugi kiberbezopasnosti vklyuchayut pentesty, operatsii SOC, audity bezopasnosti, reagirovanie na insidenty, vnedrenie SIEM i upravlenie brevnyami.",
  },
  web: {
    en: "We build full-stack web applications using React, Next.js, Node.js, TypeScript, and Python. Our team creates modern, performant, and scalable solutions tailored to your business needs.",
    es: "Construimos aplicaciones web full-stack usando React, Next.js, Node.js, TypeScript y Python. Soluciones modernas, eficientes y escalables.",
    fr: "Nous developpons des applications web full-stack avec React, Next.js, Node.js, TypeScript et Python. Solutions modernes, performantes et evolutives.",
    de: "Wir entwickeln Full-Stack-Webanwendungen mit React, Next.js, Node.js, TypeScript und Python. Moderne, leistungsstarke und skalierbare Losungen.",
    zh: "Women shiyong React, Next.js, Node.js, TypeScript he Python jianli quanzhan Web yingyong. Xiandai, gao xiaoneng, ke kuozhan de jiejue fangan.",
    ja: "React, Next.js, Node.js, TypeScript, Python wo shiyou shite furusutakku web apurikeeshon wo kochiku shimasu. Moderun de kou seino, sukeeraburu na soryuushon.",
    ko: "React, Next.js, Node.js, TypeScript, Python-eul sayonghaeseo teulseutaek web aepeulikeisyeon-eul gujuk-hamnida. Hyeondaejeogigo gosingnyeog-ina expandablehan selyusyeon.",
    hi: "Hum React, Next.js, Node.js, TypeScript aur Python ka upyog karke full-stack web application banate hain. Aadhunik, uchch pradarshan aur scalable samadhan.",
    ru: "My razrabatyvaem polnofunktsional'nyye veb-prilozheniya s ispol'zovaniyem React, Next.js, Node.js, TypeScript i Python. Sovremennyye, proizvoditel'nyye i масштабируемые resheniya.",
  },
  cloud: {
    en: "Our cloud services cover AWS, Azure, and GCP, including migration, serverless architecture, Docker, Kubernetes, and full infrastructure management. We help businesses migrate to and optimize in the cloud.",
    es: "Nuestros servicios en la nube cubren AWS, Azure y GCP, incluyendo migracion, arquitectura serverless, Docker, Kubernetes y gestion completa de infraestructura.",
    fr: "Nos services cloud couvrent AWS, Azure et GCP, incluant migration, architecture serverless, Docker, Kubernetes et gestion complete de l'infrastructure.",
    de: "Unsere Cloud-Dienste umfassen AWS, Azure und GCP, einschliesslich Migration, Serverless-Architektur, Docker, Kubernetes und vollem Infrastruktur-Management.",
    zh: "Women de yun fuwu hangai AWS, Azure he GCP, baokuo qianyi, wufuqiwu jiegou, Docker, Kubernetes he wanzheng de jichu sheshi guanli.",
    ja: "Kuraudo saabisu wa AWS, Azure, GCP wo kabaa shi, idou, sarabalessu aakitekucha, Docker, Kubernetes, kanzen na shisetsu kanri wo fukumimasu.",
    ko: "Keulaeu seobiseu-neun AWS, Azure, GCP-reul kabyeonhago, imaigeisyeon, seobeoliseu aekitekchyeo, Docker, Kubernetes mit jeonche inpeura gwalli-reul pohamdoemnida.",
    hi: "Humari cloud sevaon mein AWS, Azure aur GCP shamil hain, jisme migration, serverless architecture, Docker, Kubernetes aur purna infrastructure prabandhan shamil hai.",
    ru: "Nashi oblachnyye servisy okhvatyvayut AWS, Azure i GCP, vklyuchaya migratsiyu, serverless arkhitekturu, Docker, Kubernetes i polnoye upravleniye infrastrukturoy.",
  },
  pricing: {
    en: "Our pricing is customized based on your specific needs and project scope. Packages start from KES 50,000. For an accurate quote, please contact us at tixsyncsolutions@gmail.com or call +254704440164.",
    es: "Nuestros precios se personalizan segun sus necesidades. Los paquetes comienzan desde KES 50,000. Contacte tixsyncsolutions@gmail.com o llame al +254704440164.",
    fr: "Nos tarifs sont personnalises selon vos besoins. Les formules commencent a 50 000 KES. Contactez tixsyncsolutions@gmail.com ou appelez le +254704440164.",
    de: "Unsere Preise werden individuell kalkuliert. Pakete ab KES 50.000. Kontakt: tixsyncsolutions@gmail.com oder +254704440164.",
    zh: "Women de dingjia genju nin de xuqiu liangshen dingzhi. Taocan qi jia KES 50,000. Lianxi: tixsyncsolutions@gmail.com huo +254704440164.",
    ja: "Ryoukin wa niizu ni yotte kasutamaizu saremasu. Pakkēji wa KES 50,000 kara. Otoiawase: tixsyncsolutions@gmail.com matawa +254704440164.",
    ko: "Gagyeog-eun jeongdabeol-ibnida. Paekiji-neun KES 50,000-eseo sijak. Yeollak: tixsyncsolutions@gmail.com illaen +254704440164.",
    hi: "Hamari keematen aapki vishisht avashyaktaon ke anusaar customize hoti hain. Package KES 50,000 se shuru. Sampark: tixsyncsolutions@gmail.com ya +254704440164.",
    ru: "Nashi tseny formiruyutsya individual'no. Pakety nachinayutsya ot 50 000 KES. Kontakt: tixsyncsolutions@gmail.com ili +254704440164.",
  },
  contact: {
    en: "You can reach TIXSYNC SOLUTIONS at tixsyncsolutions@gmail.com or call +254704440164. Visit tixsyncsolutions.com for more details. We are here to help!",
    es: "Contacta a TIXSYNC SOLUTIONS en tixsyncsolutions@gmail.com o llama al +254704440164. Visita tixsyncsolutions.com para mas detalles.",
    fr: "Contactez TIXSYNC SOLUTIONS a tixsyncsolutions@gmail.com ou appelez le +254704440164. Visitez tixsyncsolutions.com pour plus de details.",
    de: "Erreichen Sie TIXSYNC SOLUTIONS unter tixsyncsolutions@gmail.com oder +254704440164. Besuchen Sie tixsyncsolutions.com.",
    zh: "Tongguo tixsyncsolutions@gmail.com lianxi TIXSYNC SOLUTIONS, huo zhi dian +254704440164. Fangwen tixsyncsolutions.com liaojie geng duo xinxi.",
    ja: "TIXSYNC SOLUTIONS wa tixsyncsolutions@gmail.com matawa +254704440164 de otoiawase itadakemasu. Shousai wa tixsyncsolutions.com wo goran kudasai.",
    ko: "TIXSYNC SOLUTIONS-ege tixsyncsolutions@gmail.com-ulo yeollak-hagesio ilen +254704440164-ro jeonhwa-haseyo. Deo mani bilssal-eun tixsyncsolutions.com-eul bangmun-haseyo.",
    hi: "Aap TIXSYNC SOLUTIONS se tixsyncsolutions@gmail.com par sampark kar sakte hain ya +254704440164 par call kar sakte hain. Adhik jankari ke liye tixsyncsolutions.com par jayein.",
    ru: "Svyazhites' s TIXSYNC SOLUTIONS po adresu tixsyncsolutions@gmail.com ili po telefonu +254704440164. Posetite tixsyncsolutions.com dlya podrobney.",
  },
  about: {
    en: "TIXSYNC SOLUTIONS was founded by Cornelius Maina Nyaga and is based in Kenya. We specialize in cybersecurity, web development, cloud infrastructure, and digital transformation. Our mission is to protect and empower businesses across Africa.",
    es: "TIXSYNC SOLUTIONS fue fundada por Cornelius Maina Nyaga y tiene su sede en Kenia. Nos especializamos en ciberseguridad, desarrollo web, infraestructura en la nube y transformacion digital.",
    fr: "TIXSYNC SOLUTIONS a ete fondee par Cornelius Maina Nyaga et est basee au Kenya. Nous sommes specialises en cybersecurite, developpement web, infrastructure cloud et transformation numerique.",
    de: "TIXSYNC SOLUTIONS wurde von Cornelius Maina Nyaga gegruendet und hat seinen Sitz in Kenia. Wir sind spezialisiert auf Cybersicherheit, Webentwicklung, Cloud-Infrastruktur und digitale Transformation.",
    zh: "TIXSYNC SOLUTIONS you Cornelius Maina Nyaga chuangli, zongbu weiyu Kenniya. Women zhuanzhu yu wangluo anquan, Web kaifa, yun jichu shuhua he shuzi zhuanxing.",
    ja: "TIXSYNC SOLUTIONS wa Cornelius Maina Nyaga ni yotte setsuritsu sare, Kenya ni kichi wo okimashita. Saibaeru sekyuriti, web kaihatsu, kuraudo shisetsu, dejitaru toransufoomeshon wo senmon to shimasu.",
    ko: "TIXSYNC SOLUTIONS-neun Cornelius Maina Nyaga-ga seollip-haessigo Kenia-e bonbu-ga issseubnida. Saibeo boan, web gaebal, keulaeu inpeura mit dijiteol jeonhwan-eul jeonmun-euro haessubnida.",
    hi: "TIXSYNC SOLUTIONS ki sthapna Cornelius Maina Nyaga ne ki hai aur ye Kenya mein sthit hai. Hum cyber suraksha, web vikas, cloud infrastructure aur digital transformation mein visheshagya hain.",
    ru: "TIXSYNC SOLUTIONS osnovana Cornelius Maina Nyaga i baziruyetsya v Kenii. My spetsializiruyemsya na kiberbezopasnosti, veb-razrabotke, oblachnoy infrastrukture i tsifrovoy transformatsii.",
  },
  careers: {
    en: "We are always looking for talented individuals! Check out the About page on our website for career opportunities at TIXSYNC SOLUTIONS. You can also email your resume to tixsyncsolutions@gmail.com.",
    es: "Siempre buscamos personas talentosas! Visita la pagina Acerca de para oportunidades de carrera. Envia tu curriculum a tixsyncsolutions@gmail.com.",
    fr: "Nous recherchons toujours des talents! Consultez la page A propos pour les opportunites de carriere. Envoyez votre CV a tixsyncsolutions@gmail.com.",
    de: "Wir suchen immer talentierte Personen! Besuchen Sie die Ueber-uns-Seite fuer Karrieremoeglichkeiten. Senden Sie Ihren Lebenslauf an tixsyncsolutions@gmail.com.",
    zh: "Women yizhi zai xunzhao youxiu rencai! Qing fangwen guanyu women lejie zhiye jihui. Jiang jianli fangzhi tixsyncsolutions@gmail.com.",
    ja: "Yuushu na jinzai wo tsune ni sagashite imasu! Web saito no gaiyou peeji de kyaria kikai wo kakunin shite kudasai. Rirekisho wa tixsyncsolutions@gmail.com ni souhin shite kudasai.",
    ko: "Hangsang jaeneung inneun bun-deul-eul chajgo issseubnida! Web saiteu-eseo gyehoek peiji-eseo keolijeo gihoe-reul hwagin-haseyo. Iryeokseo-reul tixsyncsolutions@gmail.com-euro bonaejuseyo.",
    hi: "Hum hamesha pratibhashali logon ki talash mein rahte hain! Hamari website ke baare mein page par career ke avsar dekhein. Apna resume tixsyncsolutions@gmail.com par bhejein.",
    ru: "My vsegda ishem talantlivykh lyudey! Posetite stranicu O nas dlya kar'ernykh vozmozhnostey. Otprav'te rezume na tixsyncsolutions@gmail.com.",
  },
  digital: {
    en: "Our Digital Transformation services help businesses modernize their operations, integrate new technologies, and improve efficiency across the organization.",
    es: "Nuestros servicios de Transformacion Digital ayudan a las empresas a modernizar sus operaciones, integrar nuevas tecnologias y mejorar la eficiencia.",
    fr: "Nos services de Transformation Numerique aident les entreprises a moderniser leurs operations, integrer de nouvelles technologies et ameliorer l'efficacite.",
    de: "Unsere Dienstleistungen der Digitalen Transformation helfen Unternehmen, ihre Ablaeufe zu modernisieren, neue Technologien zu integrieren und die Effizienz zu steigern.",
    zh: "Women de shuzi zhuanxing fuwu bangzhu qiye shiyingyunying xiandaihua, jicheng xin jishu bing tigao xiaolv.",
    ja: "Dejitaru toransufoomeshon saabisu wa bijinesu no gendaika, shin gijutsu no tougou, koukaika wo shien shimasu.",
    ko: "Dijiteol jeonhwan seobiseu-neun bijineseu-ui hyeondaehwah, sin gisul tonghap mit hyohyeolseong-eul sojin-hamnida.",
    hi: "Hamari Digital Transformation sevayan vyavasaya ke sanchalan ko aadhunik banane, nai takneekon ko ekikrit karne aur kshamata mein sudhar karne mein madad karti hain.",
    ru: "Nashi uslugi tsifrovoy transformatsii pomogayut kompaniyam modernizirovat' operatsii, integrirovat' novye tekhnologii i povyshat' effektivnost'.",
  },
  compliance: {
    en: "We help organizations achieve and maintain compliance with standards like ISO 27001 and GDPR, ensuring data protection and regulatory adherence.",
    es: "Ayudamos a las organizaciones a lograr y mantener el cumplimiento con estandares como ISO 27001 y GDPR.",
    fr: "Nous aidons les organisations a atteindre et maintenir la conformite avec des normes comme ISO 27001 et RGPD.",
    de: "Wir helfen Organisationen, die Einhaltung von Standards wie ISO 27001 und DSGVO zu erreichen und aufrechtzuerhalten.",
    zh: "Women bangzhu zuzhi shixian he baochi dui ISO 27001 he GDPR deng biaozhun de hegui.",
    ja: "ISO 27001 ya GDPR nado no kikaku e no junbi wo tassei shi iji suru no wo shien shimasu.",
    ko: "ISO 27001 mit GDPR-bang--ui pyojun junbi-reul dallyeon-hago yuji-hamyeon dowajumnida.",
    hi: "Hum sangathanon ko ISO 27001 aur GDPR jaise manakon ke anupalan prapt karne aur banae rakhane mein madad karte hain.",
    ru: "My pomogayem organizatsiyam dostig' i podderzhivat' sootvetstvie standartam tipa ISO 27001 i GDPR.",
  },
  devops: {
    en: "Our DevOps services include CI/CD pipelines, GitHub Actions, Jenkins, Terraform, and Ansible. We help streamline your development and deployment processes.",
    es: "Nuestros servicios de DevOps incluyen pipelines CI/CD, GitHub Actions, Jenkins, Terraform y Ansible.",
    fr: "Nos services DevOps incluent pipelines CI/CD, GitHub Actions, Jenkins, Terraform et Ansible.",
    de: "Unsere DevOps-Dienste umfassen CI/CD-Pipelines, GitHub Actions, Jenkins, Terraform und Ansible.",
    zh: "Women de DevOps fuwu baokuo CI/CD liushui xian, GitHub Actions, Jenkins, Terraform he Ansible.",
    ja: "DevOps saabisu niwa CI/CD paipurain, GitHub Actions, Jenkins, Terraform, Ansible ga fukumaremasu.",
    ko: "DevOps seobiseu-neun CI/CD paipullain, GitHub Actions, Jenkins, Terraform, Ansible-eul pohamdoemnida.",
    hi: "Hamari DevOps sevaon mein CI/CD pipelines, GitHub Actions, Jenkins, Terraform aur Ansible shamil hain.",
    ru: "Nashi DevOps servisy vklyuchayut CI/CD pipeline, GitHub Actions, Jenkins, Terraform i Ansible.",
  },
  mobile: {
    en: "We develop cross-platform mobile applications using React Native and Flutter, delivering native-like performance on both iOS and Android.",
    es: "Desarrollamos aplicaciones moviles multiplataforma usando React Native y Flutter, con rendimiento nativo en iOS y Android.",
    fr: "Nous developpons des applications mobiles multiplateformes avec React Native et Flutter, offrant des performances natives sur iOS et Android.",
    de: "Wir entwickeln plattformuebergreifende Mobile-Anwendungen mit React Native und Flutter mit nativer Performance auf iOS und Android.",
    zh: "Women shiyong React Native he Flutter kaifa kuapingtai yidong yingyong, zai iOS he Android shang tigong yuan sheng de xingneng.",
    ja: "React Native to Flutter wo shiyou shite cross-platform mobairu apurikeeshon wo kaihatsu shimasu.",
    ko: "React Native mit Flutter-eul sayonghaeseo keuroseu plateu peomu mobeol aepeulikeisyeon-eul gaebal-hamnida.",
    hi: "Hum React Native aur Flutter ka upyog karke cross-platform mobile application viksit karte hain.",
    ru: "My razrabatyvaem krossplatformennye mobil'nyye prilozheniya s ispol'zovaniyem React Native i Flutter.",
  },
  thanks: {
    en: "You are welcome! Feel free to reach out anytime at tixsyncsolutions@gmail.com or +254704440164. Have a great day!",
    es: "De nada! No dudes en contactarnos en tixsyncsolutions@gmail.com o +254704440164. Que tengas un excelente dia!",
    fr: "De rien! N'hesitez pas a nous contacter a tixsyncsolutions@gmail.com ou +254704440164. Excellente journee!",
    de: "Gern geschehen! Kontaktieren Sie uns jederzeit unter tixsyncsolutions@gmail.com oder +254704440164. Einen schoenen Tag noch!",
    zh: "Bu keqi! Suishi tongguo tixsyncsolutions@gmail.com huo +254704440164 lianxi women. Zhu nin you meihao de yitian!",
    ja: "Dou itashimashite! tixsyncsolutions@gmail.com matawa +254704440164 de ohayaku go-renraku kudasai. Subarashii ichinichi wo!",
    ko: "Cheonman-eyo! tixsyncsolutions@gmail.com ilen +254704440164-eo eonjedeun yeollak-hae juseyo. Joeun haru doeseyo!",
    hi: "Aapka swagat hai! Kabhi bhi tixsyncsolutions@gmail.com ya +254704440164 par sampark karein. Aapka din shubh ho!",
    ru: "Pozhaluysta! Obrashchaytes' na tixsyncsolutions@gmail.com ili +254704440164. Khoroshego dnya!",
  },
  help: {
    en: "I can help you with information about our services, pricing inquiries, career opportunities, and general questions about TIXSYNC SOLUTIONS. What would you like to know?",
    es: "Puedo ayudarte con informacion sobre nuestros servicios, consultas de precios, oportunidades de carrera y preguntas generales. Que te gustaria saber?",
    fr: "Je peux vous aider avec des informations sur nos services, demandes de tarifs, opportunites de carriere et questions generales. Que souhaitez-vous savoir?",
    de: "Ich kann Ihnen bei Informationen zu unseren Dienstleistungen, Preisanfragen, Karrieremoeglichkeiten und allgemeinen Fragen helfen. Was moechten Sie wissen?",
    zh: "Wo keyi bangzhu nin liaojie women de fuwu xinxi, jiage zixun, zhiye jihui he yiban wenti. Nin xiang liaojie shenme?",
    ja: "Service joho, ryoukin go toiawase, saikyou joho, ippan shitsumon nado wo otetsudai shimasu. Nani wo shiritai deshou ka?",
    ko: "Seobiseu jeongbo, gagyeok munsun, keolijeo gihoe mit ilban jilmun-e dowadeuril su issseubnida. Museun geol algo siposieyo?",
    hi: "Main hamari sevaon ki jankari, keematon ke baare mein puchhtachch, career ke avsar aur samanya prashnon mein aapki madad kar sakta hoon. Aap kya janna chahenge?",
    ru: "Ya mogu pomoch' vam s informatsiyey o nashikh uslugakh, voprosami po tsenam, kar'ernymi vozmozhnostyami i obshchimi voprosami. Chto vy khotite uznat'?",
  },
  fallback: {
    en: "That is a great question! While I may not have a specific answer for that, I would recommend reaching out to our team directly at tixsyncsolutions@gmail.com or calling +254704440164 for personalized assistance. Is there anything specific about our services I can help with?",
    es: "Buena pregunta! Te recomiendo contactar a nuestro equipo directamente en tixsyncsolutions@gmail.com o llamar al +254704440164 para asistencia personalizada.",
    fr: "Excellente question! Je vous recommande de contacter directement notre equipe a tixsyncsolutions@gmail.com ou d'appeler le +254704440164.",
    de: "Das ist eine tolle Frage! Ich empfehle, direkt Kontakt mit unserem Team aufzunehmen unter tixsyncsolutions@gmail.com oder +254704440164.",
    zh: "Zhe shi yige hen hao de wenti! Jianyi zhijie lianxi women de tuandui: tixsyncsolutions@gmail.com huo zhi dian +254704440164获取个性化帮助.",
    ja: "Ii goshitsumon desu ne! Chikaku ni renraku shite kudasai: tixsyncsolutions@gmail.com matawa +254704440164.",
    ko: "Joeun jilmun-ibnida! Tim-ege directly tixsyncsolutions@gmail.com-ilo yeollak-hagesio ilen +254704440164-ro jeonhwa-haseyo.",
    hi: "Bahut accha sawal hai! Meri salah hai ki hamari team se seedha sampark karein: tixsyncsolutions@gmail.com ya +254704440164.",
    ru: "Otlichnyy vopros! Rekomenduyu svyazat'sya s nashey komandoy napryamuyu: tixsyncsolutions@gmail.com ili +254704440164.",
  },
};

const LANG_CODES = ["en","es","fr","pt","de","ar","zh","ja","ko","hi","ru","it","nl","pl","th","vi","id","sw","tl","bn","ur","fa","he","el","cs","ro","hu","sv","no","da","fi","uk","bg","hr","sk","lt","lv","et","ka","hy","az","kk","uz","mn","ne","am"];

const GREETINGS: Record<string, string[]> = {
  en: ["hello","hi","hey","good morning","good afternoon","good evening"],
  es: ["hola","buenos dias","buenas tardes"],
  fr: ["bonjour","salut","bonsoir"],
  pt: ["ola","oi","bom dia"],
  de: ["hallo","guten morgen","guten tag"],
  it: ["ciao","buongiorno","salve"],
  nl: ["hallo","goedemorgen"],
  ru: ["privet","zdravstvuyte","dobroye utro"],
  zh: ["nihao","nin hao","zaoshang hao"],
  ja: ["konnichiwa","ohayou","konbanwa"],
  ko: ["annyeonghaseyo","annyeonghasimnikka"],
  ar: ["marhaba","ahlan","sabah al-khayr"],
  hi: ["namaste","namaskar","shubh prabhat"],
  tr: ["merhaba","iyi gunler","gunaydin"],
  pl: ["czesc","witaj","dzien dobry"],
  th: ["sawatdee","sawatdee kha","sawatdee krub"],
  vi: ["xin chao","chao ban"],
  id: ["halo","hai","selamat pagi"],
  sw: ["habari","jambo","hujambo"],
  tl: ["kamusta","hello"],
  bn: ["namaskar","hello","shubho sakal"],
  ur: ["assalam-o-alaikum","hello","subah bakhair"],
  fa: ["salam","sobh bokheir"],
  he: ["shalom","boker tov"],
  el: ["yia sas","yia","kali mera"],
  cs: ["ahoj","dobry den"],
  ro: ["buna ziua","salut","buna dimineata"],
  hu: ["szia","jo napot","jo reggelt"],
  sv: ["hej","god dag","god morgon"],
  no: ["hei","god dag","god morgon"],
  da: ["hej","god dag","god morgen"],
  fi: ["hei","hyvaa paivaa","huomenta"],
  uk: ["privit","dobriy den","dobroho ranku"],
  bg: ["zdraveyte","zdravey","dobro utro"],
  hr: ["zdravo","dobar dan","dobro jutro"],
  sk: ["ahoj","dobry den","dobre rano"],
  lt: ["labas","laba diena","labas rytas"],
  lv: ["sveiki","labdien","labrit"],
  et: ["tere","tere hommikust","head paeva"],
  ka: ["gamarjoba","dila mshvidobisa"],
  hy: ["barev","barev luis"],
  az: ["salam","sabahiniz xeyir"],
  kk: ["salem","qayirly tañ"],
  uz: ["salom","xayrli kun"],
  mn: ["sain baina uu"],
  ne: ["namaste","namaskar"],
  am: ["selam","indemen"],
};

function detectLanguage(text: string): string {
  const lower = text.toLowerCase().trim();
  for (const [lang, greetings] of Object.entries(GREETINGS)) {
    for (const g of greetings) {
      if (lower === g || lower.startsWith(g + " ") || lower.includes(g)) {
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
  return "en";
}

function getResponse(lang: string, key: string): string {
  return REPLIES[key]?.[lang] || REPLIES[key]?.en || REPLIES.fallback.en;
}

function matchIntent(text: string): { intent: string; priority: number } {
  const lower = text.toLowerCase();
  const checks: [RegExp, string, number][] = [
    [/\b(thanks?|thank you|bye|goodbye|see you|cheers)\b/i, "thanks", 10],
    [/\b(hello|hi|hey|good morning|good afternoon|good evening)\b/i, "greeting", 10],
    [/\b(help|what can|how|what do you)\b/i, "help", 9],
    [/\b(pricing|cost|price|how much|quote|rate|affordable|budget)\b/i, "pricing", 8],
    [/\b(contact|email|phone|reach|get in touch|call|whatsapp)\b/i, "contact", 8],
    [/\b(career|job|jobs|hiring|hire|recruit|vacancy|work with)\b/i, "careers", 8],
    [/\b(about|who|team|founder|cornelius|company|story|background)\b/i, "about", 8],
    [/\b(cybersecurity|security|penetration|soc|firewall|siem|incident|vulnerability|hack)\b/i, "cybersecurity", 7],
    [/\b(web\s*(dev|develop)|react|next\.?js|node\.?js|typescript|python|full.?stack|website|web app)\b/i, "web", 7],
    [/\b(cloud|aws|azure|gcp|migration|serverless|docker|kubernetes|infrastructure)\b/i, "cloud", 7],
    [/\b(devops|ci\/cd|pipeline|terraform|ansible|jenkins|github actions)\b/i, "devops", 7],
    [/\b(mobile|app|react native|flutter|ios|android)\b/i, "mobile", 7],
    [/\b(digital|transform|modernize|automation|modern)\b/i, "digital", 7],
    [/\b(compliance|iso|gdpr|regulation|audit|standard)\b/i, "compliance", 7],
  ];

  let best = { intent: "fallback", priority: 0 };
  for (const [pattern, intent, priority] of checks) {
    if (pattern.test(lower) && priority > best.priority) {
      best = { intent, priority };
    }
  }
  return best;
}

export async function POST(request: Request) {
  try {
    const { messages, language } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ reply: "Please send a message to start the conversation." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const lang = (language && LANG_CODES.includes(language)) ? language : "en";

    if (apiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages.map((m: { role: string; content: string }) => ({
                role: m.role,
                content: m.content,
              })),
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({ reply: data.choices[0].message.content });
        }
      } catch {
        // Fall through to fallback
      }
    }

    const lastMsg = messages[messages.length - 1]?.content || "";
    const detectedLang = detectLanguage(lastMsg);
    const responseLang = detectedLang !== "en" ? detectedLang : lang;

    const { intent } = matchIntent(lastMsg);
    let reply: string;

    switch (intent) {
      case "greeting":
        reply = getResponse(responseLang, "greeting");
        break;
      case "thanks":
        reply = getResponse(responseLang, "thanks");
        break;
      case "help":
        reply = getResponse(responseLang, "help");
        break;
      default:
        reply = getResponse(responseLang, intent);
        break;
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Something went wrong. Please try again." }, { status: 500 });
  }
}
