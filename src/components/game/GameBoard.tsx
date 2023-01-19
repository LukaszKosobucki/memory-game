import GameBlock from "./GameBlock";
import { GameContainer } from "./GameBoard.styled";
import { useContext } from "react";
import { GlobalStateContext } from "../../ContextWrapper";
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
  const globalServices = useContext(GlobalStateContext);
  const { isPlaying, getLevel, getSizes, getBoard } = useSelectors();
  const [board, setBoard] = useState<TBoard[]>([]);

  useEffect(() => {
    setBoard(getBoard);
    console.log(getBoard);
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
              />
            ))
          : board.map((block) => (
              <GameBlock
                key={block.id}
                id={block.id}
                size={block.size}
                selected={false}
              />
            ))}
      </GameContainer>
    </motion.div>
  );
};

export default GameBoard;
