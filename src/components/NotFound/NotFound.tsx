import React from "react";
import s from "./NotFound.module.scss";

const NotFound = () => {
    return (
        <div className={s.notFound}>
            <div className={s.stars}></div>
            <div className={s.centerContent}>
                <h1 className={s.errorCode}>404</h1>
                <p className={s.errorMessage}>
                    Такой страницы не существует.
                </p>
                <a href="/" className={s.homeLink}>
                    Вернутсья на главную
                </a>
            </div>
        </div>
    );
};

export default NotFound;
