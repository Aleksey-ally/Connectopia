import s from './Weather.module.scss'
import React, {FormEvent, useEffect, useState} from "react";
import {weatherAPI} from "api/weather/weather.api";
import {WeatherData} from "api/weather/weather.types";
import weatherLogo from "assets/imgs/weatherLogo.png";
import {Humidity, SpeedWind, Sunrise, Sunset} from "assets/icons";

export const Weather = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [city, setCity] = useState<string>("Москва");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchWeatherData = async (cityName: string) => {
        try {
            setLoading(true);
            setError(null);

            const weatherData = await weatherAPI.getWeatherData(cityName)
            setWeatherData(weatherData);

            setCity(cityName);
        } catch (err) {
            setError("Sorry, we couldn’t retrieve the weather data at this time");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherData(city);
    }, [city]);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchWeatherData(searchInput);
    };

    if (loading) return <div className={s.wrapper}>Loading...</div>;

    const dayOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    const sunOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    return (
        <div className={s.card}>
            <div className={s.cardLogo}>
                <img src={weatherLogo} alt="weather-logo"/>
            </div>

            <div className={s.wrapper}>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        className={s.cardSearchBar}
                        placeholder="Введите название города"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </form>
                {error && <p className="error">{error}</p>}

                {weatherData && weatherData.main && weatherData.weather && (

                    <div className={s.cardWeather}>

                        <div className={s.cardTemperatureWrapper}>
                            <div className={s.cardTemperature}>
                                {Math.round(weatherData.main.temp)}<span className={s.celsius}>°</span>
                            </div>
                        </div>

                        <div className={s.cityDateWrapper}>
                            <div className={s.cityDate}>
                                <p className={s.city}>{weatherData.name}</p>
                                <p>{new Date(weatherData.dt * 1000).toLocaleDateString('ru-RU', dayOptions)}</p>
                            </div>
                            <div className={s.iconDescription}>
                                <img
                                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                                    alt="weather-icon"
                                />
                                <p>{weatherData.weather[0].description}</p>
                            </div>
                        </div>


                        <div className={s.cardWeatherDetails}>

                            <div className={s.detailsRow}>
                                <div className={s.detailsDuo}>

                                    <div className={s.detailItem}>
                                        <Humidity/>
                                        <p>{Math.round(weatherData.main.humidity)}%</p>
                                    </div>

                                    <div className={s.detailItem}>
                                        <SpeedWind/>
                                        <p>{Math.round(weatherData.wind.speed)} м/с</p>
                                    </div>

                                </div>
                                <div className={s.detailsDuo}>

                                    <div className={s.detailItem}>
                                        <Sunrise/>
                                        <p>{new Date(weatherData?.sys.sunrise * 1000).toLocaleTimeString('ru-RU', sunOptions)}</p>
                                    </div>

                                    <div className={s.detailItem}>
                                        <Sunset/>
                                        <p>{new Date(weatherData?.sys.sunset * 1000).toLocaleTimeString('ru-RU', sunOptions)}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
