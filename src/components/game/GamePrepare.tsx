import { Heading1, Heading4 } from "../../global.styled";
import { StartButton } from "../../pages/Start.styled";
import { GamePrepareContainer } from "./GameBoard.styled";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalStateContext } from "../../utils/ContextWrapper";

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
    <GamePrepareContainer>
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
