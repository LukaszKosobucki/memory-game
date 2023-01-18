import { motion } from "framer-motion";
import { useContext } from "react";
import Counting from "../components/game/Counting";
import GameBoard from "../components/game/GameBoard";
import { GameInfoContainer } from "../components/game/GameBoard.styled";
import GameOver from "../components/game/GameOver";
import GamePrepare from "../components/game/GamePrepare";
import { Heading3, Heading4 } from "../global.styled";
import { useSelector } from "@xstate/react";
import { GlobalStateContext } from "../ContextWrapper";

const counting = (state: any) => {
  return state.matches("counting");
};
const playing = (state: any) => {
  return state.matches("playing");
};
const endGame = (state: any) => {
  return state.matches("endGame");
};
const level = (state: any) => {
  return state.context.level;
};

const Game = () => {
  const globalServices = useContext(GlobalStateContext);
  const isCounting = useSelector(globalServices.gameService, counting);
  const isPlaying = useSelector(globalServices.gameService, playing);
  const hasLost = useSelector(globalServices.gameService, endGame);
  const getLevel = useSelector(globalServices.gameService, level);

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
      <GameInfoContainer>
        <Heading4>level: {getLevel}</Heading4>
        {hasLost ? (
          <Heading3>
            Your Score: {getLevel}!
            <br /> Congratulations!
          </Heading3>
        ) : null}
        <Heading4>time: 60s</Heading4>
      </GameInfoContainer>
      {isCounting ? (
        <Counting />
      ) : isPlaying ? (
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
