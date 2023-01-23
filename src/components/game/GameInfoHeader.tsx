import { Heading3, Heading4, Heading5 } from "../../global.styled";
import { useSelectors } from "../../utils/selectors";
import {
  GameInfoContainer,
  TimerBlockH4,
  TimerBlockH5,
  TimerStatic,
  TimerStaticMobile,
} from "./GameBoard.styled";
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
        if (seconds <= 0) {
          globalServices.setErrorCounter(0);
          globalServices.setCorrectCounter(0);
          globalServices.setIsInputDisabled(false);
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
        globalServices.setUserTime(60 - seconds);
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
    <>
      {!globalServices.matches ? (
        !hasLost ? (
          <GameInfoContainer>
            <TimerBlockH4>level: {getLevel}</TimerBlockH4>
            <Heading4>errors: {globalServices.errorCounter}</Heading4>
            <TimerBlockH4>
              time:<TimerStatic>{seconds}</TimerStatic> s
            </TimerBlockH4>
          </GameInfoContainer>
        ) : (
          <GameInfoContainer>
            <Heading3>
              Your Score: {getLevel}
              <br /> Congratulations!
            </Heading3>
          </GameInfoContainer>
        )
      ) : !hasLost ? (
        <GameInfoContainer>
          <TimerBlockH5>level: {getLevel}</TimerBlockH5>
          <Heading5>errors: {globalServices.errorCounter}</Heading5>
          <TimerBlockH5>
            time:<TimerStaticMobile>{seconds}</TimerStaticMobile> s
          </TimerBlockH5>
        </GameInfoContainer>
      ) : (
        <GameInfoContainer>
          <Heading3>
            Your Score: {getLevel}
            <br /> Congratulations!
          </Heading3>
        </GameInfoContainer>
      )}
    </>
  );
};

export default GameInfoHeader;
