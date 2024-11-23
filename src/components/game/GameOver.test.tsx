import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from "../../utils/ContextWrapper";
import GameOver from "./GameOver";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../utils/selectors", () => ({
  useSelectors: jest.fn(() => ({
    getLevel: jest.fn().mockReturnValue(3),
    getUserErrors: jest.fn().mockReturnValue(2),
    getUserTime: jest.fn().mockReturnValue(50),
    getUserCorrectBlocks: jest.fn().mockReturnValue(10),
    hasLost: jest.fn().mockReturnValue(false),
    useTimer: jest.fn().mockReturnValue([false, 0, 60]),
  })),
}));

const mockSetDoc = jest.fn();
const mockCollection = jest.fn();
const mockDoc = jest.fn();

jest.mock("firebase/firestore", () => ({
  collection: mockCollection,
  doc: mockDoc,
  setDoc: mockSetDoc,
}));

describe("GameOver Component", () => {
  const mockSend = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  const renderComponent = (contextValue: any) =>
    render(
      <GlobalStateContext.Provider value={contextValue}>
        <GameOver />
      </GlobalStateContext.Provider>
    );

  it("should display the input field and submit button", () => {
    const contextValue = {
      gameService: { send: mockSend },

      matches: false,
      isInputDisabled: false,
      userLeaderboard: [],
    };

    renderComponent(contextValue);

    expect(screen.getByText("username:")).toBeInTheDocument();
    expect(screen.getByText("submit")).toBeInTheDocument();
  });

  it("should display error message if username is less than 4 characters", () => {
    const contextValue = {
      gameService: { send: mockSend },

      matches: false,
      isInputDisabled: false,
      userLeaderboard: [],
    };

    renderComponent(contextValue);

    const input = screen.getByRole("input");
    fireEvent.change(input, { target: { value: "abc" } });

    expect(
      screen.getByText("username has to be at least 4 letters long")
    ).toBeInTheDocument();
  });

  it("should navigate to leaderboards when View Leaderboards button is clicked", () => {
    const contextValue = {
      gameService: { send: mockSend },
      matches: false,
      isInputDisabled: false,
      userLeaderboard: [],
    };

    renderComponent(contextValue);

    const leaderboardsButton = screen.getByText("View Leaderboards");
    fireEvent.click(leaderboardsButton);

    expect(mockNavigate).toHaveBeenCalledWith("/leaderboards");
  });

  it("should call handleRetry when Retry button is clicked", () => {
    const contextValue = {
      gameService: { send: mockSend },
      matches: false,
      isInputDisabled: false,
      userLeaderboard: [],
    };

    renderComponent(contextValue);

    const retryButton = screen.getByText("Retry");
    fireEvent.click(retryButton);

    expect(mockSend).toHaveBeenCalledWith("RETRY");
  });
});
