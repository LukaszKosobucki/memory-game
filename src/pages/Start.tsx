import { motion } from "framer-motion";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "../global.styled";
import { GlobalStateContext } from "../utils/ContextWrapper";
import {
  GameDescription,
  StartButton,
  StartContainer,
  TitleContainer,
} from "./Start.styled";

const Start = () => {
  const navigate = useNavigate();
  const globalServices = useContext(GlobalStateContext);

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
        height: globalServices.height(),
        width: "100vw",
        maxHeight: globalServices.height(),
        maxWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <StartContainer>
        {globalServices.matches ? (
          <TitleContainer>
            <Heading3>Memory Game</Heading3>
            <Heading6>train your short-memory capacity and retention!</Heading6>
          </TitleContainer>
        ) : (
          <TitleContainer>
            <Heading1>Memory Game</Heading1>
            <Heading4>train your short-memory capacity and retention!</Heading4>
          </TitleContainer>
        )}

        <StartButton type="button" onClick={handleNavigate}>
          {globalServices.matches ? (
            <Heading3>Start</Heading3>
          ) : (
            <Heading2>Start</Heading2>
          )}
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
