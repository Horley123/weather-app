export interface IQueryError {
  message: string;
}
export interface IWeatherForecast {
  date: string;
  day: {
    condition: {
      icon: string;
      text: string;
    };
    maxtemp_c: number;
    mintemp_c: number;
    pressure_mb: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
}

export interface ICondition {
  text: string;
  icon: string;
  code: number;
}

export interface ICurrentWeather {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: ICondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}
export interface IWeatherData {
  location: {
    name: string;
    region: string;
    tz_id: string;
  };
  current: ICurrentWeather;
  forecast: {
    forecastday: IWeatherForecast[];
  };
}
