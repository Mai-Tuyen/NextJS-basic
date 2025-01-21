"use client";

import { useLocale } from "next-intl";
import type { ChangeEventHandler } from "react";

import { usePathname, useRouter } from "@/libs/i18nNavigation";
import { appConfig, Locale } from "@/configs/appConfig";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    router.push(pathname, { locale: event.target.value as Locale });
    router.refresh();
  };

  return (
    <select
      defaultValue={locale}
      onChange={handleChange}
      className="border border-gray-300 font-medium focus:outline-none focus-visible:ring rounded-md"
    >
      {appConfig.locales.map((elt) => (
        <option key={elt} value={elt}>
          <span className="text-sm">{elt.toLowerCase()}</span>
        </option>
      ))}
    </select>
  );
}
