import styled from "styled-components";

export const TemperatureDisplayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const TemperatureDisplay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
  background-color: ${({ temperatureColor }) =>
    temperatureColor === "hot" ? "red" : "blue"};
  font-size: 7rem;
  font-weight: 700;
  color: white;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid darkblue;
  /* color: ${({ temperatureColor }) =>
    temperatureColor === "hot" ? "red" : "blue"}; */
`;
