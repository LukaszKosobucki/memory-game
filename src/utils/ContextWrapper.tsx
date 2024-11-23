import { useInterpret } from "@xstate/react";
import { initializeApp } from "firebase/app";
import {
  collection,
  Firestore,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { ActorRefFrom } from "xstate";
import { IChildren } from "../components/layout/Layout";
import { gameMachine } from "../gameStates";
import firebaseConfig from "./firestore.config";

export interface GlobalStateContextType {
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
  matches: boolean;
  height: () => string;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  leaderboardLimit: number;
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
  const gameService = useInterpret(gameMachine); // , { devTools: true } <- debbuging for redux devtools
  const [errorCounter, setErrorCounter] = useState<number>(0);
  const [correctCounter, setCorrectCounter] = useState<number>(0);
  const [userTime, setUserTime] = useState<number>(0);
  const [userLeaderboard, setUserLeaderboard] = useState<IUsers[]>([]);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [leaderboardLimit, setleaderboardLimit] = useState<number>(0);
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  const userCol = collection(firestore, `users`);

  useEffect(() => {
    onSnapshot(userCol, (snapshot) => {
      setUserLeaderboard(snapshot.docs.map((doc) => doc.data() as IUsers));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [matches, setMatches] = useState<boolean>(
    window.matchMedia("(max-width: 600px)").matches
  );

  const height = () => (matches ? "650px" : "100vh");

  useEffect(() => {
    window
      .matchMedia("(max-width: 600px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  });

  function handleNextPage() {
    setleaderboardLimit((prev) =>
      prev + 6 < userLeaderboard.length ? prev + 6 : prev
    );
  }
  function handlePreviousPage() {
    setleaderboardLimit((prev) => (prev >= 6 ? prev - 6 : prev));
  }

  const values = {
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
    matches,
    height,
    handleNextPage,
    handlePreviousPage,
    leaderboardLimit,
  };

  const cachedValue = useMemo(
    () => values,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      gameService,
      errorCounter,
      correctCounter,
      userTime,
      setUserTime,
      userLeaderboard,
      firestore,
      isInputDisabled,
      matches,
      leaderboardLimit,
    ]
  );

  return (
    <GlobalStateContext.Provider value={cachedValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};
