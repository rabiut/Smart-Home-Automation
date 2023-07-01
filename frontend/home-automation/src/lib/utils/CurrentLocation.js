"use client";
import { useState, useEffect } from "react";

function CurrentLocation() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [place, setPlace] = useState(null);

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
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lon}`
      )
        .then((response) => response.json())
        .then((data) => setPlace(`${data.address.city}, ${data.address.state}`))
        .catch((error) => console.log(error));
    }
  }, [location]);

  return <>{place ? `Location: ${place}` : "Location: Loading..."}</>;
}

export default CurrentLocation;
