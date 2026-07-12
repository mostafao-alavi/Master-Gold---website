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

  // Hero Intro Extra
  heroIntroAlert: string;
  heroIntroNamePrefix: string;
  heroIntroName: string;
  heroIntroNameSuffix: string;
  heroIntroTitle: string;
  heroIntroBadge1: string;
  heroIntroBadge2: string;
  heroIntroBullet1: string;
  heroIntroBullet2: string;
  heroIntroBullet3: string;

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

  // Services Extra Warning Section
  antiPyramidTitle: string;
  antiPyramidDesc: string;
  service1Cta: string;
  service2Cta: string;
  service3Cta: string;

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

  // About Extra Card details
  aboutCardBadge: string;
  aboutCardTitle: string;

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

  // Projects Extra
  projectsSectionBadge: string;
  project3Cta: string;

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

  // Testimonials Extra
  testimonialsSectionBadge: string;

  // FAQ
  faqTitle: string;
  faqSubtitle: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
  faq3Q: string;
  faq3A: string;

  // FAQ Extra
  faqSectionBadge: string;
  faqMetric1Val: string;
  faqMetric1Label: string;
  faqMetric2Val: string;
  faqMetric2Label: string;
  faqMetric3Val: string;
  faqMetric3Label: string;

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

  // Contact Extra
  contactSectionBadge: string;
  contactMessengerLabel: string;
  telegramButtonLabel: string;
  rubikaButtonLabel: string;
  placeholderName: string;
}

interface AllTranslations {
  fa: TranslationSet;
  en: TranslationSet;
  ar: TranslationSet;
}

const DEFAULT_FALLBACK_IMAGES: Record<string, string> = {
  logo1: "/image/logo 1 .jpg",
  logo2: "/image/logo 2 .jpg",
  project1: "/image/meta vers.jpg",
  project2: "/image/meta whaie 2.jpg",
  project3: "/image/meta iran.jpg"
};

const compressAndGetBase64 = (file: File, maxWidth = 1200, maxHeight = 1200): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.75);
        resolve(compressedBase64);
      };
      img.onerror = (err) => {
        reject(err);
      };
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });
};

interface ImageUploadFieldProps {
  key?: any;
  field: { key: string; label: string; desc: string };
  val: string;
  onChange: (key: string, value: string) => void;
  onResetToDefault: () => void;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ field, val, onChange, onResetToDefault }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("لطفاً فقط فایل تصویر معتبر انتخاب کنید.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("حجم تصویر بسیار زیاد است (حداکثر ۱۰ مگابایت مجاز است).");
      return;
    }
    setIsProcessing(true);
    setError(null);
    try {
      const base64 = await compressAndGetBase64(file);
      onChange(field.key, base64);
    } catch (err) {
      console.error(err);
      setError("خطا در پردازش و فشرده‌سازی تصویر رخ داد.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  return (
    <div className="bg-zinc-950/40 border border-zinc-800/20 p-4 sm:p-5 rounded-2xl space-y-3 text-right" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-zinc-200">{field.label}</h4>
          <p className="text-[10px] sm:text-xs text-zinc-400 mt-1 font-medium">{field.desc}</p>
        </div>
        <span className="text-[9px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-md">
          {field.key}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* Upload Drop Zone */}
        <div className="md:col-span-8">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border border-dashed rounded-xl p-4 transition-all text-center flex flex-col items-center justify-center min-h-[110px] cursor-pointer ${
              isDragOver
                ? "border-amber-500 bg-amber-500/5 text-amber-400"
                : "border-zinc-800 hover:border-zinc-700 bg-zinc-950/80 text-zinc-400 hover:text-zinc-300"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {isProcessing ? (
              <div className="space-y-2 flex flex-col items-center">
                <i className="fa-solid fa-spinner fa-spin text-xl text-amber-500"></i>
                <p className="text-xs text-zinc-400 font-medium">در حال فشرده‌سازی و بهینه‌سازی تصویر...</p>
              </div>
            ) : (
              <div className="space-y-2 flex flex-col items-center">
                <i className="fa-solid fa-cloud-arrow-up text-xl text-zinc-500"></i>
                <p className="text-xs font-bold">کشیدن و رها کردن فایل یا کلیک برای انتخاب تصویر جدید</p>
                <p className="text-[10px] text-zinc-500">فشرده‌سازی خودکار جهت ذخیره سریع و بهینه انجام می‌شود</p>
              </div>
            )}
          </div>
        </div>

        {/* Live Preview / Reset */}
        <div className="md:col-span-4 flex flex-col items-center justify-center bg-zinc-950/40 border border-zinc-900 rounded-xl p-3 min-h-[110px] relative">
          {val ? (
            <div className="relative group w-16 h-16 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center p-0.5">
              <img
                src={val}
                alt="Preview"
                className="w-full h-full object-cover rounded-md"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => onChange(field.key, "")}
                  className="p-1 bg-red-500/80 hover:bg-red-600 text-white rounded text-[10px] cursor-pointer"
                  title="حذف تصویر"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-1 text-zinc-600">
              <i className="fa-regular fa-image text-xl mb-1"></i>
              <p className="text-[9px]">بدون تصویر</p>
            </div>
          )}

          {val && (
            <button
              type="button"
              onClick={onResetToDefault}
              className="mt-2 text-[10px] font-bold text-zinc-400 hover:text-amber-500 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <i className="fa-solid fa-arrow-rotate-left"></i>
              بازنشانی به تصویر اولیه
            </button>
          )}
        </div>
      </div>

      {/* Manual text input for URL */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold text-zinc-400">آدرس اینترنتی مستقیم تصویر (یا کد Base64)</label>
          {val && val.startsWith("data:") && (
            <span className="text-[9px] font-bold text-emerald-400 flex items-center gap-1">
              <i className="fa-solid fa-circle-check text-[10px]"></i>
              تصویر فشرده آماده ذخیره است
            </span>
          )}
        </div>
        <input
          type="text"
          value={val}
          onChange={(e) => onChange(field.key, e.target.value)}
          placeholder="مثال: https://site.com/logo.jpg یا مسیر لوکال"
          className="w-full bg-zinc-950 border border-zinc-850 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-all text-left font-mono text-[10px]"
          dir="ltr"
        />
      </div>
    </div>
  );
}

