"use client";

import BirthdayClassic from "./birthday/birthday-classic";
import BirthdayParty from "./birthday/birthday-party";
import BirthdayElegant from "./birthday/birthday-elegant";
import BirthdaySimple from "./birthday/birthday-simple";

type TemplateRendererProps = {
  theme: "classic" | "party" | "elegant" | "simple";
  title: string;
  message: string;
  category: string;
  image?: string;
};

export default function TemplateRenderer({
  theme,
  ...props
}: TemplateRendererProps) {
  switch (theme) {
    case "party":
      return <BirthdayParty {...props} />;

    case "elegant":
      return <BirthdayElegant {...props} />;

    case "simple":
      return <BirthdaySimple {...props} />;

    case "classic":
    default:
      return <BirthdayClassic {...props} />;
  }
}