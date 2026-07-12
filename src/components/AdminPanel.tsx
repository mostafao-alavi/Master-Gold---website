import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TranslationSet {
  dir: string;
  brand: string;
  slogan: string;
  area: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaView: string;
  ctaContact: string;

  // Services
  servicesTitle: string;
  servicesSubtitle: string;
  service1Title: string;
  service1Desc: string;
  service2Title: string;
  service2Desc: string;
  service3Title: string;
  service3Desc: string;
  service3Status: string;

  // About Me
  aboutTitle: string;
  aboutSubtitle: string;
  aboutIntro: string;
  aboutText: string;
  statsLabel1: string;
  statsLabel2: string;
  statsLabel3: string;
  specsTitle: string;
  spec1: string;
  spec2: string;
  spec3: string;
  spec4: string;

  // Projects
  projectsTitle: string;
  projectsSubtitle: string;
  project1Tag: string;
  project1Title: string;
  project1Desc: string;
  project2Tag: string;
  project2Title: string;
  project2Desc: string;
  project3Tag: string;
  project3Title: string;
  project3Desc: string;
  viewProjectBtn: string;

  // Testimonials
  testTitle: string;
  testSubtitle: string;
  test1Text: string;
  test1Name: string;
  test1Role: string;
  test2Text: string;
  test2Name: string;
  test2Role: string;
  test3Text: string;
  test3Name: string;
  test3Role: string;

  // FAQ
  faqTitle: string;
  faqSubtitle: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
  faq3Q: string;
  faq3A: string;

  // Contact
  contactTitle: string;
  contactSubtitle: string;
  contactIntroTitle: string;
  contactIntroDesc: string;
  phoneLabel: string;
  emailLabel: string;
  addressLabel: string;
  addressVal: string;
  socialTitle: string;
  telegramLabel: string;
  rubikaLabel: string;
  formTitle: string;
  formName: string;
  formEmail: string;
  formMessage: string;
  placeholderMessage: string;
  btnSubmit: string;
  sending: string;
  successTitle: string;
  successText: string;
  allRights: string;
}

interface AllTranslations {
  fa: TranslationSet;
  en: TranslationSet;
  ar: TranslationSet;
}

interface AdminPanelProps {
  initialTranslations: AllTranslations;
  onSave: (updated: AllTranslations) => void;
  onClose: () => void;
  onReset: () => void;
}

