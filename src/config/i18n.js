import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "@/locales/translation.json";

i18n
  .use(initReactI18next) // Pass the i18n instance to react-i18next.
  .init({
    resources: {
      en: {
        translation: translations.en,
      },
    },
    lng: "id", // Default language
    fallbackLng: "id", // Fallback language if the selected language is not available
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
