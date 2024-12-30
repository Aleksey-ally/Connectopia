import React from "react";
import s from "./NotFound.module.scss";
import { useTranslation } from 'react-i18next';


const NotFound = () => {
    const { t } = useTranslation();

    return (
        <div className={s.notFound}>
            <div className={s.stars}></div>
            <div className={s.centerContent}>
                <h1 className={s.errorCode}>404</h1>
                <p className={s.errorMessage}>
                    {t("notFoundPage.notFound")}
                </p>
                <a href="/" className={s.homeLink}>
                    {t("notFoundPage.back")}
                </a>
            </div>
        </div>
    );
};

export default NotFound;
