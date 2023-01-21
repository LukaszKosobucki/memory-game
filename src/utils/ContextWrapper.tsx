import React, { createContext, useEffect, useState } from "react";
import { useInterpret } from "@xstate/react";
import { ActorRefFrom } from "xstate";
import { gameMachine } from "../gameStates";
import { IChildren } from "../components/layout/Layout";
import { initializeApp } from "firebase/app";
import {
  collection,
  Firestore,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import firebaseConfig from "./firestore.config";

interface GlobalStateContextType {
  gameService: ActorRefFrom<typeof gameMachine>;
  errorCounter: number;
  setErrorCounter: React.Dispatch<React.SetStateAction<number>>;
  setCorrectCounter: React.Dispatch<React.SetStateAction<number>>;
  correctCounter: number;
  setUserTime: React.Dispatch<React.SetStateAction<number>>;
  userTime: number;
  userLeaderboard: IUsers[];
  firestore: Firestore;
  isInputDisabled: boolean;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IUsers {
  username: string;
  time: number;
  level: number;
  errors: number;
  correctClicks: number;
}

export const GlobalStateContext = createContext<GlobalStateContextType>(
  {} as GlobalStateContextType
);

export const GlobalStateProvider = ({ children }: IChildren) => {
  const gameService = useInterpret(gameMachine);
  const [errorCounter, setErrorCounter] = useState<number>(0);
  const [correctCounter, setCorrectCounter] = useState<number>(0);
  const [userTime, setUserTime] = useState<number>(0);
  const [userLeaderboard, setUserLeaderboard] = useState<IUsers[]>([]);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);

  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  const userCol = collection(firestore, `users`);

  useEffect(() => {
    onSnapshot(userCol, (snapshot) => {
      setUserLeaderboard(snapshot.docs.map((doc) => doc.data() as IUsers));
    });
    console.log(userLeaderboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: GlobalStateContextType = {
    gameService,
    errorCounter,
    setErrorCounter,
    setCorrectCounter,
    correctCounter,
    userTime,
    setUserTime,
    userLeaderboard,
    firestore,
    isInputDisabled,
    setIsInputDisabled,
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};
