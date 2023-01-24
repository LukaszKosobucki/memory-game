import { GameBlockContainer } from "./GameBoard.styled";
import { motion } from "framer-motion";
import { blockSizesDesktop, blockSizesMobile } from "../../utils/gameSizes";
import { memo } from "react";

const GameBlock = ({
  block,
  hover,
  canClick,
  getSize,
  handleClick,
  isMobile,
}: {
  block: {
    id: number;
    size: number;
    selected: boolean;
    wrongSelected?: boolean;
  };
  hover: boolean;
  canClick: boolean;
  getSize: number;
  handleClick: (id: number) => void;
  isMobile: boolean;
}) => {
  return (
    <motion.div
      key={block.id}
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GameBlockContainer
        onClick={() =>
          canClick &&
          !block.wrongSelected &&
          !block.selected &&
          !isMobile &&
          handleClick(block.id)
        }
        onTouchStart={() =>
          canClick &&
          !block.wrongSelected &&
          !block.selected &&
          isMobile &&
          handleClick(block.id)
        }
        blockSize={
          isMobile
            ? blockSizesMobile[block.size]
            : blockSizesDesktop[block.size]
        }
        selected={block.selected}
        hover={hover}
        wrongSelected={block.wrongSelected}
        level6={getSize >= 6 ? true : false}
      ></GameBlockContainer>
    </motion.div>
  );
};

export default memo(GameBlock);
