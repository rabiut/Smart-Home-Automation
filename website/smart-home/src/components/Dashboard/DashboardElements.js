import styled from "styled-components";

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #232323;
  margin-bottom: 3rem;
`;

export const DashboardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 10rem;
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  width: fit-content;
  gap: 2rem;
`;
