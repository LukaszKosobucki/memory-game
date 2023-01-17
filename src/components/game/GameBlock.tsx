import { GameBlockContainer } from "./GameBoard.styled";

const GameBlock = ({ size }: { size: number }) => {
  return (
    <GameBlockContainer
      style={{
        height: `${100 - (size - 3) * 15}px`,
        width: `${100 - (size - 3) * 15}px`,
      }}
    ></GameBlockContainer>
  );
};

export default GameBlock;
