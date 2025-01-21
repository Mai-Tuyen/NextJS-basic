import ButtonRouter from "@/app/[locale]/(main-layout)/about/_components/Button";
import React from "react";
import { useTranslations } from "next-intl";
import ClientAbout from "./ClientAbout";

export default function About() {
  const t = useTranslations("AboutMe");
  return (
    <>
      <div>About</div>;
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quisquam
        aut vitae eveniet vel repellendus a, laboriosam, sequi eos modi quis
        excepturi aliquam ullam non consequatur ab eius cumque culpa.
      </p>
      <h1>{t("title")}</h1>
      <h2>{t("description")}</h2>
      <ClientAbout />
      <ButtonRouter>Button router to Post</ButtonRouter>
    </>
  );
}
