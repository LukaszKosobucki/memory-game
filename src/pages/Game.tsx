import { motion } from "framer-motion";
import { useContext } from "react";
import Counting from "../components/game/Counting";
import GameBoard from "../components/game/GameBoard";
import GameOver from "../components/game/GameOver";
import GamePrepare from "../components/game/GamePrepare";
import { GlobalStateContext } from "../utils/ContextWrapper";
import { useSelectors } from "../utils/selectors";
import { variantsGame } from "../utils/variants";

const Game = () => {
  const {
    isCounting,
    getState,
    isPlaying,
    isPeekBoard,
    hasLost,
    getLevel,
    getSize,
  } = useSelectors();
  const globalServices = useContext(GlobalStateContext);

  return (
    <motion.div
      key="Start"
      variants={variantsGame[getState.value]}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        height: globalServices.height(),
        width: "100vw",
        maxHeight: "100vh",
        maxWidth: globalServices.height(),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        flexDirection: "column",
        gap: "4rem",
      }}
    >
      {isCounting ? (
        <Counting />
      ) : isPlaying || isPeekBoard ? (
        <GameBoard
          size={3}
          getLevel={getLevel}
          getSize={getSize}
          hasLost={hasLost}
        />
      ) : hasLost ? (
        <GameOver />
      ) : (
        <GamePrepare />
      )}
    </motion.div>
  );
};

export default Game;
