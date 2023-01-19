import { GlobalStateContext } from "../../ContextWrapper";
import { useContext } from "react";
import { GamePrepareContainer } from "./GameBoard.styled";
import { Heading1, Heading4 } from "../../global.styled";
import { StartButton } from "../../pages/Start.styled";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSelector } from "@xstate/react";

const timer = (state: any) => {
  console.log("didit");
  return state.context.time;
};

const Counting = () => {
  const globalServices = useContext(GlobalStateContext);
  const getTimer = useSelector(globalServices.gameService, timer);
  const [seconds, setSeconds] = useState(getTimer);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      globalServices.gameService.send("END_COUNTING");
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
