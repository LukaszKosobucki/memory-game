import { GlobalStateContext } from "../../utils/ContextWrapper";
import { useContext, useState, useEffect } from "react";
import { GamePrepareContainer } from "./GameBoard.styled";
import { Heading1 } from "../../global.styled";
import { motion } from "framer-motion";
import { useSelectors } from "../../utils/selectors";

const Counting = () => {
  const { gameService } = useContext(GlobalStateContext);
  const { getTimer } = useSelectors();
  const [seconds, setSeconds] = useState(getTimer);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      gameService.send({
        type: "END_COUNTING",
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
    </GamePrepareContainer>
  );
};

export default Counting;
