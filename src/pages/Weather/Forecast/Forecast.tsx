import s from "./Forecast.module.scss";
import {Humidity, SpeedWind} from "assets/icons";
import {useTranslation} from "react-i18next";


type Forecast = {
    day: string;
    temperature: number;
    windSpeed: number;
    humidity: number;
    maxTemp: number;
    minTemp: number;
    condition: string;
    icon: string;
    className?: string
}

export const Forecast = ({
                             day,
                             temperature,
                             windSpeed,
                             humidity,
                             maxTemp,
                             minTemp,
                             condition,
                             icon,
                             className = ""
                         }: Forecast) => {

    const {t} = useTranslation();

    return (
        <div className={`${s.card} ${className}`}>
            <div className={s.dayTemperatureWrapper}>
                <p className={s.day}>{day}</p>
                <div className={s.temperature}>{temperature}°</div>
                <img src={icon} alt="Weather icon" className={s.weatherIcon}/>
                <p className={s.condition}>{condition}</p>
            </div>

            <div className={s.detailsWrapper}>
                <div className={s.details}>
                    <div className={s.detailsItem}>
                        <SpeedWind/>{Math.round(windSpeed)} {t("weatherPage.m/s")}
                    </div>
                    <div className={s.detailsItem}>
                        <Humidity/>{humidity}%
                    </div>
                    <div className={s.detailsItem}>
                        <span>{t("weatherPage.max")}</span>{maxTemp}°
                    </div>
                    <div className={s.detailsItem}>
                        <span>{t("weatherPage.min")}</span>{minTemp}°
                    </div>
                </div>
            </div>
        </div>
    );
};