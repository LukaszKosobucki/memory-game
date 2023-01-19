import { useSelector } from "@xstate/react";
import { useContext } from "react";
import { GlobalStateContext } from "../ContextWrapper";

export const endGame = (state: any) => {
  return state.matches("endGame");
};
export const level = (state: any) => {
  return state.context.level;
};
export const timer = (state: any) => {
  return state.context.time;
};
export const sizes = (state: any) => {
  return state.context.sizes;
};
export const playing = (state: any) => {
  return state.matches("playing");
};
export const peekBoard = (state: any) => {
  return state.matches("peekBoard");
};
const countdown = (state: any) => {
  return state.matches("countdown");
};
const debuglog = (state: any) => {
  return state;
};
const board = (state: any) => {
  return state.context.board;
};

export const useSelectors = () => {
  const globalServices = useContext(GlobalStateContext);

  const hasLost = useSelector(globalServices.gameService, endGame);
  const getLevel = useSelector(globalServices.gameService, level);
  const getTimer = useSelector(globalServices.gameService, timer);
  const isPlaying = useSelector(globalServices.gameService, playing);
  const isPeekBoard = useSelector(globalServices.gameService, peekBoard);
  const isCounting = useSelector(globalServices.gameService, countdown);
  const getState = useSelector(globalServices.gameService, debuglog);
  const getSizes = useSelector(globalServices.gameService, sizes);
  const getBoard = useSelector(globalServices.gameService, board);

  const mockBoardMaker = (level: number) => {
    let mockBoard = [];
    const size = getSizes[`level${level}`];
    for (let i = 0; i < size ** 2; i++) {
      mockBoard.push({ id: i, selected: false, size: size });
    }
    const numberOfColoredBlocks = getLevel + 2;
    let numberOfAddedColors = 0;
    console.log(numberOfAddedColors);
    while (numberOfAddedColors < numberOfColoredBlocks) {
      const randomNumber = Math.random();
      if (randomNumber > 0.5) {
        mockBoard[Math.floor(Math.random() * size ** 2)]["selected"] = true;
        console.log(mockBoard);
      }
      numberOfAddedColors = mockBoard.filter(
        (obj) => obj.selected === true
      ).length;
      console.log(numberOfAddedColors);
    }
    return mockBoard;
  };

  return {
    hasLost: hasLost,
    getLevel: getLevel,
    getTimer: getTimer,
    isPlaying: isPlaying,
    isPeekBoard: isPeekBoard,
    isCounting: isCounting,
    getState: getState,
    getSizes: getSizes,
    mockBoardMaker: mockBoardMaker,
    getBoard: getBoard,
  };
};
