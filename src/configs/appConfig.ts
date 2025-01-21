import { LocalePrefix } from 'next-intl/routing';

export type Locale = "vi" | "en";

export type AppConfig = {
  name: string;
  locales: Locale[];
  defaultLocale: Locale;
  localePrefix: LocalePrefix;
  timeZoneMap: Record<Locale, string>;
};

// localePrefix default là "always"
// "always": luôn luôn hiển thị tiền tố ngôn ngữ (vi|en)
// "as-needed": chỉ hiển thị khi tiền tố ko phải mặc định
// "never": không hiển thị tiền tố ngôn ngữ
const localePrefix: LocalePrefix = "always";

export const appConfig: AppConfig = {
  name: "Mai Tuyen Website",
  locales: ["en", "vi"],
  defaultLocale: "vi",
  localePrefix,
  timeZoneMap: {
    en: "America/Los_Angeles",
    vi: "Asia/Ho_Chi_Minh",
  },
};