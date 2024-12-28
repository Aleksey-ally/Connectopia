export type WeatherData = {
    coord: WeatherDataCoord;
    weather: WeatherDataWeather[];
    base: string;
    main: WeatherDataMain;
    visibility: number;
    wind: WeatherDataWind;
    clouds: WeatherDataClouds;
    dt: number;
    sys: WeatherDataSys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}
type WeatherDataCoord = {
    lon: number;
    lat: number;
}
type WeatherDataWeather = {
    id: number;
    main: string;
    description: string;
    icon: string;
}
type WeatherDataMain = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}
type WeatherDataWind = {
    speed: number;
    deg: number;
    gust: number;
}
type WeatherDataClouds = {
    all: number;
}
type WeatherDataSys = {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export type ForecastData = {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastDataList[];
    city: ForecastDataCity;
}
type ForecastDataListMain = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}
type ForecastDataListWeather = {
    id: number;
    main: string;
    description: string;
    icon: string;
}
type ForecastDataListClouds = {
    all: number;
}
type ForecastDataListWind = {
    speed: number;
    deg: number;
    gust: number;
}
type ForecastDataListSys = {
    pod: string;
}
export type ForecastDataList = {
    dt: number;
    main: ForecastDataListMain;
    weather: ForecastDataListWeather[];
    clouds: ForecastDataListClouds;
    wind: ForecastDataListWind;
    visibility: number;
    pop: number;
    sys: ForecastDataListSys;
    dt_txt: string;
}
type ForecastDataCityCoord = {
    lat: number;
    lon: number;
}
type ForecastDataCity = {
    id: number;
    name: string;
    coord: ForecastDataCityCoord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}