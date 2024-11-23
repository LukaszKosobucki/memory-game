import { motion } from "framer-motion";
import { memo } from "react";
import { blockSizesDesktop, blockSizesMobile } from "../../utils/gameSizes";
import { GameBlockContainer } from "./GameBoard.styled";

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
      transition={{ duration: 0.4 }}
      initial={{ rotateX: 90 }}
      animate={{ rotateX: 0 }}
      exit={{ rotateX: 90 }}
    >
      <GameBlockContainer
        data-testid={`block-${block.id}`}
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
        wrongSelected={block?.wrongSelected}
        level6={getSize >= 6 ? true : false}
      ></GameBlockContainer>
    </motion.div>
  );
};

export default memo(GameBlock);
