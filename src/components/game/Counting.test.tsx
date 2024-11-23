import { act, render, screen } from "@testing-library/react";
import {
  GlobalStateContext,
  GlobalStateContextType,
} from "../../utils/ContextWrapper";
import Counting from "./Counting";
const mockGetTimer = jest.fn();

jest.mock("../../utils/selectors", () => ({
  useSelectors: jest.fn(() => ({
    getTimer: mockGetTimer,
  })),
}));

describe("Counting Component", () => {
  const mockSend = jest.fn();

  it("should display the initial timer value", () => {
    mockGetTimer.mockReturnValue(10);

    render(
      <GlobalStateContext.Provider
        value={
          {
            gameService: { send: mockSend },
          } as unknown as GlobalStateContextType
        }
      >
        <Counting />
      </GlobalStateContext.Provider>
    );
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should countdown the timer", () => {
    jest.useFakeTimers();
    mockGetTimer.mockReturnValue(3);

    render(
      <GlobalStateContext.Provider
        value={
          {
            gameService: { send: mockSend },
          } as unknown as GlobalStateContextType
        }
      >
        <Counting />
      </GlobalStateContext.Provider>
    );

    expect(screen.getByText("3")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("2")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("1")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should send END_COUNTING event when timer reaches 0", () => {
    jest.useFakeTimers();
    mockGetTimer.mockReturnValue(1);

    render(
      <GlobalStateContext.Provider
        value={
          {
            gameService: { send: mockSend },
          } as unknown as GlobalStateContextType
        }
      >
        <Counting />
      </GlobalStateContext.Provider>
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockSend).toHaveBeenCalledWith({ type: "END_COUNTING" });
  });
});
