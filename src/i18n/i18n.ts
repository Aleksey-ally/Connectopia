import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "locales/en/translation.json";
import ruTranslations from "locales/ru/translation.json";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: {
        translation: enTranslations
    },
    ru: {
        translation: ruTranslations
    }
};

i18n
    .use(initReactI18next)
    .use(I18nextBrowserLanguageDetector)
    .init({
        resources,
        interpolation: {
            escapeValue: false
        },
        detection:{
            order: ['localStorage'],  // Порядок поиска языка
            caches: ['localStorage'],  // Сохранение в localStorage
        },
        fallbackLng:'ru'
    });

export default i18n;