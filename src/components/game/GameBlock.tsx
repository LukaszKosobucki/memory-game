import { useSelectors } from "../../utils/selectors";
import { GameBlockContainer } from "./GameBoard.styled";
import { motion } from "framer-motion";

const GameBlock = ({
  id,
  size,
  selected,
  hover,
  canClick,
}: {
  id: number;
  size: number;
  selected: boolean;
  hover: boolean;
  canClick: boolean;
}) => {
  const { handleClick } = useSelectors();
  const blockSize = 100 - (size - 3) * 15;

  return (
    <motion.div
      key="Start"
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GameBlockContainer
        onClick={() => canClick && handleClick(id)}
        blockSize={blockSize}
        selected={selected}
        hover={hover}
      ></GameBlockContainer>
    </motion.div>
  );
};

export default GameBlock;
