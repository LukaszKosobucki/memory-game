import styled from "styled-components";
import { colors } from "../../global.styled";

export const GameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const GameBlockContainer = styled.div`
  background-color: ${colors.WhiteDamnationBasic};
  border-radius: 15px;
  margin: 5px;
  &:hover {
    background-color: ${colors.OrangeJusticeBasic};
  }
`;

export const GameInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 830px;
  text-align: center;
  align-items: center;
  height: 60px;
`;

export const GaveOver = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 350px;
`;

export const GaveOverInfo = styled.div`
  text-align: center;
`;

export const UserInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

export const UserInput = styled.input`
  border: none;
  background-color: ${colors.GreyUseless200};
  padding-left: 0.5rem;
  &:focus {
    outline: none;
    border: none;
  }
`;

export const GamePrepareContainer = styled(GaveOver)`
  gap: 3rem;
  height: 350px;
`;
