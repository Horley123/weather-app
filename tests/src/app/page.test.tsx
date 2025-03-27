import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@testing-library/jest-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { fetchWeather, getUserCity } from "@/services/requests";
import Home from "../../../src/app/page";

jest.mock("../../../src/services/requests");

const mockWeatherData = {
  location: { name: "Belo Horizonte" },
  current: {
    temp_c: 25,
    humidity: 60,
    wind_kph: 10,
    pressure_mb: 1013,
    condition: { text: "Ensolarado", icon: "https://icon-url.com" },
  },
  forecast: {
    forecastday: [
      {
        date: "2024-03-26",
        day: {
          maxtemp_c: 30,
          mintemp_c: 20,
          condition: { text: "Ensolarado", icon: "https://icon-url.com" },
        },
      },
    ],
  },
};

const mockCityData = {
  location: { name: "Belo Horizonte" },
};

beforeAll(() => {
  Object.defineProperty(global.navigator, "permissions", {
    value: {
      query: jest.fn().mockResolvedValue({ state: "granted" }),
    },
    configurable: true,
  });
});

describe("Home Component", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient = new QueryClient();
  });

  test("allows the user to change the city", async () => {
    (fetchWeather as jest.Mock).mockResolvedValue(mockWeatherData);
    (getUserCity as jest.Mock).mockResolvedValue(mockCityData);

    render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <Home />
        </ChakraProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Belo Horizonte/i)).toBeInTheDocument();
    });

    const select = await waitFor(() => screen.getByRole("combobox"));

    fireEvent.change(select, { target: { value: "São Paulo" } });

    await waitFor(() => {
      expect(select).toHaveValue("São Paulo");
    });
  });

  it("should set available cities correctly when geolocation permission is denied", async () => {
    const mockPermission = { state: "denied" };
    global.navigator.permissions.query = jest
      .fn()
      .mockResolvedValue(mockPermission);

    (fetchWeather as jest.Mock).mockResolvedValue(mockWeatherData);
    (getUserCity as jest.Mock).mockResolvedValue(null);

    render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <Home />
        </ChakraProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
  });
});
