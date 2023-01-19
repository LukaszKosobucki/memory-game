import { GameBlockContainer } from "./GameBoard.styled";

const GameBlock = ({ size }: { size: number }) => {
  const blockSize = 100 - (size - 3) * 15;
  console.log(blockSize);
  return <GameBlockContainer blockSize={blockSize}></GameBlockContainer>;
};

export default GameBlock;
