import { GlobalStateContext } from "../../ContextWrapper";
import { useContext } from "react";
import { GamePrepareContainer } from "./GameBoard.styled";
import { Heading1, Heading4 } from "../../global.styled";
import { StartButton } from "../../pages/Start.styled";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSelectors } from "../../utils/selectors";
import { TBoard } from "./GameBoard";

const Counting = () => {
  const globalServices = useContext(GlobalStateContext);
  const { getTimer, getLevel, mockBoardMaker, getState } = useSelectors();
  const [seconds, setSeconds] = useState(getTimer);
  const [board, setBoard] = useState<TBoard[]>([]);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      console.log("BOARD HERE ");
      globalServices.gameService.send({
        type: "END_COUNTING",
        newBoard: mockBoardMaker(getLevel),
      });
    }
  });

  return (
    <GamePrepareContainer
      as={motion.div}
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Heading1>{seconds}</Heading1>
      <StartButton>
        <Heading4>End Timer</Heading4>
      </StartButton>
    </GamePrepareContainer>
  );
};

export default Counting;
