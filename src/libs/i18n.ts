import { appConfig, Locale } from "@/configs/appConfig";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export default getRequestConfig(async ({ locale }) => {
  // Validate exist `locale` parameter
  if (!appConfig.locales.includes(locale as Locale)) notFound();

  // Lấy múi giờ dựa trên locale
  const timeZone =
    appConfig.timeZoneMap[locale as Locale] ||
    "UTC"; // Sử dụng UTC hoặc giá trị mặc định nếu không tìm thấy

  return {
    // import message từ thư mục locales tại step 1 đã định nghĩa
    messages: (await import(`../locales/${locale}.json`)).default,
    timeZone,
  };
});