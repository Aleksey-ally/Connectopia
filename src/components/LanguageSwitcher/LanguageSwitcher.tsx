import React from "react";
import { useTranslation } from "react-i18next";
import s from "./LanguageSwitcher.module.scss";
import {Button} from "components/Button";

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage!(language);
    };

    return (
        <div className={s.languageSwitcher}>
            <Button
                variant={"tertiary"}
                className={`${s.button} ${i18n.language === "en" ? s.active : ""}`}
                onClick={() => changeLanguage("en")}
            >
                EN
            </Button>
            <Button
                variant={"tertiary"}
                className={`${s.button} ${i18n.language === "ru" ? s.active : ""}`}
                onClick={() => changeLanguage("ru")}
            >
                RU
            </Button>
        </div>
    );
};
