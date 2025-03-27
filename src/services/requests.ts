import { IWeatherData } from "../dtos";
import api from "./api";

export const fetchWeather = async (city: string) => {
  const response = await api.get("forecast.json", {
    params: { q: city, days: 14 },
  });
  return response.data;
};

export const getCurrentUserWeather = async (
  latitude: number,
  longitude: number
): Promise<Omit<IWeatherData, "forecastday">> => {
  const response = await api.get(`current.json?q=${latitude},${longitude}`);

  return response.data;
};

export const getUserCity = async () => {
  return new Promise<Omit<IWeatherData, "forecastday">>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocalização não suportada.");
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const city = await getCurrentUserWeather(latitude, longitude);
          resolve(city);
        } catch (error) {}
      },
      (error) => {
        reject("Erro ao obter a localização.");
      }
    );
  });
};
