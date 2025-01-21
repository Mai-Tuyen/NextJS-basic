import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { appConfig } from "@/configs/appConfig";

export const { usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: appConfig.locales,
  localePrefix: appConfig.localePrefix,
});