import GameBlock from "./GameBlock";
import { GameContainer } from "./GameBoard.styled";
import { motion } from "framer-motion";
import { useState, memo, useContext, useCallback, useEffect } from "react";
import { useSelectors } from "../../utils/selectors";
import GameInfoHeader from "./GameInfoHeader";
import { GlobalStateContext } from "../../utils/ContextWrapper";
import {
  boardSizesDesktop,
  boardSizesMobile,
  gapSizesDesktop,
  gapSizesMobile,
} from "../../utils/gameSizes";

export type TBoard = {
  id: number;
  selected: boolean;
  size: number;
  wrongSelected?: boolean;
};

const GameBoard = ({ size }: { size: number }) => {
  const globalServices = useContext(GlobalStateContext);
  const { isPlaying, getLevel, getSize, getBoard, getEmptyBoard } =
    useSelectors();
  const [board, setBoard] = useState<TBoard[]>([]);
  const [emptyBoard, setEmptyBoard] = useState<TBoard[]>([]);

  useEffect(() => {
    console.log(isPlaying);
    setBoard(getBoard);
    setEmptyBoard(getEmptyBoard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying === true]);

  const memoHandleClick = useCallback(
    (id: number, value: boolean) => {
      if (getBoard[id].selected === true) {
        setEmptyBoard((prevEmptyBoard: TBoard[]) =>
          prevEmptyBoard.map((block: TBoard, index: number) => {
            return index !== id ? block : { ...block, selected: value };
          })
        );
        globalServices.setCorrectCounter((prevCorrect) => prevCorrect + 1);
        getEmptyBoard[id].selected = true;
      } else {
        setEmptyBoard((prevEmptyBoard: TBoard[]) =>
          prevEmptyBoard.map((block: TBoard, index: number) => {
            return index !== id ? block : { ...block, wrongSelected: value };
          })
        );
        globalServices.setErrorCounter((prevError) => prevError + 1);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getEmptyBoard, getBoard]
  );

  return (
    <motion.div
      key={`gameboard${getLevel}`}
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GameContainer
        boardSize={
          globalServices.matches
            ? boardSizesMobile[getSize]
            : boardSizesDesktop[getSize]
        }
        gap={
          globalServices.matches
            ? gapSizesMobile[getSize]
            : gapSizesDesktop[getSize]
        }
      >
        <GameInfoHeader />
        {!isPlaying
          ? board.map((block) => (
              <GameBlock
                key={block.id}
                id={block.id}
                size={block.size}
                selected={block.selected}
                hover={false}
                canClick={false}
              />
            ))
          : emptyBoard.map((block) => (
              <GameBlock
                key={block.id}
                id={block.id}
                size={block.size}
                hover={true}
                selected={block.selected}
                wrongSelected={block.wrongSelected}
                canClick={true}
                memoHandleClick={memoHandleClick}
              />
            ))}
      </GameContainer>
    </motion.div>
  );
};

export default memo(GameBoard);
