import { createClient } from "@supabase/supabase-js";

// Grab Supabase URL & Key from env or use provided default values
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://blqgvruxqauslsswtiia.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_pOcd6EFT2c2KbX8hEvH_6A_PJyGp9bI";


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false, // Pure stateless client matching Cloudflare edge compatibility rules
  }
});

// Helper to check if Supabase is properly configured (not empty or default placeholder)
export function isSupabaseConfigured(): boolean {
  return (
    !!SUPABASE_URL &&
    SUPABASE_URL !== "https://your-project-id.supabase.co" &&
    !SUPABASE_URL.includes("placeholder") &&
    !!SUPABASE_ANON_KEY &&
    SUPABASE_ANON_KEY !== "your-anon-publishable-key"
  );
}

// Helper to fetch site translations from Supabase
export async function getSupabaseTranslations() {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase is not configured (using placeholder credentials). Skipping cloud fetch.");
    return { __skip_seed: true };
  }

  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "translations")
      .single();

    if (error) {
      console.warn("Supabase translations fetch error:", error.message);
      // PGRST116 means the table exists but the key "translations" was not found (needs seeding).
      if (error.code === "PGRST116") {
        return { __should_seed: true };
      }
      // Any other error (e.g. 42P01 relation does not exist or connection error) means we should skip seeding.
      return { __skip_seed: true };
    }
    return data?.value || { __should_seed: true };
  } catch (err) {
    console.error("Failed to query translations from Supabase:", err);
    return { __skip_seed: true };
  }
}

// Helper to fetch site image configurations from Supabase
export async function getSupabaseImages() {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase is not configured (using placeholder credentials). Skipping cloud fetch.");
    return { __skip_seed: true };
  }

  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "site_images")
      .single();

    if (error) {
      console.warn("Supabase images fetch error:", error.message);
      // PGRST116 means the table exists but the key "site_images" was not found (needs seeding).
      if (error.code === "PGRST116") {
        return { __should_seed: true };
      }
      // Any other error (e.g. 42P01 relation does not exist or connection error) means we should skip seeding.
      return { __skip_seed: true };
    }
    return data?.value || { __should_seed: true };
  } catch (err) {
    console.error("Failed to query images from Supabase:", err);
    return { __skip_seed: true };
  }
}

// Helper to save site translations to Supabase using native robust upsert
export async function saveSupabaseTranslations(translationsObj: any) {
  if (!isSupabaseConfigured()) {
    throw new Error("دیتابیس Supabase هنوز تنظیم نشده است. لطفاً ابتدا آدرس و کلید دیتابیس را در متغیرهای محیطی خود قرار دهید.");
  }

  try {
    const { error } = await supabase
      .from("site_settings")
      .upsert({
        key: "translations",
        value: translationsObj,
        updated_at: new Date().toISOString(),
      }, { onConflict: "key" });

    if (error) {
      throw error;
    }
    return true;
  } catch (err: any) {
    const errMsg = err?.message || JSON.stringify(err) || "Unknown error";
    console.error("Failed to save translations to Supabase. Complete Error: " + errMsg);
    throw new Error(err?.message || JSON.stringify(err) || "خطا در برقراری ارتباط با دیتابیس Supabase");
  }
}

// Helper to save site images to Supabase using native robust upsert
export async function saveSupabaseImages(imagesObj: any) {
  if (!isSupabaseConfigured()) {
    throw new Error("دیتابیس Supabase هنوز تنظیم نشده است. لطفاً ابتدا آدرس و کلید دیتابیس را در متغیرهای محیطی خود قرار دهید.");
  }

  try {
    const { error } = await supabase
      .from("site_settings")
      .upsert({
        key: "site_images",
        value: imagesObj,
        updated_at: new Date().toISOString(),
      }, { onConflict: "key" });

    if (error) {
      throw error;
    }
    return true;
  } catch (err: any) {
    const errMsg = err?.message || JSON.stringify(err) || "Unknown error";
    console.error("Failed to save site images to Supabase. Complete Error: " + errMsg);
    throw new Error(err?.message || JSON.stringify(err) || "خطا در ثبت تصاویر در دیتابیس Supabase");
  }
}
