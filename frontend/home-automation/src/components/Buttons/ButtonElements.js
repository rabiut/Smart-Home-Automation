import styled from "styled-components";
import Link from "next/link";

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  border-radius: 4px;
  background: ${({ primary }) => (primary ? "#232323" : "#232323")};
  white-space: nowrap;
  /* padding: ${({ big }) => (big ? "12px 64px" : "10px 20px")}; */
  padding: 10px 20px;
  color: #fefefe;
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease—in—out;
  min-width: 100px;

  &:hover {
    transition: all 0.3s ease—in—out;
    background: ${({ primary }) => (primary ? "#4f4f4f" : "#4f4f4f")};
  }
`;

export const ButtonLink = styled(Link)`
  border-radius: 4px;
  background: ${({ primary }) => (primary ? "#696868" : "#696868")};
  white-space: nowrap;
  /* padding: ${({ big }) => (big ? "12px 64px" : "10px 20px")}; */
  padding: 10px 20px;
  color: #fefefe;
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  text-decoration: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease—in—out;
  min-width: 100px;

  &:hover {
    transition: all 0.3s ease—in—out;
    background: ${({ primary }) => (primary ? "#4f4f4f" : "#4f4f4f")};
  }
`;
