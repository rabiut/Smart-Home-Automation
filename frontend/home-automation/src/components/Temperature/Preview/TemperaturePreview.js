import { useState, useEffect } from "react";
import {
  // SliderContainer,
  // SliderWrapper,
  KnobSVG,
} from "../TemperatureElements";
import Loading from "@/components/Loading/Loading";
import CircularSlider from "@fseehawer/react-circular-slider";
import styled from "styled-components";
import { roundToHalf } from "@/lib/utils";
import { fetchData } from "@/lib/api";
const SliderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
`;

const MiniStatus = styled.div`
  position: absolute;
  font-size: 1.15rem;
  top: 0.5rem;
  right: 0.5rem;
  padding-left: 14px;
  &:before {
    content: "";
    position: absolute;
    height: 6px;
    width: 6px;
    top: calc(50% - 3px);
    left: 0;
    border-radius: 50%;
    background-color: ${({ isConnected }) => (isConnected ? "#9dfbcd" : "red")};
  }
`;

const TemperaturePreview = () => {
  const [currentTemperatureValue, setCurrentTemperatureValue] = useState(9);
  const [sliderValue, setSliderValue] = useState(9);
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState("off");
  const [hasChanged, setHasChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const dataRange = Array.from(
    { length: (32 - 9) * 2 + 1 },
    (_, i) => i * 0.5 + 9
  );

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setCurrentTemperatureValue(value);
    setHasChanged(true);
  };

  const computeTemperatureColor = (value) => {
    if (value >= 9 && value <= 16.5) {
      return "#009c9a";
    }
    if (value >= 17 && value <= 24.5) {
      return "#F0A367";
    }
    if (value >= 25 && value <= 32) {
      return "#F65749";
    }
    return "#009c9a";
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const data = await fetchData();
      let temperature = roundToHalf(data.temperature);
      setCurrentTemperatureValue(temperature);
      setIsLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchData();
        let temperature = roundToHalf(data.temperature);
        if (
          temperature !== null &&
          temperature !== undefined &&
          typeof temperature === "number" &&
          temperature >= 9 &&
          temperature <= 32
        ) {
          setCurrentTemperatureValue(temperature);
        }
        // Check if temperature is not null for isConnected
        setIsConnected(
          temperature !== null &&
            typeof temperature === "number" &&
            temperature >= 9 &&
            temperature <= 32
        );
      } catch (error) {
        console.error("Failed to fetch data", error);
        setIsConnected(false);
      }
      setIsLoading(false);
    };

    getData();
  }, []);

  return (
    <>
      {isConnected ? (
        <MiniStatus isConnected={isConnected}>Connected</MiniStatus>
      ) : (
        <MiniStatus isConnected={isConnected}>Not Connected</MiniStatus>
      )}
      <SliderContainer>
        {isLoading ? (
          <Loading />
        ) : (
          <SliderWrapper>
            {currentTemperatureValue !== null && (
              <CircularSlider
                label="°C"
                data={dataRange}
                width={180}
                height={180}
                dataIndex={dataRange.indexOf(currentTemperatureValue)}
                direction={1}
                knobPosition="left"
                appendToValue="°"
                continuous={{
                  enabled: false,
                }}
                labelFontSize="1.5rem"
                valueFontSize="4rem"
                trackColor="#eeeeee"
                progressColorFrom={computeTemperatureColor(sliderValue)}
                progressColorTo={computeTemperatureColor(sliderValue)}
                progressSize={20}
                labelColor={computeTemperatureColor(sliderValue)}
                trackSize={20}
                knobColor={computeTemperatureColor(sliderValue)}
                knobSize={35}
                knobDraggable={false}
                // isDragging={(value) => setIsDragging(value)}
                onChange={handleSliderChange}
              >
                <KnobSVG color={computeTemperatureColor(sliderValue)} />
              </CircularSlider>
            )}
          </SliderWrapper>
        )}
      </SliderContainer>
    </>
  );
};

export default TemperaturePreview;
