import { Heading3, Heading4 } from "../../global.styled";
import { useSelectors } from "../../utils/selectors";
import { GameInfoContainer } from "./GameBoard.styled";

const GameInfoHeader = ({ seconds }: { seconds: number | null }) => {
  const { hasLost, getLevel } = useSelectors();
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
