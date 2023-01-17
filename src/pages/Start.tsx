import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from "../global.styled";
import {
  GameDescription,
  StartButton,
  StartContainer,
  TitleContainer,
} from "./Start.styled";

const Start = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/game");
  };
  return (
    <motion.div
      key="Start"
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        height: "100vh",
        width: "100vw",
        maxHeight: "100vh",
        maxWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <StartContainer>
        <TitleContainer>
          <Heading1>Memory Game</Heading1>
          <Heading4>train your short-memory capacity and retention!</Heading4>
        </TitleContainer>
        <StartButton type="button" onClick={handleNavigate}>
          <Heading2>Start</Heading2>
        </StartButton>

        <GameDescription>
          <Heading3>How to play</Heading3>
          <Heading5>
            take a peek at the board for a short period of a time, after that
            try to reconstruct previous state by clicking correct squares. You
            can make maximum of 3 mistakes per level.
          </Heading5>
          <Heading3>Good Luck!</Heading3>
        </GameDescription>
      </StartContainer>
    </motion.div>
  );
};

export default Start;
