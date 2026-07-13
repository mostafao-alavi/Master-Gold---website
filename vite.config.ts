import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// Vite configuration file compliant with Cloudflare Static Pages and local AI Studio preview.
// فایل پیکربندی Vite سازگار با صفحات ایستا (Static Pages) کلودفلر و محیط پیش‌نمایش لوکال AI Studio.
export default defineConfig(() => {
  return {
    plugins: [
      react(), // React plugin for fast compilation and JSX support (پلاگین ری‌اکت برای کامپایل سریع و پشتیبانی از JSX)
      tailwindcss() // Tailwind CSS v4 integration (پلاگین ادغام سیستم استایل‌دهی تیلوند نسخه ۴)
    ],
    resolve: {
      alias: {
        // Setup "@" path alias pointing to the root of the project
        // تنظیم نام مستعار مسیر "@" که به پوشه ریشه پروژه اشاره می‌کند
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var to prevent rendering glitches.
      // قابلیت HMR در استودیو هوش مصنوعی غیرفعال است تا از بروز اختلال‌های رندری در زمان ویرایش جلوگیری شود.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU overhead during AI edits.
      // غیرفعال کردن پایش فایل‌ها جهت کاهش مصرف پردازنده در حین ویرایش خودکار کدها.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

