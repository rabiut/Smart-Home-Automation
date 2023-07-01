"use client";
import { useState, useEffect } from "react";

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = currentTime.toLocaleTimeString([], options);

  return <>{formattedTime}</>;
}

export default CurrentTime;
