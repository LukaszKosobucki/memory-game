import GameBlock from "./GameBlock";
import { GameContainer } from "./GameBoard.styled";
import { useContext } from "react";
import { GlobalStateContext } from "../../ContextWrapper";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSelectors } from "../../utils/selectors";
import GameInfoHeader from "./GameInfoHeader";
import { AnyAaaaRecord } from "dns";

const GameBoard = ({ size }: { size: number }) => {
  const globalServices = useContext(GlobalStateContext);
  const { getTimer, isPlaying, isPeekBoard, getLevel } = useSelectors();
  const [seconds, setSeconds] = useState<number>(getTimer);
  const [win, setWin] = useState<boolean>(false);
  type TSize = {
    [key: string]: number;
  };

  const mockBoardMaker = (level: number) => {
    const mockBoard = [];
    const sizes: TSize = {
      level1: 3,
      level2: 3,
      level3: 4,
      level4: 4,
      level5: 4,
      level6: 4,
      level7: 4,
      level8: 4,
      level9: 5,
      level10: 5,
      level11: 5,
      level12: 5,
      level13: 5,
      level14: 5,
      level15: 5,
      level16: 6,
    };
    const size = sizes[`level${level}`];
    for (let i = 0; i < size ** 2; i++) {
      mockBoard.push({ id: i, selected: true, size: size });
    }

    return mockBoard;
  };

  useEffect(() => {
    if (seconds >= 0) {
      var gameTimer = setTimeout(() => setSeconds(seconds - 1), 1000);

      if (isPlaying && win) {
        clearTimeout(gameTimer);
        setWin(false);
        globalServices.gameService.send("WIN_LEVEL");
      } else if (isPeekBoard && seconds === 0) {
        clearTimeout(gameTimer);
        globalServices.gameService.send("PEEK_BOARD");
      }
    } else if (!isPeekBoard && !isPlaying) {
      globalServices.gameService.send("LOSE_GAME");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  useEffect(() => {
    setSeconds(getTimer);
  }, [getTimer]);

  const handleIncrement = () => {
    setWin(true);
  };
  const handleLose = () => {
    globalServices.gameService.send("LOSE_GAME");
  };

  return (
    <GameContainer
      style={{ height: `${300 + size * 20}px`, width: `${300 + size * 20}px` }}
      as={motion.div}
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <GameInfoHeader seconds={seconds} />
      {mockBoardMaker(getLevel).map((block) => (
        <GameBlock key={block.id} size={block.size} />
      ))}

      <button onClick={handleIncrement}> increment</button>
      <button onClick={handleLose}> lose game</button>
    </GameContainer>
  );
};

export default GameBoard;
