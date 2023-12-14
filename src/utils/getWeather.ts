

import axios, {AxiosResponse} from 'axios';

interface WeatherData{
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}


const getWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
    try {
        const response: AxiosResponse<WeatherData> = await axios.get<WeatherData>(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c6dfee09ab9897f02d32959a0fde2fbc&lang=en&units=metric`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

export default getWeatherData;