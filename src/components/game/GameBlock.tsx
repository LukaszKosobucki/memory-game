import { GameBlockContainer } from "./GameBoard.styled";
import { motion } from "framer-motion";
import { memo } from "react";
import { Sizes } from "./GameBoard";
import { GlobalStateContext } from "../../utils/ContextWrapper";
import { useContext } from "react";

const blockSizesMobile: Sizes = {
  3: 90,
  4: 80,
  5: 65,
  6: 54,
  7: 47,
};
const blockSizesDesktop: Sizes = {
  3: 100,
  4: 85,
  5: 75,
  6: 65,
  7: 55,
};

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
  const globalServices = useContext(GlobalStateContext);

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
        blockSize={
          globalServices.matches
            ? blockSizesMobile[size]
            : blockSizesDesktop[size]
        }
        selected={selected}
        hover={hover}
        wrongSelected={wrongSelected}
      ></GameBlockContainer>
    </motion.div>
  );
};

export default memo(GameBlock);
