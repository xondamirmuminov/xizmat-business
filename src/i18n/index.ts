import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import { useAuthStore } from "@/store";

import en from "./locales/en.json";
import uz from "./locales/uz.json";
import ru from "./locales/ru.json";

const resources = {
  en: { translation: en },
  uz: { translation: uz },
  ru: { translation: ru },
};

const DEFAULT_LANGUAGE = "en";
const getLocale = () => {
  const preferredLanguage = useAuthStore.getState().language;
  const deviceLanguage =
    Localization.getLocales()?.[0]?.languageCode ?? DEFAULT_LANGUAGE;

  if (preferredLanguage) {
    const isLanguageSupported =
      Object.keys(resources).includes(preferredLanguage);
    return isLanguageSupported ? preferredLanguage : DEFAULT_LANGUAGE;
  }

  const isLanguageSupported = Object.keys(resources).includes(deviceLanguage);
  return isLanguageSupported ? deviceLanguage : DEFAULT_LANGUAGE;
};

const initI18n = () => {
  const language = getLocale();
  i18n.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();
