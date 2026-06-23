import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";

// Translations dataset to support bilingual toggling seamlessly
const translations = {
  fa: {
    dir: "rtl",
    brand: "Master Gold Iran",
    slogan: "ما تنها برند فقر زدایی با درآمد دلاری واقعی در ایران هستیم",
    area: "آموزش • استراتژی • مشاوره • راه‌اندازی بازارهای مالی غیرمتمرکز",
    tagline: "کلیه آموزش‌ها و خدمات در ایران به صورت ۱۰۰٪ رایگان انجام می‌شود",
    heroTitle: "به دنیای درآمد دلاری من خوش اومدید",
    heroSubtitle: "کار ما فقر زدایی تو جامعست",
    ctaView: "مشاهده پروژه‌ها و تخصص‌ها",
    ctaContact: "ارتباط با معین علوی",
    
    // Services
    servicesTitle: "خدمات و تخصص‌ها",
    servicesSubtitle: "مسیر رشد مالی هدفمند و علمی",
    service1Title: "بازارهای غیرمتمرکز",
    service1Desc: "آموزش صفر تا صد شروع کسب درآمد دلاری از پایه تا پیشرفته به صورت کاملاً علمی و تضمین‌شده.",
    service2Title: "بازار طلا",
    service2Desc: "مشاوره تخصصی خرید، فروش، سبدگردانی هوشمند و متدهای نوسان‌گیری فوق‌حرفه‌ای در بازار طلا.",
    service3Title: "ترید و معاملات آنلاین",
    service3Desc: "در حال حاضر برگزار نمی‌شود. ما روی راه‌کارهای پایدارتر و ضدریسک‌تر وب ۳ تمرکز داریم.",
    service3Status: "غیرفعال موقت",

    // About Me
    aboutTitle: "درباره من",
    aboutSubtitle: "میدونی ما کی هستیم؟",
    aboutIntro: "سلام دوست من، بنده معین علوی هستم.",
    aboutText: "معرفی مدرس و پروموتر رسمی شما در دوره‌ها: مدرس، محقق، تحلیل‌گر، مشاور، سرمایه‌گذار، استراتژیست و کارآفرین در حوزه Web3 و قراردادهای هوشمند با سابقه فعالیت فعال از سال ۲۰۲۱. برند ما در ایران (Master Gold Iran) همواره با پروژه‌ها و اکوسیستم‌هایی کار می‌کند که ادعامون ضد هرمی، پانزی، اسکم و کلاه‌برداری بودنه. هدف نهایی ما صرفاً آگاه‌سازی و فقرزدایی مردم شریف ایران است. کلیه آموزش‌ها و مشاوره‌های ما بدون ریالی دریافت هزینه، ۱۰۰٪ رایگان ارائه می‌شود.",
    
    statsLabel1: "وبینار آموزشی آنلاین",
    statsLabel2: "دانشجوی ایرانی تحت آموزش رایگان",
    statsLabel3: "کارآفرینی دیجیتال فعال در ۳ سال",
    
    specsTitle: "سوابق و تخصص‌های برجسته",
    spec1: "تحلیلگر بازارهای مالی و مدرس سبک‌های RTM ،ICT، اسمارت مانی و پرایس اکشن",
    spec2: "مشاور تخصصی پروژه‌های بلاکچینی و سیستم‌های نوین NFT در ایران",
    spec3: "پروموتر رسمی پروژه‌های جهانی Meta Whale، Holiverse و Holivita در ایران تحت اکوسیستم‌های متاوال، هالیورس و ویستوری",
    spec4: "نویسنده محتوای تخصصی در وبلاگ‌های بین‌المللی و رسمی Holiverse و Meta Whale",

    // Projects
    projectsTitle: "پروژه‌های برجسته",
    projectsSubtitle: "اکوسیستم‌های پیشرفته مالی و غیرمتمرکز وب ۳",
    project1Tag: "متاورس و دیفای",
    project1Title: "پروژه متاوال اسپیس (Meta Whale Space)",
    project1Desc: "متا وال (Meta Whale) یک اکوسیستم پیشرفته در وب ۳، متاورس و دیفای (DeFi) است. این پلتفرم ابزارهای مالی، سرگرمی، آموزش و NFTها را در یک فضای واحد متحد کرده و دسترسی یکپارچه‌ای به کاربران می‌دهد.",
    project2Tag: "اکوسیستم قرارداد هوشمند",
    project2Title: "پروژه انقلابی ویستوری (Vistory)",
    project2Desc: "به Vistory خوش آمدید؛ یک اکوسیستم کاملاً یکپارچه Web3 که در آن امور مالی، بازی، آموزش و مالکیت دیجیتال به یک سیستم مالی غیرمتمرکز تبدیل شده است. معین علوی مدرس و پروموتر رسمی این پروژه در ایران است.",
    project3Tag: "آموزش و اخبار",
    project3Title: "پروژه هالیورس (Holiverse)",
    project3Desc: "مجموعه مستر گولد ایران تقدیم می‌کند: کانال رسمی اخبار و اطلاعات پروژه HOLIVERSE & METAWHALE، تاکتیک و استراتژی (T&S)، رویالتریکس NFT، معدن ماینر BIT FORCE، محصولات کش‌بک توکن، صرافی W.dex، ارز دیجیتال CES COIN، هلدینگ، استیکینگ و متاورس.",
    viewProjectBtn: "ورود به پروژه و ثبت‌نام",

    // Testimonials
    testTitle: "نظرات دانشجویان و همراهان",
    testSubtitle: "صدای واقعی کسانی که با ما فقر زدایی را آغاز کردند",
    test1Text: "آموزش‌های وب۳ و متاورس معین علوی کاملا ضد هرمی و شفاف بود. بالاخره یک درآمد دلاری واقعی رو تجربه کردم بدون اینکه ترسی از اسکم بودن پروژه داشته باشم.",
    test1Name: "رضا سهرابی",
    test1Role: "دانشجو دوره رایگان وب۳",
    test2Text: "تحلیل‌های بازار طلا و مشاوره‌های عالی ایشون باعث شد تو نوسانات اخیر طلا سرمایه‌ام رو به بهترین شکل حفظ کنم و سوددهی خوبی داشته باشم. واقعا خسته نباشید.",
    test2Name: "مریم احمدی",
    test2Role: "سرمایه‌گذار بازار طلا",
    test3Text: "ادغام وب۳، متاورس و آموزش‌های رایگان متاوال و هالیورس پتانسیل فوق‌العاده‌ای دارن. ممنون از آموزش‌های رایگان و دلسوزانه جناب علوی عزیز.",
    test3Name: "امیرحسین فیاض",
    test3Role: "فعال بازار دیجیتال و بلاکچین",

    // FAQ
    faqTitle: "سوالات متداول شما",
    faqSubtitle: "پاسخ به ابهامات متداول درباره فرآیند کسب درآمد",
    faq1Q: "آیا واقعاً آموزش‌ها و خدمات شما ۱۰۰٪ رایگان است؟",
    faq1A: "بله، قطعاً. کلیه دوره‌های آموزشی، وبینارها، تحلیل‌های بازار طلا و مشاوره‌های اختصاصی مستر گولد ایران در راستای رسالت فقرزدایی به صورت کاملاً رایگان ارائه می‌شود و هیچ هزینه‌ای بابت آموزش دریافت نخواهد شد.",
    faq2Q: "چگونه می‌توانم در پروژه‌های متاوال، ویستوری یا هالیورس شروع به کار کنم؟",
    faq2A: "بسیار ساده است. شما می‌توانید از بخش پروژه‌های برجسته بر روی دکمه ثبت‌نام کلیک کنید تا وارد پلتفرم رسمی شوید، یا مستقیماً به کانال تلگرام ما بپیوندید تا ویدیوهای راهنمای گام‌به‌گام را دریافت کنید.",
    faq3Q: "تفاوت این پروژه‌ها با شرکت‌های هرمی یا طرح‌های پانزی چیست؟",
    faq3A: "ادعای اصلی و افتخار ما ضد هرمی، ضد پانزی، اسکم و کلاه‌برداری بودن تمامی اکوسیستم‌های غیرمتمرکز انتخابی است. این پلتفرم‌ها بر بستر قراردادهای هوشمند بلاکچین (Smart Contracts) بنا شده‌اند و هیچ فرد یا نهادی توانایی دخل و تصرف یا مسدود کردن دارایی شما را ندارد.",

    // Contact
    contactTitle: "تماس با من و مشاوره",
    contactSubtitle: "پل‌های ارتباطی مستقیم جهت ورود به دنیای مالی نوین",
    contactIntroTitle: "راه‌های ارتباط با معین علوی",
    contactIntroDesc: "پاسخگوی سوالات و هدایت‌گر شما در حوزه‌های راه‌اندازی کسب‌وکار دلاری، مشاوره نوسان‌گیری طلا و کارآفرینی دیجیتال در بستر وب ۳.",
    phoneLabel: "شماره تلفن مستقیم در ایران",
    emailLabel: "ایمیل پشتیبانی رسمی",
    addressLabel: "دفتر مرکزی و محل فعالیت",
    addressVal: "ایران، تهران",
    socialTitle: "شبکه‌های اجتماعی و کانال‌های رسمی",
    telegramLabel: "کانال تلگرام هالیورس و متاوال",
    instagramLabel: "پیج اینستاگرام رسمی ما",
    formTitle: "ارسال پیام مستقیم",
    formName: "نام و نام خانوادگی شما",
    formEmail: "آدرس ایمیل فعال",
    formMessage: "پیام یا درخواست مشاوره شما",
    placeholderMessage: "جزئیات پروژه یا سوال خود را اینجا بنویسید...",
    btnSubmit: "با من تماس بگیر",
    sending: "در حال ارسال اطلاعات...",
    successTitle: "پیام شما با موفقیت ارسال شد!",
    successText: "از اعتماد شما سپاسگزاریم. معین علوی یا تیم پشتیبانی در اسرع وقت پاسخگوی شما خواهند بود.",
    allRights: "تمامی حقوق مادی و معنوی محفوظ است. توسعه یافته توسط معین علوی."
  },
  en: {
    dir: "ltr",
    brand: "Master Gold Iran",
    slogan: "The only poverty alleviation brand with real dollar income in Iran",
    area: "Education • Strategy • Consulting • Launch of Decentralized Financial Markets",
    tagline: "All training and services in Iran are provided 100% free of charge",
    heroTitle: "Welcome to My Dollar-Income World",
    heroSubtitle: "Our mission is poverty alleviation in society",
    ctaView: "Explore Projects & Specialties",
    ctaContact: "Contact Moein Alavi",
    
    // Services
    servicesTitle: "Services & Specialties",
    servicesSubtitle: "A Target-Oriented and Scientific Financial Path",
    service1Title: "Decentralized Markets",
    service1Desc: "Comprehensive training on starting dollar income generation from scratch to advanced, 100% scientifically backed.",
    service2Title: "Gold Market",
    service2Desc: "Specialized consulting on buying, selling, smart portfolio management, and professional gold trading swing strategies.",
    service3Title: "Online Trading",
    service3Desc: "Currently not active. We are focusing fully on sustainable, anti-risk Web3 smart contract structures.",
    service3Status: "Temporarily Disabled",

    // About Me
    aboutTitle: "About Me",
    aboutSubtitle: "Do you know who we are?",
    aboutIntro: "Hello my friend, I am Moein Alavi.",
    aboutText: "Official educator and promoter: Lecturer, researcher, analyst, consultant, investor, strategist, and entrepreneur in Web3 and smart contracts, active since 2021. Our brand, Master Gold Iran, strictly partners with anti-pyramid, anti-ponzi, and anti-scam ecosystems. Our fundamental goal is raising awareness and alleviating poverty in Iran. All of our education and consultation services are 100% free.",
    
    statsLabel1: "Online Webinars Held",
    statsLabel2: "Iranian Students Trained for Free",
    statsLabel3: "Active Digital Entrepreneurs in 3 Years",
    
    specsTitle: "Core Sagas & Highlighted Qualifications",
    spec1: "Financial markets analyst & teacher of RTM, ICT, Smart Money, and Price Action styles",
    spec2: "Blockchain and modern NFT project consulting specialist in Iran",
    spec3: "Official promoter of Meta Whale, Holiverse, and Holivita projects in Iran within the meta-whale, holiverse, and vistory ecosystems",
    spec4: "Specialized content writer in the official blogs of Holiverse and Meta Whale",

    // Projects
    projectsTitle: "Featured Projects",
    projectsSubtitle: "Advanced Web3 Financial Ecosystems & Decentralized Platforms",
    project1Tag: "Metaverse & DeFi",
    project1Title: "Meta Whale Space",
    project1Desc: "Meta Whale is an advanced Web3, Metaverse, and DeFi ecosystem. It unites financial tools, gaming, education, and NFTs into a single, unified digital hub giving users global decentralized access.",
    project2Tag: "Smart Contract Platform",
    project2Title: "Vistory Ecosystem",
    project2Desc: "Welcome to Vistory: a comprehensive Web3 ecosystem merging decentralized finance, gaming, education, and digital assets. Moein Alavi is the primary promoter and teacher in Iran.",
    project3Tag: "Info & News Hub",
    project3Title: "Holiverse Ecosystem",
    project3Desc: "Presented by Master Gold Iran: Official news, Tactics & Strategy (T&S), Royalty NFT, BIT FORCE mining, cashback products, W.dex, CES COIN, holding, staking, and metaverse updates.",
    viewProjectBtn: "Enter Project & Register",

    // Testimonials
    testTitle: "What Our Students Say",
    testSubtitle: "Real voices of people who unlocked stable dollar income with us",
    test1Text: "Moein Alavi's Web3 and Metaverse classes were entirely anti-pyramid and transparent. I finally experienced real dollar revenue without fear of scams.",
    test1Name: "Reza Sohrabi",
    test1Role: "Free Web3 Course Student",
    test2Text: "The expert gold market consulting and portfolio tips saved my savings during recent market fluctuations and yielded great profits.",
    test2Name: "Maryam Ahmadi",
    test2Role: "Gold Market Investor",
    test3Text: "The integration of Web3, Metaverse, and free education in Meta Whale and Holiverse has immense potential. Extremely grateful for Mr. Alavi's mentorship.",
    test3Name: "Amirhossein Fayyaz",
    test3Role: "Digital Assets Developer",

    // FAQ
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Clearing up doubts about starting your dollar income path",
    faq1Q: "Are the courses and services genuinely 100% free?",
    faq1A: "Yes, absolutely. All lectures, webinars, gold trading guides, and custom consults by Master Gold Iran are completely free of charge. No tuition or hidden fees.",
    faq2Q: "How can I begin in Meta Whale, Vistory, or Holiverse?",
    faq2A: "It is simple. You can click on the registration buttons under our featured projects section to access the portals directly, or join our official Telegram channel for sequential guides.",
    faq3Q: "How do these projects differ from pyramid schemes or Ponzi traps?",
    faq3A: "We pride ourselves on working strictly with verified decentralized smart contract ecosystems. Since they run autonomously on public blockchains, no central entity can alter, block, or compromise your assets.",

    // Contact
    contactTitle: "Contact & Consultation",
    contactSubtitle: "Direct communication channels to get started",
    contactIntroTitle: "Connect with Moein Alavi",
    contactIntroDesc: "Always ready to guide you on launching dollar-denominated setups, navigating gold swings, or embarking on Web3 business structures.",
    phoneLabel: "Direct Phone Number (Iran)",
    emailLabel: "Official Support Email",
    addressLabel: "Headquarters & Region",
    addressVal: "Tehran, Iran",
    socialTitle: "Social Medias & Official Feeds",
    telegramLabel: "Holiverse & Meta Whale Telegram Channel",
    instagramLabel: "Our Official Instagram Profile",
    formTitle: "Send a Direct Message",
    formName: "Your Full Name",
    formEmail: "Your Active Email Address",
    formMessage: "Your Message or Consultation Request",
    placeholderMessage: "Write your project details or questions here...",
    btnSubmit: "Contact Me",
    sending: "Submitting details...",
    successTitle: "Message Sent Successfully!",
    successText: "Thank you for your trust. Moein Alavi or our support crew will reach out to you shortly.",
    allRights: "All rights reserved. Designed and developed by Moein Alavi."
  },
  ar: {
    dir: "rtl",
    brand: "ماستر غولد إيران",
    slogan: "نحن العلامة التجارية الوحيدة للحد من الفقر بدخل دولاري حقيقي في إيران",
    area: "التعليم • الاستراتيجية • الاستشارات • إطلاق الأسواق المالية اللامركزية",
    tagline: "يتم تقديم جميع التدريبات والخدمات في إيران مجانًا بنسبة ۱۰۰٪",
    heroTitle: "مرحباً بكم في عالم الدخل بالدولار الخاص بي",
    heroSubtitle: "مهمتنا هي القضاء على الفقر في المجتمع",
    ctaView: "عرض المشاريع والتخصصات",
    ctaContact: "التواصل مع معين علوي",
    
    // Services
    servicesTitle: "الخدمات والتخصصات",
    servicesSubtitle: "مسار نمو مالي هادف وعلمي",
    service1Title: "الأسواق اللامركزية",
    service1Desc: "تدريب شامل من الصفر لبدء كسب الدخل بالدولار من المستوى المبتدئ إلى المتقدم بشكل علمي ومضمون بالكامل.",
    service2Title: "سوق الذهب",
    service2Desc: "استشارات متخصصة في الشراء، البيع، إدارة المحافظ الذكية وطرق المضاربة الاحترافية في سوق الذهب.",
    service3Title: "التداول والصفقات عبر الإنترنت",
    service3Desc: "غير مفعل حالياً. نحن نركز بشكل كامل على حلول الويب ۳ الأكثر استقراراً ومقاومة للمخاطر.",
    service3Status: "غير نشط مؤقتاً",

    // About Me
    aboutTitle: "من أنا",
    aboutSubtitle: "هل تعرف من نحن؟",
    aboutIntro: "أهلاً بك يا صديقي، أنا معين علوي.",
    aboutText: "مدرسك ومروجك الرسمي في الدورات: محاضر، باحث، محلل، مستشار، مستثمر، استراتيجي ورائد أعمال في مجال الويب ۳ والجنود الذكية (Smart Contracts) بخبرة نشطة منذ عام ۲۰۲۱. علامتنا التجارية في إيران (Master Gold Iran) تعمل دائماً مع المشاريع والأنظمة البيئية التي نؤكد أنها ضد الهرمية، البونزي، الاحتيال والنصب. هدفنا النهائي هو ببساطة زيادة الوعي والقضاء على الفقر لدى الشعب الإيراني الشريف. يتم تقديم جميع دوراتنا واستشاراتنا مجاناً بنسبة ۱۰۰٪ بدون أي تكلفة.",
    
    statsLabel1: "ندوة تعليمية عبر الإنترنت",
    statsLabel2: "طالب إيراني تحت التدريب المجاني",
    statsLabel3: "رائد أعمال رقمي نشط في ۳ سنوات",
    
    specsTitle: "السوابق والتخصصات البارزة",
    spec1: "محلل الأسواق المالية ومدرس أساليب RTM ،ICT، المال الذكي والبرايس أكشن",
    spec2: "مستشار متخصص في مشاريع البلوكشين وأنظمة NFT الحديثة في إيران",
    spec3: "المروج الرسمي للمشاريع العالمية Meta Whale و Holiverse و Holivita في إيران تحت الأنظمة البيئية لميتاوال، هاليفرس وفيستوري",
    spec4: "كاتب محتوى متخصص في المدونات الدولية والرسمية لـ Holiverse و Meta Whale",

    // Projects
    projectsTitle: "المشاريع البارزة",
    projectsSubtitle: "الأنظمة البيئية المالية المتقدمة واللامركزية للويب ۳",
    project1Tag: "الميتافيرس والديفي",
    project1Title: "مشروع ميتاوال سبيس (Meta Whale Space)",
    project1Desc: "ميتا وال (Meta Whale) هو نظام بيئي متقدم في الويب ۳، الميتافيرس، والديفي (DeFi). تجمع هذه المنصة بين الأدوات المالية، الترفيه، التعليم وNFT في مساحة واحدة موحدة وتوفر وصولاً سلساً للمستخدمين.",
    project2Tag: "منصة العقود الذكية",
    project2Title: "مشروع فيستوري الثوري (Vistory)",
    project2Desc: "مرحباً بكم في Vistory؛ نظام بيئي متكامل للويب ۳ حيث تتحول المالية، الألعاب، التعليم والملكية الرقمية إلى نظام مالي لامركزي. معين علوي هو المدرس والمروج الرسمي لهذا المشروع في إيران.",
    project3Tag: "التعليم والأخبار",
    project3Title: "مشروع هاليفرس (Holiverse)",
    project3Desc: "تقدم مجموعة مستر غولد إيران: القناة الرسمية لأخبار ومعلومات مشروع HOLIVERSE & METAWHALE، التكتيك والاستراتيجية (T&S)، رويالتريكس NFT، منجم التعدين BIT FORCE، منتجات الكاش باك توكن، بورصة W.dex، العملة الرقمية CES COIN، القابضة، الستيكينغ والميتافيرس.",
    viewProjectBtn: "الدخول إلى المشروع والتسجيل",

    // Testimonials
    testTitle: "آراء الطلاب والشركاء",
    testSubtitle: "الصوت الحقيقي لمن بدأوا معنا رحلة القضاء على الفقر",
    test1Text: "كانت دورات الويب ۳ والميتافيرس لمعين علوي شفافة تماماً وضد المشاريع الهرمية. لقد جربت أخيراً دخلاً حقيقياً بالدولار دون خوف من أن يكون المشروع احتيالياً.",
    test1Name: "رضا سهرابی",
    test1Role: "طالب الدورة المجانية للويب ۳",
    test2Text: "تحليلات سوق الذهب واستشاراته الممتازة ساعدتني على حماية رأس مالي بأفضل طريقة ممكنة خلال تقلبات الذهب الأخيرة وتحقيق أرباح جيدة جداً. شكراً جزيلاً لكم.",
    test2Name: "مریم احمدی",
    test2Role: "مستثمرة في سوق الذهب",
    test3Text: "دمج الويب ۳، الميتافيرس والتدريب المجاني في ميتاوال وهاليفرس يمتلك إمكانيات هائلة. ممتن جداً للتدريب المجاني والمخلص من العزيز معين علوي.",
    test3Name: "امیرحسین فیاض",
    test3Role: "ناشط في السوق الرقمي والبلوكشين",

    // FAQ
    faqTitle: "الأسئلة الشائعة",
    faqSubtitle: "الإجابة على الاستفسارات الشائعة حول عملية كسب الدخل",
    faq1Q: "هل التدريب والخدمات الخاصة بك مجانية بنسبة ۱۰۰٪ حقاً؟",
    faq1A: "نعم، بالتأكيد. يتم تقديم جميع الدورات التدريبية، الندوات عبر الإنترنت، تحليلات سوق الذهب والاستشارات الخاصة بمستر غولد إيران مجاناً بالكامل في إطار رسالتنا للقضاء على الفقر، ولن يتم فرض أي رسوم على التعليم.",
    faq2Q: "كيف يمكنني البدء في مشاريع ميتاوال، فيستوري أو هاليفرس؟",
    faq2A: "الأمر بسيط للغاية. يمكنك الضغط على زر التسجيل في قسم المشاريع البارزة للدخول إلى المنصة الرسمية، أو الانضمام مباشرة إلى قناتنا على التلغرام لتلقي فيديوهات الشرح خطوة بخطوة.",
    faq3Q: "ما هو الفرق بین هذه المشاريع والشركات الهرمية أو مخططات البونزی؟",
    faq3A: "فخرنا الأكبر هو أن جميع الأنظمة البيئية اللامركزية التي نختارها هي ضد الأنظمة الهرمية، البونزي، الاحتيال والنصب. تم بناء هذه المنصات على عقود ذكية في البلوكشين (Smart Contracts) ولا تملك أي جهة أو فرد القدرة على التدخل في أصولك أو تجميدها.",

    // Contact
    contactTitle: "الاتصال بي والاستشارة",
    contactSubtitle: "قنوات الاتصال المباشرة للدخول إلى عالم المال الحديث",
    contactIntroTitle: "طرق التواصل مع معين علوي",
    contactIntroDesc: "جاهز للإجابة على أسئلتك وإرشادك في مجالات إطلاق الأعمال التجارية بالدولار، استشارات تذبذب الذهب، وريادة الأعمال الرقمية على الويب ۳.",
    phoneLabel: "رقم الهاتف المباشر في إيران",
    emailLabel: "البريد الإلكتروني الرسمي للدعم",
    addressLabel: "المكتب الرئيسي ومكان العمل",
    addressVal: "إيران، طهران",
    socialTitle: "شبكات التواصل الاجتماعي والقنوات الرسمية",
    telegramLabel: "قناة تلغرام هاليفرس وميتاوال",
    instagramLabel: "حسابنا الرسمي على إنستغرام",
    formTitle: "إرسال رسالة مباشرة",
    formName: "اسمك الكامل",
    formEmail: "عنوان البريد الإلكتروني النشط",
    formMessage: "رسالتك أو طلب الاستشارة الخاص بك",
    placeholderMessage: "اكتب تفاصيل مشروعك أو أسئلتك هنا...",
    btnSubmit: "اتصل بي",
    sending: "جاري إرسال المعلومات...",
    successTitle: "تم إرسال رسالتك بنجاح!",
    successText: "نشكرك على ثقتك. معين علوي أو فريق الدعم سيجيبون عليك في أقرب وقت ممکن.",
    allRights: "جميع الحقوق محفوظة. تم التطوير بواسطة معين علوي."
  }
};

