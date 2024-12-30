import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "locales/en/translation.json";
import ruTranslations from "locales/ru/translation.json";

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
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false
        },
    });

export default i18n;