import styled from "styled-components";
import Link from "next/link";
export const CardWrap = styled.div`
  display: flex;
`;

export const Card = styled.div`
  width: 550px;
  height: 350px;
  /* margin: 1rem; */
  padding: 2.5rem;
  /* background: ${({ isFirstColor }) =>
    isFirstColor ? "#ffffff;" : "#f1f1f1"}; */
  background: ${({ isFirstColor }) =>
    isFirstColor ? "#dfe2ea" : "linear-gradient(145deg, #eff2fa, #c9cbd3)"};
  box-shadow: ${({ isFirstColor }) =>
    isFirstColor
      ? "8px 8px 31px #cfd2da, -8px -8px 31px #eff2fa"
      : "8px 8px 31px #cfd2da, -8px -8px 31px #eff2fa"};

  &:hover {
    transform: scale(1.05);
    transition: all 0.2s ease-in-out;
  }
`;

export const CardContent = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`;

export const TopContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const CardTitle = styled.h1`
  display: flex;
  font-size: 2rem;
  font-weight: 700;
  cursor: pointer;
  color: #232323;
`;

export const IconWrap = styled.div`
  cursor: pointer;
  color: #232323;
  margin-right: 1rem;
`;

export const CardInfoRight = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  cursor: pointer;
  color: #232323;
`;

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

export const ButtonWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: center;
  align-items: center;
`;
