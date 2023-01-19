import { GlobalStateContext } from "../../ContextWrapper";
import { useContext } from "react";
import { GamePrepareContainer } from "./GameBoard.styled";
import { Heading1, Heading4 } from "../../global.styled";
import { StartButton } from "../../pages/Start.styled";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSelectors } from "../../utils/selectors";

const Counting = () => {
  const globalServices = useContext(GlobalStateContext);
  const { getTimer, getLevel, mockBoardMaker } = useSelectors();
  const [seconds, setSeconds] = useState(getTimer);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      const board = mockBoardMaker(getLevel);
      console.log("BOARD HERE ", board);
      globalServices.gameService.send({
        type: "END_COUNTING",
        newBoard: board,
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
