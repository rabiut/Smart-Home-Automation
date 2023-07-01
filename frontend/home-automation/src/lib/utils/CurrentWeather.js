"use client";
import { useState, useEffect } from "react";

function CurrentWeather() {
  // https://api.openweathermap.org/data/3.0/onecall?lat=43.256531&lon=-79.874420&appid=9756985ce243ba8ee1544d1e0fbbb46f
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [weather, setWeather] = useState({ temp: null, humidity: null });
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Temperature is given in Kelvin by default, converting it to Celsius
          const tempCelsius = data.current.temp - 273.15;
          setWeather({
            temp: tempCelsius.toFixed(2),
            humidity: data.current.humidity,
          });
        })
        .catch((error) => console.log(error));
    }
  }, [location, API_KEY]);

  return (
    <>
      {weather.temp && weather.humidity
        ? `Temperature: ${weather.temp}°C, Humidity: ${weather.humidity}%`
        : "Weather: Loading..."}
    </>
  );
}

export default CurrentWeather;