interface AdminPanelProps {
  initialTranslations: AllTranslations;
  onSave: (updated: AllTranslations) => Promise<void> | void;
  initialImages: Record<string, string>;
  onSaveImages: (updated: Record<string, string>) => Promise<void> | void;
  onClose: () => void;
  onReset: () => void;
}

export default function AdminPanel({
  initialTranslations,
  onSave,
  initialImages,
  onSaveImages,
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

  // Save progress states
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showSqlInstructions, setShowSqlInstructions] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Editing state
  const [localTranslations, setLocalTranslations] = useState<AllTranslations>(() => {
    return JSON.parse(JSON.stringify(initialTranslations));
  });

  const [localImages, setLocalImages] = useState<Record<string, string>>(() => {
    return { ...initialImages };
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

  // Field change helper for translations
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

  // Field change helper for images
  const handleImageChange = (key: string, value: string) => {
    setLocalImages((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Submit and save handler
  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      await onSave(localTranslations);
      await onSaveImages(localImages);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 4000);
    } catch (err: any) {
      console.error("Save error captured:", err);
      setSaveError(err.message || "خطایی در ذخیره اطلاعات در دیتابیس پیش آمد.");
    } finally {
      setIsSaving(false);
    }
  };

  // Trigger default reset
  const handleResetToDefaults = () => {
    if (confirm("آیا از بازگرداندن کلیه متن‌ها و تصاویر به حالت اولیه اطمینان دارید؟")) {
      onReset();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const sectionList = [
    { id: "branding", title: "برندینگ و اطلاعات پایه", icon: "fa-sliders" },
    { id: "hero", title: "بخش هیرو (مقدمه بالای صفحه)", icon: "fa-circle-user" },
    { id: "services", title: "بخش خدمات و تخصص‌ها", icon: "fa-briefcase" },
    { id: "about", title: "بخش درباره من و آمارها", icon: "fa-address-card" },
    { id: "projects", title: "بخش پروژه‌های برجسته", icon: "fa-rocket" },
    { id: "testimonials", title: "بخش نظرات دانشجویان", icon: "fa-comments" },
    { id: "faq", title: "بخش سؤالات متداول", icon: "fa-circle-question" },
    { id: "contact", title: "بخش تماس با ما و فرم پیام", icon: "fa-envelope" },
    { id: "images", title: "مدیریت تصاویر سایت", icon: "fa-image" },
  ];

  // Translation field groupings for clean management
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
        { key: "heroIntroAlert" as const, label: "جمله هشدار هیرو (شروع کار)", type: "textarea" },
        { key: "heroIntroNamePrefix" as const, label: "پیشوند نام معرفی (مثال: من)", type: "input" },
        { key: "heroIntroName" as const, label: "نام معرفی (مثال: معین علوی)", type: "input" },
        { key: "heroIntroNameSuffix" as const, label: "پسوند نام معرفی (مثال: هستم)", type: "input" },
        { key: "heroIntroTitle" as const, label: "عنوان تخصص معرفی هیرو", type: "textarea" },
        { key: "heroIntroBadge1" as const, label: "بج معرفی اول", type: "input" },
        { key: "heroIntroBadge2" as const, label: "بج معرفی دوم", type: "input" },
        { key: "heroIntroBullet1" as const, label: "مورد اول رسالت هیرو", type: "textarea" },
        { key: "heroIntroBullet2" as const, label: "مورد دوم رسالت هیرو", type: "textarea" },
        { key: "heroIntroBullet3" as const, label: "مورد سوم رسالت هیرو", type: "textarea" },
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
        { key: "service1Cta" as const, label: "متن دکمه اکشن خدمت اول", type: "input" },
        { key: "service2Title" as const, label: "عنوان خدمت دوم (بازار طلا)", type: "input" },
        { key: "service2Desc" as const, label: "توضیحات خدمت دوم", type: "textarea" },
        { key: "service2Cta" as const, label: "متن دکمه اکشن خدمت دوم", type: "input" },
        { key: "service3Title" as const, label: "عنوان خدمت سوم (ترید و معاملات)", type: "input" },
        { key: "service3Desc" as const, label: "توضیحات خدمت سوم", type: "textarea" },
        { key: "service3Cta" as const, label: "متن دکمه اکشن خدمت سوم", type: "input" },
        { key: "service3Status" as const, label: "وضعیت خدمت سوم (مثلا: فعال)", type: "input" },
        { key: "antiPyramidTitle" as const, label: "عنوان بخش هشدار ضد هرمی", type: "input" },
        { key: "antiPyramidDesc" as const, label: "توضیحات بخش هشدار ضد هرمی", type: "textarea" },
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
        { key: "specsTitle" as const, label: "عنوان تخصص‌های برجسته", type: "input" },
        { key: "spec1" as const, label: "سابقه / تخصص اول", type: "textarea" },
        { key: "spec2" as const, label: "سابقه / تخصص دوم", type: "textarea" },
        { key: "spec3" as const, label: "سابقه / تخصص سوم", type: "textarea" },
        { key: "spec4" as const, label: "سابقه / تخصص چهارم", type: "textarea" },
        { key: "statsLabel1" as const, label: "متن آمار ۱ (وبینار آموزشی)", type: "input" },
        { key: "statsLabel2" as const, label: "متن آمار ۲ (دانشجو تحت آموزش)", type: "input" },
        { key: "statsLabel3" as const, label: "متن آمار ۳ (سال فعالیت)", type: "input" },
        { key: "aboutCardBadge" as const, label: "بج وضعیت کارت درباره من", type: "input" },
        { key: "aboutCardTitle" as const, label: "عنوان کارت درباره من", type: "input" },
      ],
    },
    projects: {
      title: "بخش پروژه‌های برجسته",
      icon: "fa-rocket",
      fields: [
        { key: "projectsSectionBadge" as const, label: "بج عنوان بخش پروژه‌ها", type: "input" },
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
        { key: "project3Cta" as const, label: "متن دکمه ورود به کانال هالیورس", type: "input" },
      ],
    },
    testimonials: {
      title: "بخش نظرات دانشجویان",
      icon: "fa-comments",
      fields: [
        { key: "testimonialsSectionBadge" as const, label: "بج عنوان بخش نظرات", type: "input" },
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
        { key: "faqSectionBadge" as const, label: "بج عنوان بخش سوالات متداول", type: "input" },
        { key: "faqTitle" as const, label: "عنوان بخش سؤالات متداول", type: "input" },
        { key: "faqSubtitle" as const, label: "توضیح بخش سؤالات متداول", type: "input" },
        { key: "faq1Q" as const, label: "سؤال اول", type: "textarea" },
        { key: "faq1A" as const, label: "پاسخ سؤال اول", type: "textarea" },
        { key: "faq2Q" as const, label: "سؤال دوم", type: "textarea" },
        { key: "faq2A" as const, label: "پاسخ سؤال دوم", type: "textarea" },
        { key: "faq3Q" as const, label: "سؤال سوم", type: "textarea" },
        { key: "faq3A" as const, label: "پاسخ سؤال سوم (آمارهای طلایی در این بخش قرار دارد)", type: "textarea" },
        { key: "faqMetric1Val" as const, label: "مقدار آمار اعتماد ۱ (مثال: ۴ سال)", type: "input" },
        { key: "faqMetric1Label" as const, label: "توضیح آمار اعتماد ۱", type: "input" },
        { key: "faqMetric2Val" as const, label: "مقدار آمار اعتماد ۲ (مثال: ۲,۵۰۰,۰۰۰+)", type: "input" },
        { key: "faqMetric2Label" as const, label: "توضیح آمار اعتماد ۲", type: "input" },
        { key: "faqMetric3Val" as const, label: "مقدار آمار اعتماد ۳ (مثال: ۱۵۰,۰۰۰+)", type: "input" },
        { key: "faqMetric3Label" as const, label: "توضیح آمار اعتماد ۳", type: "input" },
      ],
    },
    contact: {
      title: "بخش تماس با ما و فرم پیام",
      icon: "fa-envelope",
      fields: [
        { key: "contactSectionBadge" as const, label: "بج عنوان بخش تماس", type: "input" },
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
        { key: "placeholderName" as const, label: "متن راهنمای نام در فرم", type: "input" },
        { key: "formEmail" as const, label: "برچسب ایمیل فیلد در فرم", type: "input" },
        { key: "formMessage" as const, label: "برچسب پیام فیلد در فرم", type: "input" },
        { key: "placeholderMessage" as const, label: "متن راهنمای داخل فیلد پیام", type: "input" },
        { key: "btnSubmit" as const, label: "متن دکمه ارسال پیام مستقیم", type: "input" },
        { key: "sending" as const, label: "متن دکمه در حال ارسال پیام", type: "input" },
        { key: "successTitle" as const, label: "عنوان پیام موفقیت ارسال", type: "input" },
        { key: "successText" as const, label: "متن کامل پیام موفقیت ارسال", type: "textarea" },
        { key: "allRights" as const, label: "متن کپی‌رایت انتهای سایت (فوتر)", type: "textarea" },
        { key: "contactMessengerLabel" as const, label: "متن انتخاب پیام‌رسان", type: "input" },
        { key: "telegramButtonLabel" as const, label: "متن دکمه تلگرام در فرم", type: "input" },
        { key: "rubikaButtonLabel" as const, label: "متن دکمه روبیکا در فرم", type: "input" },
      ],
    },
  };

  const imageFields = [
    { key: "logo1", label: "لوگوی بخش هیرو (لوگوی اول بالای صفحه)", desc: "تصویر لوگوی طلایی دایره‌ای بالای صفحه" },
    { key: "logo2", label: "لوگوی کارت درباره من (لوگوی دوم)", desc: "تصویر لوگویی که داخل کارت شیشه‌ای درباره من قرار دارد" },
    { key: "project1", label: "تصویر پروژه اول (Meta Whale Space)", desc: "تصویر کاور مربوط به بخش متا وال" },
    { key: "project2", label: "تصویر پروژه دوم (Vistory)", desc: "تصویر کاور مربوط به بخش ویستوری" },
    { key: "project3", label: "تصویر پروژه سوم (Holiverse)", desc: "تصویر کاور مربوط به بخش هالیورس" },
  ];

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
  const isImageSection = activeSection === "images";
  const currentGroup = !isImageSection ? fieldGroups[activeSection as keyof typeof fieldGroups] : null;

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
        {/* Language Tabs - Only show when NOT editing images */}
        {!isImageSection ? (
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
        ) : (
          <div className="bg-amber-500/5 p-4 rounded-2xl border border-amber-500/20 text-xs text-amber-300 font-bold mb-6 text-center">
            🌌 در این بخش می‌توانید آدرس مستقیم فایل‌ها یا لینک‌های اینترنتی تمامی تصاویر در حال استفاده در سایت را تغییر دهید.
          </div>
        )}

        {/* Horizontal Section List */}
        <div className="mb-6 overflow-x-auto no-scrollbar py-1">
          <div className="flex space-x-2 space-x-reverse min-w-max">
            {sectionList.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  activeSection === sec.id
                    ? "bg-zinc-900 border-amber-500/40 text-amber-400"
                    : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <i className={`fa-solid ${sec.icon} text-sm`}></i>
                {sec.title}
              </button>
            ))}
          </div>
        </div>

        {/* Form area for selected section */}
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-3xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-900">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
              <i className={`fa-solid ${isImageSection ? "fa-image" : currentGroup?.icon} text-base`}></i>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                {isImageSection ? "مدیریت تصاویر سایت" : currentGroup?.title}
              </h2>
              <p className="text-[10px] text-zinc-400 font-medium">
                {isImageSection ? "تغییر و آپدیت آدرس عکس‌های استفاده شده در سراسر وب‌سایت" : "ویرایش متن‌های این بخش برای زبان انتخابی"}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {isImageSection ? (
              <div className="space-y-6">
                {imageFields.map((field) => {
                  const val = localImages[field.key] || "";
                  return (
                    <ImageUploadField
                      key={field.key}
                      field={field}
                      val={val}
                      onChange={handleImageChange}
                      onResetToDefault={() => handleImageChange(field.key, DEFAULT_FALLBACK_IMAGES[field.key])}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="space-y-6">
                {currentGroup?.fields.map((field) => {
                  const val = localTranslations[activeLang][field.key] || "";
                  const isLongText = field.key === "aboutText" || field.key === "faq3A" || field.key.includes("Desc") || field.key.includes("Bullet") || field.key.includes("IntroAlert");
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

                      {field.type === "input" && !isLongText ? (
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
            )}
          </div>
        </div>

        {/* Save Error & Offline Notification */}
        {saveError && (
          <div className="mt-8 bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 sm:p-5 text-right space-y-3">
            <div className="flex items-center gap-2 text-amber-500">
              <i className="fa-solid fa-cloud-arrow-up text-lg"></i>
              <h4 className="font-black text-xs sm:text-sm">تغییرات به صورت محلی ثبت شد (در انتظار همگام‌سازی ابری)</h4>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed font-medium">
              تغییرات شما با موفقیت در کش محلی مرورگر ذخیره شدند و هم‌اکنون به طور کامل روی وب‌سایت اعمال شده و قابل مشاهده هستند. با این حال، به دلیل متصل نبودن دیتابیس Supabase، اطلاعات به صورت دائمی در فضای ابری ثبت نشدند.
            </p>
            <div className="text-[10px] font-mono text-zinc-500 bg-zinc-950 p-2.5 rounded-xl border border-zinc-900 overflow-x-auto text-left leading-normal" dir="ltr">
              Log Details: {saveError}
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => setShowSqlInstructions(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl text-[10px] sm:text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <i className="fa-solid fa-database"></i>
                کدهای SQL و آموزش اتصال دیتابیس
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-zinc-950 text-zinc-300 hover:text-white hover:bg-zinc-900 border border-zinc-850 font-bold rounded-xl text-[10px] sm:text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <i className="fa-solid fa-arrow-rotate-right"></i>
                امتحان مجدد اتصال ابری
              </button>
            </div>
          </div>
        )}

        {/* Global Save Controls Container */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black rounded-2xl shadow-xl shadow-amber-500/5 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base ${
              isSaving ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? (
              <>
                <i className="fa-solid fa-spinner animate-spin text-base"></i>
                در حال ذخیره و همگام‌سازی...
              </>
            ) : (
              <>
                <i className="fa-solid fa-floppy-disk text-base"></i>
                ذخیره و انتشار تغییرات
              </>
            )}
          </button>

          <button
            onClick={handleResetToDefaults}
            disabled={isSaving}
            className="w-full py-4 bg-zinc-900 hover:bg-zinc-850 text-red-400 hover:text-red-300 border border-zinc-800/80 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-50"
          >
            <i className="fa-solid fa-trash-can"></i>
            پاک کردن کل تغییرات و ریست کلی
          </button>
        </div>

        {/* Database SQL Instructions Modal */}
        <AnimatePresence>
          {showSqlInstructions && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4" style={{ direction: "rtl" }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
                  <div className="flex items-center gap-2 text-amber-500">
                    <i className="fa-solid fa-database text-xl"></i>
                    <h3 className="font-black text-base sm:text-lg">راه‌اندازی دیتابیس Supabase</h3>
                  </div>
                  <button
                    onClick={() => setShowSqlInstructions(false)}
                    className="w-8 h-8 rounded-full bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <div className="space-y-4 text-sm leading-relaxed text-zinc-300 font-sans">
                  <p className="font-bold text-white text-right">
                    تنظیمات به صورت محلی در مرورگر شما ذخیره شد، اما برای ثبت دائم در سرور دیتابیس Supabase باید مطمئن شوید جدول تنظیمات و ردیف‌های مربوطه ایجاد شده‌اند. کدهای SQL زیر را کپی کرده و در پنل کوئری دیتابیس خود اجرا کنید.
                  </p>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-xs text-amber-400">
                    <ol className="list-decimal list-inside space-y-2 text-right font-bold">
                      <li>وارد داشبورد پروژه خود در <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline text-white">Supabase</a> شوید.</li>
                      <li>از منوی سمت چپ به بخش <strong className="text-white">SQL Editor</strong> مراجعه کنید.</li>
                      <li>یک کوئری جدید (<strong className="text-white">New Query</strong>) باز کنید، کدهای زیر را کپی کرده و دکمه <strong className="text-white">Run</strong> را بزنید.</li>
                    </ol>
                  </div>

                  <div className="relative">
                    <pre className="bg-zinc-950 text-[11px] text-zinc-400 p-4 rounded-xl overflow-x-auto text-left font-mono border border-zinc-850 leading-5">
{`-- Create the table for storing settings (if it doesn't exist)
create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table site_settings enable row level security;

-- Drop policies if they exist to prevent errors
drop policy if exists "Allow public read access" on site_settings;
drop policy if exists "Allow public insert and update" on site_settings;

-- Allow public read access (everyone can see the website texts and images!)
create policy "Allow public read access" on site_settings
  for select using (true);

-- Allow public insert and update (for the admin panel)
create policy "Allow public insert and update" on site_settings
  for all using (true) with check (true);

-- Insert initial translations values
insert into site_settings (key, value)
values ('translations', '{"fa": {}, "en": {}, "ar": {}}')
on conflict (key) do nothing;

-- Insert initial images values
insert into site_settings (key, value)
values ('site_images', '{"logo1": "/image/logo 1 .jpg", "logo2": "/image/logo 2 .jpg", "project1": "/image/meta vers.jpg", "project2": "/image/meta whaie 2.jpg", "project3": "/image/meta iran.jpg"}')
on conflict (key) do nothing;`}
                    </pre>
                    <button
                      onClick={() => {
                        const sqlText = `-- Create the table for storing settings (if it doesn't exist)\ncreate table if not exists site_settings (\n  key text primary key,\n  value jsonb not null,\n  updated_at timestamp with time zone default timezone('utc\'::text, now()) not null\n);\n\n-- Enable Row Level Security (RLS)\nalter table site_settings enable row level security;\n\n-- Drop policies if they exist to prevent errors\ndrop policy if exists "Allow public read access" on site_settings;\ndrop policy if exists "Allow public insert and update" on site_settings;\n\n-- Allow public read access (everyone can see the website texts and images!)\ncreate policy "Allow public read access" on site_settings\n  for select using (true);\n\n-- Allow public insert and update (for the admin panel)\ncreate policy "Allow public insert and update" on site_settings\n  for all using (true) with check (true);\n\n-- Insert initial translations values\ninsert into site_settings (key, value)\nvalues ('translations', '{"fa": {}, "en": {}, "ar": {}}')\non conflict (key) do nothing;\n\n-- Insert initial images values\ninsert into site_settings (key, value)\nvalues ('site_images', '{"logo1": "/image/logo 1 .jpg", "logo2": "/image/logo 2 .jpg", "project1": "/image/meta vers.jpg", "project2": "/image/meta whaie 2.jpg", "project3": "/image/meta iran.jpg"}')\non conflict (key) do nothing;`;
                        navigator.clipboard.writeText(sqlText);
                        setCopiedSql(true);
                        setTimeout(() => setCopiedSql(false), 3000);
                      }}
                      className="absolute top-2 right-2 bg-zinc-900/90 border border-zinc-850 text-xs px-3 py-1.5 rounded-lg hover:bg-zinc-800 hover:text-white transition-all flex items-center gap-1.5 text-zinc-300 font-bold cursor-pointer"
                    >
                      {copiedSql ? (
                        <>
                          <i className="fa-solid fa-check text-emerald-400"></i>
                          <span>کپی شد!</span>
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-copy"></i>
                          <span>کپی کردن کد SQL</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
                  <button
                    onClick={() => setShowSqlInstructions(false)}
                    className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    بستن راهنما
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

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
                <div className="text-[10px] text-zinc-400 mt-0.5">متن‌ها و تصاویر جدید فوراً روی تمامی بخش‌های سایت اعمال شدند.</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
