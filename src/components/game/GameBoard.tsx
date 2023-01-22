import GameBlock from "./GameBlock";
import { GameContainer } from "./GameBoard.styled";
import { motion } from "framer-motion";
import { useState, useEffect, memo } from "react";
import { useSelectors } from "../../utils/selectors";
import GameInfoHeader from "./GameInfoHeader";

export type TBoard = {
  id: number;
  selected: boolean;
  size: number;
  wrongSelected?: boolean;
};

const GameBoard = ({ size }: { size: number }) => {
  const { isPlaying, getLevel, getSize, getBoard, getEmptyBoard } =
    useSelectors();
  const [board, setBoard] = useState<TBoard[]>([]);
  const [emptyBoard, setEmptyBoard] = useState<TBoard[]>([]);

  useEffect(() => {
    setBoard(getBoard);
    setEmptyBoard(getEmptyBoard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

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
          300 +
          (getSize <= 6
            ? getSize * (20 - (getSize === 6 ? 5 : 0))
            : getSize * 5)
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
              />
            ))}
      </GameContainer>
    </motion.div>
  );
};

export default memo(GameBoard);
