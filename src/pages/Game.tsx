import { motion } from "framer-motion";
import GameBoard from "../components/game/GameBoard";
import { GameInfoContainer } from "../components/game/GameBoard.styled";
import GameOver from "../components/game/GameOver";
import GamePrepare from "../components/game/GamePrepare";
import { Heading3, Heading4 } from "../global.styled";

const Game = () => {
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
        <Heading4>level: 1</Heading4>
        {true ? (
          <Heading3>
            Your Score: 15!
            <br /> Congratulations!
          </Heading3>
        ) : null}
        <Heading4>time: 60s</Heading4>
      </GameInfoContainer>
      {/* <GameBoard size={3} /> */}
      {/* <GamePrepare /> */}
      <GameOver />
    </motion.div>
  );
};

export default Game;
