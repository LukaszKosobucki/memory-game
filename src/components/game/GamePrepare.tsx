import { Heading1, Heading4 } from "../../global.styled";
import { StartButton } from "../../pages/Start.styled";
import { GamePrepareContainer } from "./GameBoard.styled";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalStateContext } from "../../utils/ContextWrapper";
import { motion } from "framer-motion";

const GamePrepare = () => {
  const navigate = useNavigate();
  const globalServices = useContext(GlobalStateContext);

  const handleStart = () => {
    globalServices.gameService.send({
      type: "START",
    });
  };
  const handleLeaderboards = () => {
    navigate("/leaderboards");
  };
  return (
    <GamePrepareContainer
      as={motion.div}
      transition={{ duration: 0.5 }}
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
    >
      <StartButton onClick={handleStart}>
        <Heading1>Take a peek</Heading1>
      </StartButton>
      <StartButton onClick={handleLeaderboards}>
        <Heading4>View Leaderboard</Heading4>
      </StartButton>
    </GamePrepareContainer>
  );
};

export default GamePrepare;
