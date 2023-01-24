import GameBlock from "./GameBlock";
import { GameContainer } from "./GameBoard.styled";
import { motion } from "framer-motion";
import GameInfoHeader from "./GameInfoHeader";
import {
  boardSizesDesktop,
  boardSizesMobile,
  gapSizesDesktop,
  gapSizesMobile,
} from "../../utils/gameSizes";
import { useBoards } from "./useBoards";
import { memo } from "react";

export type TBoard = {
  id: number;
  selected: boolean;
  size: number;
  wrongSelected?: boolean;
};

const GameBoard = ({
  size,
  getLevel,
  getSize,
}: {
  size: number;
  getLevel: number;
  getSize: number;
}) => {
  const [isMobile, board, isPlaying, handleClick] = useBoards();
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
          isMobile ? boardSizesMobile[getSize] : boardSizesDesktop[getSize]
        }
        gap={isMobile ? gapSizesMobile[getSize] : gapSizesDesktop[getSize]}
      >
        <GameInfoHeader />
        {board.map((block: TBoard) => (
          <GameBlock
            key={block.id}
            block={block}
            canClick={isPlaying}
            hover={isPlaying}
            getSize={getSize}
            handleClick={handleClick}
            isMobile={isMobile}
          />
        ))}
      </GameContainer>
    </motion.div>
  );
};

export default memo(GameBoard);
