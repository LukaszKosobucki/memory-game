import React, { createContext, useState } from "react";
import { useInterpret } from "@xstate/react";
import { ActorRefFrom } from "xstate";
import { gameMachine } from "../gameStates";
import { IChildren } from "../components/layout/Layout";

interface GlobalStateContextType {
  gameService: ActorRefFrom<typeof gameMachine>;
  errorCounter: number;
  setErrorCounter: React.Dispatch<React.SetStateAction<number>>;
  setCorrectCounter: React.Dispatch<React.SetStateAction<number>>;
  correctCounter: number;
}

export const GlobalStateContext = createContext<GlobalStateContextType>(
  {} as GlobalStateContextType
);

export const GlobalStateProvider = ({ children }: IChildren) => {
  const gameService = useInterpret(gameMachine);
  const [errorCounter, setErrorCounter] = useState<number>(0);
  const [correctCounter, setCorrectCounter] = useState<number>(0);

  const value: GlobalStateContextType = {
    gameService,
    errorCounter,
    setErrorCounter,
    setCorrectCounter,
    correctCounter,
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};
