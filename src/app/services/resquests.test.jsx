import { fetchWeather, getCurrentUserWeather, getUserCity } from './requests';
import api from './api';


jest.mock('./api');


global.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
};

describe("Weather Services", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchWeather fetches weather data successfully", async () => {
    const mockResponse = {
      data: {
        location: { name: "Belo Horizonte" },
        current: { temp_c: 25, humidity: 60, wind_kph: 10 },
        forecast: {
          forecastday: [
            {
              date: "2024-03-26",
              day: { maxtemp_c: 30, mintemp_c: 20, condition: { text: "Ensolarado" } },
            },
          ],
        },
      },
    };

    api.get.mockResolvedValue(mockResponse);

    const data = await fetchWeather("Belo Horizonte");

    expect(api.get).toHaveBeenCalledWith("forecast.json", {
      params: { q: "Belo Horizonte", days: 14 },
    });
    expect(data).toEqual(mockResponse.data);
  });

  test("getCurrentUserWeather fetches current user weather data successfully", async () => {
    const mockResponse = {
      data: {
        location: { name: "Belo Horizonte" },
        current: { temp_c: 25, humidity: 60, wind_kph: 10 },
      },
    };

    api.get.mockResolvedValue(mockResponse);

    const data = await getCurrentUserWeather(19.9245, -43.9346);

    expect(api.get).toHaveBeenCalledWith("current.json?q=19.9245,-43.9346");
    expect(data).toEqual(mockResponse.data);
  });

  test("getUserCity rejects when geolocation is not supported", async () => {
    global.navigator.geolocation = undefined;

    await expect(getUserCity()).rejects.toEqual("Geolocalização não suportada.");
  });

  test("getUserCity rejects when geolocation is not supported", async () => {
 
    global.navigator.geolocation = undefined;
  
    await expect(getUserCity()).rejects.toEqual("Geolocalização não suportada.");
  });
  
  test("getUserCity rejects with an error message when geolocation fails", async () => {
    const mockError = { message: "User denied Geolocation" };
  

    global.navigator.geolocation = {
      getCurrentPosition: jest.fn().mockImplementation((success, error) => {
        error(mockError);
      }),
    };
  
    await expect(getUserCity()).rejects.toEqual("Erro ao obter a localização.");
  });
  test("getUserCity resolves with the user's city when geolocation succeeds", async () => {
    const mockPosition = {
      coords: {
        latitude: 19.9245,
        longitude: -43.9346,
      },
    };

    global.navigator.geolocation = {
      getCurrentPosition: jest.fn().mockImplementation((success) => {
        success(mockPosition);
      }),
    };

    const mockResponse = {
      data: {
        location: { name: "Belo Horizonte" },
      },
    };

    api.get.mockResolvedValue(mockResponse);

    const city = await getUserCity();

    expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
  
  });

  test("fetchWeather handles API errors gracefully", async () => {
    api.get.mockRejectedValue(new Error("API Error"));

    await expect(fetchWeather("InvalidCity")).rejects.toThrow("API Error");
    expect(api.get).toHaveBeenCalledWith("forecast.json", {
      params: { q: "InvalidCity", days: 14 },
    });
  });

  test("getCurrentUserWeather handles API errors gracefully", async () => {
    api.get.mockRejectedValue(new Error("API Error"));

    await expect(getCurrentUserWeather(0, 0)).rejects.toThrow("API Error");
    expect(api.get).toHaveBeenCalledWith("current.json?q=0,0");
  });

  
});
