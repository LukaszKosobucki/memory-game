import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from "../../utils/ContextWrapper";
import GamePrepare from "./GamePrepare";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("GamePrepare Component", () => {
  const mockSend = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  const renderComponent = (contextValue: any) => {
    render(
      <GlobalStateContext.Provider value={contextValue}>
        <GamePrepare />
      </GlobalStateContext.Provider>
    );
  };

  it("should display the start and leaderboard buttons", () => {
    const contextValue = {
      gameService: { send: mockSend },
    };

    renderComponent(contextValue);

    expect(screen.getByText("Take a peek")).toBeInTheDocument();
    expect(screen.getByText("View Leaderboard")).toBeInTheDocument();
  });

  it("should call handleStart when the start button is clicked", () => {
    const contextValue = {
      gameService: { send: mockSend },
    };

    renderComponent(contextValue);

    const startButton = screen.getByText("Take a peek");
    fireEvent.click(startButton);

    expect(mockSend).toHaveBeenCalledWith({ type: "START" });
  });

  it("should navigate to leaderboards when the leaderboard button is clicked", () => {
    const contextValue = {
      gameService: { send: mockSend },
    };

    renderComponent(contextValue);

    const leaderboardButton = screen.getByText("View Leaderboard");
    fireEvent.click(leaderboardButton);

    expect(mockNavigate).toHaveBeenCalledWith("/leaderboards");
  });
});
