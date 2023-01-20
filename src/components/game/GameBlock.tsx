import { useSelectors } from "../../utils/selectors";
import { GameBlockContainer } from "./GameBoard.styled";

const GameBlock = ({
  id,
  size,
  selected,
  hover,
  canClick,
}: {
  id: number;
  size: number;
  selected: boolean;
  hover: boolean;
  canClick: boolean;
}) => {
  const { handleClick } = useSelectors();
  const blockSize = 100 - (size - 3) * 15;

  return (
    <GameBlockContainer
      onClick={() => canClick && handleClick(id)}
      blockSize={blockSize}
      selected={selected}
      hover={hover}
    ></GameBlockContainer>
  );
};

export default GameBlock;