export default function AdminPanel({
  initialTranslations,
  onSave,
  onClose,
  onReset,
}: AdminPanelProps) {
  // Session authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("admin_logged_in") === "true";
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Editing state
  const [localTranslations, setLocalTranslations] = useState<AllTranslations>(() => {
    // Clone to prevent direct mutation before clicking save
    return JSON.parse(JSON.stringify(initialTranslations));
  });

  const [activeLang, setActiveLang] = useState<"fa" | "en" | "ar">("fa");
  const [activeSection, setActiveSection] = useState<string>("branding");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Authentication check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === "alavi" && password === "h dcsc9sg@DDk") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_logged_in", "true");
      setLoginError("");
    } else {
      setLoginError("نام کاربری یا رمز عبور اشتباه است.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_logged_in");
  };

  // Field change helper
  const handleFieldChange = (key: keyof TranslationSet, value: string) => {
    setLocalTranslations((prev) => {
      const updated = { ...prev };
      updated[activeLang] = {
        ...updated[activeLang],
        [key]: value,
      };
      return updated;
    });
  };

  // Submit and save handler
  const handleSave = () => {
    onSave(localTranslations);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  // Trigger default reset
  const handleResetToDefaults = () => {
    if (confirm("آیا از بازگرداندن کلیه متن‌ها به حالت اولیه اطمینان دارید؟")) {
      onReset();
      // Wait a moment then refresh local state from initial
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  // Translation field groupings for clean mobile management
  const fieldGroups = {
    branding: {
      title: "برندینگ و اطلاعات پایه",
      icon: "fa-sliders",
      fields: [
        { key: "brand" as const, label: "نام برند / لوگو", type: "input" },
        { key: "slogan" as const, label: "شعار اصلی بالای صفحه", type: "textarea" },
        { key: "area" as const, label: "حوزه فعالیت و تخصص‌ها", type: "textarea" },
        { key: "tagline" as const, label: "جمله تاکیدی (۱۰۰٪ رایگان)", type: "textarea" },
      ],
    },
    hero: {
      title: "بخش هیرو (مقدمه بالای صفحه)",
      icon: "fa-circle-user",
      fields: [
        { key: "heroTitle" as const, label: "عنوان خوش‌آمدگویی بزرگ", type: "input" },
        { key: "heroSubtitle" as const, label: "زیرعنوان هیرو (رسالت ما)", type: "input" },
        { key: "ctaView" as const, label: "متن دکمه پروژه‌ها", type: "input" },
        { key: "ctaContact" as const, label: "متن دکمه ارتباط مستقیم", type: "input" },
      ],
    },
    services: {
      title: "بخش خدمات و تخصص‌ها",
      icon: "fa-briefcase",
      fields: [
        { key: "servicesTitle" as const, label: "عنوان بخش خدمات", type: "input" },
        { key: "servicesSubtitle" as const, label: "توضیح کوتاه بخش خدمات", type: "input" },
        { key: "service1Title" as const, label: "عنوان خدمت اول (بازارهای غیرمتمرکز)", type: "input" },
        { key: "service1Desc" as const, label: "توضیحات خدمت اول", type: "textarea" },
        { key: "service2Title" as const, label: "عنوان خدمت دوم (بازار طلا)", type: "input" },
        { key: "service2Desc" as const, label: "توضیحات خدمت دوم", type: "textarea" },
        { key: "service3Title" as const, label: "عنوان خدمت سوم (ترید و معاملات)", type: "input" },
        { key: "service3Desc" as const, label: "توضیحات خدمت سوم", type: "textarea" },
        { key: "service3Status" as const, label: "وضعیت خدمت سوم (مثلا: فعال)", type: "input" },
      ],
    },
    about: {
      title: "بخش درباره من و آمارها",
      icon: "fa-address-card",
      fields: [
        { key: "aboutTitle" as const, label: "عنوان بخش درباره من", type: "input" },
        { key: "aboutSubtitle" as const, label: "زیرعنوان درباره من", type: "input" },
        { key: "aboutIntro" as const, label: "متن معرفی اولیه درباره من", type: "input" },
        { key: "aboutText" as const, label: "متن بیوگرافی و توضیحات اصلی", type: "textarea" },
        { key: "statsLabel1" as const, label: "متن آمار ۱ (وبینار آموزشی)", type: "input" },
        { key: "statsLabel2" as const, label: "متن آمار ۲ (دانشجو تحت آموزش)", type: "input" },
        { key: "statsLabel3" as const, label: "متن آمار ۳ (سال فعالیت)", type: "input" },
        { key: "specsTitle" as const, label: "عنوان تخصص‌های برجسته", type: "input" },
        { key: "spec1" as const, label: "سابقه / تخصص اول", type: "textarea" },
        { key: "spec2" as const, label: "سابقه / تخصص دوم", type: "textarea" },
        { key: "spec3" as const, label: "سابقه / تخصص سوم", type: "textarea" },
        { key: "spec4" as const, label: "سابقه / تخصص چهارم", type: "textarea" },
      ],
    },
    projects: {
      title: "بخش پروژه‌های برجسته",
      icon: "fa-rocket",
      fields: [
        { key: "projectsTitle" as const, label: "عنوان بخش پروژه‌ها", type: "input" },
        { key: "projectsSubtitle" as const, label: "توضیح کوتاه بخش پروژه‌ها", type: "input" },
        { key: "viewProjectBtn" as const, label: "متن دکمه ثبت‌نام و ورود", type: "input" },
        { key: "project1Tag" as const, label: "تگ پروژه اول", type: "input" },
        { key: "project1Title" as const, label: "عنوان پروژه اول (متاوال)", type: "input" },
        { key: "project1Desc" as const, label: "توضیحات پروژه اول", type: "textarea" },
        { key: "project2Tag" as const, label: "تگ پروژه دوم", type: "input" },
        { key: "project2Title" as const, label: "عنوان پروژه دوم (ویستوری)", type: "input" },
        { key: "project2Desc" as const, label: "توضیحات پروژه دوم", type: "textarea" },
        { key: "project3Tag" as const, label: "تگ پروژه سوم", type: "input" },
        { key: "project3Title" as const, label: "عنوان پروژه سوم (هالیورس)", type: "input" },
        { key: "project3Desc" as const, label: "توضیحات پروژه سوم", type: "textarea" },
      ],
    },
    testimonials: {
      title: "بخش نظرات دانشجویان",
      icon: "fa-comments",
      fields: [
        { key: "testTitle" as const, label: "عنوان بخش نظرات", type: "input" },
        { key: "testSubtitle" as const, label: "توضیح کوتاه بخش نظرات", type: "input" },
        { key: "test1Name" as const, label: "نام دانشجو ۱", type: "input" },
        { key: "test1Role" as const, label: "نقش / تخصص دانشجو ۱", type: "input" },
        { key: "test1Text" as const, label: "متن نظر دانشجو ۱", type: "textarea" },
        { key: "test2Name" as const, label: "نام دانشجو ۲", type: "input" },
        { key: "test2Role" as const, label: "نقش / تخصص دانشجو ۲", type: "input" },
        { key: "test2Text" as const, label: "متن نظر دانشجو ۲", type: "textarea" },
        { key: "test3Name" as const, label: "نام دانشجو ۳", type: "input" },
        { key: "test3Role" as const, label: "نقش / تخصص دانشجو ۳", type: "input" },
        { key: "test3Text" as const, label: "متن نظر دانشجو ۳", type: "textarea" },
      ],
    },
    faq: {
      title: "بخش سؤالات متداول",
      icon: "fa-circle-question",
      fields: [
        { key: "faqTitle" as const, label: "عنوان بخش سؤالات متداول", type: "input" },
        { key: "faqSubtitle" as const, label: "توضیح بخش سؤالات متداول", type: "input" },
        { key: "faq1Q" as const, label: "سؤال اول", type: "textarea" },
        { key: "faq1A" as const, label: "پاسخ سؤال اول", type: "textarea" },
        { key: "faq2Q" as const, label: "سؤال دوم", type: "textarea" },
        { key: "faq2A" as const, label: "پاسخ سؤال دوم", type: "textarea" },
        { key: "faq3Q" as const, label: "سؤال سوم", type: "textarea" },
        { key: "faq3A" as const, label: "پاسخ سؤال سوم (آمارهای طلایی در این بخش قرار دارد)", type: "textarea" },
      ],
    },
    contact: {
      title: "بخش تماس با ما و فرم پیام",
      icon: "fa-envelope",
      fields: [
        { key: "contactTitle" as const, label: "عنوان بخش تماس", type: "input" },
        { key: "contactSubtitle" as const, label: "زیرعنوان بخش تماس", type: "input" },
        { key: "contactIntroTitle" as const, label: "عنوان کارت ارتباط با معین علوی", type: "input" },
        { key: "contactIntroDesc" as const, label: "توضیحات کارت ارتباط", type: "textarea" },
        { key: "phoneLabel" as const, label: "برچسب تلفن", type: "input" },
        { key: "emailLabel" as const, label: "برچسب ایمیل", type: "input" },
        { key: "addressLabel" as const, label: "برچسب آدرس", type: "input" },
        { key: "addressVal" as const, label: "مقدار آدرس", type: "input" },
        { key: "socialTitle" as const, label: "عنوان شبکه‌های اجتماعی ادمین", type: "input" },
        { key: "telegramLabel" as const, label: "عنوان کانال تلگرام رسمی", type: "input" },
        { key: "rubikaLabel" as const, label: "عنوان کانال روبیکا رسمی", type: "input" },
        { key: "formTitle" as const, label: "عنوان فرم ارسال پیام مستقیم", type: "input" },
        { key: "formName" as const, label: "برچسب نام فیلد در فرم", type: "input" },
        { key: "formEmail" as const, label: "برچسب ایمیل فیلد در فرم", type: "input" },
        { key: "formMessage" as const, label: "برچسب پیام فیلد در فرم", type: "input" },
        { key: "placeholderMessage" as const, label: "متن راهنمای داخل فیلد پیام", type: "input" },
        { key: "btnSubmit" as const, label: "متن دکمه ارسال پیام مستقیم", type: "input" },
        { key: "sending" as const, label: "متن دکمه در حال ارسال پیام", type: "input" },
        { key: "successTitle" as const, label: "عنوان پیام موفقیت ارسال", type: "input" },
        { key: "successText" as const, label: "متن کامل پیام موفقیت ارسال", type: "textarea" },
        { key: "allRights" as const, label: "متن کپی‌رایت انتهای سایت (فوتر)", type: "textarea" },
      ],
    },
  };

  // Render Login state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans select-none relative overflow-hidden text-right" dir="rtl">
        {/* Absolute Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-500/10 blur-[100px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-zinc-900/60 border border-zinc-800 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-2xl relative z-10"
        >
          {/* Logo and Headings */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-user-shield text-2xl text-amber-500"></i>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">ورود به پنل مدیریت</h1>
            <p className="text-xs text-zinc-400 mt-2 font-medium">پلتفرم مدیریت محتوای اختصاصی مستر گولد ایران</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {loginError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center"
              >
                {loginError}
              </motion.div>
            )}

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">نام کاربری ادمین</label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="مثال: alavi"
                  className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-all pl-10 text-left"
                  required
                />
                <i className="fa-solid fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm"></i>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2">رمز عبور اختصاصی</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-all pl-10 text-left"
                  required
                />
                <i className="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm"></i>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold rounded-xl shadow-lg shadow-amber-500/10 transition-all hover:scale-[1.02] active:scale-[0.98] text-sm cursor-pointer"
            >
              ورود به پنل کاربری ادمین
            </button>
          </form>

          {/* Quick Return Option */}
          <div className="mt-6 pt-6 border-t border-zinc-800/60 text-center">
            <button
              onClick={onClose}
              className="text-xs font-bold text-zinc-400 hover:text-amber-400 transition-colors flex items-center justify-center gap-1.5 mx-auto"
            >
              <i className="fa-solid fa-arrow-right-long"></i>
              بازگشت به صفحه اصلی وب‌سایت
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Active group content helper
  const currentGroup = fieldGroups[activeSection as keyof typeof fieldGroups];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans text-right select-none pb-24" dir="rtl">
      {/* Premium Header */}
      <header className="sticky top-0 z-30 bg-zinc-900/80 border-b border-zinc-800/80 backdrop-blur-md px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <i className="fa-solid fa-crown text-amber-500 text-lg"></i>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-white">مدیریت محتوای سایت</h1>
              <p className="text-[10px] text-zinc-400 font-medium">مستقیم، ساده و بدون نیاز به برنامه‌نویسی</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-house"></i>
              <span className="hidden sm:inline">مشاهده سایت</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs font-bold text-red-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <span className="hidden sm:inline">خروج</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-6">
        {/* Language Tabs - Critical for trilingual content edits */}
        <div className="bg-zinc-900/40 p-1.5 rounded-2xl border border-zinc-900 flex items-center justify-between mb-6">
          <div className="text-xs font-black text-zinc-400 mr-2">
            زبان فعال جهت ویرایش:
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveLang("fa")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeLang === "fa"
                  ? "bg-amber-500 text-zinc-950 font-black shadow-lg shadow-amber-500/10"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              فارسی (FA)
            </button>
            <button
              onClick={() => setActiveLang("en")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeLang === "en"
                  ? "bg-amber-500 text-zinc-950 font-black shadow-lg shadow-amber-500/10"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              English (EN)
            </button>
            <button
              onClick={() => setActiveLang("ar")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeLang === "ar"
                  ? "bg-amber-500 text-zinc-950 font-black shadow-lg shadow-amber-500/10"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              العربية (AR)
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Section List (Mobile-First Priority) */}
        <div className="mb-6 overflow-x-auto no-scrollbar py-1">
          <div className="flex space-x-2 space-x-reverse min-w-max">
            {Object.entries(fieldGroups).map(([id, group]) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  activeSection === id
                    ? "bg-zinc-900 border-amber-500/40 text-amber-400"
                    : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <i className={`fa-solid ${group.icon} text-sm`}></i>
                {group.title}
              </button>
            ))}
          </div>
        </div>

        {/* Form area for selected section */}
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-3xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-900">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
              <i className={`fa-solid ${currentGroup.icon} text-base`}></i>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">{currentGroup.title}</h2>
              <p className="text-[10px] text-zinc-400 font-medium">ویرایش متن‌های این بخش برای زبان انتخابی</p>
            </div>
          </div>

          <div className="space-y-6">
            {currentGroup.fields.map((field) => {
              const val = localTranslations[activeLang][field.key] || "";
              return (
                <div key={field.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs sm:text-sm font-bold text-zinc-300">
                      {field.label}
                    </label>
                    <span className="text-[9px] font-mono text-zinc-500 select-none bg-zinc-950 px-2 py-0.5 rounded-md">
                      {field.key}
                    </span>
                  </div>

                  {field.type === "input" ? (
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800/80 focus:border-amber-500 rounded-xl px-4 py-3 text-sm sm:text-base text-white focus:outline-none transition-all"
                    />
                  ) : (
                    <textarea
                      value={val}
                      rows={field.key === "aboutText" ? 6 : field.key === "faq3A" ? 5 : 3}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800/80 focus:border-amber-500 rounded-xl px-4 py-3 text-sm sm:text-base text-white focus:outline-none transition-all leading-relaxed resize-y"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Save Controls Container */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleSave}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black rounded-2xl shadow-xl shadow-amber-500/5 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
          >
            <i className="fa-solid fa-floppy-disk text-base"></i>
            ذخیره و انتشار تغییرات
          </button>

          <button
            onClick={handleResetToDefaults}
            className="w-full py-4 bg-zinc-900 hover:bg-zinc-850 text-red-400 hover:text-red-300 border border-zinc-800/80 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <i className="fa-solid fa-trash-can"></i>
            پاک کردن کل تغییرات و ریست کلی
          </button>
        </div>

        {/* Floating Success Alert Toast */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 bg-zinc-900 border-2 border-emerald-500 text-emerald-400 px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center justify-center gap-3 text-center"
              style={{ direction: "rtl" }}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <div>
                <div className="font-black text-sm">تغییرات با موفقیت ذخیره شدند!</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">متن‌های جدید فوراً روی تمامی بخش‌های سایت اعمال شدند.</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
