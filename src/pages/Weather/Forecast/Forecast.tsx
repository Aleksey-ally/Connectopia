import s from "./Forecast.module.scss";
import {Humidity, SpeedWind, Sunrise, Sunset} from "assets/icons";


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
                            <SpeedWind/>{windSpeed} м/с
                        </div>
                        <div className={s.detailsItem}>
                            <Humidity/>{humidity}%
                        </div>
                        <div className={s.detailsItem}>
                           <span>Макс</span>{maxTemp}°
                        </div>
                        <div className={s.detailsItem}>
                            <span>Мин</span>{minTemp}°
                        </div>
                    </div>
                </div>
        </div>
    );
};