import { useNavigate } from "react-router-dom";
import { Heading1, Heading4, Heading5 } from "../../global.styled";
import { StartButton } from "../../pages/Start.styled";
import {
  GaveOver,
  GaveOverInfo,
  UserInput,
  UserInputContainer,
} from "./GameBoard.styled";
import { useContext } from "react";
import { GlobalStateContext } from "../../ContextWrapper";
import GameInfoHeader from "./GameInfoHeader";

const GameOver = () => {
  const globalServices = useContext(GlobalStateContext);

  const handleRetry = () => {
    globalServices.gameService.send("RETRY");
  };
  const navigate = useNavigate();

  const handleLeaderboards = () => {
    navigate("/leaderboards");
  };

  const handleSubmit = () => {
    return true;
  };

  return (
    <GaveOver>
      <GameInfoHeader />
      <GaveOverInfo>
        <Heading5>
          enter your name to preserve the record on the leaderboards
        </Heading5>
      </GaveOverInfo>
      <UserInputContainer>
        <Heading5>username:</Heading5>
        <UserInput type="text" />
        <StartButton type="button" onClick={handleSubmit}>
          <Heading5>submit</Heading5>
        </StartButton>
      </UserInputContainer>
      <StartButton type="button" onClick={handleRetry}>
        <Heading1>Retry</Heading1>
      </StartButton>
      <StartButton type="button" onClick={handleLeaderboards}>
        <Heading4>View Leaderboards</Heading4>
      </StartButton>
    </GaveOver>
  );
};

export default GameOver;
