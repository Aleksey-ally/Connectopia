import s from './Weather.module.scss'
import React, {FormEvent, useEffect, useState} from "react";
import {weatherAPI} from "api/weather/weather.api";
import {ForecastDataList, WeatherData} from "api/weather/weather.types";
import weatherLogo from "assets/imgs/weatherLogo.png";
import {Humidity, SpeedWind, Sunrise, Sunset} from "assets/icons";
import {Forecast} from "./Forecast";
import {useDispatch, useSelector} from "react-redux";
import {ReducersType} from "redux/reduxStore";
import {setFetching} from "redux/appReducer";
import {Preloader} from "components/Preloader";

export const Weather = () => {
    const dispatch = useDispatch()
    const isFetching = useSelector<ReducersType, boolean>(state => state.app.isFetching)

    const [searchInput, setSearchInput] = useState<string>("");
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [city, setCity] = useState<string>("Москва");
    const [forecast, setForecast] = useState<ForecastDataList[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherData = async (cityName: string) => {
        try {
            dispatch(setFetching(true))
            setError(null);

            const weatherData = await weatherAPI.getWeatherData(cityName)
            setWeatherData(weatherData);

            const forecastData = await weatherAPI.getForecastData(cityName)

            const dailyForecast = forecastData.list.filter(
                (_, index: number) => index % 8 === 0
            );

            setForecast(dailyForecast);
            setCity(cityName);
        } catch (err) {
            setError("Неверное название города");
        } finally {
            dispatch(setFetching(false))
        }
    };

    useEffect(() => {
        fetchWeatherData(city);
    }, [city]);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchWeatherData(searchInput);
    };

    if (isFetching) return <Preloader/>;

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
        <>
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

            {forecast.length > 0 && city && forecast && (

                <div className={s.forecastWrapper}>
                    <h2 className={s.forecastHeader}>Прогноз на 5 дней</h2>
                    <div className={s.forecast}>
                        {forecast.map((day, index) => (

                            <Forecast key={index} day={new Date(day.dt * 1000).toLocaleDateString("ru-RU", {
                                weekday: "short",
                            })}
                                      temperature={Math.round(day.main.temp)}
                                      windSpeed={day.wind.speed} humidity={day.main.humidity}
                                      maxTemp={Math.round(day.main.temp_max)}
                                      minTemp={Math.round(day.main.temp_min)}
                                      condition={day.weather[0].description}
                                      icon={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}/>

                        ))}
                    </div>
                </div>


            )}
        </>
    );
};
