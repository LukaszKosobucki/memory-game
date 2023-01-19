import { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../../ContextWrapper";
import { useSelectors } from "../../utils/selectors";
import { TBoard } from "./GameBoard";
import { GameBlockContainer } from "./GameBoard.styled";

const GameBlock = ({
  id,
  size,
  selected,
}: {
  id: number;
  size: number;
  selected: boolean;
}) => {
  const globalServices = useContext(GlobalStateContext);
  const { getBoard, mockBoardMaker, getLevel } = useSelectors();
  const [errorCounter, setErrorCounter] = useState<number>(0);
  const [correctCounter, setCorrectCounter] = useState<number>(0);
  const blockSize = 100 - (size - 3) * 15;
  const handleClick = (id: number) => {
    if (getBoard[id].selected === true) {
      selected = true;
      console.log("xdddd");
      setCorrectCounter(correctCounter + 1);
    } else {
      setErrorCounter(errorCounter + 1);
    }
    console.log(correctCounter, errorCounter);
    if (errorCounter === 3) {
      globalServices.gameService.send("LOSE_GAME");
      setCorrectCounter(0);
      setErrorCounter(0);
    }
    if (
      getBoard.filter((obj: TBoard) => obj.selected === true).length ===
      correctCounter
    ) {
      globalServices.gameService.send({
        type: "WIN_LEVEL",
        newBoard: mockBoardMaker(getLevel),
      });
      setCorrectCounter(0);
      setErrorCounter(0);
      console.log("WON");
    }
  };

  useEffect(() => {
    console.log(errorCounter, correctCounter);
  }, [errorCounter, correctCounter]);

  return (
    <GameBlockContainer
      onClick={() => handleClick(id)}
      blockSize={blockSize}
      selected={selected}
    ></GameBlockContainer>
  );
};

export default GameBlock;
