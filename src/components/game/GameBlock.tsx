import { GameBlockContainer } from "./GameBoard.styled";
import { motion } from "framer-motion";
import { memo } from "react";

const GameBlock = ({
  id,
  size,
  selected,
  wrongSelected,
  hover,
  canClick,
  memoHandleClick,
}: {
  id: number;
  size: number;
  selected: boolean;
  wrongSelected?: boolean;
  hover: boolean;
  canClick: boolean;
  memoHandleClick?: any;
}) => {
  const blockSize = 100 - (size - 3) * 15;
  const marginSize = 4 - (size - 4) * 1;

  return (
    <motion.div
      key="Start"
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GameBlockContainer
        onClick={() => canClick && !wrongSelected && memoHandleClick(id, true)}
        blockSize={blockSize}
        selected={selected}
        hover={hover}
        wrongSelected={wrongSelected}
        marginSize={marginSize}
      ></GameBlockContainer>
    </motion.div>
  );
};

export default memo(GameBlock);
