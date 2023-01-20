import styled from "styled-components";
import { colors } from "../../global.styled";
import { motion } from "framer-motion";

export const GameContainer = styled.div<{ boardSize: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${(props) => `${props.boardSize}px`};
  width: ${(props) => `${props.boardSize}px`};
  justify-content: center;
  flex-wrap: wrap;
`;

export const GameBlockContainer = styled.div<{
  blockSize: number;
  selected: boolean;
  hover: boolean;
}>`
  background-color: ${(props) =>
    props.selected ? colors.OrangeJusticeBasic : colors.WhiteDamnationBasic};
  border-radius: 15px;
  margin: 5px;
  height: ${(props) => `${props.blockSize}px`};
  width: ${(props) => `${props.blockSize}px`};
  &:hover {
    ${(props) =>
      props.hover && `background-color: ${colors.OrangeJusticeBasic}`};
  }
`;

export const GameInfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  width: 830px;
  text-align: center;
  align-items: center;
  height: 60px;
`;

export const GaveOver = styled(motion.div)`
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
  display: flex;
  justify-content: center;
  align-items: center;
`;
