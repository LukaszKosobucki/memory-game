import GameBlock from "./GameBlock";
import { GameContainer } from "./GameBoard.styled";

const GameBoard = ({ size }: { size: number }) => {
  const createBoard = (size: number) => {
    const listOfBlocks = [];
    for (let i = 0; i < size ** 2; i++) {
      listOfBlocks.push(<GameBlock key={i} size={size} />);
    }
    return listOfBlocks;
  };

  return (
    <GameContainer
      style={{ height: `${300 + size * 20}px`, width: `${300 + size * 20}px` }}
    >
      {createBoard(size)}
    </GameContainer>
  );
};

export default GameBoard;
