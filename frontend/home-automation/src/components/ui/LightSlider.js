import { Slider } from "@/components/ui/slider";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import React, { useState } from "react";
const LightSlider = ({ initialBrightness }) => {
  const [sliderValue, setSliderValue] = useState(
    initialBrightness !== null ? initialBrightness : 50
  );

  const max = 255;
  const min = 0;
  const step = 51; // 1, 3, 5, 15, 17, 51, 85, 255

  const increase = () => {
    if (sliderValue < max) {
      setSliderValue((prev) => prev + step);
    }
  };

  const decrease = () => {
    if (sliderValue > min) {
      setSliderValue((prev) => prev - step);
    }
  };
  return (
    <>
      <div className="flex justify-between w-full">
        <button onClick={decrease}>
          <AiOutlineMinus />
        </button>
        <Slider
          className="mx-4"
          value={[sliderValue]}
          min={min}
          max={max}
          step={step}
          onValueChange={([value]) => setSliderValue(value)}
        />
        <button onClick={increase}>
          <AiOutlinePlus />
        </button>
      </div>
    </>
  );
};

export default LightSlider;
