import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LeaderboardContainer } from "../components/leaderboards/Leaderboard.styled";
import LeaderboardList from "../components/leaderboards/LeaderboardList";
import { Heading1, Heading2 } from "../global.styled";
import { StartButton } from "./Start.styled";
import { useContext } from "react";
import { GlobalStateContext } from "../utils/ContextWrapper";

const Leaderboards = () => {
  const navigate = useNavigate();
  const globalServices = useContext(GlobalStateContext);

  const handleStart = () => {
    globalServices.gameService.send("RETRY");
    navigate("/game");
  };

  return (
    <motion.div
      key="Leaderboards"
      transition={{ duration: 0.5 }}
      initial={{ left: "100vh" }}
      animate={{ left: 0 }}
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
        gap: "3rem",
      }}
    >
      <LeaderboardContainer>
        {globalServices.matches ? (
          <Heading2>Leaderboards</Heading2>
        ) : (
          <Heading1>Leaderboards</Heading1>
        )}

        <LeaderboardList />
        <StartButton type="button" onClick={handleStart}>
          {globalServices.matches ? (
            <Heading2>Start Game</Heading2>
          ) : (
            <Heading1>Start Game</Heading1>
          )}
        </StartButton>
      </LeaderboardContainer>
    </motion.div>
  );
};

export default Leaderboards;
