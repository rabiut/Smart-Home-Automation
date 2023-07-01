"use client";
import { useState, useEffect } from "react";
import CurrentDate from "@/lib/utils/CurrentDate";
import CurrentLocation from "@/lib/utils/CurrentLocation";

function HomeWidget() {
  const [weather, setWeather] = useState({ temp: null, humidity: null });
  const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY;

  useEffect(() => {
    // Get the weather data when the component mounts
    const location = {
      lat: 43.256531,
      lon: -79.87442,
    };

    const fetchWeatherData = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
      );

      const data = await res.json();

      // Temperature is given in Kelvin by default, converting it to Celsius
      const tempCelsius = data.main.temp - 273.15;
      setWeather({
        temp: tempCelsius.toFixed(2),
        humidity: data.main.humidity,
      });
    };

    fetchWeatherData();
  }, [API_KEY]);

  return (
    <>
      <div className="home__widget flex flex-col h-full text-base lg:text-lg xl:text-xl bg-white shadow-md border border-gray-200 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
        <div className="bar w-full h-1/5 bg-primary-500 p-4 text-white font-bold rounded-t-lg">
          Your Home
        </div>
        <div className="content w-full h-4/5 p-6 sm:p-4 flex flex-col justify-between">
          <span>
            Condition:
            <span className="condition text-green-500 ml-4">Good</span>
          </span>
          <span>
            <CurrentDate />
          </span>
          <span>
            <CurrentLocation />
          </span>
          <div className="stats flex gap-4 ">
            <div className="flex flex-col font-semibold">
              TEMP{" "}
              <span className="text-xl md:text-xl font-normal">
                {weather.temp}°C
              </span>
            </div>
            <div className="flex flex-col font-semibold">
              Humidity{" "}
              <span className="text-xl md:text-xl font-normal">
                {weather.humidity}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeWidget;