export default function App() {
  const [lang, setLang] = useState<"fa" | "en" | "ar">("fa");
  const t = translations[lang];

  // Active navigation section state
  const [activeSection, setActiveSection] = useState("hero");
  // Mobile drawer trigger
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  // Testimonials active carousel index
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Form states
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [contactPlatform, setContactPlatform] = useState<"whatsapp" | "telegram">("whatsapp");

  // Section references for intersection and scrolling
  const sectionsRef = {
    hero: useRef<HTMLElement>(null),
    services: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    testimonials: useRef<HTMLElement>(null),
    faq: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  const navigationItems = [
    { id: "hero", label: lang === "fa" ? "خانه" : lang === "ar" ? "الرئيسية" : "Home" },
    { id: "services", label: lang === "fa" ? "خدمات و تخصص‌ها" : lang === "ar" ? "الخدمات والتخصصات" : "Services" },
    { id: "about", label: lang === "fa" ? "درباره من" : lang === "ar" ? "من أنا" : "About Me" },
    { id: "projects", label: lang === "fa" ? "پروژه‌های برجسته" : lang === "ar" ? "المشاريع البارزة" : "Featured Projects" },
    { id: "testimonials", label: lang === "fa" ? "نظرات همراهان" : lang === "ar" ? "آراء الشركاء" : "Testimonials" },
    { id: "faq", label: lang === "fa" ? "سوالات متداول" : lang === "ar" ? "الأسئلة الشائعة" : "FAQ" },
    { id: "contact", label: lang === "fa" ? "تماس با من" : lang === "ar" ? "الاتصال بي" : "Contact" },
  ];

  // Set page direction dynamically when language changes
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  // Handle active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (const [sectionId, ref] of Object.entries(sectionsRef)) {
        const element = ref.current;
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Autoplay testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % 3);
    }, 8500);
    return () => clearInterval(interval);
  }, []);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setIsSubmitting(true);

    const text = lang === "fa"
      ? `سلام جناب علوی، من ${formData.name} هستم.\n\nپیام من:\n${formData.message}`
      : lang === "ar"
      ? `مرحباً سيد علوي، أنا ${formData.name}.\n\nرسالتي:\n${formData.message}`
      : `Hello Mr. Alavi, I am ${formData.name}.\n\nMessage:\n${formData.message}`;

    let targetUrl = "";
    if (contactPlatform === "whatsapp") {
      targetUrl = `https://wa.me/989038354826?text=${encodeURIComponent(text)}`;
    } else {
      targetUrl = `https://t.me/Emperor2021?text=${encodeURIComponent(text)}`;
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      const link = document.createElement("a");
      link.href = targetUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.click();

      setFormData({ name: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans relative selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[1400px] right-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute bottom-[800px] left-10 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-900 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with link to Telegram and styling */}
            <div className="flex items-center">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("hero");
                }}
                className="group flex items-center space-x-2 space-x-reverse"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                  <i className="fa-solid fa-crown text-zinc-950 text-lg"></i>
                </div>
                <div className={`flex flex-col ${lang === "fa" ? "mr-3" : "ml-3"}`}>
                  <span className="text-xl font-black tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-200 to-orange-500 leading-none">
                    {t.brand}
                  </span>
                  <span className="text-[9px] text-zinc-500 font-mono tracking-widest mt-1">
                    DECEN. MARKETS
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-semibold transition-all duration-300 relative ${
                    activeSection === item.id
                      ? "text-amber-400 bg-zinc-900/60"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/30"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Language & Channel Actions */}
            <div className="hidden md:flex items-center space-x-3 space-x-reverse">
              {/* Language Switcher */}
              <div className="flex items-center space-x-1 space-x-reverse bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
                <button
                  onClick={() => setLang("fa")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    lang === "fa"
                      ? "bg-amber-500 text-zinc-950 shadow"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  فارسی
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    lang === "en"
                      ? "bg-amber-500 text-zinc-950 shadow"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("ar")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    lang === "ar"
                      ? "bg-amber-500 text-zinc-950 shadow"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  العربية
                </button>
              </div>

              <a
                href="https://t.me/metawhale2024"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 transition-all border border-zinc-800/80"
                title="Telegram Channel @metawhale2024"
              >
                <i className="fa-brands fa-telegram text-lg"></i>
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center space-x-2 space-x-reverse">
              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-1 space-x-reverse bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg">
                <button
                  onClick={() => setLang("fa")}
                  className={`px-1.5 py-0.5 rounded-md text-3xs font-bold transition-all ${
                    lang === "fa" ? "bg-amber-500 text-zinc-950" : "text-zinc-400"
                  }`}
                >
                  فا
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-1.5 py-0.5 rounded-md text-3xs font-bold transition-all ${
                    lang === "en" ? "bg-amber-500 text-zinc-950" : "text-zinc-400"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("ar")}
                  className={`px-1.5 py-0.5 rounded-md text-3xs font-bold transition-all ${
                    lang === "ar" ? "bg-amber-500 text-zinc-950" : "text-zinc-400"
                  }`}
                >
                  عرب
                </button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-zinc-900/80 transition-colors focus:outline-none"
              >
                <i className={`fa-solid ${mobileMenuOpen ? "fa-xmark" : "fa-bars"} text-lg`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-zinc-900 bg-zinc-950/95 backdrop-blur-lg overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full ${
                      t.dir === "rtl" ? "text-right" : "text-left"
                    } px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      activeSection === item.id
                        ? "text-amber-400 bg-zinc-900"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex items-center space-x-3 space-x-reverse pt-4 border-t border-zinc-900 px-4">
                  <a
                    href="https://t.me/HOLIVERSEIRAN1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 transition-all border border-zinc-800"
                  >
                    <i className="fa-brands fa-telegram text-lg ml-2 mr-2"></i> {lang === "fa" ? "کانال اصلی" : lang === "ar" ? "القناة الرئيسية" : "Main Telegram"}
                  </a>
                  <a
                    href="https://www.instagram.com/master.gold.iran"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 transition-all border border-zinc-800"
                  >
                    <i className="fa-brands fa-instagram text-lg ml-2 mr-2"></i> {lang === "fa" ? "اینستاگرام" : lang === "ar" ? "إنستغرام" : "Instagram"}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Sections Wrapper */}
      <main className="flex-grow z-10 relative">
        
        {/* Section 1: Hero */}
        <section
          id="hero"
          ref={sectionsRef.hero}
          className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        >
          <div className="max-w-5xl mx-auto text-center z-10 space-y-8">
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs sm:text-sm font-bold tracking-wider"
            >
              <i className="fa-solid fa-circle-check ml-2 mr-2 text-amber-500 animate-pulse"></i>
              {t.tagline}
            </motion.div>

            {/* Main Title heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7.5xl font-black tracking-tight text-white leading-tight sm:leading-none"
              >
                {t.heroTitle}
                <span className="block mt-3 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 font-extrabold text-3xl sm:text-5xl lg:text-6xl">
                  {t.heroSubtitle}
                </span>
              </motion.h1>

              {/* Slogan details */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-2xl text-amber-300 font-bold max-w-3xl mx-auto"
              >
                {t.slogan}
              </motion.p>
            </div>

            {/* Brief Introduction / Slogan description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-zinc-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed border-r-2 border-l-2 border-amber-500/30 px-6 py-2"
            >
              {lang === "fa" ? (
                <>
                  ما فرصت رو دوبار به کسی نمی‌دیم. <span className="text-amber-400 font-extrabold">معین علوی</span> هستم؛ موسس و خالق برند آموزشی مستر گولد ایران. مدرس، محقق، سرمایه‌گذار و کارآفرین بازارهای مالی غیرمتمرکز، استراتژیست و مشاور اکوسیستم‌های بین‌المللی متاوال، هالیورس و ویستوری در ایران.
                </>
              ) : lang === "ar" ? (
                <>
                  نحن لا نعطي فرصة ثانية لأي شخص. أنا <span className="text-amber-400 font-extrabold">معين علوي</span>؛ مؤسس ومبتكر العلامة التجارية التعليمية مستر غولد إيران. مدرس، باحث، مستثمر، ورائد أعمال في الأسواق المالية اللامركزية، واستراتيجي ومستشار للأنظمة البيئية الدولية ميتاوال، هاليفرس وفيستوري في إيران.
                </>
              ) : (
                <>
                  We do not give a second chance to anyone. I am <span className="text-amber-400 font-extrabold">Moein Alavi</span>, founder & creator of Master Gold Iran educational brand. Lecturer, researcher, investor, and digital entrepreneur in decentralized financial markets.
                </>
              )}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 flex items-center justify-center group cursor-pointer"
              >
                {t.ctaView}
                <i className={`fa-solid ${t.dir === "rtl" ? "fa-arrow-left mr-3" : "fa-arrow-right ml-3"} group-hover:-translate-x-1 transition-transform`}></i>
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700 transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                {t.ctaContact}
                <i className={`fa-solid fa-paper-plane ${t.dir === "rtl" ? "mr-3" : "ml-3"} text-amber-500`}></i>
              </button>
            </motion.div>

            {/* Anti Scam/Ponzi absolute disclaimer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest max-w-md mx-auto pt-4"
            >
              <span className="text-emerald-500 font-bold">● 100% Guaranteed</span>: Anti-Pyramid • Anti-Ponzi • Anti-Scam • Raising Awareness
            </motion.p>
          </div>

          {/* Abstract background grid element */}
          <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        </section>

        {/* Section 2: Services / Tops */}
        <section
          id="services"
          ref={sectionsRef.services}
          className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-zinc-950"
        >
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Header titles */}
            <div className="text-center">
              <h2 className="text-xs sm:text-sm font-semibold tracking-wider text-amber-500 uppercase mb-2">
                {t.area}
              </h2>
              <p className="text-3xl sm:text-5xl font-black text-white">
                {t.servicesTitle}
              </p>
              <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
                {t.servicesSubtitle}
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full" />
            </div>

            {/* Service Blocks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Item 1: Decentralized Markets */}
              <motion.div
                whileHover={{ y: -8, borderColor: "rgba(245, 158, 11, 0.4)" }}
                className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-8 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 text-amber-400 text-2xl">
                    <i className="fa-solid fa-chart-line"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t.service1Title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    {t.service1Desc}
                  </p>
                </div>
                <div
                  onClick={() => scrollToSection("projects")}
                  className="mt-8 pt-4 border-t border-zinc-800/50 flex items-center text-amber-400 text-xs font-semibold group cursor-pointer"
                >
                  {lang === "fa" ? "مشاهده نمونه کارها" : lang === "ar" ? "مشاهدة الأعمال" : "See Projects"}
                  <i className={`fa-solid ${t.dir === "rtl" ? "fa-chevron-left mr-2 group-hover:-translate-x-1" : "fa-chevron-right ml-2 group-hover:translate-x-1"} transition-transform`}></i>
                </div>
              </motion.div>

              {/* Item 2: Gold Market */}
              <motion.div
                whileHover={{ y: -8, borderColor: "rgba(245, 158, 11, 0.4)" }}
                className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-8 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 text-amber-400 text-2xl">
                    <i className="fa-solid fa-coins"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t.service2Title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">
                    {t.service2Desc}
                  </p>
                </div>
                <div
                  onClick={() => scrollToSection("contact")}
                  className="mt-8 pt-4 border-t border-zinc-800/50 flex items-center text-amber-400 text-xs font-semibold group cursor-pointer"
                >
                  {lang === "fa" ? "درخواست مشاوره نوسان‌گیری" : lang === "ar" ? "طلب استشارة المضاربة" : "Request Consultation"}
                  <i className={`fa-solid ${t.dir === "rtl" ? "fa-chevron-left mr-2 group-hover:-translate-x-1" : "fa-chevron-right ml-2 group-hover:translate-x-1"} transition-transform`}></i>
                </div>
              </motion.div>

              {/* Item 3: Trading */}
              <motion.div
                whileHover={{ y: -8, borderColor: "rgba(239, 68, 68, 0.2)" }}
                className="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between opacity-80"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 text-red-400 text-2xl">
                    <i className="fa-solid fa-circle-minus"></i>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse mb-4">
                    <h3 className="text-xl font-bold text-zinc-400">
                      {t.service3Title}
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-semibold">
                      {t.service3Status}
                    </span>
                  </div>
                  <p className="text-zinc-500 leading-relaxed text-sm">
                    {t.service3Desc}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-zinc-800/50 flex items-center text-zinc-500 text-xs font-semibold">
                  <span>{lang === "fa" ? "عدم پذیرش موقت" : lang === "ar" ? "مغلق مؤقتاً" : "Temporarily Closed"}</span>
                </div>
              </motion.div>

            </div>

            {/* Anti Pyramid highlight box */}
            <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 rounded-2xl p-6 sm:p-8 text-center max-w-4xl mx-auto space-y-4">
              <i className="fa-solid fa-shield-virus text-3xl text-amber-400"></i>
              <h4 className="text-lg font-bold text-white">
                {lang === "fa" ? "ضد هرمی، ضد پانزی و ضد اسکم" : lang === "ar" ? "ضد هرمية، ضد بونزي وضد الاحتيال" : "Anti-Pyramid, Anti-Ponzi & Anti-Scam"}
              </h4>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
                {lang === "fa" 
                  ? "برند مستر گولد ایران با پروژه‌های فاقد هرگونه تداخل مالی مرکزی کار می‌کند. تمامی سرمایه‌گذاری‌ها بر بستر اسمارت کانترکت‌ها و غیرمتمرکز هستند." 
                  : lang === "ar"
                  ? "تعمل العلامة التجارية مستر غولد إيران مع مشاريع خالية من أي تدخل مالي مركزي. جميع الاستثمارات مبنية على العقود الذكية ولامركزية."
                  : "Master Gold Iran works strictly with decentralized non-custodial tools on secure public chains. Your asset is safe, managed only by yourself."}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: About Me */}
        <section
          id="about"
          ref={sectionsRef.about}
          className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-zinc-900/20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Profile Bio details */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-amber-500 uppercase">
                  {t.aboutSubtitle}
                </span>
                <h3 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  {t.aboutTitle}
                </h3>
                <h4 className="text-lg sm:text-xl font-bold text-amber-400">
                  {t.aboutIntro}
                </h4>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed text-justify">
                  {t.aboutText}
                </p>

                {/* Sagas and credentials */}
                <div className="space-y-3 pt-4">
                  <h5 className="text-white font-extrabold text-sm border-r-2 border-amber-500 pr-3 pl-3">
                    {t.specsTitle}
                  </h5>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-400 list-none pr-0">
                    <li className="flex items-start">
                      <i className={`fa-solid fa-check text-amber-400 ${t.dir === "rtl" ? "ml-2.5 mt-1" : "mr-2.5 mt-1"}`}></i>
                      <span>{t.spec1}</span>
                    </li>
                    <li className="flex items-start">
                      <i className={`fa-solid fa-check text-amber-400 ${t.dir === "rtl" ? "ml-2.5 mt-1" : "mr-2.5 mt-1"}`}></i>
                      <span>{t.spec2}</span>
                    </li>
                    <li className="flex items-start">
                      <i className={`fa-solid fa-check text-amber-400 ${t.dir === "rtl" ? "ml-2.5 mt-1" : "mr-2.5 mt-1"}`}></i>
                      <span>{t.spec3}</span>
                    </li>
                    <li className="flex items-start">
                      <i className={`fa-solid fa-check text-amber-400 ${t.dir === "rtl" ? "ml-2.5 mt-1" : "mr-2.5 mt-1"}`}></i>
                      <span>{t.spec4}</span>
                    </li>
                  </ul>
                </div>

                {/* Stat Grid with Moein Alavi credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                  <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-1">
                      +411
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {t.statsLabel1}
                    </div>
                  </div>
                  <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-1">
                      +4,000
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {t.statsLabel2}
                    </div>
                  </div>
                  <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-1">
                      +300
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {t.statsLabel3}
                    </div>
                  </div>
                </div>

              </div>

              {/* Decorative Visual Card representing Master Gold Iran */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm aspect-square bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-3xl p-0.5 border border-amber-500/30 overflow-hidden shadow-2xl shadow-amber-500/5 group">
                  <div className="absolute inset-0 bg-zinc-950 rounded-[22px] p-6 flex flex-col justify-between overflow-hidden">
                    {/* Glowing grid line */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.05)_1px,transparent_1px)] bg-[size:14px_24px]" />
                    
                    <div className="flex justify-between items-start z-10">
                      <div>
                        <p className="text-2xs font-semibold text-zinc-500">MEMBER ID</p>
                        <p className="text-xs font-mono text-amber-400">ALAVI-M-GOLD-2021</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
                        <i className="fa-solid fa-crown animate-bounce"></i>
                      </div>
                    </div>

                    <div className="space-y-4 z-10">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                        <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                          Active Web3 Mentor
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-black text-white leading-tight">
                        {lang === "fa" ? "برند مستقل فقرزدایی در ایران" : lang === "ar" ? "العلامة التجارية المستقلة للقضاء على الفقر في إيران" : "Independent Poverty Alleviation Brand in Iran"}
                      </h4>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 4: Projects */}
        <section
          id="projects"
          ref={sectionsRef.projects}
          className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-zinc-950/40"
        >
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Header titles */}
            <div className="text-center">
              <h2 className="text-xs sm:text-sm font-semibold tracking-wider text-amber-500 uppercase mb-2">
                {lang === "fa" ? "سکوهای سودآور و پایدار جهانی" : lang === "ar" ? "منصات عالمية مربحة ومستقرة" : "Stable Worldwide Platforms"}
              </h2>
              <p className="text-3xl sm:text-5xl font-black text-white">
                {t.projectsTitle}
              </p>
              <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
                {t.projectsSubtitle}
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full" />
            </div>


            {/* List of projects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Project 1: MetaWhale */}
              <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="h-48 bg-zinc-900 flex items-center justify-center border-b border-zinc-800/80 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60 z-10" />
                    <i className="fa-solid fa-cloud-arrow-up text-6xl text-amber-500/20 group-hover:scale-110 transition-transform duration-300 z-0"></i>
                    <div className={`absolute top-4 ${t.dir === "rtl" ? "right-4" : "left-4"} bg-zinc-950/80 border border-zinc-800 text-amber-400 text-[10px] px-3 py-1 rounded-full font-semibold z-20`}>
                      {t.project1Tag}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {t.project1Title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed text-justify">
                      {t.project1Desc}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href="https://app.tactics-strategy.com/r/lcwsep7uLE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-amber-400 hover:text-zinc-950 border border-zinc-800 hover:border-amber-400 text-zinc-300 text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    <span>{t.viewProjectBtn}</span>
                    <i className="fa-solid fa-up-right-from-square text-2xs"></i>
                  </a>
                </div>
              </div>

              {/* Project 2: Vistory */}
              <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="h-48 bg-zinc-900 flex items-center justify-center border-b border-zinc-800/80 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60 z-10" />
                    <i className="fa-solid fa-circle-nodes text-6xl text-orange-500/20 group-hover:scale-110 transition-transform duration-300 z-0"></i>
                    <div className={`absolute top-4 ${t.dir === "rtl" ? "right-4" : "left-4"} bg-zinc-950/80 border border-zinc-800 text-amber-400 text-[10px] px-3 py-1 rounded-full font-semibold z-20`}>
                      {t.project2Tag}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {t.project2Title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed text-justify">
                      {t.project2Desc}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href="https://app.v-boost.top/sso/signin?ref=16528"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-amber-400 hover:text-zinc-950 border border-zinc-800 hover:border-amber-400 text-zinc-300 text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    <span>{t.viewProjectBtn}</span>
                    <i className="fa-solid fa-up-right-from-square text-2xs"></i>
                  </a>
                </div>
              </div>

              {/* Project 3: Holiverse */}
              <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="h-48 bg-zinc-900 flex items-center justify-center border-b border-zinc-800/80 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60 z-10" />
                    <i className="fa-solid fa-globe text-6xl text-amber-500/20 group-hover:scale-110 transition-transform duration-300 z-0"></i>
                    <div className={`absolute top-4 ${t.dir === "rtl" ? "right-4" : "left-4"} bg-zinc-950/80 border border-zinc-800 text-amber-400 text-[10px] px-3 py-1 rounded-full font-semibold z-20`}>
                      {t.project3Tag}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {t.project3Title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed text-justify">
                      {t.project3Desc}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href="https://t.me/HOLIVERSEIRAN1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-amber-400 hover:text-zinc-950 border border-zinc-800 hover:border-amber-400 text-zinc-300 text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    <span>{lang === "fa" ? "عضویت در کانال هالیورس" : lang === "ar" ? "انضم إلى قناة هاليفرس" : "Join Holiverse Channel"}</span>
                    <i className="fa-brands fa-telegram text-xs"></i>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Section 5: Testimonials */}
        <section
          id="testimonials"
          ref={sectionsRef.testimonials}
          className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-zinc-900/20"
        >
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Header titles */}
            <div className="text-center">
              <h2 className="text-xs sm:text-sm font-semibold tracking-wider text-amber-500 uppercase mb-2">
                {lang === "fa" ? "نتایج واقعی از کارآفرینی ما" : lang === "ar" ? "نتائج واقعية لريادتنا" : "Real Poverty Alleviation Outlets"}
              </h2>
              <p className="text-3xl sm:text-5xl font-black text-white">
                {t.testTitle}
              </p>
              <p className="text-zinc-400 text-sm sm:text-base mt-2">
                {t.testSubtitle}
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full" />
            </div>

            {/* Carousel Active Card Display */}
            <div className="relative bg-zinc-900/40 border border-zinc-800 p-8 sm:p-12 rounded-3xl min-h-[250px] flex flex-col justify-between">
              
              {/* Double quotes icon overlay */}
              <div className={`absolute top-6 ${t.dir === "rtl" ? "right-6" : "left-6"} text-6xl text-amber-500/10 font-serif`}>
                ”
              </div>

              {/* Dynamic Slideshow */}
              <div className="space-y-6">
                <p className="text-base sm:text-lg text-zinc-200 leading-relaxed italic text-justify">
                  « {testimonialIndex === 0 ? t.test1Text : testimonialIndex === 1 ? t.test2Text : t.test3Text} »
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-zinc-950 font-black text-base border border-amber-500/30">
                    {testimonialIndex === 0 ? "RS" : testimonialIndex === 1 ? "MA" : "AF"}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm sm:text-base">
                      {testimonialIndex === 0 ? t.test1Name : testimonialIndex === 1 ? t.test2Name : t.test3Name}
                    </h4>
                    <p className="text-xs text-amber-400 font-semibold">
                      {testimonialIndex === 0 ? t.test1Role : testimonialIndex === 1 ? t.test2Role : t.test3Role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Slider Controls Indicators */}
              <div className="flex justify-end space-x-2 space-x-reverse mt-8 border-t border-zinc-800/60 pt-4">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setTestimonialIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      testimonialIndex === idx ? "bg-amber-400 w-8" : "bg-zinc-700 hover:bg-zinc-600"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Section 6: FAQ */}
        <section
          id="faq"
          ref={sectionsRef.faq}
          className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-zinc-950"
        >
          <div className="max-w-3xl mx-auto space-y-16">
            
            {/* Header titles */}
            <div className="text-center">
              <h2 className="text-xs sm:text-sm font-semibold tracking-wider text-amber-500 uppercase mb-2">
                {lang === "fa" ? "شفافیت و پاسخ به ابهامات" : lang === "ar" ? "الشفافية والإجابة على الأسئلة" : "Clarity & Decisive Answers"}
              </h2>
              <p className="text-3xl sm:text-5xl font-black text-white">
                {t.faqTitle}
              </p>
              <p className="text-zinc-400 text-sm sm:text-base mt-2">
                {t.faqSubtitle}
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full" />
            </div>

            {/* Accordion Questions List */}
            <div className="space-y-4">
              
              {/* Question 1 */}
              <div className="border border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-900/20 hover:border-zinc-700/80 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                  className="w-full flex items-center justify-between p-6 text-right focus:outline-none focus:ring-0"
                >
                  <span className={`text-base sm:text-lg font-bold text-white ${t.dir === "rtl" ? "text-right" : "text-left"}`}>
                    {t.faq1Q}
                  </span>
                  <span className={`${t.dir === "rtl" ? "mr-2" : "ml-2"} flex-shrink-0 w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400`}>
                    <i className={`fa-solid ${openFaq === 0 ? "fa-minus" : "fa-plus"} text-sm text-amber-400`}></i>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 border-t border-zinc-900/50 text-zinc-400 text-sm sm:text-base leading-relaxed text-justify">
                        {t.faq1A}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Question 2 */}
              <div className="border border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-900/20 hover:border-zinc-700/80 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                  className="w-full flex items-center justify-between p-6 text-right focus:outline-none focus:ring-0"
                >
                  <span className={`text-base sm:text-lg font-bold text-white ${t.dir === "rtl" ? "text-right" : "text-left"}`}>
                    {t.faq2Q}
                  </span>
                  <span className={`${t.dir === "rtl" ? "mr-2" : "ml-2"} flex-shrink-0 w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400`}>
                    <i className={`fa-solid ${openFaq === 1 ? "fa-minus" : "fa-plus"} text-sm text-amber-400`}></i>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 border-t border-zinc-900/50 text-zinc-400 text-sm sm:text-base leading-relaxed text-justify">
                        {t.faq2A}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Question 3 */}
              <div className="border border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-900/20 hover:border-zinc-700/80 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                  className="w-full flex items-center justify-between p-6 text-right focus:outline-none focus:ring-0"
                >
                  <span className={`text-base sm:text-lg font-bold text-white ${t.dir === "rtl" ? "text-right" : "text-left"}`}>
                    {t.faq3Q}
                  </span>
                  <span className={`${t.dir === "rtl" ? "mr-2" : "ml-2"} flex-shrink-0 w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400`}>
                    <i className={`fa-solid ${openFaq === 2 ? "fa-minus" : "fa-plus"} text-sm text-amber-400`}></i>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === 2 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 border-t border-zinc-900/50 text-zinc-400 text-sm sm:text-base leading-relaxed text-justify">
                        {t.faq3A}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>

        {/* Section 7: Contact Info & Form */}
        <section
          id="contact"
          ref={sectionsRef.contact}
          className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-zinc-900/20"
        >
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Header titles */}
            <div className="text-center">
              <h2 className="text-xs sm:text-sm font-semibold tracking-wider text-amber-500 uppercase mb-2">
                {lang === "fa" ? "قدم اول را استوار بردارید" : lang === "ar" ? "اتخذ خطوتك الأولى بثبات" : "Establish Your Future Setup Today"}
              </h2>
              <p className="text-3xl sm:text-5xl font-black text-white">
                {t.contactTitle}
              </p>
              <p className="text-zinc-400 text-sm sm:text-base mt-2">
                {t.contactSubtitle}
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full" />
            </div>

            {/* Layout grid columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Contact direct details */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    {t.contactIntroTitle}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {t.contactIntroDesc}
                  </p>
                </div>

                <div className="space-y-6">
                  
                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-lg flex-shrink-0">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <div className={t.dir === "rtl" ? "mr-4" : "ml-4"}>
                      <p className="text-2xs text-zinc-500 uppercase font-mono">{t.phoneLabel}</p>
                      <a href="tel:09038354826" className="text-base sm:text-lg text-white font-bold hover:text-amber-400 transition-colors">
                        09038354826
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 text-lg flex-shrink-0">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className={t.dir === "rtl" ? "mr-4" : "ml-4"}>
                      <p className="text-2xs text-zinc-500 uppercase font-mono">{t.emailLabel}</p>
                      <a href="mailto:King.mastergold2024@gmail.com" className="text-base sm:text-lg text-white font-bold hover:text-amber-400 transition-colors">
                        King.mastergold2024@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-lg flex-shrink-0">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div className={t.dir === "rtl" ? "mr-4" : "ml-4"}>
                      <p className="text-2xs text-zinc-500 uppercase font-mono">{t.addressLabel}</p>
                      <p className="text-base sm:text-lg text-white font-bold">
                        {t.addressVal}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Social links */}
                <div className="pt-6 border-t border-zinc-800 space-y-4">
                  <p className="text-sm font-bold text-white">
                    {t.socialTitle}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://t.me/HOLIVERSEIRAN1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/30 text-zinc-300 hover:text-amber-400 transition-all flex items-center text-xs font-bold"
                    >
                      <i className="fa-brands fa-telegram text-base ml-2 mr-2"></i> {t.telegramLabel}
                    </a>
                    <a
                      href="https://www.instagram.com/master.gold.iran"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/30 text-zinc-300 hover:text-amber-400 transition-all flex items-center text-xs font-bold"
                    >
                      <i className="fa-brands fa-instagram text-base ml-2 mr-2"></i> {t.instagramLabel}
                    </a>
                  </div>
                </div>

              </div>

              {/* Message submit form */}
              <div className="lg:col-span-7">
                <form
                  onSubmit={handleContactSubmit}
                  className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-3xl space-y-6 relative overflow-hidden"
                >
                  <h3 className="text-xl font-bold text-white">
                    {t.formTitle}
                  </h3>

                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-2xs font-semibold text-zinc-400">
                      {t.formName}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === "fa" ? "نام شما..." : "Your name..."}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:border-amber-500/50 focus:outline-none transition-colors text-sm"
                    />
                  </div>

                  {/* Messaging Platform Selection */}
                  <div className="space-y-3">
                    <label className="block text-2xs font-semibold text-zinc-400">
                      {lang === "fa" ? "انتخاب پیام‌رسان جهت گفتگوی مستقیم" : "Choose Messenger for Direct Message"}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {/* WhatsApp */}
                      <button
                        type="button"
                        onClick={() => setContactPlatform("whatsapp")}
                        className={`py-3 px-2 sm:px-4 rounded-xl border flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-bold transition-all ${
                          contactPlatform === "whatsapp"
                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/5"
                            : "bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                        }`}
                      >
                        <i className="fa-brands fa-whatsapp text-lg text-emerald-500"></i>
                        <span>{lang === "fa" ? "واتس‌اپ" : "WhatsApp"}</span>
                      </button>

                      {/* Telegram */}
                      <button
                        type="button"
                        onClick={() => setContactPlatform("telegram")}
                        className={`py-3 px-2 sm:px-4 rounded-xl border flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-bold transition-all ${
                          contactPlatform === "telegram"
                            ? "bg-sky-500/10 border-sky-500 text-sky-400 shadow-md shadow-sky-500/5"
                            : "bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                        }`}
                      >
                        <i className="fa-brands fa-telegram text-lg text-sky-400"></i>
                        <span>{lang === "fa" ? "تلگرام" : "Telegram"}</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-2xs font-semibold text-zinc-400">
                      {t.formMessage}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.placeholderMessage}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:border-amber-500/50 focus:outline-none transition-colors text-sm resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-bold text-zinc-950 hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-55 cursor-pointer text-sm sm:text-base ${
                      contactPlatform === "whatsapp"
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-emerald-500/20"
                        : "bg-gradient-to-r from-sky-500 to-sky-600 hover:shadow-sky-500/20"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fa-solid fa-spinner animate-spin ml-2 mr-2"></i> {t.sending}
                      </>
                    ) : (
                      <>
                        <span>
                          {lang === "fa"
                            ? `ارسال پیام مستقیم در ${
                                contactPlatform === "whatsapp"
                                  ? "واتس‌اپ"
                                  : "تلگرام"
                              }`
                            : lang === "ar"
                            ? `إرسال رسالة مباشرة عبر ${
                                contactPlatform === "whatsapp"
                                  ? "واتساب"
                                  : "تلغرام"
                              }`
                            : `Send Direct Message on ${
                                contactPlatform === "whatsapp"
                                  ? "WhatsApp"
                                  : "Telegram"
                              }`}
                        </span>
                        <i className={`fa-solid ${
                          contactPlatform === "whatsapp"
                            ? "fa-whatsapp"
                            : "fa-telegram"
                        } ${t.dir === "rtl" ? "mr-2" : "ml-2"} text-lg`}></i>
                      </>
                    )}
                  </button>

                  {/* Feedback Modal Panel */}
                  <AnimatePresence>
                    {submitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="absolute inset-0 bg-zinc-950/95 flex flex-col items-center justify-center p-6 text-center z-10 animate-fade-in"
                      >
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-2xl mb-4">
                          <i className="fa-solid fa-circle-check"></i>
                        </div>
                        <h4 className="text-xl font-black text-white mb-2">
                          {t.successTitle}
                        </h4>
                        <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
                          {t.successText}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </form>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-4 sm:px-6 lg:px-8 z-10 text-center relative">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
              {t.brand}
            </span>
          </div>
          <p className="text-zinc-500 text-sm max-w-md mx-auto leading-relaxed">
            {t.brand}: {t.slogan}
          </p>
          <div className="w-12 h-px bg-zinc-800 mx-auto" />
          <p className="text-zinc-600 text-xs font-mono">
            © {new Date().getFullYear()} {t.brand}. {t.allRights}
          </p>
        </div>
      </footer>

    </div>
  );
}
