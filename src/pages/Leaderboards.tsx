import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LeaderboardContainer } from "../components/leaderboards/Leaderboard.styled";
import LeaderboardList from "../components/leaderboards/LeaderboardList";
import { Heading1 } from "../global.styled";
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
        height: "100vh",
        width: "100vw",
        maxHeight: "100vh",
        maxWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        flexDirection: "column",
        gap: "3rem",
      }}
    >
      <LeaderboardContainer>
        <Heading1>Leaderboards</Heading1>
        <LeaderboardList />
        <StartButton type="button" onClick={handleStart}>
          <Heading1>Start Game</Heading1>
        </StartButton>
      </LeaderboardContainer>
    </motion.div>
  );
};

export default Leaderboards;
