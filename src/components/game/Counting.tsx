import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Heading1 } from "../../global.styled";
import { GlobalStateContext } from "../../utils/ContextWrapper";
import { useSelectors } from "../../utils/selectors";
import { GamePrepareContainer } from "./GameBoard.styled";

const Counting = () => {
  const { gameService } = useContext(GlobalStateContext);
  const { getTimer } = useSelectors();
  const [seconds, setSeconds] = useState(getTimer);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      gameService.send({
        type: "END_COUNTING",
      });
    }
  }, [seconds, gameService]);

  return (
    <GamePrepareContainer
      as={motion.div}
      transition={{ duration: 0.5 }}
      initial={{ y: "100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "100vh" }}
    >
      <Heading1>{seconds}</Heading1>
    </GamePrepareContainer>
  );
};

export default Counting;
