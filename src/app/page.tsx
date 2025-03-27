"use client";
import React, { useEffect, useState } from "react";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { BiLocationPlus } from "react-icons/bi";
import { Card } from "./components/Card";
import {
  formatDateWithTimezone,
  formatDayAbbr,
  formatTimeWithTimezone,
} from "./utils/date";
import { WeatherData, WeatherForecast, QueryError } from "./dtos";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather, getUserCity } from "./services/requests";
import WeatherSkeleton from "./components/WeatherSkeleton";
import { CITIES_ENUM, weatherTranslations } from "./utils/enuns";
import { SelectComponent } from "./components/Select";

export default function Home() {
  const [city, setCity] = useState<string>("Belo Horizonte");
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const { data, isLoading, error, refetch } = useQuery<WeatherData, QueryError>(
    {
      queryKey: ["weather", city],
      queryFn: () => fetchWeather(city),
      staleTime: 1000 * 60 * 5,
    }
  );

  const { data: cityData, isLoading: cityIsLoading } = useQuery<
    Omit<WeatherData, "forecast">,
    QueryError
  >({
    queryKey: ["weather"],
    queryFn: getUserCity,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        if (cityData) {
          setCity(cityData.location.name);
          setAvailableCities((prevCities) => [
            cityData.location.name,
            ...CITIES_ENUM,
          ]);

          refetch();
        }
      } else if (result.state === "denied") {
        setAvailableCities((prevCities) => [...CITIES_ENUM]);
        refetch();
      }
    });
  }, [cityData]);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(event.target.value);
  };

  if (isLoading || cityIsLoading)
    return <WeatherSkeleton condition={data?.current.condition.text!} />;
  if (error)
    return <p>Erro ao buscar os dados: {(error as QueryError).message}</p>;

  return (
    <Flex
      flex={1}
      direction="column"
      height="100vh"
      backgroundColor="#00BFFF"
      backgroundImage={`url('./assets/${
        weatherTranslations[data?.current.condition.text!]
      }.png')`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      transition="background-image 0.5s ease-in-out"
    >
      <Flex justifyContent="flex-end" w={"100%"} padding="20px 20px" gap={3}>
        <SelectComponent
          availableCities={availableCities}
          onChange={handleCityChange}
          defaultValue={city}
        />
      </Flex>
      <Flex flex={1} direction="column">
        <>
          <Flex
            justifyContent="space-between"
            flex={1}
            direction="row"
            padding="0px 80px"
            flexWrap={"wrap"}
            alignItems={"center"}
            gap={20}
          >
            <Flex
              justifyContent="center"
              direction="column"
              fontSize="25px"
              textAlign="center"
            >
              <Flex direction="row" alignItems="center" justifyContent="center">
                <Icon>
                  <BiLocationPlus color={"white"} />
                </Icon>
                <Text fontSize="20px">{city}</Text>
              </Flex>

              <Text fontSize="30px">
                {formatDateWithTimezone(data?.location.tz_id!)}
              </Text>
              <Text fontSize="70px">
                {formatTimeWithTimezone(data?.location.tz_id!)}
              </Text>

              <Text fontSize="20px">
                {weatherTranslations[data?.current.condition.text!]}
              </Text>
            </Flex>

            <Flex
              justifyContent="center"
              direction="column"
              fontSize="25px"
              textAlign="center"
              fontWeight={"bold"}
            >
              <Text>PRESSÃO: {data?.current.pressure_mb} hPa</Text>
              <Text>UMIDADE: {data?.current.humidity} %</Text>
              <Text>VELOCIDADE DO VENTO: {data?.current.wind_kph} KM/H</Text>

              <Text fontSize="60px">{data?.current.temp_c} °C</Text>
            </Flex>
          </Flex>
        </>

        <Flex
          gap={5}
          overflowX="auto"
          direction="row"
          wrap="nowrap"
          alignItems="flex-end"
          paddingLeft="40px"
          height={"50%"}
          paddingBottom={"40px"}
        >
          {data?.forecast.forecastday.map((day: WeatherForecast) => (
            <Card
              key={day.date}
              dia={formatDayAbbr(day.date)}
              img_src={day.day.condition.icon}
              max_temp={day.day.maxtemp_c}
              min_temp={day.day.mintemp_c}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
