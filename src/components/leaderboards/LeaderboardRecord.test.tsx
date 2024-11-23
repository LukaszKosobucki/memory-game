import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { GlobalStateContext, IUsers } from "../../utils/ContextWrapper";
import LeaderboardRecord from "./LeaderboardRecord";

const mockGlobalStateContext = {
  matches: false,
};

describe("LeaderboardRecord Component", () => {
  const user: IUsers = {
    username: "testuser",
    level: 5,
    correctClicks: 10,
    errors: 2,
    time: 60,
  };

  const renderComponent = (contextValue: any, index: number) => {
    render(
      <GlobalStateContext.Provider value={contextValue}>
        <LeaderboardRecord user={user} index={index} />
      </GlobalStateContext.Provider>
    );
  };

  it("should display user information correctly when not flipped", () => {
    renderComponent(mockGlobalStateContext, 0);

    expect(screen.getByText("no.1")).toBeInTheDocument();
    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("level: 5")).toBeInTheDocument();
  });

  it("should display user statistics correctly when flipped", () => {
    renderComponent({ matches: true }, 0);

    const recordContainer = screen.getByTestId("record-container");
    fireEvent.touchStart(recordContainer);

    expect(screen.getByText("time: 60s")).toBeInTheDocument();
    expect(screen.getByText("correct: 10")).toBeInTheDocument();
    expect(screen.getByText("errors: 2")).toBeInTheDocument();
  });

  it("should display special styling for top 3 users", () => {
    renderComponent(mockGlobalStateContext, 1);

    expect(screen.getByText("no.2")).toBeInTheDocument();
  });

  it("should handle hover events correctly", () => {
    renderComponent({ matches: true }, 0);

    const recordContainer = screen.getByTestId("record-container");
    fireEvent.touchStart(recordContainer);
    expect(screen.getByText("time: 60s")).toBeInTheDocument();

    fireEvent.touchStart(recordContainer);
    expect(screen.getByText("testuser")).toBeInTheDocument();
  });
});
