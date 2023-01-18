import GameBlock from "./GameBlock";
import { GameContainer } from "./GameBoard.styled";
import { useContext } from "react";
import { GlobalStateContext } from "../../ContextWrapper";

const GameBoard = ({ size }: { size: number }) => {
  const globalServices = useContext(GlobalStateContext);

  const handleIncrement = () => {
    globalServices.gameService.send({ type: "WIN_LEVEL" });
  };
  const handleLose = () => {
    globalServices.gameService.send("LOSE_GAME");
  };

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
      <button onClick={handleIncrement}> increment</button>
      <button onClick={handleLose}> lose game</button>
    </GameContainer>
  );
};

export default GameBoard;
