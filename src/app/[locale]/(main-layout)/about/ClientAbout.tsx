import { useTranslations } from "next-intl";

export default function ClientAbout() {
  const t = useTranslations("AboutMe");
  return (
    <div>
      <h2>{t("client-test")}</h2>
    </div>
  );
}
