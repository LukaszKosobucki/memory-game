import { useSelector } from "@xstate/react";
import { useContext, useEffect } from "react";
import { TBoard } from "../components/game/GameBoard";
import { GlobalStateContext } from "./ContextWrapper";

export const endGame = (state: any) => {
  return state.matches("endGame");
};
export const level = (state: any) => {
  return state.context.level;
};
export const timer = (state: any) => {
  return state.context.time;
};
export const size = (state: any) => {
  return state.context.size;
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
const emptyBoard = (state: any) => {
  return state.context.emptyBoard;
};
const win = (state: any) => {
  return state.context.win;
};
const userTime = (state: any) => {
  return state.context.userTime;
};
const userErrors = (state: any) => {
  return state.context.userErrors;
};
const userCorrectBlocks = (state: any) => {
  return state.context.userCorrectBlocks;
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
  const getSize = useSelector(globalServices.gameService, size);
  const getBoard = useSelector(globalServices.gameService, board);
  const getEmptyBoard = useSelector(globalServices.gameService, emptyBoard);
  const getWin = useSelector(globalServices.gameService, win);
  const getUserTime = useSelector(globalServices.gameService, userTime);
  const getUserErrors = useSelector(globalServices.gameService, userErrors);
  const getUserCorrectBlocks = useSelector(
    globalServices.gameService,
    userCorrectBlocks
  );

  const handleClick = (id: number) => {
    if (getBoard[id].selected === true) {
      getEmptyBoard[id].selected = true;
      globalServices.setCorrectCounter(globalServices.correctCounter + 1);
    } else {
      getEmptyBoard[id].wrongSelected = true;
      globalServices.setErrorCounter(globalServices.errorCounter + 1);
    }
  };

  const emptyBoardMaker = (level: number) => {
    const emptyBoard = [];
    const size = getSize;
    for (let i = 0; i < size ** 2; i++) {
      emptyBoard.push({
        id: i,
        selected: false,
        size: size,
        wrongSelected: false,
      });
    }
    return emptyBoard.slice();
  };

  const boardMaker = (level: number) => {
    let board: TBoard[] = [];
    const size = getSize;
    for (let i = 0; i < size ** 2; i++) {
      board.push({ id: i, selected: false, size: size });
    }
    const numberOfColoredBlocks = level + 2;
    let numberOfAddedColors = 0;
    while (numberOfAddedColors < numberOfColoredBlocks) {
      const randomNumber = Math.random();
      if (randomNumber > 0.5) {
        board[Math.floor(Math.random() * size ** 2)]["selected"] = true;
      }
      numberOfAddedColors = board.filter((obj) => obj.selected === true).length;
    }
    return board.slice();
  };

  useEffect(() => {
    console.log("errorCounter selectors:", globalServices.errorCounter);

    if (globalServices.errorCounter === 3) {
      globalServices.gameService.send({
        type: "LOSE_GAME",
        newUserTime: globalServices.userTime,
        newUserErrors: globalServices.errorCounter,
        newUserCorrectBlocks: globalServices.correctCounter,
      });
      globalServices.setErrorCounter(0);
      globalServices.setCorrectCounter(0);
      globalServices.setIsInputDisabled(false);
    }
    if (
      getBoard.filter((obj: TBoard) => obj.selected === true).length ===
      getEmptyBoard.filter((obj: TBoard) => obj.selected === true).length
    ) {
      globalServices.gameService.send({
        type: "WIN_LEVEL",
        newBoard: boardMaker(getLevel + 1),
        newEmptyBoard: emptyBoardMaker(getLevel + 1),
        newUserTime: globalServices.userTime,
        newUserErrors: globalServices.errorCounter,
        newUserCorrectBlocks: globalServices.correctCounter,
      });
      globalServices.setErrorCounter(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalServices.errorCounter, globalServices.correctCounter]);

  return {
    hasLost: hasLost,
    getLevel: getLevel,
    getTimer: getTimer,
    isPlaying: isPlaying,
    isPeekBoard: isPeekBoard,
    isCounting: isCounting,
    getState: getState,
    getSize: getSize,
    boardMaker: boardMaker,
    getBoard: getBoard,
    getWin: getWin,
    handleClick: handleClick,
    emptyBoardMaker: emptyBoardMaker,
    getEmptyBoard: getEmptyBoard,
    getUserTime: getUserTime,
    getUserErrors: getUserErrors,
    getUserCorrectBlocks: getUserCorrectBlocks,
  };
};
