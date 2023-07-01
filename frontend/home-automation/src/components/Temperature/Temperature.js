"use client";
import { useState, useEffect } from "react";
import { roundToHalf } from "@/lib/utils";
import { fetchData } from "@/lib/api";
import Loading from "@/components/Loading/Loading";
import {
  Widget,
  Container,
  Header,
  Body,
  SliderContainer,
  SliderWrapper,
  KnobSVG,
  Modes,
  Off,
  Cool,
  Heat,
  Button,
  DoneButton,
  Status,
} from "./TemperatureElements";
import CircularSlider from "@fseehawer/react-circular-slider";

const Temperature = () => {
  const [currentTemperatureValue, setCurrentTemperatureValue] = useState(9);
  const [sliderValue, setSliderValue] = useState(9);
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState("off");
  const [hasChanged, setHasChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const handleDoneClick = () => {
    setCurrentTemperatureValue(sliderValue);
    const temperatureData = {
      currentTemperatureValue: sliderValue,
      mode: mode,
    };
    console.log(temperatureData);
    setHasChanged(false);
  };

  const handleSliderChange = (value) => {
    if (value !== currentTemperatureValue) {
      setSliderValue(value);
      setCurrentTemperatureValue(value);
      setHasChanged(true);
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setHasChanged(true); // Set to true when mode changes
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
          setSliderValue(temperature);
          setHasChanged(false);
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

  const dataRange = Array.from(
    { length: (32 - 9) * 2 + 1 },
    (_, i) => i * 0.5 + 9
  );

  return (
    <>
      <Widget>
        <Container>
          <Header>
            <div className="left">
              <p>Home</p>
              {isConnected ? (
                <Status isConnected={isConnected}>Connected</Status>
              ) : (
                <Status isConnected={isConnected}>Disconnected</Status>
              )}
            </div>
            <div className="right">
              {hasChanged && (
                <DoneButton onClick={handleDoneClick}>Done</DoneButton>
              )}
            </div>
          </Header>
          <Body>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <SliderContainer>
                  <SliderWrapper>
                    {currentTemperatureValue !== null && (
                      <CircularSlider
                        label="Temperature °C"
                        data={dataRange}
                        dataIndex={dataRange.indexOf(currentTemperatureValue)}
                        direction={1}
                        knobPosition="left"
                        appendToValue="°"
                        continuous={{
                          enabled: false,
                        }}
                        labelFontSize="1rem"
                        valueFontSize="5rem"
                        trackColor="#eeeeee"
                        progressColorFrom={computeTemperatureColor(sliderValue)}
                        progressColorTo={computeTemperatureColor(sliderValue)}
                        progressSize={25}
                        labelColor={computeTemperatureColor(sliderValue)}
                        trackSize={25}
                        knobColor={computeTemperatureColor(sliderValue)}
                        knobSize={50}
                        isDragging={(value) => setIsDragging(value)}
                        onChange={(value) => handleSliderChange(value)}
                      >
                        <KnobSVG color={computeTemperatureColor(sliderValue)} />
                      </CircularSlider>
                    )}
                  </SliderWrapper>
                </SliderContainer>
                <Modes>
                  <Off>
                    <Button
                      mode={mode}
                      onClick={() => handleModeChange("off")}
                      selected={mode === "off"}
                    >
                      OFF
                    </Button>
                  </Off>

                  <Heat>
                    <Button
                      mode={mode}
                      onClick={() => handleModeChange("heat")}
                      selected={mode === "heat"}
                    >
                      HEAT
                    </Button>
                  </Heat>

                  <Cool>
                    <Button
                      mode={mode}
                      onClick={() => handleModeChange("cool")}
                      selected={mode === "cool"}
                    >
                      COOL
                    </Button>
                  </Cool>
                </Modes>
              </>
            )}
          </Body>
        </Container>
      </Widget>
    </>
  );
};

export default Temperature;
