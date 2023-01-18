import { GlobalStateContext } from "../../ContextWrapper";
import { useContext } from "react";
import { GamePrepareContainer } from "./GameBoard.styled";
import { Heading1, Heading4 } from "../../global.styled";
import { StartButton } from "../../pages/Start.styled";

const Counting = () => {
  const globalServices = useContext(GlobalStateContext);

  const handleCounter = () => {
    globalServices.gameService.send("END_COUNTING");
  };
  return (
    <GamePrepareContainer>
      <Heading1>Counter Here</Heading1>
      <StartButton onClick={handleCounter}>
        <Heading4>End Timer</Heading4>
      </StartButton>
    </GamePrepareContainer>
  );
};

export default Counting;
