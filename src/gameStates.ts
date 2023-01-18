import { createMachine, assign } from "xstate";

export const gameMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5RQIYFswFkUGMAWAlgHZgB0ADgE5gDi6YAxAMoAqAggEosDaADALqJQ5APawCAFwIiiQkAA9EATgDsANlIAmAKy9emtZoAsAZiMBGTSoA0IAJ6JNO0od2WVvJUZVGlagL7+tqgY2PjEZFS09AwAagCSAKIA6gD6ADKJbAAiiRwAQgDynNlMfIJIIKLiUjJyigiqGjp6BsZm7rYOCCYGLi36AByag+ajg4HB9GGEJKQ4IgCuRFJEUAyJAHLZqQDChQCqmyzxmzTlctWS0rKVDeYm2iqkKqPtXmq8Tzb2js6uvHcnm8vgCQRAISwuFmkQANig7MR1slThlErFEukLpUrrVbqB7tozKReK5NL0jNpzEpBtouohzCoTKRLG51G5NOZtNpJhDptCIhR4Yi1gx0oUmIlUjQ2JhEtjhGJrnU7gyTIMNNojGpBkyTGolF5NPSEKNSLo9Lxxl8jINBkpeZCZoKwEQIHQMMx4jRNokdqcFVUlXj6o5DKQaaYdYyrY86b8EEYjLwI9pBiYzFTtb1BkZHfzwnNXe6YgAxNjxTI7FiFVJMb2bVIBgSXYM3UOJzQky093vmIwmi3mlQW0zmXgmEcqfOhAVFt0exgJFJonJ5IolMotnFtlUEsNdyP60YedPcwc6lnGQ2vXVEqkzqGFsjFxcMDiJFgcACagdx7dVBA2gjXNjxjM9426TR9C0C0vhUccnG0MEplnZ9SHEKASAgeIiDiJI0kyNcCmKDhSj-Xd8QURA1HMcxzRMSxr2pXQ1DUE0k2eSc4MeV40zzcEnTnMhMOw3D30-H8KJqAD9wQWj6KJJjfBY0l2ITXpmV7TTDX0ExH2dOZYTAFAIDASgACMRBQSgIAkr9f23RUZL3aiEHHLwWU8R4dV4CwDEgxx1CvC0VHUO0RknQJwSIEQzPgSohOfVsXKohoAFptAjQ0ctynKNRNTLsrykqNQM4SKGoRcUuVNLEFzejeFeB4k20Fp1BNRjmjg5M1AzUwzHK9CFmWVYoBqkNAOUl57SalRDS1VoTScDRWUBKxgR8PwhphIUESRCbZLcrlKQY1kuTUeamuWkZ+g5DwvC2lC+TQ3bX3oQ7XIaQYU20JRJxMQ0HgeaDAoQbkNCa3xDX1VRNCUcwdsFUTIFwz66sTJQuyUnRORpXR4Y4ixSEpdNM37PqRgE1Cn124zTPMqybIgdGO0sLkXj8O1vDUJ5tR+bpWvNAYrSpLGTD86L-CAA */
  createMachine<
    { level: number },
    | { type: "START" }
    | { type: "END_COUNTING" }
    | { type: "WIN_LEVEL" }
    | { type: "LOSE_GAME" }
    | { type: "SIGNED_IN" }
    | { type: "RETRY" }
    | { type: "FAILED_TO_SIGN_IN" }
  >({
    id: "gameMachine",
    initial: "preGame",
    context: {
      level: 1,
    },
    states: {
      preGame: {
        on: {
          START: { target: "counting" },
        },
      },
      counting: {
        on: {
          END_COUNTING: { target: "playing" },
        },
      },
      playing: {
        on: {
          WIN_LEVEL: {
            target: "playing",
            actions: assign({
              level: ({ level }) => level + 1,
            }),
          },
          LOSE_GAME: { target: "endGame" },
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
