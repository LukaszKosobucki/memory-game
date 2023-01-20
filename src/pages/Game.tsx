import { motion } from "framer-motion";
import { useEffect } from "react";
import Counting from "../components/game/Counting";
import GameBoard from "../components/game/GameBoard";
import GameOver from "../components/game/GameOver";
import GamePrepare from "../components/game/GamePrepare";
import { useSelectors } from "../utils/selectors";

const Game = () => {
  const { isCounting, isPlaying, isPeekBoard, hasLost, getState } =
    useSelectors();

  useEffect(() => {
    console.log(getState.value);
  }, [getState.value]);

  return (
    <motion.div
      key="Start"
      transition={{ duration: 0.5 }}
      initial={{ top: "100vh" }}
      animate={{ top: 0 }}
      exit={{ opacity: 0 }}
      style={{
        height: "100vh",
        width: "100vw",
        maxHeight: "100vh",
        maxWidth: "100vw",
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
        <GameBoard size={3} />
      ) : hasLost ? (
        <GameOver />
      ) : (
        <GamePrepare />
      )}
    </motion.div>
  );
};

export default Game;
