import styled from "styled-components";

export const Widget = styled.div`
  max-width: 500px;
  width: 500px;
  background-image: linear-gradient(135deg, #ffffff, #eef0f7);
  border-radius: 36px;
  box-shadow: -16px -16px 24px rgba(255, 255, 255, 0.3),
    -16px -16px 24px rgba(0, 0, 0, 0.08);

  @media screen and (max-width: 768px) {
    width: 90vw;
  }
`;
export const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 58px;
  .left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  p {
    font-size: 1.5rem;
    font-weight: 600;
  }
  span {
    position: relative;
    font-size: 12px;
    padding-left: 14px;
    font-weight: 300;
  }
  span:before {
    content: "";
    position: absolute;
    height: 6px;
    width: 6px;
    top: calc(50% - 3px);
    left: 0;
    border-radius: 50%;
    background-color: #9dfbcd;
  }
`;

export const PowerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  transition: all linear 0.3s;
  background-image: ${(props) =>
    props.isChecked
      ? "linear-gradient(135deg, #009c9a, #009c9a)"
      : "linear-gradient(135deg, #f0f1fa, #ffffff)"};
  color: ${(props) => (props.isChecked ? "#ffffff" : "initial")};
  box-shadow: ${(props) =>
    props.isChecked
      ? "6px 6px 18px rgba(0, 0, 0, 0.08), -4px -4px 4px #ffffff, inset 6px 6px 18px rgba(0, 0, 0, 0.08), inset -4px -4px 4px rgba(255, 255, 255, 0.3)"
      : "6px 6px 18px rgba(0, 0, 0, 0.08), -4px -4px 4px #ffffff"};
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const SliderContainer = styled.div``;
export const SliderWrapper = styled.div``;
export const KnobSVG = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${(color) => (color ? color : "#009c9a")};
`;

export const Modes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    height: 200px;
  }
`;
export const Off = styled.div``;
export const Heat = styled.div``;
export const Cool = styled.div``;
export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease—in—out;
  min-width: 100px;
  height: 50px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  padding: 10px 20px;
  margin: 0 8px;
  border-radius: 12px;
  border: none;
  background-color: ${(props) => (props.selected ? "#009c9a" : "#696868")};
  color: #ffffff;
  /* background-image: #b8b8b8; */
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.08), -4px -4px -4px #ffffff;

  &:hover {
    transition: all 0.3s ease—in—out;
    background-color: #009c9a;
    color: #ffffff;
  }
`;

export const DoneButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease—in—out;
  min-width: 6.5rem;
  height: 3.5rem;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  padding: 10px 20px;
  margin: 0 8px;
  border-radius: 0.5rem;
  background-color: #009c9a;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease—in—out;
    background-color: #007d7b;
    color: #ffffff;
  }
`;

export const Status = styled.div`
  position: relative;
  font-size: 12px;
  padding-left: 14px;
  font-weight: 300;

  &:before {
    content: "";
    position: absolute;
    height: 6px;
    width: 6px;
    top: calc(50% - 3px);
    left: 0;
    border-radius: 50%;
    /* background-color: #9dfbcd; */
    background-color: ${({ isConnected }) => (isConnected ? "#9dfbcd" : "red")};
  }
`;
