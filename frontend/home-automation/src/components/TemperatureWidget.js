import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Dropdown from "./Dropdown";

const TemperatureWidget = () => {
  // Initialize a state variable for the slider value
  const [sliderValue, setSliderValue] = useState(null);
  const [mode, setMode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const max = 32.5;
  const min = 9;
  const step = 0.5;

  const modes = ["HEAT", "COOL", "FAN"]; // Modes

  useEffect(() => {
    fetch("http://192.168.2.43:5000/api/v1/gettttModeAndTemp")
      .then((response) => response.json())
      .then((data) => {
        setSliderValue(data.temperature);
        setMode(data.mode);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(
          "Error fetching temperature and mode. Please try again later."
        );
      });
  }, []);

  // Increase temperature
  const increaseTemp = () => {
    if (sliderValue < max) {
      setSliderValue((prevTemp) => prevTemp + step);
    }
  };

  // Decrease temperature
  const decreaseTemp = () => {
    if (sliderValue > min) {
      setSliderValue((prevTemp) => prevTemp - step);
    }
  };

  // Change mode
  const handleChangeMode = (e) => {
    setMode(e.target.value);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          Loading...
        </div>
      ) : errorMessage ? (
        <div className="flex items-center justify-center w-full h-full">
          {errorMessage}
        </div>
      ) : (
        <>
          <div className="title font-bold ">Temperature</div>
          <div className="content flex flex-col justify-center h-full rounded-lg pt-4">
            <div className="text-4xl mb-2 text-center">
              {sliderValue ? sliderValue.toFixed(2) : 0}° C
            </div>
            <div className="text-base mb-4 text-center uppercase">
              {" "}
              Mode: {mode}
            </div>
            <div>
              <Slider
                value={[sliderValue]}
                min={min}
                max={max}
                step={step}
                onValueChange={([value]) => setSliderValue(value)}
              />
            </div>
            <div className="flex justify-evenly mt-4 text-2xl">
              <button onClick={decreaseTemp}>
                <AiOutlineMinus />
              </button>
              <button onClick={increaseTemp}>
                <AiOutlinePlus />
              </button>
            </div>
            <Dropdown
              options={modes}
              selectedOption={mode}
              onSelect={setMode}
            />
          </div>
        </>
      )}
    </>
  );
};

export default TemperatureWidget;
