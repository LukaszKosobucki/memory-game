import { Heading3, Heading4, Heading5 } from "../../global.styled";
import {
  GameInfoContainer,
  TimerBlockH4,
  TimerBlockH5,
  TimerStatic,
  TimerStaticMobile,
} from "./GameBoard.styled";
import { useTimer } from "./useTImer";

const GameInfoHeader = ({
  hasLost,
  getLevel,
}: {
  hasLost: boolean;
  getLevel: number;
}) => {
  const [matches, errorCounter, seconds] = useTimer();
  return (
    <>
      {!matches ? (
        !hasLost ? (
          <GameInfoContainer>
            <TimerBlockH4>level: {getLevel}</TimerBlockH4>
            <Heading4>errors: {errorCounter}</Heading4>
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
          <Heading5>errors: {errorCounter}</Heading5>
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
