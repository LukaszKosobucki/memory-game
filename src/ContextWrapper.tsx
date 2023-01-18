import React, { createContext } from "react";
import { useInterpret } from "@xstate/react";
import { ActorRefFrom } from "xstate";
import { gameMachine } from "./gameStates";
import { IChildren } from "./components/layout/Layout";

interface GlobalStateContextType {
  gameService: ActorRefFrom<typeof gameMachine>;
}

export const GlobalStateContext = createContext(
  // Typed this way to avoid TS errors,
  // looks odd I know
  {} as GlobalStateContextType
);

export const GlobalStateProvider = ({ children }: IChildren) => {
  const gameService = useInterpret(gameMachine);

  return (
    <GlobalStateContext.Provider value={{ gameService }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
