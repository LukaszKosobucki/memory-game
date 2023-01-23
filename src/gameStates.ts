import { createMachine, assign } from "xstate";
import { TBoard } from "./components/game/GameBoard";

export const gameMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5RQIYFswFkUGMAWAlgHZgB0ADgE5gDi6YAxAMoAqAggEosDaADALqJQ5APawCAFwIiiQkAA9EATgDsANlIAmAKy9emtZoAsAZiMBGTSoA0IAJ6JNO0od2WVvJUZVGlagL7+tqgY2PjEZFS09AwAagCSAKIA6gD6ADKJbAAiiRwAQgDynNlMfIJIIKLiUjJyigiqGjp6BsZm7rYOCCYGLi36AByag+ajg4HB9GGEJKQ4IgCuRFJEUAyJAHLZqQDChQCqmyzxmzTlctWS0rKVDeYm2iqkKqPtXmq8Tzb2js6uvHcnm8vgCQRAISwuFmkQANig7MR1slThlErFEukLpUrrVbqB7tozKReK5NL0jNpzEpBtouohzCoTKRLG51G5NOZtNpJhDptCIhR4Yi1gx0oUmIlUjQ2JhEtjhGJrnU7gyTIMNNojGpBkyTGolF5NPSEKNSLo9Lxxl8jINBkpeZCZoKwEQIHQMMx4jRNokdqcFVUlXj6o5DKQaaYdYyrY86b8EEYjLwI9pBiYzFTtb1BkZHfzwnNXe6YgAxNjxTI7FiFVJMb2bVIBgSXYM3UOJzQky093vmIwmi3mlQW0zmXgmEcqfOhAVFt0exgJFJonJ5IolMotnFtlUEsNdyP60YedPcwc6lnGQ2vXVEqkzqGFsjFxcMDiJFgcACagdx7dVBA2gjXNjxjM9426TR9C0C0vhUccnG0MEplnZ9SHEKASAgeIiDiJI0kyNcCmKDhSj-Xd8QURA1HMcxzRMSxr2pXQ1DUE0k2eSc4MeV40zzcEnTnMhMOw3D30-H8KJqAD9wQWj6KJJjfBY0l2ITXpmV7TTDX0ExH2dOZYTAFAIDASgACMRBQSgIAkr9f23RUZL3aiEHHLwWU8R4dV4CwDEgxx1CvC0VHUO0RknQJwSIEQzPgSohOfVsXKohoAFptAjQ0ctynKNRNTLsrykqNQM4SKGoRcUuVNLEFzejeFeB4k20Fp1BNRjmjg5M1AzUwzHK9CFmWVYoBqkNAOUl57SalRDS1VoTScDRWUBKxgR8PwhphIUESRCbZLcrlKQY1kuTUeamuWkZ+g5DwvC2lC+TQ3bX3oQ7XIaQYU20JRJxMQ0HgeaDAoQbkNCa3xDX1VRNCUcwdsFUTIFwz66sTJQuyUnRORpXR4Y4ixSEpdNM37PqRgE1Cn124zTPMqybIgdGO0sLkXj8O1vDUJ5tR+bpWvNAYrSpLGTD86L-CAA */
  createMachine<
    {
      level: number;
      time: number;
      board: TBoard[];
      emptyBoard: TBoard[];
      size: number;
      win: boolean;
      userTime: number;
      userErrors: number;
      userCorrectBlocks: number;
    },
    | { type: "START" }
    | { type: "END_COUNTING"; newBoard: TBoard[]; newEmptyBoard: TBoard[] }
    | {
        type: "WIN_LEVEL";
        newBoard: TBoard[];
        newEmptyBoard: TBoard[];
        newUserTime: number;
        newUserErrors: number;
        newUserCorrectBlocks: number;
      }
    | {
        type: "LOSE_GAME";
        newUserTime: number;
        newUserErrors: number;
        newUserCorrectBlocks: number;
      }
    | { type: "SIGNED_IN" }
    | { type: "RETRY" }
    | { type: "FAILED_TO_SIGN_IN" }
    | { type: "PEEK_BOARD" }
  >({
    predictableActionArguments: true,
    id: "gameMachine",
    initial: "preGame",
    context: {
      level: 1,
      time: 2,
      board: [],
      emptyBoard: [],
      win: false,
      userTime: 0,
      userErrors: 0,
      userCorrectBlocks: 0,
      size: 3,
    },
    states: {
      preGame: {
        on: {
          START: {
            target: "countdown",
            actions: assign({
              level: ({ level }) => (level = 1),
              time: ({ time }) => (time = 3),
            }),
          },
        },
      },
      countdown: {
        on: {
          END_COUNTING: {
            target: "peekBoard",
            actions: assign({
              time: ({ time }) => (time = 2),
              board: (context, event) => (context.board = event.newBoard),
              emptyBoard: (context, event) =>
                (context.emptyBoard = event.newEmptyBoard),
            }),
          },
        },
      },
      peekBoard: {
        entry: ({ emptyBoard }) => console.log("entry", emptyBoard),
        on: {
          PEEK_BOARD: {
            target: "playing",
            actions: assign({
              time: ({ time }) => (time = 60),
              win: ({ win }) => (win = false),
            }),
          },
        },
      },
      playing: {
        entry: assign({
          size: ({ level, size }) => {
            return size ** 2 / (level + 3) < 2 - 0.2 * (size - 3)
              ? (size += 1)
              : size;
          },
        }),
        on: {
          WIN_LEVEL: {
            target: "peekBoard",
            actions: assign({
              level: ({ level }) => level + 1,
              time: ({ time, level }) => (time = 2 + level * 0.1),
              board: (context, event) => (context.board = event.newBoard),
              emptyBoard: (context, event) =>
                (context.emptyBoard = event.newEmptyBoard),
              userTime: (context, event) =>
                (context.userTime += event.newUserTime),
              userErrors: (context, event) =>
                (context.userErrors += event.newUserErrors),
              userCorrectBlocks: (context, event) =>
                (context.userCorrectBlocks = event.newUserCorrectBlocks),
              win: ({ win }) => (win = true),
            }),
          },
          LOSE_GAME: {
            target: "endGame",
            actions: assign({
              time: ({ time }) => (time = 0),
              size: ({ size }) => (size = 3),
              userTime: (context, event) =>
                (context.userTime += event.newUserTime),
              userErrors: (context, event) =>
                (context.userErrors += event.newUserErrors),
              userCorrectBlocks: (context, event) =>
                (context.userCorrectBlocks = event.newUserCorrectBlocks),
            }),
          },
        },
      },
      endGame: {
        on: {
          SIGNED_IN: "signedIn",
          FAILED_TO_SIGN_IN: "endGame",
          RETRY: {
            target: "preGame",
            actions: assign({
              level: ({ level }) => (level = 1),
            }),
          },
        },
      },
      signedIn: {
        on: {
          RETRY: "preGame",
        },
      },
    },
  });
