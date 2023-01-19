import { Heading3, Heading4 } from "../../global.styled";
import { useSelectors } from "../../utils/selectors";
import { GameInfoContainer } from "./GameBoard.styled";
import { useEffect, useState, useContext } from "react";
import { GlobalStateContext } from "../../ContextWrapper";

const GameInfoHeader = () => {
  const globalServices = useContext(GlobalStateContext);

  const { hasLost, getLevel, getTimer, isPeekBoard, isPlaying } =
    useSelectors();
  const [seconds, setSeconds] = useState<number>(getTimer);
  const [win, setWin] = useState<boolean>(false);

  useEffect(() => {
    if (seconds >= 0) {
      let gameTimer = setTimeout(() => setSeconds(seconds - 1), 1000);
      if (!isPlaying && win) {
        clearTimeout(gameTimer);
      } else if (isPeekBoard && seconds === 0) {
        clearTimeout(gameTimer);
        globalServices.gameService.send({
          type: "PEEK_BOARD",
        });
      }
    } else {
      globalServices.gameService.send("LOSE_GAME");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  useEffect(() => {
    setSeconds(getTimer);
  }, [getTimer]);
  return (
    <GameInfoContainer>
      {!hasLost && <Heading4>level: {getLevel}</Heading4>}

      {hasLost && (
        <Heading3>
          Your Score: {getLevel}!
          <br /> Congratulations!
        </Heading3>
      )}
      {!hasLost && <Heading4>time: {seconds}s</Heading4>}
    </GameInfoContainer>
  );
};

export default GameInfoHeader;
