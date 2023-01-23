import styled from "styled-components";
import { colors } from "../global.styled";

export const StartButton = styled.button`
  background: transparent;
  color: ${colors.WhiteDamnationBasic};
  border: none;
  cursor: pointer;
  margin: auto;
  animation: glow 1s infinite alternate;
  @keyframes glow {
    to {
      text-shadow: 0 0 10px ${colors.OrangeJusticeBasic};
    }
  }
  @media (max-width: 390px) {
    margin: 0;
  }
  &:disabled {
    color: ${colors.GreyUseless50};
    animation: none;
  }
`;

export const StartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 640px;
  height: 600px;
  @media (max-width: 390px) {
    width: 100vw;
    gap: 4rem;
  }
`;

export const GameDescription = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 480px;
  gap: 1rem;
  @media (max-width: 390px) {
    width: 291px;
  }
`;

export const TitleContainer = styled(GameDescription)`
  width: 590px;
  @media (max-width: 390px) {
    width: 291px;
  }
`;
