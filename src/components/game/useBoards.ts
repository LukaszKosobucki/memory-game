import { useCallback, useContext, useState, useEffect } from "react";
import { useSelectors } from "../../utils/selectors";
import { GlobalStateContext } from "../../utils/ContextWrapper";
import { TBoard } from "./GameBoard";

export function useBoards() {
  const { matches, setCorrectCounter, setErrorCounter } =
    useContext(GlobalStateContext);
  const { isPlaying, getBoard, getEmptyBoard } = useSelectors();
  const [board, setBoard] = useState<TBoard[]>(getEmptyBoard);

  useEffect(() => {
    setBoard(getEmptyBoard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  const handleClick = useCallback(
    (id: number) => {
      if (getBoard[id].selected === true) {
        setBoard((prevBoard) =>
          prevBoard.map((block, index) =>
            index !== id ? block : { ...block, selected: true }
          )
        );
        getEmptyBoard[id].selected = true;
        setCorrectCounter((prevCorrect) => prevCorrect + 1);
      } else {
        setBoard((prevBoard) =>
          prevBoard.map((block, index) =>
            index !== id ? block : { ...block, wrongSelected: true }
          )
        );
        getEmptyBoard[id].wrongSelected = true;
        setErrorCounter((prevError) => prevError + 1);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getBoard]
  );

  if (isPlaying) {
    return [matches, board, isPlaying, handleClick];
  } else {
    return [matches, getBoard, isPlaying, handleClick];
  }
}
