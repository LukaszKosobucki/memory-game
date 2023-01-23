import GameBlock from "./GameBlock";
import { GameContainer } from "./GameBoard.styled";
import { motion } from "framer-motion";
import { useContext } from "react";
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
          ? getBoard.map((block: TBoard) => (
              <GameBlock
                key={block.id}
                id={block.id}
                size={block.size}
                selected={block.selected}
                hover={false}
                canClick={false}
              />
            ))
          : getEmptyBoard.map((block: TBoard) => (
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

export default GameBoard;
