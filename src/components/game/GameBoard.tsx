import GameBlock from "./GameBlock";
import { GameContainer } from "./GameBoard.styled";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSelectors } from "../../utils/selectors";
import GameInfoHeader from "./GameInfoHeader";

export type TBoard = {
  id: number;
  selected: boolean;
  size: number;
};

const GameBoard = ({ size }: { size: number }) => {
  const { isPlaying, getLevel, getSizes, getBoard, getEmptyBoard } =
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
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GameContainer boardSize={300 + getSizes[`level${getLevel}`] * 20}>
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
                canClick={true}
              />
            ))}
      </GameContainer>
    </motion.div>
  );
};

export default GameBoard;
