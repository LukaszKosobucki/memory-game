import { GameBlockContainer } from "./GameBoard.styled";
import { motion } from "framer-motion";
import { memo } from "react";

import { GlobalStateContext } from "../../utils/ContextWrapper";
import { useContext } from "react";
import { blockSizesDesktop, blockSizesMobile } from "../../utils/gameSizes";
import { useSelectors } from "../../utils/selectors";

const GameBlock = ({
  id,
  size,
  selected,
  wrongSelected,
  hover,
  canClick,
}: {
  id: number;
  size: number;
  selected: boolean;
  wrongSelected?: boolean;
  hover: boolean;
  canClick: boolean;
}) => {
  const globalServices = useContext(GlobalStateContext);
  const { handleClick, getSize } = useSelectors();

  return (
    <motion.div
      key="Start"
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GameBlockContainer
        onClick={() =>
          canClick && !wrongSelected && !selected && handleClick(id)
        }
        blockSize={
          globalServices.matches
            ? blockSizesMobile[size]
            : blockSizesDesktop[size]
        }
        selected={selected}
        hover={hover}
        wrongSelected={wrongSelected}
        level6={getSize >= 6 ? true : false}
      ></GameBlockContainer>
    </motion.div>
  );
};

export default memo(GameBlock);
