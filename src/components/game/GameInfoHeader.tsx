import { Heading3, Heading4 } from "../../global.styled";
import { useSelectors } from "../../utils/selectors";
import { GameInfoContainer, TimerBlock } from "./GameBoard.styled";
import { useEffect, useState, useContext } from "react";
import { GlobalStateContext } from "../../utils/ContextWrapper";

const GameInfoHeader = () => {
  const globalServices = useContext(GlobalStateContext);
  const { hasLost, getLevel, getTimer, isPeekBoard, isPlaying, getWin } =
    useSelectors();
  const [seconds, setSeconds] = useState<number>(getTimer);
  const [gameTimer, setGameTimer] = useState<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (seconds >= 0) {
      if (isPlaying) {
        let timer = setTimeout(() => setSeconds(seconds - 1), 1000);
        setGameTimer(timer);
        globalServices.setUserTime(60 - seconds);
        if (seconds <= 0) {
          globalServices.gameService.send({
            type: "LOSE_GAME",
            newUserTime: globalServices.userTime,
            newUserErrors: globalServices.errorCounter,
            newUserCorrectBlocks: globalServices.correctCounter,
          });
          clearTimeout(gameTimer);
        }
      }
      if (getWin) {
        clearTimeout(gameTimer);
      }
      if (isPeekBoard) {
        let peekTimer = setTimeout(
          () => setSeconds(Math.round((seconds - 0.1) * 10) / 10),
          100
        );
        if (seconds === 0) {
          globalServices.gameService.send({
            type: "PEEK_BOARD",
          });
          clearTimeout(peekTimer);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  useEffect(() => {
    setSeconds(getTimer);
  }, [getTimer]);
  return (
    <GameInfoContainer>
      {!hasLost && <TimerBlock>level: {getLevel}</TimerBlock>}
      {hasLost ? (
        <Heading3>
          Your Score: {getLevel}
          <br /> Congratulations!
        </Heading3>
      ) : (
        <Heading4>errors: {globalServices.errorCounter}</Heading4>
      )}
      {!hasLost && (
        <TimerBlock>
          time:<TimerBlock>{seconds}</TimerBlock> s
        </TimerBlock>
      )}
    </GameInfoContainer>
  );
};

export default GameInfoHeader;
