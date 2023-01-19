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

export const useSelectors = () => {
  const globalServices = useContext(GlobalStateContext);

  const hasLost = useSelector(globalServices.gameService, endGame);
  const getLevel = useSelector(globalServices.gameService, level);
  const getTimer = useSelector(globalServices.gameService, timer);
  const isPlaying = useSelector(globalServices.gameService, playing);
  const isPeekBoard = useSelector(globalServices.gameService, peekBoard);
  const isCounting = useSelector(globalServices.gameService, countdown);
  const getState = useSelector(globalServices.gameService, debuglog);

  return {
    hasLost: hasLost,
    getLevel: getLevel,
    getTimer: getTimer,
    isPlaying: isPlaying,
    isPeekBoard: isPeekBoard,
    isCounting: isCounting,
    getState: getState,
  };
};
