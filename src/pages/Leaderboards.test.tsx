import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import {
  GlobalStateContext,
  GlobalStateContextType,
} from "../utils/ContextWrapper";
import Leaderboards from "./Leaderboards";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const mockNavigate = useNavigate as jest.Mock;

const mockGlobalServices = {
  height: jest.fn().mockReturnValue("100vh"),
  matches: true,
  userLeaderboard: [
    { username: "user1", level: 5, time: 120, errors: 2, correctClicks: 10 },
    { username: "user2", level: 4, time: 110, errors: 1, correctClicks: 9 },
    { username: "user3", level: 6, time: 130, errors: 3, correctClicks: 11 },
    { username: "user4", level: 3, time: 100, errors: 0, correctClicks: 8 },
    { username: "user5", level: 2, time: 90, errors: 1, correctClicks: 7 },
    { username: "user6", level: 1, time: 80, errors: 2, correctClicks: 6 },
    { username: "user7", level: 7, time: 140, errors: 4, correctClicks: 12 },
  ],
  handleNextPage: jest.fn(),
  handlePreviousPage: jest.fn(),
  leaderboardLimit: 0,
  gameService: {
    send: jest.fn(),
  },
};

const mockSelectors = {
  getState: { value: "someState" },
};

jest.mock("../utils/selectors", () => ({
  useSelectors: () => mockSelectors,
}));

describe("Leaderboards Component", () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test("renders correctly with matches", () => {
    render(
      <GlobalStateContext.Provider
        value={mockGlobalServices as unknown as GlobalStateContextType}
      >
        <Leaderboards />
      </GlobalStateContext.Provider>
    );

    expect(screen.getByText(/Leaderboards/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Game/i)).toBeInTheDocument();
  });

  test("navigates to /game on start button click", () => {
    render(
      <GlobalStateContext.Provider
        value={mockGlobalServices as unknown as GlobalStateContextType}
      >
        <Leaderboards />
      </GlobalStateContext.Provider>
    );

    const startButton = screen.getByText(/Start Game/i);
    fireEvent.click(startButton);

    expect(mockGlobalServices.gameService.send).toHaveBeenCalledWith("RETRY");
    expect(mockNavigate).toHaveBeenCalledWith("/game");
  });

  test("renders correctly without matches", () => {
    const mockGlobalServicesWithoutMatches = {
      ...mockGlobalServices,
      matches: false,
    };

    render(
      <GlobalStateContext.Provider
        value={
          mockGlobalServicesWithoutMatches as unknown as GlobalStateContextType
        }
      >
        <Leaderboards />
      </GlobalStateContext.Provider>
    );

    expect(screen.getByText(/Leaderboards/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Game/i)).toBeInTheDocument();
  });
});
