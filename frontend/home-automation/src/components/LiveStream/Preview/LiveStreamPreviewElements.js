import styled from "styled-components";

export const VideoWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
  width: 65%; // You may want to adjust this based on your design
  height: 0;
  padding-bottom: 36.5625%; // This is for a 16:9 aspect ratio
  /* 100% === 56.25% */
  background: rgba(0, 0, 0, 0.1);
  overflow: hidden; // Optional, to ensure content doesn't spill over
`;
