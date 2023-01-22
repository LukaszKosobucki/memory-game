import styled from "styled-components";
import { colors, Heading4, Heading5 } from "../../global.styled";
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
  wrongSelected: boolean | undefined;
  marginSize: number;
}>`
  background-color: ${(props) => {
    if (props.selected) {
      return colors.OrangeJusticeBasic;
    } else if (props.wrongSelected) {
      return colors.GreyUselessBasic;
    }
    return colors.WhiteDamnationBasic;
  }};
  border-radius: 15px;
  margin: ${(props) => `${props.marginSize}px`};
  height: ${(props) => `${props.blockSize}px`};
  width: ${(props) => `${props.blockSize}px`};
  ${(props) =>
    props.wrongSelected &&
    `animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both`};
  &:hover {
    ${(props) =>
      props.hover &&
      !props.wrongSelected &&
      `background-color: ${colors.OrangeJusticeBasic}`};
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
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

//change to paragraph styles, with lower margin to top
export const ErrorMessage = styled(Heading5)`
  margin-top: -1.5rem;
  color: ${colors.OrangeJusticeBasic};
`;
export const TimerBlock = styled(Heading4)`
  width: 110px;
  display: flex;
  justify-content: center;
`;
export const TimerStatic = styled.span`
  width: 110px;
  display: flex;
  justify-content: center;
`;
